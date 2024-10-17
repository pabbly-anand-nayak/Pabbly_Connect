import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Grid, Alert, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';

import StatsCards from 'src/components/stats-card/stats-card';

import AgencyTable from '../components/page-agency-tasks/hook/table_agency 1/agency-table';
import AgencyTasksBigCard from '../components/page-agency-tasks/big-card/agency-tasks-big-card';
import AgencyAccountTable from '../components/page-agency-tasks/hook/table_agency_account/agency-account-table';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function AgencyTasksPage() {
  const [selectedListItem, setSelectedListItem] = useState(0);
  // const listItemsData = [
  //   {
  //     name: 'Pabbly Connect List',
  //     totalContacts: 54,
  //     optedInContacts: 30,
  //     optedOutContacts: 24,
  //   },
  //   {
  //     name: 'Pabbly Subscription Billing List',
  //     totalContacts: 23,
  //     optedInContacts: 15,
  //     optedOutContacts: 8,
  //   },
  //   {
  //     name: 'Pabbly Form Builder List',
  //     totalContacts: 54,
  //     optedInContacts: 40,
  //     optedOutContacts: 14,
  //   },
  // ];
  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  // const currentData = listItemsData[selectedListItem];
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
          <AgencyTasksBigCard />
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
          Your tasks were reset on Nov 01, 2024 00:00:02 (GMT).{' '}
          <Link href="#" className="font-medium underline underline-offset-4">
            Learn more
          </Link>
        </Alert>

        <AgencyTable />
        <AgencyAccountTable />
      </Box>
    </Box>
  );
}
