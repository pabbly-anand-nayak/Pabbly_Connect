// import React, { useState } from 'react';
// import { useTheme } from '@emotion/react';

// import {
//   Box,
//   Stack,
//   Alert,
//   Button,
//   Tooltip,
//   Divider,
//   TableRow,
//   Checkbox,
//   MenuList,
//   MenuItem,
//   Snackbar,
//   TableCell,
//   IconButton,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { usePopover, CustomPopover } from 'src/components/custom-popover';

// import { UpdateWebhookDialog } from '../hook/update-webhook';

// export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
//   const confirm = useBoolean();
//   const theme = useTheme();
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const dialog = useBoolean(); // Manages the dialog open/close state
//   const confirmStatus = useBoolean();
//   const [statusToToggle, setStatusToToggle] = useState('');

//   const popover = usePopover();
//   const confirmDelete = useBoolean();

//   const handleStatusToggle = (newStatus) => {
//     setStatusToToggle(newStatus);
//     confirmStatus.onTrue();
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <>
//       <TableRow hover selected={selected}>
//         {/* Checkbox */}
//         <TableCell padding="checkbox">
//           <Tooltip title="Select Row" arrow placement="top">
//             <Checkbox
//               checked={selected}
//               onClick={onSelectRow}
//               inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
//             />
//           </Tooltip>
//         </TableCell>

//         {/* S.No */}
//         <TableCell width={88}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack
//               sx={{
//                 typography: 'body2',
//                 flex: '1 1 auto',
//                 alignItems: 'flex-start',
//               }}
//             >
//               <Box component="span">
//                 <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
//                   {serialNumber}
//                 </Tooltip>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Status */}
//         <TableCell width={250}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//               {/* Webhook Active & Inactive */}
//               <Tooltip title={`Webhook is ${row.status}`} placement="top" arrow>
//                 <Label
//                   variant="soft"
//                   color={
//                     (row.status === 'active' && 'success') ||
//                     (row.status === 'inactive' && 'error') ||
//                     'default'
//                   }
//                   sx={{ mb: 0.5 }}
//                 >
//                   {row.status}
//                 </Label>
//               </Tooltip>

//               {/* Webhook Name */}
//               <Tooltip title={`Webhook Name : ${row.webhook_name}`} placement="top" arrow>
//                 <Box
//                   component="span"
//                   sx={{
//                     width: 250,
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                   }}
//                 >
//                   {row.webhook_name}
//                 </Box>
//               </Tooltip>

//               {/* Webhook Event */}
//               <Tooltip title={`Webhook Event : ${row.webhook_event}`} placement="bottom" arrow>
//                 <Box
//                   sx={{ width: 250, whiteSpace: 'nowrap', color: 'text.disabled' }}
//                   component="span"
//                 >
//                   {row.webhook_event}
//                 </Box>
//               </Tooltip>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Webhook URL */}
//         <TableCell width={550}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack
//               sx={{
//                 // color: '#078dee',
//                 typography: 'body2',
//                 flex: '1 1 auto',
//                 alignItems: 'flex-start',
//                 cursor: 'pointer',
//               }}
//             >
//               <Box
//                 component="span"
//                 sx={{
//                   width: 550,
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 <Tooltip title={`Webhook URL : ${row.webhook_url}`} placement="top" arrow>
//                   {row.webhook_url}
//                 </Tooltip>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Button Test Webhook */}
//         <TableCell width={300} align="right">
//           <Stack spacing={1} direction="column" alignItems="flex-end">
//             <Tooltip title=" Test Webhook" arrow placement="top" disableInteractive>
//               <Button variant="outlined" color="primary">
//                 Test Webhook
//               </Button>
//             </Tooltip>
//           </Stack>
//         </TableCell>

//         <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
//           <Tooltip title="Click to see options." arrow placement="top">
//             <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
//               <Iconify icon="eva:more-vertical-fill" />
//             </IconButton>
//           </Tooltip>
//         </TableCell>
//       </TableRow>

//       <CustomPopover
//         open={popover.open}
//         anchorEl={popover.anchorEl}
//         onClose={popover.onClose}
//         slotProps={{ arrow: { placement: 'right-top' } }}
//       >
//         <MenuList>
//           <Tooltip title="Edit this Webhook." arrow placement="left">
//             <MenuItem
//               onClick={() => {
//                 setSelectedRow(row); // Pass the selected row data
//                 dialog.onTrue(); // Open the dialog
//                 popover.onClose();
//               }}
//             >
//               <Iconify icon="solar:pen-bold" />
//               Edit Webhook
//             </MenuItem>
//           </Tooltip>

//           {row.status === 'active' ? (
//             <Tooltip title="Click to set status to Inactive" arrow placement="left">
//               <MenuItem
//                 onClick={() => {
//                   handleStatusToggle('inactive');
//                   popover.onClose();
//                 }}
//               >
//                 <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
//                 Mark as Active
//               </MenuItem>
//             </Tooltip>
//           ) : (
//             <Tooltip title="Click to set status to Active" arrow placement="left">
//               <MenuItem
//                 onClick={() => {
//                   handleStatusToggle('active');
//                   popover.onClose();
//                 }}
//               >
//                 <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
//                 Mark as Inactive
//               </MenuItem>
//             </Tooltip>
//           )}

//           <Divider sx={{ borderStyle: 'dashed' }} />
//           <Tooltip title="Remove this Webhook." arrow placement="left">
//             <MenuItem
//               onClick={() => {
//                 confirmDelete.onTrue();
//                 popover.onClose();
//               }}
//               sx={{ color: 'error.main' }}
//             >
//               <Iconify icon="solar:trash-bin-trash-bold" />
//               Remove
//             </MenuItem>
//           </Tooltip>
//         </MenuList>
//       </CustomPopover>

//       <ConfirmDialog
//         open={confirmDelete.value}
//         onClose={confirmDelete.onFalse}
//         title="Do you really want to delete the webhook?"
//         content="You won't be able to revert this action!"
//         action={
//           <Button variant="contained" color="error" onClick={onDeleteRow}>
//             Delete
//           </Button>
//         }
//       />

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         Z-index={100}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{
//           boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//           mt: 14,
//         }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           sx={{
//             width: '100%',
//             fontSize: '14px',
//             fontWeight: 'bold',
//             backgroundColor: theme.palette.background.paper,
//             color: theme.palette.text.primary,
//           }}
//         >
//           Deleted!
//         </Alert>
//       </Snackbar>

//       {/* Update Webhook Dialog with selected row data */}
//       {selectedRow && (
//         <UpdateWebhookDialog
//           open={dialog.value}
//           onClose={dialog.onFalse}
//           title="Update Webhook"
//           content="Edit the webhook details here"
//           action="Update Webhook"
//           initialData={selectedRow} // Pass the row data
//         />
//       )}
//     </>
//   );
// }

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
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { UpdateWebhookDialog } from '../hook/update-webhook';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const confirm = useBoolean();
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Manage snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Manage snackbar severity
  const [selectedRow, setSelectedRow] = useState(null);
  const dialog = useBoolean(); // Manages the dialog open/close state
  const confirmStatus = useBoolean();
  const [statusToToggle, setStatusToToggle] = useState('');

  const popover = usePopover();
  const confirmDelete = useBoolean();

  const handleStatusToggle = (newStatus) => {
    setStatusToToggle(newStatus);

    if (newStatus === 'active') {
      // Display a failure snackbar message for a failed activation
      setSnackbarMessage(
        'Failed to activate webhook URL due to the following error: Return status code 404.'
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else {
      // For other status changes, you can handle it similarly or differently based on your need.
      confirmStatus.onTrue();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <TableRow hover selected={selected}>
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

        {/* S.No */}
        <TableCell width={88}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span">
                <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                  {serialNumber}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Status */}
        <TableCell width={250}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              {/* Webhook Active & Inactive */}
              <Tooltip title={`Webhook is ${row.status}`} placement="top" arrow>
                <Label
                  variant="soft"
                  color={
                    (row.status === 'active' && 'success') ||
                    (row.status === 'inactive' && 'error') ||
                    'default'
                  }
                  sx={{ mb: 0.5 }}
                >
                  {row.status}
                </Label>
              </Tooltip>

              {/* Webhook Name */}
              <Tooltip title={`Webhook Name : ${row.webhook_name}`} placement="top" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 250,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.webhook_name}
                </Box>
              </Tooltip>

              {/* Webhook Event */}
              <Tooltip title={`Webhook Event : ${row.webhook_event}`} placement="bottom" arrow>
                <Box
                  sx={{ width: 250, whiteSpace: 'nowrap', color: 'text.disabled' }}
                  component="span"
                >
                  {row.webhook_event}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Webhook URL */}
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
                <Tooltip title={`Webhook URL : ${row.webhook_url}`} placement="top" arrow>
                  {row.webhook_url}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Button Test Webhook */}
        <TableCell width={300} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Tooltip
              title=" Click here to send a sample webhook data."
              arrow
              placement="top"
              disableInteractive
            >
              <Button variant="outlined" color="primary">
                Test Webhook
              </Button>
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
          <Tooltip title="Update webhook URL and events." arrow placement="left">
            <MenuItem
              onClick={() => {
                setSelectedRow(row); // Pass the selected row data
                dialog.onTrue(); // Open the dialog
                popover.onClose();
              }}
            >
              <Iconify icon="solar:pen-bold" />
              Update
            </MenuItem>
          </Tooltip>

          {row.status === 'active' ? (
            <Tooltip title="Disable webhook." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('inactive');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
                Mark as Inactive
              </MenuItem>
            </Tooltip>
          ) : (
            <Tooltip title="Enable webhook." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('active');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
                Mark as Active
              </MenuItem>
            </Tooltip>
          )}

          <Divider sx={{ borderStyle: 'dashed' }} />
          <Tooltip title="Delete webhook." arrow placement="left">
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
        title="Do you really want to delete the webhook?"
        content="You won't be able to revert this action!"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 13,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity} // Dynamically set the severity
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {snackbarMessage} {/* Dynamically set the snackbar message */}
        </Alert>
      </Snackbar>

      {/* Update Webhook Dialog with selected row data */}
      {selectedRow && (
        <UpdateWebhookDialog
          open={dialog.value}
          onClose={dialog.onFalse}
          title="Update Webhook"
          content="Edit the webhook details here"
          action="Update Webhook"
          initialData={selectedRow} // Pass the row data
        />
      )}
    </>
  );
}
