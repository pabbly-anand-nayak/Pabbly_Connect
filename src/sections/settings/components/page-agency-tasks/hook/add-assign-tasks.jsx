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
  Divider,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
import {
  listItemCustomStyle,
  commonBulletListStyle,
} from 'src/components/bullet-list-style/bullet-list-style';

export function AssignTasksDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [contactList, setContactList] = useState('Pabbly_Connect_list');
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({ email: false, tasks: false });

  const ALLOWED_EMAILS = [
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

  const isEmailValid = (email1) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleAdd = () => {
    const newErrors = {
      email: !email,
      tasks: !tasks || Number.isNaN(Number(tasks)),
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.tasks) return;

    if (!isEmailValid(email)) {
      setSnackbarMessage('Enter a valid email address.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!ALLOWED_EMAILS.includes(email)) {
      setSnackbarMessage('Enter a valid email address.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setSnackbarMessage('Tasks Assigned Successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    setTimeout(() => {
      handleClose();
    }, 100);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: value ? !isEmailValid(value) : true,
    }));
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

  // Rest of your existing styles...
  const commonTypographyStyle = {
    fontSize: '14px',
    '[data-mui-color-scheme="light"] &': {
      color: 'grey.800',
    },
    '[data-mui-color-scheme="dark"] &': {
      color: 'var(--palette-text-secondary)',
    },
    mt: 1,
    ml: '0px',
  };

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
              type="email"
              margin="dense"
              variant="outlined"
              label="Email Address"
              placeholder="sample@example.com"
              value={email}
              onChange={handleChangeEmail}
              error={errors.email}
              helperText={
                errors.email ? (
                  email ? (
                    'Please enter a valid email address.'
                  ) : (
                    'Email address is required.'
                  )
                ) : (
                  <span>
                    Ensure that the email address is already registered with Pabbly.{' '}
                    <LearnMoreLink link="https://forum.pabbly.com/threads/pabbly-connect-agency.25500/" />
                  </span>
                )
              }
            />

            {/* Updated Tasks TextField */}
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Number of Tasks"
              placeholder="10,000"
              value={tasks ? Number(tasks).toLocaleString() : ''}
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
                          // border: '1px solid #ccc',
                          // borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <Button
                          onClick={handleIncrement}
                          style={{
                            border: 'none',
                            // borderBottom: '1px solid #ccc',
                            padding: '1px 4px',
                            // background: 'white',
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
                        {/* <Divider /> */}
                        <Button
                          onClick={handleDecrement}
                          style={{
                            border: 'none',
                            padding: '1px 4px',
                            // background: 'white',
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
            Assign Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      {/* <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={2500}
        onClose={handleSuccessSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 13,
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleSuccessSnackbarClose}
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
      </Snackbar> */}

      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
}
