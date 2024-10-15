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
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { CustomPopover } from 'src/components/custom-popover';

// import { AssignTasksDialog } from '../update-assign-tasks-dailog';
// import { ViewLogAgencyPopover } from '../../../page-variables/hook/view_log_popover';

// export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
//   const theme = useTheme();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);
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

//   const handleCloseConfirmDelete = () => {
//     setConfirmDelete(false);
//   };

//   const handleOpenViewLogAgencyPopoverDialog = () => {
//     setLogPopoverOpen(true);
//     handleClosePopover();
//   };

//   const handleCloseViewLogAgencyPopoverDialog = () => {
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
//   return (
//     <>
//       <TableRow hover selected={selected}>
//         {/* Checkbox */}
//         <TableCell padding="checkbox">
//           <Tooltip title="Select this row" arrow placement="top">
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
//               <Box component="span">{serialNumber}</Box>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Date */}
//         <TableCell width={288}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//               <Tooltip title={`Assigned On ${row.createdAt}`} placement="top" arrow>
//                 <Box
//                   sx={{ width: 145, whiteSpace: 'nowrap', color: 'text.disabled' }}
//                   component="span"
//                 >
//                   {row.createdAt}
//                 </Box>
//               </Tooltip>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Email */}
//         <TableCell width={200}>
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
//               <Tooltip title={`Assigned to ${row.workflowName}`} placement="top" arrow>
//                 <Box
//                   component="span"
//                   sx={{
//                     width: 400,
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                   }}
//                 >
//                   {row.workflowName}
//                 </Box>
//               </Tooltip>
//               {/* <Tooltip title="Folder Name: Home" placement="bottom" arrow>
//                 <Box component="span" sx={{ color: 'text.disabled' }}>
//                   Home
//                 </Box>
//               </Tooltip> */}
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Status */}
//         {/* <TableCell width={288}>
//         <Stack spacing={2} direction="row" alignItems="center">
//           <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//             <Tooltip title={`Task type ${row.status}`} placement="top" arrow>
//               <Label
//                 variant="soft"
//                 color={
//                   (row.status === 'revocable' && 'success') ||
//                   (row.status === 'non-revocable' && 'error') ||
//                   'default'
//                 }
//               >
//                 {row.status === 'revocable' ? 'Revocable' : 'Non-Revocable'}
//               </Label>
//             </Tooltip>
//           </Stack>
//         </Stack>
//       </TableCell> */}

//         {/* Tasks Assigned */}
//         {/* Tasks Assigned */}
//         <TableCell width={300} align="right">
//           <Stack spacing={1} direction="column" alignItems="flex-end">
//             <Tooltip
//               title="This indicates the total number of tasks assigned"
//               placement="top"
//               arrow
//             >
//               <Box sx={{ whiteSpace: 'nowrap' }} component="span">
//                 {Intl.NumberFormat().format(row.totalQuantity * 300)}
//               </Box>
//             </Tooltip>
//           </Stack>
//         </TableCell>

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
//           <MenuItem onClick={handleOpenUpdateVariablesDialog} sx={{ color: 'secondary' }}>
//             <Iconify icon="material-symbols:settings-b-roll-rounded" />
//             Update
//           </MenuItem>
//           <MenuItem onClick={handleOpenViewLogAgencyPopoverDialog} sx={{ color: 'secondary' }}>
//             <Iconify icon="material-symbols:data-info-alert-rounded" />
//             View Log
//           </MenuItem>

//           <Divider style={{ borderStyle: 'dashed' }} />
//           <Tooltip title="This will delete the workflow." arrow placement="left">
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
//         title="Do you want to remove tasks assigned?"
//         content="You won’t be able to revert this!"
//         action={
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               onDeleteRow();
//               handleCloseConfirmDelete();
//             }}
//           >
//             Delete
//           </Button>
//         }
//       />

//       <AssignTasksDialog
//         open={dialogOpen}
//         onClose={handleCloseUpdateVariablesDialog}
//         title="Update Variables"
//         content="Provide details for the variable"
//         variableName={row.variableName}
//         variableData={row.variableData}
//       />

//       <ViewLogAgencyPopover
//         open={logPopoverOpen}
//         onClose={handleCloseViewLogAgencyPopoverDialog}
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

import { AssignTasksDialog } from '../update-assign-tasks-dailog';
import { ViewLogAgencyPopover } from '../view_log_agency_popover';

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

  const handleOpenViewLogAgencyPopoverDialog = () => {
    setLogPopoverOpen(true);
    handleClosePopover();
  };

  const handleCloseViewLogAgencyPopoverDialog = () => {
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
      <TableRow hover selected={selected}>
        {/* Checkbox */}
        <TableCell padding="checkbox">
          <Tooltip title="Select this row" arrow placement="top">
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
              <Box
                sx={{ width: 145, whiteSpace: 'nowrap', color: 'text.disabled' }}
                component="span"
              >
                <Tooltip title={`Assigned On ${row.createdAt}`} placement="top" arrow>
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

        {/* Tasks Assigned */}
        <TableCell width={300} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Tooltip
              title="This indicates the total number of tasks assigned"
              placement="top"
              arrow
            >
              <Box sx={{ whiteSpace: 'nowrap' }} component="span">
                {Intl.NumberFormat().format(10000)}
              </Box>
            </Tooltip>
          </Stack>
        </TableCell>

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
          <MenuItem onClick={handleOpenUpdateVariablesDialog} sx={{ color: 'secondary' }}>
            <Iconify icon="material-symbols:settings-b-roll-rounded" />
            Update
          </MenuItem>
          <MenuItem onClick={handleOpenViewLogAgencyPopoverDialog} sx={{ color: 'secondary' }}>
            <Iconify icon="material-symbols:data-info-alert-rounded" />
            View Log
          </MenuItem>
          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="This will delete the workflow." arrow placement="left">
            <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Revoke Access
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you want to remove tasks assigned?"
        content="You won’t be able to revert this!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirmDelete();
            }}
          >
            Revoke Access
          </Button>
        }
      />

      <AssignTasksDialog
        open={dialogOpen}
        onClose={handleCloseUpdateVariablesDialog}
        rowData={row} // Pass the row data here
      />

      <ViewLogAgencyPopover open={logPopoverOpen} onClose={handleCloseViewLogAgencyPopoverDialog} />

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
