import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Table, Divider, TableBody, CardHeader, Typography } from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

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

import { OrderTableRow } from './system-variables-table-row';
import { OrderTableToolbar } from './system-variables-table-toolbar';
import { _systemvariables, SYSTEMVARIABLES_STATUS_OPTIONS } from './_variables';
import { OrderTableFiltersResult } from './system-variables-table-filters-result';

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...SYSTEMVARIABLES_STATUS_OPTIONS];
const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', tooltip: 'Serial Number' },
  {
    id: 'variableName',
    label: 'Variable Name',
    width: '200',
    tooltip: 'Name of the system variable.',
  },
  {
    id: 'description',
    label: 'Description',
    width: 'flex',
    tooltip: 'Description of the system variable.',
  },
  {
    id: 'variableData',
    label: 'Variable Data',
    width: '200',
    align: 'right',
    tooltip: 'Actual value of the system variable.',
  },
];

export default function SystemVariablesTable({ sx, title, total, color = 'warning', ...other }) {
  const table = useTable({ defaultOrderBy: 'orderNumber', defaultRowsPerPage: 5 }); // Show 5 rows per page
  const [tableData, setTableData] = useState(_systemvariables);

  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!filters.state.name || filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  return (
    <Card sx={{ boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)', mt: 4 }}>
      <CardHeader
        title={
          <Box>
            <Typography variant="subtitle2" sx={{ fontSize: '18px', fontWeight: 600 }}>
              System Variables
            </Typography>
          </Box>
        }
        action={total && <Label color={color}>{total}</Label>}
        sx={{ p: 3 }}
      />
      <Divider />

      <OrderTableToolbar filters={filters} onResetPage={table.onResetPage} />

      {canReset && (
        <OrderTableFiltersResult
          filters={filters}
          totalResults={dataFiltered.length}
          onResetPage={table.onResetPage}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <Box sx={{ position: 'relative' }}>
        <Scrollbar sx={{ minHeight: 300 }}>
          {notFound ? (
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
          ) : (
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                onSort={table.onSort}
              />

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
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { status, name } = filters;

  const stabilizedData = inputData.map((el, index) => [el, index]);
  stabilizedData.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedData.map((el) => el[0]);

  // Filter by variable name
  if (name) {
    inputData = inputData.filter((variable) =>
      variable.variableName.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by status
  if (status !== 'all') {
    inputData = inputData.filter((variable) => variable.status === status);
  }

  return inputData;
}
