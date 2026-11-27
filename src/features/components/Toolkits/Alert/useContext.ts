
import {
  createContext,
  createElement,
  useContext
} from 'react';

import type { ReactNode } from 'react';
import type { AlertProps as MuiAlertProps } from '@mui/material/Alert';

export type AlertVariant = 'filled' | 'outlined' | 'standard';

export type AlertSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'error';

export type AlertColor =
  | 'success'
  | 'info'
  | 'warning'
  | 'error';

export interface AlertProps
  extends Omit<MuiAlertProps, 'severity' | 'variant' | 'color'> {
  severity?: AlertSeverity;
  variant?: AlertVariant;
  color?: AlertColor;
}

export interface AlertContextValue {
  severity: AlertSeverity;
  variant: AlertVariant;
  color?: AlertColor;
}

const AlertContext = createContext<AlertContextValue | undefined>(
  undefined
);

export const AlertProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: AlertContextValue;
}) => {
  return createElement(
    AlertContext.Provider,
    { value },
    children
  );
};

export const useAlertContext = (): AlertContextValue => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(
      'useAlertContext must be used within an AlertProvider'
    );
  }

  return context;
};
