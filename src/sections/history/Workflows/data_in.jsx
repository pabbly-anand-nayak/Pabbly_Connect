import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Alert, AlertTitle } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import DataInTable from './Table_Data_In/data_in_table';

export default function DataIn() {
  const methods = useForm();

  return (
    <Box>
      <Alert
        sx={{ mt: 3, mb: 3 }}
        variant="outlined"
        severity="success"
        icon={<Iconify icon="icon-park-solid:check-one" />}
      >
        <AlertTitle sx={{ textTransform: 'capitalize' }}>Success!</AlertTitle>
        The request sent to the{' '}
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
          WP Webhooks
        </Link>{' '}
        app is shown below:
      </Alert>
      <DataInTable />
    </Box>
  );
}
