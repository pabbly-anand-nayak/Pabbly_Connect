// import React, { useState } from 'react';
// import { useTheme } from '@emotion/react';

// import { Box, Stack, TextField, useMediaQuery, InputAdornment } from '@mui/material';

// import { Iconify } from 'src/components/iconify';

// export function OrderTableToolbar({ filters, onResetPage }) {
//   const theme = useTheme();
//   const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

//   const [setAnchorEl] = useState(null);
//   const [setFilterAnchorEl] = useState(null);

//   const handleFilterClose = () => setFilterAnchorEl(null);

//   const handleFilterName = (event) => {
//     onResetPage(); // Reset the page to page 1 when filtering
//     filters.setState({ email: event.target.value }); // Set the email filter based on the search input
//   };

//   return (
//     <Stack
//       spacing={2}
//       alignItems="center"
//       direction={isBelow600px ? 'column' : 'row'}
//       sx={{ p: 2.5, width: '100%' }}
//     >
//       <Box sx={{ width: '100%' }}>
//         <TextField
//           fullWidth
//           value={filters.state.email}
//           onChange={handleFilterName} // Handle changes for search input
//           placeholder="Search Agency Account..."
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>
//     </Stack>
//   );
// }




import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';


export function OrderTableToolbar({ filters, onResetPage, noTasksAssigned }) {
  const theme = useTheme();

  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ email: event.target.value }); // Set the email filter based on the search input
  };

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={isBelow600px ? 'column' : 'row'}
      sx={{ p: 2.5, width: '100%' }}
    >
      <Box sx={{ width: '100%' }}>
        <TextField
          fullWidth
          value={filters.state.email}
          onChange={handleFilterName} // Handle changes for search input
          placeholder="Search Agency Account..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

     
    </Stack>
  );
}
