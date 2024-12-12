import React, { useState } from 'react';

import {
  Box,
  Link,
  Drawer,
  Avatar,
  Typography,
  IconButton,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import ChooseApp from './ChooseApp';

const CustomBackdrop = (props) => (
  <MuiBackdrop {...props} sx={{ backgroundColor: 'transparent' }} />
);

const NewAppDrawer = ({ open, onClose }) => {
  const formValidationDialog = useBoolean();
  const formvalidationClick = () => formValidationDialog.onTrue();
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
          <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Box display="flex" gap="16px" width="100%">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={selectedApp?.icon || '/assets/icons/app logo/pabbly_icon.png'}
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
                        {selectedApp?.name || 'Add New Connection'}
                      </Typography>
                    </Box>

                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      {selectedApp?.helpText ? (
                        selectedApp.helpText
                      ) : (
                        <Typography
                          sx={{
                            fontSize: '14px',
                            '[data-mui-color-scheme="light"] &': {
                              color: '#637381',
                            },
                            '[data-mui-color-scheme="dark"] &': {
                              color: 'var(--palette-text-secondary)',
                            },
                          }}
                        >
                          You can authorize new connection from here.{' '}
                          <Link
                            href="https://www.pabbly.com/privacy-policy/#data-policy"
                            target="_blank"
                            sx={{
                              fontSize: '14px',
                              color: 'primary.main',
                              cursor: 'pointer',
                            }}
                          >
                            Learn more
                          </Link>
                        </Typography>
                      )}
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
            p: 3,
            overflow: 'auto',
            maxHeight: 'auto',
          }}
        >
          <ChooseApp onSelectApp={handleSelectApp} onClose={handleDrawerClose} />
        </Box>

        {/* <Box
          display="flex"
          sx={{
            gap: 2,
            py: 2,
            pr: 1,
            pl: 2.5,
            flexGrow: 1,
            display: 'flex',
            borderTop: '1px dashed #919eab33',
            p: 3,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Button onClick={formvalidationClick} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </Box> */}
      </Drawer>
      {open && <CustomBackdrop open={open} />}
    </>
  );
};

export { NewAppDrawer };
