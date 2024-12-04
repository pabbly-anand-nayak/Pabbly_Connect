import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const chipProps = {
  size: 'small',
  variant: 'soft',
};

export function FiltersResult({ clearType = 'statuses', totalResults, onReset, sx, children }) {
  // Dynamically generate tooltip text based on clearType
  const tooltipText = clearType === 'statuses' ? 'Clear the statuses' : 'Clear the Search';

  return (
    <Box sx={sx}>
      <Box sx={{ mb: 1.5, typography: 'body2' }}>
        <strong>{totalResults}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          {' '}
          results found
        </Box>
      </Box>

      <Box flexGrow={1} gap={1} display="flex" flexWrap="wrap" alignItems="center">
        {children}
        <Tooltip title={tooltipText} arrow placement="top">
          <Button
            color="error"
            onClick={onReset}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            Clear
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
