import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom'; // Changed to react-router-dom

import {
  Box,
  Stack,
  Alert,
  Avatar,
  Button,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  MenuItem,
  MenuList,
  Snackbar,
  TableCell,
  IconButton,
  AvatarGroup,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { MoveToFolderPopover } from '../options-components/move-to-folder-dailog';
import { RenameWorkflowDialog } from '../options-components/rename_workflow-dailog';
import { ShareWorkflowPopover } from '../options-components/share-workflow-popover';
import { EditLogDashbaordPopover } from '../options-components/edit-log-dashbaord-popover';
import { AutoReExecutionSettingsPopover } from '../options-components/auto-re-execution-popover';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const navigate = useNavigate(); // Use react-router-dom's useNavigate hook
  const confirm = useBoolean();
  const theme = useTheme();
  const confirmStatus = useBoolean();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const collapse = useBoolean();
  const popover = usePopover();

  const [anchorEl, setAnchorEl] = useState(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [autoreExecutionDialogOpen, setAutoReExecutionOpen] = useState(false);
  const [moveToFolderPopoverOpen, setMoveToFolderPopoverOpen] = useState(false);
  const [sharePopoverOpen, setShareWorkflowPopoverOpen] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [statusToToggle, setStatusToToggle] = useState('');
  const [logPopoverOpen, setLogPopoverOpen] = useState(false);
  const handleCloseEditLogDashbaordPopoverDialog = () => {
    setLogPopoverOpen(false);
  };

  const handleRowClick = () => {
    navigate(paths.dashboard.workflow); // Using react-router-dom for navigation
  };

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
      setSnackbarMessage('Your workflow has been successfully enabled.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
      confirmStatus.onTrue();

      if (newStatus === 'inactive') {
        setSnackbarMessage('Your workflow has been successfully disabled.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        confirmStatus.onTrue();
      }
    }
  };

  // Define handleOpenEditLogDashbaordPopoverDialog function
  const handleOpenEditLogDashbaordPopoverDialog = () => {
    setLogPopoverOpen(true);
    handlePopoverClose();
  };

  const handleDeleteRows = () => {
    onDeleteRow();
    setSnackbarMessage('Workflow Deleted Successfully.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    confirmDelete.onFalse();
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
      <TableRow hover selected={selected} sx={{ cursor: 'pointer' }} onClick={handleRowClick}>
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

        {/* Status */}
        <TableCell width={288}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Tooltip title={`Workflow is ${row.status}.`} placement="top" arrow>
                <Label
                  variant="soft"
                  color={
                    (row.status === 'active' && 'success') ||
                    (row.status === 'inactive' && 'error') ||
                    'default'
                  }
                >
                  {row.status}
                </Label>
              </Tooltip>
              <Tooltip
                title={`Workflow Created: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
                placement="bottom"
                arrow
              >
                <Box
                  sx={{ width: 145, whiteSpace: 'nowrap', color: 'text.disabled' }}
                  component="span"
                >
                  {row.createdAt}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Application icon */}
        <TableCell width={137}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Tooltip title="Integrated applications" placement="top" arrow>
              <AvatarGroup variant="rounded">
                <Avatar
                  alt="app1"
                  sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
                  src={row.icon1}
                />
                <Avatar
                  alt="app2"
                  sx={{
                    padding: 1,
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#EDEFF2',
                    // bgcolor: 'background.neutral',
                  }}
                  src={row.icon2}
                />
                <Avatar
                  alt="+4"
                  sx={{
                    padding: 1,
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#EDEFF2',
                    color: '#078dee',
                    fontWeight: '900',
                  }}
                >
                  {row.appNumbers}
                </Avatar>
              </AvatarGroup>
            </Tooltip>
          </Stack>
        </TableCell>

        {/* Workflow name */}
        <TableCell width={480}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                color: '#078dee',
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
            >
              <Tooltip title={`Workflow Name: ${row.workflowName}`} placement="top" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 351,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.workflowName}
                </Box>
              </Tooltip>
              <Tooltip title="Folder Name: Home" placement="bottom" arrow>
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  Home
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Tasks consumed */}
        <TableCell width={300}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Tooltip title="Number of tasks consumed in the last 30 days." placement="top" arrow>
                <Box sx={{ width: 185, whiteSpace: 'nowrap' }} component="span">
                  {row.totalQuantity} Tasks Consumed
                </Box>
              </Tooltip>
              <Tooltip title="You're saving 50% on task usage." placement="bottom" arrow>
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  100 Free Tasks Consumed
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Options */}
        <TableCell
          align="right"
          sx={{ px: 1, whiteSpace: 'nowrap' }}
          onClick={(e) => e.stopPropagation()}
        >
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
          {/* Enable or disable the workflow status. */}
          {row.status === 'active' ? (
            <Tooltip title="Inactive the workflow status." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('inactive');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
                Inactive Workflow
              </MenuItem>
            </Tooltip>
          ) : (
            <Tooltip title="Active the workflow status." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('active');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
                Active Workflow
              </MenuItem>
            </Tooltip>
          )}

          {/* Edit Workflow */}
          <Tooltip title="Modify and update the workflow." arrow placement="left">
            <MenuItem
              component="a"
              // href={paths.dashboard.workflow}
              // onClick={() => {
              //   confirm.onTrue();
              //   popover.onClose();
              // }}
              onClick={handleRowClick}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="solar:pen-bold" />
              Edit Workflow
            </MenuItem>
          </Tooltip>

          {/* Rename */}
          <Tooltip title="Change the workflow's name." arrow placement="left">
            <MenuItem
              onClick={() => {
                setRenameDialogOpen(true); // Open rename dialog
                popover.onClose();
              }}
            >
              <Iconify icon="fluent:rename-16-filled" />
              Rename
            </MenuItem>
          </Tooltip>

          {/* Clone */}
          <Tooltip title="Create a duplicate of the workflow." arrow placement="left">
            <MenuItem
              onClick={() => {
                // Set snackbar message and severity for cloning success
                setSnackbarMessage('Workflow Clone Successfully.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="heroicons-solid:duplicate" />
              Clone
            </MenuItem>
          </Tooltip>

          {/* Share */}
          <Tooltip title="Share the workflow with others via a link." arrow placement="left">
            <MenuItem
              onClick={() => {
                setShareWorkflowPopoverOpen(true);
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="jam:share-alt-f" />
              Share
            </MenuItem>
          </Tooltip>

          {/* Add Team Members */}
          <Tooltip title="Add team members for collaborative editing." arrow placement="left">
            <MenuItem
              component="a"
              href={paths.dashboard.setting.root}
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="fluent:people-team-add-24-filled" />
              Add Team Members
            </MenuItem>
          </Tooltip>

          {/* Move To Folder */}
          <Tooltip title="Move the workflow to an existing folder." arrow placement="left">
            <MenuItem
              onClick={() => {
                setMoveToFolderPopoverOpen(true); // Open the Auto Re-Execution dialog
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="fluent:folder-move-16-filled" />
              Move To Folder
            </MenuItem>
          </Tooltip>

          {/* Workflow History */}
          <Tooltip title="View the workflow's execution history." arrow placement="left">
            <MenuItem
              component="a"
              href={paths.dashboard.history.root}
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="mdi:clipboard-text-history" />
              Workflow History
            </MenuItem>
          </Tooltip>

          {/* Edit Log */}
          <Tooltip title="View the workflow edit logs." arrow placement="left">
            <MenuItem onClick={handleOpenEditLogDashbaordPopoverDialog} sx={{ color: 'secondary' }}>
              <Iconify icon="material-symbols:data-info-alert-rounded" />
              Edit Log
            </MenuItem>
          </Tooltip>

          {/* Auto Re-Execution Settings */}
          <Tooltip title="Adjust settings for automatic re-execution." arrow placement="left">
            <MenuItem
              onClick={() => {
                setAutoReExecutionOpen(true); // Open the Auto Re-Execution dialog
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="mdi:timer" />
              Auto Re-Execution Settings
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />

          {/* Delete Workflow */}
          <Tooltip title="Delete the workflow and move it to the trash." arrow placement="left">
            <MenuItem
              onClick={() =>
                handleOpenConfirmDialog({
                  onConfirm: () => handleDelete(),
                })
              }
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete Workflow
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <EditLogDashbaordPopover
        open={logPopoverOpen}
        onClose={handleCloseEditLogDashbaordPopoverDialog}
      />

      {/* Rename Workflow Dialog */}
      <RenameWorkflowDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        workflowName={row.workflowName} // Pass workflow name as a prop
      />
      <ShareWorkflowPopover
        open={sharePopoverOpen}
        onClose={() => setShareWorkflowPopoverOpen(false)}
      />

      {/* Auto Re-Execution Popover */}
      <AutoReExecutionSettingsPopover
        open={autoreExecutionDialogOpen}
        onClose={() => setAutoReExecutionOpen(false)}
      />

      <MoveToFolderPopover
        open={moveToFolderPopoverOpen}
        onClose={() => setMoveToFolderPopoverOpen(false)}
      />

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you really want to delete it ?"
        content="Workflow once deleted will be moved to trash folder."
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
          mt: 7,
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
          Successfully deleted the workflow.
        </Alert>
      </Snackbar>
    </>
  );
}
