import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const BadgeGroup = ({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
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

const BadgeCard = ({ children }: { children: React.ReactNode }) => (
  <Paper
    variant="outlined"
    sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 2,
      height: '100%'
    }}
  >
    {children}
  </Paper>
);

const BadgesSection = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" fontWeight={700}>
          Badges
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          Badge variations for labels, statuses, notifications, and visual
          indicators.
        </Typography>
      </Box>

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
            <Chip label="Default" />
            <Chip label="Primary" color="primary" />
            <Chip label="Secondary" color="secondary" />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Plain Badges"
            description="Minimal badges with subtle backgrounds."
          >
            <Chip label="Plain" variant="filled" color="default" />
            <Chip
              label="Primary"
              variant="filled"
              color="primary"
              sx={{ bgcolor: 'action.hover', color: 'primary.main' }}
            />
            <Chip
              label="Success"
              sx={{
                bgcolor: 'success.light',
                color: 'success.dark'
              }}
            />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Semantic Badges"
            description="Use colors to communicate different states."
          >
            <Chip label="Success" color="success" />
            <Chip label="Warning" color="warning" />
            <Chip label="Error" color="error" />
            <Chip label="Info" color="info" />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Outlined Badges"
            description="Outlined variations with transparent backgrounds."
          >
            <Chip label="Default" variant="outlined" />
            <Chip label="Primary" color="primary" variant="outlined" />
            <Chip label="Success" color="success" variant="outlined" />
            <Chip label="Warning" color="warning" variant="outlined" />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Icon Badges"
            description="Badges with leading icons."
          >
            <Chip
              icon={<CheckCircleOutlinedIcon />}
              label="Verified"
              color="success"
            />
            <Chip
              icon={<WarningAmberOutlinedIcon />}
              label="Warning"
              color="warning"
            />
            <Chip
              icon={<ErrorOutlineOutlinedIcon />}
              label="Error"
              color="error"
            />
            <Chip
              icon={<InfoOutlinedIcon />}
              label="Information"
              color="info"
            />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Icon Only Badges"
            description="Compact badges for visual indicators."
          >
            <Chip
              icon={<StarOutlinedIcon />}
              label="Featured"
              variant="outlined"
              color="primary"
            />
            <Chip
              icon={<FavoriteBorderOutlinedIcon />}
              label="Favorite"
              variant="outlined"
              color="secondary"
            />
            <Chip
              icon={<NotificationsOutlinedIcon />}
              label="Notification"
              color="info"
            />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Badge Sizes"
            description="Different sizes for different interface requirements."
          >
            <Chip label="Small" size="small" color="primary" />
            <Chip label="Medium" size="medium" color="primary" />
            <Chip
              label="Large"
              color="primary"
              sx={{
                height: 40,
                fontSize: '0.95rem',
                '& .MuiChip-label': {
                  px: 2
                }
              }}
            />
          </BadgeGroup>
        </BadgeCard>

        <BadgeCard>
          <BadgeGroup
            title="Status Badges"
            description="Common status indicators for dashboard interfaces."
          >
            <Chip label="Active" color="success" size="small" />
            <Chip label="Pending" color="warning" size="small" />
            <Chip label="Inactive" color="default" size="small" />
            <Chip label="Rejected" color="error" size="small" />
            <Chip label="Processing" color="info" size="small" />
          </BadgeGroup>
        </BadgeCard>
      </Box>

      <Divider />

      <Typography variant="caption" color="text.secondary">
        Badge examples use MUI Chip components and remain responsive across
        screen sizes.
      </Typography>
    </Stack>
  );
};

export default BadgesSection;
