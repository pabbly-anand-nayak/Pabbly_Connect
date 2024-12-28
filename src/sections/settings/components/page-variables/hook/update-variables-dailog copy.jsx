import { useState } from 'react';
import { useTheme } from '@emotion/react';

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

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

export function UpdateVariablesDialog({
  title,
  content,
  action,
  open,
  onClose,
  variableName: initialVariableName = '',
  variableData: initialVariableData = '',
  ...other
}) {
  const [variableName, setVariableName] = useState(initialVariableName);
  const [variableData, setVariableData] = useState(initialVariableData);
  const [variableNameError, setVariableNameError] = useState(false);
  const [variableDataError, setVariableDataError] = useState(false);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Variable updated successfully!');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleAdd = () => {
    const isVariableNameEmpty = !variableName.trim();
    const isVariableDataEmpty = !variableData.trim();

    setVariableNameError(isVariableNameEmpty);
    setVariableDataError(isVariableDataEmpty);

    if (!isVariableNameEmpty && !isVariableDataEmpty) {
      setSnackbarOpen(true);
      onClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [variableNameErrorMessage, setVariableNameErrorMessage] = useState('');

  const resetForm = () => {
    setVariableName('');
    setVariableData('');
    setVariableNameError(false);
    setVariableNameErrorMessage('');
    setVariableDataError(false);
  };

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

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
          {title}
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
              disabled
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
              onChange={(e) => setVariableData(e.target.value)}
              error={variableDataError}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Update
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
