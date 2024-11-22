import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

const GradientBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  background: 'linear-gradient(90deg, #FF4D8D 0%, #A056F7 50%, #4D6FFF 100%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.common.white,
}));

export function PromotionalHeader() {
  const handleButtonClick = () => {
    window.open('https://www.pabbly.com/connect-onetime/#pricing', '_blank');
  };

  return (
    <GradientBox sx={{ padding: 1.5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 0.6,
          }}
        >
          <Box component="span" sx={{ fontWeight: 800 }}>
            [LIMITED TIME OFFER]
          </Box>
          <Box component="span" sx={{ textDecoration: 'line-through #ff1111' }}>
            $194/year
          </Box>
          <Box component="span" sx={{ fontWeight: 600 }}>
            $249
          </Box>
          <Box component="span">for lifetime access.</Box>
        </Box>
        <Box
          sx={{
            paddingLeft: { xs: 0, sm: 2 },
            paddingTop: { xs: 1, sm: 0 },
          }}
        >
          <Button
            onClick={handleButtonClick}
            variant="contained"
            color="warning"
            startIcon={
              <Iconify icon="fa-solid:hand-point-right" style={{ width: 18, height: 18 }} />
            }
            sx={{ padding: '8px 16px 8px 16px', fontWeight: 800 }}
          >
            GRAB THIS OFFER
          </Button>
        </Box>
      </Box>
    </GradientBox>
  );
}
