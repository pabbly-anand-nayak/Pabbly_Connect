import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import {
  Box,
  List,
  Button,
  Tooltip,
  ListItem,
  Typography,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import VideoModalNew from 'src/components/video-modal/video-modal-new';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
import {
  listItemCustomStyle,
  commonBulletListStyle,
} from 'src/components/bullet-list-style/bullet-list-style';

export default function BigCard({
  sx,
  title = 'Add Title.',
  secondarytitle = 'Add a secondary title if needed.',
  steps = [
    'Step 1: Click on the "Create Workflow" button available in the top right section.',
    'Step 2: Now select apps you want to integrate into the trigger and action step.',
    <>Step 3: Once the workflow is completed, save and enable it. </>,
  ],
  buttonText = 'Create Workflow',
  buttonIcon = 'heroicons:plus-circle-16-solid',
  buttonTooltip = 'Add a button tooltip if needed.',
  videoThumbnail = 'API_Webhooks.png',
  videoId = 'https://www.youtube.com/embed/Lv9Rnzoh-vY',
  learnMoreLink = 'https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U',
  onButtonClick, // Custom button click handler
  ...other
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Consistent hook usage
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);

  // Handle button click
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
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
        // mt: '32px',
        pt: 5,
        pb: 5,
        pr: 3,
        gap: 5,
        borderRadius: 2,
        display: 'flex',
        height: { md: 1 },
        position: 'relative',
        pl: { xs: 3, md: 5 },
        alignItems: { xs: 'left', md: 'left' },
        justifyContent: { xs: 'left', md: 'left' },
        color: 'common.white',
        textAlign: { xs: 'left', md: 'left' },
        flexDirection: { xs: 'column', md: 'row' },

        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          display: 'fixd',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: { xs: 'flex-start', md: 'flex-start' },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.common.white
                : theme.palette.text.primary,
            mb: 0,
          }}
        >
          {title}
        </Typography>

        <ListItem disablePadding sx={{ ...commonBulletListStyle, paddingLeft: 0 }}>
          <ListItemText
            primary={secondarytitle}
            primaryTypographyProps={{
              sx: {
                marginTop: 1,
                fontSize: '14px',
                fontWeight: '500',

                '&::before': { paddingRight: '0.5rem' },
              },
            }}
          />
        </ListItem>

        <List sx={{ ...commonBulletListStyle, mb: 0 }}>
          <ul style={commonBulletListStyle}>
            {steps.map((text, index) => (
              <li key={index} style={listItemCustomStyle}>
                <span>
                  {text}
                  {index === steps.length - 1 && <LearnMoreLink link={learnMoreLink} />}
                </span>
              </li>
            ))}
          </ul>
        </List>

        <Tooltip title={buttonTooltip} arrow placement="top">
          <Button
            onClick={handleButtonClick}
            sx={{ mt: isMobile ? 2 : 1 }}
            size="large"
            variant="outlined"
            color="primary"
            // startIcon={
            //   <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            // }
            startIcon={<Iconify icon={buttonIcon} width={18} height={18} />}
          >
            {buttonText}
          </Button>
        </Tooltip>
      </Box>

      <Box
        sx={{
          marginRight: '16px',
          ...(isMobile && {
            marginRight: '0px',
          }),
        }}
      >
        <VideoModalNew
          thumbnailimage={videoThumbnail}
          videoId={videoId}
          open={isVideoModalOpen}
          onClose={handleCloseVideo}
          onOpen={handleOpenVideo}
        />
      </Box>
    </Box>
  );
}
