// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';

// import {
//   Box,
//   Alert,
//   Button,
//   Dialog,
//   Divider,
//   Snackbar,
//   TextField,
//   Typography,
//   DialogTitle,
//   DialogActions,
//   DialogContent,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function AssignTasksDialog({ title, content, action, open, onClose, rowData, ...other }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [email, setEmail] = useState(rowData ? rowData.workflowName : '');
//   const [tasks, setTasks] = useState(rowData?.totalQuantity ? rowData.totalQuantity : '');
//   // const [tasks, setTasks] = useState(
//   //   rowData ? Intl.NumberFormat().format(rowData.totalQuantity) : ''
//   // );

//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const [errors, setErrors] = useState({ email: false, tasks: false });

//   const handleAdd = () => {
//     const newErrors = {
//       email: !email,
//       tasks: !tasks || Number.isNaN(Number(tasks.replace(/,/g, ''))),
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
//     const value = event.target.value.replace(/,/g, ''); // Remove commas for numeric validation
//     if (/^\d*$/.test(value)) {
//       // Only allows digits
//       const formattedValue = Intl.NumberFormat().format(value); // Format with commas
//       setTasks(formattedValue);
//       setErrors((prev) => ({ ...prev, tasks: false }));
//     } else {
//       setErrors((prev) => ({ ...prev, tasks: true }));
//     }
//   };

//   const handleClose = () => {
//     setEmail(rowData ? rowData.workflowName : '');
//     setTasks(rowData ? Intl.NumberFormat().format(rowData.totalQuantity) : '');
//     setErrors({ email: false, tasks: false });
//     onClose();
//   };

//   // Define common styles
//   const commonBoxStyle = { ml: '9px' };
//   const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 1, ml: '5px' };
//   const commonUlStyle = { paddingLeft: '20px', color: 'grey.600', fontSize: '12px' };
//   const commonLiStyle = {
//     marginBottom: '8px',
//     fontWeight: '500',
//     listStyleType: 'disc',
//     listStylePosition: 'outside',
//     color: '#637381',
//   };

//   const MIN_TASKS = 10000;

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
//           Update Assign Tasks{' '}
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
//               disabled // This line makes the input non-editable
//             />

//             {/* <TextField
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
//                   'Task count must be a numeric value.'
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
//                 endAdornment: tasks && (
//                   <Iconify
//                     icon="ic:round-clear"
//                     onClick={() => setTasks('')} // Clear the tasks field
//                     style={{ cursor: 'pointer', color: '#637381' }}
//                   />
//                 ),
//               }}
//             /> */}

//             {/* Updated Tasks TextField */}

//             <TextField
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Number of Tasks"
//               placeholder="10,000"
//               // value={tasks ? Number(tasks).toLocaleString() : ''}
//               value={tasks ? Number(tasks.toString().replace(/,/g, '')).toLocaleString() : ''}
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
//           </Box>

//           {/* Points to Remember Section */}
//           <Box sx={commonBoxStyle}>
//             <Typography variant="subtitle1" sx={commonTypographyStyle}>
//               Points To Remember!
//             </Typography>
//             <ul style={commonUlStyle}>
//               <li style={commonLiStyle}>
//                 <span>
//                   Minimum Assignable Tasks: You can assign a minimum of 10,000 tasks to each
//                   account.
//                 </span>
//               </li>
//               <li style={commonLiStyle}>
//                 <span>
//                   Task Renewal Cycle: Assigned tasks automatically renew on the 1st of each month.
//                 </span>
//               </li>
//               <li style={commonLiStyle}>
//                 <span>
//                   Task Return Policy: Revoked agency tasks will be added back to your account on the
//                   1st of each month.
//                 </span>
//               </li>
//             </ul>
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAdd} variant="contained" color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{
//           boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//           mt: 13,
//           zIndex: theme.zIndex.modal + 9999,
//         }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity="success"
//           sx={{
//             width: '100%',
//             fontSize: '14px',
//             fontWeight: 'bold',
//             backgroundColor: theme.palette.background.paper,
//             color: theme.palette.text.primary,
//           }}
//         >
//           Assigned Task Updated Successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import {
  Box,
  List,
  Button,
  Dialog,
  Divider,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
import {
  listItemCustomStyle,
  commonBulletListStyle,
} from 'src/components/bullet-list-style/bullet-list-style';

export function AssignTasksDialog({ title, content, action, open, onClose, rowData, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [email, setEmail] = useState(rowData ? rowData.workflowName : '');
  const [tasks, setTasks] = useState(rowData?.totalQuantity ? rowData.totalQuantity : '');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [errors, setErrors] = useState({ email: false, tasks: false });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAdd = () => {
    const newErrors = {
      email: !email,
      tasks: !tasks || Number.isNaN(Number(tasks.replace(/,/g, ''))),
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.tasks) return;

    setSnackbarMessage('Assigned Task Updated Successfully!');
    setSnackbarSeverity('success');
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
    const value = event.target.value.replace(/,/g, ''); // Remove commas for numeric validation
    if (/^\d*$/.test(value)) {
      // Only allows digits
      const formattedValue = Intl.NumberFormat().format(value); // Format with commas
      setTasks(formattedValue);
      setErrors((prev) => ({ ...prev, tasks: false }));
    } else {
      setErrors((prev) => ({ ...prev, tasks: true }));
    }
  };

  const handleClose = () => {
    setEmail(rowData ? rowData.workflowName : '');
    setTasks(rowData ? Intl.NumberFormat().format(rowData.totalQuantity) : '');
    setErrors({ email: false, tasks: false });
    onClose();
  };

  // Define common styles
  const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 1, ml: '5px' };

  const MIN_TASKS = 10000;

  const handleIncrement = () => {
    const currentValue = Number(tasks) || 0;
    setTasks((currentValue + MIN_TASKS).toString());
    setErrors((prev) => ({ ...prev, tasks: false }));
  };

  const handleDecrement = () => {
    const currentValue = Number(tasks) || 0;
    if (currentValue >= MIN_TASKS * 2) {
      setTasks((currentValue - MIN_TASKS).toString());
    }
    setErrors((prev) => ({ ...prev, tasks: false }));
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
              disabled // This line makes the input non-editable
            />

            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Number of Tasks"
              placeholder="10,000"
              value={tasks ? Number(tasks.toString().replace(/,/g, '')).toLocaleString() : ''}
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                        }}
                      >
                        <Button
                          onClick={handleIncrement}
                          style={{
                            border: 'none',
                            padding: '1px 4px',
                            cursor: 'pointer',
                            height: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 'unset',
                          }}
                        >
                          <span style={{ fontSize: '10px', lineHeight: 1 }}>▲</span>
                        </Button>
                        <Button
                          onClick={handleDecrement}
                          style={{
                            border: 'none',
                            padding: '1px 4px',
                            cursor: 'pointer',
                            height: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 'unset',
                          }}
                        >
                          <span style={{ fontSize: '10px', lineHeight: 1 }}>▼</span>
                        </Button>
                      </div>
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  textAlign: 'left',
                },
              }}
            />
          </Box>

          {/* Points to Remember Section */}
          <span>
            <Box sx={{ ml: '14px' }}>
              <Typography variant="subtitle1" sx={commonTypographyStyle}>
                Points To Remember!
              </Typography>

              <List sx={{ ...commonBulletListStyle, mb: 0 }}>
                <ul style={commonBulletListStyle}>
                  {[
                    'Minimum Assignable Tasks: You can assign a minimum of 10,000 tasks to each account.',
                    'Task Renewal Cycle: Assigned tasks automatically renew on the 1st of each month.',
                    'Task Return Policy: Revoked agency tasks will be added back to your account on the 1st of each month.',
                  ].map((text, index) => (
                    <li key={index} style={{ ...listItemCustomStyle, marginBottom: 4 }}>
                      <span style={{ fontSize: '12px' }}>{text}</span>
                    </li>
                  ))}
                </ul>
              </List>
            </Box>
          </span>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
}
