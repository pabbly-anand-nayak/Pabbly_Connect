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

import { Iconify } from 'src/components/iconify';

import CodeViewer from './simple-format';
import DataInTable2 from './Table_Data_In2/data_in_table';

export default function DataInApp2() {
  const methods = useForm();
  const [isSimpleFormat, setIsSimpleFormat] = useState(true); // Switch is on by default
  return (
    <Box x={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          sx={{ mt: 3, mb: 3, mr: '5px', width: '100%' }}
          placeholder="Search Data In ..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Alert
        sx={{ mt: 0, mb: 3 }}
        variant="outlined"
        severity="success"
        icon={<Iconify icon="icon-park-solid:check-one" />}
      >
        <AlertTitle sx={{ textTransform: 'capitalize' }}>Success!</AlertTitle>
        WP Webhooks The request sent to the{' '}
        <Link
          href="https://forum.pabbly.com/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#078DEE',
            '&:hover': {
              color: '#0056b3', // A darker shade for hover effect
            },
          }}
        >
          Delay (Pabbly)
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
            <Typography color="#637381" variant="subtitle2" alignItems="center">
              Aug 22, 2024 08:23:31
            </Typography>
          </Tooltip>
        </Box>
        <Box
          alignSelf="center"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box
            sx={{
              color: '#637381',
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
            <Tooltip title="Click here to view data in advance format." arrow placement="top">
              <Switch
                size="small"
                checked={isSimpleFormat}
                onChange={(e) => setIsSimpleFormat(e.target.checked)}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {isSimpleFormat ? <DataInTable2 /> : <CodeViewer />}
    </Box>
  );
}
