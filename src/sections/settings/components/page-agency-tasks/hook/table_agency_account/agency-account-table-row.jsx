import React from 'react';

import { Box, Stack, Tooltip, TableRow, TableCell } from '@mui/material';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
  return (
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

      {/* S.No */}
      <TableCell width={88}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
              {serialNumber}
            </Tooltip>{' '}
          </Stack>
        </Stack>
      </TableCell>

      {/* Date */}
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip
              title={`Assigned On: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
              placement="top"
              arrow
            >
              <Box sx={{ width: 145, whiteSpace: 'nowrap' }} component="span">
                {row.createdAt}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      {/* Email */}
      <TableCell width={250}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              // color: '#078dee',
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
              cursor: 'pointer',
            }}
          >
            <Box
              component="span"
              sx={{
                width: 200,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <Tooltip title={`Assigned by ${row.workflowName}`} placement="top" arrow>
                {row.workflowName}
              </Tooltip>
            </Box>
            {/* <Tooltip title="Folder Name: Home" placement="bottom" arrow>
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  Home
                </Box>
              </Tooltip> */}
          </Stack>
        </Stack>
      </TableCell>

      {/* Status */}
      {/* <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip title={`Task type ${row.status}`} placement="top" arrow>
              <Label
                variant="soft"
                color={
                  (row.status === 'revocable' && 'success') ||
                  (row.status === 'non-revocable' && 'error') ||
                  'default'
                }
              >
                {row.status === 'revocable' ? 'Revocable' : 'Non-Revocable'}
              </Label>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell> */}

      {/* Tasks Assigned */}
      <TableCell width={300} align="right">
        <Stack spacing={1} direction="column" alignItems="flex-end">
          <Tooltip
            title="This indicates the number of tasks assigned to you by other Pabbly Connect accounts."
            placement="top"
            arrow
          >
            <Box sx={{ whiteSpace: 'nowrap' }} component="span">
              {Intl.NumberFormat().format(10000)}
            </Box>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
