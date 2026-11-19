import {
  alpha,
  Avatar,
  Box,
  Card,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';

import {
  ProfileAvatarProps,
  ProfileProvider,
  useProfileAvatar,
  ProfileMenuProvider,
  useProfileMenu
} from '@/features/components/Profile/useContext';

import { SETTINGS } from '@/features/utils/profile-settings';
import { FakeUser } from 'src/features/utils/_mock/user';

// -----------------------------------------------------------------------------
// Profile Avatar
// -----------------------------------------------------------------------------

const ProfileAvatarContent = ({
  src,
  alt,
  initials,
  online = false,
  active = false,
  size = 40
}: ProfileAvatarProps) => {
  const theme = useTheme();

  const { imageFailed, handleImageError } = useProfileAvatar();

  const showImage = Boolean(src) && !imageFailed;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.shorter
        }),
        transform: active ? 'scale(0.96)' : 'scale(1)',
        boxShadow: active
          ? `0 0 0 4px ${alpha(theme.colors.primary.main, 0.35)}`
          : 'none'
      }}
    >
      <Avatar
        alt={alt}
        src={showImage ? src : undefined}
        imgProps={{
          onError: handleImageError,
          loading: 'lazy',
          style: {
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }
        }}
        sx={{
          width: size,
          height: size,
          bgcolor: theme.colors.primary.main,
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: size * 0.35,
          border: `2px solid ${theme.palette.background.paper}`,
          transition: theme.transitions.create(['background-color', 'color'], {
            duration: theme.transitions.duration.shorter
          })
        }}
      >
        {initials}
      </Avatar>

      {online && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 1,
            right: 1,
            width: 11,
            height: 11,
            borderRadius: '50%',
            bgcolor: theme.colors.success.main,
            border: `2px solid ${theme.palette.background.paper}`,
            zIndex: 1
          }}
        />
      )}
    </Box>
  );
};

export const ProfileAvatar = (props: ProfileAvatarProps) => {
  return (
    <ProfileProvider src={props.src}>
      <ProfileAvatarContent {...props} />
    </ProfileProvider>
  );
};

// -----------------------------------------------------------------------------
// Profile Menu
// -----------------------------------------------------------------------------

const ProfileMenuContent = () => {
  const theme = useTheme();

  const {
    open,
    tooltipOpen,
    menuId,
    handleToggle,
    handleClose,
    handleTooltipOpen,
    handleTooltipClose
  } = useProfileMenu();

  const primaryOrange = theme.colors.primary.main;
  const secondaryText = theme.palette.text.secondary;

  const isDark = theme.palette.mode === 'dark';

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: 'relative' }}>
        {/* Profile Trigger */}
        <Tooltip
          title="Account Settings"
          arrow
          enterDelay={400}
          leaveDelay={0}
          open={tooltipOpen}
          onOpen={handleTooltipOpen}
          onClose={handleTooltipClose}
          disableHoverListener={open}
          disableFocusListener={open}
          disableTouchListener={open}
        >
          <IconButton
            onClick={handleToggle}
            aria-label="Open account menu"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls={open ? menuId : undefined}
            sx={{
              p: 0.5,
              borderRadius: '50%',
              transition: theme.transitions.create(
                ['background-color', 'box-shadow'],
                {
                  duration: theme.transitions.duration.shorter
                }
              ),
              '&:hover': {
                bgcolor: alpha(primaryOrange, 0.15)
              },
              '&:focus-visible': {
                boxShadow: `0 0 0 4px ${alpha(primaryOrange, 0.3)}`
              }
            }}
          >
            <ProfileAvatar {...FakeUser} active={open} size={38} />
          </IconButton>
        </Tooltip>

        {/* Dropdown */}
        <Grow in={open} timeout={200} style={{ transformOrigin: 'top right' }}>
          <Card
            id={menuId}
            elevation={0}
            sx={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
              zIndex: theme.zIndex.tooltip,
              width: 280,
              overflow: 'hidden',
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '16px',
              boxShadow: isDark
                ? '0 12px 32px rgba(0, 0, 0, 0.35)'
                : '0 12px 32px rgba(15, 23, 42, 0.12)'
            }}
          >
            {/* Profile Header */}
            <Box
              sx={{
                px: 2.25,
                py: 2.5,
                bgcolor: primaryOrange,
                color: '#FFFFFF'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.75
                }}
              >
                <ProfileAvatar {...FakeUser} size={48} />

                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={800}
                    fontSize={14}
                    color="#FFFFFF"
                    noWrap
                  >
                    {FakeUser.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{
                      display: 'block',
                      mt: 0.25,
                      color: '#FFFFFF'
                    }}
                  >
                    {FakeUser.role}
                  </Typography>

                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.65,
                      mt: 0.75
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        bgcolor: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.8)'
                      }}
                    />

                    <Typography
                      variant="caption"
                      fontSize={10.5}
                      fontWeight={700}
                      color="#FFFFFF"
                    >
                      Online
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Menu Items */}
            <Box sx={{ p: 1.25 }}>
              <Typography
                variant="overline"
                sx={{
                  display: 'block',
                  px: 1.25,
                  pb: 0.75,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: secondaryText
                }}
              >
                ACCOUNT
              </Typography>

              {SETTINGS.filter((setting) => !setting.isLogout).map(
                (setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={handleClose}
                    sx={{
                      minHeight: 44,
                      gap: 1.5,
                      px: 1.25,
                      py: 1,
                      mb: 0.4,
                      borderRadius: '9px',
                      color: theme.palette.text.primary,
                      transition: theme.transitions.create(
                        ['background-color', 'color'],
                        {
                          duration: theme.transitions.duration.shortest
                        }
                      ),
                      '&:hover': {
                        bgcolor: alpha(primaryOrange, 0.15),
                        color: primaryOrange
                      },
                      '&:hover .MuiListItemIcon-root': {
                        color: primaryOrange
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 32,
                        color: secondaryText,
                        transition: theme.transitions.create('color', {
                          duration: theme.transitions.duration.shortest
                        })
                      }}
                    >
                      {setting.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={setting.name}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 600
                      }}
                    />
                  </MenuItem>
                )
              )}

              {/* Logout */}
              {SETTINGS.some((setting) => setting.isLogout) && (
                <>
                  <Divider
                    sx={{
                      my: 1,
                      borderColor: theme.palette.divider
                    }}
                  />

                  {SETTINGS.filter((setting) => setting.isLogout).map(
                    (setting) => (
                      <MenuItem
                        key={setting.name}
                        onClick={handleClose}
                        sx={{
                          minHeight: 44,
                          gap: 1.5,
                          px: 1.25,
                          py: 1,
                          borderRadius: '9px',
                          color: theme.colors.error.main,
                          transition: theme.transitions.create(
                            'background-color',
                            {
                              duration: theme.transitions.duration.shortest
                            }
                          ),
                          '&:hover': {
                            bgcolor: alpha(theme.colors.error.main, 0.12)
                          }
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 32,
                            color: 'inherit'
                          }}
                        >
                          {setting.icon}
                        </ListItemIcon>

                        <ListItemText
                          primary={setting.name}
                          primaryTypographyProps={{
                            fontSize: 13,
                            fontWeight: 700
                          }}
                        />
                      </MenuItem>
                    )
                  )}
                </>
              )}
            </Box>
          </Card>
        </Grow>
      </Box>
    </ClickAwayListener>
  );
};

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export const ProfileMenu = () => {
  return (
    <ProfileMenuProvider>
      <ProfileMenuContent />
    </ProfileMenuProvider>
  );
};
