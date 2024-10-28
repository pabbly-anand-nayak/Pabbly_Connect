import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
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

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
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

import { OrderTableRow } from './dashbaord-table-row';
import { OrderTableToolbar } from './dashbaord-table-toolbar';
import { _dashboard, DASHBOARD_STATUS_OPTIONS } from './_dashbaord';
import { OrderTableFiltersResult } from './dashbaord-table-filters-result';

const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };
const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...DASHBOARD_STATUS_OPTIONS];

const TABLE_HEAD = [
  {
    id: 'orderNumber',
    label: 'Status/Date',
    width: '220',
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
    width: 500,
    tooltip: 'Name of workflow and folder where it is located.',
  },
  {
    id: 'totalAmount',
    label: 'Task Consumption',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Task consumed by workflow in the last 30 days.',
  },
  { id: '', width: 88 },
];

export default function DashboardTable2({
  selectedFolder,
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
  const confirmDelete = useBoolean();
  const [tableData, setTableData] = useState(_dashboard);

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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Card
          sx={{
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
            width: '1086px',
          }}
        >
          <CardHeader
            title={
              <Box>
                <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
                  <Tooltip title={`Folder Name: ${selectedFolder}`} arrow placement="bottom">
                    {selectedFolder}
                  </Tooltip>
                </Box>
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
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => {
              // Custom tooltip content for each tab
              const getTooltipContent = (value) => {
                switch (value.toLowerCase()) {
                  case 'all':
                    return 'Show all workflows including active and inactive.';
                  case 'active':
                    return 'Show only active workflows.';
                  case 'inactive':
                    return 'Show only inactive workflows.';
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
                      {['active', 'inactive', 'pending', 'rejected'].includes(
                        tab.value.toLowerCase()
                      )
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
              // action={
              //   <Tooltip title="This will delete the selected workflow." arrow placement="bottom">
              //     <IconButton color="primary" onClick={confirmDelete.onTrue}>
              //       <Iconify icon="solar:trash-bin-trash-bold" />
              //     </IconButton>
              //   </Tooltip>
              // }
            />

            <Scrollbar sx={{ minHeight: 444 }}>
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

                    <TableNoData notFound={notFound} />
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
      </Box>

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Do you really want to delete the selected workflows?"
        content="Workflow once deleted will be moved to trash folder."
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRows}>
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
