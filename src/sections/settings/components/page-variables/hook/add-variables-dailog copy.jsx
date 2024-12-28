import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import {
  Box,
  Dialog,
  Button,
  Divider,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

export function VariablesDialog({ title, content, action, open, onClose, ...other }) {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Custom variable added successfully!');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [contactList, setContactList] = useState('Pabbly_Connect_list');
  const [variableName, setVariableName] = useState('');
  const [variableData, setVariableData] = useState('');
  const [variableNameError, setVariableNameError] = useState(false);
  const [variableNameErrorMessage, setVariableNameErrorMessage] = useState('');
  const [variableDataError, setVariableDataError] = useState(false);

  const resetForm = () => {
    setVariableName('');
    setVariableData('');
    setVariableNameError(false);
    setVariableNameErrorMessage('');
    setVariableDataError(false);
  };

  const handleAdd = () => {
    const isVariableNameEmpty = !variableName.trim();
    const isVariableDataEmpty = !variableData.trim();

    setVariableNameError(isVariableNameEmpty);
    setVariableDataError(isVariableDataEmpty);

    if (isVariableNameEmpty) {
      setVariableNameErrorMessage('Variable Name is required.');
    } else {
      setVariableNameErrorMessage('');
    }

    if (!isVariableNameEmpty && !isVariableDataEmpty) {
      setSnackbarOpen(true);
      onClose();
      resetForm();
    }
  };

  const handleDialogClose = () => {
    resetForm();
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangeContactList = useCallback((event) => {
    setContactList(event.target.value);
  }, []);

  const handleVariableNameChange = (e) => {
    const newValue = e.target.value;

    if (/\s/.test(newValue)) {
      setVariableNameError(true);
      setVariableNameErrorMessage(
        <span>
          Variable name is not in a valid format. Please enter a continuous string of characters.{' '}
          <LearnMoreLink link="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/" />
        </span>
      );
    } else if (!newValue.trim()) {
      setVariableNameError(true);
      setVariableNameErrorMessage('Variable Name is required.');
    } else {
      setVariableNameError(false);
      setVariableNameErrorMessage('');
    }

    setVariableName(newValue.replace(/\s/g, ''));
  };

  const CONTACTLISTS = [
    { value: 'Home', label: 'Home' },
    { value: 'Main Folder', label: 'Main Folder' },
    { value: 'Folder 2', label: 'Folder 2' },
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Add Custom Variable{' '}
          <Iconify
            onClick={handleDialogClose}
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
              label="Variable Name"
              placeholder="Enter variable name here"
              value={variableName}
              onChange={handleVariableNameChange}
              error={variableNameError}
              helperText={
                variableNameError ? (
                  variableNameErrorMessage
                ) : (
                  <span>
                    Variable names should start with alphabets and cannot contain spaces or special
                    characters. E.g., customV1.{' '}
                    <LearnMoreLink link="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/" />
                  </span>
                )
              }
            />

            <TextField
              helperText={
                variableDataError ? (
                  'Variable Data is required'
                ) : (
                  <span>
                    Ensure that the variable data is entered correctly.{' '}
                    <LearnMoreLink link="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/" />
                  </span>
                )
              }
              id="outlined-multiline-static"
              label="Variable Data"
              multiline
              rows={4}
              value={variableData}
              onChange={(e) => {
                setVariableData(e.target.value);
                if (e.target.value.trim()) {
                  setVariableDataError(false); // Clear the error when user starts typing
                }
              }}
              error={variableDataError}
              onFocus={(e) => {
                if (e.target.value === 'Enter variable data here') {
                  e.target.value = '';
                }
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add
          </Button>
          <Button onClick={handleDialogClose} variant="outlined" color="inherit">
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
