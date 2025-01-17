import { toast } from 'sonner';
import React, { useState } from 'react';

import {
  Box,
  Stack,
  Tooltip,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

import { popover } from 'src/theme/core/components/popover';

import { Iconify } from 'src/components/iconify';


export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const [anchorEl, setAnchorEl] = useState(null);


  const handleCopyClick = () => {
    const formattedText = `{{${row.newData}}}`;

    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        toast.success('New variable data copied!');
      })
      .catch(() => {
        toast.error('Failed to copy new variable data.');
      });
  };


  // Example logs data
  const logs = [
    {
      date: 'Oct 17, 2024 13:05:58',
      changed_by: 'Anand Nayak',
      newData: 'New data',

    },
    {
      date: 'Oct 17, 2024 13:05:58',
      changed_by: 'Nayak',
      changed_by_workflow: 'workflow',
      newData: '2024 13:05:58',

    },
    {
      date: 'Oct 17, 2024 13:05:58',
      changed_by_workflow: 'workflow',
      newData: 'New data',

    },
    {
      date: 'Oct 17, 2024 13:05:58',
      changed_by: 'Anand Nayak',
      newData: 'Anand New data',

    },
    {
      date: 'Oct 17, 2024 13:05:58',
      changed_by_workflow: 'workflow',
      newData: 'New data Anand',

    },
    {
      date: 'Oct 17, 2024 13:05:58',
      changed_by_workflow: 'workflow',
      newData: '13:05:58 New data',

    },
  ];

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
      <TableCell width={60} >
        <Stack spacing={2} direction="row" alignItems="center">
          <Box component="span">
            <Typography
              sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
            >
              <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                <span>{serialNumber}</span>
              </Tooltip>
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      {/* Created On */}
      <TableCell width={150}>
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
                width: 150,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <Typography
                sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
              >
                <Tooltip
                  title={`Updated On: ${row.updatedAt}, (UTC+05:30) Asia/Kolkata`}
                  placement="top"
                  arrow
                >
                  <span>{row.updatedAt}</span>
                </Tooltip>
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      {/* Changed By Data */}
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
            <Box sx={{ display: 'auto' }}>
              <Box sx={{ width: 220, gap: 1, alignItems: 'center', display: 'flex' }}>
                {/* changed By */}
                <Tooltip title={`Changed By: ${row.changedBy}`} placement="top" arrow>
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
                      <span>{row.changedBy}</span>

                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      {/* New Data */}
      <TableCell width={300} >
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
                // width: 270,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                position: 'relative',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ display: 'auto' }}>
                  <Box sx={{ width: 360, gap: 1, alignItems: 'center', display: 'flex' }}>
                    {/* New Data */}
                    <Tooltip
                      title={`New Data: ${row.newData.slice(0, 1000)}${row.newData.length > 1000 ? '...' : ''}`} // Truncate tooltip content if too long
                      placement="top"
                      arrow
                    >
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
                          {row.newData}
                        </Typography>
                      </Box>
                    </Tooltip>

                    {/* Copy Icon */}
                    <Tooltip
                      title="Click here to copy new data."
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

    </TableRow>
  );
}
