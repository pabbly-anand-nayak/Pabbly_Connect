import { Box, Link, Tooltip, TextField, Typography, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function UpdateConnection() {
  return (
    <Box sx={{ mt: '24px' }}>
      <Box display="flex" flexDirection="row" width="100%">
        <Box width="100%">
          <Typography
            sx={{
              ml: '13px',
              fontSize: '14px',
              fontWeight: '600',
              width: '100%',
            }}
          >
            Token
          </Typography>
          <TextField
            sx={{ mt: '8px' }}
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            placeholder="Enter Token here"
            helperText={
              <Typography
                sx={{
                  fontSize: '12px',
                  '[data-mui-color-scheme="light"] &': {
                    color: '#637381',
                  },
                  '[data-mui-color-scheme="dark"] &': {
                    color: 'var(--palette-text-secondary)',
                  },
                }}
              >
                Log in to the{' '}
                <Link
                  href="https://www.mailerlite.com/help/how-to-get-started-with-mailerlite#new"
                  target="_blank"
                  sx={{ color: 'primary.main' }}
                >
                  Mailerlite account
                </Link>{' '}
                or authenticate API requests, an API token is required.{' '}
                <Link
                  href="https://dashboard.mailerlite.com/login"
                  target="_blank"
                  sx={{ color: 'primary.main' }}
                >
                  Learn more.
                </Link>{' '}
              </Typography>
            }
            InputAdornment={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter your Token"
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
        </Box>
      </Box>
    </Box>
  );
}
