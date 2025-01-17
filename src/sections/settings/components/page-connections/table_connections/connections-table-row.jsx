import { toast } from 'sonner';
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
import { CustomDrawer } from 'src/components/custom-drawer/custom-drawer';

import { ConfirmDialog } from '../custom-dialog';
import WorkflowsConnectedTable from '../hook/table_connected/connected-table';
import { UpdateAppDrawer } from '../hook/connection-update_details/connections-update-app-drawer';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const confirm = useBoolean();
  const theme = useTheme();

  const [openUpdateAppDrawer, setOpenUpdateAppDrawer] = useState(false);
  const popover = usePopover();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({});


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

  const handleOpenConfirmDialog = (action) => {
    setConfirmDialogProps(action);
    setConfirmDelete(true);
    popover.onClose(); // Close the MenuList when opening confirm dialog
  };

  //   Snackbar State
  const handleConfirmDeleteClick = () => {
    if (row.status === 'revocable') {

      toast.error('This connection is currently being used in some workflow.');

    } else if (row.status === 'non-revocable') {

      toast.success('Connection deleted successfully!');

    } else {

      toast.error('Invalid user!');

    }
    handleCloseConfirmDelete();
  };

  // -----------------------------------------


  // -------Handler for Opening Drawer----------------
  const [openDrawer, setOpenDrawer] = useState(false);

  // Handler for opening the Log Drawer
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };


  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  // ---------------------------
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
                title={`Execution Time: ${row.createdOn}, (UTC+05:30) Asia/Kolkata`}
                placement="bottom"
                arrow
              >
                <Box
                  sx={{ width: 170, whiteSpace: 'nowrap', color: 'text.disabled' }}
                  component="span"
                >
                  {row.createdOn}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* CONNECTION & APPLICATION NAME */}
        <TableCell width={180}>
          <Stack spacing={2} direction="row" alignItems="center">
            {/* Avatar Group */}
            <Tooltip title={`${row.connectionName}`} placement="top" arrow>
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
                <Tooltip title={`Connection Name: ${row.connectionName}`} placement="top" arrow>
                  {row.connectionName}
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

        {/* NO. OF WORKFLOWS	(New Drawer) */}
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


      <CustomDrawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        icon={{ src: row.applications[0]?.icon || '' }} // Dynamic icon from the first application
        iconTitleTooltip={`${row.appname}`}
        headerTitle={`${row.connectionName}`}
        headerTitleTooltip="Connection Name"
        headerSubTitle={
          <>
            Created on - <strong>{row.createdOn}, (UTC+05:30) Asia/Kolkata</strong>
          </>
        }
        headerSubTitleTooltip=""
        customLogData={<WorkflowsConnectedTable />}
      />



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

      <UpdateAppDrawer
        open={openUpdateAppDrawer}
        onClose={handleCloseUpdateAppDrawer}
        row={row} // Pass `row` or any other required data to UpdateAppDrawer
      />

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title={`Do you really want to delete ${row.connectionName} ?`}
        content="You won't be able to revert this action!"
        action={
          <Button variant="contained" color="error" onClick={handleConfirmDeleteClick}>
            Delete
          </Button>
        }
      />


    </>
  );
}
