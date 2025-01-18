// import React from 'react';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import {
//   Box,
//   Stack,
//   Button,
//   Popover,
//   Tooltip,
//   TextField,
//   Typography,
//   FormControl,
//   Autocomplete
// } from '@mui/material';

// import { Iconify } from '../iconify';

// const CustomFilter = ({
//   open,
//   anchorEl,
//   onClose,
//   title,
//   titleTooltip,
//   fields,
//   onApply,
//   hasAnyFilterSelected,
//   width = 850
// }) => (
//   <Popover
//     open={Boolean(anchorEl)}
//     anchorEl={anchorEl}
//     onClose={onClose}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//   >
//     <Box
//       sx={{
//         width: {
//           xs: '100%',
//           sm: '100%',
//           md: width,
//         },
//         flexDirection: {
//           xs: 'column',
//           sm: 'column',
//           md: 'row',
//         },
//       }}
//     >
//       {/* Filter Header */}
//       <Box
//         sx={{
//           borderBottom: '1px dashed #919eab33',
//           p: 2,
//           display: 'flex',
//           height: '100%',
//           width: '100%',
//         }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <Typography variant="h6" sx={{ fontWeight: '600' }}>
//             <Tooltip title={titleTooltip} arrow placement="top">
//               {title}
//             </Tooltip>
//           </Typography>
//         </Box>
//         <Iconify
//           icon="uil:times"
//           onClick={onClose}
//           style={{
//             width: 20,
//             height: 20,
//             cursor: 'pointer',
//             color: '#637381',
//           }}
//         />
//       </Box>

//       {/* Filter Options */}
//       <Box
//         sx={{
//           p: '16px 16px 0px 16px',
//           gap: 2,
//           flexDirection: {
//             xs: 'column',
//             sm: 'column',
//             md: 'row',
//           },
//         }}
//       >
//         {fields.map((field) => (
//           <Box
//             key={field.name}
//             sx={{
//               display: 'flex',
//               flexDirection: {
//                 xs: 'column',
//                 sm: 'column',
//                 md: 'row',
//               },
//               gap: 2,
//               mb: 2,
//             }}
//           >
//             <FormControl
//               fullWidth
//               sx={{ mb: { xs: 2, sm: 2, md: 0, width: 600 }, justifyContent: 'center' }}
//             >
//               <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
//                 <Tooltip title={field.tooltip} arrow placement="top">
//                   {field.label}
//                 </Tooltip>
//               </Typography>
//             </FormControl>

//             <FormControl
//               fullWidth
//               sx={{
//                 mb: { xs: 2, sm: 2, md: 0 },
//                 width: { xs: '100%', sm: '100%', md: '390px' },
//               }}
//             >
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 label="Equals to"
//                 disabled
//                 size="small"
//               />
//             </FormControl>

//             <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
//               {field.type === 'date' ? (
//                 <Stack direction="row" spacing={2} flexGrow={1}>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DateTimePicker
//                       label="Start Date"
//                       value={field.value.start}
//                       onChange={field.onChange.start}
//                       slotProps={{
//                         textField: {
//                           size: 'small',
//                           sx: {
//                             '& .MuiInputBase-input': { fontSize: '14px' },
//                             '& .MuiInputLabel-root': { fontSize: '14px' },
//                           },
//                         },
//                       }}
//                     />
//                     <DateTimePicker
//                       label="End Date"
//                       value={field.value.end}
//                       onChange={field.onChange.end}
//                       slotProps={{
//                         textField: {
//                           size: 'small',
//                           sx: {
//                             '& .MuiInputBase-input': { fontSize: '14px' },
//                             '& .MuiInputLabel-root': { fontSize: '14px' },
//                           },
//                         },
//                       }}
//                     />
//                   </LocalizationProvider>
//                 </Stack>
//               ) : field.type === 'autocomplete' ? (
//                 <Autocomplete
//                   size="small"
//                   options={field.options}
//                   value={field.value}
//                   onChange={field.onChange}
//                   renderInput={(params) => <TextField {...params} label="Select" />}
//                   sx={{
//                     '& .MuiInputBase-input': { fontSize: '14px' },
//                     '& .MuiInputLabel-root': { fontSize: '14px' },
//                   }}
//                 />
//               ) : (
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   value={field.value}
//                   onChange={field.onChange}
//                   size="small"
//                   label={`Enter ${field.label}`}
//                   sx={{
//                     '& .MuiInputBase-input': { fontSize: '14px' },
//                     '& .MuiInputLabel-root': { fontSize: '14px' },
//                   }}
//                 />
//               )}
//             </FormControl>
//           </Box>
//         ))}
//       </Box>

//       {/* Filter Footer */}
//       <Box
//         sx={{
//           p: 2,
//           gap: 2,
//           display: 'flex',
//           justifyContent: 'flex-end',
//           borderTop: '1px dashed #919eab33',
//         }}
//       >
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={onApply}
//           disabled={!hasAnyFilterSelected}
//         >
//           Apply Filter
//         </Button>
//       </Box>
//     </Box>
//   </Popover>
// );

// export default CustomFilter;




import React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Stack,
  Button,
  Popover,
  Tooltip,
  TextField,
  Typography,
  IconButton,
  FormControl,
  Autocomplete
} from '@mui/material';

import { Iconify } from '../iconify';

const CustomFilter = ({
  open,
  anchorEl,
  onClose,
  title,
  titleTooltip,
  fields,
  onApply,
  hasAnyFilterSelected,
  width = 850,
  buttonText = 'Apply Filter'
}) => (
  <Popover
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: width,
        },
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'row',
        },
      }}
    >
      {/* Filter Header */}
      <Box
        sx={{
          borderBottom: '1px dashed #919eab33',
          p: 2,
          display: 'flex',
          height: '100%',
          width: '100%',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            <Tooltip title={titleTooltip} arrow placement="top">
              {title}
            </Tooltip>
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          style={{
            width: 20,
            height: 20,
            cursor: 'pointer',
            color: '#637381'
          }}
        >
          <Iconify icon="uil:times" />
        </IconButton>
      </Box>

      {/* Filter Options */}
      <Box
        sx={{
          p: '16px 16px 0px 16px',
          gap: 2,
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
          },
        }}
      >
        {fields.map((field) => (
          <Box
            key={field.name}
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
              gap: 2,
              mb: 2,
            }}
          >
            <FormControl
              fullWidth
              sx={{ mb: { xs: 2, sm: 2, md: 0, width: 600 }, justifyContent: 'center' }}
            >
              <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                <Tooltip title={field.tooltip} arrow placement="top">
                  {field.label}
                </Tooltip>
              </Typography>
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                mb: { xs: 2, sm: 2, md: 0 },
                width: { xs: '100%', sm: '100%', md: '390px' },
              }}
            >
              <TextField
                variant="outlined"
                fullWidth
                label={field.operatorLabel || "Equals to"}
                disabled
                size="small"
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
              {field.type === 'date' ? (
                <Stack direction="row" spacing={2} flexGrow={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label={field.startDateLabel || "Start Date"}
                      value={field.value.start}
                      onChange={field.onChange.start}
                      slotProps={{
                        textField: {
                          size: 'small',
                          sx: {
                            '& .MuiInputBase-input': { fontSize: '14px' },
                            '& .MuiInputLabel-root': { fontSize: '14px' },
                          },
                        },
                      }}
                    />
                    <DateTimePicker
                      label={field.endDateLabel || "End Date"}
                      value={field.value.end}
                      onChange={field.onChange.end}
                      slotProps={{
                        textField: {
                          size: 'small',
                          sx: {
                            '& .MuiInputBase-input': { fontSize: '14px' },
                            '& .MuiInputLabel-root': { fontSize: '14px' },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Stack>
              ) : field.type === 'autocomplete' ? (
                <Autocomplete
                  size="small"
                  options={field.options}
                  value={field.value}
                  onChange={field.onChange}
                  renderInput={(params) => (
                    <TextField {...params} label={field.selectLabel || "Select"} />
                  )}
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '14px' },
                    '& .MuiInputLabel-root': { fontSize: '14px' },
                  }}
                />
              ) : (
                <TextField
                  variant="outlined"
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  size="small"
                  label={field.inputLabel || `Enter ${field.label}`}
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '14px' },
                    '& .MuiInputLabel-root': { fontSize: '14px' },
                  }}
                />
              )}
            </FormControl>
          </Box>
        ))}
      </Box>

      {/* Filter Footer */}
      <Box
        sx={{
          p: 2,
          gap: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: '1px dashed #919eab33',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onApply}
          disabled={!hasAnyFilterSelected}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  </Popover>
);

export default CustomFilter;