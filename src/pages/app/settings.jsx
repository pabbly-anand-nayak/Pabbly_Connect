import React from 'react';
import { useTheme } from '@emotion/react';
import {Outlet , useNavigate, useLocation} from 'react-router-dom';

import { Box, Tab, Tabs, Tooltip } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

const DEFAULT_TAB = 'agency-tasks';
const DEFAULT_PATH = '/app/setting/agency-tasks';

const SETTINGS_TABS = [
  {
    value: 'task-summary',
    path: '/app/setting/task-summary',
    icon: <Iconify icon="icons8:tasks" width={24} />,
    label: 'Task Summary',
    tooltip: 'View the tasks allotted to and consumed by your account.',
    pageTitle: 'Task Summary',
    pageSubheading: 'View all of your task summaries. Any action being performed in your workflow is considered a task.'
  },
  {
    value: 'connections',
    path: '/app/setting/connections',
    icon: <Iconify icon="icon-park-solid:connection-point" width={24} />,
    label: 'Connections',
    tooltip: 'View and manage all apps connected to your account.',
    pageTitle: 'Connections',
    pageSubheading: 'You can view and manage all connections created below.'
  },
  {
    value: 'variables',
    path: '/app/setting/variables',
    icon: <Iconify icon="mdi:variable-box" width={24} />,
    label: 'Variables',
    tooltip: 'Custom variables are useful to store and manipulate data within your workflows.',
    pageTitle: 'Variables',
    pageSubheading: 'Create custom variables that can be used to store and manipulate data within your workflows.'
  },
  {
    value: 'team-members',
    path: '/app/setting/team-members',
    icon: <Iconify icon="fluent:people-team-28-filled" width={24} />,
    label: 'Team Members',
    tooltip: 'Add team members and share workflow(s) or folder(s) access with them.',
    pageTitle: 'Team Members',
    pageSubheading: 'You can add members with varying access level to manage your business.'
  },
  {
    value: 'api-webhooks',
    path: '/app/setting/api-webhooks',
    icon: <Iconify icon="pajamas:api" width={24} />,
    label: 'API & Webhooks',
    tooltip: 'Create Pabbly Connect API key and setup webhook URLs.',
    pageTitle: 'API & Webhooks',
    pageSubheading: 'You can obtain your Pabbly Connect API token from here, and you can add a webhook URL to receive event notifications.'
  },
  {
    value: 'time-zone',
    path: '/app/setting/time-zone',
    icon: <Iconify icon="ri:time-zone-fill" width={24} />,
    label: 'Time Zone',
    tooltip: 'View and manage the time zone settings of your account.',
    pageTitle: 'Time Zone',
    pageSubheading: 'Manage your account time zone settings.'
  },
  {
    value: 'agency-tasks',
    path: '/app/setting/agency-tasks',
    icon: <Iconify icon="fluent:people-team-toolbox-24-filled" width={24} />,
    label: 'Agency Tasks',
    tooltip: 'Assign and manage tasks across Pabbly Connect accounts',
    pageTitle: 'Agency Tasks',
    pageSubheading: 'Assign and manage tasks across Pabbly Connect accounts within your business for streamlined workflows.'
  },
];

export default function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  // If no path matches, redirect to default tab
  React.useEffect(() => {
    if (!SETTINGS_TABS.some(tab => tab.path === location.pathname)) {
      navigate(DEFAULT_PATH);
    }
  }, [location.pathname, navigate]);
  
  // Get current tab from URL or use default
  const currentTab = SETTINGS_TABS.find(tabItem => location.pathname === tabItem.path)?.value || DEFAULT_TAB;
  
  const handleTabChange = (event, newValue) => {
    const selectedTab = SETTINGS_TABS.find(tabItem => tabItem.value === newValue);
    if (selectedTab) {
      navigate(selectedTab.path);
    }
  };

  const currentTabData = SETTINGS_TABS.find(tabItem => tabItem.value === currentTab);

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 0 }}>
        {currentTabData && (
          <PageHeader
            title={currentTabData.pageTitle}
            Subheading={currentTabData.pageSubheading}
            link_added="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220"
          />
        )}
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{
          mt: 1,
          position: 'sticky',
          top: '64px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.mode === 'light' ? '#f1f7fb' : '#141a21f5',
          justifyContent: 'center',
          flexGrow: 1,
          paddingTop: '16px',
          '& .MuiTabs-indicator': {
            backgroundColor: 'background.currentColor',
            height: '2px',
          },
        }}
      >
        {SETTINGS_TABS.map((tabItem) => (
          <Tab
            key={tabItem.value}
            value={tabItem.value}
            icon={
              <Tooltip disableInteractive title={tabItem.tooltip} arrow placement="top">
                <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                  {tabItem.icon}
                  {tabItem.label}
                </Box>
              </Tooltip>
            }
          />
        ))}
      </Tabs>

      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </DashboardContent>
  );
}