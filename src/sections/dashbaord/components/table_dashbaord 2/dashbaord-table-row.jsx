import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

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

import { MoveToFolderPopover } from '../table-options-components/move-to-folder-dailog';
import { RenameWorkflowDialog } from '../table-options-components/rename_workflow-dailog';
import { ShareWorkflowPopover } from '../table-options-components/share-workflow-popover';
import { EditLogDashbaordPopover } from '../table-options-components/edit-log-dashbaord-popover';
import { AutoReExecutionSettingsPopover } from '../table-options-components/auto-re-execution-popover';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const theme = useTheme();

  const confirmStatus = useBoolean();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Manage snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Manage snackbar severity

  const collapse = useBoolean();
  const popover = usePopover();

  const [anchorEl, setAnchorEl] = useState(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [autoreExecutionDialogOpen, setAutoReExecutionOpen] = useState(false); // State to control Auto Re-Execution popover

  const [moveToFolderPopoverOpen, setMoveToFolderPopoverOpen] = useState(false);

  const [sharePopoverOpen, setShareWorkflowPopoverOpen] = useState(false);
  const confirmDelete = useBoolean();
  const [showToken, setShowToken] = useState(false);
  const [statusToToggle, setStatusToToggle] = useState('');
  const [logPopoverOpen, setLogPopoverOpen] = useState(false);

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
  const handleCloseEditLogDashbaordPopoverDialog = () => {
    setLogPopoverOpen(false);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenEditLogDashbaordPopoverDialog = () => {
    setLogPopoverOpen(true);
    handleClosePopover();
  };

  const handleDeleteRows = () => {
    onDeleteRow();
    setSnackbarMessage('Workflow Deleted Successfully.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    confirmDelete.onFalse(); // Close the dialog after deleting
  };

  return (
    <>
      <TableRow hover selected={selected} sx={{ cursor: 'pointer' }}>
        {/* checkbox */}
        <TableCell padding="checkbox">
          <Tooltip title="Select Row" arrow placement="top">
            <Checkbox
              checked={selected}
              onClick={onSelectRow}
              inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
            />
          </Tooltip>
        </TableCell>

        {/* status */}
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
                  sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
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
                  +4
                </Avatar>
              </AvatarGroup>
            </Tooltip>
          </Stack>
        </TableCell>

        {/* workflow name */}
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
                    width: 400,
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

        {/* tasks consumed */}
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
          {/* Enable or disable the workflow status. */}
          {row.status === 'active' ? (
            <Tooltip title="Disable the workflow status." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('inactive');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
                Disable Workflow
              </MenuItem>
            </Tooltip>
          ) : (
            <Tooltip title="Enable the workflow status." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('active');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
                Enable Workflow
              </MenuItem>
            </Tooltip>
          )}

          {/* Edit Workflow */}
          <Tooltip title="Modify and update the workflow." arrow placement="left">
            <MenuItem
              component="a"
              href={paths.dashboard.workflow}
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
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

          {/* <Tooltip title="View the workflow's execution history." arrow placement="left">
            <MenuItem
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="mdi:clipboard-text-history" />
              Workflow History
            </MenuItem>
          </Tooltip> */}

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
              onClick={() => {
                confirmDelete.onTrue();
                popover.onClose();
              }}
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
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Do you really want to delete it ?"
        content="Workflow once deleted will be moved to trash folder."
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRows}>
            Delete
          </Button>
        }
      />
    </>
  );
}
