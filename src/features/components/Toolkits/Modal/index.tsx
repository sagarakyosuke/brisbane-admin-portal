import { useId } from 'react';

import type { ReactNode } from 'react';

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import Button from '@/features/components/Toolkits/Button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onConfirm?: () => void;
}

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  maxWidth = 'sm',
  onConfirm
}: ModalProps) => {
  const titleId = useId();
  const descriptionId = useId();

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          onClose();
        }
      }}
      disableEscapeKeyDown
      fullWidth
      maxWidth={maxWidth}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      PaperProps={{
        sx: {
          m: { xs: 2, sm: 3 },
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          border: 1,
          borderColor: 'divider',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 20px 60px rgba(0, 0, 0, 0.4)'
              : '0 20px 60px rgba(18, 26, 87, 0.12)'
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)'
        }
      }}
    >
      <DialogTitle
        id={titleId}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2.5, sm: 3.5 },
          pt: { xs: 2.5, sm: 3.5 },
          pb: description ? 2 : 3,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            color="text.primary"
            sx={{
              fontSize: '1.125rem',
              lineHeight: 1.4,
              letterSpacing: '-0.35px'
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              id={descriptionId}
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.75,
                lineHeight: 1.65,
                maxWidth: 600
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close modal"
          sx={{
            flexShrink: 0,
            width: 32,
            height: 32,
            mt: -0.25,
            mr: -0.5,
            color: 'text.secondary',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'action.hover',
              color: 'text.primary'
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {children && (
        <DialogContent
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            py: 3,
            bgcolor: 'background.paper',
            '&:first-of-type': {
              pt: 3
            }
          }}
        >
          {children}
        </DialogContent>
      )}

      <DialogActions
        sx={{
          px: { xs: 2.5, sm: 3.5 },
          py: 2.5,
          gap: 1.25,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Button variant="outlined" color="inherit" onClick={onClose}>
          {cancelText}
        </Button>

        {onConfirm && (
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export type { ModalProps };

export default Modal;
