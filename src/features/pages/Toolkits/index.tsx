
import { Box, Stack } from '@mui/material';

import ModalsSection from '@/features/pages/Toolkits/sections/modals';
import TableSection from '@/features/pages/Toolkits/sections/tables';
import ButtonSection from '@/features/pages/Toolkits/sections/buttons';
import AlertSection from '@/features/pages/Toolkits/sections/alerts';
import AlertDialogsSection from '@/features/pages/Toolkits/sections/alert-dialogs';
import BadgesSection from '@/features/pages/Toolkits/sections/badges';

const ToolkitsPage = () => {
  return (
    <Box>
      <Stack spacing={4}>
        <ModalsSection />
        <TableSection />
        <ButtonSection />
        <AlertSection />
        <AlertDialogsSection />
        <BadgesSection />
      </Stack>
    </Box>
  );
};

export default ToolkitsPage;
