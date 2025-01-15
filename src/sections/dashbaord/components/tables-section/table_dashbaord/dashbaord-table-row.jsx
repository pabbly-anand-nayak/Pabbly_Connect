// import { toast } from 'sonner';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import {
//   Box,
//   Stack,
//   Avatar,
//   Button,
//   Tooltip,
//   Divider,
//   TableRow,
//   Checkbox,
//   MenuItem,
//   MenuList,
//   TableCell,
//   IconButton,
//   AvatarGroup,
// } from '@mui/material';

// import { paths } from 'src/routes/paths';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { usePopover, CustomPopover } from 'src/components/custom-popover';
// import ViewLogDialog from 'src/components/custom-viewlog-dialog/custom-viewlog-dialog';

// import { MoveToFolderDialog } from '../../table-option-components/move-to-folder-dialog';
// import { RenameWorkflowDialog } from '../../table-option-components/rename-workflow-dialog';
// import { ShareWorkflowPopover } from '../../not use files/bigcard not use/share-workflow-popover';
// import { AutoReExecutionSettingsDialog } from '../../table-option-components/auto-re-execution-dialog';

// export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow }) {
//   const navigate = useNavigate();
//   const confirm = useBoolean();
//   const popover = usePopover();
//   const confirmStatus = useBoolean();

//   const [renameWorkflowDialogOpen, setRenameWorkflowDialogOpen] = useState(false); // Fixed variable name
//   const [renameDialogOpen, setRenameDialogOpen] = useState(false);
//   const [moveToFolderPopoverOpen, setMoveToFolderPopoverOpen] = useState(false);
//   const [statusToToggle, setStatusToToggle] = useState('');
//   const [sharePopoverOpen, setShareWorkflowPopoverOpen] = useState(false);
//   const [autoreExecutionDialogOpen, setAutoReExecutionOpen] = useState(false);
//   const [isViewLogOpen, setIsViewLogOpen] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [confirmDialogProps, setConfirmDialogProps] = useState({});


//   const logs = [
//     {
//       date: 'Oct 17, 2024 13:05:58',
//       edit_Log: 'Workflow disabled by Super Admin.',
//     },
//     {
//       date: 'Oct 18, 2024 12:59:44',
//       edit_Log: 'Edited by Super Admin:',
//     },
//     {
//       date: 'Oct 19, 2024 13:29:22',
//       edit_Log: 'Edited by hardik@inboxkitten.com:',
//     },
//     {
//       date: 'Oct 19, 2024 13:29:19',
//       edit_Log: 'Edited by Super Admin',
//     },
//     {
//       date: 'Oct 19, 2024 16:13:16',
//       edit_Log: 'Edited by anand.nayak@inboxkitten.com',
//     },
//     {
//       date: 'Oct 19, 2024 13:29:22',
//       edit_Log: 'Edited by hardik@inboxkitten.com',
//     },
//   ];

//   const handleRowClick = () => {
//     navigate(paths.dashboard.workflow);
//   };

//   const handleDelete = async () => {
//     try {
//       await onDeleteRow();
//       toast.success('Successfully deleted the workflow.');
//     } catch (error) {
//       console.error('Delete failed:', error);
//       toast.error('Failed to delete workflow');
//     }
//   };

//   const handleStatusToggle = (newStatus) => {
//     setStatusToToggle(newStatus);

//     if (newStatus === 'active') {
//       toast.success('Your workflow has been successfully enabled.');
//     } else {
//       confirmStatus.onTrue();
//       if (newStatus === 'inactive') {
//         toast.success('Your workflow has been successfully disabled.');
//       } else {
//         confirmStatus.onTrue();
//       }
//     }
//   };

//   const handleOpenConfirmDialog = (action) => {
//     setConfirmDialogProps(action);
//     setConfirmDelete(true);
//     popover.onClose();
//   };

//   // Handler for opening the log dialog
//   const handleOpenViewLogPopoverDialog = () => {
//     setIsViewLogOpen(true);
//     popover.onClose();
//   };

//   const handleCloseConfirmDelete = () => {
//     setConfirmDelete(false);
//   };

//   return (
//     <>
//       <TableRow hover selected={selected} sx={{ cursor: 'pointer' }} onClick={handleRowClick}>

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

//         {/* Status */}
//         <TableCell width={288}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//               <Tooltip title={`Workflow is ${row.status}.`} placement="top" arrow>
//                 <Label
//                   variant="soft"
//                   color={
//                     (row.status === 'active' && 'success') ||
//                     (row.status === 'inactive' && 'error') ||
//                     'default'
//                   }
//                 >
//                   {row.status}
//                 </Label>
//               </Tooltip>
//               <Tooltip
//                 title={`Workflow Created: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
//                 placement="bottom"
//                 arrow
//               >
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

//         {/* Application icon */}
//         <TableCell width={137}>
//           <Stack spacing={3} direction="row" alignItems="center">
//             <Tooltip title="Integrated applications" placement="top" arrow>
//               <AvatarGroup variant="rounded">
//                 <Avatar
//                   alt="app1"
//                   sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
//                   src={row.icon1}
//                 />
//                 <Avatar
//                   alt="app2"
//                   sx={{
//                     padding: 1,
//                     width: '24px',
//                     height: '24px',
//                     backgroundColor: '#EDEFF2',
//                     // bgcolor: 'background.neutral',
//                   }}
//                   src={row.icon2}
//                 />
//                 <Avatar
//                   alt="+4"
//                   sx={{
//                     padding: 1,
//                     width: '24px',
//                     height: '24px',
//                     backgroundColor: '#EDEFF2',
//                     color: '#078dee',
//                     fontWeight: '900',
//                   }}
//                 >
//                   {row.appNumbers}
//                 </Avatar>
//               </AvatarGroup>
//             </Tooltip>
//           </Stack>
//         </TableCell>

//         {/* Workflow & Folder name */}
//         <TableCell>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack
//               sx={{
//                 typography: 'body2',
//                 flex: '1 1 auto',
//                 alignItems: 'flex-start',
//               }}
//             >
//               {['workflowName', 'folderName'].map((key, index) => (
//                 <Tooltip
//                   key={key}
//                   title={`${key === 'workflowName' ? 'Workflow Name' : 'Folder Name'}: ${row[key]}`}
//                   placement={key === 'workflowName' ? 'top' : 'bottom'}
//                   arrow
//                 >
//                   <Box
//                     component="span"
//                     sx={{
//                       color: key === 'workflowName' ? '#078dee' : 'text.disabled',
//                       maxWidth: {
//                         xs: '270px', // Extra small screens
//                         sm: '270px', // Small screens
//                         md: '270px', // Medium screens
//                         lg: '350px', // Large screens
//                         xl: '400px', // Extra large screens
//                       },
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       display: 'inline-block',
//                     }}
//                   >
//                     <span>{row[key]}</span>
//                   </Box>
//                 </Tooltip>
//               ))}
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Tasks consumed */}
//         <TableCell width={280}>
//           <Stack spacing={2} direction="row" alignItems="center">
//             <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//               <Tooltip title="Number of tasks consumed in the last 30 days. We do not count trigger steps and internal application steps in your task consumption. We only count tasks when a action is done in an external software. For Example: Add a new row inside Google Sheets.." placement="top" arrow>
//                 <Box sx={{ width: 185, whiteSpace: 'nowrap' }} component="span">
//                   {row.totalQuantity} Tasks Consumed
//                 </Box>
//               </Tooltip>
//               <Tooltip title="Pabbly Connect does not charge tasks for triggers and internal application steps. You're saving 50% on task usage by using Pabbly Connect." placement="bottom" arrow>
//                 <Box component="span" sx={{ color: 'text.disabled' }}>
//                   {row.freeTasksConsumed} Free Tasks Consumed
//                 </Box>
//               </Tooltip>
//             </Stack>
//           </Stack>
//         </TableCell>

//         {/* Options */}
//         <TableCell
//           align="right"
//           sx={{ px: 1, whiteSpace: 'nowrap' }}
//           onClick={(e) => e.stopPropagation()}
//         >
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
//           {/* MenuList items remain the same, but onClick handlers now use toast */}
//           {row.status === 'active' ? (
//             <Tooltip title="Inactive the workflow status." arrow placement="left">
//               <MenuItem
//                 onClick={() => {
//                   handleStatusToggle('inactive');
//                   popover.onClose();
//                 }}
//               >
//                 <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
//                 Inactive Workflow
//               </MenuItem>
//             </Tooltip>
//           ) : (
//             <Tooltip title="Active the workflow status." arrow placement="left">
//               <MenuItem
//                 onClick={() => {
//                   handleStatusToggle('active');
//                   popover.onClose();
//                 }}
//               >
//                 <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
//                 Active Workflow
//               </MenuItem>
//             </Tooltip>
//           )}


//           {/* Workflow History */}
//           <Tooltip title="Edit the workflow." arrow placement="left">
//             <MenuItem
//               component="a"
//               href={paths.dashboard.workflow}
//               onClick={() => {
//                 confirm.onTrue();
//                 popover.onClose();
//               }}
//               sx={{ color: 'secondary' }}
//             >
//               <Iconify icon="solar:pen-bold" />
//               Edit Workflow
//             </MenuItem>
//           </Tooltip>

//           {/* Rename Workflow */}
//           <Tooltip title="Change the workflow name." arrow placement="left">
//             <MenuItem
//               onClick={() => {
//                 setRenameWorkflowDialogOpen(true); // Open the Auto Re-Execution dialog
//                 popover.onClose();
//               }}
//               sx={{ color: 'secondary' }}
//             >
//               <Iconify icon="fluent:rename-16-filled" />
//               Rename
//             </MenuItem>
//           </Tooltip>

//           {/* Clone MenuItem with toast */}
//           <Tooltip title="Create a duplicate of the workflow." arrow placement="left">
//             <MenuItem
//               onClick={() => {
//                 toast.success('Workflow Clone Successfully.');
//                 popover.onClose();
//               }}
//               sx={{ color: 'secondary' }}
//             >
//               <Iconify icon="heroicons-solid:duplicate" />
//               Clone
//             </MenuItem>
//           </Tooltip>

//           {/* Share */}
//           <Tooltip title="Share the workflow with others via a link." arrow placement="left">
//             <MenuItem
//               onClick={() => {
//                 setShareWorkflowPopoverOpen(true);
//                 popover.onClose();
//               }}
//               sx={{ color: 'secondary' }}
//             >
//               <Iconify icon="jam:share-alt-f" />
//               Share
//             </MenuItem>
//           </Tooltip>

//           {/* Add Team Members */}
//           <Tooltip title="Add team members for collaborative editing." arrow placement="left">
//             <MenuItem
//               component="a"
//               href={paths.dashboard.setting.root}
//               onClick={() => {
//                 confirm.onTrue();
//                 popover.onClose();
//               }}
//               sx={{ color: 'secondary' }}
//             >
//               <Iconify icon="fluent:people-team-add-24-filled" />
//               Add Team Members
//             </MenuItem>
//           </Tooltip>

//           {/* Move To Folder */}
//           <Tooltip title="Move the workflow to an existing folder." arrow placement="left">
//             <MenuItem
//               onClick={() => {
//                 setMoveToFolderPopoverOpen(true); // Open the Auto Re-Execution dialog
//                 popover.onClose();
//               }}
//               sx={{ color: 'secondary' }}
//             >
//               <Iconify icon="fluent:folder-move-16-filled" />
//               Move To Folder
//             </MenuItem>
//           </Tooltip>

//           {/* Workflow History */}
//           <Tooltip title="View the workflow's execution history." arrow placement="left">
//             <MenuItem
//               component="a"
//               href={paths.dashboard.history.root}
//               onClick={() => {
//                 confirm.onTrue();
//                 popover.onClose();
//               }}
//               sx={{ color: 'secondary' }}
//             >
//               <Iconify icon="mdi:clipboard-text-history" />
//               Workflow History
//             </MenuItem>
//           </Tooltip>

//           {/* Edit Log */}
//           <Tooltip title="View the workflow edit logs." arrow placement="left">
//             <MenuItem onClick={handleOpenViewLogPopoverDialog} sx={{ color: 'secondary' }}>
//               <Iconify icon="material-symbols:data-info-alert-rounded" />
//               Edit Log
//             </MenuItem>
//           </Tooltip>

//           {/* Auto Re-Execution Settings */}
//           <Tooltip title="Adjust settings for automatic re-execution." arrow placement="left">
//             <MenuItem
//               onClick={() => {
//                 setAutoReExecutionOpen(true); // Open the Auto Re-Execution dialog
//                 popover.onClose();
//               }}
//               sx={{ color: 'secondary' }}
//             >
//               <Iconify icon="mdi:timer" />
//               Auto Re-Execution Settings
//             </MenuItem>
//           </Tooltip>

//           <Divider style={{ borderStyle: 'dashed' }} />

//           {/* Delete Workflow */}
//           <Tooltip title="Delete the workflow and move it to the trash." arrow placement="left">
//             <MenuItem
//               onClick={() =>
//                 handleOpenConfirmDialog({
//                   onConfirm: () => handleDelete(),
//                 })
//               }
//               sx={{ color: 'error.main' }}
//             >
//               <Iconify icon="solar:trash-bin-trash-bold" />
//               Delete Workflow
//             </MenuItem>
//           </Tooltip>

//         </MenuList>
//       </CustomPopover>

//       {/* View  Edit Log Dialog */}
//       <ViewLogDialog
//         open={isViewLogOpen}
//         onClose={() => setIsViewLogOpen(false)}
//         headerTitle="Workflow Edit Log"
//         headerSubTitle="View workflow edit log for last 30 days."
//         logs={logs}
//       />

//       <RenameWorkflowDialog
//         open={renameWorkflowDialogOpen}
//         onClose={() => setRenameWorkflowDialogOpen(false)}
//         workflowName={row.workflowName} // Add this prop
//       />


//       <MoveToFolderDialog
//         open={moveToFolderPopoverOpen}
//         onClose={() => setMoveToFolderPopoverOpen(false)}
//         folderName={row.folderName} // Pass the current folder name
//       />


//       <ShareWorkflowPopover
//         open={sharePopoverOpen}
//         onClose={() => setShareWorkflowPopoverOpen(false)}
//       />

//       <AutoReExecutionSettingsDialog
//         open={autoreExecutionDialogOpen}
//         onClose={() => setAutoReExecutionOpen(false)}
//       />

//       {/* Confirm Dialog for delete with toast */}
//       <ConfirmDialog
//         open={confirmDelete}
//         onClose={handleCloseConfirmDelete}
//         title="Do you really want to delete it ?"
//         content="Workflow once deleted will be moved to trash folder."
//         action={
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               handleCloseConfirmDelete();
//               toast.success('Successfully deleted the workflow.');
//             }}
//           >
//             Delete
//           </Button>
//         }
//       />

//     </>
//   );
// }


// --------------------------

import { toast } from 'sonner';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Stack,
  Avatar,
  Button,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  MenuItem,
  MenuList,
  TableCell,
  IconButton,
  AvatarGroup,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import ViewLogDialog from 'src/components/custom-viewlog-dialog/custom-viewlog-dialog';

import { ShareWorkflowDialog } from 'src/sections/dashbaord/components/tables-section/hook/share-workflow-dialogs';

import { DashboardDialogs } from '../hook/dashboard-dialogs';


export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const navigate = useNavigate();
  const confirm = useBoolean();
  const popover = usePopover();
  const confirmStatus = useBoolean();

  const [renameWorkflowDialogOpen, setRenameWorkflowDialogOpen] = useState(false); // Fixed variable name
  const [moveToFolderPopoverOpen, setMoveToFolderPopoverOpen] = useState(false);
  const [statusToToggle, setStatusToToggle] = useState('');
  const [sharePopoverOpen, setShareWorkflowPopoverOpen] = useState(false);
  const [autoreExecutionDialogOpen, setAutoReExecutionOpen] = useState(false);
  const [isViewLogOpen, setIsViewLogOpen] = useState(false);

  // Fixed state definitions
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({
    onConfirm: () => { },
  });



  const logs = [
    {
      date: 'Oct 17, 2024 13:05:58',
      edit_Log: 'Workflow disabled by Super Admin.',
    },
    {
      date: 'Oct 18, 2024 12:59:44',
      edit_Log: 'Edited by Super Admin:',
    },
    {
      date: 'Oct 19, 2024 13:29:22',
      edit_Log: 'Edited by hardik@inboxkitten.com:',
    },
    {
      date: 'Oct 19, 2024 13:29:19',
      edit_Log: 'Edited by Super Admin',
    },
    {
      date: 'Oct 19, 2024 16:13:16',
      edit_Log: 'Edited by anand.nayak@inboxkitten.com',
    },
    {
      date: 'Oct 19, 2024 13:29:22',
      edit_Log: 'Edited by hardik@inboxkitten.com',
    },
  ];

  const handleRowClick = () => {
    navigate(paths.dashboard.workflow);
  };

  const handleDelete = async () => {
    try {
      await onDeleteRow();
      toast.success('Successfully deleted the workflow.');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete workflow');
    }
  };

  const handleStatusToggle = (newStatus) => {
    setStatusToToggle(newStatus);

    if (newStatus === 'active') {
      toast.success('Your workflow has been successfully enabled.');
    } else {
      confirmStatus.onTrue();
      if (newStatus === 'inactive') {
        toast.success('Your workflow has been successfully disabled.');
      } else {
        confirmStatus.onTrue();
      }
    }
  };

  const handleOpenConfirmDialog = (action) => {
    setConfirmDialogProps(action);
    setConfirmDelete(true);
    popover.onClose();
  };

  // Handler for opening the log dialog
  const handleOpenViewLogPopoverDialog = () => {
    setIsViewLogOpen(true);
    popover.onClose();
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };



  return (
    <>
      <TableRow hover selected={selected} sx={{ cursor: 'pointer' }} onClick={handleRowClick}>

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

        {/* Status */}
        <TableCell width={288}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Tooltip title={`Workflow is ${row.status}.`} placement="top" arrow>
                <Label
                  variant="soft"
                  color={
                    (row.status === 'active' && 'success') ||
                    (row.status === 'inactive' && 'error') ||
                    'default'
                  }
                >
                  {row.status}
                </Label>
              </Tooltip>
              <Tooltip
                title={`Workflow Created: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
                placement="bottom"
                arrow
              >
                <Box
                  sx={{ width: 145, whiteSpace: 'nowrap', color: 'text.disabled' }}
                  component="span"
                >
                  {row.createdAt}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Application icon */}
        <TableCell width={137}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Tooltip title="Integrated applications" placement="top" arrow>
              <AvatarGroup variant="rounded">
                <Avatar
                  alt="app1"
                  sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
                  src={row.icon1}
                />
                <Avatar
                  alt="app2"
                  sx={{
                    padding: 1,
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#EDEFF2',
                    // bgcolor: 'background.neutral',
                  }}
                  src={row.icon2}
                />
                <Avatar
                  alt="+4"
                  sx={{
                    padding: 1,
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#EDEFF2',
                    color: '#078dee',
                    fontWeight: '900',
                  }}
                >
                  {row.appNumbers}
                </Avatar>
              </AvatarGroup>
            </Tooltip>
          </Stack>
        </TableCell>

        {/* Workflow & Folder name */}
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              {['workflowName', 'folderName'].map((key, index) => (
                <Tooltip
                  key={key}
                  title={`${key === 'workflowName' ? 'Workflow Name' : 'Folder Name'}: ${row[key]}`}
                  placement={key === 'workflowName' ? 'top' : 'bottom'}
                  arrow
                >
                  <Box
                    component="span"
                    sx={{
                      color: key === 'workflowName' ? '#078dee' : 'text.disabled',
                      maxWidth: {
                        xs: '270px', // Extra small screens
                        sm: '270px', // Small screens
                        md: '270px', // Medium screens
                        lg: '350px', // Large screens
                        xl: '400px', // Extra large screens
                      },
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'inline-block',
                    }}
                  >
                    <span>{row[key]}</span>
                  </Box>
                </Tooltip>
              ))}
            </Stack>
          </Stack>
        </TableCell>

        {/* Tasks consumed */}
        <TableCell width={280}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Tooltip title="Number of tasks consumed in the last 30 days. We do not count trigger steps and internal application steps in your task consumption. We only count tasks when a action is done in an external software. For Example: Add a new row inside Google Sheets.." placement="top" arrow>
                <Box sx={{ width: 185, whiteSpace: 'nowrap' }} component="span">
                  {row.totalQuantity} Tasks Consumed
                </Box>
              </Tooltip>
              <Tooltip title="Pabbly Connect does not charge tasks for triggers and internal application steps. You're saving 50% on task usage by using Pabbly Connect." placement="bottom" arrow>
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  {row.freeTasksConsumed} Free Tasks Consumed
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Options */}
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
          {/* MenuList items remain the same, but onClick handlers now use toast */}
          {row.status === 'active' ? (
            <Tooltip title="Inactive the workflow status." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('inactive');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
                Inactive Workflow
              </MenuItem>
            </Tooltip>
          ) : (
            <Tooltip title="Active the workflow status." arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('active');
                  popover.onClose();
                }}
              >
                <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
                Active Workflow
              </MenuItem>
            </Tooltip>
          )}


          {/* Workflow History */}
          <Tooltip title="Edit the workflow." arrow placement="left">
            <MenuItem
              component="a"
              href={paths.dashboard.workflow}
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="solar:pen-bold" />
              Edit Workflow
            </MenuItem>
          </Tooltip>

          {/* Rename Workflow */}
          <Tooltip title="Change the workflow name." arrow placement="left">
            <MenuItem
              onClick={() => {
                setRenameWorkflowDialogOpen(true); // Open the Auto Re-Execution dialog
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="fluent:rename-16-filled" />
              Rename
            </MenuItem>
          </Tooltip>

          {/* Clone MenuItem with toast */}
          <Tooltip title="Create a duplicate of the workflow." arrow placement="left">
            <MenuItem
              onClick={() => {
                toast.success('Workflow Clone Successfully.');
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="heroicons-solid:duplicate" />
              Clone
            </MenuItem>
          </Tooltip>

          {/* Share */}
          <Tooltip title="Share the workflow with others via a link." arrow placement="left">
            <MenuItem
              onClick={() => {
                setShareWorkflowPopoverOpen(true);
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="jam:share-alt-f" />
              Share
            </MenuItem>
          </Tooltip>

          {/* Add Team Members */}
          <Tooltip title="Add team members for collaborative editing." arrow placement="left">
            <MenuItem
              component="a"
              href={paths.dashboard.setting.root}
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="fluent:people-team-add-24-filled" />
              Add Team Members
            </MenuItem>
          </Tooltip>

          {/* Move To Folder */}
          <Tooltip title="Move the workflow to an existing folder." arrow placement="left">
            <MenuItem
              onClick={() => {
                setMoveToFolderPopoverOpen(true); // Open the Auto Re-Execution dialog
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="fluent:folder-move-16-filled" />
              Move To Folder
            </MenuItem>
          </Tooltip>

          {/* Workflow History */}
          <Tooltip title="View the workflow's execution history." arrow placement="left">
            <MenuItem
              component="a"
              href={paths.dashboard.history.root}
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="mdi:clipboard-text-history" />
              Workflow History
            </MenuItem>
          </Tooltip>

          {/* Edit Log */}
          <Tooltip title="View the workflow edit logs." arrow placement="left">
            <MenuItem onClick={handleOpenViewLogPopoverDialog} sx={{ color: 'secondary' }}>
              <Iconify icon="material-symbols:data-info-alert-rounded" />
              Edit Log
            </MenuItem>
          </Tooltip>

          {/* Auto Re-Execution Settings */}
          <Tooltip title="Adjust settings for automatic re-execution." arrow placement="left">
            <MenuItem
              onClick={() => {
                setAutoReExecutionOpen(true); // Open the Auto Re-Execution dialog
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="mdi:timer" />
              Auto Re-Execution Settings
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />

          {/* Delete Workflow */}
          <Tooltip title="Delete the workflow and move it to the trash." arrow placement="left">
            <MenuItem
              onClick={() =>
                handleOpenConfirmDialog({
                  onConfirm: () => handleDelete(),
                })
              }
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete Workflow
            </MenuItem>
          </Tooltip>

        </MenuList>
      </CustomPopover>

      <DashboardDialogs
        type="rename"
        open={renameWorkflowDialogOpen}
        onClose={() => setRenameWorkflowDialogOpen(false)}
        initialName={row.workflowName}
      />

      <DashboardDialogs
        type="move"
        open={moveToFolderPopoverOpen}
        onClose={() => setMoveToFolderPopoverOpen(false)}
        initialFolder={row.folderName}
      />

      <DashboardDialogs
        type="autoReExecution"
        open={autoreExecutionDialogOpen}
        onClose={() => setAutoReExecutionOpen(false)}
      />


      {/* View  Edit Log Dialog */}
      <ViewLogDialog
        open={isViewLogOpen}
        onClose={() => setIsViewLogOpen(false)}
        headerTitle="Workflow Edit Log"
        headerSubTitle="View workflow edit log for last 30 days."
        logs={logs}
      />

      <ShareWorkflowDialog
        open={sharePopoverOpen}
        onClose={() => setShareWorkflowPopoverOpen(false)}
      />


      {/* Confirm Dialog for delete with toast */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you really want to delete it ?"
        content="Workflow once deleted will be moved to trash folder."
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCloseConfirmDelete();
              toast.success('Successfully deleted the workflow.');
            }}
          >
            Delete
          </Button>
        }
      />

    </>
  );
}
