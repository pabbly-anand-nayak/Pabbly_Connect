import React, { useState } from 'react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  MenuList,
  MenuItem,
  useTheme,
  TableCell,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const theme = useTheme();
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
      return `Folder Name: Client (A), Workflow Name: ${rowData.workflows_folders_you_shared}`;
    }
    if (rowData.id === 'workflow-4') {
      return `Folder Name: Main Folder', Workflow Name: ${rowData.workflows_folders_you_shared}`;
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

  /* Delete Success Snackbar */

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessSnackbarOpen(false);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
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
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box component="span">
                <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                  {serialNumber}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Email & Workflows or Folders Shared By  */}
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                // color: '#078dee',
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Box
                component="span"
                sx={{
                  maxWidth: { xs: '530px', md: '800px' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Tooltip title={`Email: ${row.email}`} placement="top" arrow>
                  {row.email}
                </Tooltip>
              </Box>
              <Box
                component="span"
                sx={{
                  color: 'text.disabled',
                  maxWidth: { xs: '530px', md: '800px' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',

                  alignItems: 'flex-start',
                }}
              >
                <Tooltip title={getWorkflowTooltip(row)} placement="bottom" arrow>
                  {row.workflows_folders_you_shared}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Shared On */}
        <TableCell width={240} align="right">
          <Stack width={200} spacing={1} direction="column" alignItems="flex-end">
            <Box
              // width={180}
              sx={{
                maxWidth: { xs: '110px', md: '110px', lg: '110px' },
              }}
            >
              <Tooltip
                title="Click here to access workflow(s) or folder(s) shared with you."
                arrow
                placement="top"
                disableInteractive
              >
                <Button
                  // onClick={}
                  variant="outlined"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Access Now'}
                </Button>
              </Tooltip>
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

      <CustomPopover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClosePopover}>
        <MenuList>
          <Divider style={{ borderStyle: 'dashed' }} />
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
        title="Do you wish to remove access?"
        content="You won't be able to revert this!"
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
            Remove Access
          </Button>
        }
      />

      {/* Delete Success Snackbar */}
      <CustomSnackbar
        open={successSnackbarOpen}
        onClose={handleSuccessSnackbarClose}
        message="Access Removed Successfully!"
        severity="success"
      />
    </>
  );
}
