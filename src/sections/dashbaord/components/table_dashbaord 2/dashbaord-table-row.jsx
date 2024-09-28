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
import { CustomPopover } from 'src/components/custom-popover';

import { SharePopover } from '../../hooks/share-popover';
import { RenameWorkflowDialog } from '../../hooks/rename_workflow-dailog';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const collapse = useBoolean();
  const [anchorEl, setAnchorEl] = useState(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [sharePopoverOpen, setSharePopoverOpen] = useState(false);
  const confirmDelete = useBoolean();
  const [showToken, setShowToken] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleToggleToken = () => {
    setShowToken(!showToken);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Tooltip title="Select this workflow" arrow placement="top">
            <Checkbox
              checked={selected}
              onClick={onSelectRow}
              inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
            />
          </Tooltip>
        </TableCell>

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

        <TableCell width={137}>
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
        </TableCell>

        <TableCell width={500}>
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
                    width: 450,
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
          <IconButton onClick={handlePopoverOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              // Enable workflow logic here
              handlePopoverClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="bi:toggle-on" />
            Enable Workflow
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Disable workflow logic here
              handlePopoverClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="bi:toggle-off" />
            Disable Workflow
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Edit workflow logic here
              handlePopoverClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit Workflow
          </MenuItem>
          <Tooltip title="Click here to rename the workflow" arrow placement="right">
            <MenuItem
              onClick={() => {
                setRenameDialogOpen(true);
                handlePopoverClose();
              }}
            >
              <Iconify icon="fluent:rename-16-filled" />
              Rename
            </MenuItem>
          </Tooltip>
          <MenuItem
            onClick={() => {
              // Clone workflow logic here
              handlePopoverClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="heroicons-solid:duplicate" />
            Clone
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSharePopoverOpen(true);
              handlePopoverClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="jam:share-alt-f" />
            Share
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Add team members logic here
              handlePopoverClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="fluent:people-team-add-24-filled" />
            Add Team Members
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Move to folder logic here
              handlePopoverClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="fluent:folder-move-16-filled" />
            Move To Folder
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Workflow history logic here
              handlePopoverClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="mdi:clipboard-text-history" />
            Workflow History
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Edit log logic here
              handlePopoverClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="material-symbols:data-info-alert-rounded" />
            Edit Log
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Auto re-execution settings logic here
              handlePopoverClose();
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
                handlePopoverClose();
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

      <RenameWorkflowDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        // Add necessary props for the RenameWorkflowDialog component
      />
      <SharePopover
        open={sharePopoverOpen}
        onClose={() => setSharePopoverOpen(false)}
        // Add necessary props for the SharePopover component
      />
    </>
  );
}
