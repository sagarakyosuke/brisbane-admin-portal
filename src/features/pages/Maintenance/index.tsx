import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { Build as BuildIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MaintenancePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 400,
        px: 2,
        py: 3,
        bgcolor: theme.palette.background.default,
        textAlign: 'center',
        boxSizing: 'border-box'
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          mb: 3,
          borderRadius: 4,
          bgcolor: theme.palette.background.paper,
          color: theme.colors.primary.main,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <BuildIcon sx={{ fontSize: 40 }} />
      </Box>

      {/* Heading */}
      <Typography
        variant="h3"
        fontWeight={900}
        color="text.primary"
        sx={{
          mb: 1.5,
          fontSize: { xs: '1.8rem', md: '2.5rem' },
          letterSpacing: '-0.03em'
        }}
      >
        Under Maintenance
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 480,
          mb: 3,
          lineHeight: 1.6
        }}
      >
        We are currently performing scheduled maintenance to improve your
        experience. Please check back shortly.
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{
          px: 4,
          py: 1.25,
          borderRadius: theme.general.borderRadius,
          bgcolor: theme.colors.primary.main,
          color: theme.colors.alpha.white[100],
          boxShadow: theme.colors.shadows.primary,
          fontWeight: 700,
          textTransform: 'none',
          '&:hover': {
            bgcolor: theme.colors.primary.dark
          }
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default MaintenancePage;
