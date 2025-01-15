import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';

import {
  Box,
  Dialog,
  Button,
  Divider,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function RenameFolderDialog({ open, onClose, folderName }) {
  const [newFolderName, setFolderName] = useState(folderName); // Store the editable workflow name
  const [hasError, setHasError] = useState(false); // Track if there's an error
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  useEffect(() => {
    setFolderName(folderName); // Update the state when the dialog opens with the initial name
  }, [folderName]);

  const handleAdd = () => {
    if (!newFolderName.trim()) {
      // Check if the field is empty
      setHasError(true);
      return; // Prevent form submission if empty
    }
    setHasError(false);

    // Show success toast
    toast.success('Folder name updated successfully!');

    onClose(); // Close the dialog when Update is clicked
  };

  const handleNameChange = (event) => {
    setFolderName(event.target.value); // Update the name when typing
    if (event.target.value.trim()) {
      setHasError(false); // Reset the error if there's text
    }
  };

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
          Rename Folder
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
            <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Folder Name"
            placeholder="Enter folder name here"
            value={newFolderName} // Set value from state
            onChange={handleNameChange} // Allow editing
            error={hasError} // Show error if validation fails
            helperText={
                hasError ? (
                  'Please enter folder name.'
                ) : (
                  <span>
                    You can rename folder from here.{' '}
                    <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />
                  </span>
                )
              }
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Update
        </Button>
        </DialogActions>
    </Dialog>
  );
}
