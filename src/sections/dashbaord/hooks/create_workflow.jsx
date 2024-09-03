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

export function CreateWorkflow({ title, content, action, open, onClose, ...other }) {
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
    { value: 'Home', label: 'Home' },
    { value: 'Main Folder', label: 'Main Folder' },
    { value: 'Folder 2', label: 'Folder 2' },
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
          Create Workflow{' '}
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
              label="Workflow Name"
              helperText={
                <span>
                  Enter the name of the workflow.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
                </span>
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Enter the name of the workflow."
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
            {/* <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Select Folder"
              helperText={
                <span>
                  Select the folder or subfolder where you want to create the workflow.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
                </span>
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Select the folder or subfolder where you want to create the workflow."
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
            /> */}
            <TextField
              sx={{ width: '100%' }}
              id="select-currency-label-x"
              variant="outlined"
              select
              fullWidth
              label="Select Folder"
              value={contactList}
              onChange={handleChangeContactList}
              helperText={
                <span>
                  Select the folder or subfolder where you want to create the workflow.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
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
            Create
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
          Success
        </Alert>
      </Snackbar>
    </>
  );
}
