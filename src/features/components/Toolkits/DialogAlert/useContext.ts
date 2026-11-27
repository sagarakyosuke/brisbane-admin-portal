
import {
  createContext,
  createElement,
  useContext
} from 'react';

import type { ReactNode } from 'react';

export type DialogAlertIcon =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'question';

export interface DialogAlertContextValue {
  confirmButtonText: string;
  cancelButtonText: string;
  showCancelButton: boolean;
  reverseButtons: boolean;
  buttonsStyling: boolean;
}

export interface DialogAlertProps {
  children: ReactNode;
  icon?: DialogAlertIcon;
  title?: string;
  text?: string;
  html?: string;

  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  reverseButtons?: boolean;
  buttonsStyling?: boolean;

  showConfirmButton?: boolean;
  showCloseButton?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;

  toast?: boolean;
  position?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'center'
    | 'center-start'
    | 'center-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';

  timer?: number;
  timerProgressBar?: boolean;

  buttonProps?: import('@mui/material/Button').ButtonProps;

  onConfirm?: () => void;
  onCancel?: () => void;
}

const defaultDialogAlertContext: DialogAlertContextValue = {
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  showCancelButton: false,
  reverseButtons: false,
  buttonsStyling: true
};

const DialogAlertContext = createContext<DialogAlertContextValue>(
  defaultDialogAlertContext
);

export const DialogAlertProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: DialogAlertContextValue;
}) => {
  return createElement(
    DialogAlertContext.Provider,
    { value },
    children
  );
};

export const useDialogAlertContext = (): DialogAlertContextValue => {
  return useContext(DialogAlertContext);
};
