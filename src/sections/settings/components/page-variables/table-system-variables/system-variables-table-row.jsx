import React from 'react';
import { toast } from 'sonner';

import {
  Box,
  Stack,
  Tooltip,
  TableRow,
  useTheme,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

import { popover } from 'src/theme/core/components/popover';

import { Iconify } from 'src/components/iconify';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const theme = useTheme();

  // const handleCopyClick = () => {
  //   // Wrap the variable name with {{ and }}
  //   const formattedText = `{{${row.variableName}}}`;

  //   navigator.clipboard
  //     .writeText(formattedText) // Copy the formatted variable name to the clipboard
  //     .then(() => {
  //       openSnackbar({
  //         message: 'System variable copied successfully!',
  //         severity: 'success',
  //       });
  //     })
  //     .catch(() => {
  //       openSnackbar({
  //         message: 'Failed to copy system variable.',
  //         severity: 'error',
  //       });
  //     });
  // };

  const handleCopyClick = () => {
    // Wrap the variable name with {{ and }}
    const formattedText = `{{${row.variableName}}}`;

    navigator.clipboard
      .writeText(formattedText) // Copy the formatted variable name to the clipboard
      .then(() => {
        toast.success('System variable copied successfully!');
      })
      .catch(() => {
        toast.error('Failed to copy system variable.');
      });
  };

  return (
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
              <Typography sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                  <span>{serialNumber}</span>
                </Tooltip>
              </Typography>
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
                        <Typography
                          component="span"
                          sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                        >
                          {row.variableName}
                        </Typography>
                      </Box>
                    </Tooltip>

                    {/* Copy Icon */}
                    <Tooltip
                      title="Click here to copy system variable."
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
                    <Typography
                      component="span"
                      sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                    >
                      {row.description}
                    </Typography>
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
          <Tooltip title={`Variable Data: ${row.variableData}`} placement="top" arrow>
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
              <Typography
                component="span"
                sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
              >
                {row.variableData}
              </Typography>
            </Box>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
