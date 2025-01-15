// import React, { useState } from 'react';
// import { useTheme } from '@emotion/react';

// import {
//   Box,
//   Stack,
//   Alert,
//   Button,
//   Popover,
//   Tooltip,
//   MenuItem,
//   MenuList,
//   Snackbar,
//   TextField,
//   Typography,
//   FormControl,
//   Autocomplete,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';
// import { ConfirmDialog } from 'src/components/custom-dialog';

// import { MoveToFolderPopover } from '../options-components/move-to-folder-dailog';

// export function OrderTableToolbar({
//   filters,
//   onResetPage,
//   onClose,
//   filterApplied,
//   handleFilterClick,
//   publish,
//   onChangePublish,
//   numSelected,
// }) {
//   const theme = useTheme();
//   const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
//   const confirm = useBoolean();

//   const isBelow600px = useMediaQuery('(max-width:600px)');
//   const buttonStyle = {
//     fontSize: '15px',
//     height: '48px',
//     textTransform: 'none',
//     // padding: '0 16px',
//     padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
//   };

//   // Snackbar states
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   // Add states for tracking filter selections
//   const [selectedSort, setSelectedSort] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState(null);
//   const [selectedFolder, setSelectedFolder] = useState(null);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [operator, setOperator] = useState('contains');
//   const [filterValue, setFilterValue] = useState('');

//   const sortworkflow = [
//     'Highest to Lowest (Task Consumption)',
//     'Lowest to High (Task Consumption)',
//     'Alphabetically (A to Z)',
//     'Alphabetically (Z to A)',
//   ];
//   const workflowstatus = ['All Statuses', 'Active', 'Inactive'];
//   const folder = [
//     'Pabbly Connect',
//     'Main Folder',
//     '- Child Folder 1 - Subscription Billing',
//     '- Child Folder 2',
//     '-- Grand child 1',
//     '-- Grand child 2',
//     '--- Folder 1',
//     '--- Folder 2',
//     '--- Folder 3',
//     '-- Grand child 3',
//     '- Child Folder 3',
//     '- Child Folder 4',
//     'Pabbly Subscription Billing',
//     'Pabbly Email Marketing',
//     'Pabbly Form Builder',
//     'Pabbly Email Verification',
//     'Pabbly Hook',
//     'Client (A)',
//     '- Child Folder 1 - Subscription Billing',
//     '- Child Folder 2',
//     '-- Grand child 1',
//     '-- Grand child 2',
//     '--- Folder 1',
//     '--- Folder 2',
//     '--- Folder 3',
//     '-- Grand child 3',
//     '- Child Folder 3',
//     '- Child Folder 4',
//   ];

//   const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
//   const handlePopoverClose = () => setAnchorEl(null);

//   const moveFolderPopover = useBoolean(); // For MoveToFolderPopover
//   const [isFilterApplied, setFilterApplied] = useState(false); // Local filter state


//   const handleFilterIconClick = (e) => {
//     e.stopPropagation();
//     if (isFilterApplied) {
//       handleFilterClose();
//       resetFilters(); // This will clear all Autocomplete selections
//       setFilterApplied(false);
//     }
//   };

//   // Check if any filter is selected
//   const hasAnyFilterSelected = Boolean(selectedSort || selectedStatus || selectedFolder);

//   const resetFilters = () => {
//     setSelectedSort(null);
//     setSelectedStatus(null);
//     setSelectedFolder(null);
//     filters.setState({}); // Clear filters
//     setFilterApplied(false); // Remove filter applied state
//     console.log('Filters reset:', {
//       selectedSort,
//       selectedStatus,
//       selectedFolder,
//       filtersState: filters.state,
//     });
//   };

//   const handleFilterButtonClick = (e) => {
//     if (!isFilterApplied || e.target.tagName !== 'svg') {
//       setFilterAnchorEl(e.currentTarget);
//     }
//   };

//   const handleFilterClose = () => {
//     setFilterAnchorEl(null);
//     // Reset all Autocomplete selections if filters weren't applied
//     // if (!isFilterApplied) {
//     //   setSelectedSort(null);
//     //   setSelectedStatus(null);
//     //   setSelectedFolder(null);
//     // }
//   };

//   const handleApplyFilter = () => {
//     filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
//     onResetPage();
//     handleFilterClose();
//     setFilterApplied(true);
//   };

//   const handleFilterName = (event) => {
//     onResetPage(); // Reset the page to page 1 when filtering
//     filters.setState({ name: event.target.value }); // Set the name filter based on the search input
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleWorkflowAction = (action) => {
//     if (action === 'enable') {
//       setSnackbarMessage('Your workflow has been successfully activated.');
//       setSnackbarSeverity('success');
//     } else if (action === 'disable') {
//       setSnackbarMessage('Your workflow has been successfully deactivated.');
//       setSnackbarSeverity('success');
//     }
//     setSnackbarOpen(true);
//   };

//   const [selectedOption, setSelectedOption] = useState('');
//   const [isError, setIsError] = useState(true);

//   const handleAutocompleteChange = (event, value) => {
//     setSelectedOption(value);
//     setIsError(!value); // If no value is selected, set error to true
//   };

//   const handleWorkflowStatus = (status) => {
//     if (status === 'active') {
//       setSnackbarMessage('Your workflow has been successfully enabled.');
//     } else if (status === 'inactive') {
//       setSnackbarMessage('Your workflow has been successfully disabled.');
//     }
//     setSnackbarSeverity('success');
//     setSnackbarOpen(true);
//     handlePopoverClose();
//   };

//   /* Delete Success Snackbar */

//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [confirmDialogProps, setConfirmDialogProps] = useState({});

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
//   };

//   const handleDeleteClick = () => {
//     setConfirmDelete(true);
//     handlePopoverClose();
//   };

//   return (
//     <>
//       <Stack
//         spacing={2}
//         alignItems="center"
//         direction={isBelow600px ? 'column' : 'row'}
//         sx={{ p: 2.5, width: '100%' }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <TextField
//             fullWidth
//             value={filters.state.name}
//             onChange={handleFilterName} // Handle changes for search input
//             placeholder="Search by workflow name..."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <Box
//           sx={{
//             display: 'flex',
//             gap: isBelow600px ? '12px' : '16px',
//             flexDirection: 'row',
//             width: isBelow600px ? '100%' : 'auto',
//             justifyContent: 'flex-end', // Aligns buttons to the right
//           }}
//         >


//           {numSelected > 0 &&
//             (isBelow600px ? (
//               <Tooltip
//                 title="Click here to modify workflows status, or to move and delete workflows."
//                 arrow
//                 placement="top"
//               >
//                 <Button
//                   sx={{
//                     mb: '0px',
//                     p: 1,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     minWidth: 48,
//                   }}
//                   onClick={handlePopoverOpen}
//                   color="primary"
//                 >
//                   <Iconify icon="eva:arrow-ios-downward-fill" />
//                 </Button>
//               </Tooltip>
//             ) : (
//               <Tooltip
//                 title="Click here to modify workflows status, or to move and delete workflows."
//                 arrow
//                 placement="top"
//               >
//                 <Button
//                   endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
//                   onClick={handlePopoverOpen}
//                   color="primary"
//                   sx={{
//                     ...buttonStyle,

//                     p: '16px',
//                     width: '155px',
//                   }}
//                 >
//                   Select Action
//                 </Button>
//               </Tooltip>
//             ))}

//           <Tooltip
//             title={
//               isFilterApplied
//                 ? "Click the 'X' to clear all applied filters."
//                 : 'Filter workflows based on workflow status and folder.'
//             }
//             arrow
//             placement="top"
//           >
//             <Button
//               sx={{
//                 ...buttonStyle,
//                 // width: isBelow600px ? '158px' : '158px',
//                 // width: isBelow600px ? (numSelected > 0 ? '104.34px' : '104.34px') : '104.34px', // Fixed width for "Filters"
//                 width: isFilterApplied ? '156px' : '104.34px', // Changes width based on filter state

//                 // p: isBelow600px ? '0px 8px 0px 8px' : '16px',
//                 position: 'relative',
//                 '& .MuiButton-startIcon': {
//                   pointerEvents: 'auto',
//                   marginRight: '8px',
//                   display: 'flex',
//                 },
//               }}
//               variant={isFilterApplied ? 'contained' : ''}
//               color="primary"
//               startIcon={!isFilterApplied && <Iconify icon="mdi:filter" />}
//               endIcon={
//                 isFilterApplied && (
//                   <Box
//                     component="span"
//                     onClick={handleFilterIconClick}
//                     sx={{
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Iconify
//                       icon="uil:times"
//                       // onClick={handleFilterClose}
//                       style={{
//                         width: 22,
//                         height: 22,
//                         cursor: 'pointer',
//                       }}
//                     />
//                   </Box>
//                 )
//               }
//               onClick={handleFilterButtonClick}
//             >
//               {isFilterApplied ? 'Filter Applied' : 'Filters'}
//             </Button>
//           </Tooltip>
//         </Box>


//       </Stack>


//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={handlePopoverClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//       >
//         <MenuList>
//           {[
//             {
//               value: 'published',
//               label: 'Move Workflow',
//               icon: 'fluent:folder-move-16-filled',
//               action: () => moveFolderPopover.onTrue(),
//             },
//             {
//               value: 'active',
//               label: 'Active Workflow',
//               icon: 'line-md:switch-off-filled-to-switch-filled-transition',
//               action: () => handleWorkflowStatus('active'),
//             },
//             {
//               value: 'inactive',
//               label: 'Inactive Workflow',
//               icon: 'line-md:switch-filled-to-switch-off-filled-transition',
//               action: () => handleWorkflowStatus('inactive'),
//             },
//             {
//               value: 'delete',
//               label: 'Delete Workflow',
//               icon: 'solar:trash-bin-trash-bold',
//               action: handleDeleteClick,
//             },
//           ].map((option) => (
//             <Tooltip
//               key={option.value}
//               title={
//                 option.label === 'Active Workflow'
//                   ? 'Activate the selected workflow status.'
//                   : option.label === 'Inactive Workflow'
//                     ? 'Deactivate the selected workflow status.'
//                     : option.value === 'published'
//                       ? 'Move the workflow to an existing folder.'
//                       : option.value === 'delete'
//                         ? 'Delete the workflow and move it to the trash.'
//                         : ''
//               }
//               arrow
//               placement="left"
//             >
//               <MenuItem onClick={option.action}>
//                 {option.icon && (
//                   <Iconify
//                     icon={option.icon}
//                     width={20}
//                     height={20}
//                     sx={{ mr: 2, color: 'inherit' }}
//                   />
//                 )}
//                 {option.label}
//               </MenuItem>
//             </Tooltip>
//           ))}
//         </MenuList>
//       </Popover>

//       {/* Snackbar for success/error messages */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={4000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{
//           boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//           mt: 7,
//         }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbarSeverity}
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

//       {/* Filter Task Popover */}
//       <Popover
//         open={Boolean(filterAnchorEl)}
//         anchorEl={filterAnchorEl}
//         onClose={handleFilterClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Box
//           sx={{
//             width: {
//               xs: '100%',
//               sm: '100%',
//               md: 650,
//             },
//             flexDirection: {
//               xs: 'column',
//               sm: 'column',
//               md: 'row',
//             },
//           }}
//         >
//           {/* Filter Header */}
//           <Box
//             sx={{
//               borderBottom: '1px dashed #919eab33',
//               p: 2,
//               display: 'flex',
//               height: '100%',
//               width: '100%',
//             }}
//           >
//             <Box sx={{ width: '100%' }}>
//               <Typography variant="h6" sx={{ fontWeight: '600' }}>
//                 <Tooltip
//                   title="Filter workflows based on workflow status and folder."
//                   arrow
//                   placement="top"
//                 >
//                   Filter Task
//                 </Tooltip>
//               </Typography>
//             </Box>
//             <Iconify
//               icon="uil:times"
//               onClick={handleFilterClose}
//               style={{
//                 width: 20,
//                 height: 20,
//                 cursor: 'pointer',
//                 color: '#637381',
//               }}
//             />
//           </Box>

//           {/* Filter Options */}
//           <Box
//             sx={{
//               p: '16px 16px 0px 16px',
//               gap: 2,
//               flexDirection: {
//                 xs: 'column',
//                 sm: 'column',
//                 md: 'row',
//               },
//             }}
//           >
//             {/* Sort Workflow */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: {
//                   xs: 'column',
//                   sm: 'column',
//                   md: 'row',
//                 },
//                 gap: 2,
//                 mb: 2,
//               }}
//             >
//               <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
//                 <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
//                   {' '}
//                   <Tooltip
//                     title="Filter and sort workflows by task count or alphabetical order."
//                     arrow
//                     placement="top"
//                   >
//                     Sort Workflow
//                   </Tooltip>
//                 </Typography>
//               </FormControl>

//               <FormControl
//                 fullWidth
//                 sx={{
//                   mb: { xs: 2, sm: 2, md: 0 },
//                   width: { xs: '100%', sm: '100%', md: '390px' },
//                 }}
//               >
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   fullWidth
//                   label="By"
//                   disabled
//                   size="small"
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
//                 <Autocomplete
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '14px',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '14px',
//                     },
//                   }}
//                   size="small"
//                   options={sortworkflow}
//                   value={selectedSort}
//                   onChange={(event, newValue) => setSelectedSort(newValue)}
//                   renderInput={(params) => <TextField {...params} label="Select" />}
//                   // sx={{ width: 300 }}
//                 />
//               </FormControl>
//             </Box>

//             {/* Workflow Status */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: {
//                   xs: 'column',
//                   sm: 'column',
//                   md: 'row',
//                 },
//                 gap: 2,
//                 mb: 2,
//               }}
//             >
//               <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
//                 <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
//                   <Tooltip
//                     title="Filter workflows by status as active or inactive."
//                     arrow
//                     placement="top"
//                   >
//                     Workflow Status
//                   </Tooltip>
//                 </Typography>
//               </FormControl>

//               <FormControl
//                 fullWidth
//                 sx={{
//                   mb: { xs: 2, sm: 2, md: 0 },
//                   width: { xs: '100%', sm: '100%', md: '390px' },
//                 }}
//               >
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   fullWidth
//                   label="Equals to"
//                   disabled
//                   size="small"
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
//                 <Autocomplete
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '14px',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '14px',
//                     },
//                   }}
//                   size="small"
//                   options={workflowstatus}
//                   value={selectedStatus}
//                   onChange={(event, newValue) => setSelectedStatus(newValue)}
//                   renderInput={(params) => <TextField {...params} label="Select" />}
//                   // sx={{ width: 300 }}
//                 />
//               </FormControl>
//             </Box>

//             {/* Folder */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: {
//                   xs: 'column',
//                   sm: 'column',
//                   md: 'row',
//                 },
//                 gap: 2,
//                 mb: 2,
//               }}
//             >
//               <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
//                 <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
//                   <Tooltip
//                     title=" Filter workflows by selecting a folder to view only the workflows within it."
//                     arrow
//                     placement="top"
//                   >
//                     Folder
//                   </Tooltip>
//                 </Typography>
//               </FormControl>

//               <FormControl
//                 fullWidth
//                 sx={{
//                   mb: { xs: 2, sm: 2, md: 0 },
//                   width: { xs: '100%', sm: '100%', md: '390px' },
//                 }}
//               >
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   fullWidth
//                   label="In"
//                   disabled
//                   size="small"
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
//                 <Autocomplete
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '14px',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '14px',
//                     },
//                   }}
//                   size="small"
//                   options={folder}
//                   value={selectedFolder}
//                   onChange={(event, newValue) => setSelectedFolder(newValue)}
//                   renderInput={(params) => <TextField {...params} label="Select" />}
//                   // sx={{ width: 300 }}
//                 />
//               </FormControl>
//             </Box>
//           </Box>

//           {/* Filter Footer */}
//           <Box
//             sx={{
//               p: 2,
//               gap: 2,
//               display: 'flex',
//               justifyContent: 'flex-end',
//               borderTop: '1px dashed #919eab33',
//             }}
//           >
//             {/* <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
//               Cancel
//             </Button> */}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleApplyFilter}
//               disabled={!hasAnyFilterSelected}
//             >
//               Apply Filter
//             </Button>
//           </Box>
//         </Box>
//       </Popover>

//       {/* Snackbar for success/error messages */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={5000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       {/* Confirm dialog for deletion */}
//       <ConfirmDialog
//         open={confirmDelete}
//         onClose={handleCloseConfirmDelete}
//         title="Do you really want to delete the selected Workflow?"
//         content="Workflow once deleted will be moved to trash folder."
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

//       {/* Success Snackbar */}
//       <Snackbar
//         open={successSnackbarOpen}
//         autoHideDuration={2500}
//         onClose={handleSuccessSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{
//           boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//           mt: 7,
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
//           Workflow moved to trash successfully!{' '}
//         </Alert>
//       </Snackbar>

//       {/* Move to folder popover */}
//       <MoveToFolderPopover
//         open={moveFolderPopover.value}
//         onClose={moveFolderPopover.onFalse}
//         title="Move to Folder"
//         folder={folder}
//       />
//     </>
//   );
// }




// // -----------------------------------------------------------------------


import { toast } from 'sonner';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Popover,
  Tooltip,
  Divider,
  MenuItem,
  MenuList,
  TextField,
  Typography,
  FormControl,
  Autocomplete,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { DashboardDialogs } from 'src/sections/dashbaord/components/tables-section/hook/dashboard-dialogs';



export function OrderTableToolbar({
  filters,
  onResetPage,
  numSelected,
  noWorkflowCreated,
}) {
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));

  const isBelow600px = useMediaQuery('(max-width:600px)');
  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
  };

  // Remove Snackbar states since we're using toast
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn,] = useState('');
  const [filterValue,] = useState('');

  const sortworkflow = [
    'Highest to Lowest (Task Consumption)',
    'Lowest to High (Task Consumption)',
    'Alphabetically (A to Z)',
    'Alphabetically (Z to A)',
  ];
  const workflowstatus = ['All Statuses', 'Active', 'Inactive'];
  const folder = [
    'Pabbly Connect',
    'Main Folder',
    '- Child Folder 1 - Subscription Billing',
    // ... rest of the folder array remains the same
  ];

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const moveFolderPopover = useBoolean();
  const [isFilterApplied, setFilterApplied] = useState(false);

  const handleFilterIconClick = (e) => {
    e.stopPropagation();
    if (isFilterApplied) {
      handleFilterClose();
      resetFilters();
      setFilterApplied(false);
    }
  };

  const hasAnyFilterSelected = Boolean(selectedSort || selectedStatus || selectedFolder);

  const resetFilters = () => {
    setSelectedSort(null);
    setSelectedStatus(null);
    setSelectedFolder(null);
    filters.setState({});
    setFilterApplied(false);
    console.log('Filters reset:', {
      selectedSort,
      selectedStatus,
      selectedFolder,
      filtersState: filters.state,
    });
  };

  const handleFilterButtonClick = (e) => {
    if (!isFilterApplied || e.target.tagName !== 'svg') {
      setFilterAnchorEl(e.currentTarget);
    }
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleApplyFilter = () => {
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
    setFilterApplied(true);
  };

  const handleFilterName = (event) => {
    onResetPage();
    filters.setState({ name: event.target.value });
  };

  const handleWorkflowStatus = (status) => {
    if (status === 'active') {
      toast.success('Your workflow has been successfully enabled.');
    } else if (status === 'inactive') {
      toast.success('Your workflow has been successfully disabled.');
    }
    handlePopoverClose();
  };

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
    handlePopoverClose();
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems="center"
        direction={isBelow600px ? 'column' : 'row'}
        sx={{ p: 2.5, width: '100%' }}
      >
        <Box sx={{ width: '100%' }}>
          <TextField
            disabled={noWorkflowCreated} // Disabled When No Workflow Created!
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName} // Handle changes for search input
            placeholder="Search by workflow name..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: isBelow600px ? '12px' : '16px',
            flexDirection: 'row',
            width: isBelow600px ? '100%' : 'auto',
            justifyContent: 'flex-end', // Aligns buttons to the right
          }}
        >

          {/* Select Action */}
          {numSelected > 0 &&
            (isBelow600px ? (
              <Tooltip
                title="Click here to modify workflows status, or to move and delete workflows."
                arrow
                placement="top"
              >
                <Button
                  sx={{
                    mb: '0px',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: 48,
                  }}
                  onClick={handlePopoverOpen}
                  color="primary"
                >
                  <Iconify icon="eva:arrow-ios-downward-fill" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip
                title="Click here to modify workflows status, or to move and delete workflows."
                arrow
                placement="top"
              >
                <Button
                  endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  onClick={handlePopoverOpen}
                  color="primary"
                  sx={{
                    ...buttonStyle,

                    p: '16px',
                    width: '155px',
                  }}
                >
                  Select Action
                </Button>
              </Tooltip>
            ))}

          {/* Filters Button */}
          <Tooltip
            title={
              isFilterApplied
                ? "Click the 'X' to clear all applied filters."
                : 'Filter workflows based on workflow status and folder.'
            }
            arrow
            placement="top"
          >
            <Button
              disabled={noWorkflowCreated} // Disabled When No Workflow Created!
              sx={{
                ...buttonStyle,
                // width: isBelow600px ? '158px' : '158px',
                // width: isBelow600px ? (numSelected > 0 ? '104.34px' : '104.34px') : '104.34px', // Fixed width for "Filters"
                width: isFilterApplied ? '156px' : '104.34px', // Changes width based on filter state

                // p: isBelow600px ? '0px 8px 0px 8px' : '16px',
                position: 'relative',
                '& .MuiButton-startIcon': {
                  pointerEvents: 'auto',
                  marginRight: '8px',
                  display: 'flex',
                },
              }}
              variant={isFilterApplied ? 'contained' : ''}
              color="primary"
              startIcon={!isFilterApplied && <Iconify icon="mdi:filter" />}
              endIcon={
                isFilterApplied && (
                  <Box
                    component="span"
                    onClick={handleFilterIconClick}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon="uil:times"
                      // onClick={handleFilterClose}
                      style={{
                        width: 22,
                        height: 22,
                        cursor: 'pointer',
                      }}
                    />
                  </Box>
                )
              }
              onClick={handleFilterButtonClick}
            >
              {isFilterApplied ? 'Filter Applied' : 'Filters'}
            </Button>
          </Tooltip>
        </Box>


      </Stack>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >

        <MenuList>
          {/* Move To Folder */}
          <Tooltip title="Move the workflow to an existing folder." arrow placement="left">
            <MenuItem
              onClick={() => {
                moveFolderPopover.onTrue();
                handlePopoverClose(); // Close the Popover when opening the dialog
              }}>
              <Iconify
                icon="fluent:folder-move-16-filled"
                width={20}
                height={20}
                sx={{ mr: 2, color: 'inherit' }}
              />
              Move Workflow
            </MenuItem>
          </Tooltip>

          {/* Workflow Status Controls */}
          <Tooltip title="Activate the selected workflow status." arrow placement="left">
            <MenuItem onClick={() => handleWorkflowStatus('active')}>
              <Iconify
                icon="line-md:switch-off-filled-to-switch-filled-transition"
                width={20}
                height={20}
                sx={{ mr: 2, color: 'inherit' }}
              />
              Active Workflow
            </MenuItem>
          </Tooltip>

          <Tooltip title="Deactivate the selected workflow status." arrow placement="left">
            <MenuItem onClick={() => handleWorkflowStatus('inactive')}>
              <Iconify
                icon="line-md:switch-filled-to-switch-off-filled-transition"
                width={20}
                height={20}
                sx={{ mr: 2, color: 'inherit' }}
              />
              Inactive Workflow
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />

          {/* Delete Workflow */}
          <Tooltip title="Delete the workflow and move it to the trash." arrow placement="left">
            <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
              <Iconify
                icon="solar:trash-bin-trash-bold"
                width={20}
                height={20}
                sx={{ mr: 2, color: 'inherit' }}
              />
              Delete Workflow
            </MenuItem>
          </Tooltip>
        </MenuList>
      </Popover>



      {/* Filter Task Popover */}
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: 650,
            },
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
          }}
        >
          {/* Filter Header */}
          <Box
            sx={{
              borderBottom: '1px dashed #919eab33',
              p: 2,
              display: 'flex',
              height: '100%',
              width: '100%',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: '600' }}>
                <Tooltip
                  title="Filter workflows based on workflow status and folder."
                  arrow
                  placement="top"
                >
                  Filter Task
                </Tooltip>
              </Typography>
            </Box>
            <Iconify
              icon="uil:times"
              onClick={handleFilterClose}
              style={{
                width: 20,
                height: 20,
                cursor: 'pointer',
                color: '#637381',
              }}
            />
          </Box>

          {/* Filter Options */}
          <Box
            sx={{
              p: '16px 16px 0px 16px',
              gap: 2,
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
            }}
          >
            {/* Sort Workflow */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'column',
                  md: 'row',
                },
                gap: 2,
                mb: 2,
              }}
            >
              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  {' '}
                  <Tooltip
                    title="Filter and sort workflows by task count or alphabetical order."
                    arrow
                    placement="top"
                  >
                    Sort Workflow
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  fullWidth
                  label="By"
                  disabled
                  size="small"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={sortworkflow}
                  value={selectedSort}
                  onChange={(event, newValue) => setSelectedSort(newValue)}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            {/* Workflow Status */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'column',
                  md: 'row',
                },
                gap: 2,
                mb: 2,
              }}
            >
              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  <Tooltip
                    title="Filter workflows by status as active or inactive."
                    arrow
                    placement="top"
                  >
                    Workflow Status
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  fullWidth
                  label="Equals to"
                  disabled
                  size="small"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={workflowstatus}
                  value={selectedStatus}
                  onChange={(event, newValue) => setSelectedStatus(newValue)}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            {/* Folder */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'column',
                  md: 'row',
                },
                gap: 2,
                mb: 2,
              }}
            >
              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  <Tooltip
                    title=" Filter workflows by selecting a folder to view only the workflows within it."
                    arrow
                    placement="top"
                  >
                    Folder
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  fullWidth
                  label="In"
                  disabled
                  size="small"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={folder}
                  value={selectedFolder}
                  onChange={(event, newValue) => setSelectedFolder(newValue)}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>
          </Box>

          {/* Filter Footer */}
          <Box
            sx={{
              p: 2,
              gap: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px dashed #919eab33',
            }}
          >
            {/* <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
              Cancel
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilter}
              disabled={!hasAnyFilterSelected}
            >
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Popover>


      {/* Confirm dialog for deletion */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you really want to delete the selected Workflow?"
        content="Workflow once deleted will be moved to trash folder."
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCloseConfirmDelete();
              toast.success('Workflow moved to trash successfully!');
            }}
          >
            Delete
          </Button>
        }
      />

      {/* Move to folder popover */}
      <DashboardDialogs
        type="move"
        open={moveFolderPopover.value}
        onClose={moveFolderPopover.onFalse}
      />
    </>
  );
}