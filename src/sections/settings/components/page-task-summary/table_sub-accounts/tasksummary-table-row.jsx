// // import React, { useState } from 'react';

// // import {
// //   Box,
// //   Stack,
// //   Button,
// //   Tooltip,
// //   TableRow,
// //   Checkbox,
// //   MenuList,
// //   MenuItem,
// //   TableCell,
// //   IconButton,
// //   Typography,
// // } from '@mui/material';

// // import { useRootSnackbar } from 'src/redux/snackbarProvider/SnackbarProvider';

// // import { Label } from 'src/components/label';
// // import { Iconify } from 'src/components/iconify';
// // import { usePopover, CustomPopover } from 'src/components/custom-popover';

// // import { ConfirmDialog } from '../custom-dialog';
// // import { AddUpdateSubAccountDialog } from '../hook/add-update-subaccount-dialog';

// // export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
// //   const popover = usePopover();

// //   const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
// //   const [selectedRowData, setSelectedRowData] = useState(null);

// //   const { openSnackbar } = useRootSnackbar(); // Get openSnackbar from context

// //   const [confirmDelete, setConfirmDelete] = useState(false);

// //   const handleDelete = async () => {
// //     try {
// //       await onDeleteRow();
// //       openSnackbar({
// //         message: 'Successfully deleted the tasks assigned to sub-accounts.',
// //         severity: 'success',
// //       });
// //       setConfirmDelete(false); // Close the ConfirmDialog
// //     } catch (error) {
// //       console.error('Delete failed:', error);
// //       openSnackbar({
// //         message: 'Failed to delete the tasks. Please try again.',
// //         severity: 'error',
// //       });
// //     }
// //   };

// //   const handleOpenConfirmDelete = () => {
// //     setConfirmDelete(true);
// //     popover.onClose();
// //   };

// //   const handleCloseConfirmDelete = () => {
// //     setConfirmDelete(false);
// //   };

// //   const handleOpenUpdateSubaccountDialog = () => {
// //     setSelectedRowData(row);
// //     setUpdateDialogOpen(true);
// //     popover.onClose();
// //   };

// //   const handleCloseUpdateSubaccountDialog = () => {
// //     setUpdateDialogOpen(false);
// //     setSelectedRowData(null);
// //   };

// //   return (
// //     <>
// //       <TableRow hover selected={selected}>
// //         {/* Checkbox */}
// //         <TableCell padding="checkbox">
// //           <Tooltip title="Select Row" arrow placement="top">
// //             <Checkbox
// //               checked={selected}
// //               onClick={onSelectRow}
// //               inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
// //             />
// //           </Tooltip>
// //         </TableCell>

// //         {/* serialNumber */}
// //         <TableCell width={88}>
// //           <Stack spacing={2} direction="row" alignItems="center">
// //             <Box component="span">
// //               <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
// //                 <Typography
// //                   component="span"
// //                   sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
// //                 >
// //                   {serialNumber}
// //                 </Typography>
// //               </Tooltip>
// //             </Box>
// //           </Stack>
// //         </TableCell>

// //         {/* Assigned On */}
// //         <TableCell width={288}>
// //           <Stack spacing={2} direction="row" alignItems="center">
// //             <Box sx={{ width: 145, whiteSpace: 'nowrap' }} component="span">
// //               <Tooltip
// //                 title={`Assigned On: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
// //                 placement="top"
// //                 arrow
// //               >
// //                 <Typography
// //                   component="span"
// //                   sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
// //                 >
// //                   {row.createdAt}
// //                 </Typography>
// //               </Tooltip>
// //             </Box>
// //           </Stack>
// //         </TableCell>

// //         {/* Email */}
// //         <TableCell width={400}>
// //           <Stack spacing={2} direction="row" alignItems="center">
// //             <Stack sx={{ cursor: 'pointer' }}>
// //               <Tooltip
// //                 title="Pabbly account email address to which you have assigned tasks as a sub-account."
// //                 placement="top"
// //                 arrow
// //               >
// //                 <Box
// //                   component="span"
// //                   sx={{
// //                     maxWidth: {
// //                       xs: '400px',
// //                       sm: '500px',
// //                       md: '600px',
// //                       lg: '650px',
// //                       xl: '750px',
// //                     },
// //                     display: 'inline-block',
// //                     overflow: 'hidden',
// //                     textOverflow: 'ellipsis',
// //                     whiteSpace: 'nowrap',
// //                   }}
// //                 >
// //                   <Typography
// //                     component="span"
// //                     sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
// //                   >
// //                     {row.assignedEmail}
// //                   </Typography>
// //                 </Box>
// //               </Tooltip>
// //             </Stack>
// //           </Stack>
// //         </TableCell>

// //         {/* Task Type */}
// //         <TableCell width={288}>
// //           <Stack spacing={2} direction="row" alignItems="center">
// //             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
// //               <Tooltip
// //                 title={
// //                   row.status === 'revocable'
// //                     ? 'Revocable means the task assigned can be revoked.'
// //                     : 'Non-revocable means the task assigned cannot be revoked.'
// //                 }
// //                 placement="top"
// //                 arrow
// //               >
// //                 <Label
// //                   variant="soft"
// //                   color={
// //                     (row.status === 'revocable' && 'success') ||
// //                     (row.status === 'non-revocable' && 'error') ||
// //                     'default'
// //                   }
// //                 >
// //                   {row.status === 'revocable' ? 'Revocable' : 'Non-Revocable'}
// //                 </Label>
// //               </Tooltip>
// //             </Stack>
// //           </Stack>
// //         </TableCell>

// //         {/* Tasks Assigned */}
// //         <TableCell width={300} align="right">
// //           <Stack spacing={1} direction="column" alignItems="flex-end">
// //             <Tooltip title="Number of task assigned to Sub-accounts." placement="top" arrow>
// //               <Box sx={{ whiteSpace: 'nowrap' }} component="span">
// //                 {Intl.NumberFormat().format(10000)}
// //               </Box>
// //             </Tooltip>
// //           </Stack>
// //         </TableCell>

// //         {/* Table Options */}
// //         <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
// //           <Tooltip title="Click to see options." arrow placement="top">
// //             <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
// //               <Iconify icon="eva:more-vertical-fill" />
// //             </IconButton>
// //           </Tooltip>
// //         </TableCell>
// //       </TableRow>

// //       {/* Table Menu List */}
// //       <CustomPopover
// //         open={popover.open}
// //         anchorEl={popover.anchorEl}
// //         onClose={popover.onClose}
// //         slotProps={{ arrow: { placement: 'right-top' } }}
// //       >
// //         <MenuList>
// //           <Tooltip title="Revoke the allotted tasks from an account." arrow placement="left">
// //             <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
// //               <Iconify icon="solar:trash-bin-trash-bold" />
// //               Revoke Task
// //             </MenuItem>
// //           </Tooltip>
// //         </MenuList>
// //       </CustomPopover>

// //       {/* Delete Confirm Dialog */}
// //       <ConfirmDialog
// //         open={confirmDelete}
// //         onClose={handleCloseConfirmDelete}
// //         title="Do you want to revoke task?"
// //         content="You won't be able to revert this!"
// //         action={
// //           <Button variant="contained" color="error" onClick={handleDelete}>
// //             Revoke Task
// //           </Button>
// //         }
// //       />

// //       {/* Update SubAccount Dialog */}
// //       <AddUpdateSubAccountDialog
// //         open={isUpdateDialogOpen}
// //         onClose={handleCloseUpdateSubaccountDialog}
// //         title="Update Sub-account"
// //         actionLabel="Update"
// //         isUpdate
// //         rowData={selectedRowData}
// //       />
// //     </>
// //   );
// // }

// // -----------------------------------------------

// import { toast } from 'sonner';
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

// import { ConfirmDialog } from '../custom-dialog';
// import { AddUpdateSubAccountDialog } from '../hook/add-update-subaccount-dialog';

// export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
//   const popover = usePopover();
//   const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const handleDelete = async () => {
//     try {
//       await onDeleteRow(); // Perform deletion logic
//       toast.success('Successfully deleted the tasks assigned to sub-accounts.'); // Success Snackbar
//       setConfirmDelete(false); // Close ConfirmDialog
//     } catch (error) {
//       console.error('Delete failed:', error);
//       toast.error('Failed to delete the tasks. Please try again.'); // Error Snackbar
//     }
//   };

//   const handleOpenConfirmDelete = () => {
//     setConfirmDelete(true);
//     popover.onClose();
//   };

//   const handleCloseConfirmDelete = () => {
//     setConfirmDelete(false);
//   };

//   const handleOpenUpdateSubaccountDialog = () => {
//     setSelectedRowData(row);
//     setUpdateDialogOpen(true);
//     popover.onClose();
//   };

//   const handleCloseUpdateSubaccountDialog = () => {
//     setUpdateDialogOpen(false);
//     setSelectedRowData(null);
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
//             <Stack sx={{ cursor: 'pointer' }}>
//               <Tooltip
//                 title="Pabbly account email address to which you have assigned tasks as a sub-account."
//                 placement="top"
//                 arrow
//               >
//                 <Box
//                   component="span"
//                   sx={{
//                     maxWidth: {
//                       xs: '400px',
//                       sm: '500px',
//                       md: '600px',
//                       lg: '650px',
//                       xl: '750px',
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
//               <Tooltip
//                 title={
//                   row.status === 'revocable'
//                     ? 'Revocable means the task assigned can be revoked.'
//                     : 'Non-revocable means the task assigned cannot be revoked.'
//                 }
//                 placement="top"
//                 arrow
//               >
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
//             <Tooltip title="Number of task assigned to Sub-accounts." placement="top" arrow>
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
//           <Tooltip
//             title={
//               row.status === 'revocable'
//                 ? 'Revoke the allotted tasks from an account.'
//                 : 'Non-revocable tasks cannot be revoked'
//             }
//             arrow
//             placement="left"
//           >
//             <div>
//               <MenuItem
//                 onClick={handleOpenConfirmDelete}
//                 sx={{
//                   color: 'error.main',
//                   '&.Mui-disabled': {
//                     opacity: 0.6,
//                   },
//                 }}
//                 disabled={row.status !== 'revocable'}
//               >
//                 <Iconify
//                   icon="solar:trash-bin-trash-bold"
//                   sx={{
//                     mr: 1,
//                     opacity: row.status === 'revocable' ? 1 : 0.6,
//                   }}
//                 />
//                 Revoke Task
//               </MenuItem>
//             </div>
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

//       {/* Update SubAccount Dialog */}
//       <AddUpdateSubAccountDialog
//         open={isUpdateDialogOpen}
//         onClose={handleCloseUpdateSubaccountDialog}
//         title="Update Sub-account"
//         actionLabel="Update"
//         isUpdate
//         rowData={selectedRowData}
//       />
//     </>
//   );
// }



import { toast } from 'sonner';
import React, { useState } from 'react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  TableRow,
  MenuList,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { ConfirmDialog } from '../custom-dialog';
import { AddUpdateSubAccountDialog } from '../hook/add-update-subaccount-dialog';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const popover = usePopover();

  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      // Perform deletion logic
      await onDeleteRow();
      toast.success('Successfully deleted the tasks assigned to sub-accounts.'); // Success message
      setConfirmDelete(false); // Close ConfirmDialog
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete the tasks. Please try again.'); // Error message
    }
  };

  const handleOpenConfirmDelete = () => {
    setConfirmDelete(true);
    popover.onClose();
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleOpenUpdateSubaccountDialog = () => {
    setSelectedRowData(row);
    setUpdateDialogOpen(true);
    popover.onClose();
  };

  const handleCloseUpdateSubaccountDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedRowData(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        {/* Serial Number */}
        <TableCell width={88}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box component="span">
              <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                <Typography component="span" sx={{ typography: 'body2' }}>
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
                title={`Task Assigned On: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
                placement="top"
                arrow
              >
                <Typography component="span" sx={{ typography: 'body2' }}>
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
                  <Typography component="span" sx={{ typography: 'body2' }}>
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
        </TableCell>

        {/* Tasks Assigned */}
        <TableCell width={300} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Tooltip title="Number of tasks assigned to Sub-accounts." placement="top" arrow>
              <Box sx={{ whiteSpace: 'nowrap' }} component="span">
                {Intl.NumberFormat().format(10000)}
              </Box>
            </Tooltip>
          </Stack>
        </TableCell>

        {/* Table Options */}
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Click to see options." arrow placement="top">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {/* Table Menu List */}
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip
            title={
              row.status === 'revocable'
                ? 'Revoke the allotted tasks from an account.'
                : 'Non-revocable tasks cannot be revoked'
            }
            arrow
            placement="left"
          >
            <div>
              <MenuItem
                onClick={handleOpenConfirmDelete}
                sx={{
                  color: 'error.main',
                  '&.Mui-disabled': {
                    opacity: 0.6,
                  },
                }}
                disabled={row.status !== 'revocable'}
              >
                <Iconify
                  icon="solar:trash-bin-trash-bold"
                  sx={{
                    mr: 1,
                    opacity: row.status === 'revocable' ? 1 : 0.6,
                  }}
                />
                Revoke Task
              </MenuItem>
            </div>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you want to revoke task?"
        content="You won't be able to revert this!"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Revoke Task
          </Button>
        }
      />

      {/* Update SubAccount Dialog */}
      <AddUpdateSubAccountDialog
        open={isUpdateDialogOpen}
        onClose={handleCloseUpdateSubaccountDialog}
        title="Update Sub-account"
        actionLabel="Update"
        isUpdate
        rowData={selectedRowData}
      />
    </>
  );
}
