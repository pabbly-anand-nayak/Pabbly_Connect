import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Box, Button, Tooltip, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import VideoModal from 'src/components/video-modal/video-modal-new';

export default function DashboardBigCard({
  title = 'Dashboard Big Card',
  description = 'Detailed description of the dashboard section.',
  primaryAction = 'Create',
  onPrimaryAction,
  secondaryAction,
  videoProps, // New prop for video modal configuration
  sx,
  ...other
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  // State for video modal
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);

  // Default primary action handler if not provided
  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    } else {
      console.log('Primary action not defined');
    }
  };

  // Video modal handlers
  const handleOpenVideo = () => {
    setVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setVideoModalOpen(false);
  };

  return (
    <Box
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        backgroundColor: 'background.paper',
        pt: 5,
        pb: 5,
        pr: 3,
        pl: { xs: 3, md: 5 },
        gap: 5,
        borderRadius: 2,
        display: 'flex',
        position: 'relative',
        alignItems: { xs: 'left', md: 'center' },
        justifyContent: { xs: 'left', md: 'space-between' },
        flexDirection: { xs: 'column', md: 'row' },
        ...sx,
      }}
      {...other}
    >
      {/* Content Section */}
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: { xs: 'flex-start', md: 'flex-start' },
          maxWidth: { md: '70%' },
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.common.white
                : theme.palette.text.primary,
            mb: 2,
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 3,
          }}
        >
          {description}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Primary Action */}
          <Tooltip title={`Start ${primaryAction.toLowerCase()}`} arrow placement="top">
            <Button
              onClick={handlePrimaryAction}
              size="large"
              variant="contained"
              color="primary"
              startIcon={
                <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
              }
            >
              {primaryAction}
            </Button>
          </Tooltip>

          {/* Optional Secondary Action */}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              size="large"
              variant="outlined"
              color="primary"
            >
              {secondaryAction.label}
            </Button>
          )}

          {/* Optional Video Modal Trigger */}
          {videoProps && (
            <Button
              onClick={handleOpenVideo}
              size="large"
              variant="outlined"
              color="secondary"
              startIcon={
                <Iconify icon="heroicons:play-circle-16-solid" style={{ width: 18, height: 18 }} />
              }
            >
              Watch Tutorial
            </Button>
          )}
        </Box>
      </Box>

      {/* Optional Media/Illustration Section */}
      {other.children && (
        <Box
          sx={{
            flex: '0 0 auto',
            display: { xs: 'none', md: 'block' },
          }}
        >
          {other.children}
        </Box>
      )}

      {/* Video Modal */}
      {videoProps && (
        <VideoModal
          thumbnailimage={videoProps.thumbnailImage || 'Task Summary Thumbnail.png'}
          videoId={videoProps.videoId || 'https://www.youtube.com/embed/CoIfgN0tfhE'}
          open={isVideoModalOpen}
          onClose={handleCloseVideo}
          onOpen={handleOpenVideo}
        />
      )}
    </Box>
  );
}
