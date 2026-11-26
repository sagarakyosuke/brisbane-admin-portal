import { Box, Stack } from '@mui/material';

import DataTable from '@/features/components/Toolkits/Table';

import { itemColumns, itemRows } from '@/features/utils/_mock/table/items';

import { staffColumns, staffRows } from '@/features/utils/_mock/table/staff';

const TableSection = () => {
  return (
    <Box>
      <Stack spacing={4}>
        <DataTable
          title="Toolkit Table"
          description="A table with search, filters, sorting, pagination, selection, import, export, and download features."
          columns={staffColumns}
          rows={staffRows}
          variant="toolkit"
          rowsPerPage={5}
        />

        <DataTable
          title="Standard Table"
          description="A table with search, filters, sorting, row selection, and pagination."
          columns={itemColumns}
          rows={itemRows}
          variant="toolkit-basic"
          rowsPerPage={5}
        />

        <DataTable
          title="Plain Table"
          description="A simple table displaying staff records without additional table controls."
          columns={staffColumns}
          rows={staffRows}
          variant="plain"
        />
      </Stack>
    </Box>
  );
};

export default TableSection;
