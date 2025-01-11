import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, List, Button, Tooltip, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import VideoModalNew from 'src/components/video-modal/video-modal-new';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
import {
  listItemCustomStyle,
  commonBulletListStyle,
} from 'src/components/bullet-list-style/bullet-list-style';

import { CreateWorkflowDialog } from '../../../create_workflow-dailog';

export default function DashboardBigCard1({ sx, ...other }) {
  const videoId = 'CoIfgN0tfhE'; // Replace with your YouTube video ID
  const coverSrc = `${CONFIG.site.basePath}/assets/background/pabbly_overview_card.png`;
  const [isOpen, setOpen] = useState(false);

  const dialog = useBoolean();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // State to manage the CreateFolder dialog
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);

  // Function to open the folder dialog
  const handleCreateWorkflowDialogClick = () => {
    setWorkflowDialogOpen(true); // Open the dialog
  };

  // Function to close the folder dialog
  const handleFolderDialogClose = () => {
    setWorkflowDialogOpen(false); // Close the dialog
  };

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

        // mt: '32px',
        pt: 5,
        pb: 5,
        pr: 3,
        gap: 5,
        borderRadius: 2,
        display: 'flex',
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
          display: 'flex',
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
          No workflows found!
        </Typography>

        <List sx={{ ...commonBulletListStyle, mb: 0 }}>
          <ul style={commonBulletListStyle}>
            {[
              'Step 1: Click on the "Create Workflow" button available in the top right section.',
              'Step 2: Now select apps you want to integrate into the trigger and action step.',
              <>
                Step 3: Once the workflow is completed, save and enable it.{' '}
                <LearnMoreLink link="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U" />
              </>,
            ].map((text, index) => (
              <li key={index} style={listItemCustomStyle}>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </List>

        <Tooltip title="Start building a new automation workflow." arrow placement="top">
          <Button
            onClick={handleCreateWorkflowDialogClick} // Opens CreateFolder dialog
            sx={{ mt: isMobile ? 0 : 0 }}
            size="large"
            variant="outlined"
            color="primary"
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Create Workflow
          </Button>
        </Tooltip>

        {/* CreateWorkflow Dialog */}
        <CreateWorkflowDialog open={workflowDialogOpen} onClose={handleFolderDialogClose} />
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
