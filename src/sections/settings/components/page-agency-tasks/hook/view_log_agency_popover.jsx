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
    action: 'Assigned by: Automatically Updated.',
    action1: 'Tasks Assigned: 10000',
    link: 'https://forum.pabbly.com/',
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
    link: 'https://forum.pabbly.com/',
  },
];

const commonListStyle = {
  paddingLeft: '17px',
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
  alignItems: 'center',
};

export function ViewLogAgencyPopover({ title, open, onClose, variableName, ...other }) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={{
        sx: {
          maxHeight: '80vh', // Limit the dialog height to 80% of viewport height
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          flexShrink: 0, // Prevent title from shrinking
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

      <DialogContent
        sx={{
          p: 2,
          overflow: 'hidden', // Hide the content's default scrollbar
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1, // Allow content to grow and fill available space
        }}
      >
        {/* <SimpleBar style={{ overflow: 'auto', flexGrow: 1, maxHeight: 400 }}> */}
        <Box
          sx={{
            maxHeight: 310,
            flex: 1, // Take up all available space
            overflowY: 'auto', // Only this box will scroll
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
                    title={`Assigned On: ${log.date}, (UTC+05:30) Asia/Kolkata`}
                    placement="top"
                    arrow
                  >
                    <span>{log.date}</span>
                  </Tooltip>
                </Typography>

                <List sx={{ ...commonListStyle, mb: 0 }}>
                  <ul style={commonListStyle}>
                    {[
                      <>
                        {log.action}
                        {log.link && (
                          <a
                            href={log.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#078DEE',
                              textDecoration: 'underline',
                              marginLeft: '4px',
                            }}
                          >
                            Learn more
                          </a>
                        )}
                      </>,
                      <>{log.action1}</>,
                    ].map((text, idx) => (
                      <li key={`${index}-${idx}`} style={commonListItemStyle}>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </List>
              </Box>
              {index < editLogs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
        {/* </SimpleBar> */}
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0, // Prevent actions from shrinking
          p: 2,
        }}
      >
        <Button variant="contained" onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
