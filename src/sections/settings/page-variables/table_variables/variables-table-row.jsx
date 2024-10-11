// import React from 'react';

// import {
//   Box,
//   Stack,
//   Tooltip,
//   TableRow,
//   Checkbox,
//   TableCell,
//   IconButton,
//   MenuList,
//   MenuItem,
//   Divider,
// } from '@mui/material';
// import { Iconify } from 'src/components/iconify';
// import { popover } from 'src/theme/core/components/popover';
// import { CustomPopover } from 'src/components/custom-popover';

// export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
//   const handleOpenUpdateAppDrawer = () => {
//     popover.onClose(); // Close the popover when opening the UpdateAppDrawer
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

//         {/*  Variable Name */}
//         <TableCell width={300}>
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
//                     width: 300,
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

//         {/* Variable Data */}
//         <TableCell width={400}>
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
//                     width: 200,
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

//         {/* Created On */}
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
//               <Tooltip title={`Assigned to ${row.createdOn}`} placement="top" arrow>
//                 <Box
//                   component="span"
//                   sx={{
//                     width: 400,
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                   }}
//                 >
//                   {row.createdOn}
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

//         {/* Last Updated On */}
//         <TableCell width={200} align="right">
//           <Stack spacing={1} direction="column" alignItems="flex-end">
//             <Tooltip
//               title="This indicates the total number of tasks assigned"
//               placement="top"
//               arrow
//             >
//               <Box sx={{ whiteSpace: 'nowrap' }} component="span">
//                 {row.createdAt}
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
//           <MenuItem
//             // onClick={handleOpenUpdateAppDrawer}
//             sx={{ color: 'secondary' }}
//           >
//             <Iconify icon="material-symbols:settings-b-roll-rounded" />
//             Update
//           </MenuItem>

//           <MenuItem
//             // onClick={handleOpenUpdateAppDrawer}
//             sx={{ color: 'secondary' }}
//           >
//             <Iconify icon="material-symbols:settings-b-roll-rounded" />
//             View Log
//           </MenuItem>

//           <Divider style={{ borderStyle: 'dashed' }} />

//           <Tooltip title="This will delete the workflow." arrow placement="left">
//             <MenuItem
//               onClick={() => {
//                 // confirmDelete.onTrue();
//                 popover.onClose();
//               }}
//               sx={{ color: 'error.main' }}
//             >
//               <Iconify icon="solar:trash-bin-trash-bold" />
//               Delete
//             </MenuItem>
//           </Tooltip>
//         </MenuList>
//       </CustomPopover>
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
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

import { ConfirmDialog } from '../custom-dialog';
import { UpdateVariablesDialog } from '../hook/update-variables-dailog';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false); // State for ConfirmDialog visibility

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
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span">{serialNumber}</Box>
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
              <Tooltip title={`Assigned to ${row.workflowName}`} placement="top" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 300,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.workflowName}
                </Box>
              </Tooltip>
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
              <Tooltip title={`Assigned to ${row.workflowName}`} placement="top" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 200,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.workflowName}
                </Box>
              </Tooltip>
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
              <Tooltip title={`Assigned to ${row.createdOn}`} placement="top" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 400,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.createdOn}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Last Updated On */}
        <TableCell width={200} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Tooltip
              title="This indicates the total number of tasks assigned"
              placement="top"
              arrow
            >
              <Box sx={{ whiteSpace: 'nowrap' }} component="span">
                {row.createdAt}
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

      <CustomPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem onClick={handleOpenUpdateVariablesDialog} sx={{ color: 'secondary' }}>
            <Iconify icon="material-symbols:settings-b-roll-rounded" />
            Update
          </MenuItem>

          <MenuItem
            // onClick={handleOpenUpdateAppDrawer}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="material-symbols:data-info-alert-rounded" />
            View Log
          </MenuItem>

          <Divider style={{ borderStyle: 'dashed' }} />

          <Tooltip title="This will delete the workflow." arrow placement="left">
            <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      {/* ConfirmDialog Component */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you really want to delete 1853925345?"
        content="You won't be able to revert this action!
"
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

      {/* UpdateVariablesDialog Component */}
      <UpdateVariablesDialog
        open={dialogOpen}
        onClose={handleCloseUpdateVariablesDialog}
        title="Update Variables"
        content="Provide details for the variable"
      />
    </>
  );
}
