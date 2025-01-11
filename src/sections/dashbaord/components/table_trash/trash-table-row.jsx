import { toast } from 'sonner';
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

import { MoveToFolderPopover } from '../options-components/move-to-folder-dailog';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow }) {

  const popover = usePopover();

  const [moveToFolderPopoverOpen, setMoveToFolderPopoverOpen] = useState(false);

  const confirmDelete = useBoolean();

  const handleDeleteRows = () => {
    onDeleteRow();
    confirmDelete.onFalse(); // Close the dialog after deleting
    toast.success('Workflow permanently deleted successfully!');

  };

  return (
    <>
      <TableRow hover
        onClick={onSelectRow}
        selected={selected}
        sx={{ cursor: 'pointer' }}>

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
                    (row.status === 'inactive' && 'error') ||
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
                  {row.appNumbers}
                </Avatar>
              </AvatarGroup>
            </Tooltip>
          </Stack>
        </TableCell>

        {/* workflow name */}
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              {['workflowName', 'folderName'].map((key, index) => (
                <Tooltip
                  key={key}
                  title={`${key === 'workflowName' ? 'Workflow Name' : 'Folder Name'}: ${row[key]}`}
                  placement={key === 'workflowName' ? 'top' : 'bottom'}
                  arrow
                >
                  <Box
                    component="span"
                    sx={{
                      color: key === 'workflowName' ? '#078dee' : 'text.disabled',
                      maxWidth: {
                        xs: '270px', // Extra small screens
                        sm: '270px', // Small screens
                        md: '270px', // Medium screens
                        lg: '350px', // Large screens
                        xl: '400px', // Extra large screens
                      },
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'inline-block',
                    }}
                  >
                    <span>{row[key]}</span>
                  </Box>
                </Tooltip>
              ))}
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
                  {row.freeTasksConsumed} Free Tasks Consumed
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Options */}
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
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

          <Divider style={{ borderStyle: 'dashed' }} />

          {/* Delete Workflow */}
          <Tooltip title="Delete the workflow permanently." arrow placement="left">
            <MenuItem
              onClick={() => {
                confirmDelete.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete Permanently
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <MoveToFolderPopover
        open={moveToFolderPopoverOpen}
        onClose={() => setMoveToFolderPopoverOpen(false)}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Do you really want to delete it ?"
        content="Workflow(s) once deleted cannot be restored in any case."
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRows}>
            Delete Permanently
          </Button>
        }
      />
    </>
  );
}
