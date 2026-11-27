
import {
  createContext,
  createElement,
  useContext
} from 'react';

import type { ReactNode } from 'react';
import type { ChipProps } from '@mui/material/Chip';

export type BadgeVariant = 'filled' | 'outlined' | 'plain';

export type BadgeColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps
  extends Omit<ChipProps, 'color' | 'variant' | 'size'> {
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export interface BadgeContextValue {
  color: BadgeColor;
  variant: BadgeVariant;
  size: BadgeSize;
}

const defaultBadgeContext: BadgeContextValue = {
  color: 'default',
  variant: 'filled',
  size: 'medium'
};

const BadgeContext = createContext<BadgeContextValue>(
  defaultBadgeContext
);

export const BadgeProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: BadgeContextValue;
}) => {
  return createElement(
    BadgeContext.Provider,
    { value },
    children
  );
};

export const useBadgeContext = (): BadgeContextValue => {
  return useContext(BadgeContext);
};
