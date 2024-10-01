// import React, { useState } from 'react';
// import { useTheme } from '@emotion/react';

// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import IconButton from '@mui/material/IconButton';
// import { Alert, Avatar, Tooltip, Checkbox, Snackbar, AvatarGroup } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { usePopover } from 'src/components/custom-popover';

// import { ConfigurationDrawer2 } from 'src/sections/history/hook/history-drawer';

// // import { ConfirmDialog } from '../../hook/confirm-dialog';

// export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
//   const confirm = useBoolean();
//   const theme = useTheme();

//   const collapse = useBoolean();
//   const popover = usePopover();
//   const [openDrawer2, setOpenDrawer2] = useState(false);

//   const [showToken, setShowToken] = useState(false);

//   const handleToggleToken = () => {
//     setShowToken((prev) => !prev);
//   };

//   const handleOpenDrawer2 = () => {
//     setOpenDrawer2(true);
//   };

//   const handleCloseDrawer2 = () => {
//     setOpenDrawer2(false);
//   };

//   const handleCopyClick = () => {
//     setSnackbarMessage('Id copied!');
//     setSnackbarOpen(true);
//     popover.onOpen(); // Optionally open the popover or handle any additional logic
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const renderPrimary = (
//     <TableRow hover selected={selected}>
//       <TableCell padding="checkbox">
//         <Checkbox
//           checked={selected}
//           onClick={onSelectRow}
//           inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
//         />
//       </TableCell>

//       {/* Date/Time */}
//       <TableCell width={120}>
//         <Stack spacing={2} direction="row" alignItems="center">
//           <Stack
//             sx={{
//               typography: 'body2',
//               flex: '1 1 auto',
//               alignItems: 'flex-start',
//             }}
//           >
//             <Tooltip
//               title="Execution Time: Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata"
//               placement="top"
//               arrow
//             >
//               <Box
//                 sx={{
//                   width: 'fixd', // adjust width as needed
//                   whiteSpace: 'nowrap',
//                   color: 'text.disabled',
//                 }}
//                 component="span"
//               >
//                 Aug 22, 2024
//               </Box>
//             </Tooltip>
//             <Tooltip
//               title="Execution Time: Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata"
//               placement="bottom"
//               arrow
//             >
//               <Box component="span" sx={{ color: 'text.disabled' }}>
//                 08:23:31
//               </Box>
//             </Tooltip>
//           </Stack>
//         </Stack>
//       </TableCell>

//       {/* Application */}
//       {/* <TableCell width={130}>
//         <Stack spacing={3} direction="row" alignItems="center">
//           <Stack
//             sx={{
//               typography: 'body2',
//               flex: '1 1 auto',
//               alignItems: 'flex-start',
//             }}
//           >
//             <Tooltip title="Integrated applications" placement="top" arrow>
//               <AvatarGroup total={2}>
//                 <Avatar
//                   alt="app1"
//                   sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
//                   src="/assets/icons/app logo/pabbly_icon.png"
//                 />
//                 <Avatar
//                   alt="app2"
//                   sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
//                   src="/assets/icons/app logo/thrivecart.png"
//                 />
//               </AvatarGroup>
//             </Tooltip>
//           </Stack>
//         </Stack>
//       </TableCell> */}
//       <TableCell width={137}>
//         <Stack spacing={2} direction="row" alignItems="center">
//           <Tooltip title="Integrated applications" placement="top" arrow>
//             <AvatarGroup>
//               <Avatar
//                 alt="app1"
//                 sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
//                 src={row.icon1}
//               />
//               <Avatar
//                 alt="app2"
//                 sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
//                 src={row.icon2}
//               />
//             </AvatarGroup>
//           </Tooltip>
//         </Stack>
//       </TableCell>

//       {/* Workflow Name */}
//       {/* <TableCell width={262}>
//         <Stack spacing={2} direction="row" alignItems="center">
//           <Stack
//             sx={{
//               typography: 'body2',
//               flex: '1 1 auto',
//               alignItems: 'flex-start',
//             }}
//           >
//             <Tooltip
//               title="Workflow Name: Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment"
//               placement="top"
//               arrow
//             >
//               <Box
//                 component="span"
//                 sx={{
//                   width: 430, // adjust width as needed
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment
//               </Box>
//             </Tooltip>
//             <Tooltip title="Folder Name: Home" placement="bottom" arrow>
//               <Box component="span" sx={{ color: 'text.disabled' }}>
//                 Home
//               </Box>
//             </Tooltip>
//           </Stack>
//         </Stack>
//       </TableCell> */}
//       <TableCell width={550}>
//         <Stack spacing={2} direction="row" alignItems="center">
//           <Stack
//             sx={{
//               color: '#078dee',
//               typography: 'body2',
//               flex: '1 1 auto',
//               alignItems: 'flex-start',
//               cursor: 'pointer',
//             }}
//           >
//             <Tooltip title={`Workflow Name: ${row.workflowName}`} placement="top" arrow>
//               <Box
//                 component="span"
//                 sx={{
//                   width: 450,
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 {row.workflowName}
//               </Box>
//             </Tooltip>
//             <Tooltip title="Folder Name: Home" placement="bottom" arrow>
//               <Box component="span" sx={{ color: 'text.disabled' }}>
//                 Home
//               </Box>
//             </Tooltip>
//           </Stack>
//         </Stack>
//       </TableCell>

//       {/* Task Consumption */}
//       {/* <TableCell width={165}>
//         <Stack spacing={2} direction="row" alignItems="center">
//           <Stack
//             sx={{
//               typography: 'body2',
//               flex: '1 1 auto',
//               alignItems: 'flex-start',
//             }}
//           >
//             <Tooltip
//               title="Total number of steps executed in the workflow includes both free and paid steps."
//               placement="top"
//               arrow
//             >
//               <Box
//                 sx={{
//                   width: 165, // adjust width as needed
//                   whiteSpace: 'nowrap',
//                 }}
//                 component="span"
//               >
//                 2 Steps Workflow
//               </Box>
//             </Tooltip>
//             <Tooltip
//               title="Pabbly Connect does not charge tasks for triggers and internal application steps. You're saving 50% on task usage by using Pabbly Connect."
//               placement="bottom"
//               arrow
//             >
//               <Box component="span" sx={{ color: 'text.disabled' }}>
//                 2 Free Tasks
//               </Box>
//             </Tooltip>
//           </Stack>
//         </Stack>
//       </TableCell> */}
//       <TableCell width={380}>
//         <Stack spacing={2} direction="row" alignItems="center">
//           <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//             <Tooltip
//               title="This indicates the total number of tasks consumed"
//               placement="top"
//               arrow
//             >
//               <Box sx={{ width: 185, whiteSpace: 'nowrap' }} component="span">
//                 {row.totalQuantity} Tasks Consumed
//               </Box>
//             </Tooltip>
//             <Tooltip
//               title="This indicates the number of free tasks consumed."
//               placement="bottom"
//               arrow
//             >
//               <Box component="span" sx={{ color: 'text.disabled' }}>
//                 100 Free Tasks Consumed
//               </Box>
//             </Tooltip>
//           </Stack>
//         </Stack>
//       </TableCell>

//       {/* Task History ID */}
//       <TableCell width={200}>
//         <Stack spacing={2} direction="row" alignItems="center">
//           <Stack
//             sx={{
//               color: '#078dee',
//               typography: 'body2',
//               flex: '1 1 auto',
//               alignItems: 'flex-start',
//             }}
//           >
//             {/* <Tooltip title="Click here to view task details in brief." placement="top" arrow>
//               <Box
//                 onClick={handleOpenDrawer2}
//                 component="span"
//                 sx={{ cursor: 'pointer' }} // Add this line to ensure the click cursor shows
//               >
//                 IjU3NjUwNTZm...
//               </Box>
//             </Tooltip>
//             <ConfigurationDrawer2 open={openDrawer2} onClose={handleCloseDrawer2} /> */}

//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 gap: 1,
//                 mb: 0,
//               }}
//             >
//               <Tooltip title="Click here to view task details in brief." placement="top" arrow>
//                 <Box
//                   onClick={handleOpenDrawer2}
//                   component="span"
//                   sx={{ cursor: 'pointer' }} // Add this line to ensure the click cursor shows
//                 >
//                   IjU3NjUwNTZm...
//                 </Box>
//               </Tooltip>
//               <ConfigurationDrawer2 open={openDrawer2} onClose={handleCloseDrawer2} />

//               <Tooltip title="Click here to view task details in brief." placement="top" arrow>
//                 <IconButton
//                   color={popover.open ? 'inherit' : 'default'}
//                   onClick={handleOpenDrawer2}
//                 >
//                   <Iconify
//                     sx={{ width: '20px', height: '20px' }}
//                     icon="carbon:side-panel-open-filled"
//                   />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </Stack>
//         </Stack>
//       </TableCell>

//       {/* Task Status */}
//       <TableCell width={110}>
//         <Stack
//           sx={{
//             typography: 'body2',
//             display: 'flex',
//             flex: '1 1 auto',
//             alignItems: 'flex-start',
//           }}
//         >
//           {row.status === 'live' && (
//             <Tooltip title="Click here to view task details in brief." arrow placement="top">
//               <Label
//                 variant="soft"
//                 color="success"
//                 startIcon={<Iconify icon="heroicons:check-circle-16-solid" />}
//                 onClick={handleOpenDrawer2}
//                 component="span"
//                 sx={{ cursor: 'pointer' }}
//               >
//                 {row.status}
//               </Label>
//             </Tooltip>
//           )}
//           {row.status === 'sent' && (
//             <Tooltip title="Click here to view task details in brief." arrow placement="top">
//               <Label
//                 variant="soft"
//                 color="warning"
//                 startIcon={<Iconify icon="ant-design:close-circle-filled" />}
//                 onClick={handleOpenDrawer2}
//                 component="span"
//                 sx={{ cursor: 'pointer' }}
//               >
//                 {row.status}
//               </Label>
//             </Tooltip>
//           )}
//           {row.status === 'scheduled' ? (
//             <Tooltip title="Click here to view task details in brief." arrow placement="top">
//               {/* <Label
//                 variant="soft"
//                 color="error"
//                 startIcon={<Iconify icon="ant-design:close-circle-filled" />}
//                 onClick={handleOpenDrawer2}
//                 component="span"
//                 sx={{ cursor: 'pointer' }}
//               >
//                 {row.status}
//               </Label> */}
//             </Tooltip>
//           ) : (
//             row.status !== 'live' &&
//             row.status !== 'sent' && (
//               <Label variant="soft" color="default">
//                 {row.status}
//               </Label>
//             )
//           )}

//           {row.status === 'scheduled' && (
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 gap: 1,
//                 mb: 0,
//               }}
//             >
//               <Tooltip title="Click here to view task details in brief." placement="top" arrow>
//                 <Label
//                   variant="soft"
//                   color="error"
//                   startIcon={<Iconify icon="ant-design:close-circle-filled" />}
//                   onClick={handleOpenDrawer2}
//                   component="span"
//                   sx={{ cursor: 'pointer' }}
//                 >
//                   Failed
//                 </Label>
//               </Tooltip>

//               <Tooltip
//                 title="This is a child task created after the re-execution of a parent task. Parent Task History ID is IjU3NjUwNTZlMDYzNjA0MzE1MjZmIg_3D_3D_pc"
//                 placement="top"
//                 arrow
//               >
//                 <IconButton color={popover.open ? 'inherit' : 'default'} onClick={handleCopyClick}>
//                   <Iconify sx={{ width: '20px', height: '20px' }} icon="solar:copy-bold" />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           )}
//         </Stack>
//       </TableCell>
//     </TableRow>
//   );

//   return (
//     <>
//       {renderPrimary}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={5000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{
//           boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//           mt: 7,
//         }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           sx={{
//             width: '100%',
//             fontSize: '14px',
//             fontWeight: 'bold',
//             backgroundColor: theme.palette.background.paper,
//             color: theme.palette.text.primary,
//           }}
//         >
//           Task History Copied Successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Alert, Avatar, Tooltip, Checkbox, Snackbar, AvatarGroup } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { ConfigurationDrawer2 } from 'src/sections/history/hook/history-drawer';

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const theme = useTheme();

  const collapse = useBoolean();
  const popover = usePopover();
  const [openDrawer2, setOpenDrawer2] = useState(false);

  const [showToken, setShowToken] = useState(false);

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
  };

  const handleOpenDrawer2 = () => {
    setOpenDrawer2(true);
  };

  const handleCloseDrawer2 = () => {
    setOpenDrawer2(false);
  };

  const handleCopyClick = () => {
    setSnackbarMessage('Id copied!');
    setSnackbarOpen(true);
    popover.onOpen(); // Optionally open the popover or handle any additional logic
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>

      {/* Date/Time */}
      <TableCell width={120}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title="Execution Time: Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata"
              placement="top"
              arrow
            >
              <Box
                sx={{
                  width: 'fixed', // adjust width as needed
                  whiteSpace: 'nowrap',
                  color: 'text.disabled',
                }}
                component="span"
              >
                Aug 22, 2024
              </Box>
            </Tooltip>
            <Tooltip
              title="Execution Time: Aug 22, 2024 08:23:31, (UTC+05:30) Asia/Kolkata"
              placement="bottom"
              arrow
            >
              <Box component="span" sx={{ color: 'text.disabled' }}>
                08:23:31
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      {/* Application */}
      <TableCell width={137}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Tooltip title="Integrated applications" placement="top" arrow>
            <AvatarGroup>
              <Avatar
                alt="app1"
                sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
                src={row.icon1}
              />
              <Avatar
                alt="app2"
                sx={{ padding: '6px', width: '26px', height: '26px', backgroundColor: '#EDEFF2' }}
                src={row.icon2}
              />
            </AvatarGroup>
          </Tooltip>
        </Stack>
      </TableCell>

      {/* Workflow Name */}
      <TableCell width={550}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              color: '#078dee',
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
              cursor: 'pointer',
            }}
          >
            <Tooltip title={`Workflow Name: ${row.workflowName}`} placement="top" arrow>
              <Box
                component="span"
                sx={{
                  width: 450,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {row.workflowName}
              </Box>
            </Tooltip>
            <Tooltip title="Folder Name: Home" placement="bottom" arrow>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                Home
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      {/* Task Consumption */}
      <TableCell width={380}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip
              title="This indicates the total number of tasks consumed"
              placement="top"
              arrow
            >
              <Box sx={{ width: 185, whiteSpace: 'nowrap' }} component="span">
                {row.totalQuantity} Steps Workflow
              </Box>
            </Tooltip>
            <Tooltip
              title="This indicates the number of free tasks consumed."
              placement="bottom"
              arrow
            >
              <Box component="span" sx={{ color: 'text.disabled' }}>
                1 Free Tasks
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      {/* Task History ID */}
      <TableCell width={200}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              color: '#078dee',
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // gap: 1,
                mb: 0,
              }}
            >
              <Tooltip title="Click here to view task details in brief." placement="top" arrow>
                <Box
                  onClick={handleOpenDrawer2}
                  component="span"
                  sx={{
                    width: 140, // adjust width as needed
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer',
                  }}
                >
                  {row.status === 'live'
                    ? `IjU3NjUwNTZm ${row.id}`
                    : row.status === 'sent'
                      ? `NjUwNTZm ${row.id}`
                      : `U3NjUwNTZm ${row.id}`}
                </Box>
              </Tooltip>
              <ConfigurationDrawer2 open={openDrawer2} onClose={handleCloseDrawer2} />

              <Tooltip title="Click here to view task details in brief." placement="top" arrow>
                <IconButton
                  color={popover.open ? 'inherit' : 'default'}
                  onClick={handleOpenDrawer2}
                >
                  <Iconify
                    sx={{ width: '20px', height: '20px' }}
                    icon="carbon:side-panel-open-filled"
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      {/* Task Status */}
      <TableCell width={110}>
        <Stack
          sx={{
            typography: 'body2',
            display: 'flex',
            flex: '1 1 auto',
            alignItems: 'flex-start',
          }}
        >
          {row.status === 'live' && (
            <Tooltip title="Click here to view task details in brief." arrow placement="top">
              <Label
                variant="soft"
                color="success"
                startIcon={<Iconify icon="heroicons:check-circle-16-solid" />}
                onClick={handleOpenDrawer2}
                component="span"
                sx={{ cursor: 'pointer' }}
              >
                Success
              </Label>
            </Tooltip>
          )}
          {row.status === 'sent' && (
            <Tooltip title="Click here to view task details in brief." arrow placement="top">
              <Label
                variant="soft"
                color="warning"
                startIcon={<Iconify icon="ant-design:close-circle-filled" />}
                onClick={handleOpenDrawer2}
                component="span"
                sx={{ cursor: 'pointer' }}
              >
                Partial Failed
              </Label>
            </Tooltip>
          )}
          {row.status === 'scheduled' ? (
            <Tooltip title="Click here to view task details in brief." arrow placement="top">
              {/* <Label
                variant="soft"
                color="error"
                startIcon={<Iconify icon="ant-design:close-circle-filled" />}
              >
                {row.status}
              </Label> */}
            </Tooltip>
          ) : (
            row.status !== 'live' &&
            row.status !== 'sent' && (
              <Label variant="soft" color="default">
                {row.status}
              </Label>
            )
          )}

          {row.status === 'scheduled' && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                mb: 0,
              }}
            >
              <Tooltip title="Click here to view task details in brief." placement="top" arrow>
                <Label
                  variant="soft"
                  color="error"
                  startIcon={<Iconify icon="ant-design:close-circle-filled" />}
                  onClick={handleOpenDrawer2}
                  component="span"
                  sx={{ cursor: 'pointer' }}
                >
                  Failed
                </Label>
              </Tooltip>

              <Tooltip
                title="This is a child task created after the re-execution of a parent task. Parent Task History ID is IjU3NjUwNTZlMDYzNjA0MzE1MjZmIg_3D_3D_pc"
                placement="top"
                arrow
              >
                <IconButton color={popover.open ? 'inherit' : 'default'} onClick={handleCopyClick}>
                  <Iconify sx={{ width: '20px', height: '20px' }} icon="solar:copy-bold" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Task History Copied Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
