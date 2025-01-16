import React, { useState } from 'react';

import {
  Box,
  Drawer,
  Avatar,
  Tooltip,
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// import WorkflowsConnectedTable from '../../page-connections/hook/table_connected/connected-table';
import ViewLogTable from '../view-log-table/viewlog-table';

// Hook to manage the popover state
const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const onOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return {
    open: Boolean(anchorEl),
    anchorEl,
    onOpen,
    onClose,
  };
};

// Custom backdrop component
const CustomBackdrop = (props) => (
  <MuiBackdrop
    {...props}
    sx={{ backgroundColor: 'transparent' }} // Make the backdrop transparent
  />
);

const ViewLogTableDrawer = ({
  open,
  onClose,
  headerTitle = 'View Logs',
  headerTitleTooltip = 'Title Tooltip',
  headerSubTitleTooltip,
  headerSubTitle = 'Sub Title Tooltip',

}) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const popover = usePopover(); // Use popover hook

  // Define snackbar state
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);
  const theme = useTheme(); // Use Material-UI theme

  // Check for small screen
  const isSmallScreen = useMediaQuery('(max-width:500px)');

  // Handlers for Snackbar
  const handleShareSnackbarClose = () => {
    setShareSnackbarOpen(false);
  };

  const handleCopyTaskId = () => {
    setShareSnackbarOpen(true); // Show snackbar when task ID is copied
  };

  const [selectedApp, setSelectedApp] = useState(null);

  const handleSelectApp = (app) => {
    setSelectedApp(app);
  };

  const handleDrawerClose = () => {
    setSelectedApp(null);
    onClose();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: 'auto',
            },
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop,
        }}
      >
        <Box
          display="flex"
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px dashed #919eab33',
            p: 3,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Box display="flex" gap="16px" width="100%">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title="Apps which are integrated in the workflow." arrow placement="top">
                    <Avatar
                      variant="rounded"
                      sx={{
                        p: 1,
                        width: 56,
                        height: 56,
                        bgcolor: 'background.neutral',
                        border: '1px solid #D4E2FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Iconify
                        color="text.secondary"
                        icon="mdi:clipboard-text-history"
                        width={32}
                        height={32}
                      />
                    </Avatar>
                  </Tooltip>
                </Box>

                <Box display="flex" flexDirection="column" gap="4px" width="100%">
                  <Box sx={{ display: 'auto', width: '100%', mr: 3 }}>
                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>

                      <Typography variant="h6" sx={{ fontWeight: '600' }}>

                        <Tooltip title={`${headerTitleTooltip}`} placement="top" arrow>

                          {headerTitle.slice(0, 50)}{headerTitle.length > 50 ? '...' : ''}

                        </Tooltip>
                      </Typography>
                    </Box>

                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          // color: '#637381',
                          '[data-mui-color-scheme="light"] &': {
                            color: '#637381',
                          },
                          '[data-mui-color-scheme="dark"] &': {
                            color: 'var(--palette-text-secondary)',
                          },
                        }}
                      >
                        <Tooltip
                          title={`${headerSubTitleTooltip}`}
                          arrow
                          placement="bottom"
                        >
                          {/* <strong>    {headerSubTitle}</strong> */}
                          {headerSubTitle}

                        </Tooltip>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box>
              <IconButton onClick={handleDrawerClose} sx={{ p: 1 }}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          justifyContent="space-between"
          sx={{
            display: 'block',
            height: '100%',
            p: 3,
            overflow: 'auto',
            maxHeight: 'auto',
          }}
        >
          <ViewLogTable />
          {/* <WorkflowsConnectedTable /> */}
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

export { ViewLogTableDrawer };
