// import { useTheme } from '@emotion/react';
// import React, { useState, useEffect, useCallback } from 'react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import {
//   Box,
//   Alert,
//   Divider,
//   Tooltip,
//   Snackbar,
//   MenuItem,
//   TextField,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// // ----------------------------------------------------------------------

// export function UpdateWebhookDialog({ title, content, action, open, onClose, initialData }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();

//   const [EventList, setEventList] = useState('');
//   const [webhookName, setWebhookName] = useState('');
//   const [webhookUrl, setWebhookUrl] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const [nameError, setNameError] = useState(false);
//   const [urlError, setUrlError] = useState(false);
//   const [eventError, setEventError] = useState(false);

//   useEffect(() => {
//     if (initialData) {
//       setWebhookName(initialData.webhook_name || '');
//       setWebhookUrl(initialData.webhook_url || '');
//       setEventList(initialData.webhook_event || '');
//     }
//   }, [initialData]);

//   // Cleanup function to reset all fields and errors
//   const resetForm = () => {
//     setWebhookName('');
//     setWebhookUrl('');
//     setEventList('');
//     setNameError(false);
//     setUrlError(false);
//     setEventError(false);
//   };

//   const handleAdd = () => {
//     // Reset error states
//     setNameError(false);
//     setUrlError(false);
//     setEventError(false);

//     // Validate fields
//     let hasError = false;

//     if (!webhookName) {
//       setNameError(true);
//       hasError = true;
//     }
//     if (!webhookUrl) {
//       setUrlError(true);
//       hasError = true;
//     }
//     if (!EventList) {
//       setEventError(true);
//       hasError = true;
//     }

//     // If any field has an error, return early
//     if (hasError) {
//       return;
//     }

//     // Proceed if no errors
//     setSnackbarOpen(true);
//     onClose(); // Close the dialog
//     resetForm(); // Reset the form fields
//   };

//   const handleDialogClose = () => {
//     onClose(); // Close the dialog
//     resetForm(); // Reset the form when dialog is closed
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   const handleChangeContactList = useCallback((event) => {
//     setEventList(event.target.value);
//     setEventError(false); // Clear the error when a valid option is selected
//   }, []);

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleDialogClose} // Close and reset the form
//         PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//       >
//         <DialogTitle
//           sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//           onClick={dialog.onFalse}
//         >
//           {title}
//           <Iconify
//             onClick={handleDialogClose} // Close and reset the form
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
//             error={nameError}
//             helperText={nameError ? 'Webhook Name is required.' : ''}
//             value={webhookName}
//             onChange={(e) => {
//               setWebhookName(e.target.value);
//               setNameError(false); // Clear the error when the user types in this field
//             }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <Tooltip
//                     title="Enter webhook name here."
//                     arrow
//                     placement="top"
//                     sx={{
//                       fontSize: '16px', // Adjust the font size as needed
//                     }}
//                   >
//                     <Iconify
//                       icon="material-symbols:info-outline"
//                       style={{ width: 20, height: 20 }}
//                     />
//                   </Tooltip>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Box display="flex" flexDirection="column" gap={2}>
//             <TextField
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Webhook URL"
//               error={urlError}
//               helperText={urlError ? 'Webhook URL is required.' : ''}
//               value={webhookUrl}
//               onChange={(e) => {
//                 setWebhookUrl(e.target.value);
//                 setUrlError(false); // Clear the error when the user types in this field
//               }}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Tooltip
//                       title="Ensure that the webhook URL is correct."
//                       arrow
//                       placement="top"
//                       sx={{
//                         fontSize: '16px', // Adjust the font size as needed
//                       }}
//                     >
//                       <Iconify
//                         icon="material-symbols:info-outline"
//                         style={{ width: 20, height: 20 }}
//                       />
//                     </Tooltip>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <TextField
//               sx={{ width: '100%' }}
//               variant="outlined"
//               select
//               fullWidth
//               label="Webhook Event"
//               value={EventList}
//               onChange={handleChangeContactList}
//               error={eventError}
//               helperText={eventError ? 'Webhook Event is required.' : ''}
//               InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
//               inputProps={{ id: `outlined-select-currency-label` }}
//             >
//               {[
//                 { value: 'New Workflow Error', label: 'New Workflow Error' },
//                 { value: 'Task Usage Limit Reached', label: 'Task Usage Limit Reached' },
//                 { value: 'Task Usage Limit Exhausted', label: 'Task Usage Limit Exhausted' },
//               ].map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAdd} variant="contained" color="primary">
//             {action}
//           </Button>
//           <Button onClick={handleDialogClose} variant="outlined" color="inherit">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={1000}
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
//           Webhook Updated Successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import { useTheme } from '@emotion/react';
import React, { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  Alert,
  Divider,
  Tooltip,
  Snackbar,
  MenuItem,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function UpdateWebhookDialog({ title, content, action, open, onClose, initialData }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const [EventList, setEventList] = useState('');
  const [webhookName, setWebhookName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [eventError, setEventError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setWebhookName(initialData.webhook_name || '');
      setWebhookUrl(initialData.webhook_url || '');
      setEventList(initialData.webhook_event || '');
    }
  }, [initialData]);

  // Cleanup function to reset all fields and errors
  const resetForm = () => {
    setNameError(false);
    setUrlError(false);
    setEventError(false);
  };

  const handleAdd = () => {
    // Reset error states
    setNameError(false);
    setUrlError(false);
    setEventError(false);

    // Validate fields
    let hasError = false;

    if (!webhookName) {
      setNameError(true);
      hasError = true;
    }
    if (!webhookUrl) {
      setUrlError(true);
      hasError = true;
    }
    if (!EventList) {
      setEventError(true);
      hasError = true;
    }

    // If any field has an error, return early
    if (hasError) {
      return;
    }

    // Proceed if no errors
    setSnackbarOpen(true);
    onClose(); // Close the dialog
    resetForm(); // Reset error states
  };

  const handleDialogClose = () => {
    onClose(); // Close the dialog without resetting form data
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChangeContactList = useCallback((event) => {
    setEventList(event.target.value);
    setEventError(false); // Clear the error when a valid option is selected
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialogClose} // Close but retain form data
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          {title}
          <Iconify
            onClick={handleDialogClose} // Close but retain form data
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
            error={nameError}
            helperText={nameError ? 'Webhook Name is required.' : ''}
            value={webhookName}
            onChange={(e) => {
              setWebhookName(e.target.value);
              setNameError(false); // Clear the error when the user types in this field
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter webhook name here."
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px', // Adjust the font size as needed
                    }}
                  >
                    <Iconify
                      icon="material-symbols:info-outline"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Webhook URL"
              error={urlError}
              helperText={urlError ? 'Webhook URL is required.' : ''}
              value={webhookUrl}
              onChange={(e) => {
                setWebhookUrl(e.target.value);
                setUrlError(false); // Clear the error when the user types in this field
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Ensure that the webhook URL is correct."
                      arrow
                      placement="top"
                      sx={{
                        fontSize: '16px', // Adjust the font size as needed
                      }}
                    >
                      <Iconify
                        icon="material-symbols:info-outline"
                        style={{ width: 20, height: 20 }}
                      />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              sx={{ width: '100%' }}
              variant="outlined"
              select
              fullWidth
              label="Webhook Event"
              value={EventList}
              onChange={handleChangeContactList}
              error={eventError}
              helperText={eventError ? 'Webhook Event is required.' : ''}
              InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
              inputProps={{ id: `outlined-select-currency-label` }}
            >
              {[
                { value: 'New Workflow Error', label: 'New Workflow Error' },
                { value: 'Task Usage Limit Reached', label: 'Task Usage Limit Reached' },
                { value: 'Task Usage Limit Exhausted', label: 'Task Usage Limit Exhausted' },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            {action}
          </Button>
          <Button onClick={handleDialogClose} variant="outlined" color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
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
          Webhook Updated Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
