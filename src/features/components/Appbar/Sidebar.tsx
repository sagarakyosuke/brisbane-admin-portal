
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';

import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAnimation } from '@/features/reusables/animation';
import { BRANDING, BRANDING_LOGOS } from '@/features/utils/data/branding';
import { SIDEBAR_MENU_ITEMS } from '@/features/utils/sidebar';

const MotionListItem = motion.create(ListItem);
const MotionListItemButton = motion.create(ListItemButton) as any;
const MotionBox = motion.create(Box);

const Sidebar = () => {
  const theme = useTheme();
  const { staggerContainer, slideInLeft, hoverSlideRight } = useAnimation();

  const isDarkMode = theme.palette.mode === 'dark';

  const currentLogo = isDarkMode
    ? BRANDING_LOGOS.dark
    : BRANDING_LOGOS.light;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        width: '100%',
        overflow: 'hidden',
        bgcolor: theme.sidebar.background,
        zIndex: 10
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          pt: 1.2,
          pb: 1.2,
          px: 1.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        <Box
          component="img"
          src={currentLogo}
          alt={BRANDING.name}
          sx={{
            width: '100%',
            maxWidth: '255px',
            height: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </Box>

      <Divider
        sx={{
          borderColor: theme.sidebar.dividerBg,
          mb: 1,
          flexShrink: 0
        }}
      />

      {/* Scrollable Navigation */}
      <Box
        component={motion.div}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        sx={{
          width: '100%',
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '5px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.action.disabled,
            borderRadius: '10px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <List
          sx={{
            pt: 0,
            pb: 1,
            px: 0
          }}
        >
          {SIDEBAR_MENU_ITEMS.map((item) => (
            <MotionListItem
              key={item.name}
              variants={slideInLeft}
              disablePadding
              sx={{ mb: 0.5 }}
            >
              <MotionListItemButton
                component={NavLink}
                to={item.path}
                whileHover="hover"
                initial="rest"
                animate="rest"
                sx={{
                  pl: 3,
                  pr: 2,
                  py: 1.25,
                  mr: 2,
                  minHeight: '0px',
                  backgroundColor: 'transparent',
                  color: theme.palette.text.secondary,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '0px 100px 100px 0px',
                  transition: 'color 0.2s ease',

                  '& .MuiListItemIcon-root': {
                    minWidth: 40,
                    color: theme.palette.text.secondary,
                    transition: 'color 0.2s ease'
                  },

                  '&:hover': {
                    color: theme.palette.text.primary,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.text.primary
                    }
                  },

                  '&.active': {
                    color: theme.colors.primary.main,

                    '& > .moving-bg': {
                      bgcolor: isDarkMode
                        ? theme.palette.action.selected
                        : theme.colors.primary.lighter
                    },

                    '& .MuiListItemIcon-root': {
                      color: theme.colors.primary.main
                    },

                    '& .MuiTypography-root': {
                      color: theme.colors.primary.main,
                      fontWeight: 600
                    },

                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 5,
                      bgcolor: theme.colors.primary.main,
                      borderTopRightRadius: 4,
                      borderBottomRightRadius: 4,
                      zIndex: 2
                    }
                  },

                  '& .MuiListItemText-root': {
                    margin: 0
                  }
                }}
              >
                <MotionBox
                  className="moving-bg"
                  variants={hoverSlideRight}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '0px 100px 100px 0px',
                    zIndex: 0
                  }}
                />

                <Box
                  component={motion.div}
                  variants={hoverSlideRight}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    minWidth: 0,
                    zIndex: 1
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: 14.5
                    }}
                    sx={{ m: 0 }}
                  />
                </Box>
              </MotionListItemButton>
            </MotionListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
