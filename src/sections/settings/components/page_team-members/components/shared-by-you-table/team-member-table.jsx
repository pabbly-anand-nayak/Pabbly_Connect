import { toast } from 'sonner';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {
  Table,
  Tooltip,
  Divider,
  TableBody,
  IconButton,
  CardHeader,
  CircularProgress,
  // CircularProgress,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  rowInPage,
  TableNoData,
  getComparator,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { _teammember } from './_teammember';
import { OrderTableRow } from './team-member-table-row';
import { OrderTableToolbar } from './team-member-table-toolbar';
import { OrderTableFiltersResult } from './team-member-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
  {
    id: 'team_member_email',
    label: 'Team Member Email',
    width: '250',
    tooltip: 'Email address of the team member with whom the workflow or folder is shared.',
  },

  {
    id: 'workflows_and_folders',
    label: 'Workflows and Folders You’ve Shared',
    width: '200',
    tooltip: 'Name of the workflow or folder shared.',
  },
  {
    id: 'shared_on',
    label: 'Shared On',
    width: '200',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Date and time when the workflow or folder was shared.',
  },
  { id: '', width: 50 },
];

// ----------------------------------------------------------------------

export default function SharedbyYouTeamMemberTable({
  sx,
  icon,
  title,
  total,
  color = 'warning',
  ...other
}) {
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(_teammember);

  const filters = useSetState({
    email: '', // Initialize email filter state
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

  const canReset = !!filters.state.email || filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const [setConfirmDelete] = useState(false);

  const [setConfirmDialogProps] = useState({});

  const handleOpenConfirmDialog = (action) => {
    setConfirmDialogProps(action);
    setConfirmDelete(true);
  };

  const handleDeleteRow = useCallback(
    (id) => {
      setIsLoading(true); // Set loading state to true
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);

      // Show success snackbar
      toast.success('Successfully removed the selected access.');

      confirm.onFalse(); // Close ConfirmDialog after the action
      setIsLoading(false); // Reset loading state
    },
    [dataInPage.length, table, tableData, confirm]
  );

  // Modify these conditions at the top of your component
  const nomemberAdded = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.email; // When search returns no results

  // LoadingButton
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
              <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
                <Tooltip
                  title="Add team members and share workflow(s) or folder(s) access with them."
                  arrow
                  placement="bottom"
                >
                  Team Members
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

        <OrderTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
          numSelected={table.selected.length}
          nomemberAdded={nomemberAdded}
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
              <Tooltip title=" Remove the selected access.">
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
              {nomemberAdded ? (
                <TableNoData
                  title="No team members added!"
                  subTitle="You have not added any team members yet. You can add a team member and share access to workflows or folders with them."
                  learnMoreText="Learn more"
                  learnMoreLink="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220"
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

                  <TableNoData />
                </TableBody>
              )}
            </Table>
          </Scrollbar>
        </Box>

        <TablePaginationCustom
          disabled={nomemberAdded} // Disabled When No Team Members Added
          page={table.page}
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={confirm.value}
        onClose={() => confirm.onFalse()} // Close the dialog on cancellation
        title="Do you wish to remove selected access?"
        content="You won't be able to revert this!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteRow()} // Trigger delete logic
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Remove Access'}
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, filters }) {
  const { email } = filters;

  // Filter by email (search)
  if (email) {
    inputData = inputData.filter((variable) =>
      variable.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  return inputData;
}
