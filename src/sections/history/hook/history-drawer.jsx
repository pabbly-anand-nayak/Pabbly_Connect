import React, { useState, useCallback } from 'react';

import {
  Box,
  Menu,
  Alert,
  Drawer,
  Button,
  Tooltip,
  MenuList,
  MenuItem,
  Snackbar,
  useTheme,
  Typography,
  IconButton,
  AlertTitle,
  useMediaQuery,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

import TriggerActionFlow from '../Workflows/trigger_action_flows';
import { ReexecuteWorkflowDialog } from '../re-execute-workflow-dailog';

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

const CustomBackdrop = (props) => (
  <MuiBackdrop {...props} sx={{ backgroundColor: 'transparent' }} />
);

const ConfigurationDrawer2 = ({ open, onClose, publish, onChangePublish }) => {
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:500px)');

  const popover = usePopover();

  const handleShareSnackbarClose = () => {
    setShareSnackbarOpen(false);
  };

  const handleCopyTaskId = () => {
    setShareSnackbarOpen(true);
  };

  const handleOpenWorkflowDialog = () => {
    setWorkflowDialogOpen(true);
  };

  const handleCloseWorkflowDialog = useCallback(() => {
    setWorkflowDialogOpen(false);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
    handleClose();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
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
          <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, mr: 3 }}>
                Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment
              </Typography>

              <Box sx={{ display: 'auto' }}>
                <Box sx={{ gap: 1, alignItems: 'center', display: 'flex' }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#637381',
                      width: 'auto',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    Task History ID - IjU3NjYwNTZmMDYzNzA0MzA1MjZlNTUzNyI_3D_pc
                  </Typography>
                  <Tooltip
                    title="Copy Task History ID"
                    arrow
                    placement="top"
                    sx={{ fontSize: '16px' }}
                  >
                    <IconButton onClick={handleCopyTaskId}>
                      <Iconify width={18} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
                    </IconButton>
                  </Tooltip>

                  <Snackbar
                    open={shareSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleShareSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    sx={{
                      boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
                    }}
                  >
                    <Alert
                      onClose={handleShareSnackbarClose}
                      severity="success"
                      sx={{
                        width: '100%',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Copied!
                    </Alert>
                  </Snackbar>
                </Box>

                <Box sx={{ gap: 1, alignItems: 'center', display: 'flex' }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#637381',
                      width: '100%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    Executed at Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <IconButton onClick={onClose} sx={{ p: 1 }}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            </Box>
          </Box>

          {isSmallScreen && (
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <IconButton onClick={onClose} sx={{ p: 1 }}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mt: 2,
            }}
          >
            <Tooltip title="Click here to re-execute the workflow(s)." arrow placement="top">
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                startIcon={<Iconify icon="foundation:refresh" style={{ width: 18, height: 18 }} />}
                endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                size="large"
              >
                Re-execute
              </Button>
            </Tooltip>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <Tooltip
                title="Click here to re-execute the entire workflow from the beginning."
                arrow
                placement="right"
              >
                <MenuItem onClick={handleDialogOpen} sx={{ color: 'secondary' }}>
                  <Iconify icon="mdi:workflow" style={{ marginRight: 8 }} />
                  Entire Workflow
                </MenuItem>
              </Tooltip>

              <Tooltip
                title="Click here to re-execute only the failed or skipped steps of the workflow."
                arrow
                placement="right"
              >
                <MenuItem
                  onClick={() =>
                    handleSnackbarOpen(
                      'Failed & Skipped Steps workflow has been updated',
                      'success'
                    )
                  }
                  sx={{ color: 'secondary' }}
                >
                  <Iconify icon="eos-icons:action-chains" style={{ marginRight: 8 }} />
                  Failed & Skipped Steps
                </MenuItem>
              </Tooltip>
            </Menu>

            {/* Render the ReexecuteWorkflowDialog component */}
            <ReexecuteWorkflowDialog open={dialogOpen} onClose={handleDialogClose} />

            {/* Custom Snackbar */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2500}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{
                boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
                mt: 1,
                zIndex: 100,
              }}
            >
              <Alert
                onClose={handleSnackbarClose}
                sx={{
                  width: '100%',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: (theme1) => theme1.palette.background.paper,
                  color: (theme2) => theme2.palette.text.primary,
                }}
              >
                You have successfully re-executed the &#39;Skipped &amp; Failed Steps&#39;.{' '}
              </Alert>
            </Snackbar>

            <CustomPopover
              open={popover.open}
              anchorEl={popover.anchorEl}
              onClose={popover.onClose}
              slotProps={{ arrow: { placement: 'top' } }}
            >
              <MenuList>
                {[
                  {
                    value: 'draft',
                    label: 'Entire Workflow',
                    icon: 'mdi:workflow',
                  },
                  {
                    value: 'published',
                    label: 'Failed & Skipped Steps',
                    icon: 'eos-icons:action-chains',
                  },
                ].map((option) => (
                  <Tooltip
                    key={option.value}
                    title={
                      option.label === 'Entire Workflow'
                        ? 'Click here to re-execute the entire workflow from the beginning.'
                        : option.label === 'Failed & Skipped Steps'
                          ? 'Click here to re-execute only the failed or skipped steps of the workflow.'
                          : ''
                    }
                    arrow
                    placement="right"
                  >
                    <MenuItem
                      selected={option.value === publish}
                      onClick={() => {
                        popover.onClose();
                        onChangePublish(option.value);
                        if (option.value === 'draft') {
                          handleOpenWorkflowDialog();
                        }
                      }}
                    >
                      {option.icon && (
                        <Iconify
                          icon={option.icon}
                          width={20}
                          height={20}
                          sx={{ mr: 0, color: 'inherit' }}
                        />
                      )}
                      {option.label}
                    </MenuItem>
                  </Tooltip>
                ))}
              </MenuList>
            </CustomPopover>

            <Tooltip title="Click here to view auto re-execution settings." arrow placement="top">
              <Button
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                }}
                startIcon={
                  <Iconify
                    icon="streamline:arrow-reload-horizontal-1-solid"
                    style={{ width: 18, height: 18 }}
                  />
                }
                size="large"
                variant="outlined"
                color="primary"
              >
                Auto Re-execution Settings
              </Button>
            </Tooltip>
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
          <Alert sx={{ mb: 4 }} severity="error">
            <AlertTitle>Re-Execution!</AlertTitle>
            The auto re-execution of the failed step is scheduled to be done at Aug 22, 2024
            08:23:31. Click here to view previous re-executions
          </Alert>
          <TriggerActionFlow />
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={() => onClose()} />}
      <ReexecuteWorkflowDialog
        open={workflowDialogOpen}
        onClose={handleCloseWorkflowDialog}
        title="Re-execute Workflow"
      />
    </>
  );
};

export { ConfigurationDrawer2 };
