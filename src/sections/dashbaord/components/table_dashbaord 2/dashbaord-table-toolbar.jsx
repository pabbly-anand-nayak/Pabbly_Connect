import dayjs from 'dayjs';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { MenuList, Typography, FormControl, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function OrderTableToolbar({
  filters,
  onResetPage,
  onClose,
  dateError,
  publish,
  onChangePublish,
}) {
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const theme = useTheme();

  const isBelow900px = useMediaQuery(theme.breakpoints.down(900));
  const confirm = useBoolean();

  // State to manage the popover open/close and anchor element
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
  const folder = ['Workflow 1', 'Workflow 2', 'Workflow 3', 'Workflow 4', 'Workflow 5'];

  // Handlers for popover
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleApplyFilter = () => {
    console.log('Applying filter:', {
      column: selectedColumn,
      operator,
      value: filterValue,
    });
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
  };

  const open = Boolean(anchorEl);

  // Define the missing 'handleFilterName'
  const handleFilterName = (event) => {
    onResetPage(); // Resets the pagination or page number when the search is updated
    filters.setState({ name: event.target.value }); // Update the search filter
  };

  return (
    <>
      <Stack
        spacing={isBelow900px ? 2 : 2}
        alignItems="center"
        direction={isBelow900px ? 'column' : 'row'}
        sx={{ p: 2.5, width: '100%' }}
      >
        {/* Search Bar */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            mb: isBelow900px ? 0 : 0,
          }}
        >
          <TextField
            sx={{ width: '100%' }}
            value={filters.state.name}
            onChange={handleFilterName} // Use the handler here
            placeholder="Search Workflow..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Button Group (Side by Side on Mobile) */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'row',
            width: isBelow900px ? '100%' : 'auto',
            justifyContent: isBelow900px ? 'space-between' : 'flex-start',
          }}
        >
          {/* Select Action Button with Popover */}
          <Button
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={handlePopoverOpen} // Open popover on click
            sx={{
              textTransform: 'capitalize',
              padding: '0px 8px 0px 8px',
              minWidth: '145px',
            }}
            size="large"
            variant="outlined"
            color="primary"
            fullWidth={isBelow900px}
          >
            Select Action
          </Button>

          {/* Popover for "Select Action" */}
          <Popover
            open={open} // Determine if popover is open
            anchorEl={anchorEl} // Attach popover to button
            onClose={handlePopoverClose} // Close popover
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuList>
              {[
                { value: 'published', label: 'Move Workflow' },
                { value: 'draft', label: 'Enable Workflow' },
                { value: 'published', label: 'Disable Workflow' },
                { value: 'draft', label: 'Delete Workflow' },
              ].map((option) => (
                <MenuItem
                  key={option.value}
                  selected={option.value === publish}
                  onClick={() => {
                    handlePopoverClose(); // Close popover after selection
                    onChangePublish(option.value);
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Popover>

          {/* Filters Button */}
          <Button
            sx={{ padding: '0px 8px 0px 8px', minWidth: '100px' }}
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="mdi:filter" />}
            onClick={handleFilterClick}
            fullWidth={isBelow900px}
          >
            Filters
          </Button>
        </Box>
      </Stack>

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* The rest of your popover code for filters */}
        <Box
          sx={{
            width: {
              xs: '300px',
              sm: '100%',
              md: 700,
            },
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
          }}
        >
          {/* Filter content */}
        </Box>
        {/* filter header */}
        <Box
          sx={{
            borderBottom: '1px dashed #919eab33',
            p: 2,
            display: 'flex',
            height: '100%',
            width: '100%',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: '600' }}>
              Filter Workflows
            </Typography>
          </Box>
          <Iconify
            icon="uil:times"
            onClick={handleFilterClose}
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </Box>

        {/* Filter Options */}

        <Box
          sx={{
            p: '16px 16px 0px 16px',
            gap: 2,
            // display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
              gap: 2,
              mb: 2,
            }}
          >
            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Sort Workflow</Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
              <TextField
                id="select-currency-label-x"
                variant="outlined"
                fullWidth
                label="By"
                disabled
                size="small"
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
              <TextField
                id="select-currency-label-x"
                variant="outlined"
                select
                fullWidth
                label="Select"
                size="small"
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '14px', // Text size inside the input
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px', // Text size for the label
                  },
                }}
              >
                {sortworkflow.map((column) => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
              gap: 2,
              mb: 2,
            }}
          >
            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Workflow Status</Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
              <TextField
                id="select-currency-label-x"
                variant="outlined"
                fullWidth
                label="Equals to"
                disabled
                size="small"
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
              <TextField
                id="select-currency-label-x"
                variant="outlined"
                select
                fullWidth
                label="Select"
                size="small"
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '14px', // Text size inside the input
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px', // Text size for the label
                  },
                }}
              >
                {workflowstatus.map((column) => (
                  <MenuItem width="auto" key={column} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
              gap: 2,
              mb: 2,
            }}
          >
            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                Workflow Execution
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
              <TextField
                id="select-currency-label-x"
                variant="outlined"
                fullWidth
                label="In"
                disabled
                size="small"
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
              <TextField
                id="select-currency-label-x"
                variant="outlined"
                select
                fullWidth
                label="Select"
                size="small"
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '14px', // Text size inside the input
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px', // Text size for the label
                  },
                }}
              >
                {folder.map((column) => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            gap: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '1px dashed #919eab33',
          }}
        >
          <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </Box>
      </Popover>
    </>
  );
}
