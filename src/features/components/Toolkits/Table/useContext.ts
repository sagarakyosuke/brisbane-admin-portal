import { useMemo, useState } from 'react';

import type { ChangeEvent } from 'react';

export interface TableRowData {
  id: string | number;
  [key: string]: string | number;
}

interface UseTableProps {
  rows: TableRowData[];
  rowsPerPage?: number;
}

const useTable = ({ rows, rowsPerPage = 5 }: UseTableProps) => {
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(rowsPerPage);
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const filteredRows = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return rows;
    }

    return rows.filter((row) =>
      Object.entries(row).some(([key, value]) => {
        if (key === 'id') {
          return false;
        }

        return String(value).toLowerCase().includes(searchValue);
      })
    );
  }, [rows, search]);

  const sortedRows = useMemo(() => {
    if (!orderBy) {
      return filteredRows;
    }

    return [...filteredRows].sort((a, b) => {
      const firstValue = a[orderBy];
      const secondValue = b[orderBy];

      const comparison =
        typeof firstValue === 'number' && typeof secondValue === 'number'
          ? firstValue - secondValue
          : String(firstValue ?? '').localeCompare(
              String(secondValue ?? ''),
              undefined,
              {
                numeric: true,
                sensitivity: 'base'
              }
            );

      return order === 'asc' ? comparison : -comparison;
    });
  }, [filteredRows, orderBy, order]);

  const paginatedRows = useMemo(() => {
    const startIndex = page * pageSize;

    return sortedRows.slice(startIndex, startIndex + pageSize);
  }, [sortedRows, page, pageSize]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleSort = (column: string) => {
    if (orderBy === column) {
      setOrder((previous) => (previous === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrderBy(column);
      setOrder('asc');
    }

    setPage(0);
  };

  const handleSelectRow = (id: string | number) => {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const pageIds = paginatedRows.map((row) => row.id);

    setSelected((previous) => {
      if (checked) {
        return Array.from(new Set([...previous, ...pageIds]));
      }

      return previous.filter((id) => !pageIds.includes(id));
    });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isAllSelected =
    paginatedRows.length > 0 &&
    paginatedRows.every((row) => selected.includes(row.id));

  const isIndeterminate =
    paginatedRows.some((row) => selected.includes(row.id)) && !isAllSelected;

  return {
    search,
    orderBy,
    order,
    page,
    pageSize,
    selected,
    filteredRows,
    sortedRows,
    paginatedRows,
    isAllSelected,
    isIndeterminate,
    handleSearch,
    handleSort,
    handleSelectRow,
    handleSelectAll,
    handleChangePage,
    handleChangeRowsPerPage
  };
};

export default useTable;
