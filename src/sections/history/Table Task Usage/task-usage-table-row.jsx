import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Alert, Avatar, Tooltip, Snackbar, AvatarGroup } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { usePopover } from 'src/components/custom-popover';

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const navigate = useNavigate(); // Use the useNavigate hook

  const theme = useTheme();

  const collapse = useBoolean();
  const popover = usePopover();
  const [openDrawer2, setOpenDrawer2] = useState(false);

  const [showToken, setShowToken] = useState(false);

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
  };

  const handleOpenDrawer2 = () => {
    setOpenDrawer2(true);
  };

  const handleCloseDrawer2 = () => {
    setOpenDrawer2(false);
  };

  const handleCopyClick = () => {
    setSnackbarMessage('Id copied!');
    setSnackbarOpen(true);
    popover.onOpen(); // Optionally open the popover or handle any additional logic
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleRowClick = () => {
    navigate(paths.dashboard.workflow); // Use navigate instead of Navigate
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      {/* Checkbox */}
      {/* <TableCell padding="checkbox">
        <Tooltip title="Select Row" arrow placement="top">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip>
      </TableCell> */}

      {/* status / Task Status */}
      <TableCell width={170}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip title={`Workflow is ${row.status}.`} placement="top" arrow>
              <Label
                variant="soft"
                color={
                  (row.status === 'active' && 'success') ||
                  (row.status === 'inactive' && 'error') ||
                  'default'
                }
              >
                {row.status}
              </Label>
            </Tooltip>

            <Tooltip
              title={`Execution Time: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
              placement="bottom"
              arrow
            >
              <Box
                sx={{ width: 170, whiteSpace: 'nowrap', color: 'text.disabled' }}
                component="span"
              >
                {row.createdAt}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      {/* Application */}
      <TableCell width={180}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Tooltip title="Integrated applications" placement="top" arrow>
            <AvatarGroup variant="rounded">
              {/* First avatar */}
              <Avatar
                alt="app1"
                sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
                src={row.icon1}
              />

              {/* Second avatar */}
              <Avatar
                alt="app2"
                sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
                src={row.icon2}
              />

              {/* The "+4" avatar */}
              <Avatar
                alt="+4"
                sx={{
                  padding: 1,
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#EDEFF2',
                  color: '#078dee',
                  fontWeight: '900',
                }}
              >
                {row.appNumbers}
              </Avatar>
            </AvatarGroup>
          </Tooltip>
        </Stack>
      </TableCell>

      {/* Workflow Name */}
      <TableCell width={450} sx={{ cursor: 'pointer' }} onClick={handleRowClick}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              color: '#078dee',
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
              // cursor: 'pointer',
            }}
          >
            <Tooltip title={`Workflow Name: ${row.workflowName}`} placement="top" arrow>
              <Box
                component="span"
                sx={{
                  width: 590,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {row.workflowName}
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

      {/* Task Consumption */}
      <TableCell width={380} align="right">
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-end', width: '220px' }}
          >
            <Tooltip
              title="Number of tasks consumed in the last 30 days. We do not count trigger steps and internal application steps in your task consumption. We only count tasks when an action is done in an external software. For Example: Add a new row inside Google Sheets."
              placement="top"
              arrow
            >
              <Box sx={{ width: 185, whiteSpace: 'nowrap' }} component="span">
                {row.totalQuantity} 61789 Tasks Consumed
              </Box>
            </Tooltip>
            <Tooltip
              title="Pabbly Connect does not charge tasks for triggers and internal application steps. You're saving 50% on task usage by using Pabbly Connect."
              placement="bottom"
              arrow
            >
              <Box component="span" sx={{ color: 'text.disabled' }}>
                69825 Free Tasks Consumed
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
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
          Task History Copied Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
