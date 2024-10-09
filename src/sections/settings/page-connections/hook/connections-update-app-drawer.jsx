import React, { Fragment, useState } from 'react';

import {
  Box,
  Tab,
  Link,
  Tabs,
  Drawer,
  Avatar,
  Typography,
  IconButton,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

import ConnectionSetup from './connection-setup/connection-setup';
import ConnectionUpdate from './connection-update_details/connection-update_details';

const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const onOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return {
    open: Boolean(anchorEl),
    anchorEl,
    onOpen,
    onClose,
  };
};

const CustomBackdrop = (props) => (
  <MuiBackdrop {...props} sx={{ backgroundColor: 'transparent' }} />
);

const UpdateAppDrawer = ({ open, onClose, publish, onChangePublish, row }) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const enableConnectionTab = () => {
    setIsConnectionTabEnabled(true);
    setActiveTab('two');
  };

  const formValidationDialog = useBoolean();
  const formvalidationClick = () => formValidationDialog.onTrue();

  const [isConnectionTabEnabled, setIsConnectionTabEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('one');
  const [selectedApp, setSelectedApp] = useState(null); // State to store selected app details

  // Function to handle app selection from ActionSetup
  const handleSelectApp = (app) => {
    setSelectedApp(app); // This will hold the app's name, icon, and helpText
  };

  const handleDrawerClose = () => {
    setSelectedApp(null); // Reset selectedApp when drawer closes
    onClose();
  };

  const TABS = [
    {
      value: 'one',
      icon: <Iconify icon="hugeicons:setup-01" width={24} />,
      label: 'Connection Details',
      form: (
        <ConnectionUpdate
          onEnableConnectionTab={enableConnectionTab}
          onSelectApp={handleSelectApp}
          onClose={handleDrawerClose} // Pass handleDrawerClose as onClose prop
        />
      ),
    },
    {
      value: 'two',
      icon: <Iconify icon="icon-park-solid:circular-connection" width={24} />,
      label: 'Connected App',
      form: <ConnectionSetup />,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: '966.44px',
            },
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop,
        }}
      >
        <Box
          display="flex"
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px dashed #919eab33',
            borderBottomRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            p: 3,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Box display="flex" gap="16px" width="100%">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start', // Aligns Avatar to the top
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={selectedApp?.icon || '/assets/icons/app logo/mailerlite.png'} // Updated to use annature.png as default
                    sx={{
                      p: 1,
                      width: 56,
                      height: 56,
                      bgcolor: 'background.neutral',
                      border: '1px solid #D4E2FF',
                    }}
                  />
                </Box>

                <Box display="flex" flexDirection="column" gap="4px" width="100%">
                  <Box sx={{ display: 'auto', width: '100%', mr: 3 }}>
                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      <Typography variant="h6" sx={{ fontWeight: '600' }}>
                        MailerLite
                      </Typography>
                    </Box>

                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: '#637381',
                        }}
                      >
                        Created on -{' '}
                        <strong> Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata </strong>. All
                        connections are secure.{' '}
                        <Link
                          href="https://www.pabbly.com/privacy-policy/#data-policy"
                          target="_blank"
                          sx={{
                            fontSize: '14px',
                            color: 'primary.main',
                            cursor: 'pointer',
                          }}
                        >
                          Read privacy policy
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box>
              <IconButton onClick={handleDrawerClose} sx={{ p: 1 }}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          justifyContent="space-between"
          sx={{
            display: 'block',
            height: '100%',
            p: '0px 24px 24px 24px',
            overflow: 'auto',
            maxHeight: 'auto',
          }}
        >
          <Box onClick={handleBackdropClick} display="flex" flexDirection="column">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                mt: '0px',
                boxShadow: (theme1) =>
                  `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
              }}
            >
              {TABS.map((tab) => (
                <Tab
                  key={tab.value}
                  icon={tab.icon}
                  label={tab.label}
                  value={tab.value}
                  disabled={tab.disabled}
                />
              ))}
            </Tabs>
            {TABS.map((tab) =>
              tab.value === activeTab ? <Fragment key={tab.value}>{tab.form}</Fragment> : null
            )}
          </Box>
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

export { UpdateAppDrawer };
