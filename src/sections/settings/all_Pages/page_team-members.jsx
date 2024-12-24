import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Grid, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';

import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';

import { TeamMemberDialog } from '../components/page_team-members/hooks/add-team-member';
import SharedbyYouTeamMemberTable from '../components/page_team-members/components/shared-by-you-table/team-member-table';
import SharedWithYouTeamMemberTable from '../components/page_team-members/components/shared-with-you-table/shared-with-you-table';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function TeamMembersPage() {
  const [selectedListItem, setSelectedListItem] = useState(0);

  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Custom handler to open dialog
  const [isTeamMemberDialogOpen, setDialogOpen] = useState(false);

  const handleConfigureTeamMember = () => {
    setDialogOpen(true);
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
            mb: 4,

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
                cardstats="20"
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
                cardstats="10"
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
                cardstats="1,000"
                icon_name="sharedwithyou.png"
                icon_color="#009CBB"
                bg_gradient="#009CBB"
              />
            </div>
          </Tooltip>
        </Box>
        <Grid xs={12} md={8}>
          <BigCard
            title="Points To Remember!"
            secondarytitle=""
            steps={[
              'Add Team Members: You can add multiple team members and share workflows and folders with them.',
              'Workflow Creation: Team members can create new workflows in your account but cannot create folders.',
              'Access to Shared Items: Team members will only have access to shared workflows and folders.',
              'Folder Access: They can access all workflows inside shared folders but cannot move workflows between folders.',
              'No Deletion Rights: Team members cannot delete any shared workflows or folders in your account.',
              'Task History: They can view task history related to shared workflows and folders.',
              'App Connections: Team members can add new app connections but cannot edit or delete existing ones.',
              <>
                Account Restrictions: They cannot access billing information or details related to
                sub-accounts.{' '}
              </>,
            ]}
            learnMoreLink="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220"
            videoThumbnail="team_member.png"
            videoId="https://www.youtube.com/embed/VzQss19hRgA"
            buttonText="Add Team Member"
            buttonTooltip="Click here to add team member."
            onButtonClick={handleConfigureTeamMember}
            buttonIcon="heroicons:plus-circle-16-solid"
          />

          {/* Separate Dialog */}
          <TeamMemberDialog open={isTeamMemberDialogOpen} onClose={() => setDialogOpen(false)} />
        </Grid>
        <SharedbyYouTeamMemberTable />
        <SharedWithYouTeamMemberTable />
      </Box>
    </Box>
  );
}
