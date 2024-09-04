



// import { DashboardContent } from 'src/layouts/dashboard';

// import PageHeader from 'src/components/page-header/page-header';

// import TaskUsageTable from './Table Task Usage/table';


// export default function AddContact() {



//   return (
//     <DashboardContent maxWidth="xl">
//       <PageHeader title="Task Usage by Workflows" Subheading="You can view which workflows are consuming the highest and lowest number of tasks. Any action performed in your workflow is considered a task. Triggers are not included in the task count, and internal applications of Pabbly Connect, such as filters, routers, and formatters, are also not considered tasks." link_added="#" />
   

//       {/* <TaskUsageTable/> */}
      
//       <TaskUsageTable/>
      
//     </DashboardContent>
//   );
// }
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import BigCard from 'src/sections/history/components/big-card/big-card';

import TaskUsageTable from './Table Task Usage/table';

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
        title="Task Usage by Workflows" 
        Subheading="You can view which workflows are consuming the highest and lowest number of tasks. Any action performed in your workflow is considered a task. Triggers are not included in the task count, and internal applications of Pabbly Connect, such as filters, routers, and formatters, are also not considered tasks."
          link_added="#"
        />
        <Tooltip title="Click here to add contact." arrow placement="top">

        {/* <Button
          onClick={handleAddContact}
          sx={{ mt: isMobile ? 2 : 0 }}
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          color="primary"
        >
          Add Contact
        </Button> */}
        </Tooltip>

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
            <Tooltip title="Number of times the complete workflow executed in the last 30 days." arrow placement="top" disableInteractive>
            <div>
            <StatsCards
              cardtitle="Workflow Executed"
              cardstats="5,000"
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
              cardtitle="Tasks Consumed"
              cardstats="1,900"
              icon_name="task_consumed.png"
              icon_color="#1D88FA"
              bg_gradient="#1D88FA"
            />
             </div>
             </Tooltip>

            {/* Free Task Consumed */}
            <Tooltip title="Number of free tasks consumed in the last 30 days." arrow placement="top">
            <div>
            <StatsCards
              cardtitle="Free Task Consumed"
              cardstats="1,200"
              icon_name="task_free.png"
              icon_color="#10CBF3"
              bg_gradient="#10CBF3"
            />
            </div>
            </Tooltip>
          </Box>
          <BigCard />
          <TaskUsageTable/>
        </Box>
      </Box>
    </DashboardContent>
  );
}
