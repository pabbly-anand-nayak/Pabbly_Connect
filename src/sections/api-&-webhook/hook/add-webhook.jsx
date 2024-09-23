import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import React, { useState, useCallback } from 'react';

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
// import { Iconify } from './';

// ----------------------------------------------------------------------

export function WebhookDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [EventList, setEventList] = useState('Pabbly_Connect_list');

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {}, 500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChangeContactList = useCallback((event) => {
    setEventList(event.target.value);
  }, []);

  // Sample data
  const EVENTLISTS = [
    { value: 'New Workflow Error', label: 'New Workflow Error' },
    { value: 'Task Usage Limit Reached', label: 'Task Usage Limit Reached' },
    { value: 'Task Usage Limit Exhausted', label: 'Task Usage Limit Exhausted' },
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Add Webhook{' '}
          <Iconify
            onClick={onClose}
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
            helperText={
              <span>
                Enter the name of the webhook.{' '}
                <Link href="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </Link>
              </span>
            }
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
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Webhook URL"
              helperText={
                <span>
                  Ensure that the webhook URL is correct.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
                </span>
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Ensure that the webhook URL is correct. "
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
              id="select-currency-label-x"
              variant="outlined"
              select
              fullWidth
              label="Webhook Event"
              value={EventList}
              onChange={handleChangeContactList}
              helperText={
                <span>
                  Select the event for which you want to be notified.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
                </span>
              }
              InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
              inputProps={{ id: `outlined-select-currency-label` }}
            >
              {EVENTLISTS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Tooltip title="click here to add opt-out webhook." arrow placement="top">
            <Button onClick={handleAdd} variant="contained">
              Add
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
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
          Webhook Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
