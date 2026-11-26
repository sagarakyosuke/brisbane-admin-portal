import React, { type ReactNode, useMemo } from 'react';

import { ApiContext, type ApiContextType } from './useApiContext';

interface ApiRoutingProviderProps {
  children: ReactNode;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const ApiRoutingProvider = ({ children }: ApiRoutingProviderProps) => {
  const value = useMemo<ApiContextType>(() => {
    const baseUrl = (API_BASE_URL ?? '').replace(/\/+$/, '');

    return {
      baseUrl,
      resolveEndpoint: (endpoint: string) => {
        const path = endpoint.replace(/^\/+/, '');

        return `${baseUrl}/${path}`;
      }
    };
  }, []);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiRoutingProvider;
