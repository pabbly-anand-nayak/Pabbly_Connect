import React from 'react';

import Box from '@mui/material/Box';
import { TableRow, TableCell } from '@mui/material';

export function DataInTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  return (
    <>
      {/* Main Row */}
      <TableRow>
        <TableCell>
          <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {row.teammember || 'Api Endpoint Url'}
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
            {row.sharedon || 'wwww.'}
          </Box>
        </TableCell>
      </TableRow>

      {/* Nested Rows */}
      {/* <TableRow>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box component="span">Every </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {row.interval || '1'}
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box component="span">Time Span</Box>
          </Stack>
        </TableCell>
        <TableCell width="auto">
          <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {row.timespan || 'Minutes'}
          </Box>
        </TableCell>
      </TableRow> */}
    </>
  );
}
