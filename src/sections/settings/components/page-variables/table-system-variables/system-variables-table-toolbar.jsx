import React from 'react';
import { useTheme } from '@emotion/react';

import { Box, Stack, TextField, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function OrderTableToolbar({ filters, onResetPage, novariablesAdded }) {
  const theme = useTheme();

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
  };

  return (
    <Stack spacing={2} alignItems="center" direction="row" sx={{ p: 2.5, width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <TextField
          disabled={novariablesAdded} // Disabled When No system variables available!
          fullWidth
          value={filters.state.name}
          onChange={handleFilterName} // Handle changes for search input
          placeholder="Search by system variable name..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Stack>
  );
}
