import { useState } from 'react';
import { useTheme } from '@emotion/react';
import ModalVideo from 'react-modal-video';

import {
  Box,
  Card,
  List,
  Button,
  Tooltip,
  CardMedia,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

import { AssignTasksDialog } from '../hook/add-assign-tasks';

export default function NewUserAgencyTasksBigCard({ sx, ...other }) {
  const videoId = 'YxK95UMwTD8'; // Replace with your YouTube video ID
  const coverSrc = `${CONFIG.site.basePath}/assets/background/Task Summary Thumbnail.png`;
  const [isOpen, setOpen] = useState(false);
  const [addSubaccountDialogOpen, setAssignTasksDialogOpen] = useState(false); // State for Assign Tasks Dialog

  const dialog = useBoolean();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Dialog Handlers
  const handleAssignTasksDialogOpen = () => setAssignTasksDialogOpen(true);
  const handleAssignTasksDialogClose = () => setAssignTasksDialogOpen(false);

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
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: { xs: 'flex-start', md: 'flex-start' },
        }}
      >
        <Typography variant="h6" sx={{ color: 'grey.800', mb: 1 }}>
          You don&apos;t have access to Agency Tasks Feature.
        </Typography>

        <List sx={{ ...commonListStyle, mb: 0 }}>
          <ul style={commonListStyle}>
            {[
              'Assign tasks to other Pabbly accounts seamlessly.',
              'Assign tasks to an unlimited number of Pabbly accounts.',
              'Remove assigned tasks from any account at any time.',
              'Access detailed task assignment logs for effective monitoring.',
            ].map((text, index) => (
              <li key={index} style={commonListItemStyle}>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </List>

        <Tooltip
          title="Assign agency tasks to another Pabbly Connect account."
          arrow
          placement="top"
        >
          <a
            href="https://www.pabbly.com/connect/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button
              onClick={handleAssignTasksDialogOpen}
              sx={{ mt: isMobile ? 2 : 1 }}
              size="large"
              variant="outlined"
              color="primary"
              startIcon={
                <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
              }
            >
              Purchase Now
            </Button>
          </a>
        </Tooltip>

        {/* AssignTasksDialog component */}
        <AssignTasksDialog open={addSubaccountDialogOpen} onClose={handleAssignTasksDialogClose} />
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
