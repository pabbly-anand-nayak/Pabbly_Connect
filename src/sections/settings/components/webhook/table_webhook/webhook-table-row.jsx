import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Alert,
  Button,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  MenuList,
  MenuItem,
  Snackbar,
  TableCell,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { UpdateWebhookDialog } from '../hook/update-webhook';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const confirm = useBoolean();
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Manage snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Manage snackbar severity
  const [selectedRow, setSelectedRow] = useState(null);
  const dialog = useBoolean(); // Manages the dialog open/close state
  const confirmStatus = useBoolean();
  const [statusToToggle, setStatusToToggle] = useState('');

  const popover = usePopover();

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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Modified delete handler
  const handleDelete = async () => {
    try {
      await onDeleteRow(); // Assuming onDeleteRow might be async
      confirmDelete.onFalse();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Delete failed:', error);
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

  return (
    <>
      <TableRow hover selected={selected}>
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

        {/* Status */}
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
              <Tooltip title={`Webhook Name : ${row.webhook_name}.`} placement="top" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 250,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.webhook_name}
                </Box>
              </Tooltip>

              {/* Webhook Event */}
              <Tooltip title={`Webhook Event : ${row.webhook_event}.`} placement="bottom" arrow>
                <Box
                  sx={{ width: 250, whiteSpace: 'nowrap', color: 'text.disabled' }}
                  component="span"
                >
                  {row.webhook_event}
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
                <Tooltip title={`Webhook URL : ${row.webhook_url}`} placement="top" arrow>
                  {row.webhook_url}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Button Test Webhook */}
        <TableCell width={300} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Tooltip
              title=" Click here to send a sample webhook data."
              arrow
              placement="top"
              disableInteractive
            >
              <Button variant="outlined" color="primary">
                Test Webhook
              </Button>
            </Tooltip>
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
                setSelectedRow(row); // Pass the selected row data
                dialog.onTrue(); // Open the dialog
                popover.onClose();
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
              setSuccessSnackbarOpen(true); // Show success snackbar
            }}
          >
            Delete
          </Button>
        }
      />

      {/* Delete Success Snackbar */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={2500}
        onClose={handleSuccessSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 13,
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleSuccessSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Successfully deleted the webhook.
        </Alert>
      </Snackbar>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 13,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity} // Dynamically set the severity
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {snackbarMessage} {/* Dynamically set the snackbar message */}
        </Alert>
      </Snackbar>

      {/* Update Webhook Dialog with selected row data */}
      {selectedRow && (
        <UpdateWebhookDialog
          open={dialog.value}
          onClose={dialog.onFalse}
          title="Update Webhook"
          content="Edit the webhook details here"
          action="Update Webhook"
          initialData={selectedRow} // Pass the row data
        />
      )}
    </>
  );
}
