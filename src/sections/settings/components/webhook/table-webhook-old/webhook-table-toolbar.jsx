import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Popover,
  Tooltip,
  MenuItem,
  MenuList,
  TextField,
  Typography,
  FormControl,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { WebhookDialog } from '../hook/add-update-webhook-dialog';

export function OrderTableToolbar({
  filters,
  onResetPage,
  onClose,
  dateError,
  publish,
  onChangePublish,
  numSelected,
  noTasksEver,
}) {
  const theme = useTheme();
  const [addSubaccountDialogOpen, setWebhookDialogOpen] = useState(false);

  // Ensure a safe default for filters.state
  const filterState = filters?.state || { name: '' };

  // Modify the search handler
  const handleFilterName = (event) => {
    const searchValue = event.target.value;

    // Ensure filters and its setState method exist
    if (filters && typeof filters.setState === 'function') {
      onResetPage(); // Reset the page to page 1 when filtering
      filters.setState((prevState) => ({
        ...prevState,
        name: searchValue || '', // Ensure it's always a string
      }));
    } else {
      console.warn('Filters state management not properly configured');
    }
  };

  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const sortworkflow = [
    'Highest to Lowest (Task Consumption)',
    'Lowest to High (Task Consumption)',
    'Alphabetically (A to Z)',
    'Alphabetically (Z to A)',
  ];
  const workflowstatus = ['All Statuses', 'On', 'Off'];

  const handlePopoverClose = () => setAnchorEl(null);
  const handleFilterClose = () => setFilterAnchorEl(null);

  const handleApplyFilter = () => {
    console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
  };

  // Dialog Handlers
  const handleWebhookDialogOpen = () => setWebhookDialogOpen(true);
  const handleWebhookDialogClose = () => setWebhookDialogOpen(false);

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems="center"
        direction={isBelow600px ? 'column' : 'row'}
        sx={{ p: 2.5, width: '100%' }}
      >
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            value={filterState.name || ''} // Use the safe filterState
            onChange={handleFilterName}
            disabled={noTasksEver}
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

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuList>
          {[
            { value: 'published', label: 'Move Workflow', icon: 'fluent:folder-move-16-filled' },
            {
              value: 'draft',
              label: 'Enable Workflow',
              icon: 'line-md:switch-off-filled-to-switch-filled-transition',
            },
            {
              value: 'published',
              label: 'Disable Workflow',
              icon: 'line-md:switch-filled-to-switch-off-filled-transition',
            },
            { value: 'draft', label: 'Delete Workflow', icon: 'solar:trash-bin-trash-bold' },
          ].map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === publish}
              onClick={() => {
                handlePopoverClose();
                onChangePublish(option.value);
              }}
            >
              {option.icon && (
                <Iconify
                  icon={option.icon}
                  width={20}
                  height={20}
                  sx={{ mr: 2, color: 'inherit' }}
                />
              )}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '100%', lg: 600 },
          }} // Full width for xs, sm, md, and 600px width for lg
        >
          <Box sx={{ borderBottom: '1px dashed #919eab33', p: 2, display: 'flex' }}>
            <Typography variant="h6" sx={{ fontWeight: '600', flexGrow: 1 }}>
              Filter Workflows
            </Typography>
            <Iconify
              icon="uil:times"
              onClick={handleFilterClose}
              sx={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
            />
          </Box>

          <Box
            sx={{
              p: { xs: '16px 16px 0px 16px', sm: '16px 16px 0px 16px' }, // Adjust padding for smaller screens
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 0, sm: 0 }, // No gap for mobile, gap for larger screens
              textAlign: { xs: 'left', sm: 'initial' }, // Align left below 600px
            }}
          >
            {[
              { label: 'Sort Workflow', options: sortworkflow, defaultLabel: 'By' },
              { label: 'Workflow Status', options: workflowstatus, defaultLabel: 'Equals to' },
            ].map((section, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' }, // Adjust layout for small screens
                  gap: { xs: 0, sm: 2 }, // Remove gap for mobile, keep for larger screens
                  mb: 2,
                  alignItems: { xs: 'flex-start', sm: 'center' }, // Align left on small screens
                  textAlign: { xs: 'left', sm: 'initial' }, // Ensure text aligns left on small screens
                }}
              >
                <FormControl sx={{ mb: { xs: 2, sm: 0 }, minWidth: '160px' }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      textAlign: { xs: 'left', sm: 'initial' }, // Align label left on small screens
                    }}
                  >
                    {section.label}
                  </Typography>
                </FormControl>

                <FormControl
                  fullWidth
                  sx={{
                    mb: { xs: 2, sm: 0 },
                    width: { xs: '260px', sm: '260px', md: '260px' }, // Adjust width for responsive design
                  }}
                >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label={section.defaultLabel}
                    disabled
                    size="small"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    select
                    fullWidth
                    label="Select"
                    size="small"
                    sx={{
                      '& .MuiInputBase-input': { fontSize: '14px' },
                      '& .MuiInputLabel-root': { fontSize: '14px' },
                    }}
                  >
                    {section.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px dashed #919eab33',
              gap: 2,
            }}
          >
            <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
