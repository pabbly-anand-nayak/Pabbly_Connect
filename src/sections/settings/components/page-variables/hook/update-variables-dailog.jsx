import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import {
  Box,
  Alert,
  Dialog,
  Button,
  Divider,
  Snackbar,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

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
          <Link
            href="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/"
            style={{ color: '#078DEE' }}
            underline="always"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </Link>
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
                    <Link
                      href="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/"
                      style={{ color: '#078DEE' }}
                      underline="always"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                    </Link>
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
                    <Link
                      href="https://forum.pabbly.com/threads/variables-in-pabbly-connect.17265/"
                      style={{ color: '#078DEE' }}
                      underline="always"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                    </Link>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)', mt: 7 }}
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
          Variable updated successfully!{' '}
        </Alert>
      </Snackbar>
    </>
  );
}
