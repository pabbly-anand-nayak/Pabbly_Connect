import React from 'react';
import { useTheme } from '@emotion/react';

import { Box, Stack, TextField, useMediaQuery, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function OrderTableToolbar({ filters, onResetPage, noworkflowsorfoldersShared }) {
  const theme = useTheme();

  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
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
          disabled={noworkflowsorfoldersShared} // Disabled When No Team Members Added
          fullWidth
          value={filters.state.name}
          onChange={handleFilterName} // Handle changes for search input
          placeholder="Search by Email..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: 'row',
          width: isBelow600px ? '100%' : 'auto',
          justifyContent: 'flex-end',
        }}
      >
        <Tooltip
          title="Add a team member and share workflow(s) or folder(s) with them."
          arrow
          placement="top"
        >
          <Button
            sx={{
              ...buttonStyle,
              width: isBelow600px ? '188px' : '188px',
            }}
            size="large"
            color="primary"
            onClick={handleTeamMemberDialogOpen} // Open TeamMemberDialog
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add Team Member
          </Button>
        </Tooltip>

        <TeamMemberDialog
          open={teamMemberDialogOpen}
          onClose={handleTeamMemberDialogClose}
          title="Add Team Member"
          content="Define your team member details."
        />
      </Box> */}
    </Stack>
  );
}
