import { useTheme } from '@emotion/react';
import React, { useRef, useState, useEffect } from 'react';

import {
  Box,
  Card,
  Alert,
  Select,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  Snackbar,
  TextField,
  CardHeader,
  Typography,
  InputLabel,
  FormControl,
  InputAdornment,
  FormHelperText,
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { timezone } from 'src/assets/data/timezone';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function TimeZonePage() {
  const [timeZone, setTimeZone] = useState('(GMT-05:00) Eastern Time (US & Canada)');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSave = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {}, 500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleTimeZoneChange = (event) => {
    setTimeZone(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTimeZones = timezone.filter(
    (
      tz // Changed 'timeZone' to 'timezones'
    ) => tz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <>
      {/* <Box> */}
      <Card
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        }}
      >
        <CardHeader
          title={
            <Box>
              <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
                <Tooltip
                  title="Choose the time zone for your account. All the date and time in your account will align with the time zone that you set here."
                  arrow
                  placement="top"
                >
                  Time Zone
                </Tooltip>
              </Box>
            </Box>
          }
          sx={{
            p: 3,
          }}
        />
        <Divider />

        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Time Zone
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="time-zone-select-label">Time Zone</InputLabel>

            <Select
              labelId="time-zone-select-label"
              id="time-zone-select"
              value={timeZone}
              label="Time Zone"
              onChange={handleTimeZoneChange}
              IconComponent={() => (
                <Iconify width={24} icon="iconamoon:arrow-down-2-bold" sx={{ mr: 1 }} />
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    width: 250,
                    height: 450,
                  },
                },
                MenuListProps: {
                  style: { padding: 0 },
                  maxheight: 250,
                },
              }}
            >
              <Box
                sx={{
                  p: 2,
                  // position: 'Sticky',
                  top: 0,
                  // bgcolor: 'background.paper',
                  zIndex: 5,
                }}
              >
                <TextField
                  fullWidth
                  size="large"
                  placeholder="Search time zone..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  inputRef={searchInputRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" width={24} height={24} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              {filteredTimeZones.map((tz) => (
                <MenuItem key={tz} value={tz}>
                  {tz}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              View workflow and task execution times based on selected time zone.
            </FormHelperText>
          </FormControl>
          <Box>
            <Tooltip
              title="Click 'Save' to apply the selected time zone to your account, ensuring that all workflow activities and task schedules reflect your local time."
              arrow
              placement="top"
            >
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Tooltip>
          </Box>
          {/* Removed empty Button component */}
        </Box>
      </Card>
      {/* </Box> */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Time Zone Updated Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
