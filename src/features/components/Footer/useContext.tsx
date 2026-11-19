
import { useContext } from 'react';
import { useTheme } from '@mui/material';

import { ThemeContext } from '@/features/utils/theme/ThemeProvider';

export const useFooter = () => {
  const setThemeName = useContext(ThemeContext);
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === 'dark';

  const toggleTheme = () => {
    setThemeName(isDarkMode ? 'MainTheme' : 'PureDarkTheme');
  };

  return {
    isDarkMode,
    toggleTheme
  };
};
