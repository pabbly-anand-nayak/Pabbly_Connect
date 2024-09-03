import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Alert,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
export function QuickRepliesDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

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
          Quick Replies{' '}
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
            label="Enter Shortcut"
            helperText={
              <span>
                Enter shortcut for your quick reply.{' '}
                <RouterLink to="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </RouterLink>
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
          <TextField
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Message Type"
            helperText={
              <span>
                Select one of the message types to proceed.{' '}
                <RouterLink to="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </RouterLink>
              </span>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Ensure that the webhook URL is correct."
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
            fullWidth
            multiline
            rows={4}
            margin="dense"
            variant="outlined"
            label="Enter Text"
            helperText="Use text formatting - *bold* & _italic_ Text can be upto 4096 characters long
Personalize messages with - $FirstName, $Name, $MobileNumber, $LastName & custom attributes.
Customize messages with dynamic parameters e.g. - Your verification code is {{1}}."
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
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
          Quick Replies Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
