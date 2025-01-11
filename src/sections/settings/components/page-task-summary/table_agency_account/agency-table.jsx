import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Table,
  Tooltip,
  Divider,
  TableBody,
  CardHeader,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  rowInPage,
  TableNoData,
  getComparator,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { OrderTableRow } from './agency-table-row';
import { OrderTableToolbar } from './agency-table-toolbar';
import { _agency, AGENCY_STATUS_OPTIONS } from './_agency';
import { OrderTableFiltersResult } from './agency-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...AGENCY_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
  { id: 'assignedOn', label: 'Assigned On', width: '220', tooltip: 'Date on which tasks were assigned by the Pabbly Connect Agency account.' },
  { id: 'email', label: 'Email', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Pabbly Connect Agency account email address that has assigned you tasks.' },
  { id: 'status', label: 'Task Type', width: '220', tooltip: 'Revocable/Non-Revocable task' },

  {
    id: 'tasksAssigned',
    label: 'Tasks Assigned',
    width: '200',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Number of tasks assigned by the Pabbly Connect Agency account.',
  },
];

export default function AgencyAccountTable({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const [tableData, setTableData] = useState(_agency);

  const filters = useSetState({
    email: '',
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
    !!filters.state.email ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);

    },
    [dataInPage.length, table, tableData, ]
  );

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

  // Modify these conditions at the top of your component
  const noTasksEver = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.email; // When search returns no results

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  return (
      <Card
        sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        mt: 4,
        }}
      >
        <CardHeader
          title={
            <Box>
              <Box>
                <Tooltip title="Tasks assigned to you by a Pabbly Connect Agency account." arrow placement="top">
                  <Typography
                    component="span"
                    sx={{
                      typography: 'subtitle2',
                      fontSize: '18px',
                      fontWeight: 600,
                    }}
                >
                  Tasks Assigned by Agency Account

                  </Typography>
                </Tooltip>{' '}
              </Box>
                <Typography
                  component="span"
                  sx={{
                    typography: 'body2',
                    fontSize: '14px',
                    color: 'text.secondary',
                  }}
                >
                  (Tasks Assigned- 750)
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
                  return 'Shows all tasks assigned to your account.';
                case 'revocable':
                  return 'Shows revocable tasks assigned to your account.';
                case 'non-revocable':
                  return 'Shows non-revocable tasks assigned to your account.';
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
          noTasksEver={noTasksEver}

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
          />

          <Scrollbar >
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            {/* Table CircularProgress loading */}
              {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
                <CircularProgress />
              </Box> */}
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                
              />

              {noTasksEver ? (
                <TableNoData
                  title="No Tasks Assigned!"
                  subTitle="You have not assigned tasks to any Pabbly Connect account."
                  learnMoreText="Buy Now"
                  // learnMoreLink="https://www.pabbly.com/connect/agency/"
                  // tooltipTitle="Buy agency tasks plan to assign agency tasks to other Pabbly Connect accounts."
                  notFound
                />
              ) : noSearchResults ? (
                <TableNoData
                  title="Search Not Found!"
                  subTitle={
                    <span>
                      No results found for &#34;<strong>{filters.state.email}</strong>&#34;
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
                        row={{
                          ...row,
                        }}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        serialNumber={table.page * table.rowsPerPage + index + 1}
                      />
                    ))}
                  
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

 
     
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, email, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by agencyAccount email (email filter)
  if (email) {
    inputData = inputData.filter((agencyAccount) =>
      agencyAccount.assignedEmail.toLowerCase().includes(email.toLowerCase())
    );
  }

  // Filter by status
  if (status !== 'all') {
    inputData = inputData.filter((agencyAccount) => agencyAccount.status === status);
  }
  if (!dateError && startDate && endDate) {
    inputData = inputData.filter((AssigneOn) => fIsBetween(AssigneOn.createdAt, startDate, endDate));
  }
  return inputData;
}
