import React, { useRef, useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Alert,
  Avatar,
  Tooltip,
  Accordion,
  Typography,
  AlertTitle,
  useMediaQuery,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

export default function ActionFlow(sx, ...other) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile view

  const appName =
    'This is an action step that you want to perform when your workflow is triggered. Pabbly will execute this step every time your workflow executes.';
  const stepName = 'API by Pabbly';

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [stepName]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Accordion
      sx={{
        boxShadow: '0px 2px 20px -4px rgba(132, 136, 151, 0.24)',
        backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,

        width: '100%',
        gap: '16px',
        border: '2px solid',
        borderColor: (theme1) =>
          theme.palette.mode === 'light' ? '#D4E2FF' : 'var(--palette-text-secondary)',
        borderRadius: 2,
        color: 'primary.text',
        margin: 0,
        '&:hover': {
          border: '2px solid #078DEE',
        },
        '&.Mui-expanded': {
          margin: 0,
          borderRadius: 2,
        },
        '&.MuiAccordion-root': {
          '&:before': {
            display: 'none',
          },
        },
      }}
    >
      <AccordionSummary
        expandIcon={<Iconify icon="mingcute:up-fill" color="#637381" />}
        sx={{
          p: 3,
          m: 0,
          '&.Mui-expanded': {
            m: 0,
          },
          '& .MuiAccordionSummary-content': {
            m: 0,
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            m: 0,
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            transition: 'transform 0.1s',
            '&.Mui-expanded': {
              transform: 'rotate(180deg)',
            },
          },
        }}
      >
        <Box display="flex" flexDirection="column" width="100%">
          <Box display="flex" gap="16px" justifyContent="space-between" width="100%">
            <Box display="flex" gap="16px">
              <Tooltip title={appName} arrow placement="top" disableInteractive>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src="/assets/icons/app logo/pabbly_icon.png"
                    sx={{
                      p: 1,
                      width: 56,
                      height: 56,
                      bgcolor: 'background.neutral',
                      border: '1px solid #D4E2FF',
                    }}
                  />
                </Box>
              </Tooltip>
              <Box display="flex" flexDirection="column" gap="4px">
                <Tooltip title={appName} arrow placement="top" disableInteractive>
                  <Typography
                    fontSize={14}
                    fontWeight={500}
                    sx={{
                      color: 'text.disabled',
                      maxWidth: '200px',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    Action : Do this …
                  </Typography>
                </Tooltip>

                <Tooltip title={stepName} arrow placement="bottom" disableInteractive>
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    sx={{
                      maxWidth: '400px',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    API by Pabbly : Execute API Request
                  </Typography>
                </Tooltip>
              </Box>
            </Box>

            {/* Conditionally render the label aligned to right in desktop */}
            <Box gap={1} display="flex" alignItems="center">
              {!isMobile && (
                <Box gap={1} display="flex" alignItems="center" ml="auto">
                  <Tooltip title="Free task" arrow placement="top" disableInteractive>
                    <Label
                      color="success"
                      variant="soft"
                      sx={{ height: '18px', borderRadius: '4px' }}
                    >
                      Free
                    </Label>
                  </Tooltip>
                </Box>
              )}
              <Box gap={1} mr={1} display="flex" alignItems="center">
                {/* <Tooltip title="Success" arrow placement="top" disableInteractive>
                <Iconify
                  sx={{ color: 'success.main', cursor: 'pointer' }}
                  icon="icon-park-solid:check-one"
                />
              </Tooltip> */}
                <Tooltip
                  title="Failed Task. Click here to view failed reason"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <Iconify
                    sx={{ color: 'error.main', cursor: 'pointer' }}
                    icon="icon-park-solid:close-one"
                  />
                </Tooltip>
              </Box>
            </Box>
          </Box>

          {/* Show label below the box on mobile */}
          {isMobile && (
            <Box mt={0.5} ml="72px">
              <Tooltip title="Free task" arrow placement="top" disableInteractive>
                <Label color="success" variant="soft" sx={{ height: '18px', borderRadius: '4px' }}>
                  Free
                </Label>
              </Tooltip>
            </Box>
          )}
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ mt: 0, mb: 0, p: 3, borderTop: '1px dashed #D4E2FF' }}>
        <Alert>
          <AlertTitle sx={{ textTransform: 'capitalize' }}> fdfbdfbdfb </AlertTitle>
          This is an check it out!
        </Alert>
      </AccordionDetails>
    </Accordion>
  );
}
