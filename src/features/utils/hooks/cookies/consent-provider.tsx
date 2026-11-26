import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';

import {
  useGetCookieConsentQuery,
  useSaveCookieConsentMutation,
  useUpdateCookieConsentMutation,
  useWithdrawCookieConsentMutation
} from '@/features/utils/hooks/api';

import type { CookiePreferences, SaveCookiePreferencesRequest } from './types';

import { DEFAULT_COOKIE_PREFERENCES } from './types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface CookieConsentContextType {
  preferences: CookiePreferences;
  hasConsent: boolean;
  isLoading: boolean;
  isSaving: boolean;
  error: unknown;
  setPreferences: (preferences: CookiePreferences) => void;
  savePreferences: (preferences?: CookiePreferences) => Promise<void>;
  withdrawConsent: () => Promise<void>;
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

// -----------------------------------------------------------------------------
// Provider
// -----------------------------------------------------------------------------

export const CookieConsentProvider = ({
  children
}: CookieConsentProviderProps) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(
    DEFAULT_COOKIE_PREFERENCES
  );

  const { data, isLoading, error } = useGetCookieConsentQuery();

  const [saveCookieConsent, { isLoading: isSavingNew }] =
    useSaveCookieConsentMutation();

  const [updateCookieConsent, { isLoading: isUpdating }] =
    useUpdateCookieConsentMutation();

  const [withdrawCookieConsent, { isLoading: isWithdrawing }] =
    useWithdrawCookieConsentMutation();

  useEffect(() => {
    if (data?.consent?.preferences) {
      setPreferences(data.consent.preferences);
    }
  }, [data]);

  const savePreferences = useCallback(
    async (nextPreferences?: CookiePreferences) => {
      const selectedPreferences = nextPreferences ?? preferences;

      const request: SaveCookiePreferencesRequest = {
        analytics: selectedPreferences.analytics,
        marketing: selectedPreferences.marketing,
        functional: selectedPreferences.functional
      };

      if (data?.hasConsent) {
        await updateCookieConsent(request).unwrap();
      } else {
        await saveCookieConsent(request).unwrap();
      }

      setPreferences(selectedPreferences);
    },
    [data?.hasConsent, preferences, saveCookieConsent, updateCookieConsent]
  );

  const handleWithdrawConsent = useCallback(async () => {
    await withdrawCookieConsent().unwrap();

    setPreferences(DEFAULT_COOKIE_PREFERENCES);
  }, [withdrawCookieConsent]);

  const isSaving = isSavingNew || isUpdating || isWithdrawing;

  const value = useMemo<CookieConsentContextType>(
    () => ({
      preferences,
      hasConsent: data?.hasConsent ?? false,
      isLoading,
      isSaving,
      error,
      setPreferences,
      savePreferences,
      withdrawConsent: handleWithdrawConsent
    }),
    [
      preferences,
      data?.hasConsent,
      isLoading,
      isSaving,
      error,
      savePreferences,
      handleWithdrawConsent
    ]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      'useCookieConsent must be used within a CookieConsentProvider.'
    );
  }

  return context;
};
