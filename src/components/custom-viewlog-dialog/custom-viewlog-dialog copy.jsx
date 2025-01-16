import React from 'react';
import { toast } from 'sonner';

import {
  Box,
  List,
  Grid,
  Divider,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { commonBulletListStyle } from '../bullet-list-style/bullet-list-style';

// Define common styles
const actionByListStyle = {
  padding: '8px 0px 0px 20px',
  color: 'text.secondary',
  fontSize: '12px',
};

const commonListItemStyle = {
  fontSize: '12px',
  color: 'text.secondary',
  fontWeight: '400',
  listStyleType: 'disc',
  listStylePosition: 'outside',
  alignItems: 'center',
};

export default function ViewLogDialog({
  open,
  onClose,
  headerTitle = 'View Logs',
  headerSubTitle = 'View update log changes.',
  icon = 'mdi:clipboard-text-history',
  iconColor = 'text.secondary',
  logs = [], // Example logs data - {date:, changed_by: , old_data:, new_data:, edit_Log:},
  maxHeight = '80vh',
  contentMaxHeight = 310,
  showCopyButtons = true,
  onCopyOldData,
  onCopyNewData,
  renderCustomLogContent,
  dateTooltip,
  oldDataButtonTooltip = '',
  newDataButtonTooltip = '',
  oldDataCopiedMessage = '',
  newDataCopiedMessage = '',
  closeButtonText = 'Close',
  closeButtonVariant = 'contained',
  closeButtonColor = 'primary',
  tooltipPlacement = 'top',
  ...other
}) {
  const handleCopyOldData = (log) => {
    console.log('handleCopyOldData triggered', log);
    if (onCopyOldData) {
      onCopyOldData(log);
    }
    toast.success(oldDataCopiedMessage);
  };

  const handleCopyNewData = (log) => {
    console.log('handleCopyNewData triggered', log);
    if (onCopyNewData) {
      onCopyNewData(log);
    }
    toast.success(newDataCopiedMessage);
  };
  const renderLogEntry = (log, index) => {
    if (renderCustomLogContent) {
      return renderCustomLogContent({
        log,
        index,
        handleCopyOldData: () => handleCopyOldData(log),
        handleCopyNewData: () => handleCopyNewData(log),
        tooltipPlacement,
        oldDataButtonTooltip,
        newDataButtonTooltip,
      });
    }

    const formattedTooltip = `Updated On: ${log.date}, (UTC+05:30) Asia/Kolkata`;


    return (
      <React.Fragment key={index}>
        <Box sx={{ p: 1.5 }}>
          {/* Updated On Date & Time */}
          <Typography display="flex" fontSize="14px" color="text.secondary" alignItems="center">
            <Iconify
              icon="icon-park-solid:time"
              sx={{ width: '15px', height: '15px', mr: '5px' }}
            />
            <Tooltip title={formattedTooltip} arrow placement={tooltipPlacement}>
              <Box component="span" sx={{ cursor: 'pointer' }}>
                {log.date}
              </Box>
            </Tooltip>
          </Typography>

          {/* edit_Log for dashboard table */}
          {log.edit_Log && <Typography sx={{ ...actionByListStyle }}>{log.edit_Log}</Typography>}

          {/* List of Changed by, Old data & New data */}
          {(log.old_data || log.new_data) && (
            <List sx={{ ...commonBulletListStyle, mb: 0, pl: '26px', pb: 0 }}>
              <ul style={commonBulletListStyle}>
                {/* {[log.changed_by].map((content, idx) => (
                  <li key={`${index}-${idx}`} style={commonListItemStyle}>
                    {content}
                  </li>
                ))} */}

                {showCopyButtons && (
                  <>
                    {/* Old Data */}
                    {/* <li style={commonListItemStyle}>
                      <Box
                        sx={{
                          gap: 1,
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            width: 300,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {log.old_data}
                        </Box>
                        <Tooltip title={oldDataButtonTooltip} arrow placement={tooltipPlacement}>
                          <IconButton onClick={() => handleCopyOldData(log)} sx={{ padding: 0.5 }}>
                            <Iconify
                              width={16}
                              icon="solar:copy-bold"
                              sx={{ color: 'text.secondary' }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </li> */}

                    {/* New Data */}
                    <li style={commonListItemStyle}>
                      <Box
                        sx={{
                          gap: 1,
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            width: 300,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {log.new_data}
                        </Box>
                        <Tooltip title={newDataButtonTooltip} arrow placement={tooltipPlacement}>
                          <IconButton onClick={() => handleCopyNewData(log)} sx={{ padding: 0.5 }}>
                            <Iconify
                              width={16}
                              icon="solar:copy-bold"
                              sx={{ color: 'text.secondary' }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </li>
                  </>
                )}
              </ul>
            </List>
          )}
        </Box>
        {index < logs.length - 1 && <Divider />}
      </React.Fragment>
    );
  };

  return (
    <Box
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={{
        sx: {
          maxHeight,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >

      {/* Header */}
      <Grid
        sx={{
          display: 'flex',
          // flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          flexShrink: 0,
          mb: 2,
        }}
      >
        <Iconify sx={{ color: iconColor, width: '26px', height: '26px' }} icon={icon} />

        <Typography
          // variant="h6"
          variant="body2"

          sx={{
            color: 'body',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
            maxWidth: '100%',
          }}
        >
          {headerTitle.slice(0, 50)} {headerTitle.length > 50 ? '...' : ''}
        </Typography>

        {/* {headerSubTitle && (
          <Typography
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              wordBreak: 'break-word',
              maxWidth: '100%',
            }}
            variant="body2"
          >
            {headerSubTitle}
          </Typography>
        )} */}
      </Grid>


      <Grid
        sx={{
          // p: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            maxHeight: contentMaxHeight,
            flex: 1,
            overflowY: 'auto',
            border: '1px solid #919eab33',
            borderRadius: 1,
          }}
        >
          {logs.map((log, index) => renderLogEntry(log, index))}
        </Box>
      </Grid>


    </Box>
  );
}
