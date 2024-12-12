import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Card,
  Button,
  Divider,
  Tooltip,
  TextField,
  CardHeader,
  useMediaQuery,
} from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

import WebhookTable from '../components/page-webhook/table-webhook/webhook-table';
import { WebhookDialog } from '../components/page-webhook/hook/add-update-webhook-dialog';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function APIWebhooksPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Custom handler to open dialog
  const [isWebhookDialogOpen, setDialogOpen] = useState(false);

  const handleConfigureWebhook = () => {
    setDialogOpen(true);
  };

  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText('●●●●●●●●●●●●●●●●●●')
      .then(() => {
        showSnackbar('API Token copied to clipboard!', 'success');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        showSnackbar('Failed to copy API Token', 'error');
      });
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGenerateTokenClick = () => {
    // Logic to generate API token here...

    // Show the new Snackbar
    showSnackbar('API Token Generated Successfully!', 'success');
  };

  return (
    <>
      <Card
        sx={{
          mb: '32px',
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        }}
      >
        <CardHeader
          title={
            <Box>
              <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
                <Tooltip
                  title="You can obtain your Pabbly Connect API token from here."
                  arrow
                  placement="top"
                >
                  API
                </Tooltip>
              </Box>
            </Box>
          }
          sx={{
            p: 3,
          }}
        />
        <Divider />

        <Box sx={{ p: 3 }}>
          <TextField
            variant="outlined"
            label="Here's Your Pabbly Connect API Token"
            value="●●●●●●●●●●●●●●●●●●"
            helperText={
              <span>
                Enter the above API token for the Pabbly Connect Manager app. When a new API token
                is generated, the previous API token will no longer be valid.
              </span>
            }
            InputProps={{
              endAdornment: (
                <Tooltip title="Copy API Token" arrow placement="top" sx={{ fontSize: '16px' }}>
                  <Box component="span" sx={{ cursor: 'pointer' }}>
                    <Iconify
                      icon="solar:copy-bold"
                      onClick={copyToClipboard}
                      style={{ width: 20, height: 20, color: '#637381' }}
                    />
                  </Box>
                </Tooltip>
              ),
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Tooltip
              title="Click here to generate API Token. Generating a new API Token will automatically revoke any previously generated API Token."
              arrow
              placement="top"
            >
              <Button variant="contained" color="primary" onClick={handleGenerateTokenClick}>
                Generate API Token
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Card>

      <BigCard
        title="Points To Remember!"
        secondarytitle=""
        steps={[
          "Click 'Generate API Token' to create a new token, invalidating the previous one.",
          "Click 'Copy' to quickly copy the API token for use in Pabbly Connect Manager application.",
          'Ensure that you do not share the API token with anyone. ',
          <>
            With the Pabbly Connect API, you can obtain real-time status updates for workflows,
            manage team members, and much more.{' '}
          </>,
        ]}
        learnMoreLink=""
        videoThumbnail="API_Webhooks.png"
        videoId="https://www.youtube.com/embed/Lv9Rnzoh-vY"
        buttonText="Add Webhook"
        buttonTooltip="Click here to add a webhook URL and a webhook event that will trigger the webhook URL."
        onButtonClick={handleConfigureWebhook}
        buttonIcon="heroicons:plus-circle-16-solid"
      />

      {/* Separate Dialog */}
      <WebhookDialog open={isWebhookDialogOpen} onClose={() => setDialogOpen(false)} />

      <WebhookTable />

      {/* Custom Snackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
}
