import React, { useState } from 'react';

import { Box, Button, Checkbox, TextField, Typography, FormControlLabel } from '@mui/material';

import UpdateConnection from './update-connection';

export default function ConnectionUpdate({ onClose }) {
  const [selectedApp, setSelectedApp] = useState({ name: 'MailerLite' });
  const [showAddNewConnection, setShowAddNewConnection] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowAddNewConnection(event.target.checked);
  };

  const handleUpdate = () => {
    // Perform update logic here
    onClose(); // Close the Drawer after update
  };

  return (
    <Box
      // mt="24px"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Connection name and Connect button */}
      <Box mt={0}>
        <Box width="100%" sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
              Connection Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={selectedApp.name}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          {/* Checkbox for toggling Add New Connection */}
          <Box sx={{ padding: '4px 1px 0px 2px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAddNewConnection}
                  onChange={handleCheckboxChange}
                  size="small"
                />
              }
              label="Update Connections Data"
            />
            {showAddNewConnection && (
              <Box mt={2}>
                <UpdateConnection />
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button sx={{ mr: '12px' }} variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
