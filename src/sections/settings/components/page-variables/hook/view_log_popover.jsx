// import React from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import Divider from '@mui/material/Divider';
// import Tooltip from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';

// import { Iconify } from 'src/components/iconify';

// // Mock data for edit logs with old and new data
// const editLogs = [
//   {
//     date: 'Oct 10, 2024 11:17:28',
//     action: 'Changed by Anand Nayak',
//     oldData: 'fdhfgh',
//     newData: 'new_fdhfgh',
//   },
//   // Add more logs as needed
// ];

// export function ViewLogPopover({ title, open, onClose, variableName, ...other }) {
//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       alert('Data copied successfully!');
//     });
//   };

//   return (
//     <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
//       <DialogTitle
//         sx={{
//           pb: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 1,
//         }}
//       >
//         <Iconify
//           sx={{ color: 'green', width: '24px', height: '24px' }}
//           icon="lets-icons:check-fill"
//         />
//         {title}
//       </DialogTitle>

//       <DialogContent sx={{ textAlign: 'center' }}>
//         <Typography variant="h6" sx={{ color: 'grey.800', mb: 1 }}>
//           Custom Variable: {variableName}
//         </Typography>

//         <Typography variant="body2" gutterBottom>
//           View update log for last 50 changes.
//         </Typography>
//         <Box
//           sx={{
//             maxHeight: 400,
//             overflowY: 'auto',
//             mt: 2,
//             border: '1px solid #919eab33',
//             borderRadius: 1,
//           }}
//         >
//           {editLogs.map((log, index) => (
//             <React.Fragment key={index}>
//               <Box sx={{ p: 1.5 }}>
//                 <Typography
//                   display="flex"
//                   fontSize="14px"
//                   color="text.secondary"
//                   alignItems="center"
//                 >
//                   <Iconify
//                     icon="icon-park-solid:time"
//                     sx={{ width: '15px', height: '15px', mr: '5px' }}
//                   />
//                   {log.date}
//                 </Typography>
//                 <Typography
//                   fontSize="12px"
//                   color="text.secondary"
//                   align="left"
//                   sx={{ ml: '20px', mt: 1 }}
//                 >
//                   {log.action}
//                 </Typography>
//                 <Box sx={{ ml: '20px', mt: 1 }}>
//                   <Typography
//                     fontSize="12px"
//                     color="text.secondary"
//                     display="flex"
//                     alignItems="center"
//                   >
//                     Old Data: {log.oldData}
//                     <Tooltip title="Copy old data" placement="top">
//                       <Iconify
//                         icon="far fa-copy"
//                         sx={{ ml: 1, cursor: 'pointer' }}
//                         onClick={() => handleCopy(log.oldData)}
//                       />
//                     </Tooltip>
//                   </Typography>
//                   <Typography
//                     fontSize="12px"
//                     color="text.secondary"
//                     display="flex"
//                     alignItems="center"
//                     sx={{ mt: 0.5 }}
//                   >
//                     New Data: {log.newData}
//                     <Tooltip title="Copy new data" placement="top">
//                       <Iconify
//                         icon="far fa-copy"
//                         sx={{ ml: 1, cursor: 'pointer' }}
//                         onClick={() => handleCopy(log.newData)}
//                       />
//                     </Tooltip>
//                   </Typography>
//                 </Box>
//               </Box>
//               {index < editLogs.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </Box>
//       </DialogContent>

//       <DialogActions sx={{ justifyContent: 'center' }}>
//         <Button variant="contained" onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// import React from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import Divider from '@mui/material/Divider';
// import { IconButton, List, Tooltip } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';

// import { Iconify } from 'src/components/iconify';

// // Mock data for edit logs
// const editLogs = [
//   {
//     date: 'Oct 17, 2024 13:05:58',
//     changed_by: 'Changed by: Anand Nayak',
//     old_data: 'Old data: yy/mm/dd',
//     new_data: 'New data: dd/mm/yy',
//   },
//   {
//     date: 'Oct 18, 2024 12:59:44',
//     changed_by: 'Changed by: Anand Nayak',
//     old_data: 'Old data: dd/mm/yy',
//     new_data: 'New data: hardik@inboxkitten.com',
//   },
//   {
//     date: 'Oct 19, 2024 13:29:22',
//     changed_by: 'Changed by: Anand Nayak',
//     old_data: 'Old data: hardik@inboxkitten.com',
//     new_data: 'New data: anand.nayak@inboxkitten.com',
//   },
//   {
//     date: 'Oct 19, 2024 13:29:19',
//     changed_by: 'Changed by: Anand Nayak',
//     old_data: 'Old data: anand.nayak@inboxkitten.com',
//     new_data: 'New data: nayak@pabbly.com',
//   },
//   {
//     date: 'Oct 19, 2024 16:13:16',
//     changed_by: 'Changed by: Anand Nayak',
//     old_data: 'Old data: nayak@pabbly.com',
//     new_data: 'New data: nayak.anand@inboxkitten.com',
//   },
//   {
//     date: 'Oct 19, 2024 13:29:22',
//     changed_by: 'Changed by: Anand Nayak',
//     old_data: 'Old data: nayak.anand@inboxkitten.com',
//     new_data: 'New data: hardik@inboxkitten.com',
//   },
// ];

// // Define common styles
// const commonListStyle = {
//   paddingLeft: '17px',
//   color: 'text.secondary',
//   fontSize: '12px',
// };

// const commonListItemStyle = {
//   marginBottom: '4px',
//   fontSize: '12px',
//   color: 'text.secondary',
//   fontWeight: '400',
//   listStyleType: 'disc',
//   listStylePosition: 'outside',
//   alignItems: 'center', // Center vertically
// };

// export function ViewLogPopover({ title, open, onClose, variableName, ...other }) {
//   return (
//     <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
//       <DialogTitle
//         sx={{
//           // pb: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 1,
//         }}
//       >
//         <Iconify
//           sx={{ color: 'green', width: '36px', height: '36px' }}
//           icon="lets-icons:check-fill"
//         />
//         {title}
//         <Typography variant="h6" sx={{ color: 'grey.800', alignItems: 'center' }}>
//           Custom Variable: {variableName}
//         </Typography>
//         <Typography variant="body2">View update log for last 50 changes.</Typography>
//       </DialogTitle>

//       <DialogContent>
//         <Box
//           sx={{
//             maxHeight: 400,
//             overflowY: 'auto',
//             // mt: 2,
//             border: '1px solid #919eab33',
//             borderRadius: 1,
//           }}
//         >
//           {editLogs.map((log, index) => (
//             <React.Fragment key={index}>
//               <Box sx={{ p: 1.5 }}>
//                 <Typography
//                   display="flex"
//                   fontSize="14px"
//                   color="text.secondary"
//                   alignItems="center"
//                 >
//                   <Iconify
//                     icon="icon-park-solid:time"
//                     sx={{ width: '15px', height: '15px', mr: '5px' }}
//                   />
//                   <Tooltip
//                     title={`Assigned On: ${log.date}, (UTC+05:30) Asia/Kolkata`}
//                     placement="top"
//                     arrow
//                   >
//                     {log.date}
//                   </Tooltip>
//                 </Typography>

//                 <List sx={{ ...commonListStyle, mb: 0 }}>
//                   <ul style={commonListStyle}>
//                     {[
//                       <>
//                         {log.changed_by}
//                         {log.link && (
//                           <a
//                             href={log.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{
//                               color: '#078DEE',
//                               textDecoration: 'underline',
//                               marginLeft: '4px',
//                             }}
//                           >
//                             Learn more
//                           </a>
//                         )}
//                       </>,
//                       <>
//                         {log.old_data}{' '}
//                         <Tooltip
//                           title="Click here to copy the old data of the variable."
//                           arrow
//                           placement="top"
//                           sx={{ fontSize: '16px' }}
//                         >
//                           <IconButton
//                           // onClick={handleCopyTaskId}
//                           >
//                             <Iconify
//                               width={18}
//                               icon="solar:copy-bold"
//                               sx={{ color: 'text.secondary' }}
//                             />
//                           </IconButton>
//                         </Tooltip>
//                       </>,
//                       <>{log.new_data}</>,
//                     ].map((text, idx) => (
//                       <li key={`${index}-${idx}`} style={commonListItemStyle}>
//                         <span>{text}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </List>
//               </Box>
//               {index < editLogs.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </Box>
//       </DialogContent>

//       <DialogActions
//         sx={{
//           display: 'flex',
//           justifyContent: 'center', // Center horizontally
//           alignItems: 'center', // Center vertically
//         }}
//       >
//         <Button variant="contained" onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { List, Alert, Tooltip, Snackbar, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';

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

// Mock data for edit logs
const editLogs = [
  {
    date: 'Oct 17, 2024 13:05:58',
    changed_by: 'Changed by: Anand Nayak',
    old_data: 'Old data: yy/mm/dd',
    new_data: 'New data: dd/mm/yy',
  },
  {
    date: 'Oct 18, 2024 12:59:44',
    changed_by: 'Changed by: Anand Nayak',
    old_data: 'Old data: dd/mm/yy',
    new_data: 'New data: hardik@inboxkitten.com',
  },
  {
    date: 'Oct 19, 2024 13:29:22',
    changed_by: 'Changed by: Anand Nayak',
    old_data: 'Old data: hardik@inboxkitten.com',
    new_data: 'New data: anand.nayak@inboxkitten.com',
  },
  {
    date: 'Oct 19, 2024 13:29:19',
    changed_by: 'Changed by: Anand Nayak',
    old_data: 'Old data: anand.nayak@inboxkitten.com',
    new_data: 'New data: nayak@pabbly.com',
  },
  {
    date: 'Oct 19, 2024 16:13:16',
    changed_by: 'Changed by: Anand Nayak',
    old_data: 'Old data: nayak@pabbly.com',
    new_data: 'New data: nayak.anand@inboxkitten.com',
  },
  {
    date: 'Oct 19, 2024 13:29:22',
    changed_by: 'Changed by: Anand Nayak',
    old_data: 'Old data: nayak.anand@inboxkitten.com',
    new_data: 'New data: hardik@inboxkitten.com',
  },
];

// Define common styles
const commonListStyle = {
  paddingLeft: '17px',
  color: 'text.secondary',
  fontSize: '12px',
};

const commonListItemStyle = {
  // marginBottom: '4px',
  fontSize: '12px',
  color: 'text.secondary',
  fontWeight: '400',
  listStyleType: 'disc',
  listStylePosition: 'outside',
  alignItems: 'center', // Center vertically
};

export function ViewLogPopover({ title, open, onClose, variableName, ...other }) {
  const [oldDataSnackbarOpen, setOldDataSnackbarOpen] = useState(false);
  const [newDataSnackbarOpen, setNewDataSnackbarOpen] = useState(false);
  const theme = useTheme();

  // Handlers for Snackbar
  const handleOldDataSnackbarClose = () => {
    setOldDataSnackbarOpen(false);
  };

  const handleNewDataSnackbarClose = () => {
    setNewDataSnackbarOpen(false);
  };

  const handleCopyOldData = () => {
    setOldDataSnackbarOpen(true);
  };

  const handleCopyNewData = () => {
    setNewDataSnackbarOpen(true);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Iconify
          sx={{ color: 'green', width: '36px', height: '36px' }}
          icon="lets-icons:check-fill"
        />
        {title}
        <Typography variant="h6" sx={{ color: 'grey.800', alignItems: 'center' }}>
          Custom Variable: {variableName}
        </Typography>
        <Typography variant="body2">View update log for last 50 changes.</Typography>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            maxHeight: 400,
            overflowY: 'auto',
            border: '1px solid #919eab33',
            borderRadius: 1,
          }}
        >
          {editLogs.map((log, index) => (
            <React.Fragment key={index}>
              <Box sx={{ p: 1.5 }}>
                <Typography
                  display="flex"
                  fontSize="14px"
                  color="text.secondary"
                  alignItems="center"
                >
                  <Iconify
                    icon="icon-park-solid:time"
                    sx={{ width: '15px', height: '15px', mr: '5px' }}
                  />
                  <Tooltip
                    title={`Assigned On: ${log.date}, (UTC+05:30) Asia/Kolkata`}
                    placement="top"
                    arrow
                  >
                    <span>{log.date}</span>
                  </Tooltip>
                </Typography>

                <List sx={{ ...commonListStyle, mb: 0 }}>
                  <ul style={commonListStyle}>
                    {[
                      <Box height="23px"> {log.changed_by}</Box>,

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
                            width: 200,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {log.old_data}{' '}
                        </Box>
                        <Tooltip
                          title="Click here to copy the old data of the variable."
                          arrow
                          placement="top"
                          sx={{ fontSize: '16px' }}
                        >
                          <IconButton onClick={handleCopyOldData}>
                            <Iconify
                              width={16}
                              icon="solar:copy-bold"
                              sx={{ color: 'text.secondary' }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>,

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
                            width: 200,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {log.new_data}{' '}
                        </Box>
                        <Tooltip
                          title="Click here to copy the new data of the variable."
                          arrow
                          placement="top"
                          sx={{ fontSize: '16px' }}
                        >
                          <IconButton onClick={handleCopyNewData}>
                            <Iconify
                              width={16}
                              icon="solar:copy-bold"
                              sx={{ color: 'text.secondary' }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>,
                    ].map((text, idx) => (
                      <li key={`${index}-${idx}`} style={commonListItemStyle}>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </List>
              </Box>
              {index < editLogs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button variant="contained" onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>

      {/* Snackbar for Old Data Copy */}
      <Snackbar
        open={oldDataSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleOldDataSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
        }}
      >
        <Alert
          onClose={handleOldDataSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Old data variable copied!{' '}
        </Alert>
      </Snackbar>

      {/* Snackbar for New Data Copy */}
      <Snackbar
        open={newDataSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleNewDataSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
        }}
      >
        <Alert
          onClose={handleNewDataSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          New data variable copied!
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
