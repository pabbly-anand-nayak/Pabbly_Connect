import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Card,
  Alert,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  CardHeader,
  useMediaQuery,
} from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';

import WebhookTable from '../components/webhook/table-webhook/webhook -table';
import { WebhookDialog } from '../components/webhook/hook/webhook_dialog_component';

// Changed 'timezone' to 'timezone'

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function APIWebhooksPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false); // State for the new Snackbar

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
        showSnackbar('API Token copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleShareSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShareSnackbarOpen(false);
  };

  const handleGenerateTokenClick = () => {
    // Logic to generate API token here...

    // Show the new Snackbar
    setShareSnackbarOpen(true);
  };

  return (
    <>
      {/* <Box> */}
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
          {/* <Typography variant="h6" sx={{ mb: 2 }}>
            Here&apos;s your Pabbly Connect API Token
          </Typography> */}
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
      {/* <APIWebhooksBigCard /> */}
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
        learnMoreLink="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly"
        videoThumbnail="API_Webhooks.png"
        videoId="https://www.youtube.com/embed/Lv9Rnzoh-vY"
        buttonText="Add Webhook"
        buttonTooltip="Click here to add a webhook URL and a webhook event that will trigger the webhook URL."
        onButtonClick={handleConfigureWebhook}
        buttonIcon="heroicons:plus-circle-16-solid" // Changed to a link icon
      />

      {/* Separate Dialog */}
      <WebhookDialog open={isWebhookDialogOpen} onClose={() => setDialogOpen(false)} />

      <WebhookTable />
      {/* </Box> */}
      {/* API Token Generated Successfully! */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
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
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* New Snackbar for "Share Successfully!" */}
      <Snackbar
        open={shareSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleShareSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        }}
      >
        <Alert
          onClose={handleShareSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          API Token Generated Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
