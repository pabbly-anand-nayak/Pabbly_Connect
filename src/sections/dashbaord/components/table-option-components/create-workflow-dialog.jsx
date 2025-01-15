import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
  CircularProgress,
} from '@mui/material'; // Import toast from sonner

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function CreateWorkflowDialog({ title, content, action, open, onClose, ...other }) {
  const [workflowName, setWorkflowName] = useState('');
  const [error, setError] = useState(false);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [categorylist, setCategoryList] = useState('Home');
  const [categoryError, setCategoryError] = useState(false);
  const navigate = useNavigate();

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
      // Show success toast
      toast.success('Workflow created successfully!');

      setError(false);
      setCategoryError(false);
      setTimeout(() => navigate(paths.dashboard.workflow), 1200); // Navigate after successful add
      handleClose();
    }
  };

  const handleWorkflowNameChange = (event) => {
    setWorkflowName(event.target.value);
    if (event.target.value) {
      setError(false);
    }
  };

  const handleClose = () => {
    setWorkflowName('');
    setCategoryList('Home');
    setError(false);
    setCategoryError(false);
    onClose();
  };

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

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

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
        <Tooltip title="Create a workflow with a name and folder location." arrow placement="top">
          Create Workflow
        </Tooltip>
        <IconButton
          onClick={handleClose}
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
            label="Workflow Name"
            placeholder="Name of the workflow"
            value={workflowName}
            onChange={handleWorkflowNameChange}
            error={error}
            helperText={
              error ? (
                'Please enter workflow name.'
              ) : (
                <span>
                  Enter the name of the workflow.{' '}
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
            defaultValue="Home"
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <Tooltip
                    title="Select folder to which the workflow needs to be moved."
                    arrow
                    placement="top"
                  >
                    <span>Select Folder</span>
                  </Tooltip>
                }
                placeholder="Select folder"

                helperText={
                  <span>
                    {categoryError ? (
                      'Please select a folder.'
                    ) : (
                      <>
                        Select the folder or subfolder where you want to create the workflow.{' '}
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
        <Button
          onClick={handleAdd} // Validation and navigation handled in handleAdd
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
