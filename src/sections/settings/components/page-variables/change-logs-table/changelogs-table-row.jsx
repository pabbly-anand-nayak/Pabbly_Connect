import { toast } from 'sonner';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Box,
  Stack,
  Tooltip,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { popover } from 'src/theme/core/components/popover';

import { Iconify } from 'src/components/iconify';


export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();


  const handleCopyClick = () => {
    const formattedText = `{{${row.variableData}}}`;

    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        toast.success('New variable data copied!');
      })
      .catch(() => {
        toast.error('Failed to copy new variable data.');
      });
  };

  const handleRowClick = () => {
    navigate(paths.dashboard.workflow);
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

      {/* Updated On */}
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
      {/* <TableCell width={200}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box sx={{ display: 'auto' }}>
              <Box sx={{ width: 220, gap: 1, alignItems: 'center', display: 'flex' }}>
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

                    <Tooltip title={`Changed By Workflow: ${row.changed_By_Workflow}`} placement="top" arrow>
                      <Typography
                        component="span"
                        sx={{
                          color: '#078dee',
                          cursor: 'pointer',

                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        <span>{row.changed_By_Workflow}</span>
                      </Typography>
                    </Tooltip>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </TableCell> */}

      {/* Changed By Data */}
      <TableCell width={200}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box sx={{ display: 'auto' }}>
              <Box sx={{ width: 220, gap: 1, alignItems: 'center', display: 'flex' }}>
                {/* Conditionally Render Changed By or Changed By Workflow */}
                {serialNumber === 1 || serialNumber === 3 ? ( // Show Changed By Workflow for the first row
                  <Tooltip title={`Changed by Workflow: ${row.changed_By_Workflow}`} placement="top" arrow>
                    <Typography
                      onClick={handleRowClick}
                      component="span"
                      sx={{
                        color: '#078dee',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <span>{row.changed_By_Workflow}</span>
                    </Typography>
                  </Tooltip>
                ) : (
                  <Tooltip title={`Changed By: ${row.changedBy}`} placement="top" arrow>
                    <Typography
                      component="span"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <span>{row.changedBy}</span>
                    </Typography>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Stack>
        </Stack>
      </TableCell>


      {/* Variable New Data */}
      <TableCell width={300} >
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
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
                      title={`Variable Data: ${row.variableData.slice(0, 1000)}${row.variableData.length > 1000 ? '...' : ''}`} // Truncate tooltip content if too long
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
                          {row.variableData}
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
