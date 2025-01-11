import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { Table, Divider, Tooltip, TableBody, CardHeader, Typography, useMediaQuery } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

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

import { OrderTableRow } from './trash-table-row';
import { _trash, TRASH_STATUS_OPTIONS } from './_trash';
import { OrderTableToolbar } from './trash-table-toolbar';
import { OrderTableFiltersResult } from './trash-table-filters-result';

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...TRASH_STATUS_OPTIONS];

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

export default function TrashTableNew({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const [tableData, setTableData] = useState(_trash);

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

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

    // Modify these conditions at the top of your component
    const emptyTrash = tableData.length === 0; // When no tasks exist at all
    const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results
  
    // LoadingButton
    const [isLoading, setIsLoading] = useState(false);

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
            width: '1086px',
          }}
        >
          <CardHeader
            title={
              <Box>
              <Box>
                  <Tooltip title="Trash folder holds all workflows that have been deleted." arrow placement="top">
                  <Typography
                    component="span"
                    sx={{
                      typography: 'subtitle2',
                      fontSize: '18px',
                      fontWeight: 600,
                    }}
                  >
                    Trash
                  </Typography>
                </Tooltip>
              </Box>
              
                <Box sx={{ typography: 'body2', fontSize: '14px', color: 'text.secondary' }}>
                  Deleted workflows can be restored or permanently deleted from the trash folder.
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
            numSelected={table.selected.length}
            emptyTrash={emptyTrash}

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
            
                          {emptyTrash ? (
                          <TableNoData
                              title="Empty Trash!"
                              subTitle="No deleted workflows found in the trash. Deleted workflows will appear here if they are deleted."
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
                          ) : (
                            
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
                         
            
                                <TableNoData />
                              </TableBody>
                          )}
                          </Table>
                        </Scrollbar>
          </Box>

          <TablePaginationCustom
           disabled={emptyTrash} // Disabled When No Workflow Created!
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
