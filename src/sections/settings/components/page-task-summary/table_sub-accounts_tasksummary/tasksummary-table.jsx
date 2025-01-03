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
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
import {
  useTable,
  rowInPage,
  TableNoData,
  getComparator,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { ConfirmDialog } from '../custom-dialog';
import { OrderTableRow } from './tasksummary-table-row';
import { OrderTableToolbar } from './tasksummary-table-toolbar';
import { _tasksummary, TASKSUMMARY_STATUS_OPTIONS } from './_tasksummary';
import { OrderTableFiltersResult } from './tasksummary-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...TASKSUMMARY_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
  { id: 'orderNumber', label: 'Assigned On', width: '220', tooltip: 'This is tooltip.' },
  { id: 'email', label: 'Email', width: 'flex', whiteSpace: 'nowrap', tooltip: 'This is tooltip.' },
  { id: 'status', label: 'Task Type', width: '220', tooltip: 'This is tooltip.' },

  {
    id: 'totalAmount',
    label: 'Tasks Assigned',
    width: '200',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'This is tooltip.',
  },
  { id: '', width: 4 },
];

export default function TaskSummaryTable({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({});
  const [tableData, setTableData] = useState(_tasksummary);

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

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessSnackbarOpen(false);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDelete(false);
    setConfirmDialogProps({});
  };

  const handleOpenConfirmDialog = (action) => {
    setConfirmDialogProps(action);
    setConfirmDelete(true);
  };

  // Modify these conditions at the top of your component
  const noTasksEver = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Card
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        }}
      >
        <CardHeader
          title={
            <Box>
              <Box>
                <Tooltip title="This is tooltip." arrow placement="top">
                  <Typography
                    component="span"
                    sx={{
                      typography: 'subtitle2',
                      fontSize: '18px',
                      fontWeight: 600,
                    }}
                  >
                    Tasks Assigned to Sub-accounts
                  </Typography>
                </Tooltip>{' '}
              </Box>
              <Tooltip title="This is tooltip." arrow placement="bottom">
                <Typography
                  component="span"
                  sx={{
                    typography: 'body2',
                    fontSize: '14px',
                    color: 'text.secondary',
                  }}
                >
                  (Tasks Assigned-6117)
                </Typography>
              </Tooltip>
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
                  return 'Shows all tasks assigned to sub-accounts.';
                case 'revocable':
                  return 'Shows revocable tasks assigned to sub-accounts.';
                case 'non-revocable':
                  return 'Shows non-revocable tasks assigned to sub-accounts.';
                default:
                  return `View ${tab.label} tasks`;
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
              <Tooltip title="Remove the allotted tasks from an account.">
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

              {noTasksEver ? (
                <TableNoData
                  title="No Tasks Assigned!"
                  subTitle="You don't have any agency tasks to assign to other accounts. You can purchase the agency tasks to assign tasks to others."
                  learnMoreText="Buy Now"
                  learnMoreLink="https://www.pabbly.com/connect/agency/"
                  tooltipTitle="Buy agency tasks plan to assign agency tasks to other Pabbly Connect accounts."
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
                  additionalSubTitle="You have not assigned tasks to any Pabbly Connect account."
                  tooltipTitle="Search for a specific email to filter agency tasks."
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
                  {/* 
                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  /> */}

                  <TableNoData />
                </TableBody>
              )}
            </Table>
          </Scrollbar>
        </Box>

        <TablePaginationCustom
          disabled={noTasksEver} // Disabled When No Tasks Added!
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
        title="Do you really want to delete selected assigned tasks?"
        content="You won't be able to revert this action!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // Add your revoke tasks logic here
              handleCloseConfirmDelete(); // Close the dialog after revoking tasks
              setSuccessSnackbarOpen(true); // Show success snackbar
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        }
      />

      {/* Success Snackbar */}
      <CustomSnackbar
        open={successSnackbarOpen}
        onClose={handleSuccessSnackbarClose}
        message="Successfully deleted the selected assigned tasks."
        severity="success"
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

  // Filter by assignedOn name (email filter)
  if (name) {
    inputData = inputData.filter((assignedOn) =>
      assignedOn.assignedEmail.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by status
  if (status !== 'all') {
    inputData = inputData.filter((assignedOn) => assignedOn.status === status);
  }
  if (!dateError && startDate && endDate) {
    inputData = inputData.filter((workflow) => fIsBetween(workflow.createdAt, startDate, endDate));
  }
  return inputData;
}
