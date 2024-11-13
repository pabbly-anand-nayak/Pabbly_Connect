import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Grid, Alert, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';

import StatsCards from 'src/components/stats-card/stats-card';

import AgencyTasksBigCard from '../components/page-agency-tasks/big-card/agency-tasks-big-card';
import AgencyTable from '../components/page-agency-tasks/hook/table_agency_task_overview/agency-table';
import NewUserAgencyTasksBigCard from '../components/page-agency-tasks/big-card/newuser-agency-tasks-big-card';
import NewUserAgencyTable from '../components/page-agency-tasks/hook/newuser-table_agency/newuser-agency-table';
import AgencyAccountTable from '../components/page-agency-tasks/hook/table_ agency_task_details_account/agency-account-table';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function AgencyTasksPage() {
  const [selectedListItem, setSelectedListItem] = useState(0);

  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Function to get the next reset date
  const getNextResetDate = () => {
    const currentDate = new Date();
    // Get the first day of next month
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    // Format the date to match the desired format
    return nextMonth.toUTCString().replace('00:00:00', '00:00:02');
  };

  const ResetDate = ['Nov 01, 2024 00:00:02'];

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
            title="Total tasks you can allot to other Pabbly Connect accounts."
            arrow
            placement="top"
            disableInteractive
          >
            <div>
              <StatsCards
                cardtitle="Agency Tasks Available"
                cardstats="100,000"
                icon_name="task_alloted.png"
                icon_color="#FFA92E"
                bg_gradient="#FFA92E"
              />
            </div>
          </Tooltip>

          {/* Tasks Consumed) */}
          <Tooltip
            title="Total tasks you have already allotted to other Pabbly Connect accounts."
            arrow
            placement="top"
          >
            <div>
              <StatsCards
                cardtitle="Agency Tasks Assigned"
                cardstats="30,000"
                icon_name="task_consumed.png"
                icon_color="#1D88FA"
                bg_gradient="#1D88FA"
              />
            </div>
          </Tooltip>

          <Tooltip
            title="Remaining tasks that you can allot to other Pabbly Connect accounts."
            arrow
            placement="top"
          >
            <div>
              <StatsCards
                cardtitle="Remaining Agency Tasks"
                cardstats="70,000"
                icon_name="task_remaining.png"
                icon_color="#22C55E"
                bg_gradient="#22C55E"
              />
            </div>
          </Tooltip>

          {/* Free Task Consumed */}
          <Tooltip
            title="Total number of Pabbly Connect accounts to which agency tasks has been assigned."
            arrow
            placement="top"
          >
            <div>
              <StatsCards
                cardtitle="Number of Assigned Accounts"
                cardstats="3"
                icon_name="byyou.png"
                icon_color="#10CBF3"
                bg_gradient="#10CBF3"
              />
            </div>
          </Tooltip>
        </Box>
        <Grid xs={12} md={8}>
          <NewUserAgencyTasksBigCard />
          <NewUserAgencyTable />
          <AgencyTasksBigCard />
        </Grid>
        {/* 
        <Alert
          sx={{
            mt: 4,
            mb: 4,
            color: 'success',
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
          }}
          severity="warning"
        >
          Your tasks were reset on {getNextResetDate()} .{' '}
          <Link
            href="#"
            className="font-medium underline underline-offset-4"
            style={{ color: '#078DEE' }}
          >
            Learn more
          </Link>
        </Alert> */}

        <Alert
          sx={{
            mt: 4,
            mb: 4,
            color: 'success',
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
          }}
          severity="warning"
        >
          Your tasks were reset on {ResetDate} (GMT).{' '}
          <Link
            href="#"
            className="font-medium underline underline-offset-4"
            style={{ color: '#078DEE' }}
          >
            Learn more
          </Link>
        </Alert>

        <AgencyTable />
        <AgencyAccountTable />
      </Box>
    </Box>
  );
}
