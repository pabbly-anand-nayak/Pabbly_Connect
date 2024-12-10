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

import { WebhookDialog } from '../hook/add-update-webhook-dialog';

export function OrderTableToolbar({ filters, onResetPage }) {
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));

  const isBelow600px = useMediaQuery('(max-width:600px)');
  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    // padding: '0 16px',
    padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
  };

  // Add states for tracking filter selections
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const [isFilterApplied, setFilterApplied] = useState(false); // Local filter state

  const [addSubaccountDialogOpen, setWebhookDialogOpen] = useState(false);

  const handleFilterIconClick = (e) => {
    e.stopPropagation();
    if (isFilterApplied) {
      handleFilterClose();
      resetFilters(); // This will clear all Autocomplete selections
      setFilterApplied(false);
    }
  };

  // Dialog Handlers
  const handleWebhookDialogOpen = () => setWebhookDialogOpen(true);
  const handleWebhookDialogClose = () => setWebhookDialogOpen(false);

  const resetFilters = () => {
    setSelectedSort(null);
    setSelectedStatus(null);
    setSelectedFolder(null);
    filters.setState({}); // Clear filters
    setFilterApplied(false); // Remove filter applied state
    console.log('Filters reset:', {
      selectedSort,
      selectedStatus,
      selectedFolder,
      filtersState: filters.state,
    });
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
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
          placeholder="Search by webhook name..."
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
        <Tooltip
          title="Click here to add a webhook URL and a webhook event that will trigger the webhook URL."
          arrow
          placement="top"
        >
          <Button
            sx={{
              ...buttonStyle,
              width: isBelow600px ? '179px' : '155px',
            }}
            size="large"
            color="primary"
            onClick={handleWebhookDialogOpen}
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add Webhook
          </Button>
        </Tooltip>

        {/* WebhookDialog component */}
        <WebhookDialog
          open={addSubaccountDialogOpen}
          onClose={handleWebhookDialogClose}
          mode="add"
        />
      </Box>
    </Stack>
  );
}
