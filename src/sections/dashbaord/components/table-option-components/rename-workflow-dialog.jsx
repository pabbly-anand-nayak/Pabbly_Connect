import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';

import {
  Box,
  Dialog,
  Button,
  Divider,
  Tooltip,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function RenameWorkflowDialog({ open, onClose, workflowName }) {
  const [newWorkflowName, setNewWorkflowName] = useState(workflowName); // Store the editable workflow name
  const [hasError, setHasError] = useState(false); // Track if there's an error
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  useEffect(() => {
    setNewWorkflowName(workflowName); // Update the state when the dialog opens with the initial name
  }, [workflowName]);

  const handleAdd = () => {

    if (!newWorkflowName.trim()) {
      // Check if the field is empty
      setHasError(true);
      return; // Prevent form submission if empty
    }
    // Show success toast
    toast.success('Updated successfully!');

    setHasError(false);
    setTimeout(() => {
      onClose();
    }, 0);
  };

  const handleNameChange = (event) => {
    setNewWorkflowName(event.target.value); // Update the name when typing
    if (event.target.value.trim()) {
      setHasError(false); // Reset the error if there's text
    }
  };

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog
      fullWidth
      open={open}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          <Tooltip title="You can rename the workflow here." arrow placement="top">
          Rename Workflow
          </Tooltip>

        <IconButton
          onClick={onClose}
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        >
          <Iconify icon="uil:times" />
        </IconButton>
        </DialogTitle>

        <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

        <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>

          {/* Workflow Name */}
            <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Workflow Name"
            placeholder="Name of the workflow"
            value={newWorkflowName} // Set value from state
            onChange={handleNameChange} // Allow editing
            error={hasError} // Show error if validation fails
            helperText={
                hasError ? (
                  'Please enter workflow name.'
                ) : (
                  <span>
                    Enter the name of the workflow.{' '}
                    <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />
                  </span>
                )
              }
            />
          </Box>
        </DialogContent>

        <DialogActions>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
          </Button>
          {/* <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button> */}
        </DialogActions>
    </Dialog>
  );
}
