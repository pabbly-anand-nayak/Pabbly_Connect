// import { DashboardContent } from 'src/layouts/dashboard';

// import PageHeader from 'src/components/page-header/page-header';

// import TaskUsageTable from './Table Task Usage/table';

// export default function AddContact() {

//   return (
//     <DashboardContent maxWidth="xl">
//       <PageHeader title="Task Usage by Workflows" Subheading="You can view which workflows are consuming the highest and lowest number of tasks. Any action performed in your workflow is considered a task. Triggers are not included in the task count, and internal applications of Pabbly Connect, such as filters, routers, and formatters, are also not considered tasks." link_added="#" />

//       {/* <TaskUsageTable/> */}

//       <TaskUsageTable/>

//     </DashboardContent>
//   );
// }

// --------------------------------------------------------

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Grid, Alert, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';

import StatsCards from 'src/components/stats-card/stats-card';

import SummaryBigCard from '../components/page-task-summary/big-card/summary-big-card';
import TaskSummaryTable2 from '../components/page-task-summary/table-agency-account/agency-table';
import TaskSummaryTable from '../components/page-task-summary/table-sub-accounts/sub-accounts-table';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function TaskSummaryPage() {
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
        mt: '0',
      }}
    >
      {/* Cards Section */}
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          <Tooltip
            title="Number of tasks allotted to your account."
            arrow
            placement="top"
            disableInteractive
          >
            <div>
              <StatsCards
                cardtitle="Task Allotted"
                cardstats="10,000"
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
                cardtitle="Task Consumed"
                cardstats="2,400"
                icon_name="task_consumed.png"
                icon_color="#1D88FA"
                bg_gradient="#1D88FA"
              />
            </div>
          </Tooltip>

          <Tooltip title="Number of tasks remaining in your account." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Tasks Remaining"
                cardstats="8,000"
                icon_name="task_remaining.png"
                icon_color="#22C55E"
                bg_gradient="#22C55E"
              />
            </div>
          </Tooltip>

          {/* Free Task Consumed */}
          <Tooltip
            title="Pabbly Connect does not charge tasks for triggers and internal application steps. You're saving 50% on task usage by using Pabbly Connect."
            arrow
            placement="top"
          >
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
        <Grid xs={12} md={8}>
          <SummaryBigCard />
        </Grid>
        <Alert
          sx={{
            mt: 4,
            mb: 4,
            color: 'success',
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
          }}
          severity="warning"
        >
          Your tasks were reset on Oct 01, 2024 00:00:02 (GMT).{' '}
          <Link
            href="https://forum.pabbly.com/threads/pabbly-connect-task-reset-policy-when-does-my-task-count-reset.17614/"
            className="font-medium underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#078DEE' }}
          >
            Learn more
          </Link>
        </Alert>
        <TaskSummaryTable />
        <TaskSummaryTable2 />
      </Box>
    </Box>
  );
}
