import { IconButton, Tooltip, useTheme } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

import { useThemeToggle } from '@/features/components/ThemeToggle/useContext';

export const ThemeToggle = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeToggle();

  return (
    <Tooltip
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      arrow
      placement="bottom"
    >
      <IconButton
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        size="small"
        sx={{
          width: 40,
          height: 40,
          p: 0,
          mx: { xs: 0, md: 0.5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.text.secondary,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '50%',
          boxShadow: theme.shadows[1],
          transition: theme.transitions.create(
            [
              'background-color',
              'border-color',
              'color',
              'box-shadow',
              'transform'
            ],
            {
              duration: theme.transitions.duration.short
            }
          ),

          '& .MuiSvgIcon-root': {
            fontSize: 20,
            transition: theme.transitions.create(['transform', 'color'], {
              duration: theme.transitions.duration.standard
            })
          },

          '&:hover': {
            bgcolor: theme.palette.action.hover,
            color: theme.colors.primary.main,
            borderColor: theme.colors.primary.main,
            boxShadow: theme.shadows[3],
            transform: 'translateY(-1px)',

            '& .MuiSvgIcon-root': {
              transform: 'rotate(20deg)'
            }
          },

          '&:active': {
            transform: 'scale(0.94)',
            boxShadow: theme.shadows[1]
          }
        }}
      >
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
