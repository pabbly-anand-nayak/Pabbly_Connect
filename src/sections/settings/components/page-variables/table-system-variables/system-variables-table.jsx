import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Table, Divider, Tooltip, TableBody, CardHeader, Typography } from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  rowInPage,
  TableNoData,
  getComparator,
  TableHeadCustom,
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

  // Modify these conditions at the top of your component
  const novariablesAdded = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results

  return (
    <Card sx={{ boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)', mt: 4 }}>
      <CardHeader
        title={
          <Box>
            <Typography variant="subtitle2" sx={{ fontSize: '18px', fontWeight: 600 }}>
              <Tooltip
                title="System Variables are pre-defined variables offered inside Pabbly Connect. It is useful to print the values for time etc. You can't modify the value of any system variable."
                arrow
                placement="bottom"
              >
                <span>System Variables</span>
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

      {/* <Scrollbar>
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
      </Scrollbar> */}

      <Scrollbar sx={{ maxHeight: 385, mb: 4 }}>
        <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
          <TableHeadCustom
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
              notFound
            />
          ) : noSearchResults ? (
            <TableNoData
              sx={{ py: 5, ...sx }}
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
              {dataFiltered.map((row, index) => (
                <OrderTableRow
                  key={row.id}
                  row={row}
                  onDeleteRow={() => handleDeleteRow(row.id)}
                  serialNumber={index + 1}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </Scrollbar>

      {/* <TablePaginationCustom
        disabled={novariablesAdded} // Disabled When No system variables available!
        page={table.page}
        dense={table.dense}
        count={dataFiltered.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      /> */}
    </Card>
  );
}

function applyFilter({ inputData, filters }) {
  const { name } = filters;

  // Filter by variable name
  if (name) {
    inputData = inputData.filter((variable) =>
      variable.variableName.toLowerCase().includes(name.toLowerCase())
    );
  }

  return inputData;
}
