import { toast } from 'sonner';
import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
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
  CircularProgress,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function AddUpdateVariablesDialog({
  open,
  onClose,
  title,
  mode = 'add', // 'add' or 'update'
  initialVariableName = '',
  initialVariableData = '',
  onSave,
  ...other
}) {
  const [variableName, setVariableName] = useState(initialVariableName);
  const [variableData, setVariableData] = useState(initialVariableData);
  const [variableNameError, setVariableNameError] = useState(false);
  const [variableNameErrorMessage, setVariableNameErrorMessage] = useState('');
  const [variableDataError, setVariableDataError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  const resetForm = () => {
    setVariableName(initialVariableName);
    setVariableData(initialVariableData);
    setVariableNameError(false);
    setVariableNameErrorMessage('');
    setVariableDataError(false);
  };

  const handleSave = () => {
    const isVariableNameEmpty = !variableName.trim();
    const isVariableDataEmpty = !variableData.trim();

    setVariableNameError(isVariableNameEmpty);
    setVariableDataError(isVariableDataEmpty);

    if (isVariableNameEmpty) {
      setVariableNameErrorMessage('Variable Name is required.');
      return; // Exit early if validation fails
    }

    if (!isVariableNameEmpty && !isVariableDataEmpty) {
      setIsLoading(true);

      // Simulating async save process
      onSave({ variableName, variableData }); // Trigger save callback

      // Show Snackbar using `toast`
      toast.success(
        mode === 'add' ? 'Variable added successfully!' : 'Variable updated successfully!'
      );

      resetForm(); // Reset the form after saving
      setIsLoading(false); // Stop loading spinner
      onClose(); // Close the dialog
    }
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
    <Dialog
      open={open}
      fullWidth

      onClose={() => {
        resetForm();
        onClose();
      }}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
        {title}
        <Iconify
          onClick={() => {
            resetForm();
            onClose();
          }}
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
            disabled={mode === 'update'}
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
                setVariableDataError(false);
              }
            }}
            error={variableDataError}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSave} variant="contained" disabled={isLoading} color="primary">
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : mode === 'add' ? (
            'Add'
          ) : (
            'Update'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
