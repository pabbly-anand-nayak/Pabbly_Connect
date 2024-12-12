import React, { useRef, useState, useEffect } from 'react';

import { Box } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function DividerFlow(sx, ...other) {
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
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* <Iconify icon="vaadin:line-v" sx={{ color: '#84889780' }} /> */}
      {/* <Tooltip title="Add Step" arrow placement="right">
        <IconButton
          size="small"
          color="primary"
          sx={{
            boxShadow: '0px 8px 16px 0px rgba(132, 136, 151, 0.24)',
            backgroundColor: 'common.white',
            '&:hover': {
              color: 'common.white',
              backgroundColor: '#078DEE',
            },
          }}
        >
          <Iconify icon="ph:plus-bold" />
        </IconButton>
      </Tooltip> */}
      <Iconify
        icon="vaadin:line-v"
        sx={{
          // color: '#84889780',
          '[data-mui-color-scheme="light"] &': {
            color: '#84889780',
          },
          '[data-mui-color-scheme="dark"] &': {
            color: 'var(--palette-text-secondary)',
          },
        }}
      />
      <Iconify
        icon="bxs:down-arrow"
        sx={{
          mt: '-4px', // color: '#84889780',
          '[data-mui-color-scheme="light"] &': {
            color: '#84889780',
          },
          '[data-mui-color-scheme="dark"] &': {
            color: 'var(--palette-text-secondary)',
          },
        }}
      />
    </Box>
  );
}
