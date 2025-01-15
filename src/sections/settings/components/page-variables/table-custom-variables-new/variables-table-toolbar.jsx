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

import { AddUpdateVariablesDialog } from '../hook/add-update-variables-dailog';

export function OrderTableToolbar({ filters, onResetPage, novariablesAdded }) {
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
  const confirm = useBoolean();
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleOpenAddDialog = () => setAddDialogOpen(true);
  const handleCloseAddDialog = () => setAddDialogOpen(false);

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
          disabled={novariablesAdded} // Disabled When No Variables Added!
          fullWidth
          value={filters.state.name}
          onChange={handleFilterName} // Handle changes for search input
          placeholder="Search by custom variable name..."
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
            disabled={novariablesAdded} // Disabled When No Variables Added!
            sx={{
              ...buttonStyle,
              width: isBelow600px ? '169.91px' : '169.91px',
            }}
            size="large"
            // variant="outlined"
            color="primary"
            onClick={handleOpenAddDialog} // Open VariablesDialog
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add Variable
          </Button>
        </Tooltip>
      </Box>
      {/* Separate Dialog */}
      <AddUpdateVariablesDialog
        open={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        title="Add Custom Variable"
        mode="add"
        onSave={({ variableName, variableData }) => {
          console.log('Variable Added:', { variableName, variableData });
        }}
      />
    </Stack>
  );
}
