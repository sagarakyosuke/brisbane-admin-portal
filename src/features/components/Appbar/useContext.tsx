import { createContext, useState, ReactNode, FC } from 'react';

interface AppbarContextType {
  isMobileOpen: boolean;
  toggleMobileOpen: () => void;
  closeMobile: () => void;
}

export const AppbarContext = createContext<AppbarContextType>(
  {} as AppbarContextType
);

export const AppbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileOpen = () => setIsMobileOpen((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <AppbarContext.Provider
      value={{ isMobileOpen, toggleMobileOpen, closeMobile }}
    >
      {children}
    </AppbarContext.Provider>
  );
};
