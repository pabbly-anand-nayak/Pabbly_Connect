// import React from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';

// import { Iconify } from 'src/components/iconify';

// // Mock data for edit logs
// const editLogs = [
//   { date: 'Sep 13, 2024 13:05:58', action: 'Edited by Ankit Mandli.' },
//   { date: 'Sep 13, 2024 12:59:44', action: 'Edited by Ankit Mandli.' },
//   { date: 'Sep 06, 2024 13:29:22', action: 'Workflow disabled by Ankit Mandli.' },
//   { date: 'Sep 06, 2024 13:29:19', action: 'Workflow enabled by Ankit Mandli.' },
//   { date: 'Sep 02, 2024 16:13:16', action: 'Edited by Ankit Mandli.' },
//   { date: 'Aug 22, 2024 10:50:58', action: 'Edited by Ankit Mandli.' },
//   { date: 'Aug 22, 2024 10:50:58', action: 'Edited by Ankit Mandli.' },
//   { date: 'Aug 22, 2024 10:50:58', action: 'Edited by Ankit Mandli.' },
//   { date: 'Aug 22, 2024 10:50:58', action: 'Edited by Ankit Mandli.' },
// ];

// export function ViewLogPopover({ row, title, open, onClose, ...other }) {
//   return (
//     <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
//       <DialogTitle sx={{ pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Iconify
//           sx={{ color: 'green', width: '24px', height: '24px' }}
//           icon="lets-icons:check-fill"
//         />
//         {title}
//       </DialogTitle>

//       <DialogContent>
//         <Typography variant="h6" sx={{ color: 'grey.800', mb: 1 }}>
//           Custom Variable: {row.variableName}
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
//                 <Typography fontSize="12px" color="text.secondary" sx={{ ml: '20px' }}>
//                   {log.action}
//                 </Typography>
//               </Box>
//               {index < editLogs.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </Box>
//       </DialogContent>

//       <DialogActions>
//         <Button variant="contained" onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// view_log_popover.jsx

// import React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import { Iconify } from 'src/components/iconify';

// // Mock data for edit logs
// const editLogs = [
//   { date: 'Oct 13, 2024 13:05:58', action: 'Edited by Anand Nayak.' },
//   { date: 'Oct 13, 2024 12:59:44', action: 'Edited by Anand Nayak.' },
//   { date: 'Oct 06, 2024 13:29:22', action: 'Workflow disabled by Ankit Mandli.' },
//   { date: 'Oct 06, 2024 13:29:19', action: 'Workflow enabled by Ankit Mandli.' },
//   { date: 'Oct 02, 2024 16:13:16', action: 'Edited by Ankit Mandli.' },
//   { date: 'Oct 22, 2024 10:50:58', action: 'Edited by Ankit Mandli.' },
// ];

// export function ViewLogPopover({ title, open, onClose, variableName, ...other }) {
//   return (
//     <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
//       <DialogTitle sx={{ pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Iconify
//           sx={{ color: 'green', width: '24px', height: '24px' }}
//           icon="lets-icons:check-fill"
//         />
//         {title}
//       </DialogTitle>

//       <DialogContent>
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
//                 <Typography fontSize="12px" color="text.secondary" sx={{ ml: '20px' }}>
//                   {log.action}
//                 </Typography>
//               </Box>
//               {index < editLogs.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </Box>
//       </DialogContent>

//       <DialogActions>
//         <Button variant="contained" onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// view_log_popover.jsx

// import React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import { Iconify } from 'src/components/iconify';

// // Mock data for edit logs
// const editLogs = [
//   { date: 'Sep 13, 2024 13:05:58', action: 'Edited by Ankit Mandli.' },
//   { date: 'Sep 13, 2024 12:59:44', action: 'Edited by Ankit Mandli.' },
//   { date: 'Sep 06, 2024 13:29:22', action: 'Workflow disabled by Ankit Mandli.' },
//   { date: 'Sep 06, 2024 13:29:19', action: 'Workflow enabled by Ankit Mandli.' },
//   { date: 'Sep 02, 2024 16:13:16', action: 'Edited by Ankit Mandli.' },
//   { date: 'Aug 22, 2024 10:50:58', action: 'Edited by Ankit Mandli.' },
// ];

// export function ViewLogPopover({ title, open, onClose, variableName, ...other }) {
//   return (
//     <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
//       <DialogTitle sx={{ pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Iconify
//           sx={{ color: 'green', width: '24px', height: '24px' }}
//           icon="lets-icons:check-fill"
//         />
//         {title}
//       </DialogTitle>

//       <DialogContent>
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
//                 <Typography fontSize="12px" color="text.secondary" sx={{ ml: '20px' }}>
//                   {log.action}
//                 </Typography>
//               </Box>
//               {index < editLogs.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </Box>
//       </DialogContent>

//       <DialogActions>
//         <Button variant="contained" onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import { Iconify } from 'src/components/iconify';
// import { useTheme } from '@mui/material/styles';

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
//   const theme = useTheme();
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setSnackbarMessage('Data copied successfully!');
//       setSnackbarOpen(true);
//     });
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbarOpen(false);
//   };

//   return (
//     <>
//       <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
//         <DialogTitle
//           sx={{
//             pb: 2,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: 1,
//           }}
//         >
//           <Iconify
//             sx={{ color: 'green', width: '24px', height: '24px' }}
//             icon="lets-icons:check-fill"
//           />
//           {title}
//         </DialogTitle>

//         <DialogContent sx={{ textAlign: 'center' }}>
//           <Typography variant="h6" sx={{ color: 'grey.800', mb: 1 }}>
//             Custom Variable: {variableName}
//           </Typography>

//           <Typography variant="body2" gutterBottom>
//             View update log for last 50 changes.
//           </Typography>

//           <Box
//             sx={{
//               maxHeight: 400,
//               overflowY: 'auto',
//               mt: 2,
//               border: '1px solid #919eab33',
//               borderRadius: 1,
//             }}
//           >
//             {editLogs.map((log, index) => (
//               <React.Fragment key={index}>
//                 <Box sx={{ p: 1.5 }}>
//                   <Typography
//                     display="flex"
//                     fontSize="14px"
//                     color="text.secondary"
//                     alignItems="center"
//                   >
//                     <Iconify
//                       icon="icon-park-solid:time"
//                       sx={{ width: '15px', height: '15px', mr: '5px' }}
//                     />
//                     {log.date}
//                   </Typography>

//                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Iconify icon="material-symbols:circle" sx={{ fontSize: 6, mr: 1 }} />
//                     <Typography
//                       fontSize="12px"
//                       color="text.secondary"
//                       sx={{ textAlign: 'right', mr: 2 }}
//                     >
//                       {log.action}
//                     </Typography>

//                   </Box>

//                   <Box
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       pl: 3,
//                       mt: 1,
//                       position: 'relative',
//                     }}
//                   >
//                     <Iconify icon="material-symbols:circle" sx={{ fontSize: 6, mr: 1 }} />
//                     <Typography fontSize="12px" color="text.secondary">
//                       Old Data: {log.oldData}
//                     </Typography>
//                     <IconButton
//                       className="copy-button"
//                       color="default"
//                       onClick={() => handleCopy(log.oldData)}
//                       sx={{
//                         width: '20px',
//                         height: '20px',
//                         opacity: 0,
//                         transition: 'opacity 0.3s',
//                         ml: 'auto',
//                         '&:hover': { opacity: 1 }, // Show on hover
//                       }}
//                     >
//                       <Iconify width={18} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
//                     </IconButton>
//                   </Box>

//                   <Box
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       pl: 3,
//                       mt: 1,
//                       position: 'relative',
//                     }}
//                   >
//                     <Iconify icon="material-symbols:circle" sx={{ fontSize: 6, mr: 1 }} />
//                     <Typography fontSize="12px" color="text.secondary">
//                       New Data: {log.newData}
//                     </Typography>
//                     <IconButton
//                       className="copy-button"
//                       color="default"
//                       onClick={() => handleCopy(log.newData)}
//                       sx={{
//                         width: '20px',
//                         height: '20px',
//                         opacity: 0,
//                         transition: 'opacity 0.3s',
//                         ml: 'auto',
//                         '&:hover': { opacity: 1 }, // Show on hover
//                       }}
//                     >
//                       <Iconify width={18} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
//                     </IconButton>
//                   </Box>
//                 </Box>
//                 {index < editLogs.length - 1 && <Divider />}
//               </React.Fragment>
//             ))}
//           </Box>
//         </DialogContent>

//         <DialogActions sx={{ justifyContent: 'center' }}>
//           <Button variant="contained" onClick={onClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for copy confirmation */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={5000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{ boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)', mt: 13 }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           sx={{
//             width: '100%',
//             fontSize: '14px',
//             fontWeight: 'bold',
//             backgroundColor: theme.palette.background.paper,
//             color: theme.palette.text.primary,
//           }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Iconify } from 'src/components/iconify';

// Mock data for edit logs with old and new data
const editLogs = [
  {
    date: 'Oct 10, 2024 11:17:28',
    action: 'Changed by Anand Nayak',
    oldData: 'fdhfgh',
    newData: 'new_fdhfgh',
  },
  // Add more logs as needed
];

export function ViewLogPopover({ title, open, onClose, variableName, ...other }) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Data copied successfully!');
    });
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle
        sx={{
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Iconify
          sx={{ color: 'green', width: '24px', height: '24px' }}
          icon="lets-icons:check-fill"
        />
        {title}
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'grey.800', mb: 1 }}>
          Custom Variable: {variableName}
        </Typography>

        <Typography variant="body2" gutterBottom>
          View update log for last 50 changes.
        </Typography>
        <Box
          sx={{
            maxHeight: 400,
            overflowY: 'auto',
            mt: 2,
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
                  {log.date}
                </Typography>
                <Typography
                  fontSize="12px"
                  color="text.secondary"
                  align="left"
                  sx={{ ml: '20px', mt: 1 }}
                >
                  {log.action}
                </Typography>
                <Box sx={{ ml: '20px', mt: 1 }}>
                  <Typography
                    fontSize="12px"
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                  >
                    Old Data: {log.oldData}
                    <Tooltip title="Copy old data" placement="top">
                      <Iconify
                        icon="far fa-copy"
                        sx={{ ml: 1, cursor: 'pointer' }}
                        onClick={() => handleCopy(log.oldData)}
                      />
                    </Tooltip>
                  </Typography>
                  <Typography
                    fontSize="12px"
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    New Data: {log.newData}
                    <Tooltip title="Copy new data" placement="top">
                      <Iconify
                        icon="far fa-copy"
                        sx={{ ml: 1, cursor: 'pointer' }}
                        onClick={() => handleCopy(log.newData)}
                      />
                    </Tooltip>
                  </Typography>
                </Box>
              </Box>
              {index < editLogs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
