// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
// import React, { useState, useCallback } from 'react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import {
//   Box,
//   Alert,
//   Divider,
//   Snackbar,
//   TextField,
//   DialogTitle,
//   Autocomplete,
//   DialogActions,
//   DialogContent,
//   useMediaQuery,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function AddWebhookDialog({ title, content, action, open, onClose, ...other }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();

//   const [EventList, setEventList] = useState('');
//   const [webhookName, setWebhookName] = useState('');
//   const [webhookUrl, setWebhookUrl] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [tasks, setTasks] = useState('');
//   const [errors, setErrors] = useState({ name: false, url: false, event: false, tasks: false });
//   const [showTaskUsageBox, setShowTaskUsageBox] = useState(false);

//   const validateUrl = (url) => {
//     if (!url) return false;
//     try {
//       const urlObj = new URL(url);
//       return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
//     } catch {
//       return false;
//     }
//   };

//   const resetForm = useCallback(() => {
//     setWebhookName('');
//     setWebhookUrl('');
//     setEventList('');
//     setTasks('');
//     setErrors({ name: false, url: false, event: false, tasks: false });
//     setShowTaskUsageBox(false);
//   }, []);

//   const handleAdd = useCallback(() => {
//     const urlIsValid = validateUrl(webhookUrl);
//     const updatedErrors = {
//       name: !webhookName,
//       url: !webhookUrl || !urlIsValid,
//       event: !EventList,
//       tasks: showTaskUsageBox && (!tasks || Number.isNaN(Number(tasks)) || tasks < 0),
//     };
//     setErrors(updatedErrors);

//     if (Object.values(updatedErrors).some((error) => error)) {
//       return;
//     }

//     setSnackbarOpen(true);

//     setTimeout(() => {
//       onClose();
//       setTimeout(resetForm, 100);
//     }, 100);
//   }, [webhookName, webhookUrl, EventList, tasks, showTaskUsageBox, onClose, resetForm]);

//   const handleDialogClose = useCallback(() => {
//     onClose();
//     resetForm();
//   }, [onClose, resetForm]);

//   const handleSnackbarClose = useCallback((event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   }, []);

//   const handleChangeContactList = useCallback((event) => {
//     setEventList(event.target.value);
//     setErrors((prev) => ({ ...prev, event: false }));
//   }, []);

//   const handleChangeTasks = useCallback((event) => {
//     const { value } = event.target;
//     if (/^\d*$/.test(value)) {
//       setTasks(value);
//       setErrors((prev) => ({ ...prev, tasks: false }));
//     } else {
//       setErrors((prev) => ({ ...prev, tasks: true }));
//     }
//   }, []);

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleDialogClose}
//         {...other}
//         PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//       >
//         <DialogTitle
//           sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//           onClick={dialog.onFalse}
//         >
//           Add Webhook
//           <Iconify
//             onClick={handleDialogClose}
//             icon="uil:times"
//             style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//           />
//         </DialogTitle>
//         <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

//         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//           <TextField
//             autoFocus
//             fullWidth
//             type="text"
//             margin="dense"
//             variant="outlined"
//             label="Webhook Name"
//             placeholder="Enter webhook name here"
//             error={errors.name}
//             helperText={
//               errors.name ? (
//                 'Webhook Name is required.'
//               ) : (
//                 <span>
//                   Enter the name of the webhook.{' '}
//                   <Link
//                     href="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&t"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ color: '#078DEE' }}
//                     underline="always"
//                   >
//                     Learn more
//                   </Link>
//                 </span>
//               )
//             }
//             value={webhookName}
//             onChange={(e) => {
//               setWebhookName(e.target.value);
//               setErrors((prev) => ({ ...prev, name: false }));
//             }}
//           />

//           <Box display="flex" flexDirection="column" gap={2}>
//             <TextField
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Webhook URL"
//               placeholder="Enter webhook URL here"
//               error={errors.url}
//               helperText={
//                 errors.url ? (
//                   webhookUrl ? (
//                     'Webhook URL is not valid.'
//                   ) : (
//                     'Webhook URL is required.'
//                   )
//                 ) : (
//                   <span>
//                     Ensure that the webhook URL is correct.{' '}
//                     <Link
//                       href="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&t"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{ color: '#078DEE' }}
//                       underline="always"
//                     >
//                       Learn more
//                     </Link>
//                   </span>
//                 )
//               }
//               value={webhookUrl}
//               onChange={(e) => {
//                 const url = e.target.value;
//                 setWebhookUrl(url);
//                 setErrors((prev) => ({
//                   ...prev,
//                   url: url ? !validateUrl(url) : false,
//                 }));
//               }}
//             />

//             <Autocomplete
//               fullWidth
//               options={[
//                 { value: 'New Workflow Error', label: 'New Workflow Error' },
//                 { value: 'Task Usage Limit Reached', label: 'Task Usage Limit Reached' },
//                 { value: 'Task Usage Limit Exhausted', label: 'Task Usage Limit Exhausted' },
//               ]}
//               getOptionLabel={(option) => option.label}
//               value={EventList ? { value: EventList, label: EventList } : null}
//               onChange={(event, newValue) => {
//                 setEventList(newValue ? newValue.value : '');
//                 setErrors((prev) => ({ ...prev, event: !newValue }));
//                 setShowTaskUsageBox(newValue && newValue.value === 'Task Usage Limit Reached');
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   sx={{ width: '100%' }}
//                   variant="outlined"
//                   label="Webhook Event"
//                   placeholder="Select"
//                   error={errors.event}
//                   helperText={
//                     errors.event ? (
//                       'Webhook Event is required.'
//                     ) : (
//                       <span>
//                         Select the event for which you want to be notified.{' '}
//                         <Link
//                           href="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&t"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{ color: '#078DEE' }}
//                           underline="always"
//                         >
//                           Learn more
//                         </Link>
//                       </span>
//                     )
//                   }
//                 />
//               )}
//             />
//           </Box>

//           {showTaskUsageBox && (
//             <Box display="flex" flexDirection="column" gap={2}>
//               <TextField
//                 fullWidth
//                 type="text"
//                 margin="dense"
//                 variant="outlined"
//                 label="Monthly Task Usage Reached (%)"
//                 placeholder="Enter the monthly task usage percent value. E.g. 80"
//                 value={tasks}
//                 onChange={handleChangeTasks}
//                 error={errors.tasks}
//                 helperText={
//                   errors.tasks
//                     ? 'Enter the monthly task usage percent value. E.g. 80'
//                     : 'Enter the monthly task usage value in percent for which you should be notified.'
//                 }
//               />
//             </Box>
//           )}
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAdd} variant="contained" color="primary">
//             Add Webhook
//           </Button>
//           <Button onClick={handleDialogClose} variant="outlined" color="inherit">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={handleSnackbarClose}
//         Z-index={100}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{
//           boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//           mt: 13,
//         }}
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
//           Webhook URL added successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

// --------------------------------------------------
import React from 'react';

import { WebhookDialog } from './webhook_dialog_component';

export function AddWebhookDialog({ open, onClose }) {
  const handleAddWebhook = (webhookData) => {
    // Add your logic to handle adding a new webhook
    console.log('Adding webhook:', webhookData);
  };

  return <WebhookDialog open={open} onClose={onClose} mode="add" onSubmit={handleAddWebhook} />;
}
