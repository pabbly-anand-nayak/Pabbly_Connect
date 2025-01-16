import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';


export function OrderTableToolbar({ filters, onResetPage, novariablesAdded }) {
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
  const confirm = useBoolean();
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleOpenAddDialog = () => setAddDialogOpen(true);
  const handleCloseAddDialog = () => setAddDialogOpen(false);

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
  };

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={isBelow600px ? 'column' : 'row'}
      sx={{ p: 2.5, width: '100%' }}
    >
      <Box sx={{ width: '100%' }}>
        <TextField
          disabled={novariablesAdded} // Disabled When No Variables Added!
          fullWidth
          value={filters.state.name}
          onChange={handleFilterName} // Handle changes for search input
          placeholder="Search by new data..."
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
