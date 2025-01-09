import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';

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
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function ReexecuteWorkflowDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const [workflowName, setWorkflowName] = useState('');
  const [error, setError] = useState(false);
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
    // Show snackbar and close dialog
    setSnackbarOpen(true);
    onClose();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
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
      setCategoryList('Home'); // Reset to Home when dialog is closed
    }
  }, [open]);

  const ResizableTextarea = styled('textarea')({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,

    width: '100%',
    resize: 'vertical',
    minHeight: '38px',
    maxHeight: '200px',
    padding: '8.5px 14px',
    fontFamily: 'inherit',
    fontSize: '15px',
    // color: '#1c252e',
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,

    border: '1px solid rgba(145, 158, 171, 0.2)',
    borderRadius: '8px',
    '&:hover': {
      outline: 'none',
      border: '1px solid #1c252e',
    },
    '&:focus': {
      outline: 'none',
      border: '2px solid #1c252e',
    },
  });

  const workflowOptions = [
    { label: 'How Often You Want To Run Your Workflow?', textareaValue: 'At Regular Intervals' },
    { label: 'Every', textareaValue: '1' },
    { label: 'Time Span', textareaValue: 'Minutes' },
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
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  typography: 'subtitle2',
                  fontSize: '18px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  pb: 1,
                }}
              >
                <Iconify
                  sx={{ color: '#ff5630', width: '24px', height: '24px', mr: 1 }}
                  icon="ooui:error"
                />
                <Tooltip
                  title="Create a workflow with a name and folder location."
                  arrow
                  placement="top"
                >
                  <span>Re-execute Workflow</span>
                </Tooltip>
              </Box>
            </Box>

            <Box sx={{ typography: 'body2', fontSize: '14px', color: 'text.secondary' }}>
              You have the option to customize your request with custom data and re-execute this
              workflow. Alternatively, you can also choose to send the request as it is, without
              making any changes.
            </Box>
          </Box>
        </DialogTitle>

        <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              {workflowOptions.map((option, index) => (
                <Box display="flex" gap={2} mb={2} key={index}>
                  <Box width="50%">
                    <TextField size="small" value={option.label} variant="outlined" fullWidth />
                  </Box>
                  <Box width="50%">
                    <ResizableTextarea defaultValue={option.textareaValue} rows={1} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} color="primary" variant="contained">
            Re-execute now!
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 1,
          zIndex: (theme1) => theme1.zIndex.snackbar,
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
          You have successfully re-executed the &#39;Entire Workflow&#39;.
        </Alert>
      </Snackbar>
    </>
  );
}
