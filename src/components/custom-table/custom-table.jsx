// import { useTheme } from '@emotion/react';
// import React, { useState, useCallback } from 'react';

// import {
//   Box,
//   Tab,
//   Tabs,
//   Table,
//   Paper,
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
//   Card,
// } from '@mui/material';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from '../label';
// import { Iconify } from '../iconify';

// const CustomTable = ({
//   columns,
//   rows,
//   onResetPage,
//   tabs,
//   total,
//   numSelected,
//   publish,
//   onChangePublish,
//   onTabChange,
//   filters,
//   actions,
//   table,
//   title,
//   color = 'warning',
// }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState([]);
//   const theme = useTheme();
//   const [isFilterApplied, setFilterApplied] = useState(false);
//   const STATUS_OPTIONS = tabs?.options || [{ value: 'all', label: 'All' }];
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

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
//       const newSelected = rows.map((row) => row.id);
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
//       onResetPage();
//     },
//     [filters, onResetPage]
//   );

//   const handleFilterStatus = useCallback(
//     (event, newValue) => {
//       filters.setState({ ...filters.state, status: newValue });
//       table.onResetPage();
//     },
//     [filters, table]
//   );

//   const resetFilters = () => {
//     filters.setState({});
//     setFilterApplied(false);
//   };

//   const handleTabChange = (event, newValue) => {
//     setFilters((prev) => ({
//       ...prev,
//       state: { ...prev.state, status: newValue },
//     }));
//   };

//   const [filters, setFilters] = useState({
//   state: { name: '', status: 'all' },
// });

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
//       {/* <Tabs
//         value={filters.state.status}
//         onChange={handleFilterStatus}
//         sx={{
//           px: 2.5,
//           boxShadow: (theme1) =>
//             `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
//         }}
//       >
//         {STATUS_OPTIONS.map((tab) => {
//           // Custom tooltip content for each tab
//           const getTooltipContent = (value) => {
//             switch (value.toLowerCase()) {
//               case 'all':
//                 return 'Show all task execution results.';
//               case 'live':
//                 return 'Show task executions completed successfully.';
//               case 'partialfailed':
//                 return 'Show task executions with partial errors.';
//               case 'failed':
//                 return 'Show task executions that failed due to errors.';
//               default:
//                 return `View ${tab.label} workflows`;
//             }
//           };

//           return (
//             <Tab
//               key={tab.value}
//               iconPosition="end"
//               value={tab.value}
//               label={
//                 <Tooltip
//                   disableInteractive
//                   placement="top"
//                   arrow
//                   title={getTooltipContent(tab.value)}
//                 >
//                   <span>{tab.label}</span>
//                 </Tooltip>
//               }
//               icon={
//                 <Label
//                   variant={
//                     ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
//                     'soft'
//                   }
//                   color={
//                     (tab.value === 'live' && 'success') ||
//                     (tab.value === 'partialfailed' && 'warning') ||
//                     (tab.value === 'failed' && 'error') ||
//                     'default'
//                   }
//                 >
//                   {['live', 'partialfailed', 'failed'].includes(tab.value)
//                     ? rows.filter((row) => row.status.toLowerCase() === tab.value).length
//                     : rows.length}
//                 </Label>
//               }
//             />
//           );
//         })}
//       </Tabs> */}

//       <Tabs
//         value={tabs.value}
//         onChange={handleTabChange}
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
//                   (tab.value === 'live' && 'success') ||
//                   (tab.value === 'partialfailed' && 'warning') ||
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

//       {/* Table */}
//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   indeterminate={selected.length > 0 && selected.length < rows.length}
//                   checked={rows.length > 0 && selected.length === rows.length}
//                   onChange={handleSelectAllClick}
//                 />
//               </TableCell>
//               {columns.map((column) => (
//                 <TableCell key={column.id}>{column.label}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//               <TableRow
//                 key={row.id}
//                 hover
//                 selected={selected.includes(row.id)}
//                 onClick={() => handleSelectRow(row.id)}
//               >
//                 <TableCell padding="checkbox">
//                   <Checkbox checked={selected.includes(row.id)} />
//                 </TableCell>
//                 {columns.map((column) => (
//                   <TableCell key={column.id}>{row[column.id]}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 20]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
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
//   useMediaQuery,
//   TableContainer,
//   InputAdornment,
//   TablePagination,
// } from '@mui/material';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from '../label';
// import { Iconify } from '../iconify';

// const CustomTable = ({
//   columns,
//   rows,
//   onResetPage,
//   tabs,
//   total,
//   numSelected,
//   publish,
//   onChangePublish,
//   onTabChange,
//   filters, // Use this directly from props
//   actions,
//   table,
//   title,
//   color = 'warning',
// }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState([]);
//   const theme = useTheme();
//   const [isFilterApplied, setFilterApplied] = useState(false);
//   const STATUS_OPTIONS = tabs?.options || [{ value: 'all', label: 'All' }];
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

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
//       const newSelected = rows.map((row) => row.id);
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
//       onResetPage();
//     },
//     [filters, onResetPage]
//   );

//   const handleFilterStatus = useCallback(
//     (event, newValue) => {
//       filters.setState({ ...filters.state, status: newValue });
//       table.onResetPage();
//     },
//     [filters, table]
//   );

//   const resetFilters = () => {
//     filters.setState({});
//     setFilterApplied(false);
//   };

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
//         value={tabs.value}
//         onChange={onTabChange}
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
//                   (tab.value === 'live' && 'success') ||
//                   (tab.value === 'partialfailed' && 'warning') ||
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

//       {/* Table */}
//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   indeterminate={selected.length > 0 && selected.length < rows.length}
//                   checked={rows.length > 0 && selected.length === rows.length}
//                   onChange={handleSelectAllClick}
//                 />
//               </TableCell>
//               {columns.map((column) => (
//                 <TableCell key={column.id}>{column.label}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//               <TableRow
//                 key={row.id}
//                 hover
//                 selected={selected.includes(row.id)}
//                 onClick={() => handleSelectRow(row.id)}
//               >
//                 <TableCell padding="checkbox">
//                   <Checkbox checked={selected.includes(row.id)} />
//                 </TableCell>
//                 {columns.map((column) => (
//                   <TableCell key={column.id}>{row[column.id]}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 20]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
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

import { OrderTableFiltersResult } from 'src/sections/history/table-task-history/history-table-filters-result';

import { Label } from '../label';
import { Iconify } from '../iconify';

const CustomTable = ({
  columns,
  rows,
  onResetPage,
  tabs,
  total,
  numSelected,
  publish,
  onChangePublish,
  onTabChange,
  filters,
  actions,
  table,
  title,
  color = 'warning',
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const theme = useTheme();
  const [isFilterApplied, setFilterApplied] = useState(false);
  const STATUS_OPTIONS = tabs?.options || [{ value: 'all', label: 'All' }];
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  // Handlers for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handlers for selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectRow = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // Filter Handlers
  const handleFilterName = useCallback(
    (event) => {
      filters.setState({ ...filters.state, name: event.target.value });
      onResetPage();
    },
    [filters, onResetPage]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      filters.setState({ ...filters.state, status: newValue });
      table.onResetPage();
    },
    [filters, table]
  );

  const resetFilters = () => {
    filters.setState({});
    setFilterApplied(false);
  };

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        width: '100%',
        overflow: 'hidden',
        mt: 4,
      }}
    >
      {/* Title */}
      {title && (
        <CardHeader
          sx={{
            p: 3,
          }}
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

      {/* Tabs */}
      <Tabs
        value={tabs.value}
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
                  (tab.value === 'live' && 'success') ||
                  (tab.value === 'partialfailed' && 'warning') ||
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

      {/* Filters Result */}
      <OrderTableFiltersResult
        filters={filters}
        totalResults={rows.length}
        onResetPage={onResetPage}
        sx={{ p: 2 }}
      />

      {/* Search Input */}
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
            placeholder="Search task history..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>

      {/* Table */}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.id}
                hover
                selected={selected.includes(row.id)}
                onClick={() => handleSelectRow(row.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={selected.includes(row.id)} />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id}>{row[column.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default CustomTable;
