import { useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import Modal from '@/features/components/Toolkits/Modal';
import ToolkitButton from '@/features/components/Toolkits/Button';

const ModalsSection = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [smallModalOpen, setSmallModalOpen] = useState(false);
  const [mediumModalOpen, setMediumModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const [extraLargeModalOpen, setExtraLargeModalOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Action confirmed');
  };

  const buttonGroupSx = {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    flexWrap: 'wrap',
    gap: 1.5,
    width: '100%',
    '& > button': {
      minWidth: {
        xs: '100%',
        sm: 'auto'
      }
    }
  };

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* Section heading */}
      <Stack spacing={1} sx={{ mb: { xs: 2.5, sm: 3 } }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            fontSize: {
              xs: '1.2rem',
              sm: '1.35rem'
            }
          }}
        >
          Modals
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.6
          }}
        >
          Reusable modal components and examples.
        </Typography>
      </Stack>

      {/* Modal examples */}
      <Stack spacing={{ xs: 3, sm: 4 }}>
        {/* Modal types */}
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Modal Types
          </Typography>

          <Box sx={buttonGroupSx}>
            <ToolkitButton
              variant="contained"
              color="primary"
              onClick={() => setBasicModalOpen(true)}
            >
              Basic Modal
            </ToolkitButton>

            <ToolkitButton
              variant="outlined"
              color="primary"
              onClick={() => setConfirmationModalOpen(true)}
            >
              Confirmation Modal
            </ToolkitButton>
          </Box>
        </Box>

        {/* Modal sizes */}
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Modal Sizes
          </Typography>

          <Box sx={buttonGroupSx}>
            <ToolkitButton
              variant="outlined"
              color="primary"
              onClick={() => setSmallModalOpen(true)}
            >
              Small (XS)
            </ToolkitButton>

            <ToolkitButton
              variant="outlined"
              color="primary"
              onClick={() => setMediumModalOpen(true)}
            >
              Medium (SM)
            </ToolkitButton>

            <ToolkitButton
              variant="outlined"
              color="primary"
              onClick={() => setLargeModalOpen(true)}
            >
              Large (LG)
            </ToolkitButton>

            <ToolkitButton
              variant="outlined"
              color="primary"
              onClick={() => setExtraLargeModalOpen(true)}
            >
              Extra Large (XL)
            </ToolkitButton>
          </Box>
        </Box>
      </Stack>

      {/* Basic Modal */}
      <Modal
        open={basicModalOpen}
        onClose={() => setBasicModalOpen(false)}
        title="Basic Modal"
        description="This is an example of a reusable modal."
        cancelText="Close"
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          You can place any React component or content inside this modal.
        </Typography>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        open={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to continue?"
        confirmText="Continue"
        cancelText="Cancel"
        onConfirm={handleConfirm}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          This action will proceed once you confirm.
        </Typography>
      </Modal>

      {/* Small Modal */}
      <Modal
        open={smallModalOpen}
        onClose={() => setSmallModalOpen(false)}
        title="Small Modal"
        description="Small modal example (XS)."
        maxWidth="xs"
        cancelText="Close"
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          This modal uses the extra-small width.
        </Typography>
      </Modal>

      {/* Medium Modal */}
      <Modal
        open={mediumModalOpen}
        onClose={() => setMediumModalOpen(false)}
        title="Medium Modal"
        description="Medium modal example (SM)."
        maxWidth="sm"
        cancelText="Close"
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          This modal uses the small width.
        </Typography>
      </Modal>

      {/* Large Modal */}
      <Modal
        open={largeModalOpen}
        onClose={() => setLargeModalOpen(false)}
        title="Large Modal"
        description="Large modal example (LG)."
        maxWidth="lg"
        cancelText="Close"
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          This modal uses the large width.
        </Typography>
      </Modal>

      {/* Extra Large Modal */}
      <Modal
        open={extraLargeModalOpen}
        onClose={() => setExtraLargeModalOpen(false)}
        title="Extra Large Modal"
        description="Extra large modal example (XL)."
        maxWidth="xl"
        cancelText="Close"
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          This modal uses the extra-large width.
        </Typography>
      </Modal>
    </Box>
  );
};

export default ModalsSection;
