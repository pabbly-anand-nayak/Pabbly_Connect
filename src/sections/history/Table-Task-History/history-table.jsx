// import 'react-modal-video/css/modal-video.min.css';

// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import { useTheme } from '@mui/material/styles';
// import {
//   Tab,
//   Tabs,
//   Table,
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

// import { CONFIG } from 'src/config-global';
// import { varAlpha } from 'src/theme/styles';
// // import { _orders, ORDER_STATUS_OPTIONS } from 'src/_mock';

// import { Label } from 'src/components/label';
// import { toast } from 'src/components/snackbar';
// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';
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

// import { OrderTableRow } from './history-table-row';
// import { OrderTableToolbar } from './history-table-toolbar';
// import { OrderTableFiltersResult } from './history-table-filters-result';
// import { _taskhistory, TASKHISTORY_STATUS_OPTIONS } from './_taskhistory';

// // ----------------------------------------------------------------------

// const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };
// const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...TASKHISTORY_STATUS_OPTIONS];

// const TABLE_HEAD = [
//   {
//     id: 'orderNumber',
//     label: 'Date/Time',
//     width: 'flex',
//     whiteSpace: 'nowrap',
//     tooltip: 'View task execution date & time.',
//   },
//   {
//     id: 'name',
//     label: 'Application',
//     width: 130,
//     tooltip: 'Apps which are integrated in the workflow.',
//   },
//   {
//     id: 'createdAt',
//     label: 'Workflow Name',
//     width: 300,
//     tooltip: 'Name of workflow and folder where it is located.',
//   },
//   {
//     id: 'status',
//     label: 'Task Consumption',
//     width: 'flex',
//     whiteSpace: 'nowrap',
//     tooltip: 'View how many task a workflow execution consumed.',
//   },
//   {
//     id: 'status',
//     label: 'Task History ID',
//     width: 200,
//     tooltip: 'View task history ID for every workflow execution.',
//   },
//   {
//     id: 'status',
//     label: 'Task Status',
//     width: 80,
//     tooltip: 'View whether task execution gets succeeded or failed.',
//   },

//   // { id: '', width: 88 },
// ];

// export default function TaskHistoryTableNew({
//   sx,
//   icon,
//   title,
//   total,
//   color = 'warning',
//   ...other
// }) {
//   const theme = useTheme();

//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const table = useTable({ defaultOrderBy: 'orderNumber' });

//   const router = useRouter();

//   const confirm = useBoolean();

//   const [tableData, setTableData] = useState(_taskhistory);

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

//       toast.success('Contact Removed Successfully!');

//       setTableData(deleteRow);

//       table.onUpdatePageDeleteRow(dataInPage.length);
//     },
//     [dataInPage.length, table, tableData]
//   );

//   const handleDeleteRows = useCallback(() => {
//     const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

//     toast.success('Delete success!');

//     setTableData(deleteRows);

//     table.onUpdatePageDeleteRows({
//       totalRowsInPage: dataInPage.length,
//       totalRowsFiltered: dataFiltered.length,
//     });
//   }, [dataFiltered.length, dataInPage.length, table, tableData]);

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

//   return (
//     <>
//       {/* Table */}
//       <Card
//         sx={{
//           boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',

//           mt: '32px',
//         }}
//       >
//         <CardHeader
//           title={
//             <Box>
//               <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
//                 Task History
//               </Box>

//               <Box sx={{ typography: 'body2', fontSize: '14px', color: 'text.secondary' }}>
//                 <Tooltip
//                   title="You can view task executions for all workflows."
//                   arrow
//                   placement="bottom"
//                 >
//                   (Sep 20, 2024 - Oct 05, 2024){' '}
//                 </Tooltip>
//               </Box>
//             </Box>
//           }
//           action={total && <Label color={color}>{total}</Label>}
//           sx={{
//             p: 3,
//           }}
//         />

//         <Divider />
//         {/* <Tabs
//           value={filters.state.status}
//           onChange={handleFilterStatus}
//           sx={{
//             px: 2.5,
//             boxShadow: (theme1) =>
//               `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
//           }}
//         >
//           {STATUS_OPTIONS.map((tab) => (
//             <Tab
//               key={tab.value}
//               iconPosition="end"
//               value={tab.value}
//               label={tab.label}
//               icon={
//                 <Label
//                   variant={
//                     ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
//                     'soft'
//                   }
//                   color={
//                     (tab.value === 'live' && 'success') ||
//                     (tab.value === 'sent' && 'warning') ||
//                     (tab.value === 'scheduled' && 'info') ||
//                     'default'
//                   }
//                 >
//                   {['live', 'sent', 'scheduled'].includes(tab.value)
//                     ? tableData.filter((user) => user.status === tab.value).length
//                     : tableData.length}
//                 </Label>
//               }
//             />
//           ))}
//         </Tabs> */}

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
//             // Custom tooltip content for each tab
//             const getTooltipContent = (value) => {
//               switch (value.toLowerCase()) {
//                 case 'all':
//                   return 'Show all task execution results.';
//                 case 'live':
//                   return 'Show task executions completed successfully.';
//                 case 'sent':
//                   return 'Show task executions with partial errors.';
//                 case 'scheduled':
//                   return 'Show task executions that failed due to errors.';
//                 default:
//                   return `View ${tab.label} workflows`;
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
//                       (tab.value === 'live' && 'success') ||
//                       (tab.value === 'sent' && 'warning') ||
//                       (tab.value === 'scheduled' && 'info') ||
//                       'default'
//                     }
//                   >
//                     {['live', 'sent', 'scheduled'].includes(tab.value)
//                       ? tableData.filter((user) => user.status === tab.value).length
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
//                 <IconButton color="primary" onClick={confirm.onTrue}>
//                   <Iconify icon="solar:trash-bin-trash-bold" />
//                 </IconButton>
//               </Tooltip>
//             }
//           />

//           <Scrollbar sx={{ minHeight: 300 }}>
//             {notFound ? (
//               <Box>
//                 <Divider />

//                 <Box sx={{ textAlign: 'center', borderRadius: 1.5, p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 1 }}>
//                     Not found
//                   </Typography>
//                   <Typography variant="body2">
//                     No results found for <strong>{`"${filters.state.name}"`}</strong>.
//                     <br />
//                     Try checking for typos or using complete words.
//                   </Typography>
//                 </Box>
//               </Box>
//             ) : (
//               <Table size={table.dense ? 'small' : 'medium'}>
//                 <TableHeadCustom
//                   showCheckbox
//                   order={table.order}
//                   orderBy={table.orderBy}
//                   headLabel={TABLE_HEAD}
//                   rowCount={dataFiltered.length}
//                   numSelected={table.selected.length}
//                   onSort={table.onSort}
//                   onSelectAllRows={(checked) =>
//                     table.onSelectAllRows(
//                       checked,
//                       dataFiltered.map((row) => row.id)
//                     )
//                   }
//                 />

//                 <TableBody>
//                   {dataFiltered
//                     .slice(
//                       table.page * table.rowsPerPage,
//                       table.page * table.rowsPerPage + table.rowsPerPage
//                     )
//                     .map((row) => (
//                       <OrderTableRow
//                         key={row.id}
//                         row={row}
//                         selected={table.selected.includes(row.id)}
//                         onSelectRow={() => table.onSelectRow(row.id)}
//                         onDeleteRow={() => handleDeleteRow(row.id)}
//                         onViewRow={() => handleViewRow(row.id)}
//                       />
//                     ))}

//                   <TableEmptyRows
//                     height={table.dense ? 56 : 56 + 20}
//                     emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
//                   />

//                   <TableNoData />
//                 </TableBody>
//               </Table>
//             )}
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

//   if (name) {
//     inputData = inputData.filter(
//       (order) =>
//         order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
//         order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
//         order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
//     );
//   }

//   if (status !== 'all') {
//     inputData = inputData.filter((order) => order.status === status);
//   }

//   if (!dateError) {
//     if (startDate && endDate) {
//       inputData = inputData.filter((order) => fIsBetween(order.createdAt, startDate, endDate));
//     }
//   }

//   return inputData;
// }

import 'react-modal-video/css/modal-video.min.css';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Table,
  Divider,
  Tooltip,
  TableBody,
  CardHeader,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Scrollbar } from 'src/components/scrollbar';
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

import { OrderTableRow } from './history-table-row';
import { OrderTableToolbar } from './history-table-toolbar';
import { OrderTableFiltersResult } from './history-table-filters-result';
import { _taskhistory, TASKHISTORY_STATUS_OPTIONS } from './_taskhistory';

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...TASKHISTORY_STATUS_OPTIONS];
const TABLE_HEAD = [
  {
    id: 'orderNumber',
    label: 'Date/Time',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'View task execution date & time.',
  },
  {
    id: 'name',
    label: 'Application',
    width: 130,
    tooltip: 'Apps which are integrated in the workflow.',
  },
  {
    id: 'createdAt',
    label: 'Workflow Name',
    width: 300,
    tooltip: 'Name of workflow and folder where it is located.',
  },
  {
    id: 'status',
    label: 'Task Consumption',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'View how many task a workflow execution consumed.',
  },
  {
    id: 'status',
    label: 'Task History ID',
    width: 200,
    tooltip: 'View task history ID for every workflow execution.',
  },
  {
    id: 'status',
    label: 'Task Status',
    width: 80,
    tooltip: 'View whether task execution gets succeeded or failed.',
  },
];

export default function TaskHistoryTableNew({
  sx,
  icon,
  title,
  total,
  color = 'warning',
  ...other
}) {
  const theme = useTheme();
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(_taskhistory);

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

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      toast.success('Contact Removed Successfully!');
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    toast.success('Delete success!');
    setTableData(deleteRows);
    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  // Number of selected rows
  const numSelected = table.selected.length;

  return (
    <>
      {/* Table */}
      <Card sx={{ boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)', mt: '32px' }}>
        <CardHeader
          title={
            <Box>
              <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
                <Tooltip
                  title="You can view task executions for all workflows."
                  arrow
                  placement="top"
                >
                  Task History
                </Tooltip>
              </Box>
              <Box sx={{ typography: 'body2', fontSize: '14px', color: 'text.secondary' }}>
                <Tooltip
                  title="You can view task executions for all workflows."
                  arrow
                  placement="bottom"
                >
                  (Sep 20, 2024 - Oct 05, 2024)
                </Tooltip>
              </Box>
            </Box>
          }
          action={total && <Label color={color}>{total}</Label>}
          sx={{ p: 3 }}
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
            // Custom tooltip content for each tab
            const getTooltipContent = (value) => {
              switch (value.toLowerCase()) {
                case 'all':
                  return 'Show all task execution results.';
                case 'live':
                  return 'Show task executions completed successfully.';
                case 'sent':
                  return 'Show task executions with partial errors.';
                case 'scheduled':
                  return 'Show task executions that failed due to errors.';
                default:
                  return `View ${tab.label} workflows`;
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
                      (tab.value === 'live' && 'success') ||
                      (tab.value === 'sent' && 'warning') ||
                      (tab.value === 'scheduled' && 'info') ||
                      'default'
                    }
                  >
                    {['live', 'sent', 'scheduled'].includes(tab.value)
                      ? tableData.filter((user) => user.status === tab.value).length
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
          numSelected={numSelected}
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
            numSelected={numSelected}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
          />

          <Scrollbar sx={{ minHeight: 300 }}>
            {notFound ? (
              <Box>
                <Divider />
                <Box sx={{ textAlign: 'center', borderRadius: 1.5, p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Not found
                  </Typography>
                  <Typography variant="body2">
                    No results found for <strong>{`"${filters.state.name}"`}</strong>.
                    <br />
                    Try checking for typos or using complete words.
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Table size={table.dense ? 'small' : 'medium'}>
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

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData />
                </TableBody>
              </Table>
            )}
          </Scrollbar>
        </Box>

        <TablePaginationCustom
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
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
    inputData = inputData.filter(
      (order) =>
        order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.createdAt, startDate, endDate));
    }
  }

  return inputData;
}
