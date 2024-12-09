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

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { WebhookDialog } from '../hook/add-update-webhook-dialog';

export function OrderTableToolbar({
  filters,
  onResetPage,
  onClose,
  filterApplied,
  handleFilterClick,
  publish,
  onChangePublish,
  numSelected,
}) {
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
  const confirm = useBoolean();

  const isBelow600px = useMediaQuery('(max-width:600px)');
  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    // padding: '0 16px',
    padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
  };

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Add states for tracking filter selections
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const moveFolderPopover = useBoolean(); // For MoveToFolderPopover
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

  // Check if any filter is selected
  const hasAnyFilterSelected = Boolean(selectedSort || selectedStatus || selectedFolder);

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

  const handleFilterButtonClick = (e) => {
    if (!isFilterApplied || e.target.tagName !== 'svg') {
      setFilterAnchorEl(e.currentTarget);
    }
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
  };

  const handleWorkflowAction = (action) => {
    if (action === 'enable') {
      setSnackbarMessage('Your workflow has been successfully activated.');
      setSnackbarSeverity('success');
    } else if (action === 'disable') {
      setSnackbarMessage('Your workflow has been successfully deactivated.');
      setSnackbarSeverity('success');
    }
    setSnackbarOpen(true);
  };

  const [setSelectedOption] = useState('');
  const [setIsError] = useState(true);

  const handleAutocompleteChange = (event, value) => {
    setSelectedOption(value);
    setIsError(!value); // If no value is selected, set error to true
  };

  const handleWorkflowStatus = (status) => {
    if (status === 'active') {
      setSnackbarMessage('Your workflow has been successfully enabled.');
    } else if (status === 'inactive') {
      setSnackbarMessage('Your workflow has been successfully disabled.');
    }
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    handlePopoverClose();
  };

  /* Delete Success Snackbar */

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({});

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessSnackbarOpen(false);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDelete(false);
    setConfirmDialogProps({});
  };

  const handleOpenConfirmDialog = (action) => {
    setConfirmDialogProps(action);
    setConfirmDelete(true);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
    handlePopoverClose();
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
