// import React from 'react';

// import { Box, Tooltip } from '@mui/material';

// const DateTime = ({ createdAt }) => (
//   <Tooltip
//     title={`Execution Time: ${createdAt}, (UTC+05:30) Asia/Kolkata`}
//     placement="bottom"
//     arrow
//   >
//     <Box sx={{ width: 170, whiteSpace: 'nowrap', color: 'text.disabled' }} component="span">
//       {createdAt}
//     </Box>
//   </Tooltip>
// );

// export default DateTime;

// import React from 'react';
// import { Tooltip, Box } from '@mui/material';

// // Utility to format the date and time in 24-hour format
// const formatDateTime = (dateTime) => {
//   const date = new Date(dateTime);
//   return date.toLocaleString('en-US', {
//     timeZone: 'Asia/Kolkata',
//     year: 'numeric',
//     month: 'short',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: false, // Ensure 24-hour format
//   });
// };

// const DateTime = ({ createdAt }) => {
//   if (!createdAt) {
//     return null; // Return null if createdAt is undefined or null
//   }

//   const formattedTime = formatDateTime(createdAt);

//   return (
//     <Tooltip
//       title={`Execution Time: ${formattedTime}, (UTC+05:30) Asia/Kolkata`}
//       placement="bottom"
//       arrow
//     >
//       <Box sx={{ width: 170, whiteSpace: 'nowrap', color: 'text.disabled' }} component="span">
//         {formattedTime}
//       </Box>
//     </Tooltip>
//   );
// };

// export default DateTime;

// ------------------------------------------

// import React from 'react';

// import { Box, Tooltip } from '@mui/material';

// // Utility to format the date and time in 24-hour format
// const formatDateTime = (dateTime) => {
//   const date = new Date(dateTime);
//   return date.toLocaleString('en-US', {
//     timeZone: 'Asia/Kolkata',
//     year: 'numeric',
//     month: 'short',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: false, // 24-hour format
//   });
// };

// const DateTime = ({ createdAt, tooltipText }) => {
//   if (!createdAt) return null; // Handle null or undefined dates

//   const formattedTime = formatDateTime(createdAt);
//   const tooltipContent =
//     tooltipText || `Execution Time: ${formattedTime}, (UTC+05:30) Asia/Kolkata`;

//   return (
//     <Tooltip title={tooltipContent} placement="bottom" arrow>
//       <Box sx={{ typography: 'body2', color: 'text.secondary', mt: 0.5 }}>{formattedTime}</Box>
//     </Tooltip>
//   );
// };

// export default DateTime;

// ------------------------------------------
import React from 'react';

import { Box, Tooltip } from '@mui/material';

// Utility to format the date and time in 24-hour format
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Ensure 24-hour format
  });
};

const DateTime = ({ createdAt, tooltipText }) => {
  if (!createdAt) return null;

  const formattedTime = formatDateTime(createdAt);
  const tooltipContent =
    tooltipText || `Execution Time: ${formattedTime}, (UTC+05:30) Asia/Kolkata`;

  return (
    <Box
      sx={{
        typography: 'body2',
        color: 'text.disabled',
        mt: 0.5,
        whiteSpace: 'nowrap',
      }}
    >
      <Tooltip title={tooltipContent} placement="bottom" arrow>
        {formattedTime}
      </Tooltip>
    </Box>
  );
};

export default DateTime;

// --------------------------------------

// import React from 'react';

// import { Box, Tooltip } from '@mui/material';

// // Utility to format the date and time in 24-hour format
// const formatDateTime = (dateTime) => {
//   const date = new Date(dateTime);
//   return date.toLocaleString('en-US', {
//     timeZone: 'Asia/Kolkata',
//     year: 'numeric',
//     month: 'short',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: false, // 24-hour format
//   });
// };

// const DateTime = ({ createdAt, tooltipText }) => {
//   if (!createdAt) return null; // Handle null or undefined dates

//   const formattedTime = formatDateTime(createdAt);
//   const tooltipContent =
//     tooltipText || `Execution Time: ${formattedTime}, (UTC+05:30) Asia/Kolkata`;

//   return (
//     <Tooltip title={tooltipContent} placement="bottom" arrow>
//       <Box
//         sx={{
//           width: 120,
//           whiteSpace: 'nowrap',
//           typography: 'body2',
//           color: 'text.secondary',
//         }}
//       >
//         {createdAt}
//       </Box>
//     </Tooltip>
//   );
// };

// export default DateTime;
