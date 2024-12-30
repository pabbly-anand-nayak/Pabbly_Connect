import React, { useState } from 'react';

import {
  Box,
  Stack,
  Avatar,
  Button,
  Tooltip,
  TableRow,
  TableCell,
  AvatarGroup,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const confirmStatus = useBoolean();

  const popover = usePopover();

  const confirmDelete = useBoolean();
  const [statusToToggle, setStatusToToggle] = useState('');

  const handleStatusToggle = (newStatus) => {
    setStatusToToggle(newStatus);
    confirmStatus.onTrue();
  };

  return (
    <>
      <TableRow hover selected={selected}>
        {/* Connection & Application Name */}
        <TableCell width={200}>
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
              <Tooltip title={`Workflow Created: ${row.createdAt}.`} placement="bottom" arrow>
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

        {/* No. of Workflows */}
        <TableCell width={137}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Tooltip title="Integrated applications." placement="top" arrow>
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

        {/* Connection Status */}
        <TableCell width={300}>
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
              <Tooltip title={`Workflow Name: ${row.workflowName}.`} placement="top" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 300,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.workflowName}
                </Box>
              </Tooltip>
              <Tooltip title="Folder Name: Home." placement="bottom" arrow>
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
                title="This indicates the total number of tasks consumed."
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
      </TableRow>

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
    </>
  );
}
