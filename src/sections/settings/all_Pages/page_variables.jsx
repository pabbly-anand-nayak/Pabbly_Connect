import { useState } from 'react';
import { useTheme } from '@emotion/react';

import { Box, Grid, Tooltip, useMediaQuery } from '@mui/material';

import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

import VariablesTable from '../components/page-variables/table_custom-variables/variables-table';
import { AddUpdateVariablesDialog } from '../components/page-variables/hook/add-update-variables-dailog';
import SystemVariablesTable from '../components/page-variables/table_system-variables/system-variables-table';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export default function VariablesPage() {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleOpenAddDialog = () => setAddDialogOpen(true);
  const handleCloseAddDialog = () => setAddDialogOpen(false);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          <Tooltip
            title="Total variables include custom variables and system variables."
            arrow
            placement="top"
            disableInteractive
          >
            <div>
              <StatsCards
                cardtitle="Total Variables"
                cardstats="30"
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
                cardstats="10"
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
          {/* <Variables Points To Remember! video card /> */}
          <BigCard
            sx={{ mt: 4 }}
            title="Points To Remember!"
            secondarytitle=""
            steps={[
              'Custom variables are beneficial when you need to insert identical data into multiple workflows.',
              'Multiple custom variables can be created at the global account level scope.',
              'You can modify variable data for custom variables from within your workflows.',
              'Custom variables are applicable across all workflows in your Pabbly Connect account.',
              'Custom variables are usable within any action step in the assigned workflows.',
              'To utilize custom variables, click the copy button located behind the custom variable name.',
              <>
                System variables are available in every account, and their values cannot be altered.{' '}
                <LearnMoreLink link="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/" />
              </>,
              'Adding a team member grants them permission to create, update, fetch, or delete your custom variables using Pabbly Connect Manager.',
            ]}
            learnMoreLink=""
            videoThumbnail="Variables Thumbnail.png"
            videoId="https://www.youtube.com/embed/qLjI9klSSmI"
            buttonText="Add Variable"
            buttonTooltip="Click here to add a custom variable."
            onButtonClick={handleOpenAddDialog}
            buttonIcon="heroicons:plus-circle-16-solid"
          />
          {/* Separate Dialog */}
          <AddUpdateVariablesDialog
            open={isAddDialogOpen}
            onClose={handleCloseAddDialog}
            title="Add Custom Variable"
            mode="add"
            onSave={({ variableName, variableData }) => {
              console.log('Variable Added:', { variableName, variableData });
            }}
          />
        </Grid>

        <VariablesTable />
        <SystemVariablesTable />
      </Box>
    </Box>
  );
}
