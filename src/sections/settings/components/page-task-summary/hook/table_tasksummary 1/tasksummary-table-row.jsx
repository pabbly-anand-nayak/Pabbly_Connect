import React from 'react';

import { Box, Stack, Tooltip, TableRow, Checkbox, TableCell } from '@mui/material';

import { Label } from 'src/components/label';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, serialNumber }) {
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
            <Box component="span">{serialNumber}</Box>
          </Stack>
        </Stack>
      </TableCell>

      {/* Date */}
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip title={`Assigned On ${row.createdAt}`} placement="bottom" arrow>
              <Box
                sx={{ width: 145, whiteSpace: 'nowrap', color: 'text.disabled' }}
                component="span"
              >
                {row.createdAt}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      {/* <TableCell width={288}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Tooltip title={`Workflow is ${row.status}`} placement="top" arrow>
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
              <Tooltip title={`Workflow Created: ${row.createdAt}`} placement="bottom" arrow>
                <Box
                  sx={{ width: 145, whiteSpace: 'nowrap', color: 'text.disabled' }}
                  component="span"
                >
                  {row.createdAt}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell> */}

      {/* Email */}
      <TableCell width={200}>
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
            <Tooltip title={`Assigned to ${row.workflowName}`} placement="top" arrow>
              <Box
                component="span"
                sx={{
                  width: 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {row.workflowName}
              </Box>
            </Tooltip>
            {/* <Tooltip title="Folder Name: Home" placement="bottom" arrow>
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  Home
                </Box>
              </Tooltip> */}
          </Stack>
        </Stack>
      </TableCell>

      {/* Status */}
      <TableCell width={288}>
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
      </TableCell>

      {/* Tasks Assigned */}
      <TableCell width={300} align="right">
        <Stack spacing={1} direction="column" alignItems="flex-end">
          <Tooltip title="This indicates the total number of tasks assigned" placement="top" arrow>
            <Box sx={{ whiteSpace: 'nowrap' }} component="span">
              {row.totalQuantity}000
            </Box>
          </Tooltip>
        </Stack>
      </TableCell>

      <TableCell width={4} align="right">
        {/* <Stack spacing={1} direction="column" alignItems="flex-end">
          <Tooltip title="This indicates the total number of tasks consumed" placement="top" arrow>
            <Box sx={{ whiteSpace: 'nowrap' }} component="span">
              {row.totalQuantity}
            </Box>
          </Tooltip>
        </Stack> */}
      </TableCell>
    </TableRow>
  );
}
