import React, { useState } from 'react';

import {
  Box,
  Stack,
  Avatar,
  Tooltip,
  TableRow,
  Checkbox,
  TableCell,
  AvatarGroup,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { ConfigurationDrawer } from '../hook/connections-drawer';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <TableRow hover selected={selected}>
      {/* Checkbox */}
      <TableCell padding="checkbox">
        <Tooltip title="Select this row" arrow placement="top">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip>
      </TableCell>

      {/* Date/Time */}
      <TableCell width={180}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title="Connection Created: Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata"
              placement="top"
              arrow
            >
              <Box
                sx={{
                  width: 'fixed', // adjust width as needed
                  whiteSpace: 'nowrap',
                  color: 'text.disabled',
                }}
                component="span"
              >
                Aug 22, 2024
              </Box>
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

      {/* CONNECTION & APPLICATION NAME */}
      <TableCell width={180}>
        <Stack spacing={2} direction="row" alignItems="center">
          {/* Avatar Group */}
          <Tooltip title={`${row.workflowName}`} placement="top" arrow>
            <AvatarGroup variant="rounded">
              {row.applications.map((app, index) => (
                <Avatar
                  key={index}
                  alt={app.name}
                  src={app.icon}
                  sx={{ padding: 1, width: '24px', height: '24px', backgroundColor: '#EDEFF2' }}
                />
              ))}
            </AvatarGroup>
          </Tooltip>

          {/* Workflow Name and Folder */}
          <Stack
            sx={{
              color: '#078dee',
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
              cursor: 'pointer',
            }}
          >
            <Box
              component="span"
              sx={{
                width: 520,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <Tooltip title={`Connection Name: ${row.workflowName}`} placement="top" arrow>
                {row.workflowName}
              </Tooltip>
            </Box>

            <Tooltip title={`Application Name: ${row.appname}`} placement="bottom" arrow>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.appname}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      {/* NO. OF WORKFLOWS	 */}
      <TableCell width={200} align="right">
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
          <Stack
            sx={{
              color: '#078dee',
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-end', // Aligns text to the right
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end', // Aligns the inner Box content to the right
                alignItems: 'center',
                // gap: 1,
                mb: 0,
              }}
            >
              <Box
                // onClick={handleOpenDrawer}
                component="span"
                onClick={handleOpenDrawer}
                sx={{
                  width: 140, // adjust width as needed
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  cursor: 'pointer',
                  textAlign: 'right', // Aligns text within the box to the right
                }}
              >
                <Tooltip title="Click here to view task details in brief." placement="top" arrow>
                  {row.connectionNumber}
                </Tooltip>
              </Box>
              <ConfigurationDrawer open={openDrawer} onClose={handleCloseDrawer} />
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        {/* <Tooltip title="Select this row" arrow placement="top">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip> */}
      </TableCell>

      {/* CONNECTION STATUS */}
      <TableCell width={180}>
        <Stack
          sx={{
            typography: 'body2',
            display: 'flex',
            flex: '1 1 auto',
            alignItems: 'flex-start',
          }}
        >
          {row.status === 'revocable' && (
            <Tooltip title="Click here to view task details in brief." arrow placement="top">
              <Label
                variant="soft"
                color="success"
                startIcon={<Iconify icon="heroicons:check-circle-16-solid" />}
                onClick={handleOpenDrawer}
                component="span"
                sx={{ cursor: 'pointer' }}
              >
                In Use
              </Label>
            </Tooltip>
          )}
          <ConfigurationDrawer open={openDrawer} onClose={handleCloseDrawer} />
          {row.status === 'non-revocable' && (
            <Tooltip title="Click here to view task details in brief." arrow placement="top">
              <Label
                variant="soft"
                color="error"
                startIcon={<Iconify icon="ant-design:close-circle-filled" />}
                onClick={handleOpenDrawer}
                component="span"
                sx={{ cursor: 'pointer' }}
              >
                Idle
              </Label>
            </Tooltip>
          )}
          {row.status === 'scheduled' ? (
            <Tooltip title="Click here to view task details in brief." arrow placement="top">
              <Label
                variant="soft"
                color="error"
                startIcon={<Iconify icon="ant-design:close-circle-filled" />}
              >
                {row.status}
              </Label>
            </Tooltip>
          ) : (
            row.status !== 'revocable' &&
            row.status !== 'non-revocable' && (
              <Label variant="soft" color="default">
                {row.status}
              </Label>
            )
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
