// import React, { useState } from 'react';

// import {
//   Box,
//   Stack,
//   Button,
//   Tooltip,
//   Divider,
//   TableRow,
//   Checkbox,
//   MenuList,
//   MenuItem,
//   TableCell,
//   IconButton,
//   Typography,
//   CircularProgress,
// } from '@mui/material';

// import { popover } from 'src/theme/core/components/popover';

// import { Iconify } from 'src/components/iconify';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { CustomPopover } from 'src/components/custom-popover';
// import { useRootSnackbar } from 'src/components/custom-snackbar/custom-snackbar';
// import ViewLogDialog from 'src/components/custom-viewlog-dialog/custom-viewlog-dialog';

// import { AddUpdateVariablesDialog } from '../hook/add-update-variables-dailog';

// export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
//   const { openSnackbar } = useRootSnackbar(); // Use the snackbar context
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   // Dialog States for AddUpdateVariablesDialog
//   const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

//   const handleOpenPopover = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClosePopover = () => {
//     setAnchorEl(null);
//   };

//   const handleOpenConfirmDelete = () => {
//     setConfirmDelete(true);
//     handleClosePopover();
//   };

//   const handleCopyClick = () => {
//     // Wrap the variable name with {{ and }}
//     const formattedText = `{{${row.variableName}}}`;

//     navigator.clipboard
//       .writeText(formattedText) // Copy the formatted variable name to the clipboard
//       .then(() => {
//         openSnackbar({
//           message: 'Custom variable copied successfully!',
//           severity: 'success',
//         });
//       })
//       .catch(() => {
//         openSnackbar({
//           message: 'Failed to copy custom variable.',
//           severity: 'error',
//         });
//       });
//   };

//   const handleCloseConfirmDelete = () => {
//     setConfirmDelete(false);
//   };

//   const handleDeleteVariable = () => {
//     setConfirmDelete(false); // Close the dialog
//     openSnackbar({
//       message: 'Variable deleted successfully!',
//       severity: 'success',
//     });
//   };

//   const handleOpenUpdateDialog = () => {
//     setUpdateDialogOpen(true);
//     handleClosePopover();
//   };

//   const handleCloseUpdateDialog = () => {
//     setUpdateDialogOpen(false);
//   };

//   const [isViewLogOpen, setIsViewLogOpen] = useState(false);

//   // Handler for opening the log dialog
//   const handleOpenViewLogPopoverDialog = () => {
//     setIsViewLogOpen(true);
//     handleClosePopover();
//   };

//   // Handler for closing the log dialog
//   const handleCloseViewLogDialog = () => {
//     setIsViewLogOpen(false);
//   };

//   // Example logs data
//   const logs = [
//     {
//       date: 'Oct 17, 2024 13:05:58',
//       changed_by: 'Changed by: Anand Nayak',
//       old_data: 'Old data: yy/mm/dd',
//       new_data: 'New data: dd/mm/yy',
//     },
//     {
//       date: 'Oct 18, 2024 12:59:44',
//       changed_by: 'Changed by: Anand Nayak',
//       old_data: 'Old data: dd/mm/yy',
//       new_data: 'New data: hardik@inboxkitten.com',
//     },
//     {
//       date: 'Oct 19, 2024 13:29:22',
//       changed_by: 'Changed by: Anand Nayak',
//       old_data: 'Old data: hardik@inboxkitten.com',
//       new_data: 'New data: anand.nayak@inboxkitten.com',
//     },
//     {
//       date: 'Oct 19, 2024 13:29:19',
//       changed_by: 'Changed by: Anand Nayak',
//       old_data: 'Old data: anand.nayak@inboxkitten.com',
//       new_data: 'New data: nayak@pabbly.com',
//     },
//     {
//       date: 'Oct 19, 2024 16:13:16',
//       changed_by: 'Changed by: Anand Nayak',
//       old_data: 'Old data: nayak@pabbly.com',
//       new_data: 'New data: nayak.anand@inboxkitten.com',
//     },
//     {
//       date: 'Oct 19, 2024 13:29:22',
//       changed_by: 'Changed by: Anand Nayak',
//       old_data: 'Old data: nayak.anand@inboxkitten.com',
//       new_data: 'New data: hardik@inboxkitten.com',
//     },
//   ];

//   // Handle Old Data copy operations
//   const handleCopyOldData = (log) => {
//     const value = log.old_data.replace('Old data: ', '');
//     navigator.clipboard.writeText(value).catch((err) => console.error('Failed to copy text:', err));
//     openSnackbar({
//       message: 'Old variable data copied!',
//       severity: 'success',
//     });
//   };

//   // Handle New Data copy operations
//   const handleCopyNewData = (log) => {
//     const value = log.new_data.replace('New data: ', '');
//     navigator.clipboard.writeText(value).catch((err) => console.error('Failed to copy text:', err));
//     openSnackbar({
//       message: 'New variable data copied!',
//       severity: 'success',
//     });
//   };

//   // LoadingButton
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <>
//       <TableRow
//         hover
//         selected={selected}
//         sx={{
//           '&:hover .copy-button': {
//             opacity: 1,
//           },
//         }}
//       >
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
//             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//               <Box component="span">
//                 <Typography
//                   sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
//                 >
//                   <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
//                     <span>{serialNumber}</span>
//                   </Tooltip>
//                 </Typography>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Created On */}
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
//                   width: 200,
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 <Typography
//                   sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
//                 >
//                   <Tooltip
//                     title={`Variable Created: ${row.createdOn}, (UTC+05:30) Asia/Kolkata`}
//                     placement="top"
//                     arrow
//                   >
//                     <span>{row.createdOn}</span>
//                   </Tooltip>
//                 </Typography>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Variable Name */}
//         <TableCell width={300}>
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
//                   width: 300,
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                   position: 'relative',
//                 }}
//               >
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <Box sx={{ display: 'auto' }}>
//                     <Box sx={{ width: 300, gap: 1, alignItems: 'center', display: 'flex' }}>
//                       {/* variable Name */}
//                       <Tooltip title={`Variable Name: ${row.variableName}`} placement="top" arrow>
//                         <Box
//                           component="span"
//                           sx={{
//                             whiteSpace: 'nowrap',
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis',
//                           }}
//                         >
//                           <Typography
//                             component="span"
//                             sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
//                           >
//                             {row.variableName}
//                           </Typography>
//                         </Box>
//                       </Tooltip>

//                       {/* Copy Icon */}
//                       <Tooltip
//                         title="Click here to copy custom variable."
//                         arrow
//                         placement="top"
//                         sx={{ fontSize: '16px' }}
//                       >
//                         <IconButton
//                           className="copy-button"
//                           color={popover.open ? 'inherit' : 'default'}
//                           onClick={handleCopyClick}
//                           sx={{
//                             width: '20px',
//                             height: '20px',
//                             opacity: 0,
//                             transition: 'opacity 0.3s',
//                             right: 0,
//                           }}
//                         >
//                           <Iconify
//                             width={18}
//                             icon="solar:copy-bold"
//                             sx={{ color: 'text.secondary' }}
//                           />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </Box>
//                 </Stack>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Variable Data */}
//         <TableCell width={400}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack
//               sx={{
//                 typography: 'body2',
//                 flex: '1 1 auto',
//                 alignItems: 'flex-start',
//                 cursor: 'pointer',
//               }}
//             >
//               <Box sx={{ display: 'auto' }}>
//                 <Box sx={{ width: 350, gap: 1, alignItems: 'center', display: 'flex' }}>
//                   {/* variable Data */}
//                   <Tooltip title={`Variable Data: ${row.variableData}`} placement="top" arrow>
//                     <Box
//                       component="span"
//                       sx={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                       }}
//                     >
//                       <Typography
//                         component="span"
//                         sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
//                       >
//                         <span>{row.variableData}</span>
//                       </Typography>
//                     </Box>
//                   </Tooltip>
//                 </Box>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Last Updated On */}
//         <TableCell width={200} align="right">
//           <Stack spacing={1} direction="column" alignItems="flex-end">
//             <Box sx={{ whiteSpace: 'nowrap' }} component="span">
//               <Typography sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//                 <Tooltip
//                   title={`Last Updated: ${row.updatedAt} (UTC+05:30) Asia/Kolkata`}
//                   placement="top"
//                   arrow
//                 >
//                   <span>{row.createdAt}</span>
//                 </Tooltip>
//               </Typography>
//             </Box>
//           </Stack>
//         </TableCell>

//         {/* Table options */}
//         <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
//           <Tooltip title="Click to see options." arrow placement="top">
//             <IconButton color={anchorEl ? 'inherit' : 'default'} onClick={handleOpenPopover}>
//               <Iconify icon="eva:more-vertical-fill" />
//             </IconButton>
//           </Tooltip>
//         </TableCell>
//       </TableRow>

//       {/* Menu Table options List */}
//       <CustomPopover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClosePopover}>
//         <MenuList>
//           <Tooltip title="Updates the custom variable." arrow placement="left">
//             <MenuItem onClick={handleOpenUpdateDialog} sx={{ color: 'secondary' }}>
//               <Iconify icon="material-symbols:settings-b-roll-rounded" />
//               Update
//             </MenuItem>
//           </Tooltip>
//           <Tooltip title="Check the history of the edited variable." arrow placement="left">
//             <MenuItem onClick={handleOpenViewLogPopoverDialog} sx={{ color: 'secondary' }}>
//               <Iconify icon="material-symbols:data-info-alert-rounded" />
//               View Log
//             </MenuItem>
//           </Tooltip>

//           <Divider style={{ borderStyle: 'dashed' }} />
//           <Tooltip title="This will delete the variable." arrow placement="left">
//             <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
//               <Iconify icon="solar:trash-bin-trash-bold" />
//               Delete
//             </MenuItem>
//           </Tooltip>
//         </MenuList>
//       </CustomPopover>

//       {/* Confirm Row Delete Dialog */}
//       <ConfirmDialog
//         open={confirmDelete}
//         onClose={handleCloseConfirmDelete}
//         title={`Do you really want to delete "${row.variableName}"?`}
//         content="You won't be able to revert this action!"
//         action={
//           <Button variant="contained" color="error" onClick={handleDeleteVariable}>
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
//           </Button>
//         }
//       />

//       {/* Update Row Variables Dialog */}
//       <AddUpdateVariablesDialog
//         open={isUpdateDialogOpen}
//         onClose={handleCloseUpdateDialog}
//         title="Update Custom Variable"
//         mode="update"
//         initialVariableName={row.variableName}
//         initialVariableData={row.variableData}
//         onSave={({ variableName, variableData }) => {
//           console.log('Variable Updated:', { variableName, variableData });
//         }}
//       />

//       {/* View Log Dialog */}
//       <ViewLogDialog
//         open={isViewLogOpen}
//         onClose={handleCloseViewLogDialog}
//         headerTitle={`Custom Variable: ${row.variableName}`}
//         headerSubTitle="View update log for last 50 changes."
//         logs={logs}
//         oldDataButtonTooltip="Click here to copy the old data of the variable."
//         newDataButtonTooltip="Click here to copy the new data of the variable."
//         onCopyOldData={handleCopyOldData}
//         onCopyNewData={handleCopyNewData}
//       />
//     </>
//   );
// }
// ------------------

import { toast } from 'sonner';
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
  TableCell,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';

import { popover } from 'src/theme/core/components/popover';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';
import ViewLogDialog from 'src/components/custom-viewlog-dialog/custom-viewlog-dialog';

import { AddUpdateVariablesDialog } from '../hook/add-update-variables-dailog';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Dialog States for AddUpdateVariablesDialog
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

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

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleCopyClick = () => {
    const formattedText = `{{${row.variableName}}}`;

    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        toast.success('Custom variable copied successfully!');
      })
      .catch(() => {
        toast.error('Failed to copy custom variable.');
      });
  };

  const handleDeleteVariable = () => {
    setConfirmDelete(false);
    toast.success('Variable deleted successfully!');
  };

  const handleOpenUpdateDialog = () => {
    setUpdateDialogOpen(true);
    handleClosePopover();
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const [isViewLogOpen, setIsViewLogOpen] = useState(false);

  // Handler for opening the log dialog
  const handleOpenViewLogPopoverDialog = () => {
    setIsViewLogOpen(true);
    handleClosePopover();
  };

  // Handler for closing the log dialog
  const handleCloseViewLogDialog = () => {
    setIsViewLogOpen(false);
  };

  // Example logs data
  const logs = [
    {
      date: 'Oct 17, 2024 13:05:58',
      // edit_Log: 'edit_Log:',
      changed_by: 'Changed by: Anand Nayak',
      old_data: 'Old data: yy/mm/dd',
      new_data: 'New data: dd/mm/yy',
    },
    {
      date: 'Oct 18, 2024 12:59:44',
      changed_by: 'Changed by: Anand Nayak',
      old_data: 'Old data: dd/mm/yy',
      new_data: 'New data: hardik@inboxkitten.com',
    },
    {
      date: 'Oct 19, 2024 13:29:22',
      changed_by: 'Changed by: Anand Nayak',
      old_data: 'Old data: hardik@inboxkitten.com',
      new_data: 'New data: anand.nayak@inboxkitten.com',
    },
    {
      date: 'Oct 19, 2024 13:29:19',
      changed_by: 'Changed by: Anand Nayak',
      old_data: 'Old data: anand.nayak@inboxkitten.com',
      new_data: 'New data: nayak@pabbly.com',
    },
    {
      date: 'Oct 19, 2024 16:13:16',
      changed_by: 'Changed by: Anand Nayak',
      old_data: 'Old data: nayak@pabbly.com',
      new_data: 'New data: nayak.anand@inboxkitten.com',
    },
    {
      date: 'Oct 19, 2024 13:29:22',
      changed_by: 'Changed by: Anand Nayak',
      old_data: 'Old data: nayak.anand@inboxkitten.com',
      new_data: 'New data: hardik@inboxkitten.com',
    },
  ];

  // Handle Old Data copy operations
  const handleCopyOldData = (log) => {
    const value = log.old_data.replace('Old data: ', '');
    navigator.clipboard.writeText(value).catch((err) => console.error('Failed to copy text:', err));
  };

  // Handle New Data copy operations
  const handleCopyNewData = (log) => {
    const value = log.new_data.replace('New data: ', '');
    navigator.clipboard.writeText(value).catch((err) => console.error('Failed to copy text:', err));
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

        {/* serialNumber */}
        <TableCell width={88}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box component="span">
                <Typography
                  sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                >
                  <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                    <span>{serialNumber}</span>
                  </Tooltip>
                </Typography>
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
                <Typography
                  sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                >
                  <Tooltip
                    title={`Variable Created: ${row.createdOn}, (UTC+05:30) Asia/Kolkata`}
                    placement="top"
                    arrow
                  >
                    <span>{row.createdOn}</span>
                  </Tooltip>
                </Typography>
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
                    <Box sx={{ width: 300, gap: 1, alignItems: 'center', display: 'flex' }}>
                      {/* variable Name */}
                      <Tooltip title={`Variable Name: ${row.variableName}`} placement="top" arrow>
                        <Box
                          component="span"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          <Typography
                            component="span"
                            sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                          >
                            {row.variableName}
                          </Typography>
                        </Box>
                      </Tooltip>

                      {/* Copy Icon */}
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
              <Box sx={{ display: 'auto' }}>
                <Box sx={{ width: 350, gap: 1, alignItems: 'center', display: 'flex' }}>
                  {/* variable Data */}
                  <Tooltip title={`Variable Data: ${row.variableData}`} placement="top" arrow>
                    <Box
                      component="span"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                      >
                        <span>{row.variableData}</span>
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Last Updated On */}
        <TableCell width={200} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Box sx={{ whiteSpace: 'nowrap' }} component="span">
              <Typography sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                <Tooltip
                  title={`Last Updated: ${row.updatedAt} (UTC+05:30) Asia/Kolkata`}
                  placement="top"
                  arrow
                >
                  <span>{row.createdAt}</span>
                </Tooltip>
              </Typography>
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

      {/* Menu Table options List */}
      <CustomPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Updates the custom variable." arrow placement="left">
            <MenuItem onClick={handleOpenUpdateDialog} sx={{ color: 'secondary' }}>
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

      {/* Confirm Row Delete Dialog */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        // title={`Do you really want to delete "${row.variableName}"?`}
        title={`Do you really want to delete "${row.variableName.slice(0, 50)}${
          row.variableName.length > 50 ? '...' : ''
        }"?`}
        content="You won't be able to revert this action!"
        action={
          <Button variant="contained" color="error" onClick={handleDeleteVariable}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        }
      />

      {/* Update Row Variables Dialog */}
      <AddUpdateVariablesDialog
        open={isUpdateDialogOpen}
        onClose={handleCloseUpdateDialog}
        title="Update Custom Variable"
        mode="update"
        initialVariableName={row.variableName}
        initialVariableData={row.variableData}
        onSave={({ variableName, variableData }) => {
          console.log('Variable Updated:', { variableName, variableData });
        }}
      />

      {/* View Log Dialog */}
      <ViewLogDialog
        open={isViewLogOpen}
        onClose={handleCloseViewLogDialog}
        headerTitle={`Custom Variable: ${row.variableName}`}
        headerSubTitle="View update log for last 50 changes."
        // View Logs
        logs={logs}
        // Icon Button Tooltip
        oldDataButtonTooltip="Click here to copy the old data of the variable."
        newDataButtonTooltip="Click here to copy the new data of the variable."
        // Copied Snackbar Message
        oldDataCopiedMessage="Old variable data copied!"
        newDataCopiedMessage="New variable data copied!"
        onCopyOldData={handleCopyOldData}
        onCopyNewData={handleCopyNewData}
      />
    </>
  );
}
