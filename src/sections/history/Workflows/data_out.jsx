import { useForm } from 'react-hook-form';

import {
  Box,
  Alert,
  Switch,
  TextField,
  AlertTitle,
  Typography,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import DataInTable from './Table_Data_In/data_in_table';

export default function DataOut() {
  const methods = useForm();

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

      <Alert sx={{ mt: 0, mb: 3 }} variant="outlined" severity="error">
        <AlertTitle variant="outlined" severity="error" sx={{ textTransform: 'capitalize' }}>
          Failed!
        </AlertTitle>
        The response received from the WP Webhooks app is shown below:
      </Alert>

      {/* <CardHeader
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
      /> */}
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
          <Typography color="#637381" variant="subtitle2" alignItems="center">
            Sep 14, 2024 16:06:04
          </Typography>
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
            <Switch size="small" />
          </Box>
        </Box>
      </Box>

      <DataInTable />
    </Box>
  );
}
