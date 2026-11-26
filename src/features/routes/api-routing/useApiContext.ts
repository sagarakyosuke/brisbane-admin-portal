import { createContext, useContext } from 'react';

export interface ApiContextType {
  baseUrl: string;
  resolveEndpoint: (endpoint: string) => string;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApiContext = (): ApiContextType => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApiContext must be used within an ApiRoutingProvider.');
  }

  return context;
};
