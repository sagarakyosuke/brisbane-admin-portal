
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface EncryptedApiEnvelope {
  version: number;
  nonce: string;
  tag: string;
  ciphertext: string;
}

interface EncryptedResponseWrapper {
  response: string;
}

interface EncryptedRequestWrapper {
  payload: string;
}

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const API_ENCRYPTION_KEY = import.meta.env.VITE_API_ENCRYPTION_KEY as
  string | undefined;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  timeout: 20000,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');

    // Laravel CSRF token.
    if (typeof document !== 'undefined') {
      const xsrfCookie = document.cookie
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith('XSRF-TOKEN='));

      if (xsrfCookie) {
        const token = decodeURIComponent(
          xsrfCookie.substring('XSRF-TOKEN='.length)
        );

        headers.set('X-XSRF-TOKEN', token);
      }
    }

    return headers;
  }
});

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const base64ToBytes = (value: unknown, field: string): Uint8Array => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Missing or invalid encrypted ${field}.`);
  }

  try {
    const binary = atob(value.trim());

    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    throw new Error(`Invalid Base64 encoding for ${field}.`);
  }
};

const bytesToBase64 = (bytes: Uint8Array): string => {
  let binary = '';

  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(index, index + chunkSize)
    );
  }

  return btoa(binary);
};

const toArrayBuffer = (bytes: Uint8Array): ArrayBuffer => {
  const buffer = new ArrayBuffer(bytes.length);

  new Uint8Array(buffer).set(bytes);

  return buffer;
};

const getEncryptionKey = async (
  usage: KeyUsage[]
): Promise<CryptoKey> => {
  if (!API_ENCRYPTION_KEY) {
    throw new Error('VITE_API_ENCRYPTION_KEY is not configured.');
  }

  const key = base64ToBytes(API_ENCRYPTION_KEY, 'encryption key');

  if (key.length !== 32) {
    throw new Error('AES-256 key must contain exactly 32 bytes.');
  }

  return crypto.subtle.importKey(
    'raw',
    toArrayBuffer(key),
    { name: 'AES-GCM' },
    false,
    usage
  );
};

// -----------------------------------------------------------------------------
// Request Encryption
// -----------------------------------------------------------------------------

const encryptRequest = async (data: unknown): Promise<string> => {
  const cryptoKey = await getEncryptionKey(['encrypt']);

  // Generate a unique 12-byte nonce for this request.
  const nonce = crypto.getRandomValues(new Uint8Array(12));

  const plaintext = new TextEncoder().encode(JSON.stringify(data));

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: toArrayBuffer(nonce),
      tagLength: 128
    },
    cryptoKey,
    toArrayBuffer(plaintext)
  );

  // Web Crypto returns ciphertext followed by the authentication tag.
  const encryptedBytes = new Uint8Array(encryptedBuffer);

  const ciphertext = encryptedBytes.slice(0, -16);
  const tag = encryptedBytes.slice(-16);

  const envelope: EncryptedApiEnvelope = {
    version: 1,
    nonce: bytesToBase64(nonce),
    tag: bytesToBase64(tag),
    ciphertext: bytesToBase64(ciphertext)
  };

  // Encode the complete envelope as Base64.
  return bytesToBase64(
    new TextEncoder().encode(JSON.stringify(envelope))
  );
};

// -----------------------------------------------------------------------------
// Response Decryption
// -----------------------------------------------------------------------------

const decryptResponse = async (
  encryptedResponse: string
): Promise<unknown> => {
  // Decode the outer Base64 envelope.
  const envelopeBytes = base64ToBytes(
    encryptedResponse,
    'response envelope'
  );

  let envelope: EncryptedApiEnvelope;

  try {
    envelope = JSON.parse(
      new TextDecoder().decode(envelopeBytes)
    ) as EncryptedApiEnvelope;
  } catch {
    throw new Error('Unable to parse AES-GCM envelope.');
  }

  if (
    envelope.version !== 1 ||
    !envelope.nonce ||
    !envelope.tag ||
    !envelope.ciphertext
  ) {
    throw new Error('Invalid AES-GCM response envelope.');
  }

  // Decode encryption components.
  const nonce = base64ToBytes(envelope.nonce, 'nonce');
  const tag = base64ToBytes(envelope.tag, 'tag');
  const ciphertext = base64ToBytes(envelope.ciphertext, 'ciphertext');

  if (nonce.length !== 12) {
    throw new Error('AES-GCM nonce must contain exactly 12 bytes.');
  }

  if (tag.length !== 16) {
    throw new Error('AES-GCM tag must contain exactly 16 bytes.');
  }

  const cryptoKey = await getEncryptionKey(['decrypt']);

  // Web Crypto expects ciphertext followed by the authentication tag.
  const encryptedBytes = new Uint8Array(
    ciphertext.length + tag.length
  );

  encryptedBytes.set(ciphertext);
  encryptedBytes.set(tag, ciphertext.length);

  // Decrypt.
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: toArrayBuffer(nonce),
      tagLength: 128
    },
    cryptoKey,
    toArrayBuffer(encryptedBytes)
  );

  const decryptedText = new TextDecoder().decode(decryptedBuffer);

  return JSON.parse(decryptedText);
};

// -----------------------------------------------------------------------------
// Login Request Detection
// -----------------------------------------------------------------------------

const isLoginRequest = (args: string | FetchArgs): boolean => {
  if (typeof args === 'string') {
    return false;
  }

  const url = args.url.replace(/^\/+/, '');
  const method = (args.method ?? 'GET').toUpperCase();

  return url === 'auth/login' && method === 'POST';
};

// -----------------------------------------------------------------------------
// Base Query With Encryption and Decryption
// -----------------------------------------------------------------------------

const baseQueryWithDecryption: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let requestArgs = args;

  // ---------------------------------------------------------------------------
  // Encrypt Login Request
  // ---------------------------------------------------------------------------

  if (isLoginRequest(args) && typeof args !== 'string') {
    try {
      const encryptedPayload = await encryptRequest(args.body);

      const encryptedWrapper: EncryptedRequestWrapper = {
        payload: encryptedPayload
      };

      requestArgs = {
        ...args,
        body: encryptedWrapper
      };
    } catch (error) {
      console.error('API request encryption failed:', error);

      return {
        error: {
          status: 'CUSTOM_ERROR',
          error:
            error instanceof Error
              ? error.message
              : 'Request encryption failed.'
        }
      };
    }
  }

  // ---------------------------------------------------------------------------
  // Send Request
  // ---------------------------------------------------------------------------

  const result = await baseQuery(requestArgs, api, extraOptions);

  // ---------------------------------------------------------------------------
  // Preserve Original Backend Errors
  // ---------------------------------------------------------------------------

  if (result.error) {
    return result;
  }

  if (result.data == null) {
    return result;
  }

  // ---------------------------------------------------------------------------
  // Decrypt Successful Backend Response
  // ---------------------------------------------------------------------------

  if (
    typeof result.data !== 'object' ||
    !('response' in result.data)
  ) {
    return result;
  }

  try {
    const encryptedResponse = (
      result.data as EncryptedResponseWrapper
    ).response;

    const decryptedData = await decryptResponse(encryptedResponse);

    return {
      data: decryptedData,
      meta: result.meta
    };
  } catch (error) {
    console.error('API response decryption failed:', error);

    return {
      error: {
        status: 'CUSTOM_ERROR',
        error:
          error instanceof Error
            ? error.message
            : 'Response decryption failed.'
      },
      meta: result.meta
    };
  }
};

// -----------------------------------------------------------------------------
// API Slice
// -----------------------------------------------------------------------------

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithDecryption,
  tagTypes: ['Login', 'Cookies'],
  endpoints: () => ({})
});
