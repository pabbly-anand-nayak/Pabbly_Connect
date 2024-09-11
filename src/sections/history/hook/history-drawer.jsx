import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Alert,
  Drawer,
  styled,
  Button,
  Tooltip,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
  AlertTitle,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

import InitialTriggerNode from '../Workflows/history_flows';

// Hook to manage the popover state
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

// Custom backdrop component
const CustomBackdrop = (props) => (
  <MuiBackdrop
    {...props}
    sx={{ backgroundColor: 'transparent' }} // Make the backdrop transparent
  />
);

const ConfigurationDrawer1 = ({ open, onClose }) => {
  const handleBackdropClick = (event) => {
    // Prevent clicks inside the drawer from closing it
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const CustomLink = styled(Link)({
    color: '#078DEE',
  });

  const [messageType, setMessageType] = useState('g');

  const handleRadioChange = (event) => {
    setMessageType(event.target.value);
  };
};

const ConfigurationDrawer2 = ({ open, onClose, publish, onChangePublish }) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const popover = usePopover(); // Use popover hook

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: 'auto',
            }, // Adjust width as needed
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop, // Use the custom backdrop
        }}
      >
        {/* <Box
          display="flex"
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,

            position: 'sticky', // Make the box sticky (fixed)
            top: 0, // Align to the top of the container
            zIndex: 1, // Ensure it is above other content
            // backgroundColor: '#fff', // Add background to avoid content overlap
            borderBottom: '1px dashed #919eab33',

            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            // borderBottom: '1px dashed #919eab33',
            borderBottomRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '1000px' }}>
              <Typography variant="h6" sx={{ fontWeight: '600', mb: 4 }}>
                Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#637381', mb: 1 }}>
                {' '}
                Task History ID - IjU3NjYwNTZmMDYzNzA0MzA1MjZlNTUzNyI_3D_pc
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#637381', mb: 0 }}>
                {' '}
                Executed at Sep 09, 2024 13:17:04, (UTC+05:30) Asia/Kolkata
              </Typography>
            </Box>

            <Box>
              <IconButton onClick={onClose} sx={{ p: 1 }}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on small screens, side by side on larger screens
              gap: 2, // Adds spacing between the buttons
              mt: 2, // Top margin for the Box
            }}
          >
            <Tooltip title="Click here to re-execute the workflow(s)." arrow placement="top">
              <Button
                endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                onClick={popover.onOpen} // Open popover on click
                sx={{
                  textTransform: 'capitalize',
                  width: { xs: '100%', sm: 'auto' }, // Full width on mobile, auto width on larger screens
                }}
                startIcon={<Iconify icon="foundation:refresh" style={{ width: 18, height: 18 }} />}
                size="large"
                variant="contained"
                color="primary"
              >
                Re-execute
              </Button>
            </Tooltip>

            <CustomPopover
              open={popover.open} // Control open state from popover hook
              anchorEl={popover.anchorEl} // Anchor element for popover
              onClose={popover.onClose} // Close popover on action
              slotProps={{ arrow: { placement: 'top' } }} // Ensure proper arrow placement
            >
              <MenuList>
                {[
                  { value: 'published', label: 'Entire Workflow' },
                  { value: 'draft', label: 'Failed & Skipped Steps' },
                ].map((option) => (
                  <MenuItem
                    key={option.value}
                    selected={option.value === publish} // Highlight selected option
                    onClick={() => {
                      popover.onClose(); // Close popover on click
                      onChangePublish(option.value); // Update publish state
                    }}
                  >
                    {option.value === 'published' && <Iconify icon="eva:cloud-upload-fill" />}
                    {option.value === 'draft' && <Iconify icon="solar:file-text-bold" />}
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </CustomPopover>

            <Tooltip title="Click here to view auto re-execution settings." arrow placement="top">
              <Button
                sx={{
                  width: { xs: '100%', sm: 'auto' }, // Full width on mobile, auto width on larger screens
                }}
                startIcon={
                  <Iconify
                    icon="streamline:arrow-reload-horizontal-1-solid"
                    style={{ width: 18, height: 18 }}
                  />
                }
                size="large"
                variant="outlined"
                color="primary"
              >
                Auto Re-execution Settings
              </Button>
            </Tooltip>
          </Box>
        </Box>

        <Box
          justifyContent="space-between"
          sx={{
            display: 'fullwidth',
            p: 3,
          }}
        >
          <Alert sx={{ mb: 3 }}>
            <AlertTitle sx={{ textTransform: 'capitalize' }}> fdfbdfbdfb </AlertTitle>
            This is an check it out!
          </Alert>
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
        </Box> */}

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
            position: 'sticky', // Stick to the top during scrolling
            top: 0, // Adjust this to control where it sticks
            zIndex: 1, // Make sure it stays above other content
            // backgroundColor: 'white', // Keep the background when it sticks
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '800px' }}>
              <Typography variant="h6" sx={{ fontWeight: '600', mb: 4 }}>
                Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#637381', mb: 1 }}>
                Task History ID - IjU3NjYwNTZmMDYzNzA0MzA1MjZlNTUzNyI_3D_pc
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#637381', mb: 0 }}>
                Executed at Sep 09, 2024 13:17:04, (UTC+05:30) Asia/Kolkata
              </Typography>
            </Box>

            <Box>
              <IconButton onClick={onClose} sx={{ p: 1 }}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on small screens, side by side on larger screens
              gap: 2, // Adds spacing between the buttons
              mt: 2, // Top margin for the Box
            }}
          >
            <Tooltip title="Click here to re-execute the workflow(s)." arrow placement="top">
              <Button
                endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                onClick={popover.onOpen} // Open popover on click
                sx={{
                  textTransform: 'capitalize',
                  width: { xs: '100%', sm: 'auto' }, // Full width on mobile, auto width on larger screens
                }}
                startIcon={<Iconify icon="foundation:refresh" style={{ width: 18, height: 18 }} />}
                size="large"
                variant="contained"
                color="primary"
              >
                Re-execute
              </Button>
            </Tooltip>

            <CustomPopover
              open={popover.open} // Control open state from popover hook
              anchorEl={popover.anchorEl} // Anchor element for popover
              onClose={popover.onClose} // Close popover on action
              slotProps={{ arrow: { placement: 'top' } }} // Ensure proper arrow placement
            >
              <MenuList>
                {[
                  { value: 'published', label: 'Entire Workflow' },
                  { value: 'draft', label: 'Failed & Skipped Steps' },
                ].map((option) => (
                  <MenuItem
                    key={option.value}
                    selected={option.value === publish} // Highlight selected option
                    onClick={() => {
                      popover.onClose(); // Close popover on click
                      onChangePublish(option.value); // Update publish state
                    }}
                  >
                    {option.value === 'published' && <Iconify icon="eva:cloud-upload-fill" />}
                    {option.value === 'draft' && <Iconify icon="solar:file-text-bold" />}
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </CustomPopover>

            <Tooltip title="Click here to view auto re-execution settings." arrow placement="top">
              <Button
                sx={{
                  width: { xs: '100%', sm: 'auto' }, // Full width on mobile, auto width on larger screens
                }}
                startIcon={
                  <Iconify
                    icon="streamline:arrow-reload-horizontal-1-solid"
                    style={{ width: 18, height: 18 }}
                  />
                }
                size="large"
                variant="outlined"
                color="primary"
              >
                Auto Re-execution Settings
              </Button>
            </Tooltip>
          </Box>
        </Box>

        {/* Add scrollable functionality to the second Box */}
        <Box
          justifyContent="space-between"
          sx={{
            display: 'block', // Ensure the content stays block-level
            p: 3,
            overflow: 'auto', // Add scrolling capability
            maxHeight: 'auto', // Set a max height for scrolling
          }}
        >
          <Alert sx={{ mb: 3 }}>
            <AlertTitle sx={{ textTransform: 'capitalize' }}> fdfbdfbdfb </AlertTitle>
            This is a check it out!
          </Alert>
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
          <InitialTriggerNode />
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

export { ConfigurationDrawer1, ConfigurationDrawer2 };
