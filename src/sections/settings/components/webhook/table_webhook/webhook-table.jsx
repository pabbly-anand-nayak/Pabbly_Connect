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

// import { CONFIG } from 'src/config-global';
// import { varAlpha } from 'src/theme/styles';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';
// import { ConfirmDialog } from 'src/components/custom-dialog';
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

// import { OrderTableRow } from './webhook-table-row';
// import { OrderTableToolbar } from './webhook-table-toolbar';
// import { _webhook, WEBHOOK_STATUS_OPTIONS } from './_webhook';
// import { OrderTableFiltersResult } from './webhook-table-filters-result';

// // ----------------------------------------------------------------------

// const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };
// const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...WEBHOOK_STATUS_OPTIONS];

// const TABLE_HEAD = [
//   { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
//   {
//     id: 'webhook&event',
//     label: 'Webhook Name & Event',
//     width: '220',
//     tooltip: 'Webhook Name & Event',
//   },
//   {
//     id: 'name',
//     label: 'Webhook URL',
//     width: 'flex',
//     whiteSpace: 'nowrap',
//     tooltip: 'Webhook URL',
//   },

//   {
//     id: 'webhookurl',
//     label: '',
//     width: 'flex',
//     whiteSpace: 'nowrap',
//     align: 'right',
//     tooltip: 'This is tooltip.',
//   },
//   { id: '', width: 4 },
// ];

// export default function WebhookTable({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const table = useTable({ defaultOrderBy: 'orderNumber' });
//   const router = useRouter();
//   const confirmDelete = useBoolean();
//   const [tableData, setTableData] = useState(_webhook);

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

//   const handleDeleteRows = useCallback(() => {
//     const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
//     setTableData(deleteRows);
//     table.onUpdatePageDeleteRows({
//       totalRowsInPage: dataInPage.length,
//       totalRowsFiltered: dataFiltered.length,
//     });
//     confirmDelete.onFalse();
//   }, [dataFiltered.length, dataInPage.length, table, tableData, confirmDelete]);

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
//       <Card
//         sx={{
//           boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
//           mt: 4,
//         }}
//       >
//         <CardHeader
//           title={
//             <Box>
//               <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
//                 <Tooltip
//                   title="Add Webhook URLs to get real-time updates for workflow events."
//                   arrow
//                   placement="bottom"
//                 >
//                   Webhooks
//                 </Tooltip>
//               </Box>
//               {/* <Box sx={{ typography: 'body2', fontSize: '14px', color: 'text.secondary' }}>
//                   (Tasks Assigned-6117)
//               </Box> */}
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
//                     (tab.value === 'active' && 'success') ||
//                     (tab.value === 'inactive' && 'error') ||
//                     'default'
//                   }
//                 >
//                   {['active', 'inactive'].includes(tab.value)
//                     ? tableData.filter((user) => user.status === tab.value).length
//                     : tableData.length}
//                 </Label>
//               }
//             />
//           ))}
//         </Tabs>

//         <OrderTableToolbar
//           filters={filters}
//           onResetPage={table.onResetPage}
//           dateError={dateError}
//           numSelected={table.selected.length}
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
//                 <IconButton color="primary" onClick={confirmDelete.onTrue}>
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
//               <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
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

//                     .map((row, index) => (
//                       <OrderTableRow
//                         key={row.id}
//                         row={{
//                           ...row,
//                         }}
//                         selected={table.selected.includes(row.id)}
//                         onSelectRow={() => table.onSelectRow(row.id)}
//                         onDeleteRow={() => handleDeleteRow(row.id)}
//                         onViewRow={() => handleViewRow(row.id)}
//                         serialNumber={table.page * table.rowsPerPage + index + 1}
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

//       <ConfirmDialog
//         open={confirmDelete.value}
//         onClose={confirmDelete.onFalse}
//         title="Do you really want to delete selected assigned tasks?"
//         content="You won't be able to revert this action!"
//         action={
//           <Button variant="contained" color="error" onClick={handleDeleteRows}>
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
//     inputData = inputData.filter((workflow) => fIsBetween(workflow.createdAt, startDate, endDate));
//   }

//   return inputData;
// }

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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
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

import { OrderTableRow } from './webhook-table-row';
import { OrderTableToolbar } from './webhook-table-toolbar';
import { _webhook, WEBHOOK_STATUS_OPTIONS } from './_webhook';
import { OrderTableFiltersResult } from './webhook-table-filters-result';

// ----------------------------------------------------------------------

const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };
const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...WEBHOOK_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
  {
    id: 'webhook&event',
    label: 'Webhook Name & Event',
    width: '220',
    tooltip: 'Webhook Name & Event',
  },
  {
    id: 'name',
    label: 'Webhook URL',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Webhook URL',
  },

  {
    id: 'webhookurl',
    label: '',
    width: 'flex',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'This is tooltip.',
  },
  { id: '', width: 4 },
];

export default function WebhookTable({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const confirmDelete = useBoolean();
  const [tableData, setTableData] = useState(_webhook);

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
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);
    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
    confirmDelete.onFalse();
  }, [dataFiltered.length, dataInPage.length, table, tableData, confirmDelete]);

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
              <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
                <Tooltip
                  title="Add Webhook URLs to get real-time updates for workflow events."
                  arrow
                  placement="bottom"
                >
                  Webhooks
                </Tooltip>
              </Box>
              {/* <Box sx={{ typography: 'body2', fontSize: '14px', color: 'text.secondary' }}>
                  (Tasks Assigned-6117)
              </Box> */}
            </Box>
          }
          action={total && <Label color={color}>{total}</Label>}
          sx={{
            p: 3,
          }}
        />
        <Divider />

        {/* <Tabs
          value={filters.state.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme1) =>
              `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                    'soft'
                  }
                  color={
                    (tab.value === 'active' && 'success') ||
                    (tab.value === 'inactive' && 'error') ||
                    'default'
                  }
                >
                  {['active', 'inactive'].includes(tab.value)
                    ? tableData.filter((user) => user.status === tab.value).length
                    : tableData.length}
                </Label>
              }
            />
          ))}
        </Tabs> */}

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
            // Function to provide tooltip content for each tab
            const getTooltipContent = (value) => {
              switch (value.toLowerCase()) {
                case 'all':
                  return 'Shows all webhooks both active and inactive.';
                case 'active':
                  return 'Shows webhooks that are currently active.';
                case 'inactive':
                  return 'Shows webhooks that are currently inactive.';
                case 'pending':
                  return 'View workflows waiting for approval';
                case 'rejected':
                  return 'View workflows that have been rejected';
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
                      (tab.value.toLowerCase() === 'active' && 'success') ||
                      (tab.value.toLowerCase() === 'inactive' && 'error') ||
                      'default'
                    }
                  >
                    {['active', 'inactive'].includes(tab.value)
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
          numSelected={table.selected.length}
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
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirmDelete.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
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

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )

                    .map((row, index) => (
                      <OrderTableRow
                        key={row.id}
                        row={{
                          ...row,
                        }}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        serialNumber={table.page * table.rowsPerPage + index + 1}
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
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Do you really want to delete the selected webhook?"
        content="You won't be able to revert this action!"
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRows}>
            Remove
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

  // Filter by workflow name (name filter)
  if (name) {
    inputData = inputData.filter((workflow) =>
      workflow.workflowName.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by status
  if (status !== 'all') {
    inputData = inputData.filter((workflow) => workflow.status === status);
  }

  // Filter by date range if no error in date range
  if (!dateError && startDate && endDate) {
    inputData = inputData.filter((workflow) => fIsBetween(workflow.createdAt, startDate, endDate));
  }

  return inputData;
}
