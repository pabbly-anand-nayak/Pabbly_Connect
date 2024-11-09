import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import React, { useState, useCallback } from 'react';

import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  Stack,
  Alert,
  Button,
  Popover,
  Tooltip,
  MenuItem,
  MenuList,
  Snackbar,
  Typography,
  IconButton,
  FormControl,
  Autocomplete,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { popover } from 'src/theme/core/components/popover';

import { Iconify } from 'src/components/iconify';

export function OrderTableToolbar({
  filters,
  onResetPage,
  dateError,
  numSelected,
  publish,
  onChangePublish,
  // startDate,
  // endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  const theme = useTheme();
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [error, setError] = React.useState('');

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    // padding: '0 16px',
    padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
  };

  // Snackbar handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Add states for tracking filter selections
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const [selectedWorkflowName, setSelectedWorkflowName] = useState(null);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState(null);

  const [selectedTaskHistoryID, setSelectedTaskHistoryID] = useState(null);

  const [selectedTaskData, setSelectedTaskData] = useState(null);

  const [selectedExecutionStatus, setSelectedExecutionStatus] = useState(null);
  const [selectedWorkflowExecution, setSelectedWorkflowExecution] = useState(null);

  const [isFilterApplied, setFilterApplied] = useState(false); // Local filter state
  const [taskHistoryIdValue, setTaskHistoryIdValue] = useState('');
  const [taskDataValue, setTaskDataValue] = useState('');

  const handleFilterIconClick = (e) => {
    e.stopPropagation();
    if (isFilterApplied) {
      handleFilterClose();
      resetFilters(); // This will now clear everything including TextFields
      setFilterApplied(false);
    }
  };

  const resetFilters = () => {
    // Clear all Autocomplete selections
    setSelectedWorkflowName(null);
    setSelectedTaskStatus(null);
    setSelectedExecutionStatus(null);
    setSelectedWorkflowExecution(null);

    // Clear date range
    setSelectedDateRange(null);
    setStartDate(dayjs(new Date()));
    setEndDate(dayjs(new Date()));

    // Clear TextField values
    setTaskHistoryIdValue('');
    setTaskDataValue('');

    // Clear filters state
    filters.setState({});

    // Remove filter applied state
    setFilterApplied(false);

    console.log('Filters reset:', {
      selectedDateRange,
      selectedWorkflowName,
      selectedTaskStatus,
      selectedExecutionStatus,
      selectedWorkflowExecution,
      taskHistoryIdValue,
      taskDataValue,
      filtersState: filters.state,
    });
  };

  // Check if any filter is selected
  const hasAnyFilterSelected = Boolean(
    selectedDateRange ||
      selectedWorkflowName ||
      selectedTaskStatus ||
      selectedTaskHistoryID ||
      selectedTaskData ||
      selectedExecutionStatus ||
      selectedWorkflowExecution ||
      taskHistoryIdValue.trim() !== '' || // Check if TaskHistory ID has value
      taskDataValue.trim() !== '' // Check if Task Data has value
  );

  const handleFilterButtonClick = (e) => {
    if (!isFilterApplied || e.target.tagName !== 'svg') {
      setFilterAnchorEl(e.currentTarget);
    }
  };

  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Update the text field handlers
  const handleTaskHistoryIdChange = (event) => {
    setTaskHistoryIdValue(event.target.value);
  };

  const handleTaskDataChange = (event) => {
    setTaskDataValue(event.target.value);
  };

  const confirmDelete = useBoolean(); // For ConfirmDialog
  const moveFolderPopover = useBoolean(); // For MoveToFolderPopover

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
      filters.setEnd({ endDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleApplyFilter = () => {
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
    setFilterApplied(true);
  };

  const whatsapp_status = ['Active', 'Inactive'];
  const columns = ['Active', 'Inactive'];
  const workflows = [
    'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    'Create Invoice in QuickBooks after Stripe Payment',
    'Update Customer in Hubspot on New Sale in Shopify',
    'Send Slack Notification on New Deal in Pipedrive',
    'Add Lead in Salesforce on New Google Form Submission',
    'Subscriber in Convertkit on Thrivecart Payment',
    'Invoice in QuickBooks after Stripe Payment',
    'Customer in Hubspot on New Sale in Shopify',
    'Send New Deal in Pipedrive',
    'Salesforce on New Google Form Submission',
  ];

  const taskstatus = ['All Statuses', 'Success', 'Partial Failed', 'Failed'];
  const executionstatus = ['All Executions', 'Normal Executions', 'Re-Executed'];
  const workflowexecution = ['All', 'Executed', 'Pending'];

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleWorkflowAction = (action) => {
    let message = '';
    if (action === 'Entire') {
      message = 'You have successfully re-executed the Entire Workflow for 1 Task History ID(s).';
    } else if (action === 'Inactive') {
      message =
        'You have successfully re-executed the Skipped & Failed Steps for 1 Task History ID(s)';
    }

    setSnackbarState({
      open: true,
      message,
      severity: 'success',
    });
  };

  const handleMenuItemClick = (option) => {
    handlePopoverClose();
    if (option.label === 'Entire Workflow') {
      handleWorkflowAction('Entire');
    } else if (option.label === 'Failed & Skipped Steps') {
      handleWorkflowAction('Inactive');
    } else {
      onChangePublish(option.value);
    }
  };

  const datePickerStyle = {
    height: '30px',
    '& .MuiInputBase-input': {
      height: 'auto',
      padding: '8px 14px',
    },
  };

  const textFieldProps = {
    fullWidth: true,
    sx: {
      '& .MuiOutlinedInput-input': {
        height: 'auto',
        padding: '8px 14px',
        fontSize: '14px',
      },
      '& .MuiInputLabel-root': {
        fontSize: '14px',
      },
    },
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    if (endDate && newValue && endDate.isBefore(newValue)) {
      setEndDate(null);
    } else {
      setError('');
    }
  };

  const handleEndDateChange = (newValue) => {
    if (startDate && newValue && newValue.isBefore(startDate)) {
      return;
    }
    setEndDate(newValue);
    setError('');
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
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Search task history..."
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
            alignItems: 'center', // Vertically center elements
          }}
        >
          {/* Re-execute Button */}
          {numSelected > 0 &&
            (isBelow600px ? (
              <Tooltip title="Click here to re-execute the workflow(s)." arrow placement="top">
                <Button
                  sx={{
                    mb: '0px',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: 48,
                    minHeight: 48,
                  }}
                  onClick={handlePopoverOpen}
                  color="primary"
                >
                  <Iconify icon="eva:arrow-ios-downward-fill" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Click here to re-execute the workflow(s)." arrow placement="top">
                <Button
                  endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  onClick={handlePopoverOpen}
                  color="primary"
                  sx={{
                    ...buttonStyle,

                    p: '16px',
                    width: '155px',
                  }}
                >
                  Re-execute
                </Button>
              </Tooltip>
            ))}

          {/* Filters Button */}
          <Tooltip
            title={
              isFilterApplied
                ? "Click the 'X' to clear all applied filters."
                : 'Apply filters to the workflow history to find specific tasks.'
            }
            arrow
            placement="top"
          >
            <Button
              sx={{
                ...buttonStyle,
                width: isFilterApplied ? '156px' : '104.34px', // Changes width based on filter state
                position: 'relative',
                '& .MuiButton-startIcon': {
                  pointerEvents: 'auto',
                  marginRight: '8px',
                  display: 'flex',
                },
              }}
              variant={isFilterApplied ? 'contained' : ''}
              color="primary"
              startIcon={!isFilterApplied && <Iconify icon="mdi:filter" />}
              endIcon={
                isFilterApplied && (
                  <Box
                    component="span"
                    onClick={handleFilterIconClick}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon="uil:times"
                      // onClick={handleFilterClose}
                      style={{
                        width: 22,
                        height: 22,
                        cursor: 'pointer',
                      }}
                    />
                  </Box>
                )
              }
              onClick={handleFilterButtonClick}
            >
              {isFilterApplied ? 'Filter Applied' : 'Filters'}
            </Button>
          </Tooltip>

          {/* Refresh IconButton */}
          <Box
            sx={{
              display: {
                // xs: numSelected > 0 ? 'none' : 'block', // Hide on mobile when items selected
                sm: 'block', // Always show on larger screens
              },
            }}
          >
            <Tooltip title="Click here to refresh data." arrow placement="top">
              <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                <Iconify sx={{ width: '20px', height: '20px' }} icon="heroicons-outline:refresh" />
              </IconButton>
            </Tooltip>
          </Box>
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
            {
              value: 'draft',
              label: 'Entire Workflow',
              icon: 'mdi:workflow',
            },
            {
              value: 'published',
              label: 'Failed & Skipped Steps',
              icon: 'eos-icons:action-chains',
            },
          ].map((option) => (
            <Tooltip
              key={option.value}
              title={
                option.label === 'Entire Workflow'
                  ? 'Click here to re-execute the entire workflow from the beginning.'
                  : 'Click here to re-execute only the failed or skipped steps of the workflow.'
              }
              arrow
              placement="left"
            >
              <MenuItem
                selected={option.value === publish}
                onClick={() => handleMenuItemClick(option)}
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
            </Tooltip>
          ))}
        </MenuList>
      </Popover>

      {/*  Filter Task */}
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
              xs: '100%',
              sm: '100%',
              md: 850,
            },
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
          }}
        >
          {/* Filter Header */}
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
                <Tooltip
                  title="Apply filters to the workflow history to find specific tasks."
                  arrow
                  placement="top"
                >
                  Filter Task
                </Tooltip>
              </Typography>
            </Box>
            <Iconify
              icon="uil:times"
              onClick={handleFilterClose}
              style={{
                width: 20,
                height: 20,
                cursor: 'pointer',
                color: '#637381',
              }}
            />
          </Box>

          {/* Filter Options */}
          <Box
            sx={{
              p: '16px 16px 0px 16px',
              gap: 2,
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
            }}
          >
            {/* Date Range Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column', // Stack vertically on mobile
                  sm: 'column', // Stack vertically on tablet
                  md: 'row', // Arrange in row on desktop
                },
                gap: 2,
                mb: 2,
              }}
            >
              <FormControl
                fullWidth
                sx={{ mb: { xs: 2, sm: 2, md: 0, width: 600 }, justifyContent: 'center' }}
              >
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  <Tooltip
                    title="Select a date range to filter tasks executed within specific dates."
                    arrow
                    placement="top"
                  >
                    Date Range
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' }, // Responsive width
                }}
              >
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  fullWidth
                  label="Between"
                  disabled
                  size="small"
                />
              </FormControl>

              {/* DatePicker */}
              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
                <Stack direction="row" spacing={2} flexGrow={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Tooltip
                      title={
                        startDate
                          ? dayjs(startDate).format('MM/DD/YYYY HH:mm')
                          : 'Select date and time'
                      } // Formats date and time
                      arrow
                      placement="top"
                    >
                      <div style={{ width: '100%' }}>
                        <DateTimePicker
                          sx={{ datePickerStyle, alignItems: 'center', alignContent: 'center' }}
                          // size="small"
                          label="Start Date"
                          value={startDate}
                          minDate={dayjs('2017-01-01')}
                          onChange={handleStartDateChange}
                          slotProps={{
                            textField: textFieldProps,
                          }}
                        />
                      </div>
                    </Tooltip>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Tooltip
                      title={
                        startDate
                          ? dayjs(endDate).format('MM/DD/YYYY HH:mm')
                          : 'Select date and time'
                      } // Formats date and time
                      arrow
                      placement="top"
                    >
                      <div style={{ width: '100%' }}>
                        <DateTimePicker
                          sx={datePickerStyle}
                          size="small"
                          label="End Date"
                          value={endDate}
                          minDate={startDate || dayjs('2017-01-01')}
                          onChange={handleEndDateChange}
                          slotProps={{
                            textField: textFieldProps,
                          }}
                        />
                      </div>
                    </Tooltip>
                  </LocalizationProvider>
                </Stack>
              </FormControl>
            </Box>

            {/* Workflow Name */}
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
              <FormControl
                fullWidth
                sx={{ mb: { xs: 2, sm: 2, md: 0, width: 600 }, justifyContent: 'center' }}
              >
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  <Tooltip
                    title="Select a workflow to filter tasks associated with it."
                    arrow
                    placement="top"
                  >
                    Workflow Name
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
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
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={workflows}
                  value={selectedWorkflowName}
                  onChange={(event, newValue) => setSelectedWorkflowName(newValue)}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            {/* Task Status */}
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
              <FormControl
                fullWidth
                sx={{ mb: { xs: 2, sm: 2, md: 0, width: 600 }, justifyContent: 'center' }}
              >
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  <Tooltip
                    title="Filter tasks based on status: Success, Partial Failure, or Failure."
                    arrow
                    placement="top"
                  >
                    Task Status
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
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
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={taskstatus}
                  value={selectedTaskStatus}
                  onChange={(event, newValue) => setSelectedTaskStatus(newValue)}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            {/* Task History ID Section */}
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
              <FormControl
                fullWidth
                sx={{ mb: { xs: 2, sm: 2, md: 0, width: 600 }, justifyContent: 'center' }}
              >
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  <Tooltip
                    title=" Enter a Task History ID to view the details of a specific task."
                    arrow
                    placement="top"
                  >
                    Task History ID
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
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
                  variant="outlined"
                  fullWidth
                  value={taskHistoryIdValue}
                  onChange={(event) => setTaskHistoryIdValue(event.target.value)}
                  size="small"
                  label="Enter Task History ID"
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                />
              </FormControl>
            </Box>

            {/* Task Data Section */}
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
              <FormControl
                fullWidth
                sx={{ mb: { xs: 2, sm: 2, md: 0, width: 600 }, justifyContent: 'center' }}
              >
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  <Tooltip
                    title="Enter specific task data to filter tasks containing those details."
                    arrow
                    placement="top"
                  >
                    Task Data
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0, width: 600 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
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
                  variant="outlined"
                  fullWidth
                  value={taskDataValue}
                  onChange={(event) => setTaskDataValue(event.target.value)}
                  size="small"
                  label="Enter Task Data"
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                />
              </FormControl>
            </Box>

            {/* Execution Status */}
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
              <FormControl
                fullWidth
                sx={{ mb: { xs: 2, sm: 2, md: 0, width: 600 }, justifyContent: 'center' }}
              >
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  <Tooltip
                    title="Filter tasks by the type of workflow execution."
                    arrow
                    placement="top"
                  >
                    Execution Status
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
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
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={executionstatus}
                  value={selectedExecutionStatus}
                  onChange={(event, newValue) => setSelectedExecutionStatus(newValue)}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            {/* Workflow Execution  */}
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
              <FormControl
                fullWidth
                sx={{ mb: { xs: 2, sm: 2, md: 0, width: 600 }, justifyContent: 'center' }}
              >
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  <Tooltip
                    title="Filter tasks by their workflow execution status."
                    arrow
                    placement="top"
                  >
                    Workflow Execution
                  </Tooltip>
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
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
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={workflowexecution}
                  value={selectedWorkflowExecution}
                  onChange={(event, newValue) => setSelectedWorkflowExecution(newValue)}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>
          </Box>

          {/* Filter Footer */}
          <Box
            sx={{
              p: 2,
              gap: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px dashed #919eab33',
            }}
          >
            {/* <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
              Cancel
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilter}
              disabled={!hasAnyFilterSelected}
            >
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Popover>

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 13,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </>
  );
}

// --------------------------------------------------
