import React, { useState } from 'react';

import {
  Box,
  Stack,
  Alert,
  Tooltip,
  TableRow,
  useTheme,
  Snackbar,
  TableCell,
  IconButton,
} from '@mui/material';

import { popover } from 'src/theme/core/components/popover';

import { Iconify } from 'src/components/iconify';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCopyClick = () => {
    setSnackbarMessage('System variable copied successfully!');
    setSnackbarOpen(true);
    popover.onOpen();
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
        <TableCell width={200}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
            >
              <Box component="span">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ display: 'auto' }}>
                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex' }}>
                      <Tooltip title={`Variable Name: ${row.variableName}`} placement="top" arrow>
                        {row.variableName}
                      </Tooltip>
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
              <Tooltip title={`Description: ${row.description}`} placement="top" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.description}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* variableData */}
        <TableCell width={200} align="right">
          <Stack spacing={1} direction="column" alignItems="flex-end">
            <Box
              component="span"
              sx={{
                width: 200,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {row.variableData}
            </Box>
          </Stack>
        </TableCell>
      </TableRow>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)', mt: 13 }}
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
    </>
  );
}
