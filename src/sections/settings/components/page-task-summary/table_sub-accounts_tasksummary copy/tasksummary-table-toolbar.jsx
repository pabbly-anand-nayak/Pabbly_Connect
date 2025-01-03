import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { AddUpdateSubAccountDialog } from '../hook/add-update-subaccount-dialog';

export function OrderTableToolbar({ filters, onResetPage, noTasksAssigned }) {
  const theme = useTheme();

  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
  };

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
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
          fullWidth
          value={filters.state.name}
          onChange={handleFilterName} // Handle changes for search input
          placeholder="Search by email..."
          disabled={noTasksAssigned} // Disabled When No Tasks Added!
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: 'row',
          width: isBelow600px ? '100%' : 'auto',
          justifyContent: 'flex-end',
        }}
      >
        <Tooltip title="Click here to assign tasks to sub-accounts." arrow placement="top">
          <Button
            sx={{
              ...buttonStyle,
              width: isBelow600px ? '179px' : '179px',
            }}
            size="large"
            // variant="outlined"
            color="primary"
            onClick={handleAddDialogOpen}
            disabled={noTasksAssigned} // Disabled When No Tasks Added!
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add Sub-account
          </Button>
        </Tooltip>

        {/* Add Subaccount Dialog component */}
        <AddUpdateSubAccountDialog
          open={isAddDialogOpen}
          onClose={handleAddDialogClose}
          title="Add Sub-account"
          actionLabel="Assign Task Now"
          isUpdate={false}
        />
      </Box>
    </Stack>
  );
}
