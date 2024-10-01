import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useTheme } from '@mui/material/styles';
import { Box, Alert, Snackbar } from '@mui/material';

import { Iconify } from 'src/components/iconify'; // To use theme for styling

const codeString = `
{
    "How often you want to run your workflow?": "Dates of the month",
    "Days": "28, 29",
    "Time": "06:11 (UTC+0)",
    "Local Time": "11:41 (Asia/Kolkata)"
}`;

const CodeViewer = () => {
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);
  const theme = useTheme(); // Access the theme for Alert styles

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setShareSnackbarOpen(true); // Open the snackbar after copying
  };

  const handleShareSnackbarClose = () => {
    setShareSnackbarOpen(false); // Close the snackbar after a certain duration
  };

  return (
    <Box sx={{ position: 'relative', mt: 2 }}>
      <SyntaxHighlighter
        language="javascript"
        style={atomDark}
        customStyle={{
          borderRadius: '4px',
          padding: '16px',
          fontSize: '14px',
          width: '100%',
          maxWidth: '860px',
          boxSizing: 'border-box',
          minWidth: 'auto',
        }}
      >
        {codeString}
      </SyntaxHighlighter>

      {/* Copy Icon positioned on the top-right */}
      <Box
        component="span"
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
        }}
        onClick={copyToClipboard}
      >
        <Iconify icon="solar:copy-bold" style={{ width: 20, height: 20, color: '#ffffff' }} />
      </Box>

      {/* Customized Snackbar with Alert */}
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
          Copied!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CodeViewer;
