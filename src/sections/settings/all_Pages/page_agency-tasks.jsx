import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Grid, Tooltip, useMediaQuery } from '@mui/material';

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
            title="Number of agency tasks allotted to your account."
            arrow
            placement="top"
            disableInteractive
          >
            <div>
              <StatsCards
                cardtitle="Agency Task Allotted"
                cardstats="100,000"
                icon_name="task_alloted.png"
                icon_color="#FFA92E"
                bg_gradient="#FFA92E"
              />
            </div>
          </Tooltip>

          {/* Tasks Consumed) */}
          <Tooltip title="Number of agency task assigned." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Agency Task Assigned"
                cardstats="30,000"
                icon_name="task_consumed.png"
                icon_color="#1D88FA"
                bg_gradient="#1D88FA"
              />
            </div>
          </Tooltip>

          <Tooltip title="Number of tasks remaining in your account." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Agency Task Remaining"
                cardstats="70,000"
                icon_name="task_remaining.png"
                icon_color="#22C55E"
                bg_gradient="#22C55E"
              />
            </div>
          </Tooltip>

          {/* Free Task Consumed */}
          <Tooltip title="Number of sub accounts" arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Number of Sub Accounts"
                cardstats="5"
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

        <AgencyTable />
        <AgencyAccountTable />
      </Box>
    </Box>
  );
}
