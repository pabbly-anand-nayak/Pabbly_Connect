import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Alert,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  Autocomplete,
  useMediaQuery,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function UpdateWebhookDialog({ title, content, action, open, onClose, initialData }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const [EventList, setEventList] = useState('');
  const [webhookName, setWebhookName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tasks, setTasks] = useState('');
  const [errors, setErrors] = useState({ name: false, url: false, event: false, tasks: false });
  const [showTaskUsageBox, setShowTaskUsageBox] = useState(false);

  useEffect(() => {
    if (initialData) {
      setWebhookName(initialData.webhook_name || '');
      setWebhookUrl(initialData.webhook_url || '');
      setEventList(initialData.webhook_event || '');
    }
  }, [initialData]);

  // Cleanup function to reset all fields and errors
  const resetForm = () => {
    setErrors({ name: false, url: false, event: false, tasks: false });
  };

  const handleAdd = () => {
    const updatedErrors = {
      name: !webhookName,
      url: !webhookUrl,
      event: !EventList,
      tasks: !tasks || Number.isNaN(Number(tasks)) || tasks < 0,
    };
    setErrors(updatedErrors);

    if (Object.values(updatedErrors).some((error) => error)) {
      return;
    }

    setSnackbarOpen(true);
    onClose();
    resetForm();
  };

  const handleDialogClose = () => {
    onClose();
    resetForm();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChangeTasks = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setTasks(value);
      setErrors((prev) => ({ ...prev, tasks: false }));
    } else {
      setErrors((prev) => ({ ...prev, tasks: true }));
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          {title}
          <Iconify
            onClick={handleDialogClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Webhook Name"
            error={errors.name}
            helperText={errors.name ? 'Webhook Name is required.' : ''}
            value={webhookName}
            onChange={(e) => {
              setWebhookName(e.target.value);
              setErrors((prev) => ({ ...prev, name: false }));
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter webhook name here."
                    arrow
                    placement="top"
                    sx={{ fontSize: '16px' }}
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

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Webhook URL"
              error={errors.url}
              helperText={errors.url ? 'Webhook URL is required.' : ''}
              value={webhookUrl}
              onChange={(e) => {
                setWebhookUrl(e.target.value);
                setErrors((prev) => ({ ...prev, url: false }));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Ensure that the webhook URL is correct."
                      arrow
                      placement="top"
                      sx={{ fontSize: '16px' }}
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

            <Autocomplete
              fullWidth
              options={[
                { value: 'New Workflow Error', label: 'New Workflow Error' },
                { value: 'Task Usage Limit Reached', label: 'Task Usage Limit Reached' },
                { value: 'Task Usage Limit Exhausted', label: 'Task Usage Limit Exhausted' },
              ]}
              getOptionLabel={(option) => option.label}
              value={EventList ? { value: EventList, label: EventList } : null}
              onChange={(event, newValue) => {
                setEventList(newValue ? newValue.value : '');
                setErrors((prev) => ({ ...prev, event: !newValue }));
                setShowTaskUsageBox(newValue && newValue.value === 'Task Usage Limit Reached');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: '100%' }}
                  variant="outlined"
                  label="Webhook Event"
                  error={errors.event}
                  helperText={
                    errors.event ? (
                      'Webhook Event is required.'
                    ) : (
                      <span>
                        Select the event for which you want to be notified.{' '}
                        <Link
                          href="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly"
                          style={{ color: '#078DEE' }}
                          underline="always"
                        >
                          Learn more
                        </Link>
                      </span>
                    )
                  }
                  InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
                  inputProps={{ id: `outlined-select-currency-label`, ...params.inputProps }}
                />
              )}
            />
          </Box>

          {showTaskUsageBox && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label="Monthly Task Usage Reached (%)"
                value={tasks}
                onChange={handleChangeTasks}
                error={errors.tasks}
                helperText={
                  errors.tasks ? (
                    'Enter the monthly task usage percent value. E.g. 80'
                  ) : (
                    <span>
                      Enter the monthly task usage value in percent for which you should be
                      notified.{' '}
                      <Link href="#" style={{ color: '#078DEE' }} underline="always">
                        Learn more
                      </Link>
                    </span>
                  )
                }
                InputProps={{}}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Update
          </Button>

          <Button onClick={handleDialogClose} variant="outlined" color="inherit">
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
          mt: 13,
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
          Webhook Updated Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
