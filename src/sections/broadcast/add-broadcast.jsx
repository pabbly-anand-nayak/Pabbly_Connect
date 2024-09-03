import dayjs from 'dayjs';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import ReactCountryFlag from 'react-country-flag';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  Box,
  Card,
  Radio,
  Button,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  RadioGroup,
  Typography,
  useMediaQuery,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { countries } from 'src/assets/data';
import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import RegularMessage from './regular-message';
import { SelectContactDrawer } from './hook/drawer';
import PreApprovedMessage from './pre-approved-message';

export default function AddBroadcast() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer1, setOpenDrawer1] = useState(false);

  const handleOpenDrawer1 = () => {
    setOpenDrawer1(true);
  };

  const handleCloseDrawer1 = () => {
    setOpenDrawer1(false);
  };

  //   Included Excluded Arrays

  const includedArray = [
    'Pabbly Connect List',
    'Pabbly Subscription Billing List',
    ' Pabbly Support',
  ];
  const excludedArray = ['Pabbly Email Marketing List', 'Pabbly Form Builder List'];

  //   Included Excluded Arrays

  // Radio Button Function for Message Type
  const [messageType, setMessageType] = useState('pre_approved_message');

  const handleRadioChange = (event) => {
    setMessageType(event.target.value);
  };

  // Radio Button Function for Message Type

  // Radio Button Function Schedule Broadcast
  const [scheduleType, setScheduleType] = useState('yes_schedule');

  const handleScheduleChange = (event) => {
    setScheduleType(event.target.value);
  };
  // Radio Button Function Schedule Broadcast

  // Phone NUmber Field Function
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(countries.find((country) => country.code === event.target.value));
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const updatedCountries = countries.map((country) => ({
    ...country,
    phone: `+${country.phone}`,
  }));

  const [startDate, setStartDate] = useState(dayjs(new Date()));

  // Phone NUmber Field Function

  //   Time Picker Function

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="Whatsapp Broadcast"
          Subheading="Launch a campaign now to initiate new conversations with users on WhatsApp."
          link_added="#"
        />
      </Box>
      <Card sx={{ mt: '40px' }}>
        <CardHeader title="Whatsapp Broadcast" sx={{ mb: 3 }} />
        <Divider />
        <FormProvider>
          <Form>
            {/*  Broadcast Name */}

            <FormControlLabel
              control={
                <TextField
                  fullWidth
                  type="text"
                  margin="dense"
                  variant="outlined"
                  label="Broadcast Name"
                  helperText="Enter the name of the broadcast."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Enter the name of the broadcast."
                          arrow
                          placement="top"
                          sx={{
                            fontSize: '16px', // Adjust the font size as needed
                          }}
                        >
                          <Iconify
                            icon="material-symbols:info-outline"
                            style={{ width: 20, height: 20 }}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              }
              sx={{ width: '100%', padding: '24px 24px 24px 24px', mr: 0, ml: 0 }}
            />

            {/* Select Contacts Button */}
            <Tooltip title="Click here to select contact list in broadcast" arrow placement="top">
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              sx={{ m: '0px 24px 24px 24px', alignSelf: 'flex-start' }}
              onClick={handleOpenDrawer1}
            >
              Select Contacts
            </Button>
            </Tooltip>
            <SelectContactDrawer open={openDrawer1} onClose={handleCloseDrawer1} />

            {/* Included List */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                width: '100%',
                padding: '0px 24px 8px 24px',
                mr: 0,
                ml: 0,
                mb: 0.5,
              }}
            >
              <Tooltip title="Included contact list in broadcast " arrow placement="left">
              <Typography fontSize={14}>Included: </Typography>
              <Typography color="grey" fontSize={14}>
                {includedArray.join(', ')}
              </Typography>
              </Tooltip>
            </Box>
            {/* Excluded List */}

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                width: '100%',
                padding: '0px 24px 24px 24px',
                mr: 0,
                ml: 0,
              }}
            >
              <Tooltip title="Excluded contact list in broadcast " arrow placement="left">
              <Typography fontSize={14}>Excluded: </Typography>
              <Typography color="grey" fontSize={14}>
                {excludedArray.join(', ')}
              </Typography>
              </Tooltip>
            </Box>

            <Divider sx={{ borderStyle: 'dashed', margin: '0px 24px 24px 24px' }} />

            {/* Message Type */}
            <Box
              sx={{
                width: '100%',
                padding: '0px 24px 24px 24px',
                mr: 0,
                ml: 0,
              }}
            >
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Select Message Type
              </Typography>
              <RadioGroup row value={messageType} onChange={handleRadioChange}>
              <Tooltip title="Pre-approved template message" arrow placement="bottom">
                <FormControlLabel
                  value="pre_approved_message"
                  control={<Radio size="small" />}
                  label="Pre-approved template message"
                />
                </Tooltip>
                <Tooltip title="Regular message" arrow placement="right">
                <FormControlLabel
                  value="regular_message"
                  control={<Radio size="small" />}
                  label="Regular Message"
                />
                </Tooltip>
              </RadioGroup>
              {messageType === 'pre_approved_message' && (
                <form>
                  <PreApprovedMessage />
                </form>
              )}

              {messageType === 'regular_message' && (
                <form>
                  <RegularMessage />
                </form>
              )}
            </Box>

            <Divider sx={{ borderStyle: 'dashed', margin: '0px 24px 24px 24px' }} />

            {/* Mobile NUmber Field */}
            <FormControlLabel
              control={
                <Box
                  width="100%"
                  sx={{ display: 'flex', flexWrap: { xs: 'wrap', lg: 'nowrap', md: 'nowrap' } }}
                  gap={2}
                >
                    <Tooltip title="Click here to add the contact number " arrow placement="top">
                  <TextField
                    fullWidth
                    helperText="Enter the contact's mobile number."
                    placeholder="Enter mobile number"
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Select
                            value={selectedCountry.code}
                            onChange={handleCountryChange}
                            renderValue={(value) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  marginRight: 2,
                                  ml: '-14px',
                                }}
                              >
                                <ReactCountryFlag
                                  countryCode={value}
                                  svg
                                  style={{ marginRight: 8, width: '24px', height: '24px' }}
                                />
                                {updatedCountries.find((country) => country.code === value).phone}
                              </Box>
                            )}
                            sx={{
                              mr: 1,
                              minWidth: 100,
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '& .MuiSelect-select': { paddingRight: '24px' },
                            }}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 300,
                                },
                              },
                            }}
                          >
                            {updatedCountries.map((country) => (
                              <MenuItem key={country.code} value={country.code}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <ReactCountryFlag
                                    countryCode={country.code}
                                    svg
                                    style={{ marginRight: 8, width: '24px', height: '24px' }}
                                  />
                                  {country.label} ({country.phone})
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </InputAdornment>
                      ),
                    }}
                  />
                  </Tooltip>
                          <Tooltip title="Click here to send test message" arrow placement="top">
                  <Button
                    sx={{ height: '55px', width: { xs: '50%', md: '20%', lg: '20%' } }}
                    variant="contained"
                    color="inherit"
                  >
                    Send Test Message
                  </Button>
                  </Tooltip>
                </Box>
              }
              sx={{ width: '100%', padding: '0px 24px 32px 24px', mr: 0, ml: 0 }}
            />

            {/* Schedule Broadcast */}
            <Box
              sx={{
                width: '100%',
                padding: '0px 24px 24px 24px',
                mr: 0,
                ml: 0,
              }}
            >
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Schedule Broadcast
              </Typography>
              <RadioGroup
                sx={{ mb: '0px' }}
                row
                value={scheduleType}
                onChange={handleScheduleChange}
              >
                  <Tooltip title="Click this button if you want to scheduled the broadcast" arrow placement="bottom">
                <FormControlLabel
                  value="yes_schedule"
                  control={<Radio size="small" />}
                  label="Yes (Schedule for Later)"
                />
                </Tooltip>
                <Tooltip title="Click this button if you want to send broadcast instantly" arrow placement="bottom">
                <FormControlLabel
                  value="no_schedule"
                  control={<Radio size="small" />}
                  label="No (Send Instantly)"
                />
                </Tooltip>
              </RadioGroup>
              {scheduleType === 'yes_schedule' && (
                <Form>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    sx={{mt:'24px'}}
                      label="Date"
                      value={startDate}
                      minDate={dayjs('2017-01-01')}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Form>
              )}

              {/* {scheduleType === 'no_schedule' && <form>No, Send Instantly</form>} */}
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                padding: '0px 24px 24px 24px',
                mr: 0,
                ml: 0,
              }}
            >
              <Tooltip title="Click here to add broadcast" arrow placement="top">
              <Button variant="contained" size="large" color="inherit">
                Add Broadcast
              </Button>
              </Tooltip>
              <Button variant="outlined" size="large" color="inherit">
                Cancel
              </Button>
            </Box>
          </Form>
        </FormProvider>
      </Card>
    </DashboardContent>
  );
}
