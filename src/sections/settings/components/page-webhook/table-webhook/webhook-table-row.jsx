import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom'; // Changed to react-router-dom

import {
  Box,
  Stack,
  Button,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  MenuItem,
  MenuList,
  TableCell,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

import { WebhookDialog } from '../hook/add-update-webhook-dialog';

export function OrderTableRow({ serialNumber, row, selected, onSelectRow, onDeleteRow }) {
  const navigate = useNavigate(); // Use react-router-dom's useNavigate hook
  const confirm = useBoolean();
  const theme = useTheme();
  const confirmStatus = useBoolean();
  const dialog = useBoolean(); // Manages the dialog open/close state

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const collapse = useBoolean();
  const popover = usePopover();

  const [anchorEl, setAnchorEl] = useState(null);

  const [showToken, setShowToken] = useState(false);
  const [statusToToggle, setStatusToToggle] = useState('');
  const [logPopoverOpen, setLogPopoverOpen] = useState(false);
  // const handleCloseEditLogDashbaordPopoverDialog = () => {
  //   setLogPopoverOpen(false);
  // };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleStatusToggle = (newStatus) => {
    setStatusToToggle(newStatus);

    if (newStatus === 'active') {
      // Display a failure snackbar message for a failed activation
      setSnackbarMessage('Webhook has been active successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else if (newStatus === 'inactive') {
      // Display a success snackbar message for deactivation
      setSnackbarMessage('Webhook has been inactive successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      confirmStatus.onTrue();
    }
  };

  // Modified delete handler
  const handleDelete = async () => {
    setIsLoading(true); // Start loading when delete begins
    try {
      await onDeleteRow(); // Assuming onDeleteRow might be async
      setSnackbarMessage('Successfully deleted the webhook.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to delete webhook');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Delete failed:', error);
    } finally {
      setIsLoading(false); // Stop loading regardless of success/failure
      handleCloseConfirmDelete(); // Close the dialog
    }
  };

  /* Delete Success Snackbar */
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({});

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessSnackbarOpen(false);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);

    // Simply set the loading state to false after a delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDelete(false);
    setConfirmDialogProps({});
  };

  const handleOpenConfirmDialog = (action) => {
    setConfirmDialogProps(action);
    setConfirmDelete(true);
    popover.onClose(); // Close the MenuList when opening confirm dialog
  };

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  const handleTestWebhook = async () => {
    setIsLoading(true);
    try {
      // Perform your save/test webhook logic here
      // For example:
      // await testWebhook(row.id);

      // Show success snackbar
      setSnackbarMessage('Sample webhook data has been sent successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      // Show error snackbar
      setSnackbarMessage('Webhook test failed.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Webhook test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dialog Handlers
  const [webhookDialogOpen, setWebhookDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <>
      <TableRow hover selected={selected} sx={{ cursor: 'pointer' }}>
        {/* Checkbox */}
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Tooltip title="Select Row" arrow placement="top">
            <Checkbox
              checked={selected}
              onClick={onSelectRow}
              inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
            />
          </Tooltip>
        </TableCell>

        {/* S.No */}
        <TableCell width={88}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span">
                <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                  {serialNumber}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Status, Webhook Name & Event  */}
        <TableCell width={250}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              {/* Webhook Active & Inactive */}
              <Tooltip title={`Webhook is ${row.status}.`} placement="top" arrow>
                <Label
                  variant="soft"
                  color={
                    (row.status === 'active' && 'success') ||
                    (row.status === 'inactive' && 'error') ||
                    'default'
                  }
                  sx={{ mb: 0.5 }}
                >
                  {row.status}
                </Label>
              </Tooltip>

              {/* Webhook Name */}
              <Tooltip title={`Webhook Name : ${row.workflowName}.`} placement="top" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 250,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.workflowName}
                </Box>
              </Tooltip>

              {/* Webhook Event */}
              <Tooltip title={`Webhook Event : ${row.webhookEvent}.`} placement="bottom" arrow>
                <Box
                  sx={{ width: 250, whiteSpace: 'nowrap', color: 'text.disabled' }}
                  component="span"
                >
                  {row.webhookEvent}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Webhook URL */}
        <TableCell width={550}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 550,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Tooltip title={`Webhook URL : ${row.webhookUrl}`} placement="top" arrow>
                  {row.webhookUrl}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Button Test Webhook */}
        <TableCell width={300} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Box width={150}>
              <Tooltip
                title=" Click here to send a sample webhook data."
                arrow
                placement="top"
                disableInteractive
              >
                <Button
                  onClick={handleTestWebhook}
                  variant="outlined"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Test Webhook'}
                </Button>
              </Tooltip>
            </Box>
          </Stack>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Click to see options." arrow placement="top">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {/* TableRow MenuItem */}
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Update webhook URL and events." arrow placement="left">
            <MenuItem
              onClick={() => {
                setSelectedRow(row); // Set the selected row data
                setWebhookDialogOpen(true); // Open the dialog
                popover.onClose(); // Close the popover
              }}
            >
              <Iconify icon="solar:pen-bold" />
              Update
            </MenuItem>
          </Tooltip>

          {row.status === 'active' ? (
            <Tooltip title="Inactive the webhook status." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('inactive');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
                Mark as Inactive
              </MenuItem>
            </Tooltip>
          ) : (
            <Tooltip title="Active the webhook status." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('active');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
                Mark as Active
              </MenuItem>
            </Tooltip>
          )}

          <Divider sx={{ borderStyle: 'dashed' }} />
          <Tooltip title="Delete webhook." arrow placement="left">
            <MenuItem
              onClick={() =>
                handleOpenConfirmDialog({
                  onConfirm: () => handleDelete(),
                })
              }
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      {/* Confirm Dialog */}

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you really want to delete the webhook?"
        content="You won't be able to revert this action!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // Add your revoke tasks logic here
              handleCloseConfirmDelete(); // Close the dialog after revoking tasks
              setSnackbarMessage('Successfully deleted the webhook.');
              setSnackbarSeverity('success');
              setSnackbarOpen(true);
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        }
      />

      {/* Snackbar for displaying messages */}
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />

      {/* Update Webhook Dialog with selected row data */}
      {selectedRow && (
        <WebhookDialog
          open={webhookDialogOpen}
          onClose={() => {
            setWebhookDialogOpen(false);
            setSelectedRow(null);
          }}
          mode="update"
          initialData={selectedRow}
        />
      )}
    </>
  );
}
