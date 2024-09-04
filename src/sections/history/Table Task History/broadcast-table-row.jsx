import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import {
  Alert,
  Avatar,
  Divider,
  Tooltip,
  Checkbox,
  Snackbar,
  Typography,
  AvatarGroup,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCopyClick = () => {
    setSnackbarMessage('Id copied!');
    setSnackbarOpen(true);
    popover.onOpen(); // Optionally open the popover or handle any additional logic
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>

      <TableCell width={260}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title="Execution Time: Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata"
              placement="top"
              arrow
            >
              <Box component="span">Aug 22, 2024</Box>
            </Tooltip>
            <Tooltip
              title="Execution Time: Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata"
              placement="bottom"
              arrow
            >
              <Box component="span" sx={{ color: 'text.disabled' }}>
                08:23:31
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={137}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Integrated applications" placement="top" arrow>
              <AvatarGroup total={2}>
                <Avatar
                  alt="app1"
                  sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
                  src="/assets/icons/app logo/pabbly_icon.png"
                />
                <Avatar
                  alt="app2"
                  sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
                  src="/assets/icons/app logo/thrivecart.png"
                />
              </AvatarGroup>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={550}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title="Workflow Name: Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment"
              placement="top"
              arrow
            >
              <Box
                component="span"
                sx={{
                  width: 430, // adjust width as needed
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment
              </Box>
            </Tooltip>
            <Tooltip title="Folder Name: Home" placement="bottom" arrow>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                Home
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={260}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title="Total number of steps executed in the workflow includes both free and paid steps."
              placement="top"
              arrow
            >
              <Box component="span">2 Steps Workflow</Box>
            </Tooltip>
            <Tooltip
              title="Pabbly Connect does not charge tasks for triggers and internal application steps. You're saving 50% on task usage by using Pabbly Connect."
              placement="bottom"
              arrow
            >
              <Box component="span" sx={{ color: 'text.disabled' }}>
                2 Free Tasks
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              color: '#078dee',
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Click here to view task details in brief." placement="top" arrow>
              <Box component="span">IjU3NjUwNTZm...</Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={110}>
        <Stack
          sx={{
            typography: 'body2',
            flex: '1 1 auto',
            alignItems: 'flex-start',
          }}
        >
          {row.status === 'success' && (
            <Label
              variant="soft"
              color="success"
              startIcon={<Iconify icon="heroicons:check-circle-16-solid" />}
            >
              Success
            </Label>
          )}
          {row.status === 'partial Failed' && (
            <Label
              variant="soft"
              color="warning"
              startIcon={<Iconify icon="ant-design:close-circle-filled" />}
            >
              Partial Failed
            </Label>
          )}
          {row.status === 'failed' && (
            <Label
              variant="soft"
              color="error"
              startIcon={<Iconify icon="ant-design:close-circle-filled" />}
            >
              Failed
            </Label>
          )}
          {row.status === 'failed' && (
            <Tooltip
              title="This is a child task created after the re-execution of a parent task. Parent Task History ID is IjU3NjUwNTZlMDYzNjA0MzE1MjZmIg_3D_3D_pc"
              placement="top"
              arrow
            >
              <IconButton color={popover.open ? 'inherit' : 'default'} onClick={handleCopyClick}>
                <Iconify sx={{ width: '20px', height: '20px' }} icon="ion:copy" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            <Stack>
              <Box sx={{ p: '12px 24px 12px 24px' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Receivers List
                </Typography>
                <Typography sx={{ mb: '2px' }} fontSize="14px" color="text.secondary">
                  <Box component="span" fontWeight="medium" color="text.primary">
                    Included:
                  </Box>{' '}
                  Pabbly Connect List 1, Pabbly Connect List 2
                </Typography>
                <Divider />
                <Box sx={{ p: '12px 24px' }}>
                  <Typography fontSize="14px" color="text.secondary">
                    <Box component="span" fontWeight="medium" color="text.primary">
                      Note:
                    </Box>{' '}
                    Task execution times are displayed in your timezone. To view the exact execution
                    times in UTC, check the workflow history.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}
      {renderSecondary}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
