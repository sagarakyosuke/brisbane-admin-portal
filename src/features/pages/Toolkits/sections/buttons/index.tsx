import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import ToolkitButton from '@/features/components/Toolkits/Button';

import useButton from '@/features/components/Toolkits/Button/useContext';

const ButtonSection = () => {
  const { loading, handleLoadingClick } = useButton();

  const sectionPaperStyles = {
    p: { xs: 2, sm: 2.5, md: 3 },
    border: 1,
    borderColor: 'divider',
    borderRadius: '14px',
    bgcolor: 'background.paper',
    backgroundImage: 'none',
    width: '100%',
    minWidth: 0
  };

  const sectionTitleStyles = {
    fontSize: { xs: '0.95rem', sm: '1rem' },
    fontWeight: 700,
    color: 'text.primary'
  };

  const sectionDescriptionStyles = {
    mt: 0.5,
    fontSize: { xs: '0.8rem', sm: '0.85rem' },
    color: 'text.secondary',
    lineHeight: 1.6
  };

  const buttonGroupStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: { xs: 1.5, sm: 2 },
    width: '100%',
    minWidth: 0,
    '& > *': {
      flex: '0 0 auto',
      maxWidth: '100%'
    }
  };

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Stack spacing={{ xs: 2.5, sm: 3 }}>
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
          >
            Buttons
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
            A collection of reusable button styles, colors, sizes, and
            interactive states.
          </Typography>
        </Box>

        {/* Contained Buttons */}
        <Paper elevation={0} sx={sectionPaperStyles}>
          <Typography sx={sectionTitleStyles}>Contained Buttons</Typography>

          <Typography sx={sectionDescriptionStyles}>
            Solid buttons for primary actions and important interactions.
          </Typography>

          <Divider sx={{ my: { xs: 2, sm: 2.5 } }} />

          <Box sx={buttonGroupStyles}>
            <ToolkitButton variant="contained" color="primary">
              Primary
            </ToolkitButton>

            <ToolkitButton variant="contained" color="secondary">
              Secondary
            </ToolkitButton>

            <ToolkitButton variant="contained" color="success">
              Success
            </ToolkitButton>

            <ToolkitButton variant="contained" color="error">
              Error
            </ToolkitButton>

            <ToolkitButton variant="contained" color="warning">
              Warning
            </ToolkitButton>

            <ToolkitButton variant="contained" color="info">
              Info
            </ToolkitButton>
          </Box>
        </Paper>

        {/* Outlined Buttons */}
        <Paper elevation={0} sx={sectionPaperStyles}>
          <Typography sx={sectionTitleStyles}>Outlined Buttons</Typography>

          <Typography sx={sectionDescriptionStyles}>
            Buttons with transparent backgrounds and visible borders for
            secondary actions.
          </Typography>

          <Divider sx={{ my: { xs: 2, sm: 2.5 } }} />

          <Box sx={buttonGroupStyles}>
            <ToolkitButton variant="outlined" color="primary">
              Primary
            </ToolkitButton>

            <ToolkitButton variant="outlined" color="secondary">
              Secondary
            </ToolkitButton>

            <ToolkitButton variant="outlined" color="success">
              Success
            </ToolkitButton>

            <ToolkitButton variant="outlined" color="error">
              Error
            </ToolkitButton>

            <ToolkitButton variant="outlined" color="warning">
              Warning
            </ToolkitButton>

            <ToolkitButton variant="outlined" color="info">
              Info
            </ToolkitButton>
          </Box>
        </Paper>

        {/* Text Buttons */}
        <Paper elevation={0} sx={sectionPaperStyles}>
          <Typography sx={sectionTitleStyles}>Text Buttons</Typography>

          <Typography sx={sectionDescriptionStyles}>
            Lightweight buttons without a visible background or border.
          </Typography>

          <Divider sx={{ my: { xs: 2, sm: 2.5 } }} />

          <Box sx={buttonGroupStyles}>
            <ToolkitButton variant="text" color="primary">
              Primary
            </ToolkitButton>

            <ToolkitButton variant="text" color="secondary">
              Secondary
            </ToolkitButton>

            <ToolkitButton variant="text" color="success">
              Success
            </ToolkitButton>

            <ToolkitButton variant="text" color="error">
              Error
            </ToolkitButton>

            <ToolkitButton variant="text" color="warning">
              Warning
            </ToolkitButton>

            <ToolkitButton variant="text" color="info">
              Info
            </ToolkitButton>
          </Box>
        </Paper>

        {/* Button Sizes */}
        <Paper elevation={0} sx={sectionPaperStyles}>
          <Typography sx={sectionTitleStyles}>Button Sizes</Typography>

          <Typography sx={sectionDescriptionStyles}>
            Three predefined sizes for different interface requirements.
          </Typography>

          <Divider sx={{ my: { xs: 2, sm: 2.5 } }} />

          <Box sx={buttonGroupStyles}>
            <ToolkitButton variant="contained" color="primary" size="small">
              Small
            </ToolkitButton>

            <ToolkitButton variant="contained" color="primary" size="medium">
              Medium
            </ToolkitButton>

            <ToolkitButton variant="contained" color="primary" size="large">
              Large
            </ToolkitButton>
          </Box>
        </Paper>

        {/* Buttons with Icons */}
        <Paper elevation={0} sx={sectionPaperStyles}>
          <Typography sx={sectionTitleStyles}>Buttons with Icons</Typography>

          <Typography sx={sectionDescriptionStyles}>
            Buttons with leading or trailing icons to make actions easier to
            identify.
          </Typography>

          <Divider sx={{ my: { xs: 2, sm: 2.5 } }} />

          <Box sx={buttonGroupStyles}>
            <ToolkitButton
              variant="contained"
              color="primary"
              startIcon={<AddOutlinedIcon />}
            >
              Add New
            </ToolkitButton>

            <ToolkitButton
              variant="outlined"
              color="primary"
              startIcon={<EditOutlinedIcon />}
            >
              Edit
            </ToolkitButton>

            <ToolkitButton
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineOutlinedIcon />}
            >
              Delete
            </ToolkitButton>

            <ToolkitButton
              variant="contained"
              color="success"
              endIcon={<SaveOutlinedIcon />}
            >
              Save Changes
            </ToolkitButton>

            <ToolkitButton
              variant="text"
              color="secondary"
              startIcon={<DownloadOutlinedIcon />}
            >
              Download
            </ToolkitButton>
          </Box>
        </Paper>

        {/* Icon Buttons */}
        <Paper elevation={0} sx={sectionPaperStyles}>
          <Typography sx={sectionTitleStyles}>Icon Buttons</Typography>

          <Typography sx={sectionDescriptionStyles}>
            Compact icon-only buttons for toolbar actions and frequently used
            controls.
          </Typography>

          <Divider sx={{ my: { xs: 2, sm: 2.5 } }} />

          <Box sx={buttonGroupStyles}>
            <ToolkitButton
              iconOnly
              color="primary"
              icon={<AddOutlinedIcon />}
              aria-label="Add"
            />

            <ToolkitButton
              iconOnly
              color="secondary"
              icon={<EditOutlinedIcon />}
              aria-label="Edit"
            />

            <ToolkitButton
              iconOnly
              color="error"
              icon={<DeleteOutlineOutlinedIcon />}
              aria-label="Delete"
            />

            <ToolkitButton
              iconOnly
              color="success"
              icon={<SaveOutlinedIcon />}
              aria-label="Save"
            />

            <ToolkitButton
              iconOnly
              color="warning"
              icon={<FavoriteBorderOutlinedIcon />}
              aria-label="Favorite"
            />

            <ToolkitButton
              iconOnly
              color="info"
              icon={<DownloadOutlinedIcon />}
              aria-label="Download"
            />
          </Box>

          <Divider sx={{ my: { xs: 2, sm: 2.5 } }} />

          <Box sx={buttonGroupStyles}>
            <ToolkitButton
              iconOnly
              color="primary"
              size="small"
              icon={<EditOutlinedIcon />}
              aria-label="Small edit"
            />

            <ToolkitButton
              iconOnly
              color="primary"
              size="medium"
              icon={<EditOutlinedIcon />}
              aria-label="Medium edit"
            />

            <ToolkitButton
              iconOnly
              color="primary"
              size="large"
              icon={<EditOutlinedIcon />}
              aria-label="Large edit"
            />
          </Box>
        </Paper>

        {/* Button States */}
        <Paper elevation={0} sx={sectionPaperStyles}>
          <Typography sx={sectionTitleStyles}>Button States</Typography>

          <Typography sx={sectionDescriptionStyles}>
            Examples of disabled and loading button states.
          </Typography>

          <Divider sx={{ my: { xs: 2, sm: 2.5 } }} />

          <Box sx={buttonGroupStyles}>
            <ToolkitButton variant="contained" color="primary">
              Enabled
            </ToolkitButton>

            <ToolkitButton variant="contained" color="primary" disabled>
              Disabled
            </ToolkitButton>

            <ToolkitButton variant="outlined" color="primary" disabled>
              Disabled Outlined
            </ToolkitButton>

            <ToolkitButton
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleLoadingClick}
              startIcon={
                loading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : undefined
              }
            >
              {loading ? 'Loading...' : 'Click to Load'}
            </ToolkitButton>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default ButtonSection;
