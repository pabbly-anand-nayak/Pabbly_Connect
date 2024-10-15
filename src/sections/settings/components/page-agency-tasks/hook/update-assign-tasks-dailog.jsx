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
//       tasks: !tasks,
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
//     setTasks(event.target.value);
//     setErrors((prev) => ({ ...prev, tasks: false }));
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
//                   'Task count is required.'
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
//                     primary="The assigned tasks get renewed every 30 days."
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
//           {/* <Button onClick={handleClose} variant="outlined" color="inherit">
//             Cancel
//           </Button> */}
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
//           zIndex: theme.zIndex.modal + 9999, // Access global theme variable
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
  List,
  Alert,
  Divider,
  Snackbar,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function AssignTasksDialog({ title, content, action, open, onClose, rowData, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [email, setEmail] = useState(rowData ? rowData.workflowName : '');
  const [tasks, setTasks] = useState(
    rowData ? Intl.NumberFormat().format(rowData.totalQuantity * 300) : ''
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errors, setErrors] = useState({ email: false, tasks: false });

  const handleAdd = () => {
    const newErrors = {
      email: !email,
      tasks: !tasks,
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
    setTasks(event.target.value);
    setErrors((prev) => ({ ...prev, tasks: false }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleClose = () => {
    setEmail(rowData ? rowData.workflowName : '');
    setTasks(rowData ? Intl.NumberFormat().format(rowData.totalQuantity * 300) : '');
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
          Update Assign Tasks{' '}
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
                  'Task count is required.'
                ) : (
                  <span>
                    Enter the number of tasks to assign to the account.{' '}
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                  </span>
                )
              }
            />
          </Box>

          <Box sx={{ ml: '14px' }}>
            <Typography fontSize="14px" variant="subtitle1" sx={{ color: 'grey.800', mt: 1 }}>
              Points To Remember
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'grey.600',
                ...(true && { mb: 0 }),
              }}
            >
              <List
                sx={{
                  pt: 1,
                  pb: 0,
                  color: 'grey.600',
                }}
              >
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '12px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: 1 },
                      },
                    }}
                    primary="Minimum tasks to be assigned is 10,000."
                  />
                </ListItem>
              </List>

              <List
                sx={{
                  pt: 1,
                  pb: 0,
                  color: 'grey.600',
                }}
              >
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '12px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: 1 },
                      },
                    }}
                    primary="The assigned tasks get renewed every 30 days."
                  />
                </ListItem>
              </List>

              <List
                sx={{
                  pt: 1,
                  pb: 0,
                  color: 'grey.600',
                }}
              >
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '12px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: 1 },
                      },
                    }}
                    primary="Once you remove tasks assigned to another account, they will be added back to your account on the next renewal date."
                  />
                </ListItem>
              </List>
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Update Task Now
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
          Update Assign Task Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
