import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from 'src/utils/format-time';

const chipProps = {
  variant: 'soft',
  size: 'small',
  color: 'primary',
};

export function WebhookTableFiltersResult({ filters, totalResults, onResetPage, sx }) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ name: '' });
  }, [filters, onResetPage]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    filters.setState({ status: 'all' });
  }, [filters, onResetPage]);

  const handleRemoveDate = useCallback(() => {
    onResetPage();
    filters.setState({ startDate: null, endDate: null });
  }, [filters, onResetPage]);

  const handleReset = useCallback(() => {
    onResetPage();
    filters.onResetState();
  }, [filters, onResetPage]);

  return (
    <div>
      {totalResults && (
        <div>
          <span>{totalResults} results found</span>

          {filters.state.status !== 'all' && (
            <Chip
              {...chipProps}
              label={filters.state.status}
              onDelete={handleRemoveStatus}
              sx={{ textTransform: 'capitalize', ml: 1 }}
            />
          )}

          {filters.state.startDate && filters.state.endDate && (
            <Chip
              {...chipProps}
              label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
              onDelete={handleRemoveDate}
              sx={{ ml: 1 }}
            />
          )}

          {filters.state.name && (
            <Chip
              {...chipProps}
              label={filters.state.name}
              onDelete={handleRemoveKeyword}
              sx={{ ml: 1 }}
            />
          )}

          {(filters.state.status !== 'all' ||
            filters.state.name ||
            (filters.state.startDate && filters.state.endDate)) && (
            <Chip
              label="Clear All"
              onDelete={handleReset}
              color="error"
              variant="soft"
              sx={{ ml: 1 }}
            />
          )}
        </div>
      )}
    </div>
  );
}
