import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { Table, Divider, Tooltip, TableBody, CardHeader, useMediaQuery } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

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

import { OrderTableRow } from './agency-account-table-row';
import { OrderTableToolbar } from './agency-account-table-toolbar';
import { _agency2, AGENCY_STATUS_OPTIONS } from './_agency-account';
import { OrderTableFiltersResult } from './agency-account-table-filters-result';

const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };
const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...AGENCY_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
  {
    id: 'orderNumber',
    label: 'Assigned On',
    width: '220',
    tooltip: 'Date when tasks were assigned to your Pabbly Connect account.',
  },
  {
    id: 'name',
    label: 'Email',
    width: 500,
    tooltip: 'Email of the Pabbly Connect account that assigned tasks to you.',
  },
  {
    id: 'totalAmount',
    label: 'Tasks Assigned',
    width: 'flex',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Number of agency tasks allotted to your Pabbly Connect account.',
  },
  // { id: '', width: 2 },
];

export default function AgencyAccountTable({
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
  const [tableData, setTableData] = useState(_agency2);
  const [totalTasksAssigned, setTotalTasksAssigned] = useState(0);

  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  useEffect(() => {
    const calculateTotalTasksAssigned = () => {
      const totalTasks = tableData.reduce((acc, row) => {
        const taskCount = Number(row.totalAmount) || 10000;
        return acc + taskCount;
      }, 0);
      setTotalTasksAssigned(totalTasks);
    };

    calculateTotalTasksAssigned();
  }, [tableData]);

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
  const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results
  const noFilterResults = dataFiltered.length === 0 && !filters.state.name; // When filters result in no data

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
            <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
              <Tooltip
                title="View details of Pabbly Connect accounts that assigned tasks to you."
                arrow
                placement="bottom"
              >
                Agency Task Details
              </Tooltip>
            </Box>
            <Box sx={{ typography: 'body2', fontSize: '14px', color: 'text.secondary' }}>
              {/* <Tooltip
                title="Total tasks assigned to you by other Pabbly Connect accounts."
                arrow
                placement="bottom"
              > */}
              View details of Pabbly Connect accounts that assigned tasks to you.
              {/* (Tasks Assigned -{' '} {totalTasksAssigned}) */}
              {/* </Tooltip> */}
            </Box>
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
        noTasksEver={noTasksEver} // Add this line
      />

      {canReset && (
        <OrderTableFiltersResult
          filters={filters}
          totalResults={dataFiltered.length}
          onResetPage={table.onResetPage}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <Scrollbar sx={{ minHeight: 300 }}>
        <Table size={table.dense ? 'small' : 'medium'}>
          <TableHeadCustom
            order={table.order}
            orderBy={table.orderBy}
            headLabel={TABLE_HEAD}
            rowCount={dataFiltered.length}
            onSort={table.onSort}
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
              subTitle={`No results found for "${filters.state.name}"`}
              additionalSubTitle="You have not assigned tasks to any Pabbly Connect account."
              tooltipTitle="Search for a specific email to filter agency tasks."
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
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
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
    inputData = inputData.filter((workflow) =>
      workflow.workflowName.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((workflow) => workflow.status === status);
  }

  if (!dateError && startDate && endDate) {
    inputData = inputData.filter((workflow) => fIsBetween(workflow.createdAt, startDate, endDate));
  }

  return inputData;
}
