
import { apiSlice } from '@/features/utils/hooks/api/slice';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface AuthenticationUser {
  userId: string;
  fullname: string;
  email: string;
  username: string;
  role: 'super_admin' | 'admin' | 'staff';
  emailVerifiedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: AuthenticationUser;
}

export interface BackendErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// -----------------------------------------------------------------------------
// CSRF Configuration
// -----------------------------------------------------------------------------

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL as string | undefined
)?.replace(/\/+$/, '');

const getCsrfUrl = (): string => {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not configured.');
  }

  const baseUrl = API_BASE_URL.replace(/\/api$/i, '');

  return `${baseUrl}/invoke/csrf`;
};

// -----------------------------------------------------------------------------
// CSRF Initialization
// -----------------------------------------------------------------------------

export const initializeCsrfCookie = async (): Promise<void> => {
  const response = await fetch(getCsrfUrl(), {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    const responseText = await response.text();

    let responseData: unknown = responseText;

    try {
      responseData = responseText
        ? JSON.parse(responseText)
        : null;
    } catch {
      // Keep the original response text when it isn't JSON.
    }

    // Preserve the original backend status and response body.
    throw {
      status: response.status,
      data: responseData
    };
  }
};

// -----------------------------------------------------------------------------
// Authentication API
// -----------------------------------------------------------------------------

export const authenticationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Login']
    })
  })
});

export const { useLoginMutation } = authenticationApi;
