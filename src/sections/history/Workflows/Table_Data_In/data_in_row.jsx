import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { useBoolean } from 'src/hooks/use-boolean';

import { usePopover } from 'src/components/custom-popover';

export function DataInTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();

  const [setShowToken] = useState(false);

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            {/* <Tooltip title="Team member email who's access shared by you" arrow placement="top"> */}
            <Box component="span">Message</Box>
            {/* </Tooltip> */}
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={592}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            {/* <Tooltip title="Date when access shared by you" arrow placement="top"> */}
            <Box
              component="span"
              sx={{
                width: 'auto', // adjust width as needed
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              The application processed the request but returned a blank response. Refer to the HTTP
              status code above for details. The application processed the request but returned a
              blank response. Refer to the HTTP status code above for details.
            </Box>
            {/* </Tooltip> */}
          </Stack>
        </Stack>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
