import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import TextField from '@mui/material/TextField';
import {
  Box,
  Card,
  Alert,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  CardHeader,
  useMediaQuery,
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import BigCard from 'src/sections/api-&-webhook/components/bigcard/big-card';

// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false); // State for the new Snackbar

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
      <DashboardContent maxWidth="xl">
        <PageHeader
          title="API & Webhooks"
          Subheading="Create & manage all of your automation workflows in one place with Pabbly Connect Dashboard."
          link_added="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
          showButton={false}
        />
        <Box sx={{ mt: 4 }}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="API" sx={{ px: 0, pt: 0, pb: 3 }} />
            <Divider sx={{ mx: -3 }} />
            <Box sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                label="Here's your Pabbly Connect API Token"
                value="●●●●●●●●●●●●●●●●●●"
                helperText={
                  <span>
                    Enter the above API token for the Pabbly Connect Manager app. When a new API
                    token is generated, the previous API token will no longer be valid.
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
                <Tooltip title="Click here to add 'Add Webhook'." arrow placement="top">
                  <Button variant="contained" color="primary" onClick={handleGenerateTokenClick}>
                    Generate API Token
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Card>
          <BigCard />
        </Box>
      </DashboardContent>
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
