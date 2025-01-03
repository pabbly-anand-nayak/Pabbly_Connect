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

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { usePopover, CustomPopover } from 'src/components/custom-popover';

// import { ConfirmDialog } from '../custom-dialog';
// import { AddUpdateSubAccountDialog } from '../hook/add-update-subaccount-dialog copy';

// export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
//   const theme = useTheme();
//   const [setSnackbarOpen] = useState(false);
//   const popover = usePopover();
//   const [setConfirmDialogProps] = useState({});

//   const [confirmDelete, setConfirmDelete] = useState(false);
//   // Modified delete handler
//   const handleDelete = async () => {
//     try {
//       await onDeleteRow(); // Assuming onDeleteRow might be async
//       confirmDelete.onFalse();
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Delete failed:', error);
//     }
//   };

//   /* Delete Success Snackbar */

//   const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

//   const handleSuccessSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSuccessSnackbarOpen(false);
//   };

//   const handleCloseConfirmDelete = () => {
//     setConfirmDelete(false);
//   };

//   const handleCloseConfirmDialog = () => {
//     setConfirmDelete(false);
//     setConfirmDialogProps({});
//   };

//   const handleOpenConfirmDialog = (action) => {
//     setConfirmDialogProps(action);
//     setConfirmDelete(true);
//     popover.onClose(); // Close the MenuList when opening confirm dialog
//   };

//   const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);

//   const handleUpdateDialogOpen = (rowData) => {
//     setSelectedRowData(rowData); // Pass the row data to the dialog
//     setUpdateDialogOpen(true);
//   };

//   const handleUpdateDialogClose = () => {
//     setUpdateDialogOpen(false);
//     setSelectedRowData(null); // Clear the row data when closing the dialog
//   };

//   return (
//     <>
//       <TableRow hover selected={selected}>
//         {/* Rest of the TableRow code remains the same */}
//         <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
//           <Tooltip title="Select Row" arrow placement="top">
//             <Checkbox
//               checked={selected}
//               onClick={onSelectRow}
//               inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
//             />
//           </Tooltip>
//         </TableCell>

//         <TableCell width={88}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//               <Box component="span">
//                 <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
//                   {serialNumber}
//                 </Tooltip>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         <TableCell width={288}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//               <Box sx={{ width: 145, whiteSpace: 'nowrap' }} component="span">
//                 <Tooltip
//                   title={`Assigned On: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
//                   placement="top"
//                   arrow
//                 >
//                   {row.createdAt}
//                 </Tooltip>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         <TableCell width={200}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack
//               sx={{
//                 typography: 'body2',
//                 flex: '1 1 auto',
//                 alignItems: 'flex-start',
//                 cursor: 'pointer',
//               }}
//             >
//               <Box
//                 component="span"
//                 sx={{
//                   width: 400,
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 <Tooltip title={`Assigned to ${row.workflowName}`} placement="top" arrow>
//                   {row.workflowName}
//                 </Tooltip>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         <TableCell width={288}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//               <Tooltip title={`Task type ${row.status}`} placement="top" arrow>
//                 <Label
//                   variant="soft"
//                   color={
//                     (row.status === 'revocable' && 'success') ||
//                     (row.status === 'non-revocable' && 'error') ||
//                     'default'
//                   }
//                 >
//                   {row.status === 'revocable' ? 'Revocable' : 'Non-Revocable'}
//                 </Label>
//               </Tooltip>
//             </Stack>
//           </Stack>
//         </TableCell>

//         <TableCell width={300} align="right">
//           <Stack spacing={1} direction="column" alignItems="flex-end">
//             <Tooltip
//               title="This indicates the total number of tasks assigned"
//               placement="top"
//               arrow
//             >
//               <Box sx={{ whiteSpace: 'nowrap' }} component="span">
//                 {Intl.NumberFormat().format(10000)}
//               </Box>
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
//           <Tooltip title="Adjust the task allotment as needed." arrow placement="left">
//             <MenuItem onClick={handleUpdateDialogOpen} sx={{ color: 'secondary' }}>
//               <Iconify icon="material-symbols:settings-b-roll-rounded" />
//               Update
//             </MenuItem>
//           </Tooltip>

//           <Divider style={{ borderStyle: 'dashed' }} />

//           <Tooltip title="Remove the allotted tasks from an account." arrow placement="left">
//             <MenuItem
//               onClick={() =>
//                 handleOpenConfirmDialog({
//                   onConfirm: () => handleDelete(),
//                 })
//               }
//               sx={{ color: 'error.main' }}
//             >
//               <Iconify icon="solar:trash-bin-trash-bold" />
//               Delete
//             </MenuItem>
//           </Tooltip>
//         </MenuList>
//       </CustomPopover>
//       <ConfirmDialog
//         open={confirmDelete}
//         onClose={handleCloseConfirmDelete}
//         title="Do you really want to delete assigned tasks?"
//         content="You won't be able to revert this action!"
//         action={
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               // Add your revoke tasks logic here
//               handleCloseConfirmDelete(); // Close the dialog after revoking tasks
//               setSuccessSnackbarOpen(true); // Show success snackbar
//             }}
//           >
//             Delete
//           </Button>
//         }
//       />
//       {/* Delete Success Snackbar */}
//       <Snackbar
//         open={successSnackbarOpen}
//         autoHideDuration={2500}
//         onClose={handleSuccessSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{
//           boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//           mt: 13,
//           zIndex: theme.zIndex.modal + 9999,
//         }}
//       >
//         <Alert
//           onClose={handleSuccessSnackbarClose}
//           severity="success"
//           sx={{
//             width: '100%',
//             fontSize: '14px',
//             fontWeight: 'bold',
//             backgroundColor: theme.palette.background.paper,
//             color: theme.palette.text.primary,
//           }}
//         >
//           Successfully deleted the tasks assigned to sub-accounts.
//         </Alert>
//       </Snackbar>

//       {/* Update Subaccount Dialog component */}
//       <AddUpdateSubAccountDialog
//         open={isUpdateDialogOpen}
//         onClose={handleUpdateDialogClose}
//         title="Update Sub-account"
//         actionLabel="Update"
//         isUpdate
//         rowData={selectedRowData}
//       />
//     </>
//   );
// }

// ---------------------------------------------

// import React, { useState } from 'react';

// import {
//   Box,
//   Stack,
//   Button,
//   Tooltip,
//   TableRow,
//   Checkbox,
//   MenuList,
//   MenuItem,
//   TableCell,
//   IconButton,
//   Typography,
// } from '@mui/material';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { usePopover, CustomPopover } from 'src/components/custom-popover';
// import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

// import { ConfirmDialog } from '../custom-dialog';

// export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
//   const popover = usePopover();

//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   const handleDelete = async () => {
//     try {
//       await onDeleteRow();
//       setSnackbarMessage('Successfully deleted the tasks assigned to sub-accounts.');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//       setConfirmDelete(false);
//     } catch (error) {
//       console.error('Delete failed:', error);
//       setSnackbarMessage('Failed to delete the tasks. Please try again.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleOpenConfirmDelete = () => {
//     setConfirmDelete(true);
//     popover.onClose();
//   };

//   const handleCloseConfirmDelete = () => {
//     setConfirmDelete(false);
//   };

//   return (
//     <>
//       <TableRow hover selected={selected}>
//         {/* Checkbox */}
//         <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
//           <Tooltip title="Select Row" arrow placement="top">
//             <Checkbox
//               checked={selected}
//               onClick={onSelectRow}
//               inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
//             />
//           </Tooltip>
//         </TableCell>

//         {/* serialNumber */}
//         <TableCell width={88}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Box component="span">
//               <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
//                 <Typography
//                   component="span"
//                   sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
//                 >
//                   {serialNumber}
//                 </Typography>
//               </Tooltip>
//             </Box>
//           </Stack>
//         </TableCell>

//         {/* Assigned On */}
//         <TableCell width={288}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Box sx={{ width: 145, whiteSpace: 'nowrap' }} component="span">
//               <Tooltip
//                 title={`Assigned On: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
//                 placement="top"
//                 arrow
//               >
//                 <Typography
//                   component="span"
//                   sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
//                 >
//                   {row.createdAt}
//                 </Typography>
//               </Tooltip>
//             </Box>
//           </Stack>
//         </TableCell>

//         {/* Email */}
//         <TableCell width={400}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack
//               sx={{
//                 cursor: 'pointer',
//               }}
//             >
//               <Tooltip title={`Assigned to ${row.assignedEmail}`} placement="top" arrow>
//                 <Box
//                   component="span"
//                   sx={{
//                     // color: 'text.disabled',
//                     maxWidth: {
//                       xs: '400px', // For extra small screens
//                       sm: '500px', // For small screens
//                       md: '600px', // For medium screens
//                       lg: '650px', // For large screens
//                       xl: '750px', // For extra large screens
//                     },
//                     display: 'inline-block',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   <Typography
//                     component="span"
//                     sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
//                   >
//                     {row.assignedEmail}
//                   </Typography>
//                 </Box>
//               </Tooltip>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Task Type */}
//         <TableCell width={288}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//               <Tooltip title={`Task type ${row.status}`} placement="top" arrow>
//                 <Label
//                   variant="soft"
//                   color={
//                     (row.status === 'revocable' && 'success') ||
//                     (row.status === 'non-revocable' && 'error') ||
//                     'default'
//                   }
//                 >
//                   {row.status === 'revocable' ? 'Revocable' : 'Non-Revocable'}
//                 </Label>
//               </Tooltip>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Tasks Assigned */}
//         <TableCell width={300} align="right">
//           <Stack spacing={1} direction="column" alignItems="flex-end">
//             <Tooltip
//               title="This indicates the total number of tasks assigned"
//               placement="top"
//               arrow
//             >
//               <Box sx={{ whiteSpace: 'nowrap' }} component="span">
//                 {Intl.NumberFormat().format(10000)}
//               </Box>
//             </Tooltip>
//           </Stack>
//         </TableCell>

//         {/* Table Options */}
//         <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
//           <Tooltip title="Click to see options." arrow placement="top">
//             <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
//               <Iconify icon="eva:more-vertical-fill" />
//             </IconButton>
//           </Tooltip>
//         </TableCell>
//       </TableRow>

//       {/* Table Menu List */}
//       <CustomPopover
//         open={popover.open}
//         anchorEl={popover.anchorEl}
//         onClose={popover.onClose}
//         slotProps={{ arrow: { placement: 'right-top' } }}
//       >
//         <MenuList>
//           <Tooltip title="Revoke the allotted tasks from an account." arrow placement="left">
//             <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
//               <Iconify icon="solar:trash-bin-trash-bold" />
//               Revoke Task
//             </MenuItem>
//           </Tooltip>
//         </MenuList>
//       </CustomPopover>

//       {/* Delete Confirm Dialog */}
//       <ConfirmDialog
//         open={confirmDelete}
//         onClose={handleCloseConfirmDelete}
//         title="Do you want to revoke task?"
//         content="You won't be able to revert this!"
//         action={
//           <Button variant="contained" color="error" onClick={handleDelete}>
//             Revoke Task
//           </Button>
//         }
//       />

//       {/* CustomSnackbar */}
//       <CustomSnackbar
//         open={snackbarOpen}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//         severity={snackbarSeverity}
//       />
//     </>
//   );
// }

// ------------------------------------------

import React from 'react';

import {
  Box,
  Stack,
  Tooltip,
  TableRow,
  Checkbox,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

export function OrderTableRow({ row, selected, onSelectRow, onOpenPopover, serialNumber }) {
  return (
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

      {/* serialNumber */}
      <TableCell width={88}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Box component="span">
            <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
              <Typography
                component="span"
                sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
              >
                {serialNumber}
              </Typography>
            </Tooltip>
          </Box>
        </Stack>
      </TableCell>

      {/* Assigned On */}
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Box sx={{ width: 145, whiteSpace: 'nowrap' }} component="span">
            <Tooltip
              title={`Assigned On: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
              placement="top"
              arrow
            >
              <Typography
                component="span"
                sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
              >
                {row.createdAt}
              </Typography>
            </Tooltip>
          </Box>
        </Stack>
      </TableCell>

      {/* Email */}
      <TableCell width={400}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ cursor: 'pointer' }}>
            <Tooltip
              title="Pabbly account email address to which you have assigned tasks as a sub-account."
              placement="top"
              arrow
            >
              <Box
                component="span"
                sx={{
                  maxWidth: {
                    xs: '400px',
                    sm: '500px',
                    md: '600px',
                    lg: '650px',
                    xl: '750px',
                  },
                  display: 'inline-block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography
                  component="span"
                  sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                >
                  {row.assignedEmail}
                </Typography>
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      {/* Task Type */}
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip
              title={
                row.status === 'revocable'
                  ? 'Revocable means the task assigned can be revoked.'
                  : 'Non-revocable means the task assigned cannot be revoked.'
              }
              placement="top"
              arrow
            >
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
          <Tooltip title="Number of task assigned to Sub-accounts." placement="top" arrow>
            <Box sx={{ whiteSpace: 'nowrap' }} component="span">
              {Intl.NumberFormat().format(10000)}
            </Box>
          </Tooltip>
        </Stack>
      </TableCell>

      {/* Table Options */}
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Click to see options." arrow placement="top">
          <IconButton onClick={onOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
