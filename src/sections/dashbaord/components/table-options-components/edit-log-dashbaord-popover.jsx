import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import { List, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Iconify } from 'src/components/iconify';

// Mock data for edit logs
const editLogs = [
  {
    date: 'Oct 23, 2024 13:05:58',
    action: 'Workflow enabled by Anand Nayak.',
  },
  {
    date: 'Oct 23, 2024 12:59:44',
    action: 'Edited by Anand Nayak',
  },
  {
    date: 'Oct 23, 2024 13:29:22',
    action: 'Workflow enabled by Anand Nayak.',
  },
  {
    date: 'Oct 22, 2024 13:29:19',
    action: 'Workflow disabled by Anand Nayak',
  },
  {
    date: 'Oct 22, 2024 16:13:16',
    action: 'Edited by Anand Nayak',
  },
  {
    date: 'Oct 22, 2024 13:29:22',
    action: 'Edited by Anand Nayak',
  },
];

// Define common styles
const commonListStyle = {
  paddingLeft: '20px',
  color: 'text.secondary',
  fontSize: '12px',
};

const commonListItemStyle = {
  marginBottom: '4px',
  fontSize: '12px',
  color: 'text.secondary',
  fontWeight: '400',
  listStyleType: 'disc',
  listStylePosition: 'outside',
  alignItems: 'center', // Center vertically
};

export function EditLogDashbaordPopover({ title, open, onClose, variableName, ...other }) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle
        sx={{
          // pb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Iconify
          sx={{ color: 'green', width: '36px', height: '36px' }}
          icon="lets-icons:check-fill"
        />
        {title}
        <Typography variant="h6" sx={{ color: 'grey.800', alignItems: 'center' }}>
          Workflow Edit Log
        </Typography>
        <Typography variant="body2">View workflow edit log for last 30 days.</Typography>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            maxHeight: 400,
            overflowY: 'auto',
            // mt: 2,
            border: '1px solid #919eab33',
            borderRadius: 1,
          }}
        >
          {editLogs.map((log, index) => (
            <React.Fragment key={index}>
              <Box sx={{ p: 1.5 }}>
                <Typography
                  display="flex"
                  fontSize="14px"
                  color="text.secondary"
                  alignItems="center"
                >
                  <Iconify
                    icon="icon-park-solid:time"
                    sx={{ width: '15px', height: '15px', mr: '5px' }}
                  />
                  <Tooltip
                    title={`Action on: ${log.date}, (UTC+05:30) Asia/Kolkata`}
                    placement="top"
                    arrow
                  >
                    {log.date}
                  </Tooltip>
                </Typography>

                <List sx={{ ...commonListStyle, mb: 0 }}>{log.action}</List>
              </Box>
              {index < editLogs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
        }}
      >
        <Button variant="contained" onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
