import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

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
  Tooltip,
  Snackbar,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function AddSubaccountDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [contactList, setContactList] = useState('Select');
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Validation states
  const [emailError, setEmailError] = useState(false);
  const [tasksError, setTasksError] = useState(false);
  const [contactListError, setContactListError] = useState(false);

  const handleAdd = () => {
    // Validate fields
    if (!email) setEmailError(true);
    if (!tasks) setTasksError(true);
    if (!contactList || contactList === 'Select') setContactListError(true);

    // Only proceed if no validation errors
    if (email && tasks && contactList && contactList !== 'Select') {
      setSnackbarOpen(true);

      setTimeout(() => {
        handleClose();
      }, 500);
    }
  };

  const handleChangeContactList = useCallback((event) => {
    setContactList(event.target.value);
    setContactListError(false); // Clear the error on change
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Function to reset all the states when closing the dialog
  const handleClose = () => {
    setEmail('');
    setTasks('');
    setContactList('Select');
    setEmailError(false);
    setTasksError(false);
    setContactListError(false);
    onClose(); // Close the dialog
  };

  // Define common styles
  const commonBoxStyle = { ml: '14px' };
  const commonTypographyStyle = {
    fontSize: '14px',
    // color: 'grey.800',
    '[data-mui-color-scheme="light"] &': {
      color: 'grey.800',
    },
    '[data-mui-color-scheme="dark"] &': {
      color: 'var(--palette-text-secondary)',
    },
    mt: 1,
    ml: '0px',
  };

  // Define common styles
  const commonListStyle = {
    paddingLeft: '8px',
    // color: 'grey.600',
    '[data-mui-color-scheme="light"] &': {
      color: 'grey.600',
    },
    '[data-mui-color-scheme="dark"] &': {
      color: 'var(--palette-text-secondary)',
    },
    fontSize: '12px',
  };

  const commonListItemStyle = {
    marginBottom: '8px',
    fontSize: '12px',
    fontWeight: '500',
    listStyleType: 'disc',
    listStylePosition: 'outside',
    color: 'grey.800',
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose} // Call handleClose when closing the dialog
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Add Sub-account{' '}
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
              value={email}
              onChange={(e) => {
                const { value } = e.target;
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                setEmail(value);
                // Only set error if the field is not empty and the email is invalid
                if (value && !emailRegex.test(value)) {
                  setEmailError(true);
                } else {
                  setEmailError(false);
                }
              }}
              error={emailError}
              helperText={
                emailError ? (
                  email ? (
                    'Please enter a valid email address.'
                  ) : (
                    'Email is required'
                  )
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
                setTasksError(false); // Clear the error on change
              }}
              error={tasksError}
              helperText={
                tasksError ? (
                  'Number of tasks is required'
                ) : (
                  <span>
                    Enter the total number of tasks that should be assigned to the team.{' '}
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
                      title="Enter the total number of tasks that should be assigned to the team."
                      arrow
                      placement="top"
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
              id="select-currency-label-x"
              variant="outlined"
              select
              fullWidth
              label="Task Type"
              value={contactList}
              onChange={handleChangeContactList}
              error={contactListError}
              helperText={
                contactListError ? (
                  'Task type is required'
                ) : (
                  <span>
                    {/* <Box sx={commonBoxStyle}>
                      <Typography variant="subtitle1" sx={commonTypographyStyle}>
                        Points To Remember!
                      </Typography>
                      <ul style={commonUlStyle}>
                        <li style={commonLiStyle}>
                          <span>Revocable means the task assigned can be revoked.</span>
                        </li>
                        <li style={commonLiStyle}>
                          <span>Non-revocable means the task assigned cannot be revoked.</span>
                        </li>
                        <li style={commonLiStyle}>
                          <span>
                            Tasks will be deduct from your account immediately once you assign task
                            to sub- accounts.
                          </span>
                        </li>
                        <li style={commonLiStyle}>
                          <span>
                            The task will reset at 1st of every month for the sub-account holders.
                          </span>
                        </li>
                        <li style={commonLiStyle}>
                          <span>
                            If you revoke the tasks from any sub-accounts, those tasks will be added
                            to your account from the start of next month.
                          </span>
                        </li>
                      </ul>
                    </Box> */}
                  </span>
                )
              }
            >
              {[
                { value: 'Select', label: 'Select' },
                { value: 'Revocable', label: 'Revocable' },
                { value: 'Non-Revocable', label: 'Non-Revocable' },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <span>
            <Box sx={commonBoxStyle}>
              <Typography variant="subtitle1" sx={commonTypographyStyle}>
                Points To Remember!
              </Typography>

              <List sx={{ ...commonListStyle, mb: 0 }}>
                <ul style={commonListStyle}>
                  {[
                    'Revocable means the task assigned can be revoked.',
                    'Non-revocable means the task assigned cannot be revoked.',
                    'Tasks will be deduct from your account immediately once you assign task to sub- accounts.',
                    'The task will reset at 1st of every month for the sub-account holders.',
                    'If you revoke the tasks from any sub-accounts, those tasks will be added to your account from the start of next month.',
                  ].map((text, index) => (
                    <li key={index} style={commonListItemStyle}>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </List>
            </Box>
          </span>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Assign Task Now
          </Button>
          <Button onClick={handleClose} variant="outlined" color="inherit">
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
          Assign Task Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
