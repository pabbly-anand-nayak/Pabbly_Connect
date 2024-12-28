import React, { useState } from 'react';

import { Box, Stack, Tooltip, TableRow, useTheme, TableCell, IconButton } from '@mui/material';

import { popover } from 'src/theme/core/components/popover';

import { Iconify } from 'src/components/iconify';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCopyClick = () => {
    // Wrap the variable name with {{ and }}
    const formattedText = `{{${row.variableName}}}`;

    navigator.clipboard
      .writeText(formattedText) // Copy the formatted variable name to the clipboard
      .then(() => {
        setSnackbarMessage('Variable name copied to clipboard!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage('Failed to copy variable name.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <TableRow
        hover
        selected={selected}
        sx={{
          '&:hover .copy-button': {
            opacity: 1,
          },
        }}
      >
        {/* serialNumber */}
        <TableCell width={50}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box component="span">
                <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                  {serialNumber}
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* variableName */}
        <TableCell width={220}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 220,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  position: 'relative',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ display: 'auto' }}>
                    <Box sx={{ width: 220, gap: 1, alignItems: 'center', display: 'flex' }}>
                      {/* variable Name */}
                      <Tooltip title={`Variable Name: ${row.variableName}`} placement="top" arrow>
                        <Box
                          component="span"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {row.variableName}
                        </Box>
                      </Tooltip>

                      {/* Copy Icon */}
                      <Tooltip
                        title="Click here to copy custom variable."
                        arrow
                        placement="top"
                        sx={{ fontSize: '16px' }}
                      >
                        <IconButton
                          className="copy-button"
                          color={popover.open ? 'inherit' : 'default'}
                          onClick={handleCopyClick}
                          sx={{
                            width: '20px',
                            height: '20px',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            right: 0,
                          }}
                        >
                          <Iconify
                            width={18}
                            icon="solar:copy-bold"
                            sx={{ color: 'text.secondary' }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* description */}
        <TableCell width={500}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack>
              <Box sx={{ display: 'auto' }}>
                <Box sx={{ width: 500, gap: 1, alignItems: 'center', display: 'flex' }}>
                  {/* description */}
                  <Tooltip title={`Description: ${row.description}`} placement="top" arrow>
                    <Box
                      component="span"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {row.description}
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* variableData */}
        <TableCell width={210} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Tooltip title={`Description: ${row.variableData}`} placement="top" arrow>
              <Box
                component="span"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'inline-block',
                  maxWidth: '210px', // Adjust as needed
                }}
              >
                {row.variableData}
              </Box>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      {/* variable Copied  Snackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
}
