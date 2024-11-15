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
