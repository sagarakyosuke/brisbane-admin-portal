export { apiSlice } from '@/features/utils/hooks/api/slice';

export {
  useGetCookieConsentQuery,
  useSaveCookieConsentMutation,
  useUpdateCookieConsentMutation,
  useWithdrawCookieConsentMutation
} from '@/features/utils/hooks/cookies/api-hook';

export type {
  CookieConsentResponse,
  SaveCookiePreferencesRequest,
  SaveCookiePreferencesResponse,
  CookiePreferences,
  CookieConsent
} from '@/features/utils/hooks/cookies/types';

export { DEFAULT_COOKIE_PREFERENCES } from '@/features/utils/hooks/cookies/types';
