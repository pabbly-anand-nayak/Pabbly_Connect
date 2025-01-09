import React from 'react';

import {
  Box,
  Stack,
  Tooltip,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';

import { Label } from 'src/components/label';

export function OrderTableRow({ row, selected, onDeleteRow, serialNumber }) {

  return (
    <TableRow hover selected={selected}>
        {/* serialNumber */}
          <TableCell width={88}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Box component="span">
                <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                  <Typography
                    component="span"
                    sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                  >
                    {serialNumber}
                  </Typography>
                </Tooltip>
              </Box>
            </Stack>
          </TableCell>
    
          {/* Assigned On */}
          <TableCell width={288}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Box sx={{ width: 145, whiteSpace: 'nowrap' }} component="span">
                <Tooltip
                  title={`Task Assigned On: ${row.createdAt}, (UTC+05:30) Asia/Kolkata`}
                  placement="top"
                  arrow
                >
                  <Typography
                    component="span"
                    sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                  >
                    {row.createdAt}
                  </Typography>
                </Tooltip>
              </Box>
            </Stack>
          </TableCell>
    
          {/* Email */}
          <TableCell width={400}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Stack sx={{ cursor: 'pointer' }}>
                <Tooltip
                  title="Pabbly Connect Agency account email address that has assigned you tasks."
                  placement="top"
                  arrow
                >
                  <Box
                    component="span"
                    sx={{
                      maxWidth: {
                        xs: '400px',
                        sm: '500px',
                        md: '600px',
                        lg: '650px',
                        xl: '750px',
                      },
                      display: 'inline-block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                    >
                      {row.assignedEmail}
                    </Typography>
                  </Box>
                </Tooltip>
              </Stack>
            </Stack>
          </TableCell>
    
          {/* Task Type */}
          <TableCell width={180}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                <Tooltip
                  title={
                    row.status === 'revocable'
                      ? 'Revocable means the task assigned can be revoked.'
                      : 'Non-revocable means the task assigned cannot be revoked.'
                  }
                  placement="top"
                  arrow
                >
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
              <Tooltip title="Number of tasks assigned by the Pabbly Connect Agency account." placement="top" arrow>
                <Box sx={{ whiteSpace: 'nowrap' }} component="span">
                  {/* {Intl.NumberFormat().format(10000)} */}
                  {row.totalQuantity}0
                </Box>
              </Tooltip>
            </Stack>
          </TableCell>
      </TableRow>
  );
}
