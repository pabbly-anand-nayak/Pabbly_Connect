import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { Box, Alert, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';

import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

import AgencyAccountTable from '../components/page-task-summary/table_agency_account/agency-table';
import SubAccountsTable from '../components/page-task-summary/table_sub-accounts/subaccounts-table';
import { AddUpdateSubAccountDialog } from '../components/page-task-summary/hook/add-update-subaccount-dialog';

// ----------------------------------------------------------------------

const metadata = { title: `Task Summary | ${CONFIG.site.name}` };

export default function TaskSummaryPage() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const ResetDate = ['Jan 01, 2025 00:00:02'];

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  // -----------------------------------------

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          mt: '0',
        }}
      >
        <Box sx={{ width: '100%' }}>
          {/* Cards Section */}
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
                  cardstats="2,000"
                  icon_name="task_consumed.png"
                  icon_color="#1D88FA"
                  bg_gradient="#1D88FA"
                />
              </div>
            </Tooltip>

            {/* Tasks Remaining */}
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

          {/* <Task Summary Points To Remember! video card /> */}
          <BigCard
            sx={{ mt: 4 }}
            title="Points To Remember!"
            secondarytitle=""
            steps={[
              'Complete Task Overview: View all task summaries from your workflows.',
              'Action-based Tracking: Any action performed in your workflow is counted as a task.',
              'Exclusion of Triggers: Triggers are not included in the task count.',
              'Internal App Exclusions: Internal Pabbly Connect apps (filter, router, formatter) are not considered tasks.',
              '30-Day Availability: Task summaries are only available for the last 30 days.',
              <>
                Workflow Efficiency: Monitor free tasks used to maximize your credits and reduce
                costs.{' '}
              </>,
            ]}
            learnMoreLink="https://forum.pabbly.com/threads/pabbly-connect-task-reset-policy-when-does-my-task-count-reset.17614/"
            videoThumbnail="Task Summary Thumbnail.png"
            videoId="https://www.youtube.com/embed/YxK95UMwTD8"
            buttonText="Add Sub-account"
            buttonTooltip="Click here to add a new sub-account."
            onButtonClick={handleAddDialogOpen}
            buttonIcon="heroicons:plus-circle-16-solid"
          />

          {/* Add Subaccount Dialog component */}
          <AddUpdateSubAccountDialog
            open={isAddDialogOpen}
            onClose={handleAddDialogClose}
            title="Add Sub-account"
            actionLabel="Assign Task Now"
            isUpdate={false}
          />

          {/* Your tasks were reset on */}
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
            <LearnMoreLink link="https://forum.pabbly.com/threads/pabbly-connect-task-reset-policy-when-does-my-task-count-reset.17614/" />
          </Alert>
          <SubAccountsTable />
          <AgencyAccountTable />
        </Box>
      </Box>
    </>
  );
}
