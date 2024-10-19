import React, { useState } from 'react';

import {
  Box,
  Stack,
  Avatar,
  Button,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  MenuItem,
  MenuList,
  TableCell,
  IconButton,
  AvatarGroup,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { SharePopover } from '../../hooks/share-popover';
import { MoveToFolderPopover } from '../../hooks/move-to-folder-popover';
import { RenameWorkflowDialog } from '../../hooks/rename_workflow-dailog';
import { AutoReExecutionDialog } from '../../hooks/auto-re-execution-popover';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const confirmStatus = useBoolean();

  const collapse = useBoolean();
  const popover = usePopover();

  const [anchorEl, setAnchorEl] = useState(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [autoreExecutionDialogOpen, setAutoReExecutionOpen] = useState(false);

  const [moveToFolderPopoverOpen, setMoveToFolderPopoverOpen] = useState(false);

  const [sharePopoverOpen, setSharePopoverOpen] = useState(false);
  const confirmDelete = useBoolean();
  const [showToken, setShowToken] = useState(false);
  const [statusToToggle, setStatusToToggle] = useState('');

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
  };

  const handleStatusToggle = (newStatus) => {
    setStatusToToggle(newStatus);
    confirmStatus.onTrue();
  };

  return (
    <>
      <TableRow hover selected={selected}>
        {/* checkbox */}
        <TableCell padding="checkbox">
          <Tooltip title="Select this workflow" arrow placement="top">
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
              <Tooltip title={`Workflow is ${row.status}`} placement="top" arrow>
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
              <Tooltip title={`Workflow Created: ${row.createdAt}`} placement="bottom" arrow>
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
        {/* <TableCell width={137}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Tooltip title="Integrated applications" placement="top" arrow>
              <AvatarGroup>
                <Avatar
                  alt="app1"
                  sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
                  src={row.icon1}
                />
                <Avatar
                  alt="app2"
                  sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
                  src={row.icon2}
                />
              </AvatarGroup>
            </Tooltip>
          </Stack>
        </TableCell> */}
        {/* Application icon */}
        <TableCell width={137}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Tooltip title="Integrated applications" placement="top" arrow>
              <AvatarGroup variant="rounded">
                {/* First avatar */}
                <Avatar
                  alt="app1"
                  sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
                  src={row.icon1}
                />

                {/* Second avatar */}
                <Avatar
                  alt="app2"
                  sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
                  src={row.icon2}
                />

                {/* The "+4" avatar */}
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
        <TableCell width={300}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Tooltip
                title="This indicates the total number of tasks consumed"
                placement="top"
                arrow
              >
                <Box sx={{ width: 185, whiteSpace: 'nowrap' }} component="span">
                  {row.totalQuantity} Tasks Consumed
                </Box>
              </Tooltip>
              <Tooltip
                title="This indicates the number of free tasks consumed."
                placement="bottom"
                arrow
              >
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  100 Free Tasks Consumed
                </Box>
              </Tooltip>
            </Stack>
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
          {row.status === 'active' ? (
            <Tooltip title="Click to set status to Inactive" arrow placement="left">
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
            <Tooltip title="Click to set status to Active" arrow placement="left">
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

          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit Workflow
          </MenuItem>

          <Tooltip title="Click here to rename the workflow" arrow placement="left">
            <MenuItem
              onClick={() => {
                setRenameDialogOpen(true);
                popover.onClose();
              }}
            >
              <Iconify icon="fluent:rename-16-filled" />
              Rename
            </MenuItem>
          </Tooltip>

          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="heroicons-solid:duplicate" />
            Clone
          </MenuItem>

          <MenuItem
            onClick={() => {
              setSharePopoverOpen(true);
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="jam:share-alt-f" />
            Share
          </MenuItem>

          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="fluent:people-team-add-24-filled" />
            Add Team Members
          </MenuItem>

          <MenuItem
            onClick={() => {
              setAutoReExecutionOpen(true);
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="fluent:folder-move-16-filled" />
            Move To Folder
          </MenuItem>

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

          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="material-symbols:data-info-alert-rounded" />
            Edit Log
          </MenuItem>

          <MenuItem
            onClick={() => {
              setAutoReExecutionOpen(true);
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="mdi:timer" />
            Auto Re-Execution Settings
          </MenuItem>

          <Divider style={{ borderStyle: 'dashed' }} />

          <Tooltip title="This will delete the workflow." arrow placement="left">
            <MenuItem
              onClick={() => {
                confirmDelete.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>
      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Do you really want to delete it?"
        content="Workflow once deleted will be moved to trash folder."
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
      <ConfirmDialog
        open={confirmStatus.value}
        onClose={confirmStatus.onFalse}
        title={statusToToggle.charAt(0).toUpperCase() + statusToToggle.slice(1)}
        content={`Are you sure you want to set this workflow as ${statusToToggle}?`}
        action={
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              handleStatusToggle(statusToToggle); // Toggle the status here
              confirmStatus.onFalse(); // Close the dialog
            }}
          >
            {statusToToggle.charAt(0).toUpperCase() + statusToToggle.slice(1)}
          </Button>
        }
      />
      <RenameWorkflowDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        // Add necessary props for the RenameWorkflowDialog component
      />
      <SharePopover open={sharePopoverOpen} onClose={() => setSharePopoverOpen(false)} />
      <AutoReExecutionDialog
        open={autoreExecutionDialogOpen}
        onClose={() => setAutoReExecutionOpen(false)}
      />
      <MoveToFolderPopover
        open={autoreExecutionDialogOpen}
        onClose={() => setAutoReExecutionOpen(false)}
        // Add necessary props for the SharePopover component
      />
    </>
  );
}
