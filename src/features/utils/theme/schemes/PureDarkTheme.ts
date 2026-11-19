import { alpha, createTheme, lighten, darken } from '@mui/material';
import '@mui/lab/themeAugmentation';

const themeColors = {
  primary: '#f58220',
  secondary: '#6E759F',
  success: '#57CA22',
  warning: '#FFA319',
  error: '#FF1943',
  info: '#33C2FF',
  black: '#ffffff',
  white: '#121a2b',
  primaryAlt: '#000C57'
};

const colors = {
  gradients: {
    blue1: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
    blue2: 'linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)',
    blue3: 'linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)',
    blue4: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
    blue5: 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
    orange1: 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)',
    orange2: 'linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)',
    orange3: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    purple1: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)',
    purple3: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pink1: 'linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%)',
    pink2: 'linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)',
    green1: 'linear-gradient(135deg, #FFF720 0%, #3CD500 100%)',
    green2: 'linear-gradient(to bottom, #00b09b, #96c93d)',
    black1: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%)',
    black2: 'linear-gradient(60deg, #29323c 0%, #485563 100%)'
  },
  shadows: {
    success:
      '0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)',
    error:
      '0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)',
    info: '0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)',
    primary:
      '0px 1px 4px rgba(245, 130, 32, 0.25), 0px 3px 12px 2px rgba(245, 130, 32, 0.35)',
    warning:
      '0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)',
    card: '0px 9px 16px rgba(0, 0, 0, 0.5), 0px 2px 2px rgba(0, 0, 0, 0.35)',
    cardSm: '0px 2px 3px rgba(0, 0, 0, 0.5), 0px 1px 1px rgba(0, 0, 0, 0.35)',
    cardLg:
      '0 5rem 14rem 0 rgb(255 255 255 / 30%), 0 0.8rem 2.3rem rgb(0 0 0 / 60%), 0 0.2rem 0.3rem rgb(0 0 0 / 45%)'
  },
  layout: {
    general: {
      bodyBg: '#0b1120'
    },
    sidebar: {
      background: '#121a2b',
      textColor: '#e2e8f0',
      dividerBg: 'rgba(255,255,255,0.08)',
      menuItemColor: 'rgba(255,255,255,0.7)',
      menuItemColorActive: themeColors.primary,
      menuItemBg: 'transparent',
      menuItemBgActive: alpha(themeColors.primary, 0.15),
      menuItemIconColor: 'rgba(255,255,255,0.5)',
      menuItemIconColorActive: themeColors.primary,
      menuItemHeadingColor: 'rgba(255,255,255,0.9)'
    }
  },
  alpha: {
    white: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white
    },
    trueWhite: {
      5: alpha('#ffffff', 0.02),
      10: alpha('#ffffff', 0.1),
      30: alpha('#ffffff', 0.3),
      50: alpha('#ffffff', 0.5),
      70: alpha('#ffffff', 0.7),
      100: '#ffffff'
    },
    black: {
      5: alpha(themeColors.black, 0.02),
      10: alpha(themeColors.black, 0.1),
      30: alpha(themeColors.black, 0.3),
      50: alpha(themeColors.black, 0.5),
      70: alpha(themeColors.black, 0.7),
      100: themeColors.black
    }
  },
  secondary: {
    lighter: alpha(themeColors.secondary, 0.1),
    light: lighten(themeColors.secondary, 0.3),
    main: themeColors.secondary,
    dark: darken(themeColors.secondary, 0.2)
  },
  primary: {
    lighter: alpha(themeColors.primary, 0.1),
    light: lighten(themeColors.primary, 0.3),
    main: themeColors.primary,
    dark: darken(themeColors.primary, 0.2)
  },
  success: {
    lighter: alpha(themeColors.success, 0.1),
    light: lighten(themeColors.success, 0.3),
    main: themeColors.success,
    dark: darken(themeColors.success, 0.2)
  },
  warning: {
    lighter: alpha(themeColors.warning, 0.1),
    light: lighten(themeColors.warning, 0.3),
    main: themeColors.warning,
    dark: darken(themeColors.warning, 0.2)
  },
  error: {
    lighter: alpha(themeColors.error, 0.1),
    light: lighten(themeColors.error, 0.3),
    main: themeColors.error,
    dark: darken(themeColors.error, 0.2)
  },
  info: {
    lighter: alpha(themeColors.info, 0.1),
    light: lighten(themeColors.info, 0.3),
    main: themeColors.info,
    dark: darken(themeColors.info, 0.2)
  }
};

export const PureDarkTheme = createTheme({
  colors: {
    gradients: colors.gradients,
    shadows: {
      success: colors.shadows.success,
      error: colors.shadows.error,
      primary: colors.shadows.primary,
      info: colors.shadows.info,
      warning: colors.shadows.warning
    },
    alpha: colors.alpha,
    secondary: colors.secondary,
    primary: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info
  },
  general: {
    reactFrameworkColor: '#00D8FF',
    borderRadiusSm: '6px',
    borderRadius: '10px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px'
  },
  sidebar: {
    background: colors.layout.sidebar.background,
    textColor: colors.layout.sidebar.textColor,
    dividerBg: colors.layout.sidebar.dividerBg,
    menuItemColor: colors.layout.sidebar.menuItemColor,
    menuItemColorActive: colors.layout.sidebar.menuItemColorActive,
    menuItemBg: colors.layout.sidebar.menuItemBg,
    menuItemBgActive: colors.layout.sidebar.menuItemBgActive,
    menuItemIconColor: colors.layout.sidebar.menuItemIconColor,
    menuItemIconColorActive: colors.layout.sidebar.menuItemIconColorActive,
    menuItemHeadingColor: colors.layout.sidebar.menuItemHeadingColor,
    boxShadow: '2px 0 3px rgba(0, 0, 0, 0.5)',
    width: '290px'
  },
  header: {
    height: '80px',
    background: '#121a2b',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    textColor: '#ffffff'
  },
  spacing: 9,
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff'
    },
    mode: 'dark',
    primary: {
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark
    },
    secondary: {
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark
    },
    error: {
      light: colors.error.light,
      main: colors.error.main,
      dark: colors.error.dark,
      contrastText: '#ffffff'
    },
    success: {
      light: colors.success.light,
      main: colors.success.main,
      dark: colors.success.dark,
      contrastText: '#ffffff'
    },
    info: {
      light: colors.info.light,
      main: colors.info.main,
      dark: colors.info.dark,
      contrastText: '#ffffff'
    },
    warning: {
      light: colors.warning.light,
      main: colors.warning.main,
      dark: colors.warning.dark,
      contrastText: '#ffffff'
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
      disabled: 'rgba(255,255,255,0.5)'
    },
    background: {
      paper: '#121a2b',
      default: '#0b1120'
    },
    action: {
      active: '#ffffff',
      hover: alpha(colors.primary.main, 0.15),
      hoverOpacity: 0.15,
      selected: 'rgba(255,255,255,0.1)',
      selectedOpacity: 0.1,
      disabled: 'rgba(255,255,255,0.5)',
      disabledBackground: 'rgba(255,255,255,0.05)',
      disabledOpacity: 0.38,
      focus: 'rgba(255,255,255,0.1)',
      focusOpacity: 0.05,
      activatedOpacity: 0.12
    },
    tonalOffset: 0.5
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1840
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          width: '100%',
          height: '100%'
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          flex: 1
        },
        '#root': {
          width: '100%',
          height: '100%',
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        },
        html: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '0 !important',
          padding: '0 !important'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 0,
          backgroundImage: 'none'
        },
        elevation0: {
          boxShadow: 'none'
        },
        elevation: {
          boxShadow: colors.shadows.card
        },
        elevation2: {
          boxShadow: colors.shadows.cardSm
        },
        elevation24: {
          boxShadow: colors.shadows.cardLg
        },
        outlined: {
          boxShadow: colors.shadows.card
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.1)',
          border: 0,
          height: 1
        },
        vertical: {
          height: 'auto',
          width: 1
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          padding: 12
        },
        list: {
          padding: 12,
          '& .MuiMenuItem-root.MuiButtonBase-root': {
            fontSize: 14,
            marginTop: 1,
            marginBottom: 1,
            transition: 'all .2s',
            color: 'rgba(255,255,255,0.7)',
            '&:hover, &:active, &.active, &.Mui-selected': {
              color: '#ffffff',
              background: alpha(colors.primary.main, 0.15)
            }
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: 'transparent',
          transition: 'all .2s',
          '&:hover, &:active, &.active, &.Mui-selected': {
            color: '#ffffff',
            background: alpha(colors.primary.main, 0.15)
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.9)',
          padding: '8px 16px',
          fontSize: 13
        },
        arrow: {
          color: 'rgba(0,0,0,0.9)'
        }
      }
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: 35
    },
    h2: {
      fontWeight: 700,
      fontSize: 30
    },
    h3: {
      fontWeight: 700,
      fontSize: 25,
      lineHeight: 1.4,
      color: '#ffffff'
    },
    h4: {
      fontWeight: 700,
      fontSize: 16
    },
    h5: {
      fontWeight: 700,
      fontSize: 14
    },
    h6: {
      fontSize: 15
    },
    body1: {
      fontSize: 14
    },
    body2: {
      fontSize: 14
    },
    button: {
      fontWeight: 600
    },
    caption: {
      fontSize: 13,
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.5)'
    },
    subtitle1: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)'
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: 15,
      color: 'rgba(255,255,255,0.7)'
    },
    overline: {
      fontSize: 13,
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none'
  ]
});
