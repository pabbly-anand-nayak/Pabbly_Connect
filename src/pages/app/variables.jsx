import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Grid, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import VariablesBigCard from 'src/sections/settings/components/page-variables/big-card/big-card';
import VariablesTable from 'src/sections/settings/components/page-variables/table_variables/variables-table';
import SystemVariablesTable from 'src/sections/settings/components/page-variables/table_system-variables/system-variables-table';

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
          title="Variables"
          Subheading="Create custom variables that can be used to store and manipulate data within your workflows."
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
            <Tooltip
              title="Total variables include custom variables and system variables."
              arrow
              placement="top"
              disableInteractive
            >
              <div>
                <StatsCards
                  cardtitle="Total Variables"
                  cardstats="20"
                  icon_name="total_variable.png"
                  icon_color="#FFA92E"
                  bg_gradient="#FFA92E"
                />
              </div>
            </Tooltip>
            {/* Tasks Consumed) */}
            <Tooltip title="Total number of custom variables." arrow placement="top">
              <div>
                <StatsCards
                  cardtitle="Total Custom Variables"
                  cardstats="22"
                  icon_name="custom_variable.png"
                  icon_color="#1D88FA"
                  bg_gradient="#1D88FA"
                />
              </div>
            </Tooltip>

            {/* Free Task Consumed */}
            <Tooltip title="Total number of system variables." arrow placement="top">
              <div>
                <StatsCards
                  cardtitle="Total System Variables"
                  cardstats="20"
                  icon_name="system_variable.png"
                  icon_color="#10CBF3"
                  bg_gradient="#10CBF3"
                />
              </div>
            </Tooltip>
          </Box>
          <Grid xs={12} md={8}>
            <VariablesBigCard />
          </Grid>

          <VariablesTable />
          <SystemVariablesTable />
        </Box>
      </Box>
    </DashboardContent>
  );
}
