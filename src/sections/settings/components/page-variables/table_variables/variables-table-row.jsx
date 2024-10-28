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
import { CustomPopover } from 'src/components/custom-popover';

import { ConfirmDialog } from '../custom-dialog';
import { ViewLogPopover } from '../hook/view_log_popover';
import { UpdateVariablesDialog } from '../hook/update-variables-dailog';

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
        {/* Checkbox */}
        <TableCell padding="checkbox">
          <Tooltip title="Select Row" arrow placement="top">
            <Checkbox
              checked={selected}
              onClick={onSelectRow}
              inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
            />
          </Tooltip>
        </TableCell>
        {/* serialNumber */}
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

        {/* Created On */}
        <TableCell width={200}>
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
                  width: 200,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Tooltip
                  title={`Variable Created: ${row.createdOn}, (UTC+05:30) Asia/Kolkata`}
                  placement="top"
                  arrow
                >
                  {row.createdOn}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Variable Name */}
        <TableCell width={300}>
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
                  width: 300,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  position: 'relative',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ display: 'auto' }}>
                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex' }}>
                      <Tooltip title={`Variable Name: ${row.variableName}`} placement="top" arrow>
                        {row.variableName}
                      </Tooltip>
                      <Tooltip
                        title="Click here to copy custom variable."
                        arrow
                        placement="top"
                        sx={{ fontSize: '16px' }}
                      >
                        <IconButton
                          className="copy-button"
                          color={popover.open ? 'inherit' : 'default'}
                          onClick={handleCopyClick}
                          sx={{
                            width: '20px',
                            height: '20px',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            right: 0,
                          }}
                        >
                          <Iconify
                            width={18}
                            icon="solar:copy-bold"
                            sx={{ color: 'text.secondary' }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Variable Data */}
        <TableCell width={400}>
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
                  width: 200,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Tooltip title={`Variable Data: ${row.variableData}`} placement="top" arrow>
                  {row.variableData}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell width={200} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Box sx={{ whiteSpace: 'nowrap' }} component="span">
              <Tooltip
                title={`Last Updated: ${row.updatedAt} (UTC+05:30) Asia/Kolkata`}
                placement="top"
                arrow
              >
                {row.createdAt}
              </Tooltip>
            </Box>
          </Stack>
        </TableCell>
        {/* Table options */}
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
          <Tooltip title="Updates the custom variable." arrow placement="left">
            <MenuItem onClick={handleOpenUpdateVariablesDialog} sx={{ color: 'secondary' }}>
              <Iconify icon="material-symbols:settings-b-roll-rounded" />
              Update
            </MenuItem>
          </Tooltip>
          <Tooltip title="Check the history of the edited variable." arrow placement="left">
            <MenuItem onClick={handleOpenViewLogPopoverDialog} sx={{ color: 'secondary' }}>
              <Iconify icon="material-symbols:data-info-alert-rounded" />
              View Log
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="This will delete the variable." arrow placement="left">
            <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you really want to delete this row?"
        content="You won't be able to revert this action!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirmDelete();
            }}
          >
            Delete
          </Button>
        }
      />

      <UpdateVariablesDialog
        open={dialogOpen}
        onClose={handleCloseUpdateVariablesDialog}
        title="Update Variables"
        content="Provide details for the variable"
        variableName={row.variableName}
        variableData={row.variableData}
      />

      <ViewLogPopover
        open={logPopoverOpen}
        onClose={handleCloseViewLogPopoverDialog}
        // title="Edit Log"
        variableName={row.variableName} // Pass the variable name here
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
