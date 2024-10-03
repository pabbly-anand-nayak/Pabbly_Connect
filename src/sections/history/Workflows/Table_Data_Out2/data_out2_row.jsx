import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TableRow, TableCell } from '@mui/material';

export function DataInTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  return (
    <>
      {/* Main Row */}
      <TableRow>
        <TableCell>
          <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {row.teammember || 'Data - Out 2'}
          </Box>
        </TableCell>

        <TableCell>
          <Box
            component="span"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {row.sharedon || 'Data-Out2'}
          </Box>
        </TableCell>
      </TableRow>

      {/* Nested Rows */}
      <TableRow>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box component="span">Data-Out2 </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {row.interval || '28, 29'}
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box component="span">Data-Out2</Box>
          </Stack>
        </TableCell>
        <TableCell width="auto">
          <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {row.timespan || '06:11 (UTC+0)'}
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box component="span">Data-Out2</Box>
          </Stack>
        </TableCell>
        <TableCell width="auto">
          <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {row.timespan || 'Data-Out2'}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}
