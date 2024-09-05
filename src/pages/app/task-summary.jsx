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
            <StatsCards cardtitle="Task Allotted" cardstats="10,000" />
            <StatsCards cardtitle="Task Consumed" cardstats="2,400" />
            <StatsCards cardtitle="Tasks Remaining" cardstats="8,000" />
            <StatsCards cardtitle="Free Task Consumed" cardstats="1,100" />
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
