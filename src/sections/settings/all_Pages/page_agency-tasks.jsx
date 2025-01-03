import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { Box, Grid, Alert, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';

import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';

import { AssignTasksDialog } from '../components/page-agency-tasks/hook/add-assign-tasks';
import AgencyTable from '../components/page-agency-tasks/table_agency_task_overview/agency-table';
import NewUserAgencyTable from '../components/page-agency-tasks/newuser-table_agency/newuser-agency-table';
import AgencyAccountTable from '../components/page-agency-tasks/table_ agency_task_details_account/agency-account-table';

// ----------------------------------------------------------------------

const metadata = {
  title: `Agency Tasks
 | ${CONFIG.site.name}`,
};

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

  // Custom handler to open dialog
  const [isAssignTasksDialogOpen, setDialogOpen] = useState(false);

  const handleConfigureAssignTasks = () => {
    setDialogOpen(true);
  };

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
        {/* Cards Section */}
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              mb: 4,

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
            {/* <NewUserAgencyTasksBigCard /> */}
            <BigCard
              sx={{ mt: 4 }}
              title="You don't have access to Agency Tasks Feature."
              secondarytitle=""
              steps={[
                'Assign tasks to other Pabbly accounts seamlessly.',
                'Assign tasks to an unlimited number of Pabbly accounts.',
                'Remove assigned tasks from any account at any time.',

                <>Access detailed task assignment logs for effective monitoring. </>,
              ]}
              learnMoreLink=""
              videoThumbnail="14. What is Pabbly Connect's Agency Feature_.png"
              videoId="https://www.youtube.com/embed/W_mw1bd9KO4"
              buttonText="Buy Now"
              buttonTooltip="Buy agency tasks plan to assign agency tasks to other Pabbly Connect accounts."
              onButtonClick={() => window.open('https://www.pabbly.com/connect/agency/', '_blank')}
              buttonIcon="fluent:cart-24-filled" // Changed to a link icon
            />
            <NewUserAgencyTable />
            {/* <AgencyTasksBigCard /> */}
            <BigCard
              sx={{ mt: 4 }}
              title="Points To Remember!"
              secondarytitle=""
              steps={[
                'Assign tasks to other Pabbly accounts seamlessly.',
                'Assign tasks to an unlimited number of Pabbly accounts.',
                'Remove assigned tasks from any account at any time.',
                'Access detailed task assignment logs for effective monitoring.',
                'You can assign a minimum of 10,000 tasks to each account.',
                'Assigned tasks automatically renew on the 1st of each month.',

                <>
                  Revoked agency tasks will be added back to your account on the 1st of next month.
                </>,
              ]}
              learnMoreLink=""
              videoThumbnail="14. What is Pabbly Connect's Agency Feature_.png"
              videoId="https://www.youtube.com/embed/W_mw1bd9KO4"
              buttonText="Assign Tasks"
              buttonTooltip="Assign agency tasks to another Pabbly Connect account."
              onButtonClick={handleConfigureAssignTasks}
              buttonIcon="heroicons:plus-circle-16-solid" // Changed to a link icon
            />
          </Grid>
          {/* Separate Dialog */}
          <AssignTasksDialog open={isAssignTasksDialogOpen} onClose={() => setDialogOpen(false)} />

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
    </>
  );
}
