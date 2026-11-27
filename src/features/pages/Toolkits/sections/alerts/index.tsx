
import {
  AlertTitle,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

import Alert from '@/features/components/Toolkits/Alert';

const AlertCard = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: '100%',
        p: 3,
        borderRadius: 2
      }}
    >
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>

        {children}
      </Stack>
    </Paper>
  );
};

const AlertGroup = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mb: 2 }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, minmax(0, 1fr))'
          },
          gap: 2
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const AlertsSection = () => {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
        >
          Alerts
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            lineHeight: 1.6
          }}
        >
          A collection of reusable alert styles, colors, variants, and interactive states.
        </Typography>
      </Box>

      <Divider />

      <AlertGroup title="Basic Alerts">
        <AlertCard title="Success">
          <Alert severity="success">
            This is a success alert.
          </Alert>
        </AlertCard>

        <AlertCard title="Information">
          <Alert severity="info">
            This is an informational alert.
          </Alert>
        </AlertCard>

        <AlertCard title="Warning">
          <Alert severity="warning">
            This is a warning alert.
          </Alert>
        </AlertCard>

        <AlertCard title="Error">
          <Alert severity="error">
            This is an error alert.
          </Alert>
        </AlertCard>
      </AlertGroup>

      <AlertGroup title="Outlined Alerts">
        <AlertCard title="Success">
          <Alert severity="success" variant="outlined">
            Your changes have been saved.
          </Alert>
        </AlertCard>

        <AlertCard title="Information">
          <Alert severity="info" variant="outlined">
            A new update is available.
          </Alert>
        </AlertCard>

        <AlertCard title="Warning">
          <Alert severity="warning" variant="outlined">
            Please review your information.
          </Alert>
        </AlertCard>

        <AlertCard title="Error">
          <Alert severity="error" variant="outlined">
            Something went wrong.
          </Alert>
        </AlertCard>
      </AlertGroup>

      <AlertGroup title="Filled Alerts">
        <AlertCard title="Success">
          <Alert severity="success" variant="filled">
            Operation completed successfully.
          </Alert>
        </AlertCard>

        <AlertCard title="Information">
          <Alert severity="info" variant="filled">
            Please take note of this information.
          </Alert>
        </AlertCard>

        <AlertCard title="Warning">
          <Alert severity="warning" variant="filled">
            Your session is about to expire.
          </Alert>
        </AlertCard>

        <AlertCard title="Error">
          <Alert severity="error" variant="filled">
            Unable to complete the request.
          </Alert>
        </AlertCard>
      </AlertGroup>

      <AlertGroup title="Alerts with Titles">
        <AlertCard title="Success with Title">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Your account has been updated successfully.
          </Alert>
        </AlertCard>

        <AlertCard title="Information with Title">
          <Alert severity="info">
            <AlertTitle>Information</AlertTitle>
            A new version of the application is available.
          </Alert>
        </AlertCard>

        <AlertCard title="Warning with Title">
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Your subscription will expire soon.
          </Alert>
        </AlertCard>

        <AlertCard title="Error with Title">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            We could not process your request.
          </Alert>
        </AlertCard>
      </AlertGroup>

      <AlertGroup title="Alerts with Actions">
        <AlertCard title="Action Button">
          <Alert
            severity="info"
            action={
              <Button color="inherit" size="small">
                View
              </Button>
            }
          >
            A new notification is available.
          </Alert>
        </AlertCard>

        <AlertCard title="Dismissible Alert">
          <Alert
            severity="success"
            onClose={() => {}}
          >
            Your profile has been updated.
          </Alert>
        </AlertCard>
      </AlertGroup>

      <AlertGroup title="Custom Icon Alerts">
        <AlertCard title="Success Icon">
          <Alert
            severity="success"
            icon={<CheckCircleOutlinedIcon fontSize="inherit" />}
          >
            Your changes have been saved.
          </Alert>
        </AlertCard>

        <AlertCard title="Information Icon">
          <Alert
            severity="info"
            icon={<InfoOutlinedIcon fontSize="inherit" />}
          >
            Here is some additional information.
          </Alert>
        </AlertCard>

        <AlertCard title="Warning Icon">
          <Alert
            severity="warning"
            icon={<WarningAmberOutlinedIcon fontSize="inherit" />}
          >
            Please check the submitted details.
          </Alert>
        </AlertCard>

        <AlertCard title="Error Icon">
          <Alert
            severity="error"
            icon={<ErrorOutlineOutlinedIcon fontSize="inherit" />}
          >
            The requested operation failed.
          </Alert>
        </AlertCard>

        <AlertCard title="Notification Icon">
          <Alert
            severity="info"
            icon={<NotificationsOutlinedIcon fontSize="inherit" />}
          >
            You have a new notification.
          </Alert>
        </AlertCard>

        <AlertCard title="Favorite Icon">
          <Alert
            severity="success"
            icon={<FavoriteBorderOutlinedIcon fontSize="inherit" />}
          >
            Added to your favorites.
          </Alert>
        </AlertCard>
      </AlertGroup>
    </Stack>
  );
};

export default AlertsSection;
