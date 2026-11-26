import type { ReactNode } from 'react';

import { Button as MuiButton, IconButton, useTheme } from '@mui/material';

import type { ButtonProps } from '@mui/material';

interface ToolkitButtonProps extends ButtonProps {
  iconOnly?: boolean;
  icon?: ReactNode;
}

const Button = ({
  iconOnly = false,
  icon,
  size = 'medium',
  sx,
  children,
  ...props
}: ToolkitButtonProps) => {
  const theme = useTheme();

  const buttonStyles = {
    minHeight: size === 'small' ? 32 : size === 'large' ? 48 : 40,
    px: size === 'small' ? 1.75 : size === 'large' ? 3 : 2.5,
    borderRadius: '9px',
    fontWeight: 600,
    fontSize:
      size === 'small' ? '0.8rem' : size === 'large' ? '0.95rem' : '0.875rem',
    textTransform: 'none' as const,
    boxShadow: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: 'none',
      transform: 'translateY(-1px)'
    },
    '&:active': {
      transform: 'translateY(0)'
    },
    '&.Mui-disabled': {
      opacity: theme.palette.mode === 'dark' ? 0.45 : 0.6
    }
  };

  if (iconOnly) {
    return (
      <IconButton
        {...props}
        size={size}
        sx={{
          width: size === 'small' ? 32 : size === 'large' ? 48 : 40,
          height: size === 'small' ? 32 : size === 'large' ? 48 : 40,
          borderRadius: '9px',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)'
          },
          '&:active': {
            transform: 'translateY(0)'
          },
          ...sx
        }}
      >
        {icon || children}
      </IconButton>
    );
  }

  return (
    <MuiButton
      {...props}
      size={size}
      sx={{
        ...buttonStyles,
        ...sx
      }}
    >
      {icon && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          {icon}
        </span>
      )}

      {children}
    </MuiButton>
  );
};

export type { ToolkitButtonProps };

export default Button;
