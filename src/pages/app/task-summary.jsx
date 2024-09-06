import { useState } from 'react';
import { useTheme } from '@emotion/react';

import { Box, Grid, Button, Tooltip, useMediaQuery } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import SummaryBigCard from 'src/sections/settings/page-task-summary/big-card/big-card';
import { AddSubaccount } from 'src/sections/settings/page-task-summary/hook/add-subaccount';
import TaskSummaryTable from 'src/sections/settings/page-task-summary/Table-task-summary/table'; // Import the dialog

export default function Page() {
  const [selectedListItem, setSelectedListItem] = useState(0);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 0,
        }}
      >
        <PageHeader
          title="Task Summary"
          Subheading="View all of your task summaries. Any action being performed in your workflow is considered a task. Triggers are not calculated as tasks, and internal applications of Pabbly Connect, such as the filter, router, and formatter, are also not counted as tasks. Note that the task summary is only available for the last 30 days."
        />
   
        <Tooltip title="Click here to add a sub-account." arrow placement="top">
          <Button
            onClick={handleDialogOpen} // Open dialog on button click
            sx={{
              mt: { xs: 2, sm: 0 },
              width: { xs: '100%', sm: 'flex' },
              maxWidth: '180px',
            }}
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
            size="large"
            variant="contained"
            color="primary"
          >
            Add Sub-account
          </Button>
        </Tooltip>
      </Box>
      
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
              mt: '40px',
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
             <Tooltip title="Number of tasks allotted to your account." arrow placement="top" disableInteractive>
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
            <Tooltip title="Number of tasks consumed in the last 30 days. We do not count trigger steps and internal application steps in your task consumption. We only count tasks when a action is done in an external software. For Example: Add a new row inside Google Sheets." arrow placement="top">
            <div>
            <StatsCards
              cardtitle="Task Consumed"
              cardstats="2,400"
              icon_name="task_consumed.png"
              icon_color="#1D88FA"
              bg_gradient="#1D88FA"
            />
             </div>
             </Tooltip>

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
            <Tooltip title="Pabbly Connect does not charge tasks for triggers and internal application steps. You're saving 50% on task usage by using Pabbly Connect." arrow placement="top">
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

          <Grid xs={12} md={8}>
            <SummaryBigCard />
          </Grid>
          <TaskSummaryTable />
        </Box>
      </Box>

      {/* Dialog Component */}
      <AddSubaccount
        open={openDialog}
        onClose={handleDialogClose}
        title="Add Sub-account"
        content="Content goes here"
        action="Create"
      />
    </DashboardContent>
  );
}
