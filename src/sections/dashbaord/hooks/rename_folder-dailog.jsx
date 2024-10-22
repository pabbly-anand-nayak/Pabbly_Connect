import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import {
  Box,
  Alert,
  Dialog,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function RenameFolderDialog({ title, content, action, open, onClose, ...other }) {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [hasError, setHasError] = useState(false); // Track if there's an error

  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [contactList, setContactList] = useState('Pabbly_Connect_list');
  const [categorylist, setCategorytList] = useState(''); // Initialize empty for validation
  const [categoryError, setCategoryError] = useState(false); // State to manage error message

  const handleChangeCategoryList = useCallback((event, value) => {
    setCategorytList(value);
    if (value) {
      setCategoryError(false); // Reset error when valid selection is made
    }
  }, []);

  const handleAdd = () => {
    setSnackbarOpen(true);
    onClose(); // Close the dialog when Share is clicked
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangeContactList = useCallback((event) => {
    setContactList(event.target.value);
  }, []);

  // Sample data
  const CONTACTLISTS = [
    { value: 'Home', label: 'Home' },
    { value: 'Main Folder', label: 'Main Folder' },
    { value: 'Folder 2', label: 'Folder 2' },
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
          Rename Folder{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Folder Name"
              error={hasError} // Show error if validation fails
              helperText={
                hasError ? (
                  'Please enter folder name'
                ) : (
                  <span>
                    You can rename folder from here.{' '}
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
                      title="You can rename folder from here."
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
            {/* <TextField
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
            </TextField> */}
          </Box>
        </DialogContent>

        <DialogActions>
          {/* <Button onClick={handleAdd} variant="contained">
            Update
          </Button> */}

          <Button onClick={handleAdd} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        Z-index={100}
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
          Updated!
        </Alert>
      </Snackbar>
    </>
  );
}
