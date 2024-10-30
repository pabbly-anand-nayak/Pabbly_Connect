import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Table, TableBody, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { _templates } from 'src/_mock';

import { Scrollbar } from 'src/components/scrollbar';
import {
  emptyRows,
  rowInPage,
  TableNoData,
  TableEmptyRows,
  TableSelectedAction,
} from 'src/components/table';

import { DataInTableRow } from './data_out3_row';
import { DataOut3Table } from './use-table-data-out';

// ----------------------------------------------------------------------

export default function DataOutTable3({
  searchQuery = '',
  sx,
  icon,
  title,
  total,
  color = 'warning',
  ...other
}) {
  const table = DataOut3Table({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_templates);

  const dataInPage = rowInPage(tableData, table.page, table.rowsPerPage);

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
      totalRowsFiltered: tableData.length,
    });
  }, [dataInPage.length, table, tableData]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(`/path/to/details/${id}`);
    },
    [router]
  );

  // Filter data based on search query
  const filteredData = searchQuery
    ? tableData.filter((row) =>
        Object.values(row).some(
          (value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : tableData;

  const notFound = searchQuery && filteredData.length === 0;

  return (
    <Box sx={{ position: 'relative' }}>
      <TableSelectedAction
        dense={table.dense}
        numSelected={table.selected.length}
        rowCount={tableData.length}
        onSelectAllRows={(checked) =>
          table.onSelectAllRows(
            checked,
            tableData.map((row) => row.id)
          )
        }
      />
      <Scrollbar sx={{ minHeight: 'auto' }}>
        {notFound ? (
          <Box>
            {/* <Divider /> */}
            <Box sx={{ textAlign: 'center', borderRadius: 1.5, p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Not found
              </Typography>
              <Typography variant="body2">
                No results found for <strong>&quot;{searchQuery}&quot;</strong>.
                <br />
                Try checking for typos or using complete words.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableBody>
              {tableData
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <DataInTableRow
                    key={row.id}
                    row={row} // Pass the entire row data here
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                  />
                ))}
              <TableEmptyRows
                height={table.dense ? 56 : 76}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
              />
              <TableNoData />
            </TableBody>
          </Table>
        )}
      </Scrollbar>
    </Box>
  );
}
