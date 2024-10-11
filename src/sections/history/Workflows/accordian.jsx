import React, { useRef, useState, useEffect } from 'react';

import { Box, Avatar, Tooltip, Typography } from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// import Image2 from './initial-shape.png';

// ----------------------------------------------------------------------

export default function InitialTriggerNode(sx, ...other) {
  const popover = usePopover();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  const appName = 'Trigger : When this happens';
  const stepName = '1. Choose First Application';

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [stepName]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        paddingTop: 2,
        paddingBottom: 2,

        paddingRight: 1,

        paddingLeft: 1,

        flexDirection: 'row', // Change from column to row
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" gap={2}>
        <Tooltip title={appName} arrow placement="top" disableInteractive>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              justifyContent: 'center',
            }}
          >
            <Avatar
              variant="rounded"
              src="/assets/icons/app logo/pabbly_icon.png"
              sx={{
                p: 1,
                width: 48,
                height: 48,
                bgcolor: 'background.neutral',
                border: '1px solid #D4E2FF',
              }}
            />
          </Box>
        </Tooltip>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap="6px"
          sx={{
            alignItems: 'start',
          }}
        >
          <Box display="flex">
            <Tooltip title={appName} arrow placement="top" disableInteractive>
              <Typography
                fontSize={14}
                fontWeight={600}
                sx={{
                  maxWidth: '200px',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1, // Limit to 2 lines
                  overflow: 'hidden', // Hide overflow
                  textOverflow: 'ellipsis', // Ellipsis for overflow
                  wordBreak: 'break-word', // Allow word breaking
                }}
              >
                {appName}
              </Typography>
            </Tooltip>
          </Box>

          <Box display="flex">
            <Tooltip title={stepName} arrow placement="top" disableInteractive>
              <Typography
                ref={textRef}
                fontSize={14}
                fontWeight={600}
                sx={{
                  maxWidth: '200px',
                  whiteSpace: isExpanded ? 'normal' : 'nowrap',
                  overflow: isExpanded ? 'visible' : 'hidden',
                  textOverflow: isExpanded ? 'clip' : 'ellipsis',
                }}
              >
                {stepName}
              </Typography>
            </Tooltip>
            {isTruncated && (
              <Tooltip title="Click to see full step name" arrow placement="top" disableInteractive>
                <Iconify
                  icon={isExpanded ? 'mingcute:up-fill' : 'mingcute:down-fill'}
                  sx={{
                    color: 'grey.600',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  onClick={toggleExpand}
                />
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="end"
        justifyContent="space-between"
        sx={{
          alignItems: 'center',
          marginRight: 2,
          marginLeft: 2,
          marginTop: 0.3,
        }}
      >
        <Tooltip title="Free task" arrow placement="top" disableInteractive>
          <Label color="success" variant="soft" sx={{ height: '18px', borderRadius: '4px' }}>
            Free
          </Label>
        </Tooltip>
      </Box>
    </Box>
  );
}
