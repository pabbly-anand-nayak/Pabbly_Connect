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
  ListItem,
  TextField,
  Typography,
  ListItemText,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function AddSubaccountDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [contactList, setContactList] = useState('Pabbly_Connect_list');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    setSnackbarOpen(true);

    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleChangeContactList = useCallback((event) => {
    setContactList(event.target.value);
  }, []);

  const CONTACTLISTS = [
    { value: 'Select', label: 'Select' },
    { value: 'Revocable', label: 'Revocable' },
    { value: 'Non-Revocable', label: 'Non-Revocable' },
  ];

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Define common styles
  const commonBoxStyle = { ml: '0px' };
  const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 1, ml: '0px' };
  const commonUlStyle = { paddingLeft: '15px', color: 'grey.600', fontSize: '12px' };
  const commonLiStyle = {
    marginBottom: '8px',
    fontWeight: '500',
    listStyleType: 'disc',
    listStylePosition: 'outside',
    color: '#637381',
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
          Add Sub-account{' '}
          <Iconify
            onClick={onClose}
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
              helperText={
                <span>
                  Ensure that the email address is already registered with Pabbly.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
                </span>
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="sample@example.com"
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
              label="Number of tasks to be allotted"
              helperText={
                <span>
                  Enter the total number of tasks that should be assigned to the team.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
                </span>
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Enter the total number of tasks that should be assigned to the team."
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
              label="Task Type"
              value={contactList}
              onChange={handleChangeContactList}
              helperText={
                <span>
                  {/* Points to Remember Section */}
                  <Box sx={commonBoxStyle}>
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
                          Tasks will be deduct from your account immediately once you assign task to
                          sub- accounts.
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
                  </Box>
                </span>
              }
              InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
              inputProps={{ id: `outlined-select-currency-label` }}
            >
              {CONTACTLISTS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Assign Task Now
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
          zIndex: theme.zIndex.modal + 10, // Access global theme variable
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
