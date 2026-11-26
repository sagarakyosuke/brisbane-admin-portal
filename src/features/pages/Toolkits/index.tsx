import { Box, Stack } from '@mui/material';

import ModalsSection from '@/features/pages/Toolkits/sections/modals';
import TableSection from '@/features/pages/Toolkits/sections/tables';
import ButtonSection from '@/features/pages/Toolkits/sections/buttons';
import BadgesSection from '@/features/pages/Toolkits/sections/badges';

const ToolkitsPage = () => {
  return (
    <Box>
      <Stack spacing={4}>
        <ModalsSection />
        <TableSection />
        <ButtonSection />
        <BadgesSection />
      </Stack>
    </Box>
  );
};

export default ToolkitsPage;
