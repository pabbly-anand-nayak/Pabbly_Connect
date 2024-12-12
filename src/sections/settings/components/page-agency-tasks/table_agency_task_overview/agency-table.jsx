import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  IconButton,
  CardHeader,
  useMediaQuery,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
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

import { _agency } from './_agency';
import { OrderTableRow } from './agency-table-row';
import { OrderTableToolbar } from './agency-table-toolbar';
import { OrderTableFiltersResult } from './agency-table-filters-result';

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
  {
    id: 'orderNumber',
    label: 'Assigned On',
    width: '220',
    tooltip: 'Date when tasks were assigned to the Pabbly Connect account.',
  },
  {
    id: 'name',
    label: 'Email',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Email of the Pabbly Connect account to which the tasks are assigned.',
  },
  {
    id: 'totalAmount',
    label: 'Tasks Assigned',
    width: 'flex',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Number of agency tasks allotted to the Pabbly Connect account.',
  },
  { id: '', width: 50 },
];

export default function AgencyTable({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const [tableData, setTableData] = useState(_agency);

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

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({});

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
      handleCloseConfirmDialog();
    },
    [dataInPage.length, table, tableData]
  );

  const handleOpenConfirmDialog = (action) => {
    setConfirmDialogProps(action);
    setConfirmDelete(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDelete(false);
    setConfirmDialogProps({});
  };

  // Updated state for CustomSnackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Updated Snackbar close handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  // Modify these conditions at the top of your component
  const noTasksEver = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.name; // When search returns no results
  const noFilterResults = dataFiltered.length === 0 && !filters.state.name; // When filters result in no data

  return (
    <>
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
                  title="View details of Pabbly Connect accounts that have been assigned agency tasks."
                  arrow
                  placement="bottom"
                >
                  Agency Task Overview
                </Tooltip>
              </Box>
              <Box sx={{ typography: 'body2', fontSize: '14px', color: 'text.secondary' }}>
                View details of Pabbly Connect accounts that have been assigned agency tasks.
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
            action={
              <Tooltip title="Remove the selected assigned agency tasks." placement="bottom" arrow>
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
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() =>
                          handleOpenConfirmDialog({
                            onConfirm: () => handleDeleteRow(row.id),
                          })
                        }
                        serialNumber={table.page * table.rowsPerPage + index + 1}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData />
                </TableBody>
              )}
            </Table>
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

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you want to revoke the selected assigned tasks?"
        content="You won't be able to revert this!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCloseConfirmDelete(); // Close the dialog after revoking tasks
              setSnackbarMessage('Successfully revoke the selected assigned tasks.');
              setSnackbarSeverity('success');
              setSnackbarOpen(true); // Show success snackbar
            }}
          >
            Revoke Tasks
          </Button>
        }
      />

      {/* Updated CustomSnackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
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
