// // import { useState, useCallback } from 'react';

// // import Box from '@mui/material/Box';
// // import Card from '@mui/material/Card';
// // import Button from '@mui/material/Button';
// // import { useTheme } from '@mui/material/styles';
// // import {
// //   Table,
// //   Alert,
// //   Tooltip,
// //   Divider,
// //   Snackbar,
// //   TableBody,
// //   IconButton,
// //   CardHeader,
// //   Typography,
// //   useMediaQuery,
// //   CircularProgress,
// // } from '@mui/material';

// // import { useRouter } from 'src/routes/hooks';

// // import { useBoolean } from 'src/hooks/use-boolean';
// // import { useSetState } from 'src/hooks/use-set-state';

// // import { fIsAfter } from 'src/utils/format-time';

// // import { CONFIG } from 'src/config-global';

// // import { Label } from 'src/components/label';
// // import { Iconify } from 'src/components/iconify';
// // import { Scrollbar } from 'src/components/scrollbar';
// // import { ConfirmDialog } from 'src/components/custom-dialog';
// // import {
// //   useTable,
// //   emptyRows,
// //   rowInPage,
// //   TableNoData,
// //   getComparator,
// //   TableEmptyRows,
// //   TableHeadCustom,
// //   TableSelectedAction,
// //   TablePaginationCustom,
// // } from 'src/components/table';

// // import { OrderTableRow } from './variables-table-row';
// // import { OrderTableToolbar } from './variables-table-toolbar';
// // import { _tasksummary, TASKSUMMARY_STATUS_OPTIONS } from './_variables';
// // import { OrderTableFiltersResult } from './variables-table-filters-result';

// // // ----------------------------------------------------------------------

// // const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };
// // const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...TASKSUMMARY_STATUS_OPTIONS];

// // const TABLE_HEAD = [
// //   { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
// //   { id: 'createdOn', label: 'Created On', width: '200', tooltip: 'Custom variable created on.' },
// //   {
// //     id: 'variableName',
// //     label: 'Variable Name',
// //     width: '300',
// //     tooltip: 'Name of the custom variable.',
// //   },
// //   {
// //     id: 'variableData',
// //     label: 'Variable Data',
// //     width: '200',
// //     tooltip: 'Actual value of the custom variable.',
// //   },
// //   {
// //     id: 'lastUpdatedOn',
// //     label: 'Last Updated On',
// //     width: '200',
// //     whiteSpace: 'nowrap',
// //     align: 'right',
// //     tooltip: 'Custom variable last updated on.',
// //   },
// //   { id: '', width: 50 },
// // ];

// // export default function VariablesTable({ sx, icon, title, total, color = 'warning', ...other }) {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
// //   const table = useTable({ defaultOrderBy: 'orderNumber' });
// //   const router = useRouter();
// //   const confirm = useBoolean();
// //   const [tableData, setTableData] = useState(_tasksummary);

// //   const filters = useSetState({
// //     name: '', // Initialize name filter state
// //     status: 'all',
// //     startDate: null,
// //     endDate: null,
// //   });

// //   const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

// //   const dataFiltered = applyFilter({
// //     inputData: tableData,
// //     comparator: getComparator(table.order, table.orderBy),
// //     filters: filters.state,
// //     dateError,
// //   });

// //   const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

// //   const canReset = !!filters.state.name || filters.state.status !== 'all';

// //   const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

// //   const handleDeleteRow = useCallback(
// //     (id) => {
// //       const deleteRow = tableData.filter((row) => row.id !== id);
// //       setTableData(deleteRow);
// //       table.onUpdatePageDeleteRow(dataInPage.length);
// //     },
// //     [dataInPage.length, table, tableData]
// //   );

// //   const handleConfirmDelete = () => {
// //     confirm.onFalse(); // Close the dialog after confirming
// //     handleDeleteRow(confirm.rowToDelete);
// //   };

// //   /* Delete Success Snackbar */

// //   const [confirmDelete, setConfirmDelete] = useState(false);
// //   const [confirmDialogProps, setConfirmDialogProps] = useState({});

// //   const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

// //   const handleSuccessSnackbarClose = (event, reason) => {
// //     if (reason === 'clickaway') return;
// //     setSuccessSnackbarOpen(false);
// //   };

// //   const handleCloseConfirmDelete = () => {
// //     setConfirmDelete(false);
// //   };

// //   const handleCloseConfirmDialog = () => {
// //     setConfirmDelete(false);
// //     setConfirmDialogProps({});
// //   };

// //   const handleOpenConfirmDialog = (action) => {
// //     setConfirmDialogProps(action);
// //     setConfirmDelete(true);
// //   };

// //   // Modify these conditions at the top of your component
// //   const nowebhookAdded = tableData.length === 0; // When no tasks exist at all
// //   const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results
// //   const noFilterResults = dataFiltered.length === 0 && !filters.state.name; // When filters result in no data

// //   // LoadingButton
// //   const [isLoading, setIsLoading] = useState(false);

// //   return (
// //     <>
// //       {/* Table */}
// //       <Card
// //         sx={{
// //           boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
// //           mt: 4,
// //         }}
// //       >
// //         <CardHeader
// //           title={
// //             <Box>
// //               <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
// //                 <Tooltip
// //                   title="System Variables are pre-defined variables offered inside Pabbly Connect. It is
// //                   useful to print the values for time etc. You can't modify the value of any system
// //                   variable."
// //                   arrow
// //                   placement="bottom"
// //                 >
// //                   Custom Variables
// //                 </Tooltip>
// //               </Box>
// //             </Box>
// //           }
// //           action={total && <Label color={color}>{total}</Label>}
// //           sx={{
// //             p: 3,
// //           }}
// //         />
// //         <Divider />

// //         <OrderTableToolbar
// //           filters={filters}
// //           onResetPage={table.onResetPage}
// //           dateError={dateError}
// //           numSelected={table.selected.length}
// //         />

// //         {canReset && (
// //           <OrderTableFiltersResult
// //             filters={filters}
// //             totalResults={dataFiltered.length}
// //             onResetPage={table.onResetPage}
// //             sx={{ p: 2.5, pt: 0 }}
// //           />
// //         )}

// //         <Box sx={{ position: 'relative' }}>
// //           <TableSelectedAction
// //             dense={table.dense}
// //             numSelected={table.selected.length}
// //             rowCount={dataFiltered.length}
// //             onSelectAllRows={(checked) =>
// //               table.onSelectAllRows(
// //                 checked,
// //                 dataFiltered.map((row) => row.id)
// //               )
// //             }
// //             action={
// //               <Tooltip title="Delete the selected variables." placement="bottom" arrow>
// //                 <IconButton
// //                   color="primary"
// //                   onClick={() =>
// //                     handleOpenConfirmDialog({
// //                       onConfirm: () => handleDeleteRow(),
// //                     })
// //                   }
// //                 >
// //                   <Iconify icon="solar:trash-bin-trash-bold" />
// //                 </IconButton>
// //               </Tooltip>
// //             }
// //           />

// //           <Scrollbar>
// //             {notFound ? (
// //               <Box>
// //                 <Divider />
// //                 <Box sx={{ textAlign: 'center', borderRadius: 1.5, p: 3 }}>
// //                   <Typography variant="h6" sx={{ mb: 1 }}>
// //                     Not found
// //                   </Typography>
// //                   <Typography variant="body2">
// //                     No results found for <strong>{`"${filters.state.name}"`}</strong>.
// //                     <br />
// //                     Try checking for typos or using complete words.
// //                   </Typography>
// //                 </Box>
// //               </Box>
// //             ) : (
// //               <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
// //                 <TableHeadCustom
// //                   showCheckbox
// //                   order={table.order}
// //                   orderBy={table.orderBy}
// //                   headLabel={TABLE_HEAD}
// //                   rowCount={dataFiltered.length}
// //                   numSelected={table.selected.length}
// //                   onSort={table.onSort}
// //                   onSelectAllRows={(checked) =>
// //                     table.onSelectAllRows(
// //                       checked,
// //                       dataFiltered.map((row) => row.id)
// //                     )
// //                   }
// //                 />

// //                 <TableBody>
// //                   {dataFiltered
// //                     .slice(
// //                       table.page * table.rowsPerPage,
// //                       table.page * table.rowsPerPage + table.rowsPerPage
// //                     )
// //                     .map((row, index) => (
// //                       <OrderTableRow
// //                         key={row.id}
// //                         row={row}
// //                         selected={table.selected.includes(row.id)}
// //                         onSelectRow={() => table.onSelectRow(row.id)}
// //                         onDeleteRow={() => handleDeleteRow(row.id)}
// //                         serialNumber={table.page * table.rowsPerPage + index + 1}
// //                       />
// //                     ))}

// //                   <TableEmptyRows
// //                     height={table.dense ? 56 : 76}
// //                     emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
// //                   />
// //                   <TableNoData />
// //                 </TableBody>
// //               </Table>
// //             )}
// //           </Scrollbar>
// //         </Box>

// //         <TablePaginationCustom
// //           page={table.page}
// //           dense={table.dense}
// //           count={dataFiltered.length}
// //           rowsPerPage={table.rowsPerPage}
// //           onPageChange={table.onChangePage}
// //           onChangeDense={table.onChangeDense}
// //           onRowsPerPageChange={table.onChangeRowsPerPage}
// //         />
// //       </Card>

// //       <ConfirmDialog
// //         open={confirmDelete}
// //         onClose={handleCloseConfirmDelete}
// //         title="Do you want to delete the selected variables?"
// //         content="You won't be able to revert this action!"
// //         action={
// //           <Button
// //             variant="contained"
// //             color="error"
// //             onClick={() => {
// //               // Add your revoke tasks logic here
// //               handleCloseConfirmDelete(); // Close the dialog after revoking tasks
// //               setSuccessSnackbarOpen(true); // Show success snackbar
// //             }}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
// //           </Button>
// //         }
// //       />

// //       {/* Delete Success Snackbar */}
// //       <Snackbar
// //         open={successSnackbarOpen}
// //         autoHideDuration={2500}
// //         onClose={handleSuccessSnackbarClose}
// //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// //         sx={{
// //           boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
// //           mt: 13,
// //           zIndex: theme.zIndex.modal + 9999,
// //         }}
// //       >
// //         <Alert
// //           onClose={handleSuccessSnackbarClose}
// //           severity="success"
// //           sx={{
// //             width: '100%',
// //             fontSize: '14px',
// //             fontWeight: 'bold',
// //             backgroundColor: theme.palette.background.paper,
// //             color: theme.palette.text.primary,
// //           }}
// //         >
// //           Variables deleted successfully!
// //         </Alert>
// //       </Snackbar>
// //     </>
// //   );
// // }

// // function applyFilter({ inputData, filters }) {
// //   const { name } = filters;

// //   // Filter by variable name (name filter)
// //   if (name) {
// //     inputData = inputData.filter((variable) =>
// //       variable.variableName.toLowerCase().includes(name.toLowerCase())
// //     );
// //   }

// //   return inputData;
// // }

// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
// import {
//   Table,
//   Tooltip,
//   Divider,
//   TableBody,
//   IconButton,
//   CardHeader,
//   Typography,
//   useMediaQuery,
//   CircularProgress,
// } from '@mui/material';

// import { useRouter } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { useSetState } from 'src/hooks/use-set-state';

// import { fIsAfter } from 'src/utils/format-time';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
// import {
//   useTable,
//   emptyRows,
//   rowInPage,
//   TableNoData,
//   getComparator,
//   TableEmptyRows,
//   TableHeadCustom,
//   TableSelectedAction,
//   TablePaginationCustom,
// } from 'src/components/table';

// import { _tasksummary } from './_variables';
// import { OrderTableRow } from './variables-table-row';
// import { OrderTableToolbar } from './variables-table-toolbar';
// import { OrderTableFiltersResult } from './variables-table-filters-result';

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
//   { id: 'createdOn', label: 'Created On', width: '200', tooltip: 'Custom variable created on.' },
//   {
//     id: 'variableName',
//     label: 'Variable Name',
//     width: '300',
//     tooltip: 'Name of the custom variable.',
//   },
//   {
//     id: 'variableData',
//     label: 'Variable Data',
//     width: '200',
//     tooltip: 'Actual value of the custom variable.',
//   },
//   {
//     id: 'lastUpdatedOn',
//     label: 'Last Updated On',
//     width: '200',
//     whiteSpace: 'nowrap',
//     align: 'right',
//     tooltip: 'Custom variable last updated on.',
//   },
//   { id: '', width: 50 },
// ];

// export default function VariablesTable({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const table = useTable({ defaultOrderBy: 'orderNumber' });
//   const router = useRouter();
//   const confirm = useBoolean();
//   const [tableData, setTableData] = useState(_tasksummary);

//   const filters = useSetState({
//     name: '', // Initialize name filter state
//     status: 'all',
//     startDate: null,
//     endDate: null,
//   });

//   const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

//   const dataFiltered = applyFilter({
//     inputData: tableData,
//     comparator: getComparator(table.order, table.orderBy),
//     filters: filters.state,
//     dateError,
//   });

//   const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

//   const canReset = !!filters.state.name || filters.state.status !== 'all';

//   const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

//   const handleDeleteRow = useCallback(
//     (id) => {
//       const deleteRow = tableData.filter((row) => row.id !== id);
//       setTableData(deleteRow);
//       table.onUpdatePageDeleteRow(dataInPage.length);
//     },
//     [dataInPage.length, table, tableData]
//   );

//   const handleConfirmDelete = () => {
//     confirm.onFalse(); // Close the dialog after confirming
//     handleDeleteRow(confirm.rowToDelete);
//   };

//   /* Delete Success Snackbar */

//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [confirmDialogProps, setConfirmDialogProps] = useState({});

//   const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('Variables deleted successfully!');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

//   // Modify these conditions at the top of your component
//   const novariablesAdded = tableData.length === 0; // When no tasks exist at all
//   const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results

//   // LoadingButton
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <>
//       {/* Table */}
//       <Card
//         sx={{
//           boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
//           mt: 4,
//         }}
//       >
//         <CardHeader
//           title={
//             <Box>
//               <Typography variant="subtitle2" sx={{ fontSize: '18px', fontWeight: 600 }}>
//                 <Tooltip
//                   title="System Variables are pre-defined variables offered inside Pabbly Connect. It is useful to print the values for time etc. You can't modify the value of any system variable."
//                   arrow
//                   placement="bottom"
//                 >
//                   <span>Custom Variables</span>
//                 </Tooltip>
//               </Typography>
//             </Box>
//           }
//           action={total && <Label color={color}>{total}</Label>}
//           sx={{
//             p: 3,
//           }}
//         />

//         <Divider />

//         <OrderTableToolbar
//           filters={filters}
//           onResetPage={table.onResetPage}
//           dateError={dateError}
//           numSelected={table.selected.length}
//           novariablesAdded={novariablesAdded}
//         />

//         {canReset && (
//           <OrderTableFiltersResult
//             filters={filters}
//             totalResults={dataFiltered.length}
//             onResetPage={table.onResetPage}
//             sx={{ p: 2.5, pt: 0 }}
//           />
//         )}

//         <Box sx={{ position: 'relative' }}>
//           <TableSelectedAction
//             dense={table.dense}
//             numSelected={table.selected.length}
//             rowCount={dataFiltered.length}
//             onSelectAllRows={(checked) =>
//               table.onSelectAllRows(
//                 checked,
//                 dataFiltered.map((row) => row.id)
//               )
//             }
//             action={
//               <Tooltip title="Delete the selected variables." placement="bottom" arrow>
//                 <IconButton
//                   color="primary"
//                   onClick={() =>
//                     handleOpenConfirmDialog({
//                       onConfirm: () => handleDeleteRow(),
//                     })
//                   }
//                 >
//                   <Iconify icon="solar:trash-bin-trash-bold" />
//                 </IconButton>
//               </Tooltip>
//             }
//           />

//           <Scrollbar>
//             <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
//               <TableHeadCustom
//                 showCheckbox
//                 order={table.order}
//                 orderBy={table.orderBy}
//                 headLabel={TABLE_HEAD}
//                 rowCount={dataFiltered.length}
//                 numSelected={table.selected.length}
//                 onSort={table.onSort}
//                 onSelectAllRows={(checked) =>
//                   table.onSelectAllRows(
//                     checked,
//                     dataFiltered.map((row) => row.id)
//                   )
//                 }
//               />
//               {novariablesAdded ? (
//                 <TableNoData
//                   title="No custom variables added!"
//                   subTitle="You may not have created any variables yet."
//                   learnMoreText="Learn more"
//                   learnMoreLink="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/"
//                   // tooltipTitle="Buy agency tasks plan to assign agency tasks to other Pabbly Connect accounts."
//                   notFound
//                 />
//               ) : noSearchResults ? (
//                 <TableNoData
//                   title="Search Not Found!"
//                   subTitle={
//                     <span>
//                       No results found for <strong>{`"${filters.state.name}"`}</strong>
//                     </span>
//                   }
//                   notFound
//                 />
//               ) : (
//                 <TableBody>
//                   {dataFiltered
//                     .slice(
//                       table.page * table.rowsPerPage,
//                       table.page * table.rowsPerPage + table.rowsPerPage
//                     )
//                     .map((row, index) => (
//                       <OrderTableRow
//                         key={row.id}
//                         row={row}
//                         selected={table.selected.includes(row.id)}
//                         onSelectRow={() => table.onSelectRow(row.id)}
//                         onDeleteRow={() => handleDeleteRow(row.id)}
//                         serialNumber={table.page * table.rowsPerPage + index + 1}
//                       />
//                     ))}

//                   <TableEmptyRows
//                     height={table.dense ? 56 : 76}
//                     emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
//                   />
//                   <TableNoData />
//                 </TableBody>
//               )}
//             </Table>
//           </Scrollbar>
//         </Box>

//         <TablePaginationCustom
//           disabled={novariablesAdded} // Disabled When No Variables Added!
//           page={table.page}
//           dense={table.dense}
//           count={dataFiltered.length}
//           rowsPerPage={table.rowsPerPage}
//           onPageChange={table.onChangePage}
//           onChangeDense={table.onChangeDense}
//           onRowsPerPageChange={table.onChangeRowsPerPage}
//         />
//       </Card>

//       <ConfirmDialog
//         open={confirmDelete}
//         onClose={handleCloseConfirmDelete}
//         title="Do you want to delete the selected variables?"
//         content="You won't be able to revert this action!"
//         action={
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               // Add your revoke tasks logic here
//               handleCloseConfirmDelete(); // Close the dialog after revoking tasks
//               setSnackbarMessage('Variables deleted successfully!');
//               setSnackbarSeverity('success');
//               setSuccessSnackbarOpen(true); // Show success snackbar
//             }}
//             disabled={isLoading}
//           >
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
//           </Button>
//         }
//       />

//       {/* Delete Success Snackbar */}
//       <CustomSnackbar
//         open={successSnackbarOpen}
//         onClose={handleSuccessSnackbarClose}
//         message={snackbarMessage}
//         severity={snackbarSeverity}
//       />
//     </>
//   );
// }

// function applyFilter({ inputData, filters }) {
//   const { name } = filters;

//   // Filter by variable name (name filter)
//   if (name) {
//     inputData = inputData.filter((variable) =>
//       variable.variableName.toLowerCase().includes(name.toLowerCase())
//     );
//   }

//   return inputData;
// }

import { toast } from 'sonner';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  Tooltip,
  Divider,
  TableBody,
  IconButton,
  CardHeader,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { _tasksummary } from './_variables';
import { OrderTableRow } from './variables-table-row';
import { OrderTableToolbar } from './variables-table-toolbar';
import { OrderTableFiltersResult } from './variables-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
  { id: 'createdOn', label: 'Created On', width: '200', tooltip: 'Custom variable created on.' },
  {
    id: 'variableName',
    label: 'Variable Name',
    width: '300',
    tooltip: 'Name of the custom variable.',
  },
  {
    id: 'variableData',
    label: 'Variable Data',
    width: '200',
    tooltip: 'Actual value of the custom variable.',
  },
  {
    id: 'lastUpdatedOn',
    label: 'Last Updated On',
    width: '200',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Custom variable last updated on.',
  },
  { id: '', width: 50 },
];

export default function VariablesTable({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(_tasksummary);

  const filters = useSetState({
    name: '', // Initialize name filter state
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!filters.state.name || filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      setIsLoading(true); // Set loading state to true
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);

      // Show success snackbar
      toast.success('Variable deleted successfully!');

      // setTimeout(() => {
      confirm.onFalse(); // Close ConfirmDialog after the action
      setIsLoading(false); // Reset loading state
      // }, 500); // Add a small delay to simulate action completion
    },
    [dataInPage.length, table, tableData, confirm]
  );

  const novariablesAdded = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {/* Table */}
      <Card
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
          mt: 4,
        }}
      >
        <CardHeader
          title={
            <Box>
              <Typography variant="subtitle2" sx={{ fontSize: '18px', fontWeight: 600 }}>
                <Tooltip
                  title="Custom variables are useful to store and manipulate data within your workflows."
                  arrow
                  placement="top"
                >
                  <span>Custom Variables</span>
                </Tooltip>
              </Typography>
            </Box>
          }
          action={total && <Label color={color}>{total}</Label>}
          sx={{
            p: 3,
          }}
        />

        <Divider />

        <OrderTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
          numSelected={table.selected.length}
          novariablesAdded={novariablesAdded}
        />

        {canReset && (
          <OrderTableFiltersResult
            filters={filters}
            totalResults={dataFiltered.length}
            onResetPage={table.onResetPage}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete the selected variables." placement="bottom" arrow>
                <IconButton
                  color="primary"
                  onClick={() =>
                    confirm.onTrue({
                      onConfirm: () => handleDeleteRow(),
                    })
                  }
                >
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                showCheckbox
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
              />
              {novariablesAdded ? (
                <TableNoData
                  title="No custom variables added!"
                  subTitle="You may not have created any variables yet."
                  learnMoreText="Learn more"
                  learnMoreLink="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/"
                  notFound
                />
              ) : noSearchResults ? (
                <TableNoData
                  title="Search Not Found!"
                  subTitle={
                    <span>
                      No results found for <strong>{`"${filters.state.name}"`}</strong>
                    </span>
                  }
                  notFound
                />
              ) : (
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        serialNumber={table.page * table.rowsPerPage + index + 1}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 76}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />
                  <TableNoData />
                </TableBody>
              )}
            </Table>
          </Scrollbar>
        </Box>

        <TablePaginationCustom
          disabled={novariablesAdded}
          page={table.page}
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <ConfirmDialog
        open={confirm.value}
        onClose={() => confirm.onFalse()} // Close the dialog on cancellation
        title="Do you want to delete the selected variables?"
        content="You won't be able to revert this action!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteRow()} // Trigger delete logic
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, filters }) {
  const { name } = filters;

  // Filter by variable name (name filter)
  if (name) {
    inputData = inputData.filter((variable) =>
      variable.variableName.toLowerCase().includes(name.toLowerCase())
    );
  }

  return inputData;
}
