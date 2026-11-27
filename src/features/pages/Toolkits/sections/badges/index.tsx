
import type { ReactNode } from 'react';

import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

import Badge from '@/features/components/Toolkits/Badge';

const BadgeGroup = ({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) => (
  <Box>
    <Stack spacing={0.5} sx={{ mb: 2 }}>
      <Typography variant="subtitle1" fontWeight={700}>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Stack>

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1.5
      }}
    >
      {children}
    </Box>
  </Box>
);

const BadgeCard = ({
  children
}: {
  children: ReactNode;
}) => (
  <Paper
    variant="outlined"
    sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 2,
      height: '100%',
      transition: (theme) =>
        theme.transitions.create(
          ['border-color', 'box-shadow'],
          { duration: theme.transitions.duration.short }
        ),

      '&:hover': {
        borderColor: 'action.disabled',
        boxShadow: (theme) => theme.shadows[1]
      }
    }}
  >
    {children}
  </Paper>
);

const BadgesSection = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
        >
          Badges
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            lineHeight: 1.6
          }}
        >
          A collection of reusable badge styles, colors, variants, and sizes for displaying status and labels.
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, minmax(0, 1fr))'
          },
          gap: 2
        }}
      >
        <BadgeCard>
          <BadgeGroup
            title="Default Badges"
            description="Basic badge styles for general use."
          >
            <Badge label="Default" />
            <Badge label="Primary" color="primary" />
            <Badge label="Secondary" color="secondary" />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Plain Badges"
            description="Minimal badges with subtle theme-based backgrounds."
          >
            <Badge label="Plain" variant="plain" />

            <Badge
              label="Primary"
              color="primary"
              variant="plain"
            />

            <Badge
              label="Success"
              color="success"
              variant="plain"
            />

            <Badge
              label="Warning"
              color="warning"
              variant="plain"
            />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Semantic Badges"
            description="Use colors to communicate different states."
          >
            <Badge label="Success" color="success" />
            <Badge label="Warning" color="warning" />
            <Badge label="Error" color="error" />
            <Badge label="Info" color="info" />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Outlined Badges"
            description="Outlined variations with transparent backgrounds."
          >
            <Badge
              label="Default"
              variant="outlined"
            />

            <Badge
              label="Primary"
              color="primary"
              variant="outlined"
            />

            <Badge
              label="Success"
              color="success"
              variant="outlined"
            />

            <Badge
              label="Warning"
              color="warning"
              variant="outlined"
            />

            <Badge
              label="Error"
              color="error"
              variant="outlined"
            />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Icon Badges"
            description="Badges with leading icons for additional context."
          >
            <Badge
              icon={<CheckCircleOutlinedIcon />}
              label="Verified"
              color="success"
            />

            <Badge
              icon={<WarningAmberOutlinedIcon />}
              label="Warning"
              color="warning"
            />

            <Badge
              icon={<ErrorOutlineOutlinedIcon />}
              label="Error"
              color="error"
            />

            <Badge
              icon={<InfoOutlinedIcon />}
              label="Information"
              color="info"
            />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Icon Only Badges"
            description="Compact indicators for limited interface space."
          >
            <Badge
              icon={<StarOutlinedIcon />}
              color="primary"
              variant="plain"
              size="small"
              aria-label="Featured"
            />

            <Badge
              icon={<FavoriteBorderOutlinedIcon />}
              color="secondary"
              variant="outlined"
              aria-label="Favorite"
            />

            <Badge
              icon={<NotificationsOutlinedIcon />}
              color="info"
              size="large"
              aria-label="Notification"
            />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Badge Sizes"
            description="Different sizes for different interface requirements."
          >
            <Badge
              label="Small"
              size="small"
              color="primary"
            />

            <Badge
              label="Medium"
              size="medium"
              color="primary"
            />

            <Badge
              label="Large"
              size="large"
              color="primary"
            />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Status Badges"
            description="Common status indicators for dashboard interfaces."
          >
            <Badge
              label="Active"
              color="success"
              size="small"
              variant="plain"
            />

            <Badge
              label="Pending"
              color="warning"
              size="small"
              variant="plain"
            />

            <Badge
              label="Inactive"
              color="default"
              size="small"
              variant="plain"
            />

            <Badge
              label="Rejected"
              color="error"
              size="small"
              variant="plain"
            />

            <Badge
              label="Processing"
              color="info"
              size="small"
              variant="plain"
            />
          </BadgeGroup>
        </BadgeCard>
      </Box>

      <Divider />
    </Stack>
  );
};

export default BadgesSection;
