// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import {
//   Box,
//   List,
//   Alert,
//   Divider,
//   Tooltip,
//   Snackbar,
//   ListItem,
//   TextField,
//   Typography,
//   ListItemText,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function AssignTasksDialog({ title, content, action, open, onClose, ...other }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [contactList, setContactList] = useState('Pabbly_Connect_list');
//   const [email, setEmail] = useState('');
//   const [tasks, setTasks] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [errors, setErrors] = useState({ email: false, tasks: false });

//   const handleAdd = () => {
//     const newErrors = {
//       email: !email,
//       tasks: !tasks || Number.isNaN(Number(tasks)),
//     };
//     setErrors(newErrors);

//     if (newErrors.email || newErrors.tasks) return;

//     setSnackbarOpen(true);

//     setTimeout(() => {
//       handleClose();
//     }, 100);
//   };

//   const handleChangeEmail = (event) => {
//     setEmail(event.target.value);
//     setErrors((prev) => ({ ...prev, email: false }));
//   };

//   const handleChangeTasks = (event) => {
//     const { value } = event.target;
//     if (/^\d*$/.test(value)) {
//       setTasks(value);
//       setErrors((prev) => ({ ...prev, tasks: false }));
//     } else {
//       setErrors((prev) => ({ ...prev, tasks: true }));
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbarOpen(false);
//   };

//   const handleClose = () => {
//     setEmail('');
//     setTasks('');
//     setErrors({ email: false, tasks: false });
//     onClose();
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
//           Assign Tasks{' '}
//           <Iconify
//             onClick={handleClose}
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
//               onChange={handleChangeEmail}
//               error={errors.email}
//               helperText={
//                 errors.email ? (
//                   'Email address is required.'
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
//                     <Tooltip
//                       title="sample@example.com"
//                       arrow
//                       placement="top"
//                       sx={{
//                         fontSize: '16px',
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
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Number of Tasks"
//               value={tasks}
//               onChange={handleChangeTasks}
//               error={errors.tasks}
//               helperText={
//                 errors.tasks ? (
//                   'Please enter a valid number for tasks.'
//                 ) : (
//                   <span>
//                     Enter the number of tasks to assign to the account.{' '}
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
//                       title="Enter the number of tasks to assign to the account."
//                       arrow
//                       placement="top"
//                       sx={{
//                         fontSize: '16px',
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
//           </Box>
//           <Box sx={{ ml: '14px' }}>
//             <Typography fontSize="14px" variant="subtitle1" sx={{ color: 'grey.800', mt: 1 }}>
//               Points To Remember
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 color: 'grey.600',
//                 ...(true && { mb: 0 }),
//               }}
//             >
//               <List
//                 sx={{
//                   pt: 1,
//                   pb: 0,
//                   color: 'grey.600',
//                 }}
//               >
//                 <ListItem disablePadding>
//                   <ListItemText
//                     primaryTypographyProps={{
//                       sx: {
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         '&::before': { content: '"•"', paddingRight: 1 },
//                       },
//                     }}
//                     primary="Minimum tasks to be assigned is 10,000."
//                   />
//                 </ListItem>
//               </List>

//               <List
//                 sx={{
//                   pt: 1,
//                   pb: 0,
//                   color: 'grey.600',
//                 }}
//               >
//                 <ListItem disablePadding>
//                   <ListItemText
//                     primaryTypographyProps={{
//                       sx: {
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         '&::before': { content: '"•"', paddingRight: 1 },
//                       },
//                     }}
//                     primary="Tasks are automatically reset on the 1st of every month."
//                   />
//                 </ListItem>
//               </List>

//               <List
//                 sx={{
//                   pt: 1,
//                   pb: 0,
//                   color: 'grey.600',
//                 }}
//               >
//                 <ListItem disablePadding>
//                   <ListItemText
//                     primaryTypographyProps={{
//                       sx: {
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         '&::before': { content: '"•"', paddingRight: 1 },
//                       },
//                     }}
//                     primary="Once you remove tasks assigned to another account, they will be added back to your account on the next renewal date."
//                   />
//                 </ListItem>
//               </List>
//             </Typography>
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAdd} variant="contained" color="primary">
//             Assign Task Now
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
//           zIndex: theme.zIndex.modal + 9999,
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
//           Tasks Assigned Successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

// ----------------------------------------------------------

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import {
//   Box,
//   List,
//   Alert,
//   Divider,
//   Tooltip,
//   Snackbar,
//   ListItem,
//   TextField,
//   Typography,
//   ListItemText,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function AssignTasksDialog({ title, content, action, open, onClose, ...other }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [contactList, setContactList] = useState('Pabbly_Connect_list');
//   const [email, setEmail] = useState('');
//   const [tasks, setTasks] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [errors, setErrors] = useState({ email: false, tasks: false });

//   const handleAdd = () => {
//     const newErrors = {
//       email: !email,
//       tasks: !tasks || Number.isNaN(Number(tasks)),
//     };
//     setErrors(newErrors);

//     if (newErrors.email || newErrors.tasks) return;

//     setSnackbarOpen(true);

//     setTimeout(() => {
//       handleClose();
//     }, 100);
//   };

//   const handleChangeEmail = (event) => {
//     setEmail(event.target.value);
//     setErrors((prev) => ({ ...prev, email: false }));
//   };

//   const handleChangeTasks = (event) => {
//     const { value } = event.target;
//     if (/^\d*$/.test(value)) {
//       setTasks(value);
//       setErrors((prev) => ({ ...prev, tasks: false }));
//     } else {
//       setErrors((prev) => ({ ...prev, tasks: true }));
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbarOpen(false);
//   };

//   const handleClose = () => {
//     setEmail('');
//     setTasks('');
//     setErrors({ email: false, tasks: false });
//     onClose();
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
//           Assign Tasks{' '}
//           <Iconify
//             onClick={handleClose}
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
//               onChange={handleChangeEmail}
//               error={errors.email}
//               helperText={
//                 errors.email ? (
//                   'Email address is required.'
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
//                     <Tooltip
//                       title="sample@example.com"
//                       arrow
//                       placement="top"
//                       sx={{
//                         fontSize: '16px',
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
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Number of Tasks"
//               value={tasks}
//               onChange={handleChangeTasks}
//               error={errors.tasks}
//               helperText={
//                 errors.tasks ? (
//                   'Please enter a valid number for tasks.'
//                 ) : (
//                   <span>
//                     Enter the number of tasks to assign to the account.{' '}
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
//                       title="Enter the number of tasks to assign to the account."
//                       arrow
//                       placement="top"
//                       sx={{
//                         fontSize: '16px',
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
//           </Box>
//           <Box sx={{ ml: '14px' }}>
//             <Typography fontSize="14px" variant="subtitle1" sx={{ color: 'grey.800', mt: 1 }}>
//               Points To Remember
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 color: 'grey.600',
//                 ...(true && { mb: 0 }),
//               }}
//             >
//               <List
//                 sx={{
//                   pt: 1,
//                   pb: 0,
//                   color: 'grey.600',
//                 }}
//               >
//                 <ListItem disablePadding>
//                   <ListItemText
//                     primaryTypographyProps={{
//                       sx: {
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         '&::before': { content: '"•"', paddingRight: 1 },
//                       },
//                     }}
//                     primary="Minimum Assignable Tasks: You can assign a minimum of 10,000 tasks to each account."
//                   />
//                 </ListItem>
//               </List>

//               <List
//                 sx={{
//                   pt: 1,
//                   pb: 0,
//                   color: 'grey.600',
//                 }}
//               >
//                 <ListItem disablePadding>
//                   <ListItemText
//                     primaryTypographyProps={{
//                       sx: {
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         '&::before': { content: '"•"', paddingRight: 1 },
//                       },
//                     }}
//                     primary="Task Renewal Cycle: Assigned tasks automatically renew every 30 days."
//                   />
//                 </ListItem>
//               </List>

//               <List
//                 sx={{
//                   pt: 1,
//                   pb: 0,
//                   color: 'grey.600',
//                 }}
//               >
//                 <ListItem disablePadding>
//                   <ListItemText
//                     primaryTypographyProps={{
//                       sx: {
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         '&::before': { content: '"•"', paddingRight: 1 },
//                       },
//                     }}
//                     primary="Task Return Policy: Revoked agency tasks will be added back to your account on the 1st of each month."
//                   />
//                 </ListItem>
//               </List>
//             </Typography>
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAdd} variant="contained" color="primary">
//             Assign Task Now
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
//           zIndex: theme.zIndex.modal + 9999,
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
//           Tasks Assigned Successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

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
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function AssignTasksDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [contactList, setContactList] = useState('Pabbly_Connect_list');
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errors, setErrors] = useState({ email: false, tasks: false });

  const handleAdd = () => {
    const newErrors = {
      email: !email,
      tasks: !tasks || Number.isNaN(Number(tasks)),
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.tasks) return;

    setSnackbarOpen(true);

    setTimeout(() => {
      handleClose();
    }, 100);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleClose = () => {
    setEmail('');
    setTasks('');
    setErrors({ email: false, tasks: false });
    onClose();
  };

  return (
    <>
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
          Assign Tasks{' '}
          <Iconify
            onClick={handleClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
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
              onChange={handleChangeEmail}
              error={errors.email}
              helperText={
                errors.email ? (
                  'Email address is required.'
                ) : (
                  <span>
                    Ensure that the email address is already registered with Pabbly.{' '}
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                  </span>
                )
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="sample@example.com"
                      arrow
                      placement="top"
                      sx={{
                        fontSize: '16px',
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
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Number of Tasks"
              value={tasks}
              onChange={handleChangeTasks}
              error={errors.tasks}
              helperText={
                errors.tasks ? (
                  'Please enter a valid number for tasks.'
                ) : (
                  <span>
                    Enter the number of tasks to assign to the account.{' '}
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                  </span>
                )
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Enter the number of tasks to assign to the account."
                      arrow
                      placement="top"
                      sx={{
                        fontSize: '16px',
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
          </Box>
          <Box sx={{ ml: '9px' }}>
            <Typography
              fontSize="14px"
              variant="subtitle1"
              sx={{ color: 'grey.800', mt: 1, mb: 1, ml: '5px' }}
            >
              Points To Remember
            </Typography>
            <ul style={{ paddingLeft: '20px', color: 'grey.600', fontSize: '12px' }}>
              <li
                style={{
                  marginBottom: '8px',
                  fontWeight: '500',
                  listStyleType: 'disc',
                  listStylePosition: 'outside',
                  color: '#637381',
                }}
              >
                <span style={{ color: '#637381' }}>
                  Minimum Assignable Tasks: You can assign a minimum of 10,000 tasks to each
                  account.
                </span>
              </li>
              <li
                style={{
                  marginBottom: '8px',
                  fontWeight: '500',
                  listStyleType: 'disc',
                  listStylePosition: 'outside',
                  color: '#637381',
                }}
              >
                <span style={{ color: '#637381' }}>
                  Task Renewal Cycle: Assigned tasks automatically renew every 30 days.
                </span>
              </li>
              <li
                style={{
                  fontWeight: '500',
                  listStyleType: 'disc',
                  listStylePosition: 'outside',
                  color: '#637381',
                }}
              >
                <span style={{ color: '#637381' }}>
                  Task Return Policy: Revoked agency tasks will be added back to your account on the
                  1st of each month.
                </span>
              </li>
            </ul>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Assign Task
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
          zIndex: theme.zIndex.modal + 9999,
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
          Tasks Assigned Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
