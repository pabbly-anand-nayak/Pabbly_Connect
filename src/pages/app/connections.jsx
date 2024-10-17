import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Grid, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import ConnectionsBigCard from 'src/sections/settings/components/page-connections/big-card/connections-big-card';
import ConnectionsTable from 'src/sections/settings/components/page-connections/table_connections/connections-table';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
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
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="Connections"
          Subheading="You can view and manage all connections created below. Click on the connection name to check the connected workflows to that specific connection. In case of updating any connection, it will be automatically updated in all connected workflows."
          link_added="#"
        />
      </Box>
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          // justifyContent: 'space-between',
          mt: '40px',
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
            <Tooltip title="Total number of connections." arrow placement="top" disableInteractive>
              <div>
                <StatsCards
                  cardtitle="Total Connections"
                  cardstats="20"
                  icon_name="total_connections.png"
                  icon_color="#FFA92E"
                  bg_gradient="#FFA92E"
                />
              </div>
            </Tooltip>
            {/* Tasks Consumed) */}
            <Tooltip
              title="Total number of unique applications that are connected."
              arrow
              placement="top"
            >
              <div>
                <StatsCards
                  cardtitle="Unique Connected Applications"
                  cardstats="450"
                  icon_name="unique_connection.png"
                  icon_color="#1D88FA"
                  bg_gradient="#1D88FA"
                />
              </div>
            </Tooltip>

            {/* Free Task Consumed */}
            <Tooltip
              title="Total number of workflows that are connected to the connections."
              arrow
              placement="top"
            >
              <div>
                <StatsCards
                  cardtitle="Total Connected Workflows"
                  cardstats="1,100"
                  icon_name="total_connected_workflow.png"
                  icon_color="#10CBF3"
                  bg_gradient="#10CBF3"
                />
              </div>
            </Tooltip>
          </Box>
          <Grid xs={12} md={8}>
            <ConnectionsBigCard />
          </Grid>
          <ConnectionsTable />
        </Box>
      </Box>
    </DashboardContent>
  );
}
