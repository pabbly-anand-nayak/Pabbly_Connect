// import { toast } from 'sonner';
// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import { useTheme } from '@mui/material/styles';
// import {
//   Tab,
//   Tabs,
//   Table,
//   Button,
//   Tooltip,
//   Divider,
//   TableBody,
//   IconButton,
//   CardHeader,
//   Typography,
//   useMediaQuery,
// } from '@mui/material';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { useSetState } from 'src/hooks/use-set-state';

// import { fIsAfter, fIsBetween } from 'src/utils/format-time';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';
// import {
//   useTable,
//   rowInPage,
//   TableNoData,
//   getComparator,
//   TableHeadCustom,
//   TableSelectedAction,
//   TablePaginationCustom,
// } from 'src/components/table';

// import { ConfirmDialog } from '../custom-dialog';
// import { OrderTableRow } from './connections-table-row';
// import { OrderTableToolbar } from './connections-table-toolbar';
// import { _connections, CONNECTIONS_STATUS_OPTIONS } from './_connections';
// import { OrderTableFiltersResult } from './connections-table-filters-result';

// // ----------------------------------------------------------------------

// const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...CONNECTIONS_STATUS_OPTIONS];

// const TABLE_HEAD = [
//   {
//     id: 'sno',
//     label: 'Connection Status/Date',
//     width: 'flex',
//     whiteSpace: 'nowrap',
//     tooltip:
//       'The status of the connection, whether it is in use or idle, and the connection creation date.',
//   },

//   {
//     id: 'orderNumber',
//     label: 'Connection & Application Name',
//     width: 280,
//     whiteSpace: 'nowrap',
//     tooltip: 'Name of the connection and the application which are connected.',
//   },

//   {
//     id: 'connectionstatus',
//     label: 'No. of Workflows',
//     width: 'flex',
//     whiteSpace: 'nowrap',
//     align: 'right',
//     tooltip: 'Number of workflows using the connection.',
//   },
//   // {
//   //   id: 'name',
//   //   label: 'Connection Status',
//   //   width: 180,
//   //   tooltip: 'Status of the connection whether it is in use or idle.',
//   // },

//   { id: '', width: 10 },
// ];

// export default function ConnectionsTable({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const table = useTable({ defaultOrderBy: 'orderNumber' });
//   const router = useRouter();
//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [confirmDialogProps, setConfirmDialogProps] = useState({});

//   const confirm = useBoolean();
//   const [tableData, setTableData] = useState(_connections);

//   const filters = useSetState({
//     name: '',
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

//   const canReset =
//     !!filters.state.name ||
//     filters.state.status !== 'all' ||
//     (!!filters.state.startDate && !!filters.state.endDate);

//   const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

//   const handleDeleteRow = useCallback(
//     (id) => {
//       const deleteRow = tableData.filter((row) => row.id !== id);
//       setTableData(deleteRow);
//       table.onUpdatePageDeleteRow(dataInPage.length);
//     },
//     [dataInPage.length, table, tableData]
//   );

//   const handleViewRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.order.details(id));
//     },
//     [router]
//   );

//   const handleFilterStatus = useCallback(
//     (event, newValue) => {
//       table.onResetPage();
//       filters.setState({ status: newValue });
//     },
//     [filters, table]
//   );


//   const handleCloseConfirmDelete = () => {
//     setConfirmDelete(false);
//     toast.error('Connection Deleted Successfully!', {
//       duration: Infinity,
//       description: 'Note that some connections might not be deleted if they are being used in any workflow.',
//     })
//   };


//   const handleOpenConfirmDialog = (action) => {
//     setConfirmDialogProps(action);
//     setConfirmDelete(true);
//   };

//   // Modify these conditions at the top of your component
//   const noTasksEver = tableData.length === 0; // When no tasks exist at all
//   const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results
//   const noFilterResults = dataFiltered.length === 0 && !filters.state.name; // When filters result in no data

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
//                   title="View and manage all apps connected to your account."
//                   arrow
//                   placement="bottom"
//                 >
//                   Connection Details
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

//         <Tabs
//           value={filters.state.status}
//           onChange={handleFilterStatus}
//           sx={{
//             px: 2.5,
//             boxShadow: (theme1) =>
//               `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
//           }}
//         >
//           {STATUS_OPTIONS.map((tab) => {
//             const getTooltipContent = (value) => {
//               switch (value.toLowerCase()) {
//                 case 'all':
//                   return 'Shows the total number of connections.';
//                 case 'revocable':
//                   return 'Shows the number of active connections currently in use.';
//                 case 'non-revocable':
//                   return 'Shows the number of idle connections available.';
//                 default:
//                   return `View ${tab.label} connections`;
//               }
//             };

//             return (
//               <Tab
//                 key={tab.value}
//                 iconPosition="end"
//                 value={tab.value}
//                 label={
//                   <Tooltip
//                     disableInteractive
//                     placement="top"
//                     arrow
//                     title={getTooltipContent(tab.value)}
//                   >
//                     <span>{tab.label}</span>
//                   </Tooltip>
//                 }
//                 icon={
//                   <Label
//                     variant={
//                       ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
//                       'soft'
//                     }
//                     color={
//                       (tab.value.toLowerCase() === 'revocable' && 'success') ||
//                       (tab.value.toLowerCase() === 'non-revocable' && 'error') ||
//                       'default'
//                     }
//                   >
//                     {['revocable', 'non-revocable'].includes(tab.value.toLowerCase())
//                       ? tableData.filter((connection) => connection.status === tab.value).length
//                       : tableData.length}
//                   </Label>
//                 }
//               />
//             );
//           })}
//         </Tabs>

//         <OrderTableToolbar
//           filters={filters}
//           onResetPage={table.onResetPage}
//           dateError={dateError}
//           numSelected={table.selected.length}
//           // novariablesAdded={novariablesAdded}
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
//               <Tooltip title="Delete">
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
//               {noTasksEver ? (
//                 <TableNoData
//                   title="No connections are available!"
//                   subTitle="There may be no connections for your applied filter conditions or you may not have created any connections yet."
//                   learnMoreText="Learn more"
//                   learnMoreLink="https://www.pabbly.com/privacy-policy/#data-policy"
//                   // tooltipTitle="Buy agency tasks plan to assign agency tasks to other Pabbly Connect accounts."
//                   notFound
//                 />
//               ) : noSearchResults ? (
//                 <TableNoData
//                   title="Search Not Found!"
//                   subTitle={
//                     <span>
//                       No results found for &#34;<strong>{filters.state.name}</strong>&#34;
//                     </span>
//                   }
//                   notFound
//                 />
//               ) : noFilterResults ? (
//                 <TableNoData
//                   title="No Results Found!"
//                   subTitle="No tasks match your current filter criteria."
//                   tooltipTitle="Adjust your filters to view agency tasks."
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
//                         onDeleteRow={() => handleDeleteRow(row.id)}
//                         onSelectRow={() => table.onSelectRow(row.id)}
//                         onViewRow={() => handleViewRow(row.id)}
//                         serialNumber={table.page * table.rowsPerPage + index + 1}
//                       />
//                     ))}

//                   <TableNoData />
//                 </TableBody>
//               )}
//             </Table>
//           </Scrollbar>
//         </Box>

//         <TablePaginationCustom
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
//         title="Do you really want to delete the selected Connections?"
//         content="You won't be able to revert this action!"
//         action={
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               // Add your revoke tasks logic here
//               handleCloseConfirmDelete(); // Close the dialog after revoking tasks
//             }}
//           >
//             Delete
//           </Button>
//         }
//       />


//     </>
//   );
// }

// function applyFilter({ inputData, comparator, filters, dateError }) {
//   const { status, name, startDate, endDate } = filters;

//   const stabilizedThis = inputData.map((el, index) => [el, index]);

//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   inputData = stabilizedThis.map((el) => el[0]);

//   // Filter by workflow name (name filter)
//   if (name) {
//     inputData = inputData.filter((workflow) =>
//       workflow.workflowName.toLowerCase().includes(name.toLowerCase())
//     );
//   }

//   // Filter by status
//   if (status !== 'all') {
//     inputData = inputData.filter((workflow) => workflow.status === status);
//   }

//   // Filter by date range if no error in date range
//   if (!dateError && startDate && endDate) {
//     inputData = inputData.filter((workflow) => fIsBetween(workflow.createdOn, startDate, endDate));
//   }

//   return inputData;
// }





import { toast } from 'sonner';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  IconButton,
  CardHeader,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';

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

import { OrderTableRow } from './connections-table-row';
import { OrderTableToolbar } from './connections-table-toolbar';
import { _connections, CONNECTIONS_STATUS_OPTIONS } from './_connections';
import { OrderTableFiltersResult } from './connections-table-filters-result';

const TABLE_HEAD = [
  {
    id: 'sno',
    label: 'Connection Status/Date',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip:
      'The status of the connection, whether it is in use or idle, and the connection creation date.',
  },

  {
    id: 'orderNumber',
    label: 'Connection & Application Name',
    width: 280,
    whiteSpace: 'nowrap',
    tooltip: 'Name of the connection and the application which are connected.',
  },

  {
    id: 'connectionstatus',
    label: 'No. of Workflows',
    width: 'flex',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Number of workflows using the connection.',
  },
  // {
  //   id: 'name',
  //   label: 'Connection Status',
  //   width: 180,
  //   tooltip: 'Status of the connection whether it is in use or idle.',
  // },

  { id: '', width: 10 },
];

export default function WebhookTable({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const [tableData, setTableData] = useState(_connections);
  const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...CONNECTIONS_STATUS_OPTIONS];

  const filters = useSetState({
    name: '',
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

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({});

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
      handleCloseConfirmDialog();
    },
    [dataInPage.length, table, tableData]
  );

  const handleOpenConfirmDialog = (action) => {
    setConfirmDialogProps(action);
    setConfirmDelete(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDelete(false);
    setConfirmDialogProps({});
  };



  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
    toast.error('Connection Deleted Successfully!', {
      duration: Infinity,
      description: 'Note that some connections might not be deleted if they are being used in any workflow.',
    })
  };

  // Modify these conditions at the top of your component
  const nowebhookAdded = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results
  const noFilterResults = dataFiltered.length === 0 && !filters.state.name; // When filters result in no data

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
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
                  title="View and manage all apps connected to your account."
                  arrow
                  placement="top"
                >
                  Connection Details
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

        <Tabs
          value={filters.state.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme1) =>
              `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => {
            const getTooltipContent = (value) => {
              switch (value.toLowerCase()) {
                case 'all':
                  return 'Shows the total number of connections.';
                case 'revocable':
                  return 'Shows the number of active connections currently in use.';
                case 'non-revocable':
                  return 'Shows the number of idle connections available.';
                default:
                  return `View ${tab.label} connections`;
              }
            };

            return (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={
                  <Tooltip
                    disableInteractive
                    placement="top"
                    arrow
                    title={getTooltipContent(tab.value)}
                  >
                    <span>{tab.label}</span>
                  </Tooltip>
                }
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value.toLowerCase() === 'revocable' && 'success') ||
                      (tab.value.toLowerCase() === 'non-revocable' && 'error') ||
                      'default'
                    }
                  >
                    {['revocable', 'non-revocable'].includes(tab.value.toLowerCase())
                      ? tableData.filter((connection) => connection.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            );
          })}
        </Tabs>

        <OrderTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
          numSelected={table.selected.length}
          nowebhookAdded={nowebhookAdded}
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
              <Tooltip title="Delete the selected webhook." placement="bottom" arrow>
                <IconButton
                  color="primary"
                  onClick={() =>
                    handleOpenConfirmDialog({
                      onConfirm: () => handleDeleteRow(),
                    })
                  }
                >
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar sx={{ minHeight: 300 }}>
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
              {nowebhookAdded ? (
                <TableNoData
                  title="No connections are available!"
                  subTitle="There may be no connections for your applied filter conditions or you may not have created any connections yet."
                  learnMoreText="Learn more"
                  learnMoreLink="https://www.pabbly.com/privacy-policy/#data-policy"
                  // tooltipTitle="Buy agency tasks plan to assign agency tasks to other Pabbly Connect accounts."
                  notFound
                />
              ) : noSearchResults ? (
                  <TableNoData
                    title="Search Not Found!"
                    subTitle={
                      <span>
                        No results found for &#34;<strong>{filters.state.name}</strong>&#34;
                      </span>
                    }
                    notFound
                  />
              ) : noFilterResults ? (
                    <TableNoData
                      title="No Results Found!"
                      subTitle="No tasks match your current filter criteria."
                      tooltipTitle="Adjust your filters to view agency tasks."
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
                        onDeleteRow={() =>
                          handleOpenConfirmDialog({
                            onConfirm: () => handleDeleteRow(row.id),
                          })
                        }
                        serialNumber={table.page * table.rowsPerPage + index + 1}
                      />
                    ))}

                        <TableEmptyRows
                          height={table.dense ? 56 : 56 + 20}
                          emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                        />

                  <TableNoData />
                </TableBody>
              )}
            </Table>
          </Scrollbar>
        </Box>

        <TablePaginationCustom
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
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you really want to delete the selected Connections?"
        content="You won't be able to revert this action!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // Add your revoke tasks logic here
              handleCloseConfirmDelete(); // Close the dialog after revoking tasks
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((connections) =>
      connections.connectionName.toLowerCase().includes(name.toLowerCase()) ||
      connections.appName.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((connections) => connections.status === status);
  }

  if (!dateError && startDate && endDate) {
    inputData = inputData.filter((connections) => fIsBetween(connections.createdAt, startDate, endDate));
  }

  return inputData;
}
