import { useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Card,
  Avatar,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  Typography,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

export default function RegularMessage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const CURRENCIES = [
    { value: 'USD', label: '$' },
    { value: 'EUR', label: '€' },
    { value: 'BTC', label: '฿' },
    { value: 'JPY', label: '¥' },
  ];

  const [currency, setCurrency] = useState('EUR');

  const handleChangeCurrency = useCallback((event) => {
    setCurrency(event.target.value);
  }, []);

  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUpload = (file) => {
    if (file) {
      setIsFileUploaded(true);
    }
  };

  return (
    <Box sx={{ mt: '24px' }}>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} width="100%">
        <Box width={isMobile ? '100%' : '60%'} pr={isMobile ? 0 : '12px'}>
        <Tooltip title="Click here to select regular message type" arrow placement="top">
          <TextField
            sx={{ mb: '24px' }}
            id="select-currency-label-x"
            select
            fullWidth
            label="Select Regular Message Type"
            onChange={handleChangeCurrency}
            helperText="Select one from your WhatsApp approved template messages"
          >
            {CURRENCIES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </Tooltip>
          <Tooltip title="Enter message here" arrow placement="top">
          <TextField rows={4} fullWidth multiline label="Enter message here." />
          </Tooltip>
          <Divider sx={{ mt: '24px', borderStyle: 'dashed' }} />
          <TextField
            sx={{ mt: '24px' }}
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Header File URL"
            helperText="Size < 5MB, Accepted formats : .png or .jpeg"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter header url"
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px',
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
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '600',
              width: '100%',
              padding: '24px 0px 24px 0px',
              mr: 0,
              ml: 0,
            }}
          >
            OR
          </Typography>

          <FileUpload onFileUpload={handleFileUpload} />
          {/* <Button sx={{ mt: '24px' }} variant='contained'> Save </Button> */}
        </Box>
        <Tooltip title="Regular message type preview" arrow placement="top">
        <Box
          width={isMobile ? '100%' : '40%'}
          sx={{ pl: isMobile ? 0 : '12px', mt: isMobile ? '24px' : 0 }}
        >
          <Card
            sx={{
              border: '1px solid #919EAB33',
              width: '100%',
              maxWidth: '500px',
            }}
          >
            <CardHeader
              sx={{ mb: 2 }}
              avatar={<Avatar aria-label="profile picture">MC</Avatar>}
              title={
                <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                  Mireya Conner
                </Typography>
              }
              subheader={
                <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                  Online
                </Typography>
              }
            />
            <Divider />
            <Typography
              variant="caption"
              sx={{
                pr: 2,
                pt: 3,
                display: 'flex',
                color: '#919EAB',
                justifyContent: 'end',
              }}
            >
              4:02 PM
            </Typography>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#CCF4FE',
                borderRadius: '8px',
                m: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontSize: 14, fontWeight: '500' }}
              >
                Hey,
                <br />
                {
                  ' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '
                }
              </Typography>
            </Box>
          </Card>
        </Box>
        </Tooltip>
      </Box>
      <Tooltip title="Click here to save regular message type" arrow placement="top">
      <Button sx={{ mt: '24px' }} variant="contained">
        {' '}
        Save{' '}
      </Button>
      </Tooltip>
    </Box>
  );
}
