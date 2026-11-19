import React, { useState, ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { themeCreator, ThemeName } from '@/features/utils/theme/base';

export const ThemeContext = React.createContext<(themeName: string) => void>(
  () => {}
);

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children
}) => {
  const curThemeName =
    (localStorage.getItem('appTheme') as ThemeName) || 'MainTheme';

  const [themeName, _setThemeName] = useState<string>(curThemeName);
  const theme = themeCreator(themeName);

  const setThemeName = (name: string): void => {
    localStorage.setItem('appTheme', name);
    _setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
