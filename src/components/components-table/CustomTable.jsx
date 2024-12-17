// import React, { useMemo, useState } from 'react';

// import {
//   Tab,
//   Box,
//   Tabs,
//   Table,
//   Paper,
//   TableRow,
//   TableBody,
//   TableCell,
//   TableHead,
//   TextField,
//   TableContainer,
//   InputAdornment,
//   TablePagination,
// } from '@mui/material';

// import { Iconify } from 'src/components/iconify';

// export function CustomTable({
//   title,
//   columns,
//   rows,
//   filters = {},
//   onTabChange,
//   tabs = [],
//   searchPlaceholder = 'Search...',
//   primaryKey = 'id',
//   rowsPerPageOptions = [5, 10, 25],
// }) {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Handle tab change
//   const handleTabChange = (event, newValue) => {
//     if (onTabChange) {
//       onTabChange(newValue);
//     }
//   };

//   // Handle search input
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   // Filter rows based on search term
//   const filteredRows = useMemo(() => {
//     if (!searchTerm) return rows;

//     return rows.filter((row) =>
//       columns.some((column) =>
//         String(row[column.id]).toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [rows, searchTerm, columns]);

//   // Paginated rows
//   const paginatedRows = useMemo(() => {
//     const startIndex = page * rowsPerPage;
//     return filteredRows.slice(startIndex, startIndex + rowsPerPage);
//   }, [filteredRows, page, rowsPerPage]);

//   // Handle page change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', mb: 2 }}>
//       {/* Title and Tabs */}
//       {(title || tabs.length > 0) && (
//         <Box
//           sx={{
//             borderBottom: 1,
//             borderColor: 'divider',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             p: 2,
//           }}
//         >
//           {title && <h2>{title}</h2>}
//           {tabs.length > 0 && (
//             <Tabs value={filters.state?.status || 'all'} onChange={handleTabChange}>
//               {tabs.map((tab) => (
//                 <Tab key={tab.value} label={tab.label} value={tab.value} />
//               ))}
//             </Tabs>
//           )}
//         </Box>
//       )}

//       {/* Search Input */}
//       <Box sx={{ p: 2 }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           placeholder={searchPlaceholder}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* Table */}
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id}>{column.label}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedRows.map((row) => (
//               <TableRow key={row[primaryKey]}>
//                 {columns.map((column) => (
//                   <TableCell key={`${row[primaryKey]}-${column.id}`}>{row[column.id]}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={rowsPerPageOptions}
//         component="div"
//         count={filteredRows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

import { useTheme } from '@emotion/react';
import React, { useMemo, useState } from 'react';

import {
  Box,
  Tab,
  Tabs,
  Paper,
  Table,
  Stack,
  Tooltip,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  useMediaQuery,
  TableContainer,
  InputAdornment,
  TablePagination,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

export function CustomTable({
  title,
  columns,
  rows,
  filters = {},
  tabs = {
    value: 'all',
    options: [],
  },
  onTabChange,
  searchPlaceholder = 'Search...',
  primaryKey = 'id',
  rowsPerPageOptions = [5, 10, 25],
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Filter rows based on search term and tab status
  const filteredRows = useMemo(() => {
    let result = rows;

    // Filter by search term
    if (searchTerm) {
      result = result.filter((row) =>
        columns.some((column) =>
          String(row[column.id]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by tab status
    if (tabs.value !== 'all') {
      result = result.filter((row) => row.status === tabs.value);
    }

    return result;
  }, [rows, searchTerm, columns, tabs.value]);

  // Paginated rows
  const paginatedRows = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredRows.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredRows, page, rowsPerPage]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      {/* Title and Tabs */}
      {(title || tabs.options.length > 0) && (
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
          }}
        >
          {title && <h2>{title}</h2>}
          {tabs.options.length > 0 && (
            <Tabs
              value={tabs.value}
              onChange={handleTabChange}
              sx={{
                px: 2.5,
                boxShadow: (themea) =>
                  `inset 0 -2px 0 0 ${theme.vars.palette.grey['500Channel'] || 'rgba(0,0,0,0.08)'}`,
              }}
            >
              {tabs.options.map((tab) => (
                <Tab
                  key={tab.value}
                  iconPosition="end"
                  value={tab.value}
                  label={
                    <Tooltip title={tab.tooltip || ''} arrow placement="top">
                      <span>{tab.label}</span>
                    </Tooltip>
                  }
                  icon={
                    <Label
                      variant={tab.value === 'all' || tab.value === tabs.value ? 'filled' : 'soft'}
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
          )}
        </Box>
      )}

      {/* Search Input */}
      {/* <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box> */}

      {/* Search Input */}
      <Stack
        spacing={2}
        alignItems="center"
        direction={isBelow600px ? 'column' : 'row'}
        sx={{ p: 2.5 }}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Stack>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row[primaryKey]}>
                {columns.map((column) => (
                  <TableCell key={`${row[primaryKey]}-${column.id}`}>{row[column.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
