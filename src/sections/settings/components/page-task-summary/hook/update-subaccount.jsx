import { Link } from 'react-router-dom';
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
  TextField,
  Typography,
  Autocomplete,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
import {
  listItemCustomStyle,
  commonBulletListStyle,
} from 'src/components/bullet-list-style/bullet-list-style';

export function UpdateSubAccountDialog({
  title,
  content,
  action,
  open,
  onClose,
  rowData,
  ...other
}) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [contactList, setContactList] = useState('Select');
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Assign Task Successfully!');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Validation states
  const [emailError, setEmailError] = useState(false);
  const [tasksError, setTasksError] = useState(false);
  const [contactListError, setContactListError] = useState(false);

  useEffect(() => {
    if (open && rowData) {
      setEmail(rowData.workflowName || '');
      setTasks(String(rowData.tasksAssigned || '10000'));
      const taskType = rowData.status?.toLowerCase() || 'Select';
      setContactList(taskType);

      // Reset validation states
      setEmailError(false);
      setTasksError(false);
      setContactListError(false);
    }
  }, [open, rowData]);

  const handleAdd = () => {
    setIsLoading(true);

    const emailErrorStatus = !email;
    const tasksErrorStatus = !tasks;
    const contactListErrorStatus = !contactList || contactList === 'Select';

    setEmailError(emailErrorStatus);
    setTasksError(tasksErrorStatus);
    setContactListError(contactListErrorStatus);

    if (emailErrorStatus || tasksErrorStatus || contactListErrorStatus) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setSnackbarOpen(true);
      setSnackbarMessage('Assign Task Updated!');
      setSnackbarSeverity('success');
      handleClose();
      setIsLoading(false);
    }, 1200);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleChangeContactList = (event, newValue) => {
    setContactList(newValue);
    if (!newValue || newValue === 'Select') {
      setContactListError(true);
    } else {
      setContactListError(false);
    }
  };

  const options = [
    { value: 'revocable', label: 'Revocable' },
    { value: 'non-revocable', label: 'Non-Revocable' },
  ];

  const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 0, ml: '0px' };

  const [isLoading, setIsLoading] = useState(false);

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
          Update Sub-account
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
            onChange={(e) => {
              const { value } = e.target;
              const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

              setEmail(value);
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
          />
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Number of tasks to be allotted"
              placeholder="10,000"
              value={tasks}
              onChange={(e) => {
                setTasks(e.target.value);
                setTasksError(false);
              }}
              error={tasksError}
              helperText={
                tasksError ? (
                  'Number of tasks is required'
                ) : (
                  <span>
                    Enter the total number of tasks that should be assigned to the team.{' '}
                    <LearnMoreLink link="https://www.youtube.com/watch?v=YxK95UMwTD8" />
                  </span>
                )
              }
              InputProps={{
                endAdornment: tasks && (
                  <Iconify
                    icon="ic:round-clear"
                    onClick={() => setTasks('')}
                    style={{ cursor: 'pointer', color: '#637381' }}
                  />
                ),
              }}
            />

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
                  helperText={
                    contactListError ? (
                      'Task type is required'
                    ) : (
                      <span>
                        Select the task type you want.{' '}
                        <LearnMoreLink link="https://www.youtube.com/watch?v=YxK95UMwTD8" />
                      </span>
                    )
                  }
                  fullWidth
                />
              )}
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
                    'Revocable means the task assigned can be revoked.',
                    'Non-revocable means the task assigned cannot be revoked.',
                    'Tasks will be deduct from your account immediately once you assign task to sub- accounts.',
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
          </span>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
          </Button>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            Cancel
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
