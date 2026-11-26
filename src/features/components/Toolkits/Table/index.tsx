import { useEffect, useMemo, useRef, useState } from 'react';

import type { ChangeEvent, MouseEvent, ReactNode } from 'react';

import {
  Alert,
  Box,
  Checkbox,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/Refresh';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

import {
  Document,
  Packer,
  Paragraph,
  Table as DocxTable,
  TableCell as DocxTableCell,
  TableRow as DocxTableRow,
  WidthType
} from 'docx';

import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';

import Button from '@/features/components/Toolkits/Button';

import useTable from '@/features/components/Toolkits/Table/useContext';

import type { TableRowData } from '@/features/components/Toolkits/Table/useContext';

interface TableColumn {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  width?: string | number;
  minWidth?: string | number;
  render?: (value: unknown, row: TableRowData) => ReactNode;
}

interface TableProps {
  rows: TableRowData[];
  columns?: TableColumn[];
  title?: string;
  description?: string;
  rowsPerPage?: number;
  variant?: 'toolkit' | 'toolkit-basic' | 'standard' | 'plain';
  headerVariant?: 'default' | 'primary' | 'secondary';
  loading?: boolean;
  emptyMessage?: string;
  onRefresh?: () => void;
  onImport?: (rows: TableRowData[]) => void;
  onExport?: (format: string, rows: TableRowData[]) => void;
}

type NotificationSeverity = 'success' | 'error' | 'info' | 'warning';

type ExportFormat = 'csv' | 'xlsx' | 'docx' | 'pdf' | 'json' | 'xml';

type TemplateFormat = 'csv' | 'xlsx' | 'docx';

const exportFormats: {
  label: string;
  value: ExportFormat;
}[] = [
  { label: 'CSV', value: 'csv' },
  { label: 'Excel (.xlsx)', value: 'xlsx' },
  { label: 'Word (.docx)', value: 'docx' },
  { label: 'PDF', value: 'pdf' },
  { label: 'JSON', value: 'json' },
  { label: 'XML', value: 'xml' }
];

const templateFormats: {
  label: string;
  value: TemplateFormat;
}[] = [
  { label: 'CSV Template', value: 'csv' },
  { label: 'Excel Template', value: 'xlsx' },
  { label: 'Word Template', value: 'docx' }
];

const escapeCSV = (value: unknown) => {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
};

const escapeXML = (value: unknown) => {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const getFileName = (title?: string) => {
  return (title || 'table')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

const downloadBlob = (content: string, fileName: string, mimeType: string) => {
  saveAs(
    new Blob([content], {
      type: mimeType
    }),
    fileName
  );
};

const convertRowsToCSV = (rows: TableRowData[], columns: TableColumn[]) => {
  const headers = columns.map((column) => escapeCSV(column.label));

  const data = rows.map((row) =>
    columns.map((column) => escapeCSV(row[column.id]))
  );

  return [headers.join(','), ...data.map((row) => row.join(','))].join('\n');
};

const convertRowsToXML = (rows: TableRowData[], columns: TableColumn[]) => {
  const records = rows
    .map((row) => {
      const fields = columns
        .map(
          (column) =>
            `<${column.id}>${escapeXML(row[column.id])}</${column.id}>`
        )
        .join('');

      return `<row>${fields}</row>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><rows>${records}</rows>`;
};

const parseCSV = (content: string): Record<string, string>[] => {
  const rows: string[][] = [];

  let currentRow: string[] = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const character = content[index];
    const nextCharacter = content[index + 1];

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      currentValue += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (character === ',' && !insideQuotes) {
      currentRow.push(currentValue);
      currentValue = '';
      continue;
    }

    if ((character === '\n' || character === '\r') && !insideQuotes) {
      if (character === '\r' && nextCharacter === '\n') {
        index += 1;
      }

      currentRow.push(currentValue);

      if (currentRow.some((value) => value.trim() !== '')) {
        rows.push(currentRow);
      }

      currentRow = [];
      currentValue = '';
      continue;
    }

    currentValue += character;
  }

  currentRow.push(currentValue);

  if (currentRow.some((value) => value.trim() !== '')) {
    rows.push(currentRow);
  }

  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((header) => header.trim());

  return rows.slice(1).map((row) => {
    const record: Record<string, string> = {};

    headers.forEach((header, index) => {
      record[header] = row[index] ?? '';
    });

    return record;
  });
};

const DataTable = ({
  rows,
  columns: providedColumns,
  title = 'Table',
  description,
  rowsPerPage = 5,
  variant = 'toolkit',
  headerVariant = 'default',
  loading = false,
  emptyMessage = 'No records found.',
  onRefresh,
  onImport,
  onExport
}: TableProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [tableRows, setTableRows] = useState<TableRowData[]>(rows);

  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {}
  );

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [exportAnchor, setExportAnchor] = useState<HTMLElement | null>(null);

  const [templateAnchor, setTemplateAnchor] = useState<HTMLElement | null>(
    null
  );

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: NotificationSeverity;
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    setTableRows(rows);
    setColumnFilters({});
  }, [rows]);

  const columns = useMemo<TableColumn[]>(() => {
    if (providedColumns?.length) {
      return providedColumns;
    }

    if (!tableRows.length) {
      return [];
    }

    return Object.keys(tableRows[0])
      .filter((key) => key !== 'id')
      .map((key) => ({
        id: key,
        label: key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (character) => character.toUpperCase()),
        sortable: true
      }));
  }, [providedColumns, tableRows]);

  const filterableColumns = useMemo(() => {
    return columns.filter((column) => {
      const values = tableRows
        .map((row) => String(row[column.id] ?? '').trim())
        .filter(Boolean);

      return new Set(values).size > 1;
    });
  }, [columns, tableRows]);

  const filteredRows = useMemo(() => {
    return tableRows.filter((row) =>
      Object.entries(columnFilters).every(([columnId, selectedValue]) => {
        if (!selectedValue) {
          return true;
        }

        return String(row[columnId] ?? '') === selectedValue;
      })
    );
  }, [tableRows, columnFilters]);

  const table = useTable({
    rows: filteredRows,
    rowsPerPage
  });

  const hasToolbar = variant !== 'plain';
  const hasExportActions = variant === 'toolkit';
  const hasSelection = variant === 'toolkit' || variant === 'toolkit-basic';
  const hasPagination = variant !== 'plain';

  const visibleRows = variant === 'plain' ? filteredRows : table.paginatedRows;

  const selectedRows = filteredRows.filter((row) =>
    table.selected.includes(row.id)
  );

  const rowsToExport = selectedRows.length ? selectedRows : table.filteredRows;

  const showNotification = (
    message: string,
    severity: NotificationSeverity = 'success'
  ) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification((previous) => ({
      ...previous,
      open: false
    }));
  };

  const handleCloseMenus = () => {
    setExportAnchor(null);
    setTemplateAnchor(null);
  };

  const handleExportMenu = (event: MouseEvent<HTMLElement>) => {
    setTemplateAnchor(null);
    setExportAnchor(event.currentTarget);
  };

  const handleTemplateMenu = (event: MouseEvent<HTMLElement>) => {
    setExportAnchor(null);
    setTemplateAnchor(event.currentTarget);
  };

  const handleExport = async (format: ExportFormat) => {
    handleCloseMenus();

    if (!rowsToExport.length) {
      showNotification('There are no records to export.', 'warning');
      return;
    }

    const fileName = getFileName(title);

    try {
      switch (format) {
        case 'csv': {
          downloadBlob(
            convertRowsToCSV(rowsToExport, columns),
            `${fileName}.csv`,
            'text/csv;charset=utf-8;'
          );
          break;
        }

        case 'xlsx': {
          const worksheet = XLSX.utils.json_to_sheet(rowsToExport);
          const workbook = XLSX.utils.book_new();

          XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
          XLSX.writeFile(workbook, `${fileName}.xlsx`);
          break;
        }

        case 'json': {
          downloadBlob(
            JSON.stringify(rowsToExport, null, 4),
            `${fileName}.json`,
            'application/json'
          );
          break;
        }

        case 'xml': {
          downloadBlob(
            convertRowsToXML(rowsToExport, columns),
            `${fileName}.xml`,
            'application/xml'
          );
          break;
        }

        case 'pdf': {
          const pdf = new jsPDF();

          pdf.setFontSize(16);
          pdf.text(title, 14, 18);

          if (description) {
            pdf.setFontSize(10);
            pdf.text(description, 14, 25);
          }

          autoTable(pdf, {
            startY: description ? 32 : 26,
            head: [columns.map((column) => column.label)],
            body: rowsToExport.map((row) =>
              columns.map((column) => String(row[column.id] ?? ''))
            ),
            styles: {
              fontSize: 9,
              cellPadding: 3
            },
            headStyles: {
              fillColor: [18, 26, 87],
              textColor: 255
            },
            alternateRowStyles: {
              fillColor: [245, 247, 250]
            }
          });

          pdf.save(`${fileName}.pdf`);
          break;
        }

        case 'docx': {
          const headerRow = new DocxTableRow({
            children: columns.map(
              (column) =>
                new DocxTableCell({
                  children: [new Paragraph(column.label)]
                })
            )
          });

          const dataRows = rowsToExport.map(
            (row) =>
              new DocxTableRow({
                children: columns.map(
                  (column) =>
                    new DocxTableCell({
                      children: [new Paragraph(String(row[column.id] ?? ''))]
                    })
                )
              })
          );

          const document = new Document({
            sections: [
              {
                children: [
                  new Paragraph({
                    text: title,
                    heading: 'Heading1'
                  }),
                  ...(description ? [new Paragraph(description)] : []),
                  new DocxTable({
                    width: {
                      size: 100,
                      type: WidthType.PERCENTAGE
                    },
                    rows: [headerRow, ...dataRows]
                  })
                ]
              }
            ]
          });

          saveAs(await Packer.toBlob(document), `${fileName}.docx`);
          break;
        }

        default:
          break;
      }

      onExport?.(format, rowsToExport);

      showNotification(
        `${format.toUpperCase()} export completed successfully.`
      );
    } catch (error) {
      console.error('Table export error:', error);

      showNotification(
        `Unable to export ${format.toUpperCase()} file.`,
        'error'
      );
    }
  };

  const handleDownloadTemplate = async (format: TemplateFormat) => {
    handleCloseMenus();

    const fileName = `${getFileName(title)}-template`;

    try {
      switch (format) {
        case 'csv': {
          downloadBlob(
            columns.map((column) => escapeCSV(column.label)).join(','),
            `${fileName}.csv`,
            'text/csv;charset=utf-8;'
          );
          break;
        }

        case 'xlsx': {
          const worksheet = XLSX.utils.aoa_to_sheet([
            columns.map((column) => column.label)
          ]);

          const workbook = XLSX.utils.book_new();

          XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
          XLSX.writeFile(workbook, `${fileName}.xlsx`);
          break;
        }

        case 'docx': {
          const document = new Document({
            sections: [
              {
                children: [
                  new Paragraph({
                    text: `${title} Template`,
                    heading: 'Heading1'
                  }),
                  new DocxTable({
                    width: {
                      size: 100,
                      type: WidthType.PERCENTAGE
                    },
                    rows: [
                      new DocxTableRow({
                        children: columns.map(
                          (column) =>
                            new DocxTableCell({
                              children: [new Paragraph(column.label)]
                            })
                        )
                      })
                    ]
                  })
                ]
              }
            ]
          });

          saveAs(await Packer.toBlob(document), `${fileName}.docx`);
          break;
        }

        default:
          break;
      }

      showNotification('Template downloaded successfully.');
    } catch (error) {
      console.error('Template download error:', error);
      showNotification('Unable to download the template.', 'error');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();

    try {
      let importedRows: Record<string, unknown>[] = [];

      if (extension === 'csv') {
        importedRows = parseCSV(await file.text());
      } else if (extension === 'xlsx' || extension === 'xls') {
        const buffer = await file.arrayBuffer();

        const workbook = XLSX.read(buffer, {
          type: 'array'
        });

        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        if (!firstSheet) {
          throw new Error('The Excel file has no worksheet.');
        }

        importedRows = XLSX.utils.sheet_to_json(firstSheet);
      } else if (extension === 'json') {
        const parsed = JSON.parse(await file.text());

        if (!Array.isArray(parsed)) {
          throw new Error('JSON file must contain an array of records.');
        }

        importedRows = parsed;
      } else if (extension === 'xml') {
        const parser = new DOMParser();

        const document = parser.parseFromString(
          await file.text(),
          'application/xml'
        );

        if (document.querySelector('parsererror')) {
          throw new Error('Invalid XML file.');
        }

        importedRows = Array.from(document.querySelectorAll('rows > row')).map(
          (row) => {
            const record: Record<string, unknown> = {};

            Array.from(row.children).forEach((field) => {
              record[field.tagName] = field.textContent ?? '';
            });

            return record;
          }
        );
      } else {
        throw new Error(
          'Unsupported file format. Use CSV, XLSX, XLS, JSON, or XML.'
        );
      }

      if (!importedRows.length) {
        throw new Error('The selected file does not contain any records.');
      }

      const normalizedRows: TableRowData[] = importedRows.map((row, index) => {
        const normalized: Record<string, string | number> = {
          id:
            typeof row.id === 'string' || typeof row.id === 'number'
              ? row.id
              : `imported-${Date.now()}-${index}`
        };

        columns.forEach((column) => {
          const matchingKey = Object.keys(row).find(
            (key) =>
              key.toLowerCase() === column.id.toLowerCase() ||
              key.toLowerCase() === column.label.toLowerCase()
          );

          const value = matchingKey ? row[matchingKey] : '';

          normalized[column.id] =
            typeof value === 'number' ? value : String(value ?? '');
        });

        return normalized as TableRowData;
      });

      setTableRows(normalizedRows);

      onImport?.(normalizedRows);

      showNotification(
        `${normalizedRows.length} record(s) imported successfully.`
      );
    } catch (error) {
      console.error('Table import error:', error);

      showNotification(
        error instanceof Error
          ? error.message
          : 'Unable to import the selected file.',
        'error'
      );
    } finally {
      event.target.value = '';
    }
  };

  const handleRefresh = () => {
    setTableRows(rows);
    setColumnFilters({});

    onRefresh?.();

    showNotification('Table refreshed successfully.', 'info');
  };

  const headerStyles = (() => {
    if (headerVariant === 'primary') {
      return {
        bgcolor: 'primary.main',
        color: 'primary.contrastText'
      };
    }

    if (headerVariant === 'secondary') {
      return {
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText'
      };
    }

    return {
      bgcolor: 'background.default',
      color: 'text.primary'
    };
  })();

  const menuPaperStyles = {
    mt: 0.75,
    minWidth: 190,
    p: 0.75,
    border: 1,
    borderColor: 'divider',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: (theme: { palette: { mode: string } }) =>
      theme.palette.mode === 'dark'
        ? '0 8px 28px rgba(0,0,0,0.35)'
        : '0 8px 28px rgba(18,26,87,0.12)'
  };

  const menuBackdropProps = {
    invisible: true,
    sx: {
      backgroundColor: 'transparent !important',
      backdropFilter: 'none !important',
      opacity: '0 !important'
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        border: 1,
        borderColor: 'divider',
        borderRadius: '14px',
        bgcolor: 'background.paper'
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2.5,
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            color="text.primary"
            sx={{
              fontSize: '1rem',
              letterSpacing: '-0.2px'
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                lineHeight: 1.6
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {hasToolbar && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              px: 1.25,
              py: 0.6,
              borderRadius: '7px',
              bgcolor: 'action.hover',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            {table.filteredRows.length} records
          </Typography>
        )}
      </Box>

      {hasToolbar && (
        <>
          <Divider />

          <Box
            sx={{
              px: { xs: 2, sm: 3 },
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1.5,
                width: '100%',
                minWidth: 0
              }}
            >
              <TextField
                size="small"
                fullWidth
                placeholder="Search records..."
                value={table.search}
                onChange={(event) => table.handleSearch(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  )
                }}
                sx={{
                  flex: { sm: '1 1 280px' },
                  minWidth: 0,
                  maxWidth: { sm: 420 },
                  '& .MuiOutlinedInput-root': {
                    minHeight: 40,
                    borderRadius: '9px',
                    bgcolor: 'background.paper'
                  }
                }}
              />

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                flexWrap="wrap"
                gap={1}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  flex: '0 0 auto',
                  minWidth: 0,
                  '& > *': {
                    flexShrink: 0
                  }
                }}
              >
                {filterableColumns.length > 0 && (
                  <Button
                    size="small"
                    variant={filtersOpen ? 'contained' : 'outlined'}
                    color={filtersOpen ? 'primary' : 'inherit'}
                    startIcon={<FilterListOutlinedIcon />}
                    onClick={() => setFiltersOpen((previous) => !previous)}
                    aria-expanded={filtersOpen}
                    aria-label={filtersOpen ? 'Hide filters' : 'Show filters'}
                  >
                    Filters
                    {Object.values(columnFilters).filter(Boolean).length > 0
                      ? ` (${Object.values(columnFilters).filter(Boolean).length})`
                      : ''}
                  </Button>
                )}

                {onRefresh && (
                  <Tooltip title="Refresh table">
                    <span>
                      <Button
                        iconOnly
                        size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={handleRefresh}
                        disabled={loading}
                        aria-label="Refresh table"
                      >
                        <RefreshOutlinedIcon fontSize="small" />
                      </Button>
                    </span>
                  </Tooltip>
                )}

                {hasExportActions && (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      color="inherit"
                      startIcon={<FileUploadOutlinedIcon />}
                      onClick={handleImportClick}
                    >
                      Import
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx,.xls,.json,.xml"
                      hidden
                      onChange={handleImport}
                    />

                    <Button
                      size="small"
                      variant="outlined"
                      color="inherit"
                      startIcon={<DescriptionOutlinedIcon />}
                      onClick={handleTemplateMenu}
                    >
                      Download
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<FileDownloadOutlinedIcon />}
                      onClick={handleExportMenu}
                    >
                      Export
                    </Button>
                  </>
                )}
              </Stack>
            </Box>

            {filtersOpen && filterableColumns.length > 0 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'minmax(0, 1fr)',
                    sm: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))'
                  },
                  alignItems: 'start',
                  gap: 1.5,
                  width: '100%',
                  p: { xs: 1.5, sm: 2 },
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: '10px',
                  boxSizing: 'border-box',
                  position: 'relative',
                  isolation: 'isolate',
                  transform: 'none',
                  filter: 'none',
                  backdropFilter: 'none',
                  opacity: 1
                }}
              >
                {filterableColumns.map((column) => {
                  const values = Array.from(
                    new Set(
                      tableRows
                        .map((row) => String(row[column.id] ?? '').trim())
                        .filter(Boolean)
                    )
                  );

                  return (
                    <FormControl
                      key={column.id}
                      size="small"
                      fullWidth
                      sx={{
                        minWidth: 0,
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          minHeight: 40,
                          borderRadius: '9px',
                          bgcolor: 'background.paper'
                        }
                      }}
                    >
                      <InputLabel>{column.label}</InputLabel>

                      <Select
                        value={columnFilters[column.id] ?? ''}
                        label={column.label}
                        onChange={(event) => {
                          setColumnFilters((previous) => ({
                            ...previous,
                            [column.id]: event.target.value
                          }));

                          table.handleChangePage(null, 0);
                        }}
                        MenuProps={{
                          BackdropProps: menuBackdropProps,
                          disableScrollLock: true,
                          PaperProps: {
                            elevation: 0,
                            sx: {
                              maxHeight: 280,
                              filter: 'none',
                              backdropFilter: 'none',
                              bgcolor: 'background.paper',
                              boxShadow: '0 8px 28px rgba(18,26,87,0.12)'
                            }
                          }
                        }}
                      >
                        <MenuItem value="">All {column.label}</MenuItem>

                        {values.map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                })}
              </Box>
            )}
          </Box>

          <Divider />

          {hasExportActions && (
            <>
              <Menu
                anchorEl={exportAnchor}
                open={Boolean(exportAnchor)}
                onClose={handleCloseMenus}
                BackdropProps={menuBackdropProps}
                disableScrollLock
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                marginThreshold={8}
                PaperProps={{
                  elevation: 0,
                  sx: menuPaperStyles
                }}
              >
                {exportFormats.map((format) => (
                  <MenuItem
                    key={format.value}
                    onClick={() => handleExport(format.value)}
                    sx={{
                      minHeight: 38,
                      px: 1.5,
                      borderRadius: '7px',
                      fontSize: '0.875rem'
                    }}
                  >
                    {format.label}
                  </MenuItem>
                ))}
              </Menu>

              <Menu
                anchorEl={templateAnchor}
                open={Boolean(templateAnchor)}
                onClose={handleCloseMenus}
                BackdropProps={menuBackdropProps}
                disableScrollLock
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                marginThreshold={8}
                PaperProps={{
                  elevation: 0,
                  sx: menuPaperStyles
                }}
              >
                {templateFormats.map((format) => (
                  <MenuItem
                    key={format.value}
                    onClick={() => handleDownloadTemplate(format.value)}
                    sx={{
                      minHeight: 38,
                      px: 1.5,
                      borderRadius: '7px',
                      fontSize: '0.875rem'
                    }}
                  >
                    {format.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {hasSelection && table.selected.length > 0 && (
            <Box
              sx={{
                px: { xs: 2, sm: 3 },
                py: 1.25,
                bgcolor: 'action.hover',
                borderTop: 1,
                borderColor: 'divider'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {table.selected.length} record(s) selected.
                {hasExportActions &&
                  ' Export will include only selected records.'}
              </Typography>
            </Box>
          )}
        </>
      )}

      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto'
        }}
      >
        <MuiTable
          size="medium"
          sx={{
            minWidth: 650,
            '& .MuiTableCell-root': {
              px: { xs: 1.75, sm: 2.5 },
              py: 1.75,
              borderColor: 'divider'
            },
            '& .MuiTableBody-root .MuiTableRow-root': {
              transition: 'background-color 0.15s ease'
            },
            '& .MuiTableBody-root .MuiTableRow-root:hover': {
              bgcolor: 'action.hover'
            },
            '& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root':
              {
                borderBottom: 0
              }
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                ...headerStyles,
                '& .MuiTableCell-root': {
                  color: 'inherit',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.2px',
                  whiteSpace: 'nowrap',
                  borderColor:
                    headerVariant === 'default' ? 'divider' : 'transparent'
                },
                '& .MuiTableSortLabel-root': {
                  color: 'inherit'
                },
                '& .MuiTableSortLabel-root:hover': {
                  color: 'inherit'
                },
                '& .MuiTableSortLabel-root.Mui-active': {
                  color: 'inherit'
                },
                '& .MuiTableSortLabel-icon': {
                  color: 'inherit !important'
                }
              }}
            >
              {hasSelection && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color={headerVariant === 'default' ? 'primary' : 'default'}
                    checked={table.isAllSelected}
                    indeterminate={table.isIndeterminate}
                    onChange={(event) =>
                      table.handleSelectAll(event.target.checked)
                    }
                    inputProps={{
                      'aria-label': 'Select all rows'
                    }}
                    disabled={visibleRows.length === 0}
                  />
                </TableCell>
              )}

              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{
                    width: column.width,
                    minWidth: column.minWidth
                  }}
                >
                  {hasToolbar && column.sortable !== false ? (
                    <TableSortLabel
                      active={table.orderBy === column.id}
                      direction={
                        table.orderBy === column.id ? table.order : 'asc'
                      }
                      onClick={() => table.handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasSelection ? 1 : 0)}
                  align="center"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ py: 3 }}
                  >
                    Loading records...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : visibleRows.length > 0 ? (
              visibleRows.map((row) => {
                const isSelected = table.selected.includes(row.id);

                return (
                  <TableRow hover key={row.id} selected={isSelected}>
                    {hasSelection && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => table.handleSelectRow(row.id)}
                          inputProps={{
                            'aria-label': `Select row ${row.id}`
                          }}
                        />
                      </TableCell>
                    )}

                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align || 'left'}
                        sx={{
                          color: 'text.primary',
                          fontSize: '0.875rem'
                        }}
                      >
                        {column.render
                          ? column.render(row[column.id], row)
                          : String(row[column.id] ?? '')}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasSelection ? 1 : 0)}
                  align="center"
                >
                  <Stack alignItems="center" spacing={0.75} sx={{ py: 5 }}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {hasToolbar &&
                      (table.search ||
                        Object.values(columnFilters).some(Boolean))
                        ? 'No matching records found'
                        : emptyMessage}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Try adjusting your search or filters.
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {hasPagination && (
        <>
          <Divider />

          <TablePagination
            component="div"
            count={table.filteredRows.length}
            page={table.page}
            onPageChange={table.handleChangePage}
            rowsPerPage={table.pageSize}
            onRowsPerPageChange={table.handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            showFirstButton
            showLastButton
            sx={{
              border: 0,
              minHeight: 56,
              color: 'text.secondary',
              '& .MuiTablePagination-toolbar': {
                px: { xs: 1.5, sm: 2.5 },
                minHeight: 56
              },
              '& .MuiTablePagination-select': {
                borderRadius: '6px'
              }
            }}
          />
        </>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: '9px'
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

/* -------------------------------------------------------------------------- */
/* Sample 3                                                                    */
/* -------------------------------------------------------------------------- */

const sampleThreeColumns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    minWidth: 200
  },
  {
    id: 'type',
    label: 'Type',
    sortable: true,
    minWidth: 150
  },
  {
    id: 'version',
    label: 'Version',
    sortable: true,
    minWidth: 110
  },
  {
    id: 'status',
    label: 'Status',
    sortable: true,
    minWidth: 120,
    render: (value) => {
      const status = String(value ?? '');

      return (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.25,
            py: 0.5,
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            bgcolor:
              status === 'Active'
                ? 'success.light'
                : status === 'Pending'
                  ? 'warning.light'
                  : 'action.hover',
            color:
              status === 'Active'
                ? 'success.dark'
                : status === 'Pending'
                  ? 'warning.dark'
                  : 'text.secondary'
          }}
        >
          {status}
        </Box>
      );
    }
  },
  {
    id: 'dateUpdated',
    label: 'Date Updated',
    sortable: true,
    minWidth: 150
  }
];

const sampleThreeRows: TableRowData[] = [
  {
    id: 1,
    name: 'Item Alpha',
    type: 'Standard',
    version: '1.0.0',
    status: 'Active',
    dateUpdated: 'Nov 20, 2026'
  },
  {
    id: 2,
    name: 'Item Bravo',
    type: 'Premium',
    version: '2.1.0',
    status: 'Active',
    dateUpdated: 'Nov 19, 2026'
  },
  {
    id: 3,
    name: 'Item Charlie',
    type: 'Standard',
    version: '1.4.0',
    status: 'Inactive',
    dateUpdated: 'Nov 18, 2026'
  },
  {
    id: 4,
    name: 'Item Delta',
    type: 'Enterprise',
    version: '3.0.1',
    status: 'Active',
    dateUpdated: 'Nov 17, 2026'
  },
  {
    id: 5,
    name: 'Item Echo',
    type: 'Premium',
    version: '1.2.5',
    status: 'Pending',
    dateUpdated: 'Nov 15, 2026'
  },
  {
    id: 6,
    name: 'Item Foxtrot',
    type: 'Standard',
    version: '1.0.5',
    status: 'Active',
    dateUpdated: 'Nov 12, 2026'
  },
  {
    id: 7,
    name: 'Item Golf',
    type: 'Enterprise',
    version: '2.0.0',
    status: 'Inactive',
    dateUpdated: 'Nov 10, 2026'
  },
  {
    id: 8,
    name: 'Item Hotel',
    type: 'Premium',
    version: '1.6.3',
    status: 'Active',
    dateUpdated: 'Nov 08, 2026'
  },
  {
    id: 9,
    name: 'Item India',
    type: 'Standard',
    version: '1.3.0',
    status: 'Pending',
    dateUpdated: 'Nov 06, 2026'
  },
  {
    id: 10,
    name: 'Item Juliet',
    type: 'Enterprise',
    version: '2.4.1',
    status: 'Active',
    dateUpdated: 'Nov 04, 2026'
  }
];

export const SampleTableThree = () => (
  <DataTable
    title="Sample Table 3"
    description="Browse and manage records."
    rows={sampleThreeRows}
    columns={sampleThreeColumns}
    rowsPerPage={5}
    variant="toolkit-basic"
    headerVariant="primary"
    emptyMessage="No records found."
  />
);

export type { TableProps, TableColumn, TableRowData };

export default DataTable;
