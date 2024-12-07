// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
// import React, { useState, useEffect, useCallback } from 'react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import {
//   Box,
//   Alert,
//   Divider,
//   Tooltip,
//   Snackbar,
//   TextField,
//   Autocomplete,
//   useMediaQuery,
//   DialogContent,
//   DialogActions,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function WebhookDialog({ open, onClose, mode = 'add', initialData = null, onSubmit }) {
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

//   // Reset form when dialog opens or closes
//   useEffect(() => {
//     if (open && initialData) {
//       setWebhookName(initialData.webhook_name || '');
//       setWebhookUrl(initialData.webhook_url || '');
//       setEventList(initialData.webhook_event || '');
//     }
//   }, [open, initialData]);

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

//   const handleSubmit = useCallback(() => {
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

//     // Prepare submission data
//     const webhookData = {
//       webhook_name: webhookName,
//       webhook_url: webhookUrl,
//       webhook_event: EventList,
//       ...(showTaskUsageBox && { tasks }),
//     };

//     // Call onSubmit prop with the data
//     onSubmit(webhookData);

//     // Show snackbar
//     setSnackbarOpen(true);

//     // Close dialog after a short delay
//     setTimeout(() => {
//       onClose();
//       resetForm();
//     }, 100);
//   }, [webhookName, webhookUrl, EventList, tasks, showTaskUsageBox, onClose, resetForm, onSubmit]);

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
//         PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//       >
//         <DialogTitle
//           sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//           onClick={dialog.onFalse}
//         >
//           {mode === 'add' ? 'Add Webhook' : 'Update Webhook'}
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
//             InputProps={
//               mode === 'update'
//                 ? {
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Tooltip
//                           title="Enter webhook name here."
//                           arrow
//                           placement="top"
//                           sx={{ fontSize: '16px' }}
//                         >
//                           <Iconify
//                             icon="material-symbols:info-outline"
//                             style={{ width: 20, height: 20 }}
//                           />
//                         </Tooltip>
//                       </InputAdornment>
//                     ),
//                   }
//                 : {}
//             }
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
//               InputProps={
//                 mode === 'update'
//                   ? {
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <Tooltip
//                             title="Ensure that the webhook URL is correct."
//                             arrow
//                             placement="top"
//                             sx={{ fontSize: '16px' }}
//                           >
//                             <Iconify
//                               icon="material-symbols:info-outline"
//                               style={{ width: 20, height: 20 }}
//                             />
//                           </Tooltip>
//                         </InputAdornment>
//                       ),
//                     }
//                   : {}
//               }
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
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             {mode === 'add' ? 'Add Webhook' : 'Update'}
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
//           {mode === 'add' ? 'Webhook URL added successfully!' : 'Webhook Updated Successfully!'}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import { useTheme } from '@emotion/react';
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Alert,
  Divider,
  Snackbar,
  TextField,
  Autocomplete,
  useMediaQuery,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function WebhookDialog({ open, onClose, initialData = null, mode = 'add' }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const [EventList, setEventList] = useState('');
  const [webhookName, setWebhookName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tasks, setTasks] = useState('');
  const [errors, setErrors] = useState({ name: false, url: false, event: false, tasks: false });
  const [showTaskUsageBox, setShowTaskUsageBox] = useState(false);

  const link_added = 'https://example.com'; // Replace with your dynamic value

  // Reset form when dialog opens or changes mode
  useEffect(() => {
    if (open) {
      if (initialData) {
        setWebhookName(initialData.workflowName || '');
        setWebhookUrl(initialData.webhookUrl || '');
        setEventList(initialData.webhookEvent || '');
        setTasks('');
      } else {
        resetForm();
      }
    }
  }, [open, initialData, mode]);

  const validateUrl = (url) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const resetForm = () => {
    setWebhookName('');
    setWebhookUrl('');
    setEventList('');
    setTasks('');
    setErrors({ name: false, url: false, event: false, tasks: false });
    setShowTaskUsageBox(false);
  };

  const handleSubmit = () => {
    const urlIsValid = validateUrl(webhookUrl);
    const updatedErrors = {
      name: !webhookName,
      url: !webhookUrl || !urlIsValid,
      event: !EventList,
      tasks: showTaskUsageBox && (!tasks || Number.isNaN(Number(tasks)) || tasks < 0),
    };
    setErrors(updatedErrors);

    if (Object.values(updatedErrors).some((error) => error)) {
      return;
    }

    setSnackbarOpen(true);

    setTimeout(() => {
      onClose();
      resetForm();
    }, 100);
  };

  const handleDialogClose = () => {
    onClose();
    resetForm();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChangeTasks = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setTasks(value);
      setErrors((prev) => ({ ...prev, tasks: false }));
    } else {
      setErrors((prev) => ({ ...prev, tasks: true }));
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          {mode === 'add' ? 'Add Webhook' : 'Update Webhook'}
          <Iconify
            onClick={handleDialogClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Webhook Name"
            placeholder="Enter webhook name here"
            error={errors.name}
            helperText={
              errors.name ? (
                'Webhook Name is required.'
              ) : (
                <span>
                  Enter the name of the webhook.{' '}
                  <LearnMoreLink link="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&t" />
                </span>
              )
            }
            value={webhookName}
            onChange={(e) => {
              setWebhookName(e.target.value);
              setErrors((prev) => ({ ...prev, name: false }));
            }}
          />

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Webhook URL"
              placeholder="Enter webhook URL here"
              error={errors.url}
              helperText={
                errors.url ? (
                  webhookUrl ? (
                    'Webhook URL is not valid.'
                  ) : (
                    'Webhook URL is required.'
                  )
                ) : (
                  <span>
                    Ensure that the webhook URL is correct.{' '}
                    <LearnMoreLink link="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&t" />
                  </span>
                )
              }
              value={webhookUrl}
              onChange={(e) => {
                const url = e.target.value;
                setWebhookUrl(url);
                setErrors((prev) => ({
                  ...prev,
                  url: url ? !validateUrl(url) : false,
                }));
              }}
            />

            <Autocomplete
              fullWidth
              options={[
                { value: 'New Workflow Error', label: 'New Workflow Error' },
                { value: 'Task Usage Limit Reached', label: 'Task Usage Limit Reached' },
                { value: 'Task Usage Limit Exhausted', label: 'Task Usage Limit Exhausted' },
              ]}
              getOptionLabel={(option) => option.label}
              value={EventList ? { value: EventList, label: EventList } : null}
              onChange={(event, newValue) => {
                setEventList(newValue ? newValue.value : '');
                setErrors((prev) => ({ ...prev, event: !newValue }));
                setShowTaskUsageBox(newValue && newValue.value === 'Task Usage Limit Reached');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: '100%' }}
                  variant="outlined"
                  label="Webhook Event"
                  placeholder="Select"
                  error={errors.event}
                  helperText={
                    errors.event ? (
                      'Webhook Event is required.'
                    ) : (
                      <span>
                        Select the event for which you want to be notified.{' '}
                        <LearnMoreLink link="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&t" />
                      </span>
                    )
                  }
                />
              )}
            />
          </Box>

          {showTaskUsageBox && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label="Monthly Task Usage Reached (%)"
                placeholder="Enter the monthly task usage percent value. E.g. 80"
                value={tasks}
                onChange={handleChangeTasks}
                error={errors.tasks}
                helperText={
                  errors.tasks
                    ? 'Enter the monthly task usage percent value. E.g. 80'
                    : 'Enter the monthly task usage value in percent for which you should be notified.'
                }
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {mode === 'add' ? 'Add Webhook' : 'Update'}
          </Button>
          <Button onClick={handleDialogClose} variant="outlined" color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 13,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {mode === 'add' ? 'Webhook URL added successfully!' : 'Webhook Updated Successfully!'}
        </Alert>
      </Snackbar>
    </>
  );
}
