import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, List, Button, Tooltip, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import VideoModalNew from 'src/components/video-modal/video-modal-new';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
import {
  listItemCustomStyle,
  commonBulletListStyle,
} from 'src/components/bullet-list-style/bullet-list-style';

import { WebhookDialog } from '../hook/add-update-webhook-dialog';

export default function APIWebhooksBigCard({ sx, ...other }) {
  const dialog = useBoolean();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleAddContact = () => {
    navigate('/app/contact/addcontact');
  };

  // video modal open functionality

  const [isVideoModalOpen, setVideoModalOpen] = useState(false);

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
        mt: '32px',
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
            mb: 1,
          }}
        >
          Points To Remember!
        </Typography>

        <List sx={{ ...commonBulletListStyle, mb: 0 }}>
          <ul style={commonBulletListStyle}>
            {[
              "Click 'Generate API Token' to create a new token, invalidating the previous one.",
              "Click 'Copy' to quickly copy the API token for use in Pabbly Connect Manager application.",
              'Ensure that you do not share the API token with anyone.',
              <>
                With the Pabbly Connect API, you can obtain real-time status updates for workflows,
                manage team members, and much more.{' '}
                <LearnMoreLink link="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly" />
              </>,
            ].map((text, index) => (
              <li key={index} style={listItemCustomStyle}>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </List>

        <Tooltip
          title="Click here to add a webhook URL and a webhook event that will trigger the webhook URL."
          arrow
          placement="top"
        >
          <Button
            onClick={dialog.onTrue}
            sx={{ mt: isMobile ? 2 : 1 }}
            size="large"
            variant="outlined"
            color="primary"
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add Webhook
          </Button>
        </Tooltip>
        <WebhookDialog open={dialog.value} onClose={dialog.onFalse} />
      </Box>

      <Box
        sx={{
          marginRight: '16px',
          ...(isMobile && {
            marginRight: '0px',
          }),
        }}
      >
        {/* <VideoModal /> */}
        <VideoModalNew
          thumbnailimage="API_Webhooks.png"
          videoId="https://www.youtube.com/embed/Lv9Rnzoh-vY"
          open={isVideoModalOpen}
          onClose={handleCloseVideo}
          onOpen={handleOpenVideo}
        />
      </Box>
    </Box>
  );
}
