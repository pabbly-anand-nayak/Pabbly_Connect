// import React, { useState } from 'react';

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
//   useTheme,
//   TableCell,
//   IconButton,
// } from '@mui/material';

// import { popover } from 'src/theme/core/components/popover';

// import { Iconify } from 'src/components/iconify';
// import { CustomPopover } from 'src/components/custom-popover';

// import { ConfirmDialog } from '../custom-dialog';
// import { ViewLogPopover } from '../hook/view_log_popover';
// import { AddUpdateVariablesDialog } from '../hook/add-update-variables-dailog';

// export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
//   const theme = useTheme();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [logPopoverOpen, setLogPopoverOpen] = useState(false);

//   const handleOpenPopover = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClosePopover = () => {
//     setAnchorEl(null);
//   };

//   const handleOpenUpdateVariablesDialog = () => {
//     setDialogOpen(true);
//     handleClosePopover();
//   };

//   const handleCloseUpdateVariablesDialog = () => {
//     setDialogOpen(false);
//   };

//   const handleOpenConfirmDelete = () => {
//     setConfirmDelete(true);
//     handleClosePopover();
//   };

//   const handleOpenViewLogPopoverDialog = () => {
//     setLogPopoverOpen(true);
//     handleClosePopover();
//   };

//   const handleCloseViewLogPopoverDialog = () => {
//     setLogPopoverOpen(false);
//   };

//   const handleCopyClick = () => {
//     setSnackbarMessage('Custom variable Copied Successfully!');
//     setSnackbarOpen(true);
//     popover.onOpen();
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbarOpen(false);
//   };

//   /* Delete Success Snackbar */

//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [confirmDialogProps, setConfirmDialogProps] = useState({});

//   const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

//   // Dialog States for AddUpdateVariablesDialog
//   const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

//   const handleOpenUpdateDialog = () => {
//     setUpdateDialogOpen(true);
//     handleClosePopover();
//   };

//   const handleCloseUpdateDialog = () => {
//     setUpdateDialogOpen(false);
//   };

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
//                 <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
//                   {serialNumber}
//                 </Tooltip>
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
//                 <Tooltip
//                   title={`Variable Created: ${row.createdOn}, (UTC+05:30) Asia/Kolkata`}
//                   placement="top"
//                   arrow
//                 >
//                   {row.createdOn}
//                 </Tooltip>
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
//                     <Box sx={{ gap: 1, alignItems: 'center', display: 'flex' }}>
//                       <Tooltip title={`Variable Name: ${row.variableName}`} placement="top" arrow>
//                         {row.variableName}
//                       </Tooltip>
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
//               <Box
//                 component="span"
//                 sx={{
//                   width: 200,
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 <Tooltip title={`Variable Data: ${row.variableData}`} placement="top" arrow>
//                   {row.variableData}
//                 </Tooltip>
//               </Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         <TableCell width={200} align="right">
//           <Stack spacing={1} direction="column" alignItems="flex-end">
//             <Box sx={{ whiteSpace: 'nowrap' }} component="span">
//               <Tooltip
//                 title={`Last Updated: ${row.updatedAt} (UTC+05:30) Asia/Kolkata`}
//                 placement="top"
//                 arrow
//               >
//                 {row.createdAt}
//               </Tooltip>
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

//       <ConfirmDialog
//         open={confirmDelete}
//         onClose={handleCloseConfirmDelete}
//         title={`Do you really want to delete ${row.variableName} ?`}
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
//           Variable deleted successfully!
//         </Alert>
//       </Snackbar>

//       <AddUpdateVariablesDialog
//         open={isUpdateDialogOpen}
//         onClose={handleCloseUpdateDialog}
//         title="Update Custom Variable"
//         mode="update"
//         initialVariableName="existingVariableName"
//         initialVariableData="existingVariableData"
//         onSave={({ variableName, variableData }) => {
//           console.log('Variable Updated:', { variableName, variableData });
//         }}
//       />

//       <ViewLogPopover
//         open={logPopoverOpen}
//         onClose={handleCloseViewLogPopoverDialog}
//         // title="Edit Log"
//         variableName={row.variableName} // Pass the variable name here
//       />

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={5000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{ boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)', mt: 13 }}
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
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

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
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

import { AddUpdateVariablesDialog } from '../hook/add-update-variables-dailog';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

  const handleCopyClick = () => {
    // Wrap the variable name with {{ and }}
    const formattedText = `{{${row.variableName}}}`;

    navigator.clipboard
      .writeText(formattedText) // Copy the formatted variable name to the clipboard
      .then(() => {
        setSnackbarMessage('Variable name copied to clipboard!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage('Failed to copy variable name.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  /* Delete Success Snackbar */

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [setConfirmDialogProps] = useState({});

  // Dialog States for AddUpdateVariablesDialog
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleOpenUpdateDialog = () => {
    setUpdateDialogOpen(true);
    handleClosePopover();
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

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

  // Example logs data - {date:, changed_by: , old_data:, new_data:, },
  const logs = [
    {
      date: 'Oct 17, 2024 13:05:58',
      // edit_Log: 'Workflow enabled by Anand Nayak.',
      changed_by: 'Changed by: Anand Nayak',
      old_data: 'Old data: yy/mm/dd',
      new_data: 'New data: dd/mm/yy',
    },
    {
      date: 'Oct 18, 2024 12:59:44',
      edit_Log: 'Workflow enabled by Anand Nayak.',

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
    // Add more logs as needed
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
                    {serialNumber}
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
                    {row.createdOn}
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
                      <Tooltip title={`Variable Data: ${row.variableName}`} placement="top" arrow>
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
                        {row.variableData}
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
                  {row.createdAt}
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
      <CustomPopover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClosePopover}>
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

      {/* Confirm Row Deiete Dialog */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        // title={`Do you really want to delete ${row.variableName} ?`}
        title={`Do you really want to delete "${row.variableName.slice(0, 50)}${row.variableName.length > 50 ? '...' : ''}"?`}
        content="You won't be able to revert this action!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // Add your revoke tasks logic here
              handleCloseConfirmDelete(); // Close the dialog after revoking tasks
              setSnackbarMessage('Variable deleted successfully!');
              setSnackbarSeverity('success');
              setSnackbarOpen(true);
            }}
            disabled={isLoading}
          >
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
        initialVariableName="existingVariableName"
        initialVariableData="existingVariableData"
        onSave={({ variableName, variableData }) => {
          console.log('Variable Updated:', { variableName, variableData });
        }}
      />

      {/* View Log Dailog */}
      <ViewLogDialog
        open={isViewLogOpen}
        onClose={handleCloseViewLogDialog}
        // header title & sub title
        headerTitle={`Custom Variable: ${row.variableName}`}
        headerSubTitle="View update log for last 50 changes."
        // Define logs data - {date:, changed_by: , old_data:, new_data:, },
        logs={logs}
        onCopyOldData={handleCopyOldData}
        onCopyNewData={handleCopyNewData}
        // Optional customizations
        editedBy="View update log for last 50 changes."
        oldDataButtonTooltip="Click here to copy the old data of the variable."
        newDataButtonTooltip="Click here to copy the new data of the variable."
        // Custom Snackbar messages
        oldDataCopiedMessage="Old variable data copied!"
        newDataCopiedMessage="New variable data copied!"
        snackbarSeverity="success"
        // close Button Text, variant, color
        closeButtonText="Close"
        closeButtonVariant="contained"
        closeButtonColor="primary"
      />

      {/* variable Copied Snackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
}
