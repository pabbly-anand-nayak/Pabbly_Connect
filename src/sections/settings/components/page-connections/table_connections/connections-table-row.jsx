import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Avatar,
  Button,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  MenuList,
  MenuItem,
  TableCell,
  IconButton,
  AvatarGroup,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { useSnackbar } from 'src/components/custom-snackbar/custom-snackbar';

import { ConfirmDialog } from '../custom-dialog';
import { ConnectionTableDrawer } from '../hook/workflows-connected-table-drawer';
import { UpdateAppDrawer } from '../hook/connection-update_details/connections-update-app-drawer';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const confirm = useBoolean();
  const theme = useTheme();

  const [openUpdateAppDrawer, setOpenUpdateAppDrawer] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const popover = usePopover();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({});

  const handleOpenDrawer = (event) => {
    event.stopPropagation();
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenUpdateAppDrawer = () => {
    setOpenUpdateAppDrawer(true);
    popover.onClose();
  };

  const handleCloseUpdateAppDrawer = () => {
    setOpenUpdateAppDrawer(false);
  };

  const handleRowClick = (event) => {
    event.stopPropagation();
    handleOpenDrawer(event);
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
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };

  // Root level  Snackbar ------------------
  const { openSnackbar } = useSnackbar();

  // const handleClick = () => {
  //   openSnackbar({
  //     message: 'Task successfully completed!',
  //     severity: 'error',
  //   });
  // };

  const handleClick = () => {
    if (row.status === 'revocable') {
      openSnackbar({
        message: '123This connection is currently being used in some workflow.',
        severity: 'error',
      });
    } else if (row.status === 'non-revocable') {
      openSnackbar({
        message: '123Connection deleted successfully!',
        severity: 'success',
      });
    } else {
      openSnackbar({
        message: '123Invalid user!',
        severity: 'error',
      });
    }
    handleCloseConfirmDelete();
  };

  // -----------------------------------------

  // const handleDeleteWithStatus = () => {
  //   if (row.status === 'revocable') {
  //     setSnackbarState({
  //       open: true,
  //       message: 'This connection is currently being used in some workflow.',
  //       severity: 'error',
  //     });
  //   } else if (row.status === 'non-revocable') {
  //     setSnackbarState({
  //       open: true,
  //       message: 'Connection deleted successfully!',
  //       severity: 'success',
  //     });
  //   } else {
  //     setSnackbarState({
  //       open: true,
  //       message: 'Invalid user!',
  //       severity: 'error',
  //     });
  //   }

  //   handleCloseConfirmDelete();
  // };

  return (
    <>
      <TableRow onClick={handleRowClick} hover selected={selected}>
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

        {/* CONNECTION STATUS/Date/Time */}
        <TableCell width={170}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              {row.status === 'revocable' && (
                <Tooltip title=" Connection is active and currently in use." arrow placement="top">
                  <Label
                    variant="soft"
                    color="success"
                    startIcon={<Iconify icon="heroicons:check-circle-16-solid" />}
                    onClick={handleOpenDrawer}
                    component="span"
                    sx={{ cursor: 'pointer' }}
                  >
                    In Use
                  </Label>
                </Tooltip>
              )}
              <ConnectionTableDrawer open={openDrawer} onClose={handleCloseDrawer} />

              {row.status === 'non-revocable' && (
                <Tooltip
                  title=" Connection is inactive and currently not in use."
                  arrow
                  placement="top"
                >
                  <Label
                    variant="soft"
                    color="error"
                    startIcon={<Iconify icon="ant-design:close-circle-filled" />}
                    onClick={handleOpenDrawer}
                    component="span"
                    sx={{ cursor: 'pointer' }}
                  >
                    Idle
                  </Label>
                </Tooltip>
              )}
              {row.status === 'scheduled' ? (
                <Tooltip title="Click here to view task details in brief." arrow placement="top">
                  <Label
                    variant="soft"
                    color="error"
                    startIcon={<Iconify icon="ant-design:close-circle-filled" />}
                  >
                    {row.status}
                  </Label>
                </Tooltip>
              ) : (
                row.status !== 'revocable' &&
                row.status !== 'non-revocable' && (
                  <Label variant="soft" color="default">
                    {row.status}
                  </Label>
                )
              )}
              <Tooltip
                title={`Execution Time: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
                placement="bottom"
                arrow
              >
                <Box
                  sx={{ width: 170, whiteSpace: 'nowrap', color: 'text.disabled' }}
                  component="span"
                >
                  {row.createdAt}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* CONNECTION & APPLICATION NAME */}
        <TableCell width={180}>
          <Stack spacing={2} direction="row" alignItems="center">
            {/* Avatar Group */}
            <Tooltip title={`${row.workflowName}`} placement="top" arrow>
              <AvatarGroup variant="rounded">
                {row.applications.map((app, index) => (
                  <Avatar
                    key={index}
                    alt={app.name}
                    src={app.icon}
                    sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
                  />
                ))}
              </AvatarGroup>
            </Tooltip>

            {/* Workflow Name and Folder */}
            <Stack
              sx={{
                // color: '#078dee',
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 520,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Tooltip title={`Connection Name: ${row.workflowName}`} placement="top" arrow>
                  {row.workflowName}
                </Tooltip>
              </Box>

              <Tooltip title={`Application Name: ${row.appname}`} placement="bottom" arrow>
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  {row.appname}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* NO. OF WORKFLOWS	 */}
        <TableCell width={180} align="right">
          <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            <Stack
              sx={{
                color: '#078dee',
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-end', // Aligns text to the right
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end', // Aligns the inner Box content to the right
                  alignItems: 'center',
                  // gap: 1,
                  mb: 0,
                }}
              >
                <Box
                  component="span"
                  onClick={handleOpenDrawer}
                  sx={{
                    width: 140, // adjust width as needed
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer',
                    textAlign: 'right', // Aligns text within the box to the right
                  }}
                >
                  <Tooltip
                    title="View workflows associated with the connection.
"
                    placement="top"
                    arrow
                  >
                    {row.connectionNumber}
                  </Tooltip>
                </Box>
                <ConnectionTableDrawer open={openDrawer} onClose={handleCloseDrawer} />
              </Box>
            </Stack>
          </Stack>
        </TableCell>

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
          <Tooltip title="Update connection." arrow placement="left">
            <MenuItem onClick={handleOpenUpdateAppDrawer} sx={{ color: 'secondary' }}>
              <Iconify icon="material-symbols:settings-b-roll-rounded" />
              Update
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />

          <Tooltip title="Delete connection." arrow placement="left">
            <MenuItem onClick={handleOpenConfirmDialog} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConnectionTableDrawer open={openDrawer} onClose={handleCloseDrawer} row={row} />

      <UpdateAppDrawer
        open={openUpdateAppDrawer}
        onClose={handleCloseUpdateAppDrawer}
        row={row} // Pass `row` or any other required data to UpdateAppDrawer
      />

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title={`Do you really want to delete ${row.workflowName} ?`}
        content="You won't be able to revert this action!"
        action={
          <Button variant="contained" color="error" onClick={handleClick}>
            Delete
          </Button>
        }
      />

      {/* Delete Success Snackbar */}
      {/* <Snackbar
        open={snackbarState.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 13,
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary, // Keeping text color consistent
            '& .MuiAlert-icon': {
              color:
                snackbarState.severity === 'error'
                  ? theme.palette.error.main
                  : theme.palette.success.main,
            },
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar> */}
    </>
  );
}
