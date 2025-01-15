// import React, { useState } from 'react';

// import {
//   Box,
//   List,
//   Button,
//   Dialog,
//   Divider,
//   Tooltip,
//   IconButton,
//   Typography,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   ListItem,
//   ListItemText,
// } from '@mui/material';

// import { Iconify } from 'src/components/iconify';
// import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

// const commonListStyle = {
//   paddingLeft: '17px',
//   color: 'text.secondary',
//   fontSize: '12px',
// };

// // Define common styles
// const actionByListStyle = {
//   paddingLeft: '20px ',
//   color: 'text.secondary',
//   fontSize: '12px',
// };

// const commonListItemStyle = {
//   fontSize: '12px',
//   color: 'text.secondary',
//   fontWeight: '400',
//   listStyleType: 'disc',
//   listStylePosition: 'outside',
//   alignItems: 'center',
// };

// export default function ViewLogDialog({
//   open,
//   onClose,
//   title = 'View Logs',
//   subtitle = 'View update log changes.',
//   icon = 'lets-icons:check-fill',
//   iconColor = 'green',
//   logs = [],
//   maxHeight = '80vh',
//   editedBy,
//   contentMaxHeight = 310,
//   showCopyButtons = true,
//   onCopyOldData,
//   onCopyNewData,
//   renderCustomLogContent,
//   dateTooltip,
//   oldDataButtonTooltip = '',
//   newDataButtonTooltip = '',

//   oldDataCopiedMessage = '',
//   newDataCopiedMessage = '',
//   snackbarSeverity = '', // Default severity for the snackbar

//   closeButtonText = 'Close',
//   closeButtonVariant = 'contained',
//   closeButtonColor = 'primary',
//   tooltipPlacement = 'top',
//   ...other
// }) {
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCopyOldData = (log) => {
//     if (onCopyOldData) {
//       onCopyOldData(log);
//     }
//     // setSnackbarMessage('Old variable data copied!');

//     setSnackbarMessage(oldDataCopiedMessage); // Use the custom message prop
//     setSnackbarOpen(true);
//   };

//   const handleCopyNewData = (log) => {
//     if (onCopyNewData) {
//       onCopyNewData(log);
//     }
//     // setSnackbarMessage('New variable data copied!');
//     setSnackbarMessage(newDataCopiedMessage); // Use the custom message prop
//     setSnackbarOpen(true);
//   };

//   const renderLogEntry = (log, index) => {
//     if (renderCustomLogContent) {
//       return renderCustomLogContent({
//         log,
//         index,
//         handleCopyOldData: () => handleCopyOldData(log),
//         handleCopyNewData: () => handleCopyNewData(log),
//         tooltipPlacement,
//         oldDataButtonTooltip,
//         newDataButtonTooltip,
//       });
//     }

//     // Create the formatted tooltip text directly
//     const formattedTooltip = `Updated On: ${log.date}, (UTC+05:30) Asia/Kolkata`;

//     return (
//       <React.Fragment key={index}>
//         <Box sx={{ p: 1.5 }}>
//           {/* Assigned On Date Time */}
//           <Typography display="flex" fontSize="14px" color="text.secondary" alignItems="center">
//             <Iconify
//               icon="icon-park-solid:time"
//               sx={{ width: '15px', height: '15px', mr: '5px' }}
//             />
//             <Tooltip title={formattedTooltip} arrow placement={tooltipPlacement}>
//               <Box component="span" sx={{ cursor: 'pointer' }}>
//                 {log.date}
//               </Box>
//             </Tooltip>
//           </Typography>

//           {/* edit_Log for dashbaord table  */}
//           {log.edit_Log && (
//             <Typography sx={{ ...actionByListStyle, pt: 1, mb: 0 }}>{log.edit_Log}</Typography>
//           )}
//           {/* List of Changed by, Old data & New data */}
//           <List sx={{ ...commonListStyle, mb: 0 }}>
//             <ul style={commonListStyle}>
//               {[
//                 <Box
//                   key="changed-by"
//                   alignItems="center"
//                   height="24px"
//                   sx={{
//                     gap: 1,
//                     alignItems: 'center',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   {log.changed_by}
//                 </Box>,
//                 showCopyButtons && (
//                   <Box
//                     key="old-data"
//                     sx={{
//                       gap: 1,
//                       alignItems: 'center',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: 300,
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                       }}
//                     >
//                       {log.old_data}
//                     </Box>
//                     <Tooltip title={oldDataButtonTooltip} arrow placement={tooltipPlacement}>
//                       <IconButton onClick={() => handleCopyOldData(log)} sx={{ padding: 0.5 }}>
//                         <Iconify
//                           width={16}
//                           icon="solar:copy-bold"
//                           sx={{ color: 'text.secondary' }}
//                         />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 ),
//                 showCopyButtons && (
//                   <Box
//                     key="new-data"
//                     sx={{
//                       gap: 1,
//                       alignItems: 'center',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: 300,
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                       }}
//                     >
//                       {log.new_data}
//                     </Box>
//                     <Tooltip title={newDataButtonTooltip} arrow placement={tooltipPlacement}>
//                       <IconButton onClick={() => handleCopyNewData(log)} sx={{ padding: 0.5 }}>
//                         <Iconify
//                           width={16}
//                           icon="solar:copy-bold"
//                           sx={{ color: 'text.secondary' }}
//                         />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 ),
//               ]
//                 .filter(Boolean)
//                 .map((content, idx) => (
//                   <li key={`${index}-${idx}`} style={commonListItemStyle}>
//                     <span>{content}</span>
//                   </li>
//                 ))}
//             </ul>
//           </List>
//         </Box>
//         {index < logs.length - 1 && <Divider />}
//       </React.Fragment>
//     );
//   };

//   return (
//     <Dialog
//       fullWidth
//       maxWidth="xs"
//       open={open}
//       onClose={onClose}
//       {...other}
//       PaperProps={{
//         sx: {
//           maxHeight,
//           display: 'flex',
//           flexDirection: 'column',
//         },
//       }}
//     >
//       {/* title & subtitle */}

//       <DialogTitle
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 1,
//           flexShrink: 0,
//         }}
//       >
//         <Iconify sx={{ color: iconColor, width: '36px', height: '36px' }} icon={icon} />

//         <Typography
//           variant="h6"
//           sx={{
//             color: 'grey.800',
//             textAlign: 'center', // Center the text horizontally
//             display: 'flex',
//             alignItems: 'center', // Center the text vertically
//             justifyContent: 'center', // Ensure it's centered in a flex container
//             overflow: 'hidden', // Prevent content overflow
//             textOverflow: 'ellipsis', // Add ellipsis for long text
//             wordBreak: 'break-word', // Break long words into the next line
//             maxWidth: '100%', // Ensure it doesn't exceed the container width
//           }}
//         >
//           {title.slice(0, 50)} {title.length > 50 ? '...' : ''}
//         </Typography>

//         {subtitle && <Typography variant="body2">{subtitle}</Typography>}
//       </DialogTitle>

//       <DialogContent
//         sx={{
//           p: 2,
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           flexGrow: 1,
//         }}
//       >
//         <Box
//           sx={{
//             maxHeight: contentMaxHeight,
//             flex: 1,
//             overflowY: 'auto',
//             border: '1px solid #919eab33',
//             borderRadius: 1,
//           }}
//         >
//           {logs.map((log, index) => renderLogEntry(log, index))}
//         </Box>
//       </DialogContent>
//       {/* Button Actions */}
//       <DialogActions
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexShrink: 0,
//         }}
//       >
//         <Button variant={closeButtonVariant} onClick={onClose} color={closeButtonColor}>
//           {closeButtonText}
//         </Button>
//       </DialogActions>
//       {/* Snackbar */}
//       <CustomSnackbar
//         open={snackbarOpen}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//         severity="success"
//       />
//     </Dialog>
//   );
// }

// -----------------------------------------------

// import React, { useState } from 'react';

// import {
//   Box,
//   List,
//   Button,
//   Dialog,
//   Divider,
//   Tooltip,
//   IconButton,
//   Typography,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';

// import { Iconify } from 'src/components/iconify';
// import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

// import { commonBulletListStyle } from '../bullet-list-style/bullet-list-style';

// // Define common styles
// const actionByListStyle = {
//   padding: '8px 0px 0px 20px',
//   color: 'text.secondary',
//   fontSize: '12px',
// };

// const commonListItemStyle = {
//   fontSize: '12px',
//   color: 'text.secondary',
//   fontWeight: '400',
//   listStyleType: 'disc',
//   listStylePosition: 'outside',
//   alignItems: 'center',
// };

// export default function ViewLogDialog({
//   open,
//   onClose,
//   headerTitle = 'View Logs',
//   headerSubTitle = 'View update log changes.',
//   icon = 'lets-icons:check-fill',
//   iconColor = 'green',
//   logs = [], // Example logs data - {date:, changed_by: , old_data:, new_data:, },
//   maxHeight = '80vh',
//   contentMaxHeight = 310,
//   showCopyButtons = true,
//   onCopyOldData,
//   onCopyNewData,
//   renderCustomLogContent,
//   dateTooltip,
//   oldDataButtonTooltip = '',
//   newDataButtonTooltip = '',
//   oldDataCopiedMessage = '',
//   newDataCopiedMessage = '',
//   snackbarSeverity = '', // Default severity for the snackbar
//   closeButtonText = 'Close',
//   closeButtonVariant = 'contained',
//   closeButtonColor = 'primary',
//   tooltipPlacement = 'top',
//   ...other
// }) {
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCopyOldData = (log) => {
//     if (onCopyOldData) {
//       onCopyOldData(log);
//     }
//     setSnackbarMessage(oldDataCopiedMessage); // Use the custom message prop
//     setSnackbarOpen(true);
//   };

//   const handleCopyNewData = (log) => {
//     if (onCopyNewData) {
//       onCopyNewData(log);
//     }
//     setSnackbarMessage(newDataCopiedMessage); // Use the custom message prop
//     setSnackbarOpen(true);
//   };

//   const renderLogEntry = (log, index) => {
//     if (renderCustomLogContent) {
//       return renderCustomLogContent({
//         log,
//         index,
//         handleCopyOldData: () => handleCopyOldData(log),
//         handleCopyNewData: () => handleCopyNewData(log),
//         tooltipPlacement,
//         oldDataButtonTooltip,
//         newDataButtonTooltip,
//       });
//     }

//     const formattedTooltip = `Updated On: ${log.date}, (UTC+05:30) Asia/Kolkata`;

//     return (
//       <React.Fragment key={index}>
//         <Box sx={{ p: 1.5 }}>
//           {/* Updated On Date & Time */}
//           <Typography display="flex" fontSize="14px" color="text.secondary" alignItems="center">
//             <Iconify
//               icon="icon-park-solid:time"
//               sx={{ width: '15px', height: '15px', mr: '5px' }}
//             />
//             <Tooltip title={formattedTooltip} arrow placement={tooltipPlacement}>
//               <Box component="span" sx={{ cursor: 'pointer' }}>
//                 {log.date}
//               </Box>
//             </Tooltip>
//           </Typography>

//           {/* edit_Log for dashbaord table  */}
//           {log.edit_Log && <Typography sx={{ ...actionByListStyle }}>{log.edit_Log}</Typography>}

//           {/* List of Changed by, Old data & New data */}
//           {(log.old_data || log.new_data) && (
//             <List sx={{ ...commonBulletListStyle, mb: 0, pl: '26px', pb: 0 }}>
//               <ul style={commonBulletListStyle}>
//                 {[
//                   <Box
//                     key="changed-by"
//                     alignItems="center"
//                     height="24px"
//                     sx={{
//                       gap: 1,
//                       alignItems: 'center',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                     }}
//                   >
//                     {log.changed_by}
//                   </Box>,
//                   showCopyButtons && (
//                     <Box
//                       key="old-data"
//                       sx={{
//                         gap: 1,
//                         alignItems: 'center',
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           width: 300,
//                           whiteSpace: 'nowrap',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                         }}
//                       >
//                         {log.old_data}
//                       </Box>
//                       <Tooltip title={oldDataButtonTooltip} arrow placement={tooltipPlacement}>
//                         <IconButton onClick={() => handleCopyOldData(log)} sx={{ padding: 0.5 }}>
//                           <Iconify
//                             width={16}
//                             icon="solar:copy-bold"
//                             sx={{ color: 'text.secondary' }}
//                           />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   ),
//                   showCopyButtons && (
//                     <Box
//                       key="new-data"
//                       sx={{
//                         gap: 1,
//                         alignItems: 'center',
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           width: 300,
//                           whiteSpace: 'nowrap',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                         }}
//                       >
//                         {log.new_data}
//                       </Box>
//                       <Tooltip title={newDataButtonTooltip} arrow placement={tooltipPlacement}>
//                         <IconButton onClick={() => handleCopyNewData(log)} sx={{ padding: 0.5 }}>
//                           <Iconify
//                             width={16}
//                             icon="solar:copy-bold"
//                             sx={{ color: 'text.secondary' }}
//                           />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   ),
//                 ]
//                   .filter(Boolean)
//                   .map((content, idx) => (
//                     <li key={`${index}-${idx}`} style={commonListItemStyle}>
//                       <span>{content}</span>
//                     </li>
//                   ))}
//               </ul>
//             </List>
//           )}
//         </Box>
//         {index < logs.length - 1 && <Divider />}
//       </React.Fragment>
//     );
//   };

//   return (
//     <Dialog
//       fullWidth
//       maxWidth="xs"
//       open={open}
//       onClose={onClose}
//       {...other}
//       PaperProps={{
//         sx: {
//           maxHeight,
//           display: 'flex',
//           flexDirection: 'column',
//         },
//       }}
//     >
//       {/* header Title & header Sub Title */}
//       <DialogTitle
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 1,
//           flexShrink: 0,
//         }}
//       >
//         <Iconify sx={{ color: iconColor, width: '36px', height: '36px' }} icon={icon} />

//         {/* header Title */}

//         <Typography
//           variant="h6"
//           sx={{
//             color: 'body',
//             textAlign: 'center',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             wordBreak: 'break-word',
//             maxWidth: '100%',
//           }}
//         >
//           {headerTitle.slice(0, 50)} {headerTitle.length > 50 ? '...' : ''}
//         </Typography>

//         {/* header Sub Title */}
//         {headerSubTitle && (
//           <Typography
//             sx={{
//               textAlign: 'center',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               wordBreak: 'break-word',
//               maxWidth: '100%',
//             }}
//             variant="body2"
//           >
//             {headerSubTitle}
//           </Typography>
//         )}
//       </DialogTitle>

//       <DialogContent
//         sx={{
//           p: 2,
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           flexGrow: 1,
//         }}
//       >
//         <Box
//           sx={{
//             maxHeight: contentMaxHeight,
//             flex: 1,
//             overflowY: 'auto',
//             border: '1px solid #919eab33',
//             borderRadius: 1,
//           }}
//         >
//           {logs.map((log, index) => renderLogEntry(log, index))}
//         </Box>
//       </DialogContent>

//       {/* Button Actions */}
//       <DialogActions
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexShrink: 0,
//         }}
//       >
//         <Button variant={closeButtonVariant} onClick={onClose} color={closeButtonColor}>
//           {closeButtonText}
//         </Button>
//       </DialogActions>

//       {/* Snackbar */}
//       <CustomSnackbar
//         open={snackbarOpen}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//         severity={snackbarSeverity || 'success'}
//       />
//     </Dialog>
//   );
// }


import React from 'react';
import { toast } from 'sonner';

import {
  Box,
  List,
  Button,
  Dialog,
  Divider,
  Tooltip,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { commonBulletListStyle } from '../bullet-list-style/bullet-list-style';

// Define common styles
const actionByListStyle = {
  padding: '8px 0px 0px 20px',
  color: 'text.secondary',
  fontSize: '12px',
};

const commonListItemStyle = {
  fontSize: '12px',
  color: 'text.secondary',
  fontWeight: '400',
  listStyleType: 'disc',
  listStylePosition: 'outside',
  alignItems: 'center',
};

export default function ViewLogDialog({
  open,
  onClose,
  headerTitle = 'View Logs',
  headerSubTitle = 'View update log changes.',
  icon = 'lets-icons:check-fill',
  iconColor = 'green',
  logs = [], // Example logs data - {date:, changed_by: , old_data:, new_data:, edit_Log:},
  maxHeight = '80vh',
  contentMaxHeight = 310,
  showCopyButtons = true,
  onCopyOldData,
  onCopyNewData,
  renderCustomLogContent,
  dateTooltip,
  oldDataButtonTooltip = '',
  newDataButtonTooltip = '',
  oldDataCopiedMessage = '',
  newDataCopiedMessage = '',
  closeButtonText = 'Close',
  closeButtonVariant = 'contained',
  closeButtonColor = 'primary',
  tooltipPlacement = 'top',
  ...other
}) {
  const handleCopyOldData = (log) => {
    console.log('handleCopyOldData triggered', log);
    if (onCopyOldData) {
      onCopyOldData(log);
    }
    toast.success(oldDataCopiedMessage);
  };

  const handleCopyNewData = (log) => {
    console.log('handleCopyNewData triggered', log);
    if (onCopyNewData) {
      onCopyNewData(log);
    }
    toast.success(newDataCopiedMessage);
  };
  const renderLogEntry = (log, index) => {
    if (renderCustomLogContent) {
      return renderCustomLogContent({
        log,
        index,
        handleCopyOldData: () => handleCopyOldData(log),
        handleCopyNewData: () => handleCopyNewData(log),
        tooltipPlacement,
        oldDataButtonTooltip,
        newDataButtonTooltip,
      });
    }

    const formattedTooltip = `Updated On: ${log.date}, (UTC+05:30) Asia/Kolkata`;


    return (
      <React.Fragment key={index}>
        <Box sx={{ p: 1.5 }}>
          {/* Updated On Date & Time */}
          <Typography display="flex" fontSize="14px" color="text.secondary" alignItems="center">
            <Iconify
              icon="icon-park-solid:time"
              sx={{ width: '15px', height: '15px', mr: '5px' }}
            />
            <Tooltip title={formattedTooltip} arrow placement={tooltipPlacement}>
              <Box component="span" sx={{ cursor: 'pointer' }}>
                {log.date}
              </Box>
            </Tooltip>
          </Typography>

          {/* edit_Log for dashboard table */}
          {log.edit_Log && <Typography sx={{ ...actionByListStyle }}>{log.edit_Log}</Typography>}

          {/* List of Changed by, Old data & New data */}
          {(log.old_data || log.new_data) && (
            <List sx={{ ...commonBulletListStyle, mb: 0, pl: '26px', pb: 0 }}>
              <ul style={commonBulletListStyle}>
                {[log.changed_by].map((content, idx) => (
                  <li key={`${index}-${idx}`} style={commonListItemStyle}>
                    {content}
                  </li>
                ))}

                {showCopyButtons && (
                  <>
                    {/* Old Data */}
                    <li style={commonListItemStyle}>
                      <Box
                        sx={{
                          gap: 1,
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            width: 300,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {log.old_data}
                        </Box>
                        <Tooltip title={oldDataButtonTooltip} arrow placement={tooltipPlacement}>
                          <IconButton onClick={() => handleCopyOldData(log)} sx={{ padding: 0.5 }}>
                            <Iconify
                              width={16}
                              icon="solar:copy-bold"
                              sx={{ color: 'text.secondary' }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </li>

                    {/* New Data */}
                    <li style={commonListItemStyle}>
                      <Box
                        sx={{
                          gap: 1,
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            width: 300,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {log.new_data}
                        </Box>
                        <Tooltip title={newDataButtonTooltip} arrow placement={tooltipPlacement}>
                          <IconButton onClick={() => handleCopyNewData(log)} sx={{ padding: 0.5 }}>
                            <Iconify
                              width={16}
                              icon="solar:copy-bold"
                              sx={{ color: 'text.secondary' }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </li>
                  </>
                )}
              </ul>
            </List>
          )}
        </Box>
        {index < logs.length - 1 && <Divider />}
      </React.Fragment>
    );
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={{
        sx: {
          maxHeight,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          flexShrink: 0,
        }}
      >
        <Iconify sx={{ color: iconColor, width: '36px', height: '36px' }} icon={icon} />

        <Typography
          variant="h6"
          sx={{
            color: 'body',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
            maxWidth: '100%',
          }}
        >
          {headerTitle.slice(0, 50)} {headerTitle.length > 50 ? '...' : ''}
        </Typography>

        {headerSubTitle && (
          <Typography
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              wordBreak: 'break-word',
              maxWidth: '100%',
            }}
            variant="body2"
          >
            {headerSubTitle}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent
        sx={{
          p: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            maxHeight: contentMaxHeight,
            flex: 1,
            overflowY: 'auto',
            border: '1px solid #919eab33',
            borderRadius: 1,
          }}
        >
          {logs.map((log, index) => renderLogEntry(log, index))}
        </Box>
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <Button variant={closeButtonVariant} onClick={onClose} color={closeButtonColor}>
          {closeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
