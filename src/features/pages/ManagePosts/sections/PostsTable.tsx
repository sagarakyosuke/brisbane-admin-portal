import React from 'react';

import {
  Box,
  Typography,
  Button,
  Card,
  InputBase,
  IconButton,
  useTheme,
  Stack,
  useMediaQuery,
  alpha
} from '@mui/material';

import {
  Search as SearchIcon,
  Add as AddIcon,
  Archive as ArchiveIcon,
  Article as ArticleIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';

import { Post } from '@/features/utils/_mock/posts';

interface PostsTableProps {
  rows: Post[];
  columns: GridColDef[];
  search: string;
  onSearchChange: (value: string) => void;
  hasActiveFilter: boolean;
  onClearFilters: () => void;
  selectionModel: GridSelectionModel;
  onSelectionModelChange: (model: GridSelectionModel) => void;
  totalPosts: number;
}

const PostsTable = ({
  rows,
  columns,
  search,
  onSearchChange,
  hasActiveFilter,
  onClearFilters,
  selectionModel,
  onSelectionModelChange,
  totalPosts
}: PostsTableProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isEmpty = rows.length === 0;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: theme.general.borderRadiusLg,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        overflow: 'visible'
      }}
    >
      {/* Toolbar */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          alignItems: {
            xs: 'stretch',
            sm: 'center'
          },
          justifyContent: 'space-between',
          gap: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'transparent',
            borderRadius: theme.general.borderRadius,
            px: 1.75,
            py: 0.9,
            width: {
              xs: '100%',
              sm: 360
            },
            minHeight: 44,
            transition: 'all 0.2s ease',
            border: `1px solid ${theme.palette.divider}`,

            '&:focus-within': {
              bgcolor: 'transparent',
              borderColor: theme.colors.primary.main,
              boxShadow: `0 0 0 3px ${alpha(theme.colors.primary.main, 0.08)}`
            }
          }}
        >
          <SearchIcon
            sx={{
              color: theme.palette.text.secondary,
              mr: 1,
              fontSize: 20
            }}
          />

          <InputBase
            placeholder="Search posts by title or author..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            sx={{
              fontSize: 14,
              color: 'text.primary',
              flexGrow: 1,

              '& input::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 1
              }
            }}
          />

          {search && (
            <IconButton
              size="small"
              onClick={() => onSearchChange('')}
              sx={{
                p: 0.25,
                ml: 0.5
              }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Box>

        {/* Right side */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={{
            xs: 'space-between',
            sm: 'flex-end'
          }}
        >
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {rows.length === totalPosts
              ? `${totalPosts} posts`
              : `${rows.length} of ${totalPosts} posts`}
          </Typography>

          {hasActiveFilter && (
            <Button
              size="small"
              onClick={onClearFilters}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: theme.colors.primary.main
              }}
            >
              Clear filters
            </Button>
          )}
        </Stack>
      </Box>

      {/* Bulk Actions */}
      {selectionModel.length > 0 && (
        <Box
          sx={{
            p: 1.5,
            px: 2,
            bgcolor: alpha(theme.colors.primary.main, 0.04),
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            color={theme.colors.primary.main}
          >
            {selectionModel.length} selected
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              startIcon={<ArchiveIcon fontSize="small" />}
              sx={{
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Archive
            </Button>

            <Button
              size="small"
              color="error"
              startIcon={<CloseIcon fontSize="small" />}
              sx={{
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      )}

      {/* Grid or Empty State */}
      {isEmpty ? (
        <Box
          sx={{
            py: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: theme.palette.action.hover,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <ArticleIcon
              sx={{
                fontSize: 36,
                color: theme.palette.text.secondary
              }}
            />
          </Box>

          <Typography
            variant="h6"
            fontWeight={700}
            color="text.primary"
            gutterBottom
          >
            No posts found
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              maxWidth: 360
            }}
          >
            {hasActiveFilter
              ? "We couldn't find any posts matching your filters. Try adjusting your search."
              : "You haven't created any posts yet. Get started by creating your first one."}
          </Typography>

          {hasActiveFilter ? (
            <Button
              variant="outlined"
              onClick={onClearFilters}
              sx={{
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Clear filters
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Create Post
            </Button>
          )}
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            selectionModel={selectionModel}
            onSelectionModelChange={onSelectionModelChange}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            columnVisibilityModel={{
              author: !isMobile,
              date: !isMobile
            }}
            componentsProps={{
              pagination: {
                SelectProps: {
                  MenuProps: {
                    BackdropProps: {
                      invisible: true,
                      sx: {
                        backgroundColor: 'transparent !important',
                        backdropFilter: 'none !important',
                        WebkitBackdropFilter: 'none !important',
                        opacity: '0 !important'
                      }
                    }
                  }
                }
              }
            }}
            sx={{
              border: 'none',
              backgroundColor: 'transparent',

              '& .MuiDataGrid-main': {
                backgroundColor: 'transparent',
                border: 'none'
              },

              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'transparent',
                borderBottom: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.secondary,
                minHeight: 48
              },

              '& .MuiDataGrid-columnHeader': {
                backgroundColor: 'transparent'
              },

              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 800,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.6px'
              },

              '& .MuiDataGrid-cell': {
                backgroundColor: 'transparent',
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                py: 1.5
              },

              '& .MuiDataGrid-row': {
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              },

              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'transparent'
              },

              '& .MuiDataGrid-row.Mui-selected': {
                backgroundColor: alpha(theme.colors.primary.main, 0.04)
              },

              '& .MuiDataGrid-row.Mui-selected:hover': {
                backgroundColor: alpha(theme.colors.primary.main, 0.06)
              },

              '& .MuiDataGrid-footerContainer': {
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: 'transparent',
                minHeight: 56
              },

              '& .MuiTablePagination-root': {
                color: theme.palette.text.secondary
              },

              '& .MuiDataGrid-columnSeparator': {
                display: 'none'
              },

              '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                outline: 'none'
              },

              '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within':
                {
                  outline: 'none'
                },

              '& .MuiCheckbox-root': {
                color: theme.palette.text.disabled
              },

              '& .MuiCheckbox-root.Mui-checked': {
                color: theme.colors.primary.main
              }
            }}
          />
        </Box>
      )}
    </Card>
  );
};

export default PostsTable;
