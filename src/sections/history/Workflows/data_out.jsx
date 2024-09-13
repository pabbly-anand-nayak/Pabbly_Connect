import { useForm } from 'react-hook-form';

import { Box, Alert, AlertTitle } from '@mui/material';

import DataInTable from './Table_Data_In/data_in_table';

export default function DataOut() {
  const methods = useForm();

  return (
    <Box>
      <Alert sx={{ mt: 3, mb: 3 }} variant="outlined" severity="error">
        <AlertTitle variant="outlined" severity="error" sx={{ textTransform: 'capitalize' }}>
          Failed!
        </AlertTitle>
        The response received from the WP Webhooks app is shown below:
      </Alert>
      <DataInTable />
    </Box>
  );
}
