import { toast } from 'sonner';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  Tooltip,
  Divider,
  TableBody,
  IconButton,
  CardHeader,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

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

import { _tasksummary } from './_variables';
import { OrderTableRow } from './variables-table-row';
import { OrderTableToolbar } from './variables-table-toolbar';
import { OrderTableFiltersResult } from './variables-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
  { id: 'createdOn', label: 'Created On', width: '200', tooltip: 'Custom variable created on.' },
  {
    id: 'variableName',
    label: 'Variable Name',
    width: '300',
    tooltip: 'Name of the custom variable.',
  },
  {
    id: 'variableData',
    label: 'Variable Data',
    width: '200',
    tooltip: 'Actual value of the custom variable.',
  },
  {
    id: 'lastUpdatedOn',
    label: 'Last Updated On',
    width: '200',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Custom variable last updated on.',
  },
  { id: '', width: 50 },
];

export default function VariablesTableNew({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(_tasksummary);

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

  const handleDeleteRow = useCallback(
    (id) => {
      setIsLoading(true); // Set loading state to true
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);

      // Show success snackbar
      toast.success('Variable deleted successfully!');

      // setTimeout(() => {
      confirm.onFalse(); // Close ConfirmDialog after the action
      setIsLoading(false); // Reset loading state
      // }, 500); // Add a small delay to simulate action completion
    },
    [dataInPage.length, table, tableData, confirm]
  );

  const novariablesAdded = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {/* Table */}
      <Card
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
          mt: 4,
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
                  <span>Custom Variables with New View Log Dialog</span>
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
            action={
              <Tooltip title="Delete the selected variables." placement="bottom" arrow>
                <IconButton
                  color="primary"
                  onClick={() =>
                    confirm.onTrue({
                      onConfirm: () => handleDeleteRow(),
                    })
                  }
                >
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
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
              {novariablesAdded ? (
                <TableNoData
                  title="No custom variables added!"
                  subTitle="You may not have created any variables yet."
                  learnMoreText="Learn more"
                  learnMoreLink="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/"
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
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
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

      <ConfirmDialog
        open={confirm.value}
        onClose={() => confirm.onFalse()} // Close the dialog on cancellation
        title="Do you want to delete the selected variables?"
        content="You won't be able to revert this action!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteRow()} // Trigger delete logic
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, filters }) {
  const { name } = filters;

  // Filter by variable name (name filter)
  if (name) {
    inputData = inputData.filter((variable) =>
      variable.variableName.toLowerCase().includes(name.toLowerCase())
    );
  }

  return inputData;
}
