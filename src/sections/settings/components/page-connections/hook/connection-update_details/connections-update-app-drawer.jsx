import React, { useState } from 'react';

import {
  Box,
  Link,
  Drawer,
  Avatar,
  Tooltip,
  Typography,
  IconButton,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import ConnectionUpdate from './connection-update_details';

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

  const [selectedApp, setSelectedApp] = useState(null);

  const handleSelectApp = (app) => {
    setSelectedApp(app);
  };

  const handleDrawerClose = () => {
    setSelectedApp(null);
    onClose();
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
            p: 3,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Box display="flex" gap="16px" width="100%">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title="Apps which are integrated in the workflow." arrow placement="top">
                    <Avatar
                      variant="rounded"
                      src={selectedApp?.icon || '/assets/icons/app logo/mailerlite.png'}
                      sx={{
                        p: 1,
                        width: 56,
                        height: 56,
                        bgcolor: 'background.neutral',
                        border: '1px solid #D4E2FF',
                      }}
                    />
                  </Tooltip>
                </Box>

                <Box display="flex" flexDirection="column" gap="4px" width="100%">
                  <Box sx={{ display: 'auto', width: '100%', mr: 3 }}>
                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      <Typography variant="h6" sx={{ fontWeight: '600' }}>
                        <Tooltip title="Name of the connection." arrow placement="top">
                          MailerLite
                        </Tooltip>
                      </Typography>
                    </Box>

                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: '#637381',
                        }}
                      >
                        <Tooltip
                          title="Apps which are integrated in the workflow."
                          arrow
                          placement="top"
                        >
                          Created on -{' '}
                          <strong> Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata </strong>.{' '}
                        </Tooltip>
                        All connections are secure.{' '}
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
          display="flex"
          flexDirection="column"
          sx={{
            height: '100%',
            p: 3,
            overflow: 'auto',
            maxHeight: 'auto',
          }}
        >
          <ConnectionUpdate
            onEnableConnectionTab={() => {}}
            onSelectApp={handleSelectApp}
            onClose={handleDrawerClose}
          />
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

export { UpdateAppDrawer };
