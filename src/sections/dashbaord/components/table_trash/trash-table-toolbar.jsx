import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function OrderTableToolbar({ filters, onResetPage, onClose, dateError }) {
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const confirm = useBoolean();

  const popover = usePopover();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const whatsapp_status = ['Active', 'Inactive'];
  const columns = ['Active', 'Inactive'];
  const sortworkflow = [
    'Highest to Lowest (Task Consumption)',
    'Lowest to High (Task Consumption)',
    'Alphabetically (A to Z)',
    'Alphabetically (Z to A)',
  ];
  const workflowstatus = ['All Statuses', 'On', 'Off'];
  const folder = ['Workflow 1', 'Workflow 2', 'Workflow 3', 'Workflow 4', 'Workflow 5'];

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [filters, onResetPage]
  );

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

  const handleCloseIconClick = () => {
    console.log('Close icon clicked'); // Debugging log
    onClose(); // Ensure the parent `onClose` function is called
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          flexGrow={1}
          sx={{ pr: '12px', width: 1 }}
        >
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              minDate={dayjs('2017-01-01')}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              slotProps={{ textField: { fullWidth: false } }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              minDate={dayjs('2017-01-01')}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              slotProps={{ textField: { fullWidth: false } }}
            />
          </LocalizationProvider> */}
          <TextField
            sx={{ mr: '5px', width: '100%' }}
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Search Workflow..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
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
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Workflow Status
                </Typography>
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

          {/* filter footer */}
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
        </Box>
      </Popover>
    </>
  );
}
