import { useState } from 'react';
import { useTheme } from '@emotion/react';

import { Box, List, Card, Button, Tooltip, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

export default function GetHelpBigCard({ sx, ...other }) {
  const videoId = 'CoIfgN0tfhE'; // Replace with your YouTube video ID
  const coverSrc = `${CONFIG.site.basePath}/assets/background/Pabbly Broadcast Card.png`;
  const [isOpen, setOpen] = useState(false);

  const dialog = useBoolean();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Define common styles
  const commonListStyle = {
    paddingLeft: '8px',
    color: 'grey.600',
    fontSize: '12px',
  };

  const commonListItemStyle = {
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    listStyleType: 'disc',
    listStylePosition: 'outside',
    color: 'grey.800',
  };

  return (
    <Card>
      <Box
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
          // backgroundColor: 'common.white',
          mt: '24px',
          pt: 5,
          pb: 5,
          pr: 3,
          gap: 5,
          borderRadius: 2,
          display: 'flex',
          height: { md: 1 },
          position: 'relative',
          pl: { xs: 3, md: 5 },
          alignItems: { xs: 'left', md: 'left' },
          justifyContent: { xs: 'left', md: 'left' },
          color: 'common.white',
          textAlign: { xs: 'left', md: 'left' },
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
        {...other}
      >
        <Box
          sx={{
            display: 'fixd',
            flex: '1 1 auto',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', md: 'flex-start' },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.common.white
                  : theme.palette.text.primary,
              mb: 1,
            }}
          >
            Points To Remember!
          </Typography>

          <List sx={{ ...commonListStyle, mb: 0 }}>
            <ul style={commonListStyle}>
              {[
                'No matter how skilled you might be, sometimes we all need a little support.',
                'We are here to help you succeed with building your workflows.',
                'Get assistance on troubleshooting errors, and can even get to know about building new automation as well.',
                'We will try our best to help you out for every issues.',
                <>
                  In case you wish to manage or cancel the subscription, you can do that from the{' '}
                  &ldquo;
                  <a
                    href="https://payments.pabbly.com/portal/app/en/affiliateportal/subscription/1/all"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#078DEE', textDecoration: 'none' }}
                  >
                    My Subscriptions
                  </a>
                  &rdquo; section.
                </>,
              ].map((text, index) => (
                <li key={index} style={commonListItemStyle}>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </List>

          <Tooltip title="Click here to get help with all your queries." arrow placement="top">
            <Button
              onClick={dialog.onTrue}
              sx={{ mt: isMobile ? 2 : 0 }}
              size="large"
              variant="outlined"
              color="primary"
              href="https://forum.pabbly.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask a Question
            </Button>
          </Tooltip>
        </Box>

        {/* {img && <Box sx={{ maxWidth: 260 }}>{img}</Box>} */}
        <Box
          sx={{
            marginRight: '16px', // Default margin-right for all screen sizes
            ...(isMobile && {
              marginRight: '0px', // Adjusted margin-right for screens matching 'sm' breakpoint and up
            }),
          }}
        >
          <Box
            alt="logo"
            component="img"
            src={`${CONFIG.site.basePath}/assets/background/Get Help Photo.png`}
          />
        </Box>
      </Box>
    </Card>
  );
}
