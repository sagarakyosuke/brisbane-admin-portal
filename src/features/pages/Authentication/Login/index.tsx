import { useState, FormEvent } from 'react';

import {
  alpha,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

import {
  ArrowForward,
  Visibility,
  VisibilityOff,
  LockOutlined,
  MailOutline
} from '@mui/icons-material';

import { ThemeToggle } from '@/features/components/ThemeToggle/ThemeToggle';
import { BRANDING, BRANDING_LOGOS } from '@/features/utils/data/branding';

export const LoginPage = () => {
  const theme = useTheme();

  const isDesktop = useMediaQuery('(min-width: 960px)');
  const isShortScreen = useMediaQuery('(max-height: 700px)');
  const isCompactScreen = useMediaQuery('(max-height: 820px)');

  const isDarkMode = theme.palette.mode === 'dark';

  const currentLogo = BRANDING_LOGOS.compact;

  const mobileCurrentLogo = isDarkMode
    ? BRANDING_LOGOS.compact
    : BRANDING_LOGOS.light;

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Laravel authentication API integration will be added here.
  };

  const inputStyles = {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      minHeight: 'clamp(44px, 5vh, 52px)',
      borderRadius: 2,
      fontSize: 'clamp(13px, 0.85vw, 14px)',
      bgcolor: 'background.paper',
      transition: theme.transitions.create(
        ['background-color', 'border-color'],
        { duration: theme.transitions.duration.short }
      )
    },
    '& .MuiOutlinedInput-input': {
      py: 1.4,
      minWidth: 0
    },
    '& .MuiOutlinedInput-input::placeholder': {
      opacity: 0.7,
      color: 'text.secondary'
    }
  };

  const labelStyles = {
    display: 'block',
    fontSize: 'clamp(11px, 0.8vw, 12px)',
    fontWeight: 700,
    color: 'text.primary',
    mb: 0.8
  };

  const brandingWhite = theme.palette.common.white;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        '@supports (height: 100dvh)': {
          minHeight: '100dvh'
        },
        bgcolor: 'background.default',
        color: 'text.primary',
        overflowX: 'hidden'
      }}
    >
      {/* Theme Toggle */}
      <Box
        sx={{
          position: 'absolute',
          top: {
            xs: 15,
            sm: 15,
            md: 'clamp(16px, 2vh, 28px)'
          },
          right: {
            xs: 15,
            sm: 15,
            md: 'clamp(20px, 2.5vw, 40px)'
          },
          zIndex: theme.zIndex.appBar
        }}
      >
        <ThemeToggle />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: '1 0 auto',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          px: {
            xs: 1.25,
            sm: 2.5,
            md: 'clamp(20px, 3.5vw, 64px)'
          },
          py: {
            xs: 3,
            sm: 4,
            md: isShortScreen ? 3 : 'clamp(24px, 4vh, 48px)'
          }
        }}
      >
        {/* Login Card */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isDesktop
              ? 'minmax(0, 0.95fr) minmax(0, 1.05fr)'
              : 'minmax(0, 1fr)',
            width: '100%',
            maxWidth: 900,
            minWidth: 0,
            mx: 'auto',
            minHeight:
              isDesktop && !isShortScreen
                ? 'min(620px, calc(100dvh - 64px))'
                : 'auto',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 'clamp(12px, 1.5vw, 24px)',
            overflow: 'hidden',
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[8]
          }}
        >
          {/* Desktop Branding Panel */}
          {isDesktop && (
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: 0,
                overflow: 'hidden',
                color: brandingWhite,
                background: theme.colors.gradients.blue3,
                p: 'clamp(22px, 3vw, 48px)'
              }}
            >
              {/* Decorative Elements */}
              <Box
                sx={{
                  position: 'absolute',
                  width: 'clamp(140px, 20vw, 320px)',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  border: `1px solid ${alpha(brandingWhite, 0.1)}`,
                  top: '-12%',
                  right: '-14%',
                  pointerEvents: 'none'
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  width: 'clamp(110px, 15vw, 240px)',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  border: `1px solid ${alpha(brandingWhite, 0.08)}`,
                  bottom: '-10%',
                  left: '-10%',
                  pointerEvents: 'none'
                }}
              />

              {/* Branding Content */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  maxWidth: 440,
                  my: 'auto'
                }}
              >
                {/* Desktop Logo */}
                <Box
                  component="img"
                  src={currentLogo}
                  alt={BRANDING.name}
                  sx={{
                    display: 'block',
                    width: 'clamp(200px, 23vw, 340px)',
                    maxWidth: '100%',
                    maxHeight: 'clamp(65px, 13vh, 125px)',
                    height: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'left center',
                    mb: isCompactScreen
                      ? 'clamp(14px, 2.5vh, 26px)'
                      : 'clamp(22px, 4vh, 40px)'
                  }}
                />

                <Typography
                  component="h1"
                  sx={{
                    color: brandingWhite,
                    fontWeight: 800,
                    fontSize: 'clamp(21px, 1.8vw, 32px)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.5px',
                    mb: 'clamp(10px, 1.6vh, 18px)',
                    maxWidth: 420
                  }}
                >
                  Simplifying Logistics.
                  <br />
                  Strengthening Your Business.
                </Typography>

                <Typography
                  component="p"
                  sx={{
                    color: alpha(brandingWhite, 0.78),
                    fontSize: 'clamp(12px, 0.85vw, 14px)',
                    lineHeight: 1.75,
                    fontWeight: 400,
                    maxWidth: 390,
                    m: 0
                  }}
                >
                  Your trusted logistics partner for warehousing, container
                  handling, pick and pack, and distribution. We help keep your
                  operations moving with reliable and efficient logistics
                  solutions.
                </Typography>
              </Box>

              {/* Branding Footer */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  mt: 'clamp(20px, 4vh, 44px)'
                }}
              >
                <Divider
                  sx={{
                    borderColor: alpha(brandingWhite, 0.18),
                    mb: 2
                  }}
                />

                <Typography
                  component="p"
                  sx={{
                    color: alpha(brandingWhite, 0.68),
                    fontSize: 'clamp(10px, 0.72vw, 12px)',
                    lineHeight: 1.6,
                    m: 0
                  }}
                >
                  Reliable logistics. Smarter operations. Better business.
                </Typography>
              </Box>
            </Box>
          )}

          {/* Login Form Panel */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 0,
              width: '100%',
              boxSizing: 'border-box',
              px: {
                xs: 'clamp(16px, 5vw, 24px)',
                sm: 'clamp(28px, 6vw, 48px)',
                md: 'clamp(28px, 3.5vw, 52px)'
              },
              py: {
                xs: 2.5,
                sm: 3.5,
                md: isCompactScreen ? 3 : 'clamp(28px, 4vh, 48px)'
              }
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: isDesktop ? 'clamp(280px, 32vw, 410px)' : 410,
                minWidth: 0
              }}
            >
              {/* Mobile / Tablet Logo */}
              {!isDesktop && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    mb: {
                      xs: 2,
                      sm: 3
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={mobileCurrentLogo}
                    alt={BRANDING.name}
                    sx={{
                      display: 'block',
                      width: 'clamp(190px, 65vw, 320px)',
                      maxWidth: '100%',
                      maxHeight: 'clamp(65px, 12vh, 110px)',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              )}

              {/* Form Heading */}
              <Box
                sx={{
                  mb: 'clamp(18px, 3vh, 30px)'
                }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: 'clamp(22px, 1.7vw, 30px)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.4px',
                    color: 'text.primary',
                    mb: 1
                  }}
                >
                  Welcome Back
                </Typography>

                <Typography
                  component="p"
                  sx={{
                    color: 'text.secondary',
                    fontSize: 'clamp(12px, 0.85vw, 14px)',
                    lineHeight: 1.7,
                    maxWidth: 360,
                    m: 0
                  }}
                >
                  Sign in to access your {BRANDING.name} account and manage your
                  operations from one place.
                </Typography>
              </Box>

              {/* Login Form */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(12px, 1.8vh, 18px)',
                  width: '100%'
                }}
              >
                {/* Email Field */}
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    component="label"
                    htmlFor="login-email"
                    sx={labelStyles}
                  >
                    Email Address
                  </Typography>

                  <TextField
                    id="login-email"
                    type="email"
                    fullWidth
                    required
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutline
                            sx={{
                              fontSize: 'clamp(17px, 1.2vw, 20px)',
                              color: 'text.secondary'
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
                    sx={inputStyles}
                  />
                </Box>

                {/* Password Field */}
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    component="label"
                    htmlFor="login-password"
                    sx={labelStyles}
                  >
                    Password
                  </Typography>

                  <TextField
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined
                            sx={{
                              fontSize: 'clamp(17px, 1.2vw, 20px)',
                              color: 'text.secondary'
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                            size="small"
                            aria-label={
                              showPassword ? 'Hide password' : 'Show password'
                            }
                          >
                            {showPassword ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={inputStyles}
                  />
                </Box>

                {/* Remember Me / Forgot Password */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    columnGap: 1,
                    rowGap: 0.5,
                    mt: -0.5
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(event) =>
                          setRememberMe(event.target.checked)
                        }
                        size="small"
                        sx={{
                          p: 0.5,
                          mr: 0.5
                        }}
                      />
                    }
                    label="Remember me"
                    sx={{
                      m: 0,
                      '& .MuiFormControlLabel-label': {
                        fontSize: 'clamp(11px, 0.8vw, 12px)',
                        color: 'text.secondary'
                      }
                    }}
                  />

                  <Typography
                    component="a"
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    sx={{
                      fontSize: 'clamp(11px, 0.8vw, 12px)',
                      fontWeight: 700,
                      color: 'primary.main',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Box>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    minHeight: 'clamp(42px, 5vh, 48px)',
                    mt: 0.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: 'clamp(13px, 0.85vw, 14px)',
                    boxShadow: theme.colors.shadows.primary,
                    '&:hover': {
                      boxShadow: theme.colors.shadows.primary
                    }
                  }}
                >
                  Sign In
                </Button>
              </Box>

              {/* Form Footer */}
              <Box
                sx={{
                  mt: {
                    xs: 2,
                    sm: 3
                  },
                  textAlign: 'center'
                }}
              >
                <Divider sx={{ mb: 2 }} />

                <Typography
                  component="p"
                  sx={{
                    fontSize: 'clamp(10px, 0.72vw, 11px)',
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    m: 0
                  }}
                >
                  © {new Date().getFullYear()} {BRANDING.name}. All rights
                  reserved.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
