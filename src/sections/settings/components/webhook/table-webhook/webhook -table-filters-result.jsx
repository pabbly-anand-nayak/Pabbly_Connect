// // import { useCallback } from 'react';

// // import Chip from '@mui/material/Chip';

// // import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// // // ----------------------------------------------------------------------

// // export function OrderTableFiltersResult({ filters, totalResults, onResetPage, sx }) {
// //   const handleRemoveKeyword = useCallback(() => {
// //     onResetPage();
// //     filters.setState({ name: '' });
// //   }, [filters, onResetPage]);

// //   const handleRemoveStatus = useCallback(() => {
// //     onResetPage();
// //     filters.setState({ status: 'all' });
// //   }, [filters, onResetPage]);

// //   const handleRemoveDate = useCallback(() => {
// //     onResetPage();
// //     filters.setState({ startDate: null, endDate: null });
// //   }, [filters, onResetPage]);

// //   const handleReset = useCallback(() => {
// //     onResetPage();
// //     filters.onResetState();
// //   }, [filters, onResetPage]);

// //   return (
// //     <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
// //       <FiltersBlock
// //         label="Status:"
// //         clearType="status" // Dynamically generate tooltip text based on clearType (status or search)
// //         isShow={filters.state.status !== 'all'}
// //       >
// //         <Chip
// //           {...chipProps}
// //           label={filters.state.status}
// //           onDelete={handleRemoveStatus}
// //           sx={{ textTransform: 'capitalize' }}
// //         />
// //       </FiltersBlock>

// //       <FiltersBlock
// //         label="Keyword:"
// //         isShow={!!filters.state.name}
// //         clearType="search" // Dynamically generate tooltip text based on clearType (status or search)
// //       >
// //         <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
// //       </FiltersBlock>
// //     </FiltersResult>
// //   );
// // }

// import { useCallback } from 'react';

// import Chip from '@mui/material/Chip';

// import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';
// // ----------------------------------------------------------------------
// export function OrderTableFiltersResult({ filters, totalResults, onResetPage, sx }) {
//   const handleRemoveKeyword = useCallback(() => {
//     onResetPage();
//     filters.setState({ name: '' });
//   }, [filters, onResetPage]);

//   const handleRemoveStatus = useCallback(() => {
//     onResetPage();
//     filters.setState({ status: 'all' });
//   }, [filters, onResetPage]);

//   const handleRemoveDate = useCallback(() => {
//     onResetPage();
//     filters.setState({ startDate: null, endDate: null });
//   }, [filters, onResetPage]);

//   const handleReset = useCallback(() => {
//     onResetPage();
//     filters.onResetState();
//   }, [filters, onResetPage]);

//   return (
//     <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
//       <FiltersBlock
//         label="Status:"
//         clearType="status" // Specific clearType for status
//         isShow={filters.state.status !== 'all'}
//       >
//         <Chip
//           {...chipProps}
//           label={filters.state.status}
//           onDelete={handleRemoveStatus}
//           sx={{ textTransform: 'capitalize' }}
//         />
//       </FiltersBlock>

//       <FiltersBlock
//         label="Keyword:"
//         clearType="keyword" // Specific clearType for keyword
//         isShow={!!filters.state.name}
//       >
//         <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
//       </FiltersBlock>

//       {/* Optional: Add a date filter block if needed */}
//       {(filters.state.startDate || filters.state.endDate) && (
//         <FiltersBlock
//           label="Date:"
//           clearType="date" // Specific clearType for date
//           isShow={!!(filters.state.startDate || filters.state.endDate)}
//         >
//           <Chip
//             {...chipProps}
//             label={`${filters.state.startDate || 'Start'} - ${filters.state.endDate || 'End'}`}
//             onDelete={handleRemoveDate}
//           />
//         </FiltersBlock>
//       )}
//     </FiltersResult>
//   );
// }

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function OrderTableFiltersResult({ filters, totalResults, onResetPage, sx }) {
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
    <FiltersResult
      totalResults={totalResults}
      clearType="search" // Dynamically generate tooltip text based on clearType (status or search)
      onReset={handleReset}
      sx={sx}
    >
      <FiltersBlock label="Status:" isShow={filters.state.status !== 'all'}>
        <Chip
          {...chipProps}
          label={filters.state.status}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock
        label="Date:"
        isShow={Boolean(filters.state.startDate && filters.state.endDate)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!filters.state.name}>
        <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
