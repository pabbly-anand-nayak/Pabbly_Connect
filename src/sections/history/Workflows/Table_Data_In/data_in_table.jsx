import 'react-modal-video/css/modal-video.min.css';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Table, Tooltip, TableBody, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

// import { _orders, ORDER_STATUS_OPTIONS } from 'src/_mock';
import { _templates } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableSelectedAction,
} from 'src/components/table';

import { DataInTableRow } from './data_in_row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'teammember', label: 'Team member email', width: 700, tooltip: 'Team member email ' },
  { id: 'sharedon', label: 'Shared on', width: 700, tooltip: 'Shared date and time ' },
  { id: '', label: '', width: 562 },
];

export default function DataInTable({ sx, icon, title, total, color = 'warning', ...other }) {
  // const theme = useTheme();

  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_templates);

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

  return (
    <>
      {/* Table */}

      {/* <Card> */}
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
            <Tooltip title="Delete">
              <IconButton color="primary" onClick={confirm.onTrue}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
        />

        <Scrollbar sx={{ minHeight: 300 }}>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <DataInTableRow
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

              <TableNoData />
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>
      {/* </Card> */}
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
    inputData = inputData.filter(
      (order) =>
        order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.createdAt, startDate, endDate));
    }
  }

  return inputData;
}

// import 'react-modal-video/css/modal-video.min.css';

// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import { Table, Tooltip, TableBody, IconButton } from '@mui/material';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { useSetState } from 'src/hooks/use-set-state';

// import { fIsAfter, fIsBetween } from 'src/utils/format-time';

// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';
// import {
//   useTable,
//   emptyRows,
//   rowInPage,
//   TableNoData,
//   getComparator,
//   TableEmptyRows,
//   TableSelectedAction,
// } from 'src/components/table';

// import { DataInTableRow } from './data_in_row';

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'teammember', label: 'Team member email', width: 700, tooltip: 'Team member email ' },
//   { id: 'sharedon', label: 'Shared on', width: 700, tooltip: 'Shared date and time ' },
//   { id: '', label: '', width: 562 },
// ];

// // Sample data arrays
// const sampleEmails = [
//   'john.doe@example.com',
//   'jane.smith@example.com',
//   'mike.johnson@example.com',
//   'sara.williams@example.com',
//   'tom.brown@example.com',
// ];

// const sampleMessages = [
//   'The application processed the request successfully.',
//   'An error occurred while processing the request. Please try again.',
//   'Data has been updated in the database.',
//   'User authentication failed. Check credentials and try again.',
//   'New user account created successfully.',
// ];

// const sampleDates = ['2024-09-15', '2024-09-16', '2024-09-17', '2024-09-18', '2024-09-19'];

// export default function DataInTable({ sx, icon, title, total, color = 'warning', ...other }) {
//   const table = useTable({ defaultOrderBy: 'orderNumber' });

//   const router = useRouter();

//   const confirm = useBoolean();

//   const [tableData, setTableData] = useState(
//     sampleEmails.map((email, index) => ({
//       id: index + 1,
//       email,
//       message: sampleMessages[index],
//       date: sampleDates[index],
//     }))
//   );

//   const filters = useSetState({
//     name: '',
//     status: 'all',
//     startDate: null,
//     endDate: null,
//   });

//   const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

//   const dataFiltered = applyFilter({
//     inputData: tableData,
//     comparator: getComparator(table.order, table.orderBy),
//     filters: filters.state,
//     dateError,
//   });

//   const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

//   const canReset =
//     !!filters.state.name ||
//     filters.state.status !== 'all' ||
//     (!!filters.state.startDate && !!filters.state.endDate);

//   const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

//   const handleDeleteRow = useCallback(
//     (id) => {
//       const deleteRow = tableData.filter((row) => row.id !== id);

//       setTableData(deleteRow);

//       table.onUpdatePageDeleteRow(dataInPage.length);
//     },
//     [dataInPage.length, table, tableData]
//   );

//   const handleDeleteRows = useCallback(() => {
//     const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

//     setTableData(deleteRows);

//     table.onUpdatePageDeleteRows({
//       totalRowsInPage: dataInPage.length,
//       totalRowsFiltered: dataFiltered.length,
//     });
//   }, [dataFiltered.length, dataInPage.length, table, tableData]);

//   const handleViewRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.order.details(id));
//     },
//     [router]
//   );

//   return (
//     <Box sx={{ position: 'relative' }}>
//       <TableSelectedAction
//         dense={table.dense}
//         numSelected={table.selected.length}
//         rowCount={dataFiltered.length}
//         onSelectAllRows={(checked) =>
//           table.onSelectAllRows(
//             checked,
//             dataFiltered.map((row) => row.id)
//           )
//         }
//         action={
//           <Tooltip title="Delete">
//             <IconButton color="primary" onClick={confirm.onTrue}>
//               <Iconify icon="solar:trash-bin-trash-bold" />
//             </IconButton>
//           </Tooltip>
//         }
//       />

//       <Scrollbar sx={{ minHeight: 300 }}>
//         <Table size={table.dense ? 'small' : 'medium'}>
//           <TableBody>
//             {dataFiltered
//               .slice(
//                 table.page * table.rowsPerPage,
//                 table.page * table.rowsPerPage + table.rowsPerPage
//               )
//               .map((row) => (
//                 <DataInTableRow
//                   key={row.id}
//                   row={row}
//                   selected={table.selected.includes(row.id)}
//                   onSelectRow={() => table.onSelectRow(row.id)}
//                   onDeleteRow={() => handleDeleteRow(row.id)}
//                   onViewRow={() => handleViewRow(row.id)}
//                 />
//               ))}

//             <TableEmptyRows
//               height={table.dense ? 56 : 56 + 20}
//               emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
//             />

//             <TableNoData />
//           </TableBody>
//         </Table>
//       </Scrollbar>
//     </Box>
//   );
// }

// function applyFilter({ inputData, comparator, filters, dateError }) {
//   const { status, name, startDate, endDate } = filters;

//   const stabilizedThis = inputData.map((el, index) => [el, index]);

//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   inputData = stabilizedThis.map((el) => el[0]);

//   if (name) {
//     inputData = inputData.filter(
//       (order) =>
//         order.email.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
//         order.message.toLowerCase().indexOf(name.toLowerCase()) !== -1
//     );
//   }

//   if (status !== 'all') {
//     inputData = inputData.filter((order) => order.status === status);
//   }

//   if (!dateError) {
//     if (startDate && endDate) {
//       inputData = inputData.filter((order) => fIsBetween(order.date, startDate, endDate));
//     }
//   }

//   return inputData;
// }
