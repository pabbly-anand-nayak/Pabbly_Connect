import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  Tooltip,
  Divider,
  TableBody,
  CardHeader,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

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
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { _viewlog } from './_viewlog';
import { OrderTableRow } from './viewlog-table-row';
import { OrderTableToolbar } from './viewlog-table-toolbar';
import { OrderTableFiltersResult } from './viewlog-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'auto', tooltip: 'Serial Number' },
  { id: 'updatedOn', label: 'Updated On', width: '150', tooltip: 'Custom variable updated on.' },
  {
    id: 'changedBy',
    label: 'Changed By',
    width: '200',
    tooltip: 'Actual value changed by.',
  },
  {
    id: 'newData',
    label: 'New Data',
    width: '300',
    tooltip: 'New data for the custom variable.',
  },

];

export default function ViewLogTable({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(_viewlog);

  const filters = useSetState({
    name: '', // Initialize name filter state
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

  const canReset = !!filters.state.name || filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const novariablesAdded = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results

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
          // mt: 4,
          // width: '933px',
          width: '918px',

        }}
      >
        <CardHeader
          title={
            <Box>
              <Typography variant="subtitle2" sx={{ fontSize: '18px', fontWeight: 600 }}>
                <Tooltip
                  title="Custom variables are useful to store and manipulate data within your workflows."
                  arrow
                  placement="top"
                >
                  <span>Variable Change Log</span>
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
          dateError={dateError}
          numSelected={table.selected.length}
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

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 918 }}>
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
                  title="No Variable Change Log Found!"
                  subTitle="There are no changes in the variable data and thus the change log is not available."
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
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
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
        </Box>

        <TablePaginationCustom
          disabled={novariablesAdded}
          page={table.page}
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Box >
  );
}

function applyFilter({ inputData, filters }) {
  const { name } = filters;

  // Filter by variable name (name filter)
  if (name) {
    inputData = inputData.filter((Data) =>
      Data.newData.toLowerCase().includes(name.toLowerCase())
    );
  }

  return inputData;
}
