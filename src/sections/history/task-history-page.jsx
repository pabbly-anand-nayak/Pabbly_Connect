import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Tooltip, useMediaQuery } from '@mui/material';

import StatsCards from 'src/components/stats-card/stats-card';
import CustomTable from 'src/components/custom-table/custom-table';

import HistoryBigCard from './components/historybigcard/big-card';
import TaskHistoryTable from './table-task-history/history-table';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export default function TaskHistoryPage() {
  const [selectedListItem, setSelectedListItem] = useState(0);
  const listItemsData = [
    {
      name: 'Pabbly Connect List',
      totalContacts: 54,
      optedInContacts: 30,
      optedOutContacts: 24,
    },
    {
      name: 'Pabbly Subscription Billing List',
      totalContacts: 23,
      optedInContacts: 15,
      optedOutContacts: 8,
    },
    {
      name: 'Pabbly Form Builder List',
      totalContacts: 54,
      optedInContacts: 40,
      optedOutContacts: 14,
    },
  ];
  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  const currentData = listItemsData[selectedListItem];
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // ------------------

  const [filters, setFilters] = useState({
    state: { name: '', status: 'all' }, // Initial state
  });

  const handleTabChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      state: { ...prev.state, status: newValue },
    }));
  };

  const rows = [
    { id: 1, status: 'Active', date: 'Dec 14, 2024', name: 'Workflow A', tasks: '5 Tasks' },
    { id: 2, status: 'Inactive', date: 'Dec 13, 2024', name: 'Workflow B', tasks: '10 Tasks' },
    { id: 3, status: 'Active', date: 'Dec 12, 2024', name: 'Workflow C', tasks: '15 Tasks' },
    { id: 4, status: 'Inactive', date: 'Dec 11, 2024', name: 'Workflow D', tasks: '20 Tasks' },
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
        value: 'live',
        label: 'Success',
        count: rows.filter((row) => row.status === 'Active').length,
        tooltip: 'Show task executions completed successfully.',
      },
      {
        value: 'partialfailed',
        label: 'Partial Failed',
        count: rows.filter((row) => row.status === 'Inactive').length,
        tooltip: 'Show task executions with partial errors.',
      },
      {
        value: 'failed',
        label: 'Failed',
        count: rows.filter((row) => row.status === 'Inactive').length,
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
        // justifyContent: 'space-between',
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
          {/* Workflow Executed */}
          <Tooltip
            title="Number of times the complete workflow executed in the last 30 days."
            arrow
            placement="top"
            disableInteractive
          >
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
          {/* Tasks Consumed) */}
          <Tooltip
            title="Number of tasks consumed in the last 30 days. We do not count trigger steps and internal application steps in your task consumption. We only count tasks when a action is done in an external software. For Example: Add a new row inside Google Sheets."
            arrow
            placement="top"
          >
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

          {/* Free Task Consumed */}
          <Tooltip title="Number of free tasks consumed in the last 30 days." arrow placement="top">
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
          columns={columns}
          rows={rows}
          filters={{
            state: filters.state,
            setState: (newFilters) => setFilters({ state: { ...filters.state, ...newFilters } }),
          }}
          onResetPage={handleResetPage}
          tabs={tabs}
          onTabChange={handleTabChange}
          actions={actions}
          numSelected={0} // Number of rows selected (for bulk actions)
          total={rows.length} // Total number of rows
          table={{ onResetPage: handleResetPage }} // Table-related actions
          color="success"
        /> */}

        <CustomTable
          title="Task History"
          columns={[
            { id: 'status', label: 'Status' },
            { id: 'date', label: 'Date' },
            { id: 'name', label: 'Name' },
            { id: 'tasks', label: 'Tasks Consumed' },
          ]}
          rows={rows}
          filters={{
            state: filters.state,
            setState: (newFilters) => setFilters({ state: { ...filters.state, ...newFilters } }),
          }}
          onTabChange={handleTabChange}
          tabs={tabs}
        />

        <HistoryBigCard />
        <TaskHistoryTable />
      </Box>
    </Box>
  );
}
