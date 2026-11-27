
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';

import type { SxProps, Theme } from '@mui/material/styles';

import type {
  BadgeColor,
  BadgeProps,
  BadgeSize,
  BadgeVariant
} from '@/features/components/Toolkits/Badge/useContext';

import {
  BadgeProvider,
  useBadgeContext
} from '@/features/components/Toolkits/Badge/useContext';

const getVariantSx = (
  variant: BadgeVariant,
  color: BadgeColor
): SxProps<Theme> => {
  return (theme) => {
    const palette =
      color === 'default'
        ? null
        : theme.palette[color];

    if (variant === 'plain') {
      if (!palette) {
        return {
          bgcolor: theme.palette.action.hover,
          color: theme.palette.text.primary,
          border: '1px solid transparent',

          '&:hover': {
            bgcolor: theme.palette.action.selected
          }
        };
      }

      return {
        bgcolor: alpha(
          palette.main,
          theme.palette.mode === 'dark' ? 0.2 : 0.1
        ),
        color:
          theme.palette.mode === 'dark'
            ? palette.light
            : palette.dark,
        border: '1px solid transparent',

        '&:hover': {
          bgcolor: alpha(
            palette.main,
            theme.palette.mode === 'dark' ? 0.3 : 0.16
          )
        }
      };
    }

    if (variant === 'outlined') {
      if (!palette) {
        return {
          borderColor: alpha(theme.palette.text.primary, 0.25),
          color: theme.palette.text.primary,

          '&:hover': {
            bgcolor: theme.palette.action.hover
          }
        };
      }

      return {
        borderColor: alpha(palette.main, 0.5),

        '&:hover': {
          bgcolor: alpha(
            palette.main,
            theme.palette.mode === 'dark' ? 0.16 : 0.06
          )
        }
      };
    }

    return {};
  };
};

const getSizeSx = (
  size: BadgeSize,
  isIconOnly: boolean
): SxProps<Theme> => {
  return (theme) => {
    const dimensions = {
      small: theme.spacing(3),
      medium: theme.spacing(4),
      large: theme.spacing(5)
    };

    const iconSizes = {
      small: theme.spacing(1.75),
      medium: theme.spacing(2),
      large: theme.spacing(2.5)
    };

    const dimension = dimensions[size];

    return {
      height: dimension,
      minWidth: isIconOnly ? dimension : undefined,
      fontSize: size === 'small'
        ? theme.typography.pxToRem(11)
        : size === 'large'
          ? theme.typography.pxToRem(14)
          : theme.typography.pxToRem(12),

      ...(isIconOnly && {
        width: dimension,

        '& .MuiChip-label': {
          display: 'none'
        },

        '& .MuiChip-icon': {
          margin: 0,
          fontSize: iconSizes[size]
        }
      }),

      ...(!isIconOnly && {
        '& .MuiChip-label': {
          px: size === 'small' ? 1 : size === 'large' ? 2 : 1.5
        },

        '& .MuiChip-icon': {
          fontSize: iconSizes[size],
          ml: 1,
          mr: -0.5
        }
      })
    };
  };
};

const BadgeContent = (props: BadgeProps) => {
  const context = useBadgeContext();

  const resolvedColor = props.color ?? context.color;
  const resolvedVariant = props.variant ?? context.variant;
  const resolvedSize = props.size ?? context.size;

  const isIconOnly = Boolean(props.icon) && !props.label;

  return (
    <Chip
      {...props}
      color={resolvedColor}
      variant={
        resolvedVariant === 'plain'
          ? 'filled'
          : resolvedVariant
      }
      size={
        resolvedSize === 'large'
          ? 'medium'
          : resolvedSize
      }
      sx={[
        (theme) => ({
          borderRadius: theme.shape.borderRadius,
          fontWeight: 600,
          letterSpacing: '0.01em',
          verticalAlign: 'middle',
          transition: theme.transitions.create(
            ['background-color', 'border-color', 'color', 'box-shadow'],
            {
              duration: theme.transitions.duration.short
            }
          ),

          '& .MuiChip-label': {
            whiteSpace: 'nowrap'
          },

          '& .MuiChip-deleteIcon': {
            color: 'inherit',
            opacity: 0.7,
            transition: theme.transitions.create('opacity'),

            '&:hover': {
              opacity: 1
            }
          },

          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: theme.spacing(0.25)
          }
        }),

        getVariantSx(resolvedVariant, resolvedColor),
        getSizeSx(resolvedSize, isIconOnly),

        ...(Array.isArray(props.sx)
          ? props.sx
          : props.sx
            ? [props.sx]
            : [])
      ]}
    />
  );
};

const Badge = ({
  color = 'default',
  variant = 'filled',
  size = 'medium',
  ...props
}: BadgeProps) => {
  return (
    <BadgeProvider
      value={{
        color,
        variant,
        size
      }}
    >
      <BadgeContent {...props} />
    </BadgeProvider>
  );
};

export default Badge;

export type {
  BadgeColor,
  BadgeProps,
  BadgeSize,
  BadgeVariant
} from '@/features/components/Toolkits/Badge/useContext';

export {
  BadgeProvider,
  useBadgeContext
} from '@/features/components/Toolkits/Badge/useContext';
