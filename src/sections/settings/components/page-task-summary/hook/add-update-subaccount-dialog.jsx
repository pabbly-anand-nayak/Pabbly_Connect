// import { useTheme } from '@emotion/react';
// import { useState, useEffect } from 'react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import {
//   Box,
//   List,
//   Divider,
//   TextField,
//   Typography,
//   Autocomplete,
//   useMediaQuery,
//   InputAdornment,
//   CircularProgress,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';
// import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
// import {
//   listItemCustomStyle,
//   commonBulletListStyle,
// } from 'src/components/bullet-list-style/bullet-list-style';

// export function AddUpdateSubAccountDialog({
//   title,
//   actionLabel,
//   open,
//   onClose,
//   rowData,
//   isUpdate = false,
//   ...other
// }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [contactList, setContactList] = useState('Select');
//   const [email, setEmail] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState(
//     isUpdate ? 'Task Updated Successfully!' : 'Task Assigned Successfully!'
//   );
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   const [emailError, setEmailError] = useState(false);
//   const [contactListError, setContactListError] = useState(false);

//   const [tasks, setTasks] = useState('');
//   const [tasksError, setTasksError] = useState(false);

//   useEffect(() => {
//     if (open && rowData && isUpdate) {
//       setTasks(String(rowData?.tasksAssigned || '10000'));
//       setTasksError(false);
//     }
//   }, [open, rowData, isUpdate]);

//   // Function to handle number input and formatting
//   const handleTasksInput = (value) => {
//     // Remove commas and validate numeric input
//     const numericValue = value.replace(/,/g, '');
//     if (!/^\d*$/.test(numericValue)) {
//       setTasksError(true);
//       return;
//     }

//     // Format with commas
//     const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     setTasks(formattedValue);
//     setTasksError(false);
//   };

//   useEffect(() => {
//     if (open && rowData && isUpdate) {
//       setEmail(rowData?.workflowName || '');
//       setTasks(String(rowData?.tasksAssigned || '10000'));
//       setContactList(rowData?.status?.toLowerCase() || 'Select');

//       setEmailError(false);
//       setTasksError(false);
//       setContactListError(false);
//     }
//   }, [open, rowData, isUpdate]);

//   const handleAction = () => {
//     setIsLoading(true);

//     const emailErrorStatus = !email;
//     const tasksErrorStatus = !tasks;
//     const contactListErrorStatus = !contactList || contactList === 'Select';

//     setEmailError(emailErrorStatus);
//     setTasksError(tasksErrorStatus);
//     setContactListError(contactListErrorStatus);

//     if (emailErrorStatus || tasksErrorStatus || contactListErrorStatus) {
//       setIsLoading(false);
//       return;
//     }

//     setTimeout(() => {
//       setSnackbarOpen(true);
//       handleClose();
//       setIsLoading(false);
//     }, 1200);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleClose = () => {
//     setEmail('');
//     setTasks('');
//     setContactList('Select');
//     onClose();
//   };

//   const handleChangeContactList = (event, newValue) => {
//     setContactList(newValue);
//     setContactListError(!newValue || newValue === 'Select');
//   };

//   const options = [
//     { value: 'revocable', label: 'Revocable' },
//     { value: 'non-revocable', label: 'Non-Revocable' },
//   ];

//   const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 0, ml: '0px' };

//   const [isLoading, setIsLoading] = useState(false);

//   const [setErrors] = useState({ tasks: false });

//   const MIN_TASKS = 1;

//   const handleIncrement = () => {
//     const currentValue = Number(tasks) || 0;
//     setTasks((currentValue + MIN_TASKS).toString());
//     setErrors((prev) => ({ ...prev, tasks: false }));
//   };

//   const handleDecrement = () => {
//     const currentValue = Number(tasks) || 0;
//     if (currentValue >= MIN_TASKS * 2) {
//       setTasks((currentValue - MIN_TASKS).toString());
//     }
//     setErrors((prev) => ({ ...prev, tasks: false }));
//   };

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         {...other}
//         PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//       >
//         <DialogTitle
//           sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//           onClick={dialog.onFalse}
//         >
//           {title}
//           <Iconify
//             onClick={handleClose}
//             icon="uil:times"
//             style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//           />
//         </DialogTitle>
//         <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

//         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//           <TextField
//             autoFocus
//             fullWidth
//             type="email"
//             margin="dense"
//             variant="outlined"
//             label="Email Address"
//             placeholder="sample@example.com"
//             value={email}
//             onChange={(e) => {
//               const { value } = e.target;
//               const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//               setEmail(value);
//               setEmailError(value && !emailRegex.test(value));
//             }}
//             error={emailError}
//             helperText={
//               emailError
//                 ? email
//                   ? 'Please enter a valid email address.'
//                   : 'Email is required'
//                 : 'Ensure that the email address is already registered with Pabbly.'
//             }
//           />
//           <Box display="flex" flexDirection="column" gap={2}>
//             {/* Number of tasks to be allotted */}
//             <TextField
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Number of tasks to be allotted"
//               placeholder="1,000"
//               value={tasks}
//               onChange={(e) => handleTasksInput(e.target.value)}
//               error={tasksError}
//               helperText={
//                 tasksError
//                   ? 'Please enter a valid number for tasks.'
//                   : 'Enter the total number of tasks to assign.'
//               }
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <div
//                         style={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           // border: '1px solid #ccc',
//                           // borderRadius: '4px',
//                           overflow: 'hidden',
//                         }}
//                       >
//                         <Button
//                           onClick={handleIncrement}
//                           style={{
//                             border: 'none',
//                             // borderBottom: '1px solid #ccc',
//                             padding: '1px 4px',
//                             // background: 'white',
//                             cursor: 'pointer',
//                             height: '14px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             minWidth: 'unset',
//                           }}
//                         >
//                           <span style={{ fontSize: '10px', lineHeight: 1 }}>▲</span>
//                         </Button>
//                         {/* <Divider /> */}
//                         <Button
//                           onClick={handleDecrement}
//                           style={{
//                             border: 'none',
//                             padding: '1px 4px',
//                             // background: 'white',
//                             cursor: 'pointer',
//                             height: '14px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             minWidth: 'unset',
//                           }}
//                         >
//                           <span style={{ fontSize: '10px', lineHeight: 1 }}>▼</span>
//                         </Button>
//                       </div>
//                     </Box>
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiInputBase-input': {
//                   textAlign: 'left',
//                 },
//               }}
//             />

//             {/* Task type */}
//             <Autocomplete
//               options={options}
//               getOptionLabel={(option) => option.label}
//               value={options.find((option) => option.value === contactList) || null}
//               onChange={(event, newValue) => handleChangeContactList(event, newValue?.value)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Task Type"
//                   placeholder="Select"
//                   variant="outlined"
//                   error={contactListError}
//                   helperText={contactListError ? 'Task type is required' : 'Select the task type.'}
//                   fullWidth
//                 />
//               )}
//             />
//           </Box>

//           {/* Points To Remember! */}
//           <Box sx={{ ml: '14px' }}>
//             <Typography variant="subtitle1" sx={commonTypographyStyle}>
//               Points To Remember!
//             </Typography>
//             <List sx={{ ...commonBulletListStyle, mb: 0 }}>
//               <ul style={commonBulletListStyle}>
//                 {[
//                   'Revocable means the task assigned can be revoked.',
//                   'Non-revocable means the task assigned cannot be revoked.',
//                   'Tasks will be deduct from your account immediately once you assign task to sub-accounts.',
//                   'The task will reset at 1st of every month for the sub-account holders.',
//                   'If you revoke the tasks from any sub-accounts, those tasks will be added to your account from the start of next month.',
//                 ].map((text, index) => (
//                   <li key={index} style={{ ...listItemCustomStyle, marginBottom: 4 }}>
//                     <span style={{ fontSize: '12px' }}>{text}</span>
//                   </li>
//                 ))}
//               </ul>
//             </List>
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAction} variant="contained" color="primary" disabled={isLoading}>
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : actionLabel}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <CustomSnackbar
//         open={snackbarOpen}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//         severity={snackbarSeverity}
//       />
//     </>
//   );
// }

// ------------------------------------------------

// import { useTheme } from '@emotion/react';
// import { useState, useEffect } from 'react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import {
//   Box,
//   List,
//   Divider,
//   TextField,
//   Typography,
//   Autocomplete,
//   useMediaQuery,
//   InputAdornment,
//   CircularProgress,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';
// import SpinButton from 'src/components/custom-spin-button/custom-spin-button';
// import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
// import {
//   listItemCustomStyle,
//   commonBulletListStyle,
// } from 'src/components/bullet-list-style/bullet-list-style';

// export function AddUpdateSubAccountDialog({
//   title,
//   actionLabel,
//   open,
//   onClose,
//   rowData,
//   isUpdate = false,
//   ...other
// }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [contactList, setContactList] = useState('Select');
//   const [email, setEmail] = useState('');
//   const [tasks, setTasks] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [contactListError, setContactListError] = useState(false);
//   const [tasksError, setTasksError] = useState(false);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState(
//     isUpdate ? 'Task Updated Successfully!' : 'Task Assigned Successfully!'
//   );

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   useEffect(() => {
//     if (open && rowData && isUpdate) {
//       setTasks(String(rowData?.tasksAssigned || '10000'));
//       setEmail(rowData?.workflowName || '');
//       setContactList(rowData?.status?.toLowerCase() || 'Select');
//     } else {
//       // Reset fields when dialog is reopened
//       setEmail('');
//       setTasks('');
//       setContactList('Select');
//       setEmailError(false);
//       setTasksError(false);
//       setContactListError(false);
//     }
//   }, [open, rowData, isUpdate]);

//   const handleTasksInput = (value) => {
//     const numericValue = value.replace(/,/g, '');
//     if (!/^\d*$/.test(numericValue)) {
//       setTasksError(true);
//       return;
//     }
//     const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     setTasks(formattedValue);
//     setTasksError(false);
//   };

//   const handleAction = () => {
//     setIsLoading(true);

//     const emailErrorStatus = !email;
//     const tasksErrorStatus = !tasks;
//     const contactListErrorStatus = !contactList || contactList === 'Select';

//     setEmailError(emailErrorStatus);
//     setTasksError(tasksErrorStatus);
//     setContactListError(contactListErrorStatus);

//     if (emailErrorStatus || tasksErrorStatus || contactListErrorStatus) {
//       setIsLoading(false);
//       return;
//     }

//     setTimeout(() => {
//       setIsLoading(false);
//       onClose();
//     }, 1200);
//   };

//   const [setErrors] = useState({ tasks: false });
//   const MIN_TASKS = 1;

//   const handleIncrement = () => {
//     const currentValue = Number(tasks) || 0;
//     setTasks((currentValue + MIN_TASKS).toString());
//     setErrors((prev) => ({ ...prev, tasks: false }));
//   };

//   const handleDecrement = () => {
//     const currentValue = Number(tasks) || 0;
//     if (currentValue >= MIN_TASKS * 2) {
//       setTasks((currentValue - MIN_TASKS).toString());
//     }
//     setErrors((prev) => ({ ...prev, tasks: false }));
//   };

//   const handleClose = () => {
//     setEmail('');
//     setTasks('');
//     setContactList('Select');
//     onClose();
//   };

//   const handleChangeContactList = (event, newValue) => {
//     setContactList(newValue);
//     setContactListError(!newValue || newValue === 'Select');
//   };

//   const options = [
//     { value: 'revocable', label: 'Revocable' },
//     { value: 'non-revocable', label: 'Non-Revocable' },
//   ];

//   const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 0, ml: '0px' };

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         {...other}
//         PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//       >
//         <DialogTitle
//           sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//           onClick={dialog.onFalse}
//         >
//           {title}
//           <Iconify
//             onClick={handleClose}
//             icon="uil:times"
//             style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//           />
//         </DialogTitle>
//         <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

//         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//           <TextField
//             autoFocus
//             fullWidth
//             type="email"
//             margin="dense"
//             variant="outlined"
//             label="Email Address"
//             placeholder="sample@example.com"
//             value={email}
//             onChange={(e) => {
//               const { value } = e.target;
//               const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//               setEmail(value);
//               setEmailError(value && !emailRegex.test(value));
//             }}
//             error={emailError}
//             helperText={
//               emailError
//                 ? email
//                   ? 'Please enter a valid email address.'
//                   : 'Email is required'
//                 : 'Ensure that the email address is already registered with Pabbly.'
//             }
//           />
//           <Box display="flex" flexDirection="column" gap={2}>
//             {/* Number of tasks to be allotted */}
//             <TextField
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Number of tasks to be allotted"
//               placeholder="1,000"
//               value={tasks}
//               onChange={(e) => handleTasksInput(e.target.value)}
//               error={tasksError}
//               helperText={
//                 tasksError
//                   ? 'Please enter a valid number for tasks.'
//                   : 'Enter the total number of tasks to assign.'
//               }
//               InputProps={{
//                 endAdornment: (
//                   <SpinButton
//                     onIncrement={handleIncrement}
//                     onDecrement={handleDecrement}
//                     incrementTooltip="Increase tasks"
//                     decrementTooltip="Decrease tasks"
//                     increasetooltipPlacement="top" // Can be: 'top', 'bottom', 'left', 'right'
//                     decreasetooltipPlacement="bottom" // Can be: 'top', 'bottom', 'left', 'right'
//                   />
//                 ),
//               }}
//               sx={{
//                 '& .MuiInputBase-input': {
//                   textAlign: 'left',
//                 },
//               }}
//             />

//             {/* Task type */}
//             <Autocomplete
//               options={options}
//               getOptionLabel={(option) => option.label}
//               value={options.find((option) => option.value === contactList) || null}
//               onChange={(event, newValue) => handleChangeContactList(event, newValue?.value)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Task Type"
//                   placeholder="Select"
//                   variant="outlined"
//                   error={contactListError}
//                   helperText={contactListError ? 'Task type is required' : 'Select the task type.'}
//                   fullWidth
//                 />
//               )}
//             />
//           </Box>

//           {/* Points To Remember! */}
//           <Box sx={{ ml: '14px' }}>
//             <Typography variant="subtitle1" sx={commonTypographyStyle}>
//               Points To Remember!
//             </Typography>
//             <List sx={{ ...commonBulletListStyle, mb: 0 }}>
//               <ul style={commonBulletListStyle}>
//                 {[
//                   'Revocable means the task assigned can be revoked.',
//                   'Non-revocable means the task assigned cannot be revoked.',
//                   'Tasks will be deduct from your account immediately once you assign task to sub-accounts.',
//                   'The task will reset at 1st of every month for the sub-account holders.',
//                   'If you revoke the tasks from any sub-accounts, those tasks will be added to your account from the start of next month.',
//                 ].map((text, index) => (
//                   <li key={index} style={{ ...listItemCustomStyle, marginBottom: 4 }}>
//                     <span style={{ fontSize: '12px' }}>{text}</span>
//                   </li>
//                 ))}
//               </ul>
//             </List>
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAction} variant="contained" color="primary" disabled={isLoading}>
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : actionLabel}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <CustomSnackbar
//         open={snackbarOpen}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//         severity={snackbarSeverity}
//       />
//     </>
//   );
// }
// -----------------------

import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  List,
  Divider,
  Tooltip,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  useMediaQuery,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import {
  listItemCustomStyle,
  commonBulletListStyle,
} from 'src/components/bullet-list-style/bullet-list-style';

export function AddUpdateSubAccountDialog({
  title,
  actionLabel,
  open,
  onClose,
  rowData,
  isUpdate = false,
  ...other
}) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [contactList, setContactList] = useState('Select');
  // const [email, setEmail] = useState('');
  // const [emailError, setEmailError] = useState(false);
  const [errors, setErrors] = useState({ email: false, tasks: false });

  const [tasks, setTasks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contactListError, setContactListError] = useState(false);
  const [tasksError, setTasksError] = useState(false);

  useEffect(() => {
    if (!open) {
      // Reset fields when the dialog is closed
      setEmail('');
      setTasks('1'); // Reset tasks to default value of '1'
      setContactList('Select');
      setErrors({ email: false, tasks: false });
      setEmailError(false);
      setTasksError(false);
      setContactListError(false);
    } else if (rowData && isUpdate) {
      // Populate fields for update
      setTasks(String(rowData?.tasksAssigned || '10000'));
      setEmail(rowData?.workflowName || '');
      setContactList(rowData?.status?.toLowerCase() || 'Select');
    }
  }, [open, rowData, isUpdate]);

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const unformatNumber = (str) => parseInt(str.replace(/,/g, ''), 10) || 0;



  // const handleTasksInput = (value) => {
  //   const numericValue = value.replace(/,/g, '');
  //   if (!/^\d*$/.test(numericValue)) {
  //     setTasksError(true);
  //     return;
  //   }
  //   const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //   setTasks(formattedValue);
  //   setTasksError(false);
  // };

  const handleTasksInput = (value) => {
    const numericValue = value.replace(/,/g, '');

    if (/^0+$/.test(numericValue)) {
      // Allow multiple zeros to be typed
      setTasks(numericValue);
      setTasksError(false);
      return;
    }

    if (numericValue === '') {
      // Allow empty input
      setTasks('');
      setTasksError(false);
      return;
    }

    if (!/^\d*$/.test(numericValue)) {
      // Show error for invalid characters
      setTasksError(true);
      return;
    }

    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setTasks(formattedValue);
    setTasksError(false);
  };

  const handleTasksBlur = () => {
    if (tasks === '' || /^0+$/.test(tasks)) {
      // Reset to default value of '1' if empty or contains only zeros
      setTasks('1');
    }
  };

  // const [setErrors] = useState({ tasks: false });
  const MIN_TASKS = 1;

  const handleIncrement = () => {
    const currentValue = unformatNumber(tasks);
    const newValue = currentValue + MIN_TASKS;
    setTasks(formatNumber(newValue));
    setErrors((prev) => ({ ...prev, tasks: false }));
  };

  const handleDecrement = () => {
    const currentValue = unformatNumber(tasks);
    if (currentValue >= MIN_TASKS * 2) {
      const newValue = currentValue - MIN_TASKS;
      setTasks(formatNumber(newValue));
    }
    setErrors((prev) => ({ ...prev, tasks: false }));
  };

  const handleClose = () => {
    setEmail(''); // Reset email state
    setErrors({ email: false, tasks: false }); // Reset errors
    setTasks('1'); // Reset tasks to default value of '1'
    setContactList('Select'); // Reset contactList
    onClose(); // Call parent onClose
  };

  const handleChangeContactList = (event, newValue) => {
    setContactList(newValue);
    setContactListError(!newValue || newValue === 'Select');
  };

  const options = [
    { value: 'revocable', label: 'Revocable' },
    { value: 'non-revocable', label: 'Non-Revocable' },
  ];

  const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 0, ml: '0px' };

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);


  const isEmailValid = (email1) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const ALLOWED_EMAILS = [
    'testing@pabbly.com',
    'hardik@pabbly.com',
    'kamal.kumar@pabbly.com',
    'anand.nayak@pabbly.com',
    'abhishek.nagar@pabbly.com',
    'ankit.mandli@pabbly.com',
    'arnav.chakraborty@pabbly.com',
    'ayush.bisen@pabbly.com',
    'chetali.parve@pabbly.com',
    'hardik.pradhan@pabbly.com',
    'jayant.raikwar@pabbly.com',
    'kamal.kumar@pabbly.com',
    'krishna.thapa@pabbly.com',
    'luv.dubey@pabbly.com',
    'mahesh.pawar@pabbly.com',
    'manthan.deshmukh@pabbly.com',
    'neeraj.agarwal@pabbly.com',
    'nikhil.patel@pabbly.com',
    'nimesh.sahu@pabbly.com',
    'pankaj.agarwal@pabbly.com',
    'punit.shinde@pabbly.com',
    'rajendra.jatav@pabbly.com',
    'rajpal.tomar@magnetbrains.com',
    'satish.thapa@pabbly.com',
    'sourabh.singh@pabbly.com',
  ];

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);

    const isValidEmail = isEmailValid(value);
    const isAllowedEmail = ALLOWED_EMAILS.includes(value);

    setErrors((prev) => ({
      ...prev,
      email: !value || !isValidEmail || !isAllowedEmail,
    }));
  };

  const handleAdd = () => {
    setIsLoading(true);

    const emailErrorStatus = !email;
    const tasksErrorStatus = !tasks || Number.isNaN(Number(tasks));
    const contactListErrorStatus = !contactList || contactList === 'Select';

    const newErrors = {
      email: emailErrorStatus,
      tasks: tasksErrorStatus,
    };

    setErrors(newErrors);
    setEmailError(emailErrorStatus);
    setTasksError(tasksErrorStatus);
    setContactListError(contactListErrorStatus);

    if (emailErrorStatus || tasksErrorStatus || contactListErrorStatus) {
      setIsLoading(false);
      return;
    }

    if (!isEmailValid(email)) {
      toast.error('Enter a valid email address.');

      setIsLoading(false);
      return;
    }

    if (!ALLOWED_EMAILS.includes(email)) {
      toast.error('Enter a valid email address.');
      setIsLoading(false);
      return;
    }
    toast.success('Tasks Assigned Successfully!');

    handleClose();
    setIsLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={dialog.onFalse}
      >
        {title}
        <Iconify
          onClick={handleClose}
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        />
      </DialogTitle>
      <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextField
          autoFocus
          fullWidth
          type="email"
          margin="dense"
          variant="outlined"
          label="Email Address"
          placeholder="sample@example.com"
          value={email}
          onChange={handleChangeEmail}
          error={errors.email}
          helperText={
            errors.email
              ? email
                ? 'Please enter a valid email address.'
                : 'Email address is required.'
              : ALLOWED_EMAILS.includes(email)
                ? 'Ensure that the email address is already registered with Pabbly.'
                : 'This email address is not allowed.'
          }
        />

        <Box display="flex" flexDirection="column" gap={2}>
          {/* Number of tasks to be allotted */}
          <TextField
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Number of tasks to be allotted"
            placeholder="1,000"
            value={tasks}
            onChange={(e) => handleTasksInput(e.target.value)}
            onBlur={handleTasksBlur} // Reset invalid values on focus out
            error={tasksError}
            helperText={
              tasksError
                ? 'Please enter a valid number for tasks.'
                : 'Enter the total number of tasks to assign.'
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      '& .iconify': {
                        cursor: 'pointer',
                        width: '16px',
                        height: '16px',
                        color: '#637381',
                      },
                    }}
                  >
                    <Tooltip title="Increase tasks" placement="top" arrow>
                      <IconButton
                        onClick={handleIncrement}
                        sx={{ width: '16px', height: '16px' }}>
                        <Iconify
                          sx={{ width: '16px', height: '16px' }}
                          icon="icon-park-solid:up-one"
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Decrease tasks" placement="bottom" arrow>
                      <IconButton
                        onClick={handleDecrement}
                        sx={{ width: '16px', height: '16px' }}>
                        <Iconify
                          sx={{ width: '16px', height: '16px' }}
                          icon="icon-park-solid:down-one"
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </InputAdornment>
              ),
            }}
            // sx={{
            //   '& .MuiInputBase-input': {
            //     textAlign: 'left',
            //   },
            // }}
          />

          {/* Task type */}
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            value={options.find((option) => option.value === contactList) || null}
            onChange={(event, newValue) => handleChangeContactList(event, newValue?.value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Task Type"
                placeholder="Select"
                variant="outlined"
                error={contactListError}
                helperText={contactListError ? 'Task type is required' : 'Select the task type.'}
                fullWidth
              />
            )}
          />
        </Box>

        {/* Points To Remember! */}
        <Box sx={{ ml: '14px' }}>
          <Typography variant="subtitle1" sx={commonTypographyStyle}>
            Points To Remember!
          </Typography>
          <List sx={{ ...commonBulletListStyle, mb: 0 }}>
            <ul style={commonBulletListStyle}>
              {[
                'Revocable means the task assigned can be revoked.',
                'Non-revocable means the task assigned cannot be revoked.',
                'Tasks will be deduct from your account immediately once you assign task to sub-accounts.',
                'The task will reset at 1st of every month for the sub-account holders.',
                'If you revoke the tasks from any sub-accounts, those tasks will be added to your account from the start of next month.',
              ].map((text, index) => (
                <li key={index} style={{ ...listItemCustomStyle, marginBottom: 4 }}>
                  <span style={{ fontSize: '12px' }}>{text}</span>
                </li>
              ))}
            </ul>
          </List>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleAdd} variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
