// // import React, { useState } from 'react';
// // import { useTheme } from '@emotion/react';

// // import {
// //   Box,
// //   Stack,
// //   Button,
// //   Popover,
// //   MenuItem,
// //   MenuList,
// //   TextField,
// //   Typography,
// //   FormControl,
// //   useMediaQuery,
// //   InputAdornment,
// //   Tooltip,
// // } from '@mui/material';

// // import { useBoolean } from 'src/hooks/use-boolean';

// // import { Iconify } from 'src/components/iconify';

// // export function OrderTableToolbar({
// //   filters,
// //   onResetPage,
// //   onClose,
// //   dateError,
// //   publish,
// //   onChangePublish,
// //   numSelected,
// // }) {
// //   const theme = useTheme();
// //   const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
// //   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
// //   const confirm = useBoolean();

// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
// //   const [selectedColumn, setSelectedColumn] = useState('');
// //   const [operator, setOperator] = useState('contains');
// //   const [filterValue, setFilterValue] = useState('');
// //   const [VariablesDialogOpen, setVariablesDialogOpen] = useState(false);

// //   const sortworkflow = [
// //     'Highest to Lowest (Task Consumption)',
// //     'Lowest to High (Task Consumption)',
// //     'Alphabetically (A to Z)',
// //     'Alphabetically (Z to A)',
// //   ];
// //   const workflowstatus = ['All Statuses', 'On', 'Off'];
// //   const folder = [
// //     'Pabbly Connect',
// //     'Main Folder',
// //     '- Child Folder 1 - Subscription Billing',
// //     '- Child Folder 2',
// //     '-- Grand child 1',
// //     '-- Grand child 2',
// //     '--- Folder 1',
// //     '--- Folder 2',
// //     '--- Folder 3',
// //     '-- Grand child 3',
// //     '- Child Folder 3',
// //     '- Child Folder 4',
// //     'Pabbly Subscription Billing',
// //     'Pabbly Email Marketing',
// //     'Pabbly Form Builder',
// //     'Pabbly Email Verification',
// //     'Pabbly Hook',
// //     'Client (A)',
// //     '- Child Folder 1 - Subscription Billing',
// //     '- Child Folder 2',
// //     '-- Grand child 1',
// //     '-- Grand child 2',
// //     '--- Folder 1',
// //     '--- Folder 2',
// //     '--- Folder 3',
// //     '-- Grand child 3',
// //     '- Child Folder 3',
// //     '- Child Folder 4',
// //   ];

// //   const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
// //   const handlePopoverClose = () => setAnchorEl(null);
// //   const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
// //   const handleFilterClose = () => setFilterAnchorEl(null);

// //   const handleApplyFilter = () => {
// //     console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
// //     filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
// //     onResetPage();
// //     handleFilterClose();
// //   };

// //   const handleFilterName = (event) => {
// //     onResetPage(); // Reset the page to page 1 when filtering
// //     filters.setState({ name: event.target.value }); // Set the name filter based on the search input
// //   };

// //     const handleVariablesDialogClick = () => {
// //       setVariablesDialogOpen(true); // Open the dialog
// //     };

// //   const buttonStyle = {
// //     fontSize: '15px',
// //     height: '48px',
// //     textTransform: 'none',
// //     padding: '0 16px',
// //   };

// //   return (
// //     <>
// //       {/* <Stack
// //         spacing={2}
// //         alignItems="center"
// //         direction={isBelow600px ? 'column' : 'row'}
// //         sx={{ p: 2.5, width: '100%' }}
// //       >
// //         <Box sx={{ width: '100%' }}>
// //           <TextField
// //             fullWidth
// //             value={filters.state.name}
// //             onChange={handleFilterName} // Handle changes for search input
// //             placeholder="Search Variables..."
// //             InputProps={{
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //           <Box
// //             sx={{
// //               display: 'flex',
// //               gap: 2,
// //               flexDirection: 'row',
// //               width: isBelow600px ? '100%' : 'auto',
// //               justifyContent: 'flex-end', // Aligns buttons to the right
// //             }}
// //           >
// //             <Tooltip title="Start building a new automation workflow." arrow placement="top">
// //               <Button
// //                 sx={{
// //                   ...buttonStyle,
// //                   width: isBelow600px ? '169.91px' : '169.91px',
// //                 }}
// //                 size="large"
// //                 variant="outlined"
// //                 color="primary"
// //                 // onClick={handleOpenDrawer}
// //                 startIcon={
// //                   <Iconify
// //                     icon="heroicons:plus-circle-16-solid"
// //                     style={{ width: 18, height: 18 }}
// //                   />
// //                 }
// //               >
// //                 Add Connection
// //               </Button>
// //             </Tooltip>
// //           </Box>
// //         </Box>
// //       </Stack> */}

// //       <Stack
// //         spacing={2}
// //         alignItems="center"
// //         direction={isBelow600px ? 'column' : 'row'}
// //         sx={{ p: 2.5, width: '100%' }}
// //       >
// //         <Box sx={{ width: '100%' }}>
// //           <TextField
// //             fullWidth
// //             value={filters.state.name}
// //             onChange={handleFilterName} // Handle changes for search input
// //             placeholder="Search Variables..."
// //             InputProps={{
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //         </Box>

// //         <Box
// //           sx={{
// //             display: 'flex',
// //             gap: 2,
// //             flexDirection: 'row',
// //             width: isBelow600px ? '100%' : 'auto',
// //             justifyContent: 'flex-end', // Aligns buttons to the right
// //           }}
// //         >
// //           <Tooltip title="Add a custom variable." arrow placement="top">
// //             <Button
// //               sx={{
// //                 ...buttonStyle,
// //                 width: isBelow600px ? '169.91px' : '169.91px',
// //               }}
// //               size="large"
// //               variant="outlined"
// //               color="primary"
// //               onClick={handleVariablesDialo}
// //               startIcon={
// //                 <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
// //               }
// //             >
// //               Add Variable
// //             </Button>
// //           </Tooltip>
// //         </Box>
// //       </Stack>

// //       <Popover
// //         open={Boolean(anchorEl)}
// //         anchorEl={anchorEl}
// //         onClose={handlePopoverClose}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
// //         transformOrigin={{ vertical: 'top', horizontal: 'left' }}
// //       >
// //         <MenuList>
// //           {[
// //             { value: 'published', label: 'Move Workflow', icon: 'fluent:folder-move-16-filled' },
// //             {
// //               value: 'draft',
// //               label: 'Enable Workflow',
// //               icon: 'line-md:switch-off-filled-to-switch-filled-transition',
// //             },
// //             {
// //               value: 'published',
// //               label: 'Disable Workflow',
// //               icon: 'line-md:switch-filled-to-switch-off-filled-transition',
// //             },
// //             { value: 'draft', label: 'Delete Workflow', icon: 'solar:trash-bin-trash-bold' },
// //           ].map((option) => (
// //             <MenuItem
// //               key={option.value}
// //               selected={option.value === publish}
// //               onClick={() => {
// //                 handlePopoverClose();
// //                 onChangePublish(option.value);
// //               }}
// //             >
// //               {option.icon && (
// //                 <Iconify
// //                   icon={option.icon}
// //                   width={20}
// //                   height={20}
// //                   sx={{ mr: 2, color: 'inherit' }}
// //                 />
// //               )}
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </MenuList>
// //       </Popover>

// //       <Popover
// //         open={Boolean(filterAnchorEl)}
// //         anchorEl={filterAnchorEl}
// //         onClose={handleFilterClose}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
// //       >
// //         <Box
// //           sx={{
// //             width: { xs: '100%', sm: '100%', md: '100%', lg: 600 },
// //           }} // Full width for xs, sm, md, and 600px width for lg
// //         >
// //           <Box sx={{ borderBottom: '1px dashed #919eab33', p: 2, display: 'flex' }}>
// //             <Typography variant="h6" sx={{ fontWeight: '600', flexGrow: 1 }}>
// //               Filter Workflows
// //             </Typography>
// //             <Iconify
// //               icon="uil:times"
// //               onClick={handleFilterClose}
// //               sx={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
// //             />
// //           </Box>

// //           <Box
// //             sx={{
// //               p: { xs: '16px 16px 0px 16px', sm: '16px 16px 0px 16px' }, // Adjust padding for smaller screens
// //               display: 'flex',
// //               flexDirection: 'column',
// //               gap: { xs: 0, sm: 0 }, // No gap for mobile, gap for larger screens
// //               textAlign: { xs: 'left', sm: 'initial' }, // Align left below 600px
// //             }}
// //           >
// //             {[
// //               { label: 'Sort Workflow', options: sortworkflow, defaultLabel: 'By' },
// //               { label: 'Workflow Status', options: workflowstatus, defaultLabel: 'Equals to' },
// //               { label: 'Folder', options: folder, defaultLabel: 'In' },
// //             ].map((section, index) => (
// //               <Box
// //                 key={index}
// //                 sx={{
// //                   display: 'flex',
// //                   flexDirection: { xs: 'column', sm: 'row' }, // Adjust layout for small screens
// //                   gap: { xs: 0, sm: 2 }, // Remove gap for mobile, keep for larger screens
// //                   mb: 2,
// //                   alignItems: { xs: 'flex-start', sm: 'center' }, // Align left on small screens
// //                   textAlign: { xs: 'left', sm: 'initial' }, // Ensure text aligns left on small screens
// //                 }}
// //               >
// //                 <FormControl sx={{ mb: { xs: 2, sm: 0 }, minWidth: '160px' }}>
// //                   <Typography
// //                     sx={{
// //                       fontSize: '14px',
// //                       fontWeight: '600',
// //                       textAlign: { xs: 'left', sm: 'initial' }, // Align label left on small screens
// //                     }}
// //                   >
// //                     {section.label}
// //                   </Typography>
// //                 </FormControl>

// //                 <FormControl
// //                   fullWidth
// //                   sx={{
// //                     mb: { xs: 2, sm: 0 },
// //                     width: { xs: '260px', sm: '260px', md: '260px' }, // Adjust width for responsive design
// //                   }}
// //                 >
// //                   <TextField
// //                     variant="outlined"
// //                     fullWidth
// //                     label={section.defaultLabel}
// //                     disabled
// //                     size="small"
// //                   />
// //                 </FormControl>

// //                 <FormControl fullWidth>
// //                   <TextField
// //                     variant="outlined"
// //                     select
// //                     fullWidth
// //                     label="Select"
// //                     size="small"
// //                     sx={{
// //                       '& .MuiInputBase-input': { fontSize: '14px' },
// //                       '& .MuiInputLabel-root': { fontSize: '14px' },
// //                     }}
// //                   >
// //                     {section.options.map((option) => (
// //                       <MenuItem key={option} value={option}>
// //                         {option}
// //                       </MenuItem>
// //                     ))}
// //                   </TextField>
// //                 </FormControl>
// //               </Box>
// //             ))}
// //           </Box>

// //           <Box
// //             sx={{
// //               p: 2,
// //               display: 'flex',
// //               justifyContent: 'flex-end',
// //               borderTop: '1px dashed #919eab33',
// //               gap: 2,
// //             }}
// //           >
// //             <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
// //               Cancel
// //             </Button>
// //             <Button variant="contained" onClick={handleApplyFilter}>
// //               Apply Filter
// //             </Button>
// //           </Box>
// //         </Box>
// //       </Popover>
// //     </>
// //   );
// // }

// import React, { useState } from 'react';
// import { useTheme } from '@emotion/react';
// import {
//   Box,
//   Stack,
//   Button,
//   Popover,
//   MenuItem,
//   MenuList,
//   TextField,
//   Typography,
//   FormControl,
//   useMediaQuery,
//   InputAdornment,
//   Tooltip,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { Iconify } from 'src/components/iconify';
// import { VariablesDialog } from './VariablesDialog'; // Adjust the import path as needed

// export function OrderTableToolbar({
//   filters,
//   onResetPage,
//   onClose,
//   dateError,
//   publish,
//   onChangePublish,
//   numSelected,
// }) {
//   const theme = useTheme();
//   const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
//   const confirm = useBoolean();

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [operator, setOperator] = useState('contains');
//   const [filterValue, setFilterValue] = useState('');
//   const [VariablesDialogOpen, setVariablesDialogOpen] = useState(false); // State to control dialog open

//   const sortworkflow = [
//     'Highest to Lowest (Task Consumption)',
//     'Lowest to High (Task Consumption)',
//     'Alphabetically (A to Z)',
//     'Alphabetically (Z to A)',
//   ];
//   const workflowstatus = ['All Statuses', 'On', 'Off'];
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
//   const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
//   const handleFilterClose = () => setFilterAnchorEl(null);
//   const handleVariablesDialogOpen = () => setVariablesDialogOpen(true); // Open dialog
//   const handleVariablesDialogClose = () => setVariablesDialogOpen(false); // Close dialog

//   const handleApplyFilter = () => {
//     console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
//     filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
//     onResetPage();
//     handleFilterClose();
//   };

//   const handleFilterName = (event) => {
//     onResetPage(); // Reset the page to page 1 when filtering
//     filters.setState({ name: event.target.value }); // Set the name filter based on the search input
//   };

//   const buttonStyle = {
//     fontSize: '15px',
//     height: '48px',
//     textTransform: 'none',
//     padding: '0 16px',
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
//             placeholder="Search Variables..."
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
//             gap: 2,
//             flexDirection: 'row',
//             width: isBelow600px ? '100%' : 'auto',
//             justifyContent: 'flex-end', // Aligns buttons to the right
//           }}
//         >
//           <Tooltip title="Add a custom variable." arrow placement="top">
//             <Button
//               sx={{
//                 ...buttonStyle,
//                 width: isBelow600px ? '169.91px' : '169.91px',
//               }}
//               size="large"
//               variant="outlined"
//               color="primary"
//               onClick={handleVariablesDialogOpen} // Open VariablesDialog
//               startIcon={
//                 <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
//               }
//             >
//               Add Variable
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
//             { value: 'published', label: 'Move Workflow', icon: 'fluent:folder-move-16-filled' },
//             {
//               value: 'draft',
//               label: 'Enable Workflow',
//               icon: 'line-md:switch-off-filled-to-switch-filled-transition',
//             },
//             {
//               value: 'published',
//               label: 'Disable Workflow',
//               icon: 'line-md:switch-filled-to-switch-off-filled-transition',
//             },
//             { value: 'draft', label: 'Delete Workflow', icon: 'solar:trash-bin-trash-bold' },
//           ].map((option) => (
//             <MenuItem
//               key={option.value}
//               selected={option.value === publish}
//               onClick={() => {
//                 handlePopoverClose();
//                 onChangePublish(option.value);
//               }}
//             >
//               {option.icon && (
//                 <Iconify
//                   icon={option.icon}
//                   width={20}
//                   height={20}
//                   sx={{ mr: 2, color: 'inherit' }}
//                 />
//               )}
//               {option.label}
//             </MenuItem>
//           ))}
//         </MenuList>
//       </Popover>

//       <Popover
//         open={Boolean(filterAnchorEl)}
//         anchorEl={filterAnchorEl}
//         onClose={handleFilterClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Box
//           sx={{
//             width: { xs: '100%', sm: '100%', md: '100%', lg: 600 },
//           }} // Full width for xs, sm, md, and 600px width for lg
//         >
//           <Box sx={{ borderBottom: '1px dashed #919eab33', p: 2, display: 'flex' }}>
//             <Typography variant="h6" sx={{ fontWeight: '600', flexGrow: 1 }}>
//               Filter Workflows
//             </Typography>
//             <Iconify
//               icon="uil:times"
//               onClick={handleFilterClose}
//               sx={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//             />
//           </Box>

//           <Box
//             sx={{
//               p: { xs: '16px 16px 0px 16px', sm: '16px 16px 0px 16px' },
//               display: 'flex',
//               flexDirection: 'column',
//               gap: { xs: 0, sm: 0 },
//               textAlign: { xs: 'left', sm: 'initial' },
//             }}
//           >
//             {[
//               { label: 'Sort Workflow', options: sortworkflow, defaultLabel: 'By' },
//               { label: 'Workflow Status', options: workflowstatus, defaultLabel: 'Equals to' },
//               { label: 'Folder', options: folder, defaultLabel: 'In' },
//             ].map((section, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   gap: { xs: 0, sm: 2 },
//                   mb: 2,
//                   alignItems: { xs: 'flex-start', sm: 'center' },
//                   textAlign: { xs: 'left', sm: 'initial' },
//                 }}
//               >
//                 <FormControl sx={{ mb: { xs: 2, sm: 0 }, minWidth: '160px' }}>
//                   <Typography
//                     sx={{
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       textAlign: { xs: 'left', sm: 'initial' },
//                     }}
//                   >
//                     {section.label}
//                   </Typography>
//                 </FormControl>

//                 <FormControl
//                   fullWidth
//                   sx={{
//                     mb: { xs: 2, sm: 0 },
//                     width: { xs: '260px', sm: '260px', md: '260px' },
//                   }}
//                 >
//                   <TextField
//                     variant="outlined"
//                     fullWidth
//                     label={section.defaultLabel}
//                     disabled
//                     size="small"
//                   />
//                 </FormControl>

//                 <FormControl fullWidth>
//                   <TextField
//                     variant="outlined"
//                     select
//                     fullWidth
//                     label="Select"
//                     size="small"
//                     sx={{
//                       '& .MuiInputBase-input': { fontSize: '14px' },
//                       '& .MuiInputLabel-root': { fontSize: '14px' },
//                     }}
//                   >
//                     {section.options.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </FormControl>
//               </Box>
//             ))}
//           </Box>

//           <Box
//             sx={{
//               p: 2,
//               display: 'flex',
//               justifyContent: 'flex-end',
//               borderTop: '1px dashed #919eab33',
//               gap: 2,
//             }}
//           >
//             <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={handleApplyFilter}>
//               Apply Filter
//             </Button>
//           </Box>
//         </Box>
//       </Popover>

//       <VariablesDialog
//         open={VariablesDialogOpen}
//         onClose={handleVariablesDialogClose}
//         title="Add Variable"
//         content="Define your variable details."
//       />
//     </>
//   );
// }

import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Popover,
  Tooltip,
  MenuItem,
  MenuList,
  TextField,
  Typography,
  FormControl,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { VariablesDialog } from '../hook/add-variables-dailog';

export function OrderTableToolbar({
  filters,
  onResetPage,
  onClose,
  dateError,
  publish,
  onChangePublish,
  numSelected,
}) {
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
  const confirm = useBoolean();

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');
  const [VariablesDialogOpen, setVariablesDialogOpen] = useState(false); // State to control dialog open

  const sortworkflow = [
    'Highest to Lowest (Task Consumption)',
    'Lowest to High (Task Consumption)',
    'Alphabetically (A to Z)',
    'Alphabetically (Z to A)',
  ];
  const workflowstatus = ['All Statuses', 'On', 'Off'];
  const folder = [
    'Pabbly Connect',
    'Main Folder',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
  ];

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleVariablesDialogOpen = () => setVariablesDialogOpen(true); // Open dialog
  const handleVariablesDialogClose = () => setVariablesDialogOpen(false); // Close dialog

  const handleApplyFilter = () => {
    console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
  };

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
  };

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
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
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName} // Handle changes for search input
            placeholder="Search Variables..."
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
            gap: 2,
            flexDirection: 'row',
            width: isBelow600px ? '100%' : 'auto',
            justifyContent: 'flex-end', // Aligns buttons to the right
          }}
        >
          <Tooltip title="Add a custom variable." arrow placement="top">
            <Button
              sx={{
                ...buttonStyle,
                width: isBelow600px ? '169.91px' : '169.91px',
              }}
              size="large"
              variant="outlined"
              color="primary"
              onClick={handleVariablesDialogOpen} // Open VariablesDialog
              startIcon={
                <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
              }
            >
              Add Variable
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
          {[
            { value: 'published', label: 'Move Workflow', icon: 'fluent:folder-move-16-filled' },
            {
              value: 'draft',
              label: 'Enable Workflow',
              icon: 'line-md:switch-off-filled-to-switch-filled-transition',
            },
            {
              value: 'published',
              label: 'Disable Workflow',
              icon: 'line-md:switch-filled-to-switch-off-filled-transition',
            },
            { value: 'draft', label: 'Delete Workflow', icon: 'solar:trash-bin-trash-bold' },
          ].map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === publish}
              onClick={() => {
                handlePopoverClose();
                onChangePublish(option.value);
              }}
            >
              {option.icon && (
                <Iconify
                  icon={option.icon}
                  width={20}
                  height={20}
                  sx={{ mr: 2, color: 'inherit' }}
                />
              )}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '100%', lg: 600 },
          }} // Full width for xs, sm, md, and 600px width for lg
        >
          <Box sx={{ borderBottom: '1px dashed #919eab33', p: 2, display: 'flex' }}>
            <Typography variant="h6" sx={{ fontWeight: '600', flexGrow: 1 }}>
              Filter Workflows
            </Typography>
            <Iconify
              icon="uil:times"
              onClick={handleFilterClose}
              sx={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
            />
          </Box>

          <Box
            sx={{
              p: { xs: '16px 16px 0px 16px', sm: '16px 16px 0px 16px' },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 0, sm: 0 },
              textAlign: { xs: 'left', sm: 'initial' },
            }}
          >
            {[
              { label: 'Sort Workflow', options: sortworkflow, defaultLabel: 'By' },
              { label: 'Workflow Status', options: workflowstatus, defaultLabel: 'Equals to' },
              { label: 'Folder', options: folder, defaultLabel: 'In' },
            ].map((section, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 0, sm: 2 },
                  mb: 2,
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  textAlign: { xs: 'left', sm: 'initial' },
                }}
              >
                <FormControl sx={{ mb: { xs: 2, sm: 0 }, minWidth: '160px' }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      textAlign: { xs: 'left', sm: 'initial' },
                    }}
                  >
                    {section.label}
                  </Typography>
                </FormControl>

                <FormControl
                  fullWidth
                  sx={{
                    mb: { xs: 2, sm: 0 },
                    width: { xs: '260px', sm: '260px', md: '260px' },
                  }}
                >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label={section.defaultLabel}
                    disabled
                    size="small"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    select
                    fullWidth
                    label="Select"
                    size="small"
                    sx={{
                      '& .MuiInputBase-input': { fontSize: '14px' },
                      '& .MuiInputLabel-root': { fontSize: '14px' },
                    }}
                  >
                    {section.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px dashed #919eab33',
              gap: 2,
            }}
          >
            <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Popover>

      <VariablesDialog
        open={VariablesDialogOpen}
        onClose={handleVariablesDialogClose}
        title="Add Variable"
        content="Define your variable details."
      />
    </>
  );
}
