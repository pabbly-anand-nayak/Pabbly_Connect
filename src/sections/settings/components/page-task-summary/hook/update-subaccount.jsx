// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
// import { useState, useEffect, useCallback } from 'react';

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
//   Typography,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function UpdateSubaccountDialog({
//   title,
//   content,
//   action,
//   open,
//   onClose,
//   rowData,
//   ...other
// }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [contactList, setContactList] = useState('Select');
//   const [email, setEmail] = useState('');
//   const [tasks, setTasks] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   // Validation states
//   const [emailError, setEmailError] = useState(false);
//   const [tasksError, setTasksError] = useState(false);
//   const [contactListError, setContactListError] = useState(false);

//   // Populate the fields with rowData when the dialog opens
//   useEffect(() => {
//     if (rowData) {
//       setEmail(rowData.workflowName || ''); // Assuming workflowName is email in rowData
//       setTasks(rowData.totalQuantity || '');
//       setContactList(rowData.status === 'revocable' ? 'Revocable' : 'Non-Revocable');
//     }
//   }, [rowData]);

//   const handleAdd = () => {
//     // Validate fields
//     if (!email) setEmailError(true);
//     if (!tasks) setTasksError(true);
//     if (!contactList || contactList === 'Select') setContactListError(true);

//     // Only proceed if no validation errors
//     if (email && tasks && contactList && contactList !== 'Select') {
//       setSnackbarOpen(true);

//       setTimeout(() => {
//         handleClose(true); // Reset the form after successful task assignment
//       }, 500);
//     }
//   };

//   const handleChangeContactList = useCallback((event) => {
//     setContactList(event.target.value);
//     setContactListError(false); // Clear the error on change
//   }, []);

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   // Function to reset all the states (only when requested)
//   const handleClose = (clear = false) => {
//     if (clear) {
//       setEmail('');
//       setTasks('');
//       setContactList('Select');
//       setEmailError(false);
//       setTasksError(false);
//       setContactListError(false);
//     }
//     onClose(); // Close the dialog without clearing data unless explicitly told to
//   };

//   // Define common styles
//   const commonBoxStyle = { ml: '14px' };
//   const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 1, ml: '0px' };
//   const commonUlStyle = { paddingLeft: '15px', color: 'grey.600', fontSize: '12px' };
//   const commonLiStyle = {
//     marginBottom: '8px',
//     fontWeight: '500',
//     listStyleType: 'disc',
//     listStylePosition: 'outside',
//     color: '#637381',
//   };

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={() => handleClose()} // Do not clear data when closing the dialog by default
//         {...other}
//         PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//       >
//         <DialogTitle
//           sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//           onClick={dialog.onFalse}
//         >
//           Update Sub-account{' '}
//           <Iconify
//             onClick={() => handleClose()} // Close without clearing by default
//             icon="uil:times"
//             style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//           />
//         </DialogTitle>
//         <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

//         <DialogContent>
//           <Box display="flex" flexDirection="column" gap={2}>
//             <TextField
//               autoFocus
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Email Address"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 setEmailError(false); // Clear the error on change
//               }}
//               error={emailError}
//               helperText={
//                 emailError ? (
//                   'Email is required'
//                 ) : (
//                   <span>
//                     Ensure that the email address is already registered with Pabbly.{' '}
//                     <Link href="#" style={{ color: '#078DEE' }} underline="always">
//                       Learn more
//                     </Link>
//                   </span>
//                 )
//               }
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Tooltip title="sample@example.com" arrow placement="top">
//                       <Iconify
//                         icon="material-symbols:info-outline"
//                         style={{ width: 20, height: 20 }}
//                       />
//                     </Tooltip>
//                   </InputAdornment>
//                 ),
//               }}
//               disabled // This line disables the Email field
//             />
//             <TextField
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Number of tasks to be allotted"
//               value={tasks}
//               onChange={(e) => {
//                 setTasks(e.target.value);
//                 setTasksError(false); // Clear the error on change
//               }}
//               error={tasksError}
//               helperText={
//                 tasksError ? (
//                   'Number of tasks is required'
//                 ) : (
//                   <span>
//                     Enter the total number of tasks that should be assigned to the team.{' '}
//                     <Link href="#" style={{ color: '#078DEE' }} underline="always">
//                       Learn more
//                     </Link>
//                   </span>
//                 )
//               }
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Tooltip
//                       title="Enter the total number of tasks that should be assigned to the team."
//                       arrow
//                       placement="top"
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
//               id="select-currency-label-x"
//               variant="outlined"
//               select
//               fullWidth
//               label="Task Type"
//               value={contactList}
//               onChange={handleChangeContactList}
//               error={contactListError}
//               helperText={contactListError ? 'Task type is required' : <span />}
//             >
//               {[
//                 { value: 'Select', label: 'Select' },
//                 { value: 'Revocable', label: 'Revocable' },
//                 { value: 'Non-Revocable', label: 'Non-Revocable' },
//               ].map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Box>

//           <Box sx={commonBoxStyle}>
//             <Typography variant="subtitle1" sx={commonTypographyStyle}>
//               Points To Remember!
//             </Typography>
//             <ul style={commonUlStyle}>
//               <li style={commonLiStyle}>
//                 <span>Revocable means the task assigned can be revoked.</span>
//               </li>
//               <li style={commonLiStyle}>
//                 <span>Non-revocable means the task assigned cannot be revoked.</span>
//               </li>
//               <li style={commonLiStyle}>
//                 <span>
//                   Tasks will be deduct from your account immediately once you assign task to sub-
//                   accounts.
//                 </span>
//               </li>
//               <li style={commonLiStyle}>
//                 <span>The task will reset at 1st of every month for the sub-account holders.</span>
//               </li>
//               <li style={commonLiStyle}>
//                 <span>
//                   If you revoke the tasks from any sub-accounts, those tasks will be added to your
//                   account from the start of next month.
//                 </span>
//               </li>
//             </ul>
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAdd} variant="contained" color="primary">
//             Update
//           </Button>
//           <Button onClick={() => handleClose()} variant="outlined" color="inherit">
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
//           zIndex: theme.zIndex.modal + 10,
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
//           Assign Task Successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import { useTheme } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Alert,
  Button,
  Dialog,
  Divider,
  Tooltip,
  Snackbar,
  MenuItem,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function UpdateSubaccountDialog({ open, onClose, rowData }) {
  const [email, setEmail] = useState('');
  const theme = useTheme();

  const [tasks, setTasks] = useState('');
  const [contactList, setContactList] = useState('Select');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [tasksError, setTasksError] = useState(false);
  const [contactListError, setContactListError] = useState(false);

  // Populate the fields with rowData when the dialog opens
  useEffect(() => {
    if (rowData) {
      setEmail(rowData.workflowName || '');
      setTasks(rowData.totalQuantity || '');
      setContactList(rowData.status === 'revocable' ? 'Revocable' : 'Non-Revocable');
    }
  }, [rowData]);

  const handleAdd = () => {
    // Validate fields
    if (!email) setEmailError(true);
    if (!tasks) setTasksError(true);
    if (!contactList || contactList === 'Select') setContactListError(true);

    // Proceed if no validation errors
    if (email && tasks && contactList && contactList !== 'Select') {
      setSnackbarOpen(true);

      // Close the dialog after showing Snackbar
      setTimeout(() => {
        onClose(); // Just close the dialog without clearing form
      }, 500);
    }
  };

  const handleChangeContactList = useCallback((event) => {
    setContactList(event.target.value);
    setContactListError(false); // Clear the error on change
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} PaperProps={{ style: { minWidth: '600px' } }}>
        <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
          Update Sub-account
          <Iconify
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
            onClick={onClose}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              error={emailError}
              helperText={emailError ? 'Email is required' : 'Email associated with the workflow'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="sample@example.com" arrow placement="top">
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
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Number of tasks to be allotted"
              value={tasks}
              onChange={(e) => {
                setTasks(e.target.value);
                setTasksError(false);
              }}
              error={tasksError}
              helperText={
                tasksError ? 'Number of tasks is required' : 'Enter the total number of tasks'
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              select
              label="Task Type"
              value={contactList}
              onChange={handleChangeContactList}
              error={contactListError}
              helperText={contactListError ? 'Task type is required' : ''}
            >
              <MenuItem value="Select">Select</MenuItem>
              <MenuItem value="Revocable">Revocable</MenuItem>
              <MenuItem value="Non-Revocable">Non-Revocable</MenuItem>
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Update
          </Button>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 13,
          zIndex: theme.zIndex.modal + 10,
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
          Updated!
        </Alert>
      </Snackbar>
    </>
  );
}
