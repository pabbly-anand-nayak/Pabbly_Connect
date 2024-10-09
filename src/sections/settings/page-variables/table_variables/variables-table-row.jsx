import React from 'react';

import { Box, Stack, Tooltip, TableRow, Checkbox, TableCell } from '@mui/material';

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

      {/*  Variable Name */}
      <TableCell width={300}>
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
                  width: 300,
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

      {/* Variable Data */}
      <TableCell width={400}>
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
                  width: 200,
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

      {/* Created On */}
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
            <Tooltip title={`Assigned to ${row.createdOn}`} placement="top" arrow>
              <Box
                component="span"
                sx={{
                  width: 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {row.createdOn}
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

      {/* Last Updated On */}
      <TableCell width={200} align="right">
        <Stack spacing={1} direction="column" alignItems="flex-end">
          <Tooltip title="This indicates the total number of tasks assigned" placement="top" arrow>
            <Box sx={{ whiteSpace: 'nowrap' }} component="span">
              {row.createdAt}
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
