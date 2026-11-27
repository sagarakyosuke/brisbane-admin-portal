
import { useState } from 'react';

import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

import { useTheme } from '@mui/material/styles';

import type { DialogAlertProps } from '@/features/components/Toolkits/DialogAlert/useContext';

import {
  DialogAlertProvider,
  useDialogAlertContext
} from '@/features/components/Toolkits/DialogAlert/useContext';

const DialogAlertContent = ({
  children,
  icon,
  title,
  text,
  html,
  confirmButtonText,
  cancelButtonText,
  showCancelButton,
  reverseButtons,
  buttonsStyling,
  showConfirmButton,
  showCloseButton,
  allowOutsideClick,
  allowEscapeKey,
  toast,
  position,
  timer,
  timerProgressBar,
  buttonProps,
  onConfirm,
  onCancel
}: DialogAlertProps) => {
  const theme = useTheme();
  const context = useDialogAlertContext();

  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const result = await Swal.fire({
        icon,
        title,
        text,
        html,

        confirmButtonText:
          confirmButtonText ?? context.confirmButtonText,

        cancelButtonText:
          cancelButtonText ?? context.cancelButtonText,

        showCancelButton:
          showCancelButton ?? context.showCancelButton,

        reverseButtons:
          reverseButtons ?? context.reverseButtons,

        buttonsStyling:
          buttonsStyling ?? context.buttonsStyling,

        showConfirmButton,
        showCloseButton,
        allowOutsideClick,
        allowEscapeKey,

        toast: toast ?? false,
        position: position ?? 'center',
        timer,
        timerProgressBar,

        background: theme.palette.background.paper,
        color: theme.palette.text.primary,

        confirmButtonColor: theme.palette.primary.main,
        cancelButtonColor: theme.palette.secondary.main,

        backdrop: toast ? false : true,

        customClass: {
          popup: 'dialog-alert-popup',
          container: toast
            ? 'dialog-alert-toast'
            : 'dialog-alert-container'
        },

        didOpen: () => {
          const container = Swal.getContainer();

          if (container) {
            container.style.zIndex = String(theme.zIndex.modal + 1);

            if (!toast) {
              container.style.setProperty(
                '--swal2-backdrop',
                'rgba(0, 0, 0, 0.75)'
              );

              container.style.setProperty(
                'backdrop-filter',
                'blur(4px)'
              );
            }
          }
        }
      });

      if (result.isConfirmed) {
        onConfirm?.();
      } else if (result.isDismissed) {
        onCancel?.();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleOpen}
      disabled={loading || buttonProps?.disabled}
    >
      {children}
    </Button>
  );
};

const DialogAlert = ({
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  showCancelButton = false,
  reverseButtons = false,
  buttonsStyling = true,
  ...props
}: DialogAlertProps) => {
  return (
    <DialogAlertProvider
      value={{
        confirmButtonText,
        cancelButtonText,
        showCancelButton,
        reverseButtons,
        buttonsStyling
      }}
    >
      <DialogAlertContent
        {...props}
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
        showCancelButton={showCancelButton}
        reverseButtons={reverseButtons}
        buttonsStyling={buttonsStyling}
      />
    </DialogAlertProvider>
  );
};

export default DialogAlert;

export type {
  DialogAlertIcon,
  DialogAlertContextValue,
  DialogAlertProps
} from '@/features/components/Toolkits/DialogAlert/useContext';

export {
  DialogAlertProvider,
  useDialogAlertContext
} from '@/features/components/Toolkits/DialogAlert/useContext';
