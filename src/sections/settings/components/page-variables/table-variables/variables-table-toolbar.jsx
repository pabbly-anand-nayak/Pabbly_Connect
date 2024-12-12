import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { VariablesDialog } from '../hook/add-variables-dailog';

export function OrderTableToolbar({ filters, onResetPage }) {
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
  const confirm = useBoolean();
  const handleVariablesDialogOpen = () => setVariablesDialogOpen(true); // Open dialog
  const handleVariablesDialogClose = () => setVariablesDialogOpen(false); // Close dialog
  const [VariablesDialogOpen, setVariablesDialogOpen] = useState(false); // State to control dialog open

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
  };

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
  };

  return (
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
          onChange={handleFilterName} // Handle changes for search input
          placeholder="Search by variable name..."
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
        }}
      >
        <Tooltip title="Add a custom variable." arrow placement="top">
          <Button
            sx={{
              ...buttonStyle,
              width: isBelow600px ? '169.91px' : '169.91px',
            }}
            size="large"
            // variant="outlined"
            color="primary"
            onClick={handleVariablesDialogOpen} // Open VariablesDialog
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add Variable
          </Button>
        </Tooltip>
      </Box>

      {/* <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: 'row',
          width: isBelow600px ? '100%' : 'auto',
          justifyContent: 'flex-end', // Aligns buttons to the right
        }}
      >
        <Tooltip title="Add a custom variable." arrow placement="top">
          <Button
            sx={{
              ...buttonStyle,
              width: isBelow600px ? '169.91px' : '169.91px',
            }}
            size="large"
            // variant="outlined"
            color="primary"
            onClick={handleVariablesDialogOpen} // Open VariablesDialog
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add Variable
          </Button>
        </Tooltip>
      </Box> */}
      <VariablesDialog
        open={VariablesDialogOpen}
        onClose={handleVariablesDialogClose}
        title="Add Variable"
        content="Define your variable details."
      />
    </Stack>
  );
}
