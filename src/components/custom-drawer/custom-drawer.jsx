// import React, { useState } from 'react';

// import {
//   Box,
//   Drawer,
//   Avatar,
//   Tooltip,
//   Typography,
//   IconButton,
//   Backdrop as MuiBackdrop,
// } from '@mui/material';

// import { Iconify } from 'src/components/iconify';

// // Hook to manage the popover state
// const usePopover = () => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const onOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const onClose = () => {
//     setAnchorEl(null);
//   };

//   return {
//     open: Boolean(anchorEl),
//     anchorEl,
//     onOpen,
//     onClose,
//   };
// };

// // Custom backdrop component
// const CustomBackdrop = (props) => (
//   <MuiBackdrop
//     {...props}
//     sx={{ backgroundColor: 'transparent' }} // Make the backdrop transparent
//   />
// );

// const CustomDrawer = ({
//   open,
//   onClose,
//   icon = 'mdi:clipboard-text-history',
//   iconTitleTooltip,
//   headerTitle = 'View Logs',
//   headerTitleTooltip = 'Title Tooltip',
//   headerSubTitle = 'Sub Title Tooltip',
//   headerSubTitleTooltip,
//   customLogData,
//   showIconSection = true, // Optional prop to show/hide the icon section / In case the icon section doesn't need to be set to false.


// }) => {
//   const handleBackdropClick = (event) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   const handleDrawerClose = () => {
//     onClose();
//   };

//   return (
//     <>
//       <Drawer
//         anchor="right"
//         open={open}
//         // onClose={handleDrawerClose}
//         PaperProps={{
//           sx: {
//             p: 0,
//             display: 'flex',
//             flexDirection: 'column',
//             width: {
//               xs: '100%',
//               md: 'auto',
//             },
//           },
//         }}
//         ModalProps={{
//           BackdropComponent: CustomBackdrop,
//         }}
//       >
//         <Box
//           display="flex"
//           sx={{
//             py: 2,
//             pr: 1,
//             pl: 2.5,
//             flexGrow: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             borderBottom: '1px dashed #919eab33',
//             p: 3,
//             position: 'sticky',
//             top: 0,
//             zIndex: 1,
//           }}
//         >
//           <Box sx={{ display: 'flex', width: '100%' }}>
//             <Box sx={{ width: '100%' }}>
//               <Box display="flex" gap="16px" width="100%">
//                 {showIconSection && (

//                   <Box
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'flex-start',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Tooltip title={`${iconTitleTooltip}`} placement="top" arrow>
//                       <Avatar
//                         variant="rounded"
//                         sx={{
//                           p: 1,
//                           width: 56,
//                           height: 56,
//                           bgcolor: 'background.neutral',
//                           border: '1px solid #D4E2FF',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}
//                       >
//                         <Iconify
//                           color="text.secondary"
//                           icon={icon}
//                           width={32}
//                           height={32}
//                         />
//                       </Avatar>
//                     </Tooltip>
//                   </Box>
//                 )}
//                 {/* Header, Sub Title & Tooltips */}
//                 <Box display="flex" flexDirection="column" gap="4px" width="100%">
//                   <Box sx={{ display: 'auto', width: '100%', mr: 3 }}>
//                     <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>

//                       <Typography variant="h6" sx={{ fontWeight: '600' }}>

//                         <Tooltip title={`${headerTitleTooltip}`} placement="top" arrow>

//                           {/* {headerTitle.slice(0, 50)}{headerTitle.length > 50 ? '...' : ''} */}
//                           {headerTitle}

//                         </Tooltip>
//                       </Typography>
//                     </Box>

//                     <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
//                       <Tooltip
//                         title={`${headerSubTitleTooltip}`}
//                         arrow
//                         placement="bottom"
//                       >
//                       <Typography
//                         sx={{
//                           fontSize: '14px',
//                           // color: '#637381',
//                           '[data-mui-color-scheme="light"] &': {
//                             color: '#637381',
//                           },
//                           '[data-mui-color-scheme="dark"] &': {
//                             color: 'var(--palette-text-secondary)',
//                           },
//                           }}
//                         >
//                           {/* <strong>    {headerSubTitle}</strong> */}
//                           {headerSubTitle}

//                       </Typography>
//                       </Tooltip>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>

//             <Box>
//               <IconButton onClick={handleDrawerClose} sx={{ p: 1 }}>
//                 <Iconify icon="mingcute:close-line" />
//               </IconButton>
//             </Box>
//           </Box>
//         </Box>

//         <Box
//           justifyContent="space-between"
//           sx={{
//             display: 'block',
//             height: '100%',
//             p: 3,
//             overflow: 'auto',
//             maxHeight: 'auto',
//           }}
//         >
//           {customLogData}

//         </Box>
//       </Drawer>
//       {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
//     </>
//   );
// };

// export { CustomDrawer };


// ----------------------------------------
import React, { useState } from 'react';

import {
  Box,
  Drawer,
  Avatar,
  Tooltip,
  Typography,
  IconButton,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

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

const CustomDrawer = ({
  open,
  onClose,
  icon,
  iconTitleTooltip,
  headerTitle = 'View Logs',
  headerTitleTooltip = 'Title Tooltip',
  headerSubTitle = 'Sub Title Tooltip',
  headerSubTitleTooltip,
  customLogData,
  showIconSection = true, // Optional prop to show/hide the icon section / In case the icon section doesn't need to be set to false.
}) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDrawerClose = () => {
    onClose();
  };

  // Helper function to render the icon
  const renderIcon = () => {
    if (typeof icon === 'object' && icon.src) {
      // When `icon` is an object with a `src` property
      return (
        <Avatar
          variant="rounded"
          sx={{
            p: 1,
            width: 56,
            height: 56,
            bgcolor: 'background.neutral',
            border: '1px solid #D4E2FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          src={icon.src} // Use the src from the object
          alt="Icon"
        />
      );
    }

    // Default case: Render Iconify icon
    return (
      <Avatar
        variant="rounded"
        sx={{
          p: 1,
          width: 56,
          height: 56,
          bgcolor: 'background.neutral',
          border: '1px solid #D4E2FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Iconify
          color="text.secondary"
          icon={icon} // Use the string directly as the icon name
          width={32}
          height={32}
        />
      </Avatar>
    );
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: 'auto',
            },
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop,
        }}
      >
        <Box
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
                {showIconSection && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title={`${iconTitleTooltip}`} placement="top" arrow>
                      {renderIcon()}
                    </Tooltip>
                  </Box>
                )}
                <Box display="flex" flexDirection="column" gap="4px" width="100%">
                  <Box sx={{ display: 'auto', width: '100%', mr: 3 }}>
                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      <Typography variant="h6" sx={{ fontWeight: '600' }}>
                        <Tooltip title={`${headerTitleTooltip}`} placement="top" arrow>
                          {headerTitle}
                        </Tooltip>
                      </Typography>
                    </Box>
                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      <Tooltip title={`${headerSubTitleTooltip}`} arrow placement="bottom">
                        <Typography
                          sx={{
                            fontSize: '14px',
                            '[data-mui-color-scheme="light"] &': { color: '#637381' },
                            '[data-mui-color-scheme="dark"] &': {
                              color: 'var(--palette-text-secondary)',
                            },
                          }}
                        >
                          {headerSubTitle}
                        </Typography>
                      </Tooltip>
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
          {customLogData}
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

export { CustomDrawer };
