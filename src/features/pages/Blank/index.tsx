import React from 'react';

import { Box, useTheme } from '@mui/material';

const BlankPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '400px',
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.general.borderRadiusLg,
        boxShadow: 'none'
      }}
    />
  );
};

export default BlankPage;
