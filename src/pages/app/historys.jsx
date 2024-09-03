// import { useState } from 'react';
// import { useTheme } from '@emotion/react';
// import { useNavigate } from 'react-router';
// import TaskHistoryTable from 'src/sections/contacts/components/Table Task History/table';

// import { Box, Tooltip, useMediaQuery } from '@mui/material';

// import { CONFIG } from 'src/config-global';
// import { DashboardContent } from 'src/layouts/dashboard';

// import StatsCards from 'src/components/stats-card/stats-card';
// import PageHeader from 'src/components/page-header/page-header';

// import ContactList from 'src/sections/contacts/contact-list';
// import BigCard from 'src/sections/contacts/components/big-card/big-card';
// import ContactsTable from 'src/sections/contacts/components/table/table';

// // import { BlankView } from 'src/sections/blank/view';

// // ----------------------------------------------------------------------

// const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

// export default function Page() {
// ;
 

 
//   const theme = useTheme();

//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();

  
//   return (
//     <DashboardContent maxWidth="xl">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           alignItems: isMobile ? 'flex-start' : 'center',
//           justifyContent: 'space-between',
//           mb: 0,
//         }}
//       >
//         <PageHeader
//           title="Task History"
//           Subheading="View all of your task history. Any action performed in your workflow is considered a task. Triggers are not included in the task count, and internal applications of Pabbly Connect, such as filters, routers, and formatters, are also not considered tasks. Please note that the task history is only available for the last 15 days."
//           link_added="#"
//         />
//         {/* <Tooltip title="Click here to add contact." arrow placement="top">

//         <Button
//           onClick={handleAddContact}
//           sx={{ mt: isMobile ? 2 : 0 }}
//           startIcon={
//             <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
//           }
//           size="large"
//           variant="contained"
//           color="primary"
//         >
//           Add Contact
//         </Button>
//         </Tooltip> */}

//       </Box>
//         <TaskHistoryTable/>
      
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

import BigCard from 'src/sections/contacts/components/big-card/big-card';
import TaskHistoryTable from 'src/sections/contacts/Table Task History/table';

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
        title="Task History" Subheading="View all of your task history. Any action performed in your workflow is considered a task. Triggers are not included in the task count, and internal applications of Pabbly Connect, such as filters, routers, and formatters, are also not considered tasks. Please note that the task history is only available for the last 15 days."
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
              cardstats="3,500"
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
              cardstats="2,400"
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
              cardstats="1,100"
              icon_name="task_free.png"
              icon_color="#10CBF3"
              bg_gradient="#10CBF3"
            />
            </div>
            </Tooltip>
          </Box>
          <BigCard />
          {/* <TaskHistoryTable/> */}
          {/* <ContactsTable /> */}
          <TaskHistoryTable/>
        </Box>
      </Box>
    </DashboardContent>
  );
}