import { useState } from 'react';
import { useTheme } from '@emotion/react';
import ModalVideo from 'react-modal-video';
import { useNavigate } from 'react-router';

import {
  Box,
  Card,
  List,
  Button,
  Tooltip,
  ListItem,
  CardMedia,
  Typography,
  IconButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

// import { CreateWorkflow } from '../../hooks/create_workflow';
import { CreateWorkflowDialog } from '../../hooks/create_workflow-dailog';

export default function DashboardBigCard({ sx, ...other }) {
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

  // Define common styles
  const commonListStyle = {
    paddingLeft: '8px',
    color: 'grey.600',
    fontSize: '12px',
  };

  const commonListItemStyle = {
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    listStyleType: 'disc',
    listStylePosition: 'outside',
    color: 'grey.800',
  };

  return (
    <Box
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        backgroundColor: 'common.white',
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
        <Typography variant="h6" sx={{ color: 'grey.800', mb: 0 }}>
          No workflows found!
        </Typography>

        <List sx={{ color: 'grey.600' }}>
          <ListItem disablePadding sx={{ mb: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontSize: '14px',
                  fontWeight: '500',
                  '&::before': { paddingRight: '0.5rem' },
                },
              }}
              primary="There may be no contacts in this contact list. You can create a workflow by following the steps below-"
            />
          </ListItem>
          <List sx={{ ...commonListStyle, mb: 0 }}>
            <ul style={commonListStyle}>
              {[
                'Step 1: Click on the "Create Workflow" button available in the top right section.',
                'Step 2: Now select apps you want to integrate into the trigger and action step.',

                <>
                  Step 3: Once the workflow is completed, save and enable it.{' '}
                  <a
                    href="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#078DEE' }}
                  >
                    Learn more
                  </a>
                </>,
              ].map((text, index) => (
                <li key={index} style={commonListItemStyle}>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </List>
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
        <Tooltip title="Click here to see Video Tutorial." arrow placement="top">
          <Card>
            <Box position="relative">
              <CardMedia
                component="img"
                src={coverSrc}
                title="Cover Image"
                sx={{
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  objectFit: 'contain',
                }}
                onClick={() => setOpen(true)}
              />
              <IconButton
                aria-label="play"
                onClick={() => setOpen(true)}
                sx={{
                  padding: '0px',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#078DEE',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'translate(-50%, -50%) scale(1)',
                      boxShadow: '0 0 0 0 rgba(7, 141, 238, 0.7)',
                    },
                    '70%': {
                      transform: 'translate(-50%, -50%) scale(1.1)',
                      boxShadow: '0 0 0 10px rgba(7, 141, 238, 0)',
                    },
                    '100%': {
                      transform: 'translate(-50%, -50%) scale(1)',
                      boxShadow: '0 0 0 0 rgba(7, 141, 238, 0)',
                    },
                  },
                }}
              >
                <Iconify icon="icon-park-solid:play" width={50} height={50} />
              </IconButton>
            </Box>
          </Card>
        </Tooltip>

        <ModalVideo
          channel="youtube"
          autoplay="true"
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
      </Box>
    </Box>
  );
}
