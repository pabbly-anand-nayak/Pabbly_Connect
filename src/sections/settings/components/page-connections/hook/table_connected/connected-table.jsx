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

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { OrderTableRow } from './connected-table-row';
import { OrderTableToolbar } from './connected-table-toolbar';
import { _connected, CONNECTED_STATUS_OPTIONS } from './_connected';
import { OrderTableFiltersResult } from './connected-table-filters-result';

// ----------------------------------------------------------------------

const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };
const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...CONNECTED_STATUS_OPTIONS];

const TABLE_HEAD = [
  {
    id: 'orderNumber',
    label: 'Status/Date',
    width: '160',
    tooltip: 'View workflows status and date of creation.',
  },
  {
    id: 'createdAt',
    label: 'Application',
    width: 137,
    tooltip: 'Apps which are integrated in the workflow.',
  },
  {
    id: 'name',
    label: 'Workflow Name',
    width: 280,
    tooltip: 'Name of workflow and folder where it is located.',
  },
  {
    id: 'totalAmount',
    label: 'Task Consumption',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Task consumed by workflow in the last 30 days.',
  },
  // { id: '', width: 88 },
];

export default function WorkflowsConnectedTable({
  sx,
  icon,
  title,
  total,
  color = 'warning',
  ...other
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(_connected);

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

  // Modify these conditions at the top of your component
  const novariablesAdded = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end', // Aligns the card to the right
        // mt: 2,
      }}
    >
      {/* Table */}
      <Card
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
          width: '918px',
          // mt: '24px',
        }}
      >
        <CardHeader
          title={
            <Box>
              <Typography variant="subtitle2" sx={{ fontSize: '18px', fontWeight: 600 }}>
                <Tooltip
                  title="Shows all workflows linked to the connection both active and inactive."
                  arrow
                  placement="top"
                >
                  Workflows Connected
                </Tooltip>
              </Typography>
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
            const getTooltipContent = (value) => {
              switch (value.toLowerCase()) {
                case 'all':
                  return 'Shows all connected workflows both active and inactive.';
                case 'active':
                  return ' Shows connected workflows that are active.';
                case 'inactive':
                  return 'Shows connected workflows that are inactive.';
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
                    {['active', 'inactive', 'pending', 'rejected'].includes(tab.value.toLowerCase())
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

        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              // showCheckbox
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />
            {novariablesAdded ? (
              <TableNoData
                title="No system variables available!"
                subTitle="It seems there are no system variables available yet."
                learnMoreText="Learn more"
                learnMoreLink="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/"
                // tooltipTitle="Buy agency tasks plan to assign agency tasks to other Pabbly Connect accounts."
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
                {dataInPage.map((row, index) => (
                  <OrderTableRow
                    key={row.id}
                    row={row}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    serialNumber={table.page * table.rowsPerPage + index + 1}
                  />
                ))}

                <TableEmptyRows
                  height={56}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />
                <TableNoData />
              </TableBody>
            )}
          </Table>
        </Scrollbar>

        <TablePaginationCustom
          disabled={novariablesAdded} // Disabled When No system variables available!
          page={table.page}
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}

function applyFilter({ inputData, filters }) {
  const { status, name } = filters;

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

  return inputData;
}
