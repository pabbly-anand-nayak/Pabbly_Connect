import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

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
  TableCell,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { ConfirmDialog } from '../custom-dialog';
import { UpdateSubaccountDialog } from '../hook/update-subaccount';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const confirmDelete = useBoolean();
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const popover = usePopover();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null); // State for selected row data

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to open the UpdateSubaccountDialog and pass selected row data
  const handleOpenUpdateSubaccountDialog = () => {
    setSelectedRowData(row); // Pass row data
    setOpenUpdateDialog(true);
  };

  // Function to close the UpdateSubaccountDialog
  const handleCloseUpdateSubaccountDialog = () => {
    setOpenUpdateDialog(false);
  };

  return (
    <>
      <TableRow hover selected={selected}>
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

        {/* S.No */}
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

        {/* Date */}
        <TableCell width={288}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box sx={{ width: 145, whiteSpace: 'nowrap' }} component="span">
                <Tooltip
                  title={`Assigned On: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
                  placement="top"
                  arrow
                >
                  {row.createdAt}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Email */}
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
                  width: 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Tooltip title={`Assigned to ${row.workflowName}`} placement="top" arrow>
                  {row.workflowName}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Status */}
        <TableCell width={288}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Tooltip title={`Task type ${row.status}`} placement="top" arrow>
                <Label
                  variant="soft"
                  color={
                    (row.status === 'revocable' && 'success') ||
                    (row.status === 'non-revocable' && 'error') ||
                    'default'
                  }
                >
                  {row.status === 'revocable' ? 'Revocable' : 'Non-Revocable'}
                </Label>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Tasks Assigned */}
        <TableCell width={300} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Tooltip
              title="This indicates the total number of tasks assigned"
              placement="top"
              arrow
            >
              <Box sx={{ whiteSpace: 'nowrap' }} component="span">
                {row.totalQuantity}000
              </Box>
            </Tooltip>
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
          <Tooltip title="Adjust the task allotment as needed." arrow placement="left">
            <MenuItem onClick={handleOpenUpdateSubaccountDialog} sx={{ color: 'secondary' }}>
              <Iconify icon="material-symbols:settings-b-roll-rounded" />
              Update
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />

          <Tooltip title="Remove the allotted tasks from an account." arrow placement="left">
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
        title="Do you really want to delete assigned tasks?"
        content="You won't be able to revert this action!"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />

      <UpdateSubaccountDialog
        open={openUpdateDialog}
        onClose={handleCloseUpdateSubaccountDialog}
        rowData={selectedRowData}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        Z-index={100}
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
          Deleted!
        </Alert>
      </Snackbar>
    </>
  );
}
