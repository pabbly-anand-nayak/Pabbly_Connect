// import { useTheme } from '@emotion/react';
// import React, { useState, useCallback } from 'react';

// import {
//   Box,
//   Tab,
//   Tabs,
//   Card,
//   Table,
//   Stack,
//   Tooltip,
//   Divider,
//   TableRow,
//   Checkbox,
//   TableBody,
//   TableCell,
//   TableHead,
//   TextField,
//   Typography,
//   CardHeader,
//   useMediaQuery,
//   TableContainer,
//   InputAdornment,
//   TablePagination,
// } from '@mui/material';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from '../label';
// import { Iconify } from '../iconify';
// import { TableNoData } from '../table';
// import { TableFiltersResult } from './table-filters-result';
// import { Scrollbar } from '../scrollbar';

// const CustomTable = ({
//   columns,
//   rows = [],
//   onResetPage,
//   tabs,

//   onTabChange,
//   filters,

//   title,
// }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState([]);
//   const theme = useTheme();
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

//   const filteredRows = rows.filter((row) => {
//     // Normalize status for comparison
//     const normalizedRowStatus = row.status.toLowerCase();
//     const normalizedFilterStatus = filters.state.status.toLowerCase();

//     // Filter by status tab with more specific matching
//     const statusMatch =
//       normalizedFilterStatus === 'all' ||
//       (normalizedFilterStatus === 'active' &&
//         (normalizedRowStatus === 'active' || normalizedRowStatus === 'active')) ||
//       (normalizedFilterStatus === 'success' &&
//         (normalizedRowStatus === 'success' || normalizedRowStatus === 'success')) ||
//       (normalizedFilterStatus === 'inactive' &&
//         (normalizedRowStatus === 'inactive' || normalizedRowStatus === 'inactive')) ||
//       (normalizedFilterStatus === 'partial failed' &&
//         (normalizedRowStatus === 'partial failed' || normalizedRowStatus === 'partial failed')) ||
//       (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

//     // Filter by name search
//     const nameMatch =
//       !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

//     return statusMatch && nameMatch;
//   });

//   // Handlers for pagination
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Handlers for selection
//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = filteredRows.map((row) => row.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleSelectRow = (id) => {
//     setSelected((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((selectedId) => selectedId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   // Filter Handlers
//   const handleFilterName = useCallback(
//     (event) => {
//       filters.setState({ ...filters.state, name: event.target.value });
//       setPage(0); // Reset to the first page when searching
//     },
//     [filters]
//   );

//   return (
//     <Card
//       sx={{
//         boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
//         width: '100%',
//         overflow: 'hidden',
//         mt: 4,
//       }}
//     >
//       {/* Title */}
//       {title && (
//         <CardHeader
//           sx={{
//             p: 3,
//           }}
//           title={
//             <Box>
//               <Typography variant="subtitle2" fontSize={18} fontWeight={600}>
//                 {title}
//               </Typography>
//               <Typography variant="body2" fontSize={14} color="text.secondary">
//                 (Sep 20, 2024 - Oct 05, 2024)
//               </Typography>
//             </Box>
//           }
//         />
//       )}
//       <Divider />

//       {/* Tabs */}
//       <Tabs
//         value={filters.state.status}
//         onChange={(event, newValue) => {
//           filters.setState({ ...filters.state, status: newValue });
//           onTabChange(event, newValue);
//         }}
//         sx={{
//           px: 2.5,
//           boxShadow: (theme1) =>
//             `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
//         }}
//       >
//         {tabs.options.map((tab) => (
//           <Tab
//             key={tab.value}
//             iconPosition="end"
//             value={tab.value}
//             label={
//               <Tooltip title={tab.tooltip} arrow placement="top">
//                 <span>{tab.label}</span>
//               </Tooltip>
//             }
//             icon={
//               <Label
//                 variant={((tab.value === 'all' || tab.value === tabs.value) && 'filled') || 'soft'}
//                 color={
//                   (tab.value === 'active' && 'success') ||
//                   (tab.value === 'success' && 'success') ||
//                   (tab.value === 'inactive' && 'warning') ||
//                   (tab.value === 'partial failed' && 'warning') ||
//                   (tab.value === 'failed' && 'error') ||
//                   'default'
//                 }
//               >
//                 {tab.count}
//               </Label>
//             }
//           />
//         ))}
//       </Tabs>

//       {/* Search Input */}
//       <Stack
//         spacing={2}
//         alignItems="center"
//         direction={isBelow600px ? 'column' : 'row'}
//         sx={{ p: 2.5 }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <TextField
//             fullWidth
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
//         </Box>
//       </Stack>

//       {/* Tab Filters Result */}
//       {filters.state.status !== 'all' && (
//         <TableFiltersResult
//           filters={filters}
//           totalResults={filteredRows.length}
//           onResetPage={() => {
//             // Reset the filters and set the tab to "All"
//             filters.setState({ ...filters.state, status: 'all', name: '' });
//             onTabChange(null, 'all'); // Reset the tab
//           }}
//           sx={{ p: '0px 20px 20px 20px' }}
//         />
//       )}

//       {/* Table */}
//       <TableContainer>
//         <Box sx={{ position: 'relative' }}>
//           <Scrollbar sx={{ minHeight: 300 }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell padding="checkbox">
//                     <Checkbox
//                       indeterminate={selected.length > 0 && selected.length < filteredRows.length}
//                       checked={filteredRows.length > 0 && selected.length === filteredRows.length}
//                       onChange={handleSelectAllClick}
//                     />
//                   </TableCell>
//                   {columns.map((column) => (
//                     <TableCell key={column.id}>{column.label}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {rows.length === 0 ? (
//                   <TableNoData
//                     title="No webhook URL added!"
//                     subTitle="Set up webhooks and receive notification for different events."
//                     learnMoreText="Learn more"
//                     learnMoreLink="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly"
//                     notFound
//                   />
//                 ) : filteredRows.length === 0 ? (
//                   <TableNoData
//                     title="No Results Found!"
//                     subTitle={`No tasks match your search for "${filters.state.name}"`}
//                     notFound
//                   />
//                 ) : (
//                   filteredRows
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row) => (
//                       <TableRow
//                         key={row.id}
//                         hover
//                         selected={selected.includes(row.id)}
//                         onClick={() => handleSelectRow(row.id)}
//                       >
//                         <TableCell padding="checkbox">
//                           <Checkbox checked={selected.includes(row.id)} />
//                         </TableCell>
//                         {columns.map((column) => (
//                           <TableCell key={column.id}>
//                             {column.render ? column.render(row) : row[column.id]}{' '}
//                             {/* Use render if defined */}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                 )}
//                 <TableNoData />
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </Box>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 20]}
//         component="div"
//         count={filteredRows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Card>
//   );
// };

// export default CustomTable;

// ------------------------------------------------

// import { useTheme } from '@emotion/react';
// import React, { useState, useCallback } from 'react';

// import {
//   Box,
//   Tab,
//   Tabs,
//   Card,
//   Table,
//   Stack,
//   Tooltip,
//   Divider,
//   TableRow,
//   Checkbox,
//   TableBody,
//   TableCell,
//   TableHead,
//   TextField,
//   Typography,
//   CardHeader,
//   useMediaQuery,
//   TableContainer,
//   InputAdornment,
//   TablePagination,
// } from '@mui/material';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from '../label';
// import { Iconify } from '../iconify';
// import { TableNoData } from '../table';
// import { TableFiltersResult } from './table-filters-result';

// const CustomTable = ({ columns, rows = [], onResetPage, tabs, onTabChange, filters, title }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState([]);
//   const theme = useTheme();
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

//   const filteredRows = rows.filter((row) => {
//     const normalizedRowStatus = row.status.toLowerCase();
//     const normalizedFilterStatus = filters.state.status.toLowerCase();

//     const statusMatch =
//       normalizedFilterStatus === 'all' ||
//       (normalizedFilterStatus === 'success' && normalizedRowStatus === 'success') ||
//       (normalizedFilterStatus === 'partial failed' && normalizedRowStatus === 'partial failed') ||
//       (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

//     const nameMatch =
//       !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

//     return statusMatch && nameMatch;
//   });

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = filteredRows.map((row) => row.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleSelectRow = (id) => {
//     setSelected((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((selectedId) => selectedId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   const handleFilterName = useCallback(
//     (event) => {
//       filters.setState({ ...filters.state, name: event.target.value });
//       setPage(0);
//     },
//     [filters]
//   );

//   return (
//     <Card
//       sx={{
//         boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
//         width: '100%',
//         overflow: 'hidden',
//         mt: 4,
//       }}
//     >
//       {title && (
//         <CardHeader
//           sx={{ p: 3 }}
//           title={
//             <Box>
//               <Typography variant="subtitle2" fontSize={18} fontWeight={600}>
//                 {title}
//               </Typography>
//               <Typography variant="body2" fontSize={14} color="text.secondary">
//                 (Sep 20, 2024 - Oct 05, 2024)
//               </Typography>
//             </Box>
//           }
//         />
//       )}
//       <Divider />

//       <Tabs
//         value={filters.state.status}
//         onChange={(event, newValue) => {
//           filters.setState({ ...filters.state, status: newValue });
//           onTabChange(event, newValue);
//         }}
//         sx={{
//           px: 2.5,
//           boxShadow: (theme1) =>
//             `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
//         }}
//       >
//         {tabs.options.map((tab) => (
//           <Tab
//             key={tab.value}
//             iconPosition="end"
//             value={tab.value}
//             label={
//               <Tooltip title={tab.tooltip} arrow placement="top">
//                 <span>{tab.label}</span>
//               </Tooltip>
//             }
//             icon={
//               <Label
//                 variant={((tab.value === 'all' || tab.value === tabs.value) && 'filled') || 'soft'}
//                 color={
//                   (tab.value === 'success' && 'success') ||
//                   (tab.value === 'partial failed' && 'warning') ||
//                   (tab.value === 'failed' && 'error') ||
//                   'default'
//                 }
//               >
//                 {tab.count}
//               </Label>
//             }
//           />
//         ))}
//       </Tabs>

//       <Stack
//         spacing={2}
//         alignItems="center"
//         direction={isBelow600px ? 'column' : 'row'}
//         sx={{ p: 2.5 }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <TextField
//             fullWidth
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
//         </Box>
//       </Stack>

//       {filters.state.status !== 'all' && (
//         <TableFiltersResult
//           filters={filters}
//           totalResults={filteredRows.length}
//           onResetPage={() => {
//             filters.setState({ ...filters.state, status: 'all', name: '' });
//             onTabChange(null, 'all');
//           }}
//           sx={{ p: '0px 20px 20px 20px' }}
//         />
//       )}

//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   indeterminate={selected.length > 0 && selected.length < filteredRows.length}
//                   checked={filteredRows.length > 0 && selected.length === filteredRows.length}
//                   onChange={handleSelectAllClick}
//                 />
//               </TableCell>
//               {columns.map((column) => (
//                 <TableCell key={column.id}>{column.label}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {rows.length === 0 ? (
//               <TableNoData
//                 title="No webhook URL added!"
//                 subTitle="Set up webhooks and receive notification for different events."
//                 learnMoreText="Learn more"
//                 learnMoreLink="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly"
//                 notFound
//               />
//             ) : filteredRows.length === 0 ? (
//               <TableNoData
//                 title="No Results Found!"
//                 subTitle={`No tasks match your search for "${filters.state.name}"`}
//                 notFound
//               />
//             ) : (
//               filteredRows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => (
//                   <TableRow
//                     key={row.id}
//                     hover
//                     selected={selected.includes(row.id)}
//                     onClick={() => handleSelectRow(row.id)}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox checked={selected.includes(row.id)} />
//                     </TableCell>
//                     {columns.map((column) => (
//                       <TableCell key={column.id}>
//                         {column.render ? column.render(row) : row[column.id]}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 20]}
//         component="div"
//         count={filteredRows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Card>
//   );
// };
// ---------------------------------------

// import { useTheme } from '@emotion/react';
// import React, { useState, useCallback } from 'react';

// import {
//   Box,
//   Tab,
//   Tabs,
//   Card,
//   Table,
//   Stack,
//   Tooltip,
//   Divider,
//   TableRow,
//   Checkbox,
//   TableBody,
//   TableCell,
//   TableHead,
//   TextField,
//   Typography,
//   CardHeader,
//   useMediaQuery,
//   TableContainer,
//   InputAdornment,
//   TablePagination,
// } from '@mui/material';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from '../label';
// import { Iconify } from '../iconify';
// import { TableNoData } from '../table';
// import { Scrollbar } from '../scrollbar';
// import { TableFiltersResult } from './table-filters-result';

// // New TableSelectedAction component
// const TableSelectedAction = ({ numSelected, rowCount, onSelectAllRows, action }) => (
//   <Stack
//     direction="row"
//     alignItems="center"
//     sx={{
//       pl: 1,
//       pr: 2,
//       top: 0,
//       left: 0,
//       width: '100%',
//       position: 'absolute',
//       height: '58px',
//       bgcolor: 'primary.lighter',
//       zIndex: 1,
//     }}
//   >
//     {/* <Checkbox
//       indeterminate={numSelected > 0 && numSelected < rowCount}
//       checked={rowCount > 0 && numSelected === rowCount}
//       onChange={(event) => onSelectAllRows(event.target.checked)}
//     /> */}

//     <Checkbox
//       indeterminate={numSelected > 0 && numSelected < rowCount}
//       checked={rowCount > 0 && numSelected === rowCount}
//       onChange={(event) => onSelectAllRows(event.target.checked)}
//     />

//     <Typography
//       variant="subtitle1"
//       sx={{
//         ml: 2,
//         flexGrow: 1,
//         color: 'primary.main',
//         // fontWeight: 'fontWeightBold',
//         fontSize: '14px',
//       }}
//     >
//       {numSelected} selected
//     </Typography>

//     {action}
//   </Stack>
// );

// const CustomTable = ({
//   columns,
//   rows = [],
//   onResetPage,
//   tabs,
//   onTabChange,
//   filters,
//   title,
//   onDeleteRows,
//   deleteAction,
// }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState([]);
//   const theme = useTheme();
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

//   const filteredRows = rows.filter((row) => {
//     const normalizedRowStatus = row.status.toLowerCase();
//     const normalizedFilterStatus = filters.state.status.toLowerCase();

//     const statusMatch =
//       normalizedFilterStatus === 'all' ||
//       (normalizedFilterStatus === 'active' && normalizedRowStatus === 'active') ||
//       (normalizedFilterStatus === 'success' && normalizedRowStatus === 'success') ||
//       (normalizedFilterStatus === 'inactive' && normalizedRowStatus === 'inactive') ||
//       (normalizedFilterStatus === 'partial failed' && normalizedRowStatus === 'partial failed') ||
//       (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

//     const nameMatch =
//       !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

//     return statusMatch && nameMatch;
//   });

//   // Enhanced selection handlers for multiple pages
//   // const handleSelectAllClick = (event) => {
//   //   if (event.target.checked) {
//   //     const newSelected = filteredRows.map((row) => row.id);
//   //     setSelected(newSelected);
//   //     return;
//   //   }
//   //   setSelected([]);
//   // };

//   const handleSelectAllClick = useCallback(
//     (checked) => {
//       if (checked) {
//         const newSelected = filteredRows.map((row) => row.id);
//         setSelected(newSelected);
//       } else {
//         setSelected([]);
//       }
//     },
//     [filteredRows]
//   );

//   // const handleSelectRow = (id) => {
//   //   setSelected((prevSelected) =>
//   //     prevSelected.includes(id)
//   //       ? prevSelected.filter((selectedId) => selectedId !== id)
//   //       : [...prevSelected, id]
//   //   );
//   // };

//   const handleSelectRow = useCallback((id) => {
//     setSelected((prevSelected) => {
//       const selectedIndex = prevSelected.indexOf(id);
//       let newSelected = [];

//       if (selectedIndex === -1) {
//         newSelected = [...prevSelected, id];
//       } else {
//         newSelected = [
//           ...prevSelected.slice(0, selectedIndex),
//           ...prevSelected.slice(selectedIndex + 1),
//         ];
//       }

//       return newSelected;
//     });
//   }, []);

//   // Handler for deleting selected rows
//   const handleDeleteSelected = () => {
//     if (onDeleteRows) {
//       onDeleteRows(selected);
//       setSelected([]);
//     }
//   };

//   const handleFilterName = useCallback(
//     (event) => {
//       filters.setState({ ...filters.state, name: event.target.value });
//       setPage(0);
//     },
//     [filters]
//   );

//   return (
//     <Card
//       sx={{
//         boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
//         width: '100%',
//         overflow: 'hidden',
//         mt: 4,
//       }}
//     >
//       {title && (
//         <CardHeader
//           sx={{ p: 3 }}
//           title={
//             <Box>
//               <Typography variant="subtitle2" fontSize={18} fontWeight={600}>
//                 {title}
//               </Typography>
//               <Typography variant="body2" fontSize={14} color="text.secondary">
//                 (Sep 20, 2024 - Oct 05, 2024)
//               </Typography>
//             </Box>
//           }
//         />
//       )}
//       <Divider />

//       <Tabs
//         value={filters.state.status}
//         onChange={(event, newValue) => {
//           filters.setState({ ...filters.state, status: newValue });
//           onTabChange(event, newValue);
//         }}
//         sx={{
//           px: 2.5,
//           boxShadow: (theme1) =>
//             `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
//         }}
//       >
//         {tabs.options.map((tab) => (
//           <Tab
//             key={tab.value}
//             iconPosition="end"
//             value={tab.value}
//             label={
//               <Tooltip title={tab.tooltip} arrow placement="top">
//                 <span>{tab.label}</span>
//               </Tooltip>
//             }
//             icon={
//               <Label
//                 variant={((tab.value === 'all' || tab.value === tabs.value) && 'filled') || 'soft'}
//                 color={
//                   (tab.value === 'active' && 'success') ||
//                   (tab.value === 'success' && 'success') ||
//                   (tab.value === 'inactive' && 'warning') ||
//                   (tab.value === 'partial failed' && 'warning') ||
//                   (tab.value === 'failed' && 'error') ||
//                   'default'
//                 }
//               >
//                 {tab.count}
//               </Label>
//             }
//           />
//         ))}
//       </Tabs>

//       <Stack
//         spacing={2}
//         alignItems="center"
//         direction={isBelow600px ? 'column' : 'row'}
//         sx={{ p: 2.5 }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <TextField
//             fullWidth
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
//         </Box>
//       </Stack>

//       {filters.state.status !== 'all' && (
//         <TableFiltersResult
//           filters={filters}
//           totalResults={filteredRows.length}
//           onResetPage={() => {
//             filters.setState({ ...filters.state, status: 'all', name: '' });
//             onTabChange(null, 'all');
//           }}
//           sx={{ p: '0px 20px 20px 20px' }}
//         />
//       )}

//       <TableContainer>
//         <Box sx={{ position: 'relative' }}>
//           {/* Show TableSelectedAction when items are selected */}

//           {selected.length > 0 && (
//             <TableSelectedAction
//               numSelected={selected.length}
//               rowCount={filteredRows.length}
//               onSelectAllRows={handleSelectAllClick}
//               action={deleteAction(handleDeleteSelected)} // Use the passed deleteAction
//               // action={props.deleteAction(handleDeleteSelected)}
//             />
//           )}

//           <Scrollbar sx={{ minHeight: 300 }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell padding="checkbox">
//                     <Checkbox
//                       indeterminate={selected.length > 0 && selected.length < filteredRows.length}
//                       checked={filteredRows.length > 0 && selected.length === filteredRows.length}
//                       onChange={handleSelectAllClick}
//                     />
//                   </TableCell>
//                   {columns.map((column) => (
//                     <TableCell key={column.id}>{column.label}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {rows.length === 0 ? (
//                   <TableNoData
//                     title="No webhook URL added!"
//                     subTitle="Set up webhooks and receive notification for different events."
//                     learnMoreText="Learn more"
//                     learnMoreLink="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly"
//                     notFound
//                   />
//                 ) : filteredRows.length === 0 ? (
//                   <TableNoData
//                     title="No Results Found!"
//                     subTitle={`No tasks match your search for "${filters.state.name}"`}
//                     notFound
//                   />
//                 ) : (
//                   filteredRows
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row) => (
//                       <TableRow
//                         key={row.id}
//                         hover
//                         selected={selected.includes(row.id)}
//                         onClick={() => handleSelectRow(row.id)}
//                       >
//                         <TableCell padding="checkbox">
//                           {/* <Checkbox checked={selected.includes(row.id)} /> */}

//                           <Checkbox
//                             checked={selected.includes(row.id)}
//                             onClick={(e) => e.stopPropagation()}
//                             onChange={(e) => {
//                               e.stopPropagation();
//                               handleSelectRow(row.id);
//                             }}
//                           />
//                         </TableCell>
//                         {columns.map((column) => (
//                           <TableCell key={column.id}>
//                             {column.render ? column.render(row) : row[column.id]}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                 )}
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </Box>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 20]}
//         component="div"
//         count={filteredRows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={(event, newPage) => setPage(newPage)}
//         onRowsPerPageChange={(event) => {
//           setRowsPerPage(parseInt(event.target.value, 10));
//           setPage(0);
//         }}
//       />
//     </Card>
//   );
// };

// export default CustomTable;

// import { useTheme } from '@emotion/react';
// import React, { useState, useCallback } from 'react';

// import {
//   Box,
//   Tab,
//   Tabs,
//   Card,
//   Table,
//   Stack,
//   Tooltip,
//   Divider,
//   TableRow,
//   Checkbox,
//   TableBody,
//   TableCell,
//   TableHead,
//   TextField,
//   Typography,
//   CardHeader,
//   IconButton,
//   useMediaQuery,
//   TableContainer,
//   InputAdornment,
//   TablePagination,
// } from '@mui/material';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from '../label';
// import { Iconify } from '../iconify';
// import { TableNoData } from '../table';
// import { Scrollbar } from '../scrollbar';
// import { TableFiltersResult } from './table-filters-result';

// const TableSelectedAction = ({ numSelected, rowCount, onSelectAllRows, action }) => (
//   <Stack
//     direction="row"
//     alignItems="center"
//     sx={{
//       pl: 1,
//       pr: 2,
//       top: 0,
//       left: 0,
//       width: '100%',
//       position: 'absolute',
//       height: '58px',
//       bgcolor: 'primary.lighter',
//       zIndex: 1,
//     }}
//   >
//     <Checkbox
//       indeterminate={numSelected > 0 && numSelected < rowCount}
//       checked={rowCount > 0 && numSelected === rowCount}
//       onChange={(event) => onSelectAllRows(event.target.checked)}
//     />

//     <Typography
//       variant="subtitle1"
//       sx={{
//         ml: 2,
//         flexGrow: 1,
//         color: 'primary.main',
//         fontSize: '14px',
//       }}
//     >
//       {numSelected} selected
//     </Typography>

//     {action}
//   </Stack>
// );

// const CustomTable = ({
//   columns,
//   rows = [],
//   tabs,
//   onTabChange,
//   filters,
//   title,
//   onDeleteRows,
//   deleteAction,
//   ReExecuteAction,
//   toolbarButtons, // New prop for custom toolbar buttons
// }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState([]);
//   const theme = useTheme();
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

//   const filteredRows = rows.filter((row) => {
//     const normalizedRowStatus = row.status.toLowerCase();
//     const normalizedFilterStatus = filters.state.status.toLowerCase();

//     const statusMatch =
//       normalizedFilterStatus === 'all' ||
//       (normalizedFilterStatus === 'active' && normalizedRowStatus === 'active') ||
//       (normalizedFilterStatus === 'success' && normalizedRowStatus === 'success') ||
//       (normalizedFilterStatus === 'inactive' && normalizedRowStatus === 'inactive') ||
//       (normalizedFilterStatus === 'partial failed' && normalizedRowStatus === 'partial failed') ||
//       (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

//     const nameMatch =
//       !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

//     return statusMatch && nameMatch;
//   });

//   const handleSelectAllClick = useCallback(
//     (checked) => {
//       if (checked) {
//         const newSelected = filteredRows.map((row) => row.id);
//         setSelected(newSelected);
//       } else {
//         setSelected([]);
//       }
//     },
//     [filteredRows]
//   );

//   const handleSelectRow = useCallback((id) => {
//     setSelected((prevSelected) => {
//       const selectedIndex = prevSelected.indexOf(id);
//       let newSelected = [];

//       if (selectedIndex === -1) {
//         newSelected = [...prevSelected, id];
//       } else {
//         newSelected = [
//           ...prevSelected.slice(0, selectedIndex),
//           ...prevSelected.slice(selectedIndex + 1),
//         ];
//       }

//       return newSelected;
//     });
//   }, []);

//   const handleDeleteSelected = () => {
//     if (onDeleteRows) {
//       onDeleteRows(selected);
//       setSelected([]);
//     }
//   };

//   const handleFilterName = useCallback(
//     (event) => {
//       filters.setState({ ...filters.state, name: event.target.value });
//       setPage(0);
//     },
//     [filters]
//   );

//   // New function to handle row click
//   const handleRowClick = useCallback((event, row) => {
//     // Only handle row click if it's not coming from the checkbox cell
//     if (!event.target.closest('td[data-checkbox-cell="true"]')) {
//       // Add your row click handling logic here
//       console.log('Row clicked:', row);
//     }
//   }, []);

//   return (
//     <Card
//       sx={{
//         boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
//         width: '100%',
//         overflow: 'hidden',
//         mt: 4,
//       }}
//     >
//       {title && (
//         <CardHeader
//           sx={{ p: 3 }}
//           title={
//             <Box>
//               <Typography variant="subtitle2" fontSize={18} fontWeight={600}>
//                 {title}
//               </Typography>
//               <Typography variant="body2" fontSize={14} color="text.secondary">
//                 (Sep 20, 2024 - Oct 05, 2024)
//               </Typography>
//             </Box>
//           }
//         />
//       )}
//       <Divider />

//       <Tabs
//         value={filters.state.status}
//         onChange={(event, newValue) => {
//           filters.setState({ ...filters.state, status: newValue });
//           onTabChange(event, newValue);
//         }}
//         sx={{
//           px: 2.5,
//           boxShadow: (theme1) =>
//             `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
//         }}
//       >
//         {tabs.options.map((tab) => (
//           <Tab
//             key={tab.value}
//             iconPosition="end"
//             value={tab.value}
//             label={
//               <Tooltip title={tab.tooltip} arrow placement="top">
//                 <span>{tab.label}</span>
//               </Tooltip>
//             }
//             icon={
//               <Label
//                 variant={((tab.value === 'all' || tab.value === tabs.value) && 'filled') || 'soft'}
//                 color={
//                   (tab.value === 'active' && 'success') ||
//                   (tab.value === 'success' && 'success') ||
//                   (tab.value === 'inactive' && 'warning') ||
//                   (tab.value === 'partial failed' && 'warning') ||
//                   (tab.value === 'failed' && 'error') ||
//                   'default'
//                 }
//               >
//                 {tab.count}
//               </Label>
//             }
//           />
//         ))}
//       </Tabs>

//       <Stack
//         spacing={2}
//         alignItems="center"
//         direction={isBelow600px ? 'column' : 'row'}
//         sx={{ p: 2.5 }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <TextField
//             fullWidth
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
//         </Box>

//         <Box
//           sx={{
//             display: 'flex',
//             gap: 2,
//             flexDirection: 'row',
//             width: isBelow600px ? '100%' : 'auto',
//             justifyContent: 'flex-end',
//             alignItems: 'center',
//           }}
//         >
//           {ReExecuteAction && (
//             <ReExecuteAction
//               numSelected={selected.length}
//               onReExecute={() => {
//                 console.log('Re-executing selected items:', selected);
//               }}
//             />
//           )}
//           {toolbarButtons}
//           {/* This is where your buttons will appear */}
//         </Box>
//       </Stack>

//       {filters.state.status !== 'all' && (
//         <TableFiltersResult
//           filters={filters}
//           totalResults={filteredRows.length}
//           onResetPage={() => {
//             filters.setState({ ...filters.state, status: 'all', name: '' });
//             onTabChange(null, 'all');
//           }}
//           sx={{ p: '0px 20px 20px 20px' }}
//         />
//       )}

//       <TableContainer>
//         <Box sx={{ position: 'relative' }}>
//           {selected.length > 0 && (
//             <TableSelectedAction
//               numSelected={selected.length}
//               rowCount={filteredRows.length}
//               onSelectAllRows={handleSelectAllClick}
//               action={deleteAction(handleDeleteSelected)}
//             />
//           )}

//           <Scrollbar sx={{ minHeight: 300 }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell padding="checkbox" data-checkbox-cell="true">
//                     <Checkbox
//                       indeterminate={selected.length > 0 && selected.length < filteredRows.length}
//                       checked={filteredRows.length > 0 && selected.length === filteredRows.length}
//                       onChange={(e) => handleSelectAllClick(e.target.checked)}
//                     />
//                   </TableCell>
//                   {columns.map((column) => (
//                     <TableCell key={column.id}>{column.label}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {rows.length === 0 ? (
//                   <TableNoData
//                     title="No webhook URL added!"
//                     subTitle="Set up webhooks and receive notification for different events."
//                     learnMoreText="Learn more"
//                     learnMoreLink="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly"
//                     notFound
//                   />
//                 ) : filteredRows.length === 0 ? (
//                   <TableNoData
//                     title="No Results Found!"
//                     subTitle={`No results found for "${filters.state.name}"`}
//                     notFound
//                   />
//                 ) : (
//                   filteredRows
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row) => (
//                       <TableRow
//                         key={row.id}
//                         hover
//                         selected={selected.includes(row.id)}
//                         onClick={(e) => handleRowClick(e, row)}
//                       >
//                         <TableCell padding="checkbox" data-checkbox-cell="true">
//                           <Checkbox
//                             checked={selected.includes(row.id)}
//                             onChange={() => handleSelectRow(row.id)}
//                             onClick={(e) => e.stopPropagation()}
//                           />
//                         </TableCell>
//                         {columns.map((column) => (
//                           <TableCell key={column.id}>
//                             {column.render ? column.render(row) : row[column.id]}
//                           </TableCell>
//                         ))}

//                         {/* Render Tooltip and Icon */}
//                         <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
//                           <Tooltip title="Click to see options." arrow placement="top">
//                             <IconButton
//                               // color={open ? 'inherit' : 'default'}
//                               onClick={() => console.log('Row details clicked:', row)}
//                             >
//                               <Iconify icon="eva:more-vertical-fill" />
//                             </IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                 )}
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </Box>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 20]}
//         component="div"
//         count={filteredRows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={(event, newPage) => setPage(newPage)}
//         onRowsPerPageChange={(event) => {
//           setRowsPerPage(parseInt(event.target.value, 10));
//           setPage(0);
//         }}
//       />
//     </Card>
//   );
// };

// export default CustomTable;

import { useTheme } from '@emotion/react';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  CardHeader,
  useMediaQuery,
  TableContainer,
  InputAdornment,
  TablePagination,
} from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { Label } from '../label';
import { Iconify } from '../iconify';
import { TableNoData } from '../table';
import { Scrollbar } from '../scrollbar';
import { TableFiltersResult } from './table-filters-result';

const TableSelectedAction = ({ numSelected, rowCount, onSelectAllRows, action }) => (
  <Stack
    direction="row"
    alignItems="center"
    sx={{
      pl: 1,
      pr: 2,
      top: 0,
      left: 0,
      width: '100%',
      position: 'absolute',
      height: '58px',
      bgcolor: 'primary.lighter',
      zIndex: 1,
    }}
  >
    <Checkbox
      indeterminate={numSelected > 0 && numSelected < rowCount}
      checked={rowCount > 0 && numSelected === rowCount}
      onChange={(event) => onSelectAllRows(event.target.checked)}
    />

    <Typography
      variant="subtitle1"
      sx={{
        ml: 2,
        flexGrow: 1,
        color: 'primary.main',
        fontSize: '14px',
      }}
    >
      {numSelected} selected
    </Typography>

    {action}
  </Stack>
);

const CustomTable = ({
  columns,
  rows = [],
  tabs,
  emptyRows,

  onTabChange,
  filters,
  title,
  onDeleteRows,
  deleteAction,
  ReExecuteAction,
  toolbarButtons,
  renderRowOptions,
  noDataProps, // New prop for custom TableNoData configuration
  searchPlaceholder = 'Search...', // New prop for placeholder text
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const theme = useTheme();
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredRows = rows.filter((row) => {
    const normalizedRowStatus = row.status.toLowerCase();
    const normalizedFilterStatus = filters.state.status.toLowerCase();

    const statusMatch =
      normalizedFilterStatus === 'all' ||
      (normalizedFilterStatus === 'active' && normalizedRowStatus === 'active') ||
      (normalizedFilterStatus === 'success' && normalizedRowStatus === 'success') ||
      (normalizedFilterStatus === 'inactive' && normalizedRowStatus === 'inactive') ||
      (normalizedFilterStatus === 'partial failed' && normalizedRowStatus === 'partial failed') ||
      (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

    const nameMatch =
      !filters.state.name ||
      row.workflowName.toLowerCase().includes(filters.state.name.toLowerCase()) ||
      row.folderName.toLowerCase().includes(filters.state.name.toLowerCase()) ||
      row.taskHistoryID.toLowerCase().includes(filters.state.name.toLowerCase());

    return statusMatch && nameMatch;
  });

  const handleSelectAllClick = useCallback(
    (checked) => {
      if (checked) {
        const newSelected = filteredRows.map((row) => row.id);
        setSelected(newSelected);
      } else {
        setSelected([]);
      }
    },
    [filteredRows]
  );

  const handleSelectRow = useCallback((id) => {
    setSelected((prevSelected) => {
      const selectedIndex = prevSelected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = [...prevSelected, id];
      } else {
        newSelected = [
          ...prevSelected.slice(0, selectedIndex),
          ...prevSelected.slice(selectedIndex + 1),
        ];
      }

      return newSelected;
    });
  }, []);

  const handleDeleteSelected = () => {
    if (onDeleteRows) {
      onDeleteRows(selected);
      setSelected([]);
    }
  };

  const handleFilterName = useCallback(
    (event) => {
      filters.setState({ ...filters.state, name: event.target.value });
      setPage(0);
    },
    [filters]
  );

  const handleRowClick = useCallback((event, row) => {
    if (!event.target.closest('td[data-checkbox-cell="true"]') && !event.target.closest('button')) {
      console.log('Row clicked:', row);
    }
  }, []);

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        width: '100%',
        overflow: 'hidden',
        mt: 4,
      }}
    >
      {title && (
        <CardHeader
          sx={{ p: 3 }}
          title={
            <Box>
              <Typography variant="subtitle2" fontSize={18} fontWeight={600}>
                {title}
              </Typography>
              <Typography variant="body2" fontSize={14} color="text.secondary">
                (Sep 20, 2024 - Oct 05, 2024)
              </Typography>
            </Box>
          }
        />
      )}
      <Divider />

      <Tabs
        value={filters.state.status}
        onChange={onTabChange}
        sx={{
          px: 2.5,
          boxShadow: (theme1) =>
            `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
        }}
      >
        {tabs.options.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={
              <Tooltip title={tab.tooltip} arrow placement="top">
                <span>{tab.label}</span>
              </Tooltip>
            }
            icon={
              <Label
                variant={((tab.value === 'all' || tab.value === tabs.value) && 'filled') || 'soft'}
                color={
                  (tab.value === 'active' && 'success') ||
                  (tab.value === 'success' && 'success') ||
                  (tab.value === 'inactive' && 'warning') ||
                  (tab.value === 'partial failed' && 'warning') ||
                  (tab.value === 'failed' && 'error') ||
                  'default'
                }
              >
                {tab.count}
              </Label>
            }
          />
        ))}
      </Tabs>

      <Stack
        spacing={2}
        alignItems="center"
        direction={isBelow600px ? 'column' : 'row'}
        sx={{ p: 2.5 }}
      >
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            disabled={rows.length === 0} // Disable when rows are empty
            // placeholder="Search"
            placeholder={searchPlaceholder} // Use the new prop
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
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {ReExecuteAction && (
            <ReExecuteAction
              numSelected={selected.length}
              onReExecute={() => {
                console.log('Re-executing selected items:', selected);
              }}
            />
          )}
          {toolbarButtons}
        </Box>
      </Stack>

      {filters.state.status !== 'all' && (
        <TableFiltersResult
          filters={filters}
          totalResults={filteredRows.length}
          onResetPage={() => {
            filters.setState({ ...filters.state, status: 'all', name: '' });
            onTabChange(null, 'all');
          }}
          sx={{ p: '0px 20px 20px 20px' }}
        />
      )}

      <TableContainer>
        <Box sx={{ position: 'relative' }}>
          {selected.length > 0 && (
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={filteredRows.length}
              onSelectAllRows={handleSelectAllClick}
              action={deleteAction(handleDeleteSelected)}
            />
          )}

          <Scrollbar sx={{ minHeight: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" data-checkbox-cell="true">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                      checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                      onChange={(e) => handleSelectAllClick(e.target.checked)}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                  <TableCell align="right">{}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.length === 0 ? (
                  <TableNoData {...noDataProps} notFound />
                ) : filteredRows.length === 0 ? (
                  <TableNoData
                    title="No Results Found!"
                    subTitle={
                      <span>
                        No results found for <strong>{`"${filters.state.name}"`}</strong>
                      </span>
                    }
                    notFound
                  />
                ) : (
                  filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        selected={selected.includes(row.id)}
                        onClick={(e) => handleRowClick(e, row)}
                      >
                        <TableCell padding="checkbox" data-checkbox-cell="true">
                          <Checkbox
                            checked={selected.includes(row.id)}
                            onChange={() => handleSelectRow(row.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell key={column.id}>
                            {column.render ? column.render(row) : row[column.id]}
                          </TableCell>
                        ))}
                        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                          {renderRowOptions && renderRowOptions(row)}
                        </TableCell>
                      </TableRow>
                    ))
                )}
                <TableNoData />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Card>
  );
};

export default CustomTable;
