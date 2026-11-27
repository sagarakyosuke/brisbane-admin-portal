
import type { ReactNode } from 'react';

import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import DialogAlert from '@/features/components/Toolkits/DialogAlert';

const DialogAlertCard = ({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) => (
  <Paper
    variant="outlined"
    sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 2,
      height: '100%'
    }}
  >
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {description}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 1.5
        }}
      >
        {children}
      </Box>
    </Stack>
  </Paper>
);

const AlertDialogsSection = () => {
  return (
    <Stack spacing={3}>
        <Box>
            <Typography
                variant="h6"
                fontWeight={700}
                sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
                Alert Dialogs
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
                A collection of reusable alert dialogs, confirmation prompts, and toast notifications.
            </Typography>
        </Box>

      <Divider />

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
        <DialogAlertCard
          title="Basic Alerts"
          description="Simple messages for different application states."
        >
          <DialogAlert
            icon="success"
            title="Success!"
            text="Your operation was completed successfully."
            buttonProps={{ variant: 'contained', color: 'success' }}
          >
            Success
          </DialogAlert>

          <DialogAlert
            icon="info"
            title="Information"
            text="Here is some important information."
            buttonProps={{ variant: 'contained' }}
          >
            Information
          </DialogAlert>

          <DialogAlert
            icon="warning"
            title="Warning!"
            text="Please review your information before continuing."
            buttonProps={{ variant: 'contained', color: 'warning' }}
          >
            Warning
          </DialogAlert>

          <DialogAlert
            icon="error"
            title="Error!"
            text="Something went wrong while processing your request."
            buttonProps={{ variant: 'contained', color: 'error' }}
          >
            Error
          </DialogAlert>
        </DialogAlertCard>

        <DialogAlertCard
          title="Question Dialogs"
          description="Ask users questions and provide a response."
        >
          <DialogAlert
            icon="question"
            title="Are you sure?"
            text="Do you want to continue with this operation?"
            showCancelButton
            onConfirm={() => {
              console.log('User confirmed the operation.');
            }}
          >
            Ask Question
          </DialogAlert>

          <DialogAlert
            icon="question"
            title="Continue?"
            text="This action will proceed to the next step."
            confirmButtonText="Continue"
            cancelButtonText="Go Back"
            showCancelButton
            reverseButtons
            buttonProps={{ variant: 'outlined' }}
          >
            Continue Dialog
          </DialogAlert>
        </DialogAlertCard>

        <DialogAlertCard
          title="Confirmation Dialogs"
          description="Confirm important user actions."
        >
          <DialogAlert
            icon="success"
            title="Changes Saved"
            text="Your changes have been saved successfully."
            confirmButtonText="Great!"
            buttonProps={{ variant: 'contained', color: 'success' }}
          >
            Success Confirmation
          </DialogAlert>

          <DialogAlert
            icon="warning"
            title="Unsaved Changes"
            text="You have unsaved changes. Are you sure you want to leave?"
            confirmButtonText="Leave"
            cancelButtonText="Stay"
            showCancelButton
            onConfirm={() => {
              console.log('User confirmed leaving.');
            }}
            buttonProps={{ variant: 'outlined', color: 'warning' }}
          >
            Unsaved Changes
          </DialogAlert>
        </DialogAlertCard>

        <DialogAlertCard
          title="Delete Confirmation"
          description="Confirmation before permanently deleting records."
        >
          <DialogAlert
            icon="warning"
            title="Delete this record?"
            text="This action cannot be undone."
            confirmButtonText="Yes, delete it"
            cancelButtonText="Cancel"
            showCancelButton
            reverseButtons
            onConfirm={() => {
              console.log('Delete confirmed.');
            }}
            buttonProps={{ variant: 'contained', color: 'error' }}
          >
            Delete Record
          </DialogAlert>
        </DialogAlertCard>

        <DialogAlertCard
          title="Custom Dialog Buttons"
          description="Customize button labels and dialog actions."
        >
          <DialogAlert
            icon="info"
            title="Review Required"
            text="Please review the information before submitting."
            confirmButtonText="Review"
            cancelButtonText="Dismiss"
            showCancelButton
            reverseButtons
            buttonProps={{ variant: 'outlined' }}
          >
            Custom Buttons
          </DialogAlert>

          <DialogAlert
            icon="success"
            title="Completed"
            text="Your request has been successfully submitted."
            confirmButtonText="Done"
            showCloseButton
            buttonProps={{ variant: 'contained' }}
          >
            Close Button
          </DialogAlert>
        </DialogAlertCard>

        <DialogAlertCard
          title="Toast Notifications"
          description="Small notifications that automatically disappear."
        >
          <DialogAlert
            toast
            position="top-end"
            icon="success"
            title="Saved successfully"
            timer={3000}
            timerProgressBar
            showConfirmButton={false}
            buttonProps={{ variant: 'contained', color: 'success' }}
          >
            Success Toast
          </DialogAlert>

          <DialogAlert
            toast
            position="top-end"
            icon="error"
            title="Something went wrong"
            timer={3000}
            timerProgressBar
            showConfirmButton={false}
            buttonProps={{ variant: 'contained', color: 'error' }}
          >
            Error Toast
          </DialogAlert>
        </DialogAlertCard>
      </Box>
    </Stack>
  );
};

export default AlertDialogsSection;
