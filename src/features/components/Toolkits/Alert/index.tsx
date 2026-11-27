
import MuiAlert from '@mui/material/Alert';
import { alpha, useTheme } from '@mui/material/styles';

import type { AlertProps } from '@/features/components/Toolkits/Alert/useContext';

import {
  AlertProvider,
  useAlertContext
} from '@/features/components/Toolkits/Alert/useContext';

const AlertContent = (props: AlertProps) => {
  const theme = useTheme();
  const context = useAlertContext();

  const severity = props.severity ?? context.severity;
  const variant = props.variant ?? context.variant;
  const color = props.color ?? context.color ?? severity;

  const severityColor = theme.palette[color].main;

  return (
    <MuiAlert
      {...props}
      severity={severity}
      variant={variant}
      color={color}
      sx={[
        {
          width: '100%',
          borderRadius: 2,
          alignItems: 'center',
          fontSize: 14,

          '& .MuiAlert-message': {
            fontSize: 14,
            lineHeight: 1.6
          },

          '& .MuiAlert-icon': {
            fontSize: 22,
            alignItems: 'center'
          },

          '& .MuiAlert-action': {
            alignItems: 'center',
            paddingTop: 0
          },

          ...(variant === 'standard' && {
            backgroundColor: alpha(severityColor, 0.1),
            color: severityColor
          }),

          ...(variant === 'outlined' && {
            borderColor: alpha(severityColor, 0.5)
          })
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx])
      ]}
    />
  );
};

const Alert = ({
  severity = 'info',
  variant = 'standard',
  color,
  ...props
}: AlertProps) => {
  return (
    <AlertProvider
      value={{
        severity,
        variant,
        color
      }}
    >
      <AlertContent {...props} />
    </AlertProvider>
  );
};

export default Alert;

export type {
  AlertColor,
  AlertContextValue,
  AlertProps,
  AlertSeverity,
  AlertVariant
} from '@/features/components/Toolkits/Alert/useContext';

export {
  AlertProvider,
  useAlertContext
} from '@/features/components/Toolkits/Alert/useContext';
