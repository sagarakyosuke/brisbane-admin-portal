import { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import {
  alpha,
  AppBar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon
} from '@mui/icons-material';

import {
  AppbarContext,
  AppbarProvider
} from '@/features/components/Appbar/useContext';

import Breadcrumbs, {
  BreadcrumbProvider
} from '@/features/components/Breadcrumbs/Breadcrumbs';

import Drawer from '@/features/components/Appbar/Drawer';
import Sidebar from '@/features/components/Appbar/Sidebar';
import { Footer } from '@/features/components/Footer/Footer';
import { ProfileMenu } from '@/features/components/Profile';

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const getPageTitle = (pathname: string): string => {
  const segment = pathname.split('/').pop();

  if (!segment || segment === 'dashboard') {
    return 'Dashboard Overview';
  }

  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

// -----------------------------------------------------------------------------
// Header Components
// -----------------------------------------------------------------------------

const HeaderSearch = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        width: 260,
        px: 2,
        py: 0.75,
        bgcolor: theme.colors.alpha.black[5],
        border: '1px solid transparent',
        borderRadius: theme.general.borderRadius,
        transition: 'all 0.2s',

        '&:focus-within': {
          bgcolor: theme.palette.background.paper,
          borderColor: theme.colors.primary.main,
          boxShadow: `0 0 0 3px ${alpha(theme.colors.primary.main, 0.15)}`
        }
      }}
    >
      <SearchIcon
        sx={{
          mr: 1,
          fontSize: 20,
          color: theme.colors.alpha.black[50]
        }}
      />

      <InputBase
        placeholder="Search..."
        sx={{
          flexGrow: 1,
          fontSize: 14,
          color: theme.colors.alpha.black[100]
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 0.75,
          py: 0.25,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.general.borderRadiusSm,
          boxShadow: `0 1px 2px ${theme.colors.alpha.black[5]}`,
          fontSize: 11,
          fontWeight: 700,
          color: theme.colors.alpha.black[50]
        }}
      >
        ⌘K
      </Box>
    </Box>
  );
};

const HeaderNotifications = () => {
  const theme = useTheme();

  return (
    <IconButton
      sx={{
        mx: { xs: 0.5, md: 0 },
        color: theme.colors.alpha.black[70],
        transition: 'all 0.2s',

        '&:hover': {
          bgcolor: theme.colors.alpha.black[5],
          color: theme.colors.primary.main
        },

        '&:active': {
          transform: 'scale(0.95)'
        }
      }}
    >
      <Badge
        badgeContent={3}
        sx={{
          '& .MuiBadge-badge': {
            top: 4,
            right: 4,
            minWidth: 18,
            height: 18,
            px: '4px',
            border: `2px solid ${theme.palette.background.paper}`,
            borderRadius: '10px',
            bgcolor: theme.colors.error.main,
            color: theme.colors.alpha.white[100],
            boxShadow: `0 2px 4px ${alpha(theme.colors.error.main, 0.3)}`,
            fontSize: '0.65rem',
            fontWeight: 800
          }
        }}
      >
        <NotificationsIcon sx={{ fontSize: 24 }} />
      </Badge>
    </IconButton>
  );
};

const HeaderActions = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        gap: { xs: 1, md: 2.5 },
        pr: { xs: 1, md: 0 }
      }}
    >
      <HeaderSearch />

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          my: 2.5,
          display: { xs: 'none', md: 'block' },
          borderColor: theme.palette.divider
        }}
      />
      <HeaderNotifications />
      <ProfileMenu />
    </Box>
  );
};

const Header = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { toggleMobileOpen } = useContext(AppbarContext);
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        bgcolor: theme.header.background,
        color: theme.header.textColor,
        boxShadow: theme.header.boxShadow,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: theme.header.height,
          minHeight: `${theme.header.height} !important`,
          px: { xs: '16px !important', md: '32px !important' },
          boxSizing: 'border-box'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            minWidth: 0,
            gap: { xs: 1, md: 0.5 }
          }}
        >
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleMobileOpen}
              sx={{
                flexShrink: 0,
                ml: 0,
                mr: 0.5,
                p: 1,
                color: theme.colors.alpha.black[70],
                bgcolor: theme.colors.alpha.black[5],
                borderRadius: 2,

                '&:hover': {
                  bgcolor: theme.colors.alpha.black[10]
                }
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            sx={{
              overflow: 'hidden',
              fontSize: { xs: '1.15rem', md: '1.3rem' },
              fontWeight: 900,
              color: theme.colors.alpha.black[100],
              letterSpacing: '-0.03em',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {getPageTitle(location.pathname)}
          </Typography>
        </Box>

        <HeaderActions />
      </Toolbar>
    </AppBar>
  );
};

// -----------------------------------------------------------------------------
// Sidebars
// -----------------------------------------------------------------------------

const DesktopSidebar = () => {
  const theme = useTheme();

  return (
    <MuiDrawer
      variant="permanent"
      open
      sx={{
        flex: `0 0 ${theme.sidebar.width}`,
        width: theme.sidebar.width,
        height: '100dvh',

        '& .MuiDrawer-paper': {
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          height: '100dvh',
          width: theme.sidebar.width,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRight: `1px solid ${theme.sidebar.dividerBg}`,
          bgcolor: theme.sidebar.background,
          boxShadow: theme.sidebar.boxShadow
        }
      }}
    >
      <Sidebar />
    </MuiDrawer>
  );
};

// -----------------------------------------------------------------------------
// Page Layout
// -----------------------------------------------------------------------------

const LayoutContent = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        minHeight: '100dvh',
        bgcolor: theme.palette.background.default,
        overflowX: 'clip'
      }}
    >
      {isDesktop && <DesktopSidebar />}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          minWidth: 0,
          minHeight: '100dvh'
        }}
      >
        <Header />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
            pb: { xs: '64px', md: '64px' },
            boxSizing: 'border-box'
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: '1 0 auto',
              width: '100%',
              minWidth: 0,
              boxSizing: 'border-box',
              py: { xs: 3, md: 4 },
              px: { xs: 2, sm: 3, md: 4 }
            }}
          >
            <Breadcrumbs />
            <Outlet />
          </Container>
        </Box>

        {/* Sticky-bottom footer */}
        <Footer />
      </Box>

      {!isDesktop && <Drawer />}
    </Box>
  );
};

// -----------------------------------------------------------------------------
// Layout Provider
// -----------------------------------------------------------------------------

const Layout = () => (
  <AppbarProvider>
    <BreadcrumbProvider>
      <LayoutContent />
    </BreadcrumbProvider>
  </AppbarProvider>
);

export default Layout;
