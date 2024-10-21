// import dayjs from 'dayjs';
// import { useTheme } from '@emotion/react';
// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Popover from '@mui/material/Popover';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import { DateTimePicker } from '@mui/x-date-pickers';
// import InputAdornment from '@mui/material/InputAdornment';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Tooltip, IconButton, Typography, useMediaQuery } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Form } from 'src/components/hook-form';
// import { Iconify } from 'src/components/iconify';
// import { usePopover } from 'src/components/custom-popover';

// // ----------------------------------------------------------------------

// export function OrderTableToolbar({ filters, onResetPage, onClose, dateError }) {
//   const [startDate, setStartDate] = useState(dayjs(new Date()));
//   const [endDate, setEndDate] = useState(dayjs(new Date()));
//   const theme = useTheme();
//   const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const confirm = useBoolean();

//   const popover = usePopover();
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [operator, setOperator] = useState('contains');
//   const [filterValue, setFilterValue] = useState('');

//   const whatsapp_status = ['Active', 'Inactive']; // Add your actual column names here
//   const columns = ['Active', 'Inactive']; // Add your actual column names here
//   const workflows = [
//     'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
//     'Create Invoice in QuickBooks after Stripe Payment',
//     'Update Customer in Hubspot on New Sale in Shopify',
//     'Send Slack Notification on New Deal in Pipedrive',
//     'Add Lead in Salesforce on New Google Form Submission',
//   ]; // Add your actual column names here
//   const taskstatus = [
//     'All Statuses',
//     'Success',
//     'Partial Failed',
//     ' Failed',
//     // 'Shared - [Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment]',
//   ]; // Add your actual column names here
//   const executionstatus = ['All Executions', 'Normal Executions', 'Re-Executed']; // Add your actual column names here

//   const workflowexecution = ['All', 'Executed', 'Pending']; // Add your actual column names here

//   const handleFilterName = useCallback(
//     (event) => {
//       onResetPage();
//       filters.setState({ name: event.target.value });
//     },
//     [filters, onResetPage]
//   );

//   const handleFilterStartDate = useCallback(
//     (newValue) => {
//       onResetPage();
//       filters.setState({ startDate: newValue });
//     },
//     [filters, onResetPage]
//   );

//   const handleFilterEndDate = useCallback(
//     (newValue) => {
//       onResetPage();
//       filters.setState({ endDate: newValue });
//     },
//     [filters, onResetPage]
//   );

//   const handleFilterClick = (event) => {
//     setFilterAnchorEl(event.currentTarget);
//   };

//   const handleFilterClose = () => {
//     setFilterAnchorEl(null);
//   };

//   const handleApplyFilter = () => {
//     console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
//     filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
//     onResetPage();
//     handleFilterClose();
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
//         alignItems={{ xs: 'flex-end', md: 'center' }}
//         direction={{ xs: 'column', md: 'row' }}
//         sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
//       >
//         <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Start Date"
//               value={startDate}
//               minDate={dayjs('2017-01-01')}
//               onChange={(newValue) => {
//                 setStartDate(newValue);
//               }}
//               slotProps={{ textField: { fullWidth: false } }}
//             />
//           </LocalizationProvider>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="End Date"
//               value={endDate}
//               minDate={dayjs('2017-01-01')}
//               onChange={(newValue) => {
//                 setEndDate(newValue);
//               }}
//               slotProps={{ textField: { fullWidth: false } }}
//             />
//           </LocalizationProvider>
//           <TextField
//             sx={{ mr: '5px', width: '50%' }}
//             value={filters.state.name}
//             onChange={handleFilterName}
//             placeholder="Search task history..."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Tooltip title="Filter workflows history." arrow placement="top">
//             <Button
//               sx={{ ml: '5px' }}
//               size="large"
//               variant=""
//               startIcon={<Iconify icon="mdi:filter" />}
//               onClick={handleFilterClick}
//             >
//               Filters
//             </Button>
//           </Tooltip>

//           <Tooltip title="Click here to referesh data." arrow placement="top">
//             <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
//               <Iconify sx={{ width: '20px', height: '20px' }} icon="heroicons-outline:refresh" />
//             </IconButton>
//           </Tooltip>
//         </Stack>
//       </Stack>

//       <Popover
//         open={Boolean(filterAnchorEl)}
//         anchorEl={filterAnchorEl}
//         onClose={handleFilterClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//       >
//         <Box
//           sx={{
//             width: {
//               xs: '100%', // Full width on extra small devices (mobile)
//               sm: '100%', // Full width on small devices (tablet)
//               md: 650, // Specific width on medium devices (desktop)
//             },
//             flexDirection: {
//               xs: 'column', // Stack vertically on mobile
//               sm: 'column', // Stack vertically on tablet
//               md: 'row', // Row-based layout on desktop
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
//                 Filter Task
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
//                 xs: 'column', // Stack options vertically on mobile
//                 sm: 'column', // Stack options vertically on tablet
//                 md: 'row', // Arrange options in a row on desktop
//               },
//             }}
//           >
//             {/* Date Range Section */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: {
//                   xs: 'column', // Stack vertically on mobile
//                   sm: 'column', // Stack vertically on tablet
//                   md: 'row', // Arrange in row on desktop
//                 },
//                 gap: 2,
//                 mb: 2,
//               }}
//             >
//               <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
//                 <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Date Range</Typography>
//               </FormControl>

//               <FormControl
//                 fullWidth
//                 sx={{
//                   mb: { xs: 2, sm: 2, md: 0 },
//                   width: { xs: '100%', sm: '100%', md: '390px' }, // Responsive width
//                 }}
//               >
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   fullWidth
//                   label="Between"
//                   disabled
//                   size="small"
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
//                 <Form>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DateTimePicker
//                       sx={{
//                         height: '30px',
//                         '& .MuiInputBase-input': {
//                           height: 'auto',
//                           padding: '8px 14px',
//                         },
//                       }}
//                       size="small"
//                       label="Date"
//                       value={startDate}
//                       minDate={dayjs('2017-01-01')}
//                       onChange={(newValue) => {
//                         setStartDate(newValue);
//                       }}
//                       slotProps={{
//                         textField: {
//                           fullWidth: true,
//                           sx: {
//                             '& .MuiOutlinedInput-input': {
//                               height: 'auto',
//                               padding: '8px 14px',
//                               fontSize: '14px',
//                             },
//                             '& .MuiInputLabel-root': {
//                               fontSize: '14px',
//                             },
//                           },
//                         },
//                       }}
//                     />
//                   </LocalizationProvider>
//                 </Form>
//               </FormControl>
//             </Box>

//             {/* Workflow Name Section */}
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
//                 <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Workflow Name</Typography>
//               </FormControl>

//               <FormControl
//                 fullWidth
//                 sx={{
//                   mb: { xs: 2, sm: 2, md: 0 },
//                   width: { xs: '100%', sm: '100%', md: '390px' }, // Adjust width for different screens
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
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   select
//                   fullWidth
//                   label="Select"
//                   size="small"
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '14px',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '14px',
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       p: 2,
//                       // position: 'Sticky',
//                       top: 0,
//                       // bgcolor: 'background.paper',
//                       zIndex: 5,
//                     }}
//                   >
//                     <TextField
//                       fullWidth
//                       size="large"
//                       placeholder="Search workflow name..."
//                       value={searchTerm}
//                       onChange={handleSearchChange}
//                       inputRef={searchInputRef}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <Iconify icon="eva:search-fill" width={24} height={24} />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Box>
//                   {workflows.map((column) => (
//                     <MenuItem key={column} value={column}>
//                       {column}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </FormControl>
//             </Box>

//             {/* Task Status Section */}
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
//                 <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Task Status</Typography>
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
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   select
//                   fullWidth
//                   label="Select"
//                   size="small"
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '14px',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '14px',
//                     },
//                   }}
//                 >
//                   {taskstatus.map((column) => (
//                     <MenuItem key={column} value={column}>
//                       {column}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </FormControl>
//             </Box>

//             {/* Task History ID Section */}
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
//                   Task History ID
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
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   // select
//                   fullWidth
//                   label="Enter Task History ID"
//                   size="small"
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '14px',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '14px',
//                     },
//                   }}
//                 >
//                   {/* Add MenuItems for Task History ID */}
//                 </TextField>
//               </FormControl>
//             </Box>

//             {/* Task Data Section */}
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
//                 <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Task Data</Typography>
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
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   // select
//                   fullWidth
//                   label="Enter Task Data"
//                   size="small"
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '14px',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '14px',
//                     },
//                   }}
//                 >
//                   {/* Add MenuItems for Task Data */}
//                 </TextField>
//               </FormControl>
//             </Box>

//             {/* Execution Status Section */}
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
//                   Execution Status
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
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   select
//                   fullWidth
//                   label="Select"
//                   size="small"
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '14px',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '14px',
//                     },
//                   }}
//                 >
//                   {executionstatus.map((column) => (
//                     <MenuItem key={column} value={column}>
//                       {column}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </FormControl>
//             </Box>

//             {/* Workflow Execution Section */}
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
//                   Workflow Execution
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
//                 <TextField
//                   id="select-currency-label-x"
//                   variant="outlined"
//                   select
//                   fullWidth
//                   label="Select"
//                   size="small"
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '14px',
//                     },
//                     '& .MuiInputLabel-root': {
//                       fontSize: '14px',
//                     },
//                   }}
//                 >
//                   {workflowexecution.map((column) => (
//                     <MenuItem key={column} value={column}>
//                       {column}
//                     </MenuItem>
//                   ))}
//                 </TextField>
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
//             <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={handleApplyFilter}>
//               Apply Filter
//             </Button>
//           </Box>
//         </Box>
//       </Popover>
//     </>
//   );
// }

import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import React, { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { DateTimePicker } from '@mui/x-date-pickers';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Tooltip, IconButton, Typography, Autocomplete, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

export function OrderTableToolbar({ filters, onResetPage, onClose, dateError }) {
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const confirm = useBoolean();

  const popover = usePopover();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const whatsapp_status = ['Active', 'Inactive'];
  const columns = ['Active', 'Inactive'];
  const workflows = [
    'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    'Create Invoice in QuickBooks after Stripe Payment',
    'Update Customer in Hubspot on New Sale in Shopify',
    'Send Slack Notification on New Deal in Pipedrive',
    'Add Lead in Salesforce on New Google Form Submission',
    'Subscriber in Convertkit on Thrivecart Payment',
    'Invoice in QuickBooks after Stripe Payment',
    'Customer in Hubspot on New Sale in Shopify',
    'Send New Deal in Pipedrive',
    'Salesforce on New Google Form Submission',
  ];

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  const taskstatus = ['All Statuses', 'Success', 'Partial Failed', 'Failed'];
  const executionstatus = ['All Executions', 'Normal Executions', 'Re-Executed'];
  const workflowexecution = ['All', 'Executed', 'Pending'];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWorkflows, setFilteredWorkflows] = useState(workflows);
  const searchInputRef = useRef(null);

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleApplyFilter = () => {
    console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
  };

  const handleSearchChange = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = workflows.filter((workflow) =>
      workflow.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredWorkflows(filtered);
  };

  const handleSearchClick = (event) => {
    event.stopPropagation(); // Prevent the click from closing the dropdown
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
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              minDate={dayjs('2017-01-01')}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              slotProps={{ textField: { fullWidth: false } }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              minDate={dayjs('2017-01-01')}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              slotProps={{ textField: { fullWidth: false } }}
            />
          </LocalizationProvider>
          <TextField
            sx={{ mr: '5px', width: '50%' }}
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Search task history..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="Filter workflows history." arrow placement="top">
            <Button
              sx={{ ml: '5px' }}
              size="large"
              variant=""
              startIcon={<Iconify icon="mdi:filter" />}
              onClick={handleFilterClick}
            >
              Filters
            </Button>
          </Tooltip>

          <Tooltip title="Click here to refresh data." arrow placement="top">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify sx={{ width: '20px', height: '20px' }} icon="heroicons-outline:refresh" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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
                Filter Task
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
            {/* Date Range Section */}
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
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Date Range</Typography>
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
                  label="Between"
                  disabled
                  size="small"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
                <Form>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      sx={{
                        height: '30px',
                        '& .MuiInputBase-input': {
                          height: 'auto',
                          padding: '8px 14px',
                        },
                      }}
                      size="small"
                      label="Date"
                      value={startDate}
                      minDate={dayjs('2017-01-01')}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            '& .MuiOutlinedInput-input': {
                              height: 'auto',
                              padding: '8px 14px',
                              fontSize: '14px',
                            },
                            '& .MuiInputLabel-root': {
                              fontSize: '14px',
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Form>
              </FormControl>
            </Box>

            {/* Workflow Name Section */}
            {/* <Box
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
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Workflow Name</Typography>
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
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  select
                  fullWidth
                  label="Select"
                  size="small"
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      top: 0,
                      zIndex: 5,
                    }}
                  >
                    <TextField
                      fullWidth
                      size="large"
                      placeholder="Search workflow name..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      inputRef={searchInputRef}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" width={24} height={24} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {filteredWorkflows.map((workflow) => (
                    <MenuItem key={workflow} value={workflow}>
                      {workflow}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Box> */}

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
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Workflow Name</Typography>
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
                  options={workflows}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            {/* Task Status Section */}
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
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Task Status</Typography>
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
                {/* <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  select
                  fullWidth
                  label="Select"
                  size="small"
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                >
                  {taskstatus.map((column) => (
                    <MenuItem key={column} value={column}>
                      {column}
                    </MenuItem>
                  ))}
                </TextField> */}

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
                  options={taskstatus}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            {/* Task History ID Section */}
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
                  Task History ID
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
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  fullWidth
                  label="Enter Task History ID"
                  size="small"
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                >
                  j
                </TextField>
              </FormControl>
            </Box>

            {/* Task Data Section */}
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
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Task Data</Typography>
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
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  fullWidth
                  label="Enter Task Data"
                  size="small"
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                >
                  j
                </TextField>
              </FormControl>
            </Box>

            {/* Execution Status Section */}
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
                  Execution Status
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
                  options={executionstatus}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            {/* Workflow Execution Section */}
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
                  Workflow Execution
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
                  options={workflowexecution}
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
            <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
