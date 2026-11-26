import React, { useMemo, useState } from 'react';

import type { MouseEvent } from 'react';

import {
  Box,
  Typography,
  Button,
  Card,
  IconButton,
  Tooltip,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
  useMediaQuery,
  alpha
} from '@mui/material';

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  ContentCopy as DuplicateIcon,
  Article as ArticleIcon,
  CheckCircle as PublishedIcon,
  Inventory2 as ArchivedIcon
} from '@mui/icons-material';

import {
  MOCK_POSTS,
  Post,
  PostStatus,
  StatusFilter
} from '@/features/utils/_mock/posts';

import DataTable from '@/features/components/Toolkits/Table';

import type {
  TableColumn,
  TableRowData
} from '@/features/components/Toolkits/Table';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

const formatRelativeDate = (iso: string): string => {
  const now = new Date();
  const then = new Date(iso);

  const diffDays = Math.floor(
    (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  }

  return then.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatFullDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

const AVATAR_PALETTE = [
  '#5B8DEF',
  '#F58220',
  '#38A169',
  '#9F7AEA',
  '#E53E3E',
  '#319795'
];

const getAvatarColor = (name: string): string => {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + (hash << 5) - hash;
  }

  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
};

// ─────────────────────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────────────────────

type StatColor = 'primary' | 'success' | 'error' | 'default';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  active: boolean;
  color: StatColor;
  onClick: () => void;
}

const StatCard = ({
  label,
  value,
  icon,
  active,
  color,
  onClick
}: StatCardProps) => {
  const theme = useTheme();

  const accent: string = {
    primary: theme.colors.primary.main,
    success: theme.colors.success.main,
    error: theme.colors.error.main,
    default: theme.palette.text.secondary
  }[color];

  return (
    <Card
      onClick={onClick}
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 140,
        p: 2,
        cursor: 'pointer',
        border: `1px solid ${active ? accent : theme.palette.divider}`,
        borderRadius: theme.general.borderRadiusLg,
        bgcolor: active ? alpha(accent, 0.05) : theme.palette.background.paper,
        transition: 'all 0.2s',

        '&:hover': {
          borderColor: accent,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            textTransform="uppercase"
            letterSpacing="0.5px"
          >
            {label}
          </Typography>

          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              color: accent,
              mt: 0.5
            }}
          >
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(accent, 0.1),
            color: accent
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Card>
  );
};

// ─────────────────────────────────────────────────────────────
// Manage Posts Page
// ─────────────────────────────────────────────────────────────

const ManagePostsPage = () => {
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // ─────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const [activePost, setActivePost] = useState<Post | null>(null);

  // ─────────────────────────────────────────────────────────
  // Statistics
  // ─────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const count = (status: PostStatus) =>
      MOCK_POSTS.filter((post) => post.status === status).length;

    return {
      total: MOCK_POSTS.length,
      published: count('Published'),
      draft: count('Draft'),
      archived: count('Archived')
    };
  }, []);

  // ─────────────────────────────────────────────────────────
  // Filtered Posts
  // ─────────────────────────────────────────────────────────

  const filteredRows = useMemo(() => {
    return MOCK_POSTS.filter(
      (post) => statusFilter === 'All' || post.status === statusFilter
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [statusFilter]);

  // DataTable uses TableRowData as its row type.
  // Keep the values compatible with the shared component.

  const tableRows: TableRowData[] = useMemo(
    () =>
      filteredRows.map((post) => ({
        id: post.id,
        title: post.title,
        author: post.author,
        status: post.status,
        date: post.date,
        actions: ''
      })),
    [filteredRows]
  );

  const hasActiveFilter = statusFilter !== 'All';

  // ─────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────

  const handleClearFilters = () => {
    setStatusFilter('All');
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, post: Post) => {
    event.stopPropagation();

    setActivePost(post);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // ─────────────────────────────────────────────────────────
  // Status Styling
  // ─────────────────────────────────────────────────────────

  const getStatusStyle = (status: PostStatus) => {
    switch (status) {
      case 'Published':
        return {
          bg: theme.colors.success.lighter,
          color: theme.colors.success.main
        };

      case 'Draft':
        return {
          bg: isDark ? 'rgba(255,255,255,0.1)' : theme.colors.alpha.black[5],
          color: theme.palette.text.secondary
        };

      case 'Archived':
        return {
          bg: theme.colors.error.lighter,
          color: theme.colors.error.main
        };
    }
  };

  // ─────────────────────────────────────────────────────────
  // DataTable Columns
  // ─────────────────────────────────────────────────────────

  const columns: TableColumn[] = [
    {
      id: 'title',
      label: 'Post Title',
      sortable: true,
      minWidth: 220,

      render: (value) => (
        <Tooltip title={String(value)} placement="top-start" arrow>
          <Typography
            variant="body2"
            fontWeight={700}
            color="text.primary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {String(value)}
          </Typography>
        </Tooltip>
      )
    },
    {
      id: 'author',
      label: 'Author',
      sortable: true,
      minWidth: isMobile ? 130 : 160,

      render: (value) => {
        const author = String(value);

        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}
          >
            <Avatar
              sx={{
                width: 26,
                height: 26,
                fontSize: 11,
                fontWeight: 700,
                bgcolor: alpha(getAvatarColor(author), 0.13),
                color: getAvatarColor(author)
              }}
            >
              {getInitials(author)}
            </Avatar>

            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
              noWrap
            >
              {author}
            </Typography>
          </Box>
        );
      }
    },
    {
      id: 'status',
      label: 'Status',
      sortable: true,
      minWidth: 130,

      render: (value) => {
        const status = value as PostStatus;
        const style = getStatusStyle(status);

        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              bgcolor: style.bg,
              color: style.color,
              fontSize: 11,
              fontWeight: 700,
              px: 1.5,
              py: 0.5,
              borderRadius: '50px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: style.color
              }}
            />

            {status}
          </Box>
        );
      }
    },
    {
      id: 'date',
      label: 'Date',
      sortable: true,
      minWidth: 130,

      render: (value) => {
        const date = String(value);

        return (
          <Tooltip title={formatFullDate(date)} arrow>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {formatRelativeDate(date)}
            </Typography>
          </Tooltip>
        );
      }
    },
    {
      id: 'actions',
      label: '',
      align: 'right',
      sortable: false,
      width: 60,

      render: (_value, row) => {
        const post = filteredRows.find((item) => item.id === row.id);

        if (!post) {
          return null;
        }

        return (
          <Tooltip title="More actions" arrow>
            <IconButton
              size="small"
              onClick={(event) => handleMenuOpen(event, post)}
              sx={{
                color: theme.palette.text.secondary,

                '&:hover': {
                  color: theme.colors.primary.main,
                  bgcolor: alpha(theme.colors.primary.main, 0.08)
                }
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
      }
    }
  ];

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────

  return (
    <Box>
      {/* Header */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center'
          },
          gap: 2,
          mb: 3
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            color="text.primary"
            sx={{ mb: 0.5 }}
          >
            Manage Posts
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Create, edit, and manage your logistics news and updates.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: theme.colors.primary.main,
            color: theme.colors.alpha.white[100],
            fontWeight: 700,
            textTransform: 'none',
            px: 3,
            py: 1.1,
            borderRadius: theme.general.borderRadius,
            transition: 'all 0.2s',

            '&:hover': {
              bgcolor: theme.colors.primary.dark,
              transform: 'translateY(-1px)'
            }
          }}
        >
          Create Post
        </Button>
      </Box>

      {/* Statistics */}

      <Stack
        direction={{
          xs: 'column',
          sm: 'row'
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <StatCard
          label="Total"
          value={stats.total}
          icon={<ArticleIcon fontSize="small" />}
          active={statusFilter === 'All'}
          color="primary"
          onClick={() => setStatusFilter('All')}
        />

        <StatCard
          label="Published"
          value={stats.published}
          icon={<PublishedIcon fontSize="small" />}
          active={statusFilter === 'Published'}
          color="success"
          onClick={() => setStatusFilter('Published')}
        />

        <StatCard
          label="Drafts"
          value={stats.draft}
          icon={<EditIcon fontSize="small" />}
          active={statusFilter === 'Draft'}
          color="default"
          onClick={() => setStatusFilter('Draft')}
        />

        <StatCard
          label="Archived"
          value={stats.archived}
          icon={<ArchivedIcon fontSize="small" />}
          active={statusFilter === 'Archived'}
          color="error"
          onClick={() => setStatusFilter('Archived')}
        />
      </Stack>

      {/* Active Filter */}

      {hasActiveFilter && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            gap: 1
          }}
        >
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Showing {statusFilter.toLowerCase()} posts
          </Typography>

          <Button
            size="small"
            onClick={handleClearFilters}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: theme.colors.primary.main
            }}
          >
            Clear filter
          </Button>
        </Box>
      )}

      {/* Shared DataTable Component */}

      <DataTable
        title="Posts"
        description="Manage your logistics news and updates."
        rows={tableRows}
        columns={columns}
        rowsPerPage={5}
        variant="toolkit"
        headerVariant="default"
        emptyMessage={
          hasActiveFilter
            ? `No ${statusFilter.toLowerCase()} posts found.`
            : 'No posts available.'
        }
      />

      {/* Row Actions Menu */}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 0.8,
            minWidth: 170,
            borderRadius: theme.general.borderRadius,
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'none',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0px 5px 18px rgba(0, 0, 0, 0.45)'
                : '0px 5px 18px rgba(18, 26, 87, 0.14)',
            overflow: 'hidden',

            '& .MuiMenu-list': {
              padding: '5px'
            }
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>View</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Duplicate</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleMenuClose}
          sx={{
            color: theme.colors.error.main,

            '& .MuiListItemIcon-root': {
              color: theme.colors.error.main
            }
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ManagePostsPage;
