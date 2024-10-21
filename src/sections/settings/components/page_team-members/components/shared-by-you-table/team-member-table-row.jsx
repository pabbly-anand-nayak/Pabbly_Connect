import React, { useState } from 'react';

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
  useTheme,
  TableCell,
  IconButton,
} from '@mui/material';

import { popover } from 'src/theme/core/components/popover';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [logPopoverOpen, setLogPopoverOpen] = useState(false);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenUpdateVariablesDialog = () => {
    setDialogOpen(true);
    handleClosePopover();
  };

  const handleCloseUpdateVariablesDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenConfirmDelete = () => {
    setConfirmDelete(true);
    handleClosePopover();
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleOpenViewLogPopoverDialog = () => {
    setLogPopoverOpen(true);
    handleClosePopover();
  };

  const handleCloseViewLogPopoverDialog = () => {
    setLogPopoverOpen(false);
  };

  const handleCopyClick = () => {
    setSnackbarMessage('Custom variable Copied Successfully!');
    setSnackbarOpen(true);
    popover.onOpen();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
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
        <TableCell padding="checkbox">
          <Tooltip title="Select this row" arrow placement="top">
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

        {/* Team Member Email */}
        <TableCell width={250}>
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
                      <Tooltip title={`Email: ${row.email}`} placement="top" arrow>
                        {row.email}
                      </Tooltip>
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
                <Tooltip title={getWorkflowTooltip(row)} placement="top" arrow>
                  {row.workflows_folders_you_shared}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Shared On */}
        <TableCell width={200} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Box sx={{ whiteSpace: 'nowrap' }} component="span">
              <Tooltip title={getSharedOnTooltip(row)} placement="top" arrow>
                {row.createdAt}
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
          <Tooltip title="This will Remove the Access." arrow placement="left">
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
              onDeleteRow();
              handleCloseConfirmDelete();
            }}
          >
            Remove Access
          </Button>
        }
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)', mt: 13 }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
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
    </>
  );
}