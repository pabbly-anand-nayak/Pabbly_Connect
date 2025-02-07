import { toast } from 'sonner';
import React, { useState } from 'react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  TableRow,
  Checkbox,
  MenuList,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmDelete = () => {
    setConfirmDelete(true);
    handleClosePopover();
  };

  // Custom tooltips for specific rows
  const getWorkflowTooltip = (rowData) => {
    if (rowData.id === 'workflow-0') {
      return 'Folder Name: Client (A)';
    }
    if (rowData.id === 'workflow-5') {
      return 'Folder Name: Main Folder';
    }

    return `Workflow Name: ${rowData.workflows_folders_you_shared}`;
  };

  const getSharedOnTooltip = (rowData) => {
    if (rowData.id === 'workflow-0') {
      return `Folder Shared On: ${rowData.updatedAt} (UTC+05:30) Asia/Kolkata`;
    }
    if (rowData.id === 'workflow-4') {
      return `Folder Shared On: ${rowData.updatedAt} (UTC+05:30) Asia/Kolkata`;
    }
    return `Workflow Shared On: ${rowData.updatedAt} (UTC+05:30) Asia/Kolkata`;
  };

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleDeleteRow = () => {
    setConfirmDelete(false);
    //  Delete Success Snackbar
    toast.success('Access Removed Successfully!');
  };

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <TableRow
        hover
        selected={selected}
        sx={{
          '&:hover .copy-button': {
            opacity: 1,
          },
        }}
      >
        {/* checkbox */}
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Tooltip title="Select Row" arrow placement="top">
            <Checkbox
              checked={selected}
              onClick={onSelectRow}
              inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
            />
          </Tooltip>
        </TableCell>

        {/* Serial Number */}
        <TableCell width={88}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box component="span">
              <Typography sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                  <span>{serialNumber}</span>
                </Tooltip>
              </Typography>
            </Box>
          </Stack>
        </TableCell>

        {/* Team Member Email */}
        <TableCell width={250}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 250,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  position: 'relative',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ display: 'auto' }}>
                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex' }}>
                      <Typography
                        sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                      >
                        <Tooltip title={`Email: ${row.email}`} placement="top" arrow>
                          <span>{row.email}</span>
                        </Tooltip>
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Workflows and Folders You've Shared  */}
        <TableCell width={550}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Typography sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                <Tooltip title={getWorkflowTooltip(row)} placement="top" arrow>
                  <Box
                    component="span"
                    sx={{
                      // color: 'text.disabled',
                      maxWidth: {
                        xs: '400px', // For extra small screens
                        sm: '500px', // For small screens
                        md: '600px', // For medium screens
                        lg: '650px', // For large screens
                        xl: '750px', // For extra large screens
                      },
                      display: 'inline-block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span>{row.workflows_folders_you_shared}</span>
                  </Box>
                </Tooltip>
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        {/* Shared On */}
        <TableCell width={200} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Box sx={{ whiteSpace: 'nowrap' }} component="span">
              <Typography sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                <Tooltip title={getSharedOnTooltip(row)} placement="top" arrow>
                  <span>{row.createdAt}</span>
                </Tooltip>
              </Typography>
            </Box>
          </Stack>
        </TableCell>

        {/* Options */}
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Click to see options." arrow placement="top">
            <IconButton color={anchorEl ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Remove access to shared workflows or folders." arrow placement="left">
            <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Remove Access
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        disabled={isLoading}
        title="Do you wish to remove access?"
        content="You won't be able to revert this!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRow(); // revoking tasks
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Remove Access'}
          </Button>
        }
      />
    </>
  );
}
