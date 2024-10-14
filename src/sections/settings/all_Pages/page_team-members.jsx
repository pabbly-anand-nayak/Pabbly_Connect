import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Grid, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';

import StatsCards from 'src/components/stats-card/stats-card';

import TeamMembersBigCard from 'src/sections/team-member/components/big-card/team-members-big-card';
import SharedbyYouTeamMemberTable from 'src/sections/team-member/components/shared-by-you-table/team-member-table';
import SharedWithYouTeamMemberTable from 'src/sections/team-member/components/shared-with-you-table/team-member-table';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function TeamMembersPage() {
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
          {/* Cards Section */}
          <Tooltip title="Team members added by you." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Unique Team Members Added"
                cardstats="2"
                icon_name="unique.png"
                icon_color="#1A76FF"
                bg_gradient="#1A76FF"
              />
            </div>
          </Tooltip>
          <Tooltip
            title="Workflow(s) or folder(s) shared by you with team members."
            arrow
            placement="top"
          >
            <div>
              <StatsCards
                cardtitle="Workflows or Folders Shared by You"
                cardstats="2"
                icon_name="byyou.png"
                icon_color="#009C53"
                bg_gradient="#009C53"
              />
            </div>
          </Tooltip>

          <Tooltip
            title="Workflow(s) or folder(s) shared with you by admins."
            arrow
            placement="top"
          >
            <div>
              <StatsCards
                cardtitle="Workflows or Folders Shared With You"
                cardstats="10,000"
                icon_name="sharedwithyou.png"
                icon_color="#009CBB"
                bg_gradient="#009CBB"
              />
            </div>
          </Tooltip>
        </Box>
        <Grid xs={12} md={8}>
          <TeamMembersBigCard />
        </Grid>
        <SharedbyYouTeamMemberTable />
        <SharedWithYouTeamMemberTable />{' '}
      </Box>
    </Box>
  );
}
