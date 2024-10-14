import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Tab, Tabs, Button, Tooltip, useMediaQuery } from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import TimeZonePage from 'src/sections/settings/all_Pages/page_time-zone';
import VariablesPage from 'src/sections/settings/all_Pages/page_variables';
import ConnectionsPage from 'src/sections/settings/all_Pages/page_connections';
import APIWebhooksPage from 'src/sections/settings/all_Pages/page-api-webhooks';
import TaskSummaryPage from 'src/sections/settings/all_Pages/page_task-summary';
import TeamMembersPage from 'src/sections/settings/all_Pages/page_team-members';
import { TeamMemberDialog } from 'src/sections/team-member/hooks/add-team-member';
import { AddSubaccountDialog } from 'src/sections/settings/page-task-summary/hook/add-subaccount';

export default function Page() {
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [selectedListItem, setSelectedListItem] = useState(0);
  const dialog = useBoolean();

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
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
      icon: <Iconify icon="icons8:tasks" width={24} />,
      label: 'Task Summary',
      tooltip: 'View the tasks allotted to and consumed by your account.',
      form: <TaskSummaryPage />, // Correct component for first tab
    },
    {
      value: 'two',
      icon: <Iconify icon="icon-park-solid:connection-point" width={24} />,
      label: 'Connections',
      tooltip: 'View and manage all apps connected to your account.',
      form: <ConnectionsPage />,
    },

    {
      value: 'three',
      icon: <Iconify icon="mdi:variable-box" width={24} />,
      label: 'Variables',
      tooltip: 'Custom variables are useful to store and manipulate data within your workflows.',
      form: <VariablesPage />,
    },
    {
      value: 'four',
      icon: <Iconify icon="fluent:people-team-28-filled" width={24} />,
      label: 'Team Members',
      tooltip: 'Add team members and share workflow(s) or folder(s) access with them.',
      form: <TeamMembersPage />,
    },
    {
      value: 'five',
      icon: <Iconify icon="pajamas:api" width={24} />,
      label: 'API & Webhooks',
      tooltip: 'Create Pabbly Connect API key and setup webhook URLs.',
      form: <APIWebhooksPage />,
    },
    {
      value: 'Six',
      icon: <Iconify icon="ri:time-zone-fill" width={24} />,
      label: 'Time Zone',
      tooltip: 'View and manage the time zone settings of your account.',
      form: <TimeZonePage />,
    },
  ];

  const currentData = listItemsData[selectedListItem];
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

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
            title="Task Summary"
            Subheading="View all of your task summaries. Any action being performed in your workflow is considered a task. Triggers are not calculated as tasks, and internal applications of Pabbly Connect, such as the filter, router, and formatter, are also not counted as tasks. Note that the task summary is only available for the last 30 days."
            link_added="#"
          />
        )}
        {basicTabs.value === 'two' && (
          <div style={{ minHeight: '92px', boxSizing: 'border-box' }}>
            <PageHeader
              title="Connections"
              Subheading="You can view and manage all connections created below. Click on the connection name to check the connected workflows to that specific connection. In case of updating any connection, it will be automatically updated in all connected workflows."
              link_added="#"
            />
          </div>
        )}
        {basicTabs.value === 'three' && (
          <div style={{ minHeight: '92px', boxSizing: 'border-box' }}>
            <PageHeader
              title="Variables"
              Subheading="Create custom variables that can be used to store and manipulate data within your workflows."
              link_added="#"
            />
          </div>
        )}
        {basicTabs.value === 'four' && (
          <div style={{ minHeight: '92px', boxSizing: 'border-box' }}>
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
                title="Team Members"
                Subheading="You can add members with varying access level to manage your business."
                link_added="#"
              />

              <Tooltip title="Click here to add team member" arrow placement="top">
                <Button
                  onClick={dialog.onTrue}
                  sx={{ mt: isMobile ? 2 : 0 }}
                  startIcon={
                    <Iconify
                      icon="heroicons:plus-circle-16-solid"
                      style={{ width: 18, height: 18 }}
                    />
                  }
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Add Team Member
                </Button>
              </Tooltip>
              <TeamMemberDialog open={dialog.value} onClose={dialog.onFalse} />
            </Box>
          </div>
        )}
        {basicTabs.value === 'five' && (
          <div style={{ minHeight: '92px', boxSizing: 'border-box' }}>
            <PageHeader
              title="API & Webhooks"
              Subheading="You can obtain your Pabbly Connect API token from here, and you can add a webhook URL to receive event notifications."
              link_added="#"
            />
          </div>
        )}
        {basicTabs.value === 'Six' && (
          <div style={{ minHeight: '92px', boxSizing: 'border-box' }}>
            <PageHeader
              title="Time Zone"
              Subheading="You can obtain your Pabbly Connect API token from here, and you can add a webhook URL to receive event notifications."
              link_added="#"
            />
          </div>
        )}
      </Box>

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
          '& .MuiTabs-indicator': {
            backgroundColor: '#1C252E', // Color of the active tab indicator
            height: '2px', // Thickness of the indicator line
          },
        }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            icon={tab.icon} // Display the icon without tooltip
            label={
              <Tooltip title={tab.tooltip} placement="top" arrow>
                {tab.label}
              </Tooltip>
            }
          />
        ))}
      </Tabs>

      {/* </Box> */}

      <Box sx={{ mt: 4 }}>{TABS.find((tab) => tab.value === basicTabs.value)?.form}</Box>

      {/* Dialog Component */}
      <AddSubaccountDialog
        open={openDialog}
        onClose={handleDialogClose}
        title="Add Sub-account"
        content="Content goes here"
        action="Create"
      />
    </DashboardContent>
  );
}
