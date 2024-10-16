import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { List, ListItem, ListItemText } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Mock data for edit logs
const editLogs = [
  {
    date: 'Oct 13, 2024 13:05:58',
    action: 'Assigned By: anand.nayak@inboxkitten.com',
    action1: 'Tasks Assigned: 10000',
  },
  {
    date: 'Oct 13, 2024 12:59:44',
    action: 'Assigned By: hardik@inboxkitten.com',
    action1: 'Tasks Assigned: 10000',
  },
  {
    date: 'Oct 06, 2024 13:29:22',
    action: 'Automatically Updated.',
    action1: 'Tasks Assigned: 10000',
    link: 'https://forum.pabbly.com/', // Add your actual URL here
  },
  {
    date: 'Oct 06, 2024 13:29:19',
    action: 'Assigned By: anand.nayak@inboxkitten.com',
    action1: 'Tasks Assigned: 10000',
  },
  {
    date: 'Oct 02, 2024 16:13:16',
    action: 'Assigned By: anand.nayak@inboxkitten.com',
    action1: 'Tasks Assigned: 10000',
  },
  {
    date: 'Oct 06, 2024 13:29:22',
    action: 'Assigned By: Automatically Updated.',
    action1: 'Tasks Assigned: 10000',
    link: 'https://forum.pabbly.com/', // Add your actual URL here
  },
];

export function ViewLogAgencyPopover({ title, open, onClose, variableName, ...other }) {
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
          Task Assignment Log
        </Typography>
        <Typography variant="body2">View the history of assigned tasks.</Typography>
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
                  {log.date}
                </Typography>

                <List sx={{ color: 'grey.600' }}>
                  <ListItem disablePadding sx={{ mb: 0.5 }}>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          fontSize: '12px',
                          fontWeight: '500',
                          mb: 1,
                        },
                      }}
                      primary={
                        <Typography
                          fontSize="12px"
                          color="text.secondary"
                          sx={{ ml: '20px', display: 'flex', alignItems: 'center' }}
                        >
                          <Box component="span" sx={{ pr: '0.5rem' }}>
                            •
                          </Box>
                          {log.action}
                          {log.link && (
                            <a
                              href={log.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: '#078dee',
                                textDecoration: 'underline',
                                marginLeft: '4px',
                              }}
                            >
                              Learn more
                            </a>
                          )}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 0.5 }}>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          fontSize: '12px',
                          fontWeight: '500',
                          mb: 1,
                        },
                      }}
                      primary={
                        <Typography
                          fontSize="12px"
                          color="text.secondary"
                          sx={{ ml: '20px', display: 'flex', alignItems: 'center' }}
                        >
                          <Box component="span" sx={{ pr: '0.5rem' }}>
                            •
                          </Box>
                          {log.action1}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
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
