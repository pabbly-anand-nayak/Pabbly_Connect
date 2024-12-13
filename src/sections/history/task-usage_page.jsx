import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Tooltip, useMediaQuery } from '@mui/material';

import StatsCards from 'src/components/stats-card/stats-card';

import TaskUsageBigCard from 'src/sections/history/components/taskusagebigcard/big-card';

import TaskUsageTableNew from './Table Task Usage/task-usage-table';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export default function TaskUsagePage() {
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
                cardstats="5,000"
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
                cardstats="1,900"
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
                cardstats="1,200"
                icon_name="task_free.png"
                icon_color="#10CBF3"
                bg_gradient="#10CBF3"
              />
            </div>
          </Tooltip>
        </Box>
        <TaskUsageBigCard />
        <TaskUsageTableNew />
      </Box>
    </Box>
  );
}
