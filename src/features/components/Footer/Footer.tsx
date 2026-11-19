
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';

import { DarkMode, LightMode } from '@mui/icons-material';

import { useFooter } from '@/features/components/Footer/useContext';
import { BRANDING } from '@/features/utils/data/branding';

export const Footer = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useFooter();

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: {
          xs: 0,
          md: theme.sidebar.width
        },
        width: {
          xs: '100%',
          md: `calc(100% - ${theme.sidebar.width})`
        },
        boxSizing: 'border-box',
        zIndex: theme.zIndex.appBar,
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        px: { xs: 2, sm: 3, md: 4 },
        py: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          minHeight: 32
        }}
      >
        {/* Left: Brand & Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 0.25,
            minWidth: 0
          }}
        >
          <Typography
            variant="body2"
            fontWeight={800}
            color={theme.colors.primary.main}
            fontSize={12}
            noWrap
          >
            {BRANDING.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={10}
            sx={{
              textTransform: 'none',
              lineHeight: 1.3
            }}
          >
            © {currentYear} All rights reserved.
          </Typography>
        </Box>

        {/* Right: Theme Toggle */}
        <Tooltip
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          arrow
        >
          <IconButton
            onClick={toggleTheme}
            aria-label="Toggle theme"
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              transition: 'all 0.2s',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              p: 0.75,
              flexShrink: 0,
              '&:hover': {
                bgcolor: theme.palette.action.hover,
                color: theme.colors.primary.main
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
          >
            {isDarkMode ? (
              <LightMode sx={{ fontSize: 18 }} />
            ) : (
              <DarkMode sx={{ fontSize: 18 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Footer;
