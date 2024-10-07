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

export function AddSubaccount({ title, content, action, open, onClose, ...other }) {
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
                  <Typography variant="Subtitle1" sx={{ color: 'grey.800', mb: 1 }}>
                    Points To Remember
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.600',

                      ...(true && { mb: 3 }), // Example conditional margin bottom
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
                              '&::before': { content: '"•"', paddingRight: '0.5rem' },
                            },
                          }}
                          primary="Revocable means the task assigned can be revoked."
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
                              '&::before': { content: '"•"', paddingRight: '0.5rem' },
                            },
                          }}
                          primary="Non-revocable means the task assigned cannot be revoked."
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
                              '&::before': { content: '"•"', paddingRight: '0.5rem' },
                            },
                          }}
                          primary="Tasks will be deduct from your account immediately once you assign task to sub- accounts."
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
                              '&::before': { content: '"•"', paddingRight: '0.5rem' },
                            },
                          }}
                          primary="The task will reset at 1st of every month for the sub-account holders."
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
                              '&::before': { content: '"•"', paddingRight: '0.5rem' },
                            },
                          }}
                          primary="If you revoke the tasks from any sub-accounts, those tasks will be added to your account from the start of next month."
                        />
                      </ListItem>
                    </List>
                  </Typography>
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
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained">
            Assign Task Now
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
