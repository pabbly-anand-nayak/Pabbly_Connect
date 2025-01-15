import { useTheme } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Dialog,
  Button,
  Divider,
  Tooltip,
  TextField,
  IconButton,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function CreateFolderDialog({ title, content, action, open, onClose, ...other }) {
  const [workflowName, setWorkflowName] = useState('');
  const [error, setError] = useState(false);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [contactList, setContactList] = useState('Pabbly_Connect_list');

  // Change initial state to 'Home'
  const [categorylist, setCategoryList] = useState('Home');
  const [categoryError, setCategoryError] = useState(false);

  const handleChangeCategoryList = useCallback((event, value) => {
    setCategoryList(value);
    if (value) {
      setCategoryError(false);
    }
  }, []);

  const handleAdd = () => {
    let hasError = false;

    if (!workflowName.trim()) {
      setError(true);
      hasError = true;
    }

    if (!categorylist) {
      setCategoryError(true);
      hasError = true;
    }

    if (!hasError) {

      setError(false);
      setCategoryError(false);
      onClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleWorkflowNameChange = (event) => {
    setWorkflowName(event.target.value);
    if (event.target.value) {
      setError(false);
    }
  };

  // Reset workflow name when dialog is closed, but keep 'Home' as default category
  useEffect(() => {
    if (!open) {
      setWorkflowName('');
      setCategoryList('None'); // Reset to Home when dialog is closed
    }
  }, [open]);

  // Sample data for folder options
  const folder = [
    'Home',
    'Pabbly Connect',
    'Main Folder',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
  ];

  return (
    <Dialog
      fullWidth
      open={open}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={dialog.onFalse}
      >
        Create Folder
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
            value={workflowName}
            onChange={handleWorkflowNameChange}
            error={error}
            helperText={error ? ('Enter folder name here.'

            ) : (
              <span> Enter the name of the folder here.{' '}
                <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />
              </span>
            )
            }
          />

          <Autocomplete
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '14px',
              },
              '& .MuiInputLabel-root': {
                fontSize: '14px',
              },
            }}
            options={folder}
            value={categorylist}
            onChange={handleChangeCategoryList}
            defaultValue="None"
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <Tooltip
                    title="Select the parent folder where the folder will be created."
                    arrow
                    placement="top"
                  >
                    <span>Select Parent Folder </span>
                  </Tooltip>
                }
                placeholder="Select folder"
                helperText={
                  <span>
                    {categoryError ? (
                      'Please select a folder.'
                    ) : (
                      <>
                        Select the parent folder where you want to create the folder.{' '}
                        <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />
                      </>
                    )}
                  </span>
                }
                error={categoryError}
              />
            )}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Create Folder
        </Button>
      </DialogActions>
    </Dialog>
  );
}
