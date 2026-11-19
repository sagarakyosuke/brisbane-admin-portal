
import { Drawer as MuiDrawer, Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';

import { AppbarContext } from '@/features/components/Appbar/useContext';
import Sidebar from '@/features/components/Appbar/Sidebar';

const Drawer = () => {
  const { isMobileOpen, closeMobile } = useContext(AppbarContext);
  const theme = useTheme();

  return (
    <>
      <MuiDrawer
        anchor="left"
        open={isMobileOpen}
        onClose={(_, reason) => {
          if (reason === 'backdropClick') return;
          closeMobile();
        }}
        disableEscapeKeyDown
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          zIndex: theme.zIndex.drawer + 2,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 260,
            bgcolor: theme.sidebar.background,
            borderRight: 'none',
            overflow: 'hidden'
          }
        }}
      >
        <Box
          sx={{
            height: '100%',
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          <Sidebar />
        </Box>
      </MuiDrawer>

      {isMobileOpen && (
        <IconButton
          onClick={closeMobile}
          aria-label="Close menu"
          size="small"
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: theme.zIndex.modal + 1,

            width: 38,
            height: 38,
            borderRadius: '50%',

            color: theme.palette.text.secondary,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[3],

            transition: theme.transitions.create(
              ['background-color', 'color', 'box-shadow', 'transform'],
              { duration: 180 }
            ),

            '&:hover': {
              bgcolor: theme.palette.action.selected,
              color: theme.palette.text.primary,
              boxShadow: theme.shadows[5],
              transform: 'rotate(90deg)'
            },

            '&:active': {
              transform: 'scale(0.92)'
            },

            '& .MuiSvgIcon-root': {
              fontSize: 20
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </>
  );
};

export default Drawer;
