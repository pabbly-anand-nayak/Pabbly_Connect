import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Tab, Tabs, Tooltip, useMediaQuery } from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import TaskHistoryPage from 'src/sections/history/task-history/task-history-page'; 
import TaskUsagePage from 'src/sections/history/task-usage-by-workflows/task-usage-page'; 

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

  // const TABS = [
  //   {
  //     value: 'one',
  //     icon: <Iconify icon="mdi:clipboard-text-history" width={24} />,
  //     label: 'Task History',
  //     form: <TaskHistorysPage />, // Correct component for first tab
  //   },
  //   {
  //     value: 'two',
  //     icon: <Iconify icon="fluent:tasks-app-24-filled" width={24} />,
  //     label: 'Task Usage by Workflows',
  //     form: <TaskUsagePage />,
  //     // Ensure component is imported and used
  //   },
  // ];

  const TABS = [
    {
      value: 'one',
      icon: <Iconify icon="mdi:clipboard-text-history" width={24} />,
      label: 'Task History',
      tooltip: 'You can view task executions for all workflows.',
      form: <TaskHistoryPage />, // Correct component for first tab
    },
    {
      value: 'two',
      icon: <Iconify icon="fluent:tasks-app-24-filled" width={24} />,
      label: 'Task Usage by Workflows',
      tooltip: 'You can view which workflows are consuming the highest and lowest number of tasks.',
      form: <TaskUsagePage />,
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
      {/* <Tabs
        sx={{
          mt: 1,
          position: 'sticky',
          top: '64px', // Adjust this value based on header height
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f1f7fb',
          justifyContent: 'center',
          flexGrow: 1,
          paddingTop: '16px',
          '& .MuiTabs-indicator': {
            // backgroundColor: '#1C252E', // Color of the active tab indicator
            backgroundColor: 'background.currentColor',

            height: '2px', // Thickness of the indicator line
          },
        }}
        value={basicTabs.value}
        onChange={basicTabs.onChange}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            icon={
              <Tooltip title={tab.tooltip} arrow placement="top">
                <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                  {tab.icon}
                  {tab.label}
                </Box>
              </Tooltip>
            }
            value={tab.value}
          />
        ))}
      </Tabs> */}

      <Tabs
        sx={{
          mt: 1,
          position: 'sticky',
          top: '64px', // Adjust this value based on header height
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: (theme1) => (theme.palette.mode === 'light' ? '#f1f7fb' : '#141a21f5'),
          justifyContent: 'center',
          flexGrow: 1,
          paddingTop: '16px',
          '& .MuiTabs-indicator': {
            backgroundColor: 'background.currentColor',
            height: '2px', // Thickness of the indicator line
          },
          '[data-mui-color-scheme="light"] &': {
            backgroundColor: '#f1f7fb',
          },
          '[data-mui-color-scheme="dark"] &': {
            backgroundColor: '#141a21f5',
          },
        }}
        value={basicTabs.value}
        onChange={basicTabs.onChange}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            icon={
              <Tooltip title={tab.tooltip} arrow placement="top">
                <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                  {tab.icon}
                  {tab.label}
                </Box>
              </Tooltip>
            }
            value={tab.value}
          />
        ))}
      </Tabs>

      {/* </Box> */}

      <Box sx={{ mt: 4 }}>{TABS.find((tab) => tab.value === basicTabs.value)?.form}</Box>
    </DashboardContent>
  );
}
