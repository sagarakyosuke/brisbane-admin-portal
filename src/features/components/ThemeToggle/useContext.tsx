
import { useContext } from 'react';
import { useTheme } from '@mui/material';

import { ThemeContext } from '@/features/utils/theme/ThemeProvider';
import { ThemeName } from '@/features/utils/theme/base';

export const useThemeToggle = () => {
    const setThemeName = useContext(ThemeContext);
    const theme = useTheme();

    const isDarkMode = theme.palette.mode === 'dark';

    const toggleTheme = () => {
        const nextTheme: ThemeName = isDarkMode
            ? 'MainTheme'
            : 'PureDarkTheme';

        setThemeName(nextTheme);
    };

    return {
        isDarkMode,
        toggleTheme
    };
};
