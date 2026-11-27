
import { useCallback, useMemo, useState, type ReactNode } from 'react';

import {
  Backdrop,
  Box,
  type SxProps,
  type Theme,
} from '@mui/material';

import type { SystemStyleObject } from '@mui/system';

import { alpha } from '@mui/material/styles';

import {
  OverlayContext,
  useOverlayContext,
  type OverlayContextValue,
} from '@/features/components/Loader/Overlay/useContext';

/* =====================================================================
 * Types
 * ===================================================================== */

interface OverlayLoaderProps {
  open: boolean;
}

interface OverlayProviderProps {
  children: ReactNode;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

const RING_SIZE = { xs: 120, md: 140 };
const GLOW_SIZE = { xs: 420, md: 620 };

const BRAND_BARS = [
  { key: 'primary-light', delay: '0s' },
  { key: 'primary', delay: '0.15s' },
  { key: 'secondary', delay: '0.3s' },
] as const;

/* =====================================================================
 * Keyframes
 * ===================================================================== */

const SPIN_KEYFRAMES = {
  '@keyframes overlaySpin': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
  },
};

const SPIN_REVERSE_KEYFRAMES = {
  '@keyframes overlaySpinReverse': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(-360deg)' },
  },
};

const BREATHE_KEYFRAMES = {
  '@keyframes overlayBreathe': {
    '0%, 100%': { transform: 'scale(1)', opacity: 0.85 },
    '50%': { transform: 'scale(1.12)', opacity: 1 },
  },
};

const BAR_PULSE_KEYFRAMES = {
  '@keyframes overlayBarPulse': {
    '0%, 100%': { transform: 'scaleY(0.5)', opacity: 0.4 },
    '50%': { transform: 'scaleY(1)', opacity: 1 },
  },
};

const SHIMMER_KEYFRAMES = {
  '@keyframes overlayShimmer': {
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  },
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

const BACKDROP_SX = (
  theme: Theme,
): SystemStyleObject<Theme> => ({
  zIndex: theme.zIndex.modal + 999,
  color: theme.palette.common.white,
  backgroundColor: alpha(theme.palette.secondary.main, 0.85),
  backdropFilter: 'blur(8px)',
  pointerEvents: 'all',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  overflow: 'hidden',
  overscrollBehavior: 'contain',
});

const GLOW_SX = (theme: Theme): SystemStyleObject<Theme> => ({
  position: 'absolute',
  width: GLOW_SIZE,
  height: GLOW_SIZE,
  borderRadius: '50%',
  background: `radial-gradient(
    circle,
    ${alpha(theme.palette.secondary.main, 0.18)} 0%,
    ${alpha(theme.palette.secondary.main, 0.06)} 40%,
    transparent 70%
  )`,
  filter: 'blur(40px)',
  pointerEvents: 'none',
  animation: 'overlayBreathe 4s ease-in-out infinite',
  ...BREATHE_KEYFRAMES,
});

const RINGS_CONTAINER_SX: SxProps<Theme> = {
  position: 'relative',
  width: RING_SIZE,
  height: RING_SIZE,
};

const STATIC_TRACK_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  borderRadius: '50%',
  border: '2px solid rgba(255,255,255,0.06)',
};

const RING_BASE_SX: SystemStyleObject<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '50%',
  border: '2px solid transparent',
};

const OUTER_RING_SX = (
  theme: Theme,
): SystemStyleObject<Theme> => ({
  ...RING_BASE_SX,
  width: '100%',
  height: '100%',
  borderTopColor: theme.palette.primary.main,
  borderRightColor: alpha(theme.palette.primary.main, 0.3),
  filter: `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.5)})`,
  animation: 'overlaySpin 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  ...SPIN_KEYFRAMES,
});

const MIDDLE_RING_SX = (
  theme: Theme,
): SystemStyleObject<Theme> => ({
  ...RING_BASE_SX,
  width: '72%',
  height: '72%',
  borderBottomColor: theme.palette.info.main,
  borderLeftColor: alpha(theme.palette.info.main, 0.3),
  filter: `drop-shadow(0 0 6px ${alpha(theme.palette.info.main, 0.4)})`,
  animation:
    'overlaySpinReverse 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  ...SPIN_REVERSE_KEYFRAMES,
});

const INNER_RING_SX = (
  theme: Theme,
): SystemStyleObject<Theme> => ({
  ...RING_BASE_SX,
  width: '44%',
  height: '44%',
  borderTopColor: theme.palette.info.dark,
  opacity: 0.8,
  animation: 'overlaySpin 3.2s linear infinite',
  ...SPIN_KEYFRAMES,
});

const BRAND_BARS_CONTAINER_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) skewX(-14deg)',
  display: 'flex',
  gap: '3px',
};

const BRAND_BAR_SX = (
  color: string,
  delay: string,
): SystemStyleObject<Theme> => ({
  width: 3,
  height: 24,
  bgcolor: color,
  borderRadius: '2px',
  animation: 'overlayBarPulse 1.8s ease-in-out infinite',
  animationDelay: delay,
  ...BAR_PULSE_KEYFRAMES,
});

const LOADING_TEXT_SX = (
  theme: Theme,
): SystemStyleObject<Theme> => ({
  fontWeight: 800,
  letterSpacing: '0.32em',
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  background: `linear-gradient(
    90deg,
    ${alpha(theme.palette.primary.contrastText, 0.3)} 0%,
    ${theme.palette.common.white} 50%,
    ${alpha(theme.palette.primary.contrastText, 0.3)} 100%
  )`,
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'overlayShimmer 2.5s linear infinite',
  ...SHIMMER_KEYFRAMES,
});

/* =====================================================================
 * OverlayLoader
 * ===================================================================== */

export const OverlayLoader = ({ open }: OverlayLoaderProps) => (
  <Backdrop open={open} sx={BACKDROP_SX}>
    <Box aria-hidden sx={GLOW_SX} />

    <Box sx={RINGS_CONTAINER_SX}>
      <Box sx={STATIC_TRACK_SX} />
      <Box sx={OUTER_RING_SX} />
      <Box sx={MIDDLE_RING_SX} />
      <Box sx={INNER_RING_SX} />

      <Box sx={BRAND_BARS_CONTAINER_SX}>
        {BRAND_BARS.map((bar) => (
          <Box
            key={bar.key}
            sx={(theme) =>
              BRAND_BAR_SX(
                bar.key === 'primary-light'
                  ? theme.palette.info.light
                  : bar.key === 'primary'
                    ? theme.palette.info.dark
                    : theme.palette.primary.main,
                bar.delay,
              )
            }
          />
        ))}
      </Box>
    </Box>

    <Box sx={LOADING_TEXT_SX}>Loading</Box>
  </Backdrop>
);

/* =====================================================================
 * OverlayProvider
 * ===================================================================== */

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [open, setOpen] = useState(false);

  const showOverlay = useCallback(() => {
    setOpen(true);
  }, []);

  const hideOverlay = useCallback(() => {
    setOpen(false);
  }, []);

  const contextValue = useMemo<OverlayContextValue>(
    () => ({
      open,
      showOverlay,
      hideOverlay,
    }),
    [open, showOverlay, hideOverlay],
  );

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      <OverlayLoader open={open} />
    </OverlayContext.Provider>
  );
};

/* =====================================================================
 * Exports
 * ===================================================================== */

export { useOverlayContext };
export type { OverlayContextValue, OverlayProviderProps };
