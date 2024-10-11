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

// ----------------------------------------------------

// import { useState } from 'react';
// import { useTheme } from '@emotion/react';
// import { useNavigate } from 'react-router';

// import { Box, Tab, Tabs, Tooltip, useMediaQuery } from '@mui/material';

// import { useTabs } from 'src/hooks/use-tabs';

// import { CONFIG } from 'src/config-global';
// import { DashboardContent } from 'src/layouts/dashboard';

// import { Iconify } from 'src/components/iconify';
// import StatsCards from 'src/components/stats-card/stats-card';
// import PageHeader from 'src/components/page-header/page-header';

// import TaskHistoryTableNew from 'src/sections/history/Table-Task-History/table';
// import HistoryBigCard from 'src/sections/history/components/historybigcard/big-card';
// import TaskUsagePage from 'src/sections/history/task-usage_page';
// import TaskHistorysPage from 'src/sections/history/task-historys_page';

// // import { BlankView } from 'src/sections/blank/view';

// // ----------------------------------------------------------------------

// const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

// export default function Page() {
//   const [selectedListItem, setSelectedListItem] = useState(0);
//   const listItemsData = [
//     {
//       name: 'Pabbly Connect List',
//       totalContacts: 54,
//       optedInContacts: 30,
//       optedOutContacts: 24,
//     },
//     {
//       name: 'Pabbly Subscription Billing List',
//       totalContacts: 23,
//       optedInContacts: 15,
//       optedOutContacts: 8,
//     },
//     {
//       name: 'Pabbly Form Builder List',
//       totalContacts: 54,
//       optedInContacts: 40,
//       optedOutContacts: 14,
//     },
//   ];
//   const handleListItemSelect = (index) => {
//     setSelectedListItem(index);
//   };
//   const basicTabs = useTabs('one');

//   const TABS = [
//     {
//       value: 'one',
//       icon: <Iconify icon="mdi:clipboard-text-history" width={24} />,
//       label: 'Task History',
//       form: <TaskHistorysPage />, // Correct component for first tab
//     },
//     {
//       value: 'two',
//       icon: <Iconify icon="fluent:tasks-app-24-filled" width={24} />,
//       label: 'Task Usage by Workflows',
//       form: <TaskUsagePage />,
//       // Ensure component is imported and used
//     },
//   ];

//   const currentData = listItemsData[selectedListItem];
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
//         <Tooltip title="Click here to add contact." arrow placement="top">
//           {/* <Button
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
//         </Button> */}
//         </Tooltip>
//       </Box>

//       {/* Tabs */}
//       <Tabs value={basicTabs.value} onChange={basicTabs.onChange} sx={{ mt: 3 }}>
//         {TABS.map((tab) => (
//           <Tab key={tab.value} icon={tab.icon} label={tab.label} value={tab.value} />
//         ))}
//       </Tabs>

//       <Box sx={{ mt: 3 }}>{TABS.find((tab) => tab.value === basicTabs.value)?.form}</Box>

//       <Box
//         sx={{
//           gap: 3,
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           alignItems: isMobile ? 'flex-start' : 'flex-start',
//           // justifyContent: 'space-between',
//           mt: 3,
//         }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <Box
//             sx={{
//               mt: 0,

//               gap: 3,
//               display: 'grid',
//               gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
//             }}
//           >
//             {/* Workflow Executed */}
//             <Tooltip
//               title="Number of times the complete workflow executed in the last 30 days."
//               arrow
//               placement="top"
//               disableInteractive
//             >
//               <div>
//                 <StatsCards
//                   cardtitle="Workflow Executed"
//                   cardstats="3,500"
//                   icon_name="task_alloted.png"
//                   icon_color="#FFA92E"
//                   bg_gradient="#FFA92E"
//                 />
//               </div>
//             </Tooltip>
//             {/* Tasks Consumed) */}
//             <Tooltip
//               title="Number of tasks consumed in the last 30 days. We do not count trigger steps and internal application steps in your task consumption. We only count tasks when a action is done in an external software. For Example: Add a new row inside Google Sheets."
//               arrow
//               placement="top"
//             >
//               <div>
//                 <StatsCards
//                   cardtitle="Tasks Consumed"
//                   cardstats="2,400"
//                   icon_name="task_consumed.png"
//                   icon_color="#1D88FA"
//                   bg_gradient="#1D88FA"
//                 />
//               </div>
//             </Tooltip>

//             {/* Free Task Consumed */}
//             <Tooltip
//               title="Number of free tasks consumed in the last 30 days."
//               arrow
//               placement="top"
//             >
//               <div>
//                 <StatsCards
//                   cardtitle="Free Task Consumed"
//                   cardstats="1,100"
//                   icon_name="task_free.png"
//                   icon_color="#10CBF3"
//                   bg_gradient="#10CBF3"
//                 />
//               </div>
//             </Tooltip>
//           </Box>
//           <HistoryBigCard />
//           <TaskHistoryTableNew />
//           {/* <ConnectedTable /> */}

//           {/* <ContactsTable /> */}
//         </Box>
//       </Box>
//     </DashboardContent>
//   );
// }

import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Tab, Tabs, Tooltip, useMediaQuery } from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import TaskUsagePage from 'src/sections/history/task-usage_page';
import TaskHistorysPage from 'src/sections/history/task-historys_page';

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
  const basicTabs = useTabs('one');

  const TABS = [
    {
      value: 'one',
      icon: <Iconify icon="mdi:clipboard-text-history" width={24} />,
      label: 'Task History',
      form: <TaskHistorysPage />, // Correct component for first tab
    },
    {
      value: 'two',
      icon: <Iconify icon="fluent:tasks-app-24-filled" width={24} />,
      label: 'Task Usage by Workflows',
      form: <TaskUsagePage />,
      // Ensure component is imported and used
    },
  ];

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
        {/* Conditionally render PageHeader based on the selected tab */}
        {basicTabs.value === 'one' && (
          <PageHeader
            title="Task History"
            Subheading="View all of your task history. Any action performed in your workflow is considered a task. Triggers are not included in the task count, and internal applications of Pabbly Connect, such as filters, routers, and formatters, are also not considered tasks. Please note that the task history is only available for the last 15 days."
            link_added="#"
          />
        )}
        {basicTabs.value === 'two' && (
          <div style={{ minHeight: '92px', boxSizing: 'border-box' }}>
            <PageHeader
              title="Task Usage by Workflows"
              Subheading="This section displays the task usage categorized by workflows. Use this data to track and manage your workflow efficiency and task consumption over time."
              link_added="#"
            />
          </div>
        )}
      </Box>

      {/* Tabs */}
      {/* <Box
        sx={{
          boxShadow: (theme1) =>
            `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
        }}
      > */}
      {/* <Tabs value={basicTabs.value} onChange={basicTabs.onChange} sx={{ mt: 3 }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} icon={tab.icon} label={tab.label} value={tab.value} />
        ))}
      </Tabs> */}

      <Tabs
        value={basicTabs.value}
        onChange={basicTabs.onChange}
        sx={{
          mt: 1,
          position: 'sticky',
          top: '64px', // Adjust this value based on header height
          zIndex: 10,
          backgroundColor: '#f1f7fb',
          paddingTop: '16px',
        }}
      >
        {TABS.map((tab) => (
          <Tooltip
            key={tab.value}
            title={
              tab.value === 'one'
                ? 'You can view task executions for all workflows.'
                : 'You can view which workflows are consuming the highest and lowest number of tasks.'
            }
            arrow
          >
            <Tab icon={tab.icon} label={tab.label} value={tab.value} />
          </Tooltip>
        ))}
      </Tabs>

      {/* </Box> */}

      <Box sx={{ mt: 4 }}>{TABS.find((tab) => tab.value === basicTabs.value)?.form}</Box>
    </DashboardContent>
  );
}
