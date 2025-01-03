import { useTheme } from '@emotion/react';
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  List,
  Divider,
  TextField,
  Typography,
  Autocomplete,
  useMediaQuery,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
import {
  listItemCustomStyle,
  commonBulletListStyle,
} from 'src/components/bullet-list-style/bullet-list-style';

export function WebhookDialog({ open, onClose, initialData = null, mode = 'add' }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const [EventList, setEventList] = useState('');
  const [webhookName, setWebhookName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [tasks, setTasks] = useState('');
  const [errors, setErrors] = useState({ name: false, url: false, event: false, tasks: false });
  const [showTaskUsageBox, setShowTaskUsageBox] = useState(false);

  const link_added = 'https://example.com'; // Replace with your dynamic value

  // Points To Remember! common styles
  const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 0, ml: '0px' };

  // Reset form when dialog opens or changes mode
  useEffect(() => {
    if (open) {
      if (initialData) {
        setWebhookName(initialData.workflowName || '');
        setWebhookUrl(initialData.webhookUrl || '');
        setEventList(initialData.webhookEvent || '');
        setTasks('');
      } else {
        resetForm();
      }
    }
  }, [open, initialData, mode]);

  const validateUrl = (url) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const resetForm = () => {
    setWebhookName('');
    setWebhookUrl('');
    setEventList('');
    setTasks('');
    setErrors({ name: false, url: false, event: false, tasks: false });
    setShowTaskUsageBox(false);
  };

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    const urlIsValid = validateUrl(webhookUrl);
    const updatedErrors = {
      name: !webhookName,
      url: !webhookUrl || !urlIsValid,
      event: !EventList,
      tasks: showTaskUsageBox && (!tasks || Number.isNaN(Number(tasks)) || tasks < 0),
    };
    setErrors(updatedErrors);

    // Check if ALL fields are empty
    const allFieldsEmpty =
      !webhookName && !webhookUrl && !EventList && (!showTaskUsageBox || !tasks);

    if (allFieldsEmpty) {
      setIsLoading(false);
      return;
    }

    if (Object.values(updatedErrors).some((error) => error)) {
      setIsLoading(false);
      return;
    }

    // Rest of the existing submit logic remains the same
    const message =
      mode === 'add' ? 'Webhook URL added successfully!' : 'Webhook Updated Successfully!';

    setSnackbarMessage(message);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    setTimeout(() => {
      onClose();
      resetForm();
      setIsLoading(false);
    }, 1200);
  };

  const handleDialogClose = () => {
    onClose();
    resetForm();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;

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
          {mode === 'add' ? 'Add Webhook' : 'Update Webhook'}
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
            placeholder="Enter webhook name here"
            error={errors.name}
            helperText={
              errors.name ? (
                'Webhook Name is required.'
              ) : (
                <span>
                  Enter the name of the webhook.{' '}
                  <LearnMoreLink link="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&t" />
                </span>
              )
            }
            value={webhookName}
            onChange={(e) => {
              setWebhookName(e.target.value);
              setErrors((prev) => ({ ...prev, name: false }));
            }}
          />

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Webhook URL"
              placeholder="Enter webhook URL here"
              error={errors.url}
              helperText={
                errors.url ? (
                  webhookUrl ? (
                    'Webhook URL is not valid.'
                  ) : (
                    'Webhook URL is required.'
                  )
                ) : (
                  <span>
                    Ensure that the webhook URL is correct.{' '}
                    <LearnMoreLink link="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&t" />
                  </span>
                )
              }
              value={webhookUrl}
              onChange={(e) => {
                const url = e.target.value;
                setWebhookUrl(url);
                setErrors((prev) => ({
                  ...prev,
                  url: url ? !validateUrl(url) : false,
                }));
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
                  placeholder="Select"
                  error={errors.event}
                  helperText={
                    errors.event ? (
                      'Webhook Event is required.'
                    ) : (
                      <span>
                        Select the event for which you want to be notified.{' '}
                        <LearnMoreLink link="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&t" />
                      </span>
                    )
                  }
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
                placeholder="Enter the monthly task usage percent value. E.g. 80"
                value={tasks}
                onChange={handleChangeTasks}
                error={errors.tasks}
                helperText={
                  errors.tasks
                    ? 'Enter the monthly task usage percent value. E.g. 80'
                    : 'Enter the monthly task usage value in percent for which you should be notified.'
                }
              />
            </Box>
          )}

          <span>
            <Box sx={{ ml: '14px' }}>
              <Typography variant="subtitle1" sx={commonTypographyStyle}>
                Points To Remember!
              </Typography>

              <List sx={{ ...commonBulletListStyle, mb: 0 }}>
                <ul style={commonBulletListStyle}>
                  {[
                    'All the events will be triggered on the added webhook URL.',
                    'You can select the events for specific webhooks URL.',
                    'You can set up upto 5 webhooks URLs.',
                  ].map((text, index) => (
                    <li key={index} style={{ ...listItemCustomStyle, marginBottom: 4 }}>
                      <span style={{ fontSize: '12px' }}>{text}</span>
                    </li>
                  ))}
                </ul>
              </List>
            </Box>
          </span>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" disabled={isLoading} color="primary">
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : mode === 'add' ? (
              'Add Webhook'
            ) : (
              'Update'
            )}
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
