import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Grid, Tooltip, useMediaQuery } from '@mui/material';

import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';

import ConnectionsTable from '../components/page-connections/table_connections/connections-table';
import { NewAppDrawer } from '../components/page-connections/hook/connections-new-app-drawer/connections-new-app-drawer';

// ----------------------------------------------------------------------

export default function ConnectionsPage() {
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

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Box
      sx={{
        gap: 3,
        mb: 16,
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
          {/* <Connections Points To Remember! video card /> */}
          <BigCard
            sx={{ mt: 4 }}
            title="Points To Remember!"
            secondarytitle=""
            steps={[
              'Manage Connections: View and manage all your connections. Click a connection to see its associated workflows.',
              'Tasks Consumed: Changes to a connection automatically update all linked workflows for seamless integration.',
              <>
                Free Tasks Consumed: Quickly see stats like total connections, unique applications,
                and workflows at the top of the page.{' '}
              </>,
            ]}
            learnMoreLink="https://www.pabbly.com/privacy-policy/#data-policy"
            videoThumbnail="Connections Thumbnail.png"
            videoId="https://www.youtube.com/embed/VHBDWR2YVrY"
            buttonText="Add Connection"
            buttonTooltip="Click here to add a new app connection."
            onButtonClick={handleOpenDrawer}
            buttonIcon="heroicons:plus-circle-16-solid"
          />

          <NewAppDrawer open={openDrawer} onClose={handleCloseDrawer} />
        </Grid>
        <ConnectionsTable />
      </Box>
    </Box>
  );
}
