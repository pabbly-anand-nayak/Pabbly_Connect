import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Alert, Avatar, Tooltip, Checkbox, Snackbar, IconButton, AvatarGroup } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { ConfigurationDrawer2 } from 'src/sections/history/hook/history-drawer';

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
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

  const renderPrimary = (
    <TableRow
      hover
      selected={selected}
      sx={{
        '&:hover .copy-button': {
          opacity: 1,
        },
      }}
    >
      {/* Checkbox */}
      <TableCell padding="checkbox">
        <Tooltip title="Select Row" arrow placement="top">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip>
      </TableCell>

      {/* Date/Time */}
      <TableCell width={170}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            {row.status === 'live' && (
              <Tooltip title="Task execution was fully successful." arrow placement="top">
                <Label
                  variant="soft"
                  color="success"
                  startIcon={<Iconify icon="heroicons:check-circle-16-solid" />}
                  onClick={handleOpenDrawer2}
                  component="span"
                  sx={{ cursor: 'pointer' }}
                >
                  Success
                </Label>
              </Tooltip>
            )}
            {row.status === 'partialfailed' && (
              <Tooltip title="Task execution failed due to an error." placement="top" arrow>
                <Label
                  variant="soft"
                  color="warning"
                  startIcon={<Iconify icon="ant-design:close-circle-filled" />}
                  onClick={handleOpenDrawer2}
                  component="span"
                  sx={{ cursor: 'pointer' }}
                >
                  Partial Failed
                </Label>
              </Tooltip>
            )}
            {row.status === 'failed' ? (
              <Tooltip
                title="Task execution was failed due to partial failure."
                arrow
                placement="top"
              >
                <Label
                  variant="soft"
                  color="error"
                  startIcon={<Iconify icon="ant-design:close-circle-filled" />}
                >
                  {row.status}
                </Label>
              </Tooltip>
            ) : (
              row.status !== 'live' &&
              row.status !== 'partialfailed' && (
                <Label variant="soft" color="default">
                  {row.status}
                </Label>
              )
            )}
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
      <TableCell width={137}>
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
                +4
              </Avatar>
            </AvatarGroup>
          </Tooltip>
        </Stack>
      </TableCell>

      {/* Workflow Name */}
      <TableCell width={4050}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              color: '#078dee',
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
              cursor: 'pointer',
            }}
          >
            <Tooltip title={`Workflow Name: ${row.workflowName}`} placement="top" arrow>
              <Box
                component="span"
                sx={{
                  width: 520,
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
      <TableCell width={380}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip
              title="This indicates the total number of tasks consumed"
              placement="top"
              arrow
            >
              <Box sx={{ width: 185, whiteSpace: 'nowrap' }} component="span">
                {row.totalQuantity} Steps Workflow
              </Box>
            </Tooltip>
            <Tooltip
              title="This indicates the number of free tasks consumed."
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

      {/* Task History ID */}
      {/* <TableCell width={300} align="right">
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-end',
              cursor: 'pointer',
            }}
          >
            <Box
              component="span"
              sx={{
                width: 300,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                position: 'relative',
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  color: '#078dee',
                  typography: 'body2',
                  flex: '1 1 auto',
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ display: 'auto' }}>
                  <Box sx={{ gap: 1, alignItems: 'center', display: 'flex' }}>
                    <Tooltip
                      title="Click here to view task details in brief."
                      placement="top"
                      arrow
                    >
                      <Box
                        onClick={handleOpenDrawer2}
                        component="span"
                        sx={{
                          width: 180, // adjust width as needed
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer',
                        }}
                      >
                        {row.variableName}
                      </Box>
                    </Tooltip>

                    <Tooltip
                      title="Click here to copy id."
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
              <ConfigurationDrawer2 open={openDrawer2} onClose={handleCloseDrawer2} />
            </Box>
          </Stack>
        </Stack>
      </TableCell> */}

      <TableCell width={200} align="right">
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-end',
              cursor: 'pointer',
            }}
          >
            <Box
              component="span"
              sx={{
                width: 210,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                position: 'relative',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  color: '#078dee',
                  typography: 'body2',
                  flex: '1 1 auto',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end', // Aligns right
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box sx={{ gap: 1, alignItems: 'center', display: 'flex' }}>
                    <Tooltip
                      title="Click here to view task details in brief."
                      placement="top"
                      arrow
                    >
                      <Box
                        onClick={handleOpenDrawer2}
                        component="span"
                        sx={{
                          width: 180, // adjust width as needed
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer',
                        }}
                      >
                        {row.variableName}
                      </Box>
                    </Tooltip>
                    {/* <Tooltip
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
                    </Tooltip> */}
                  </Box>
                </Box>
              </Stack>
              <ConfigurationDrawer2 open={openDrawer2} onClose={handleCloseDrawer2} />
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={200} align="right">
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-end',
              cursor: 'pointer',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ gap: 1, alignItems: 'center', display: 'flex' }}>
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
                    <Iconify width={18} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
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
          mt: 13,
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
