// import { useState } from 'react';
// import { useTheme } from '@emotion/react';
// import { useNavigate } from 'react-router';

// import { Box, Tooltip, useMediaQuery } from '@mui/material';

// import { Iconify } from 'src/components/iconify';
// import StatsCards from 'src/components/stats-card/stats-card';
// import StatusLabel from 'src/components/custom-table/StatusLabel';
// import CustomTable from 'src/components/custom-table/custom-table';

// import HistoryBigCard from './components/historybigcard/big-card';
// import TaskHistoryTable from './table-task-history/history-table';

// // import { BlankView } from 'src/sections/blank/view';

// // ----------------------------------------------------------------------

// export default function TaskHistoryPage() {
//   const [selectedListItem, setSelectedListItem] = useState(0);
//   const listItemsData = [
//     {
//       name: 'Pabbly Connect List',
//       totalContacts: 54,
//       optedInContacts: 30,
//       optedOutContacts: 24,
//     },
//     {
//       name: 'Pabbly Subscription Billing List',
//       totalContacts: 23,
//       optedInContacts: 15,
//       optedOutContacts: 8,
//     },
//     {
//       name: 'Pabbly Form Builder List',
//       totalContacts: 54,
//       optedInContacts: 40,
//       optedOutContacts: 14,
//     },
//   ];
//   const handleListItemSelect = (index) => {
//     setSelectedListItem(index);
//   };

//   const currentData = listItemsData[selectedListItem];
//   const theme = useTheme();

//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();

//   // ------------------

//   // const [filters, setFilters] = useState({
//   //   state: { name: '', status: 'all' }, // Initial state
//   // });

//   const [filters, setFilters] = useState({
//     state: {
//       name: '',
//       status: 'all',
//     },
//     setState: (newState) =>
//       setFilters((prev) => ({ ...prev, state: { ...prev.state, ...newState } })),
//   });

//   const handleTabChange = (event, newValue) => {
//     setFilters((prev) => ({
//       ...prev,
//       state: { ...prev.state, status: newValue },
//     }));
//   };

//   const rows = [
//     { id: 1, status: 'Success', date: 'Dec 14, 2024', name: 'Workflow A', tasks: '5 Tasks' },
//     {
//       id: 2,
//       status: 'Partial Failed',
//       date: 'Dec 13, 2024',
//       name: 'Workflow B',
//       tasks: '10 Tasks',
//     },
//     { id: 3, status: 'Success', date: 'Dec 12, 2024', name: 'Workflow C', tasks: '15 Tasks' },
//     {
//       id: 4,
//       status: 'Failed',
//       date: 'Dec 11, 2024',
//       name: 'Workflow D',
//       tasks: '20 Tasks',
//     },
//     { id: 5, status: 'Success', date: 'Dec 14, 2024', name: 'Workflow A', tasks: '5 Tasks' },
//     { id: 6, status: 'Failed', date: 'Dec 13, 2024', name: 'Workflow B', tasks: '10 Tasks' },
//     {
//       id: 7,
//       status: 'Partial Failed',
//       date: 'Dec 12, 2024',
//       name: 'Workflow C',
//       tasks: '15 Tasks',
//     },
//     { id: 8, status: 'Failed', date: 'Dec 11, 2024', name: 'Workflow D', tasks: '20 Tasks' },
//   ];

//   const tabs = {
//     options: [
//       {
//         value: 'all',
//         label: 'All',
//         count: rows.length,
//         tooltip: 'Show all task execution results.',
//       },
//       {
//         value: 'success',
//         label: 'Success',
//         count: rows.filter((row) => row.status === 'Success').length,
//         tooltip: 'Show task executions completed successfully.',
//       },
//       {
//         value: 'partial failed',
//         label: 'Partial Failed',
//         count: rows.filter((row) => row.status === 'Partial Failed').length,
//         tooltip: 'Show task executions with partial errors.',
//       },
//       {
//         value: 'failed',
//         label: 'Failed',
//         count: rows.filter((row) => row.status === 'Failed').length,
//         tooltip: 'Show task executions that failed due to errors.',
//       },
//     ],
//     value: filters.state.status,
//   };

//   const filteredRows = rows.filter((row) => {
//     // Normalize status for comparison
//     const normalizedRowStatus = row.status.toLowerCase();
//     const normalizedFilterStatus = filters.state.status.toLowerCase();

//     // Filter by status tab with more specific matching
//     const statusMatch =
//       normalizedFilterStatus === 'all' ||
//       (normalizedFilterStatus === 'success' && normalizedRowStatus === 'success') ||
//       (normalizedFilterStatus === 'partial failed' && normalizedRowStatus === 'partial failed') ||
//       (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

//     // Filter by name search
//     const nameMatch =
//       !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

//     return statusMatch && nameMatch;
//   });

//   return (
//     <Box
//       sx={{
//         gap: 3,
//         display: 'flex',
//         flexDirection: isMobile ? 'column' : 'row',
//         alignItems: isMobile ? 'flex-start' : 'flex-start',
//         // justifyContent: 'space-between',
//       }}
//     >
//       <Box sx={{ width: '100%' }}>
//         <Box
//           sx={{
//             mt: 0,

//             gap: 3,
//             display: 'grid',
//             gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
//           }}
//         >
//           {/* Workflow Executed */}
//           <Tooltip
//             title="Number of times the complete workflow executed in the last 30 days."
//             arrow
//             placement="top"
//             disableInteractive
//           >
//             <div>
//               <StatsCards
//                 cardtitle="Workflow Executed"
//                 cardstats="3,500"
//                 icon_name="task_alloted.png"
//                 icon_color="#FFA92E"
//                 bg_gradient="#FFA92E"
//               />
//             </div>
//           </Tooltip>
//           {/* Tasks Consumed) */}
//           <Tooltip
//             title="Number of tasks consumed in the last 30 days. We do not count trigger steps and internal application steps in your task consumption. We only count tasks when a action is done in an external software. For Example: Add a new row inside Google Sheets."
//             arrow
//             placement="top"
//           >
//             <div>
//               <StatsCards
//                 cardtitle="Tasks Consumed"
//                 cardstats="2,400"
//                 icon_name="task_consumed.png"
//                 icon_color="#1D88FA"
//                 bg_gradient="#1D88FA"
//               />
//             </div>
//           </Tooltip>

//           {/* Free Task Consumed */}
//           <Tooltip title="Number of free tasks consumed in the last 30 days." arrow placement="top">
//             <div>
//               <StatsCards
//                 cardtitle="Free Task Consumed"
//                 cardstats="1,100"
//                 icon_name="task_free.png"
//                 icon_color="#10CBF3"
//                 bg_gradient="#10CBF3"
//               />
//             </div>
//           </Tooltip>
//         </Box>
//         {/* <CustomTable
//           title="Task History"
//           columns={columns}
//           rows={rows}
//           filters={{
//             state: filters.state,
//             setState: (newFilters) => setFilters({ state: { ...filters.state, ...newFilters } }),
//           }}
//           onResetPage={handleResetPage}
//           tabs={tabs}
//           onTabChange={handleTabChange}
//           actions={actions}
//           numSelected={0} // Number of rows selected (for bulk actions)
//           total={rows.length} // Total number of rows
//           table={{ onResetPage: handleResetPage }} // Table-related actions
//           color="success"
//         /> */}
//         {/* <CustomTable
//           title="Task History"
//           columns={[
//             { id: 'status', label: 'Status' },
//             { id: 'date', label: 'Date' },
//             { id: 'name', label: 'Name' },
//             { id: 'tasks', label: 'Tasks Consumed' },
//           ]}
//           rows={rows}
//           // filters={{
//           //   state: filters.state,
//           //   setState: (newFilters) => setFilters({ state: { ...filters.state, ...newFilters } }),
//           // }}

//           filters={filters}
//           onTabChange={(event, newValue) => {
//             // Any additional tab change logic
//           }}
//           // onTabChange={handleTabChange}
//           tabs={tabs}
//         /> */}
//         <CustomTable
//           title="Task History"
//           columns={[
//             {
//               id: 'status',
//               label: 'Status',
//               render: (row) => {
//                 const normalizedStatus = row.status.toLowerCase();

//                 // Define configurations for different statuses
//                 const statusConfigs = {
//                   success: {
//                     color: 'success',
//                     tooltip: 'Task execution was fully successful.',
//                     text: 'Success',
//                     icon: <Iconify icon="heroicons:check-circle-16-solid" />,
//                   },
//                   'partial failed': {
//                     color: 'warning',
//                     tooltip: 'Task execution failed due to partial failure.',
//                     text: 'Partial Failed',
//                     icon: <Iconify icon="ant-design:close-circle-filled" />,
//                   },
//                   failed: {
//                     color: 'error',
//                     tooltip: 'Task execution failed due to an error.',
//                     text: 'Failed',
//                     icon: <Iconify icon="ant-design:close-circle-filled" />,
//                   },
//                 };

//                 // Use the configurations to render StatusLabel
//                 const config = statusConfigs[normalizedStatus] || {
//                   color: 'default',
//                   tooltip: 'Unknown status.',
//                   text: row.status,
//                   icon: null,
//                 };

//                 return (
//                   <StatusLabel
//                     color={config.color}
//                     tooltip={config.tooltip}
//                     text={config.text}
//                     icon={config.icon}
//                   />
//                 );
//               },
//             },
//             { id: 'date', label: 'Date' },
//             { id: 'name', label: 'Name' },
//             { id: 'tasks', label: 'Tasks Consumed' },
//           ]}
//           rows={rows}
//           filters={filters}
//           onTabChange={(event, newValue) => {
//             // Any additional tab change logic
//           }}
//           tabs={tabs}
//         />
//         ;
//         <HistoryBigCard />
//         <TaskHistoryTable />
//       </Box>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import { Box, Tooltip, useMediaQuery } from '@mui/material';

import { Iconify } from 'src/components/iconify'; // Ensure this path is correct
import DateTime from 'src/components/custom-table/DateTime';
import StatsCards from 'src/components/stats-card/stats-card';
import StatusLabel from 'src/components/custom-table/StatusLabel';
import CustomTable from 'src/components/custom-table/custom-table';

import HistoryBigCard from './components/historybigcard/big-card';
// import TaskHistoryTable from './table-task-history/history-table';

export default function TaskHistoryPage() {
  const [selectedListItem, setSelectedListItem] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [filters, setFilters] = useState({
    state: {
      name: '',
      status: 'all',
    },
    setState: (newState) =>
      setFilters((prev) => ({ ...prev, state: { ...prev.state, ...newState } })),
  });

  const rows = [
    { id: 1, status: 'Success', date: 'Dec 14, 2024', name: 'Workflow A', tasks: '5 Tasks' },
    {
      id: 2,
      status: 'Partial Failed',
      date: 'Dec 13, 2024',
      name: 'Workflow B',
      tasks: '10 Tasks',
    },
    { id: 3, status: 'Success', date: 'Dec 12, 2024', name: 'Workflow C', tasks: '15 Tasks' },
    { id: 4, status: 'Failed', date: 'Dec 11, 2024', name: 'Workflow D', tasks: '20 Tasks' },
    { id: 5, status: 'Success', date: 'Dec 14, 2024', name: 'Workflow A', tasks: '5 Tasks' },
    { id: 6, status: 'Failed', date: 'Dec 13, 2024', name: 'Workflow B', tasks: '10 Tasks' },
    {
      id: 7,
      status: 'Partial Failed',
      date: 'Dec 12, 2024',
      name: 'Workflow C',
      tasks: '15 Tasks',
    },
    { id: 8, status: 'Failed', date: 'Dec 11, 2024', name: 'Workflow D', tasks: '20 Tasks' },
  ];

  const tabs = {
    options: [
      {
        value: 'all',
        label: 'All',
        count: rows.length,
        tooltip: 'Show all task execution results.',
      },
      {
        value: 'success',
        label: 'Success',
        count: rows.filter((row) => row.status === 'Success').length,
        tooltip: 'Show task executions completed successfully.',
      },
      {
        value: 'partial failed',
        label: 'Partial Failed',
        count: rows.filter((row) => row.status === 'Partial Failed').length,
        tooltip: 'Show task executions with partial errors.',
      },
      {
        value: 'failed',
        label: 'Failed',
        count: rows.filter((row) => row.status === 'Failed').length,
        tooltip: 'Show task executions that failed due to errors.',
      },
    ],
    value: filters.state.status,
  };

  return (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'flex-start',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            mt: 0,
            gap: 3,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          <Tooltip title="Workflow Executed in the last 30 days." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Workflow Executed"
                cardstats="3,500"
                icon_name="task_alloted.png"
                icon_color="#FFA92E"
                bg_gradient="#FFA92E"
              />
            </div>
          </Tooltip>
          <Tooltip title="Tasks consumed in the last 30 days." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Tasks Consumed"
                cardstats="2,400"
                icon_name="task_consumed.png"
                icon_color="#1D88FA"
                bg_gradient="#1D88FA"
              />
            </div>
          </Tooltip>
          <Tooltip title="Free tasks consumed in the last 30 days." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Free Task Consumed"
                cardstats="1,100"
                icon_name="task_free.png"
                icon_color="#10CBF3"
                bg_gradient="#10CBF3"
              />
            </div>
          </Tooltip>
        </Box>

        {/* <CustomTable
          title="Task History"
          columns={[
            {
              id: 'status',
              label: 'Status',
              render: (row) => {
                const normalizedStatus = row.status.toLowerCase();
                const statusConfigs = {
                  success: {
                    color: 'success',
                    tooltip: 'Task execution was fully successful.',
                    text: 'Success',
                    icon: <Iconify icon="heroicons:check-circle-16-solid" />,
                  },
                  'partial failed': {
                    color: 'warning',
                    tooltip: 'Task execution failed due to partial failure.',
                    text: 'Partial Failed',
                    icon: <Iconify icon="ant-design:close-circle-filled" />,
                  },
                  failed: {
                    color: 'error',
                    tooltip: 'Task execution failed due to an error.',
                    text: 'Failed',
                    icon: <Iconify icon="ant-design:close-circle-filled" />,
                  },
                };

                const config = statusConfigs[normalizedStatus] || {
                  color: 'default',
                  tooltip: 'Unknown status.',
                  text: row.status,
                  icon: null,
                };

                return (
                  <StatusLabel
                    color={config.color}
                    tooltip={config.tooltip}
                    text={config.text}
                    icon={config.icon}
                  />
                );
              },
            },
            { id: 'date', label: 'Date' },
            { id: 'name', label: 'Name' },
            { id: 'tasks', label: 'Tasks Consumed' },
          ]}
          rows={rows}
          filters={filters}
          onTabChange={(event, newValue) => {
            filters.setState({ ...filters.state, status: newValue });
          }}
          tabs={tabs}
        /> */}

        <CustomTable
          title="Task History"
          columns={[
            {
              id: 'status',
              label: 'Task Status/Date',
              render: (row) => {
                const normalizedStatus = row.status.toLowerCase();
                const statusConfigs = {
                  success: {
                    color: 'success',
                    tooltip: 'Task execution was fully successful.',
                    text: 'Success',
                    icon: <Iconify icon="heroicons:check-circle-16-solid" />,
                  },
                  'partial failed': {
                    color: 'warning',
                    tooltip: 'Task execution failed due to partial failure.',
                    text: 'Partial Failed',
                    icon: <Iconify icon="ant-design:close-circle-filled" />,
                  },
                  failed: {
                    color: 'error',
                    tooltip: 'Task execution failed due to an error.',
                    text: 'Failed',
                    icon: <Iconify icon="ant-design:close-circle-filled" />,
                  },
                };

                const config = statusConfigs[normalizedStatus] || {
                  color: 'default',
                  tooltip: 'Unknown status.',
                  text: row.status,
                  icon: null,
                };

                return (
                  <Box>
                    {/* Status Label */}
                    <StatusLabel
                      color={config.color}
                      tooltip={config.tooltip}
                      text={config.text}
                      icon={config.icon}
                    />

                    {/* Execution Time Tooltip with Custom Text */}
                    <DateTime
                      createdAt={row.date}
                      // tooltipText={`Custom Tooltip: Processed on ${row.date}`}
                      tooltipText={`Execution Time: ${row.date}, (UTC+05:30) Asia/Kolkata`}
                    />
                  </Box>
                );
              },
            },
            { id: 'date', label: 'Date' },
            { id: 'name', label: 'Name' },
            { id: 'tasks', label: 'Tasks Consumed' },
          ]}
          rows={rows}
          filters={filters}
          onTabChange={(event, newValue) => {
            filters.setState({ ...filters.state, status: newValue });
          }}
          tabs={tabs}
        />

        <HistoryBigCard />
        {/* <TaskHistoryTable /> */}
      </Box>
    </Box>
  );
}
