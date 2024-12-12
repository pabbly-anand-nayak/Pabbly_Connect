import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
  Box,
  Alert,
  Switch,
  Tooltip,
  TextField,
  AlertTitle,
  Typography,
  InputAdornment,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

import CodeViewer from './simple-format';
import DataOutTable2 from './Table-Data-Out2/data_out2_table';

export default function DataOutApp2() {
  const methods = useForm();
  const [isSimpleFormat, setIsSimpleFormat] = useState(true); // Switch is on by default
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
  };
  const weightedLinkStyle = {
    ...linkStyle,
    color: '#078DEE',

    fontWeight: 500,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          sx={{ mt: 3, mb: 3, mr: '5px', width: '100%' }}
          placeholder="Search Data Out ..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Alert sx={{ mt: 0, mb: 3 }} variant="outlined" severity="error">
        <AlertTitle sx={{ textTransform: 'capitalize' }}>Failed!</AlertTitle>
        The response received from the{' '}
        <Link
          to={paths.dashboard.workflow}
          style={weightedLinkStyle}
          // target="_blank"
          // rel="noopener noreferrer"
        >
          API by Pabbly
        </Link>{' '}
        app is shown below:
      </Alert>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          p: 1,
          mt: 0,
          mb: 0,
          borderTop: '1px dashed #919eab33',
          borderBottom: '1px dashed #919eab33',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Box>
          <Tooltip title="Step Execution Time" arrow placement="top">
            <Typography
              sx={{
                // color: '#637381',
                '[data-mui-color-scheme="light"] &': {
                  color: '#637381',
                },
                '[data-mui-color-scheme="dark"] &': {
                  color: 'var(--palette-text-secondary)',
                },
              }}
              variant="subtitle2"
              alignItems="center"
            >
              Aug 22, 2024 08:23:31
            </Typography>
          </Tooltip>
        </Box>
        <Box
          alignSelf="center"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Tooltip title="Click here to view data in advance format." arrow placement="top">
            <Box
              sx={{
                // color: '#637381',
                '[data-mui-color-scheme="light"] &': {
                  color: '#637381',
                },
                '[data-mui-color-scheme="dark"] &': {
                  color: 'var(--palette-text-secondary)',
                },
                gap: 1,
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}
            >
              <Typography alignItems="center" variant="subtitle2">
                Simple Format
              </Typography>
              <Switch
                size="small"
                checked={isSimpleFormat}
                onChange={(e) => setIsSimpleFormat(e.target.checked)}
              />
            </Box>
          </Tooltip>
        </Box>
      </Box>

      {isSimpleFormat ? <DataOutTable2 searchQuery={searchQuery} /> : <CodeViewer />}
    </Box>
  );
}
