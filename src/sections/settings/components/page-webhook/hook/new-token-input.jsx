import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Box,
  Card,
  Button,
  Tooltip,
  Divider,
  TextField,
  CardHeader,
  CircularProgress,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

export default function NewTokenInput({ sx, ...other }) {
  const navigate = useNavigate();

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [confirmApiDialog, setConfirmApiDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Handlers
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('●●●●●●●●●●●●●●●●●●');
      showSnackbar('API Token copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showSnackbar('Failed to copy API Token', 'error');
    }
  };

  const handleGenerateTokenClick = () => {
    setIsLoading(true);
    // Add your token generation logic here
    setTimeout(() => {
      setIsLoading(false);
      setConfirmApiDialog(false); // Close dialog after generating
      showSnackbar('API Token Generated Successfully!', 'success');
    }, 1000);
  };

  // Open dialog handler
  const openGenerateDialog = () => {
    setConfirmApiDialog(true);
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
              <Button variant="contained" color="primary" onClick={openGenerateDialog}>
                Generate API Token
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Card>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmApiDialog}
        onClose={() => setConfirmApiDialog(false)}
        title="Generate New API Token"
        content="Generating a new API token will invalidate your current token. Do you want to continue?"
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateTokenClick}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Generate Token'}
          </Button>
        }
      />

      {/* Snackbar for notifications */}
      <CustomSnackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
}
