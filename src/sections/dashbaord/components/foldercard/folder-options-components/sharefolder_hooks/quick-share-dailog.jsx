// import { useRef, useState } from 'react';
// import { useTheme } from '@emotion/react';

// import {
//   Box,
//   Alert,
//   Dialog,
//   Button,
//   Divider,
//   Tooltip,
//   Snackbar,
//   Checkbox,
//   TextField,
//   Typography,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function QuickShareDialog({ title, content, action, open, onClose, query, sx, ...other }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [selectedReplies, setSelectedReplies] = useState({});

//   const handleAdd = () => {
//     setSnackbarOpen(true);
//     onClose(); // Close the dialog when Share is clicked
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleSelectReply = (replyText) => {
//     setSelectedReplies((prev) => ({
//       ...prev,
//       [replyText]: !prev[replyText],
//     }));
//   };

//   // Sample data for quick replies
//   const QuickReplies = [
//     { text: 'anand.nayak@pabbly.com', helpText: 'Workflow Shared: 55' },
//     { text: 'ayush.bisen@pabbly.com', helpText: 'Workflow Shared: 10' },
//     { text: 'hardik.pradhan@pabbly.com', helpText: 'Workflow Shared: 15' },
//     { text: 'rajpal.tomar@magnetbrains.com', helpText: 'Workflow Shared: 20' },
//     { text: 'nikhil.patel@pabbly.com', helpText: 'Workflow Shared: 12' },
//     { text: 'rajendra.jatav@pabbly.com', helpText: 'Workflow Shared: 12' },
//   ];

//   const filteredReplies = QuickReplies.filter((reply) =>
//     reply.text.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={onClose}
//         {...other}
//         PaperProps={
//           isWeb
//             ? { style: { minWidth: '600px', backgroundColor: theme.palette.background.paper } }
//             : { style: { minWidth: '330px', backgroundColor: theme.palette.background.paper } }
//         }
//       >
//         <DialogTitle
//           sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//           onClick={dialog.onFalse}
//         >
//           Quick Share With Team Members{' '}
//           <Iconify
//             onClick={onClose}
//             icon="uil:times"
//             style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//           />
//         </DialogTitle>
//         <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

//         <DialogContent sx={{ height: '400px', flexDirection: 'column', gap: '8px' }}>
//           <Box sx={{ p: '16px 24px 16px 24px', zIndex: 999, position: 'sticky' }}>
//             <Tooltip title="Search team members here." arrow placement="top">
//               <TextField
//                 fullWidth
//                 size="large"
//                 placeholder="Search Team Members..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 // inputRef={useRef(null)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Iconify icon="eva:search-fill" width={24} height={24} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Tooltip>
//           </Box>
//           <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

//           <Box sx={{ mb: 1 }}>
//             {filteredReplies.map((reply, index) => (
//               <Box
//                 key={index}
//                 sx={{ px: 1.5, pb: 1, pt: 1, display: 'flex', alignItems: 'center' }}
//               >
//                 <Checkbox
//                   checked={!!selectedReplies[reply.text]}
//                   onChange={() => handleSelectReply(reply.text)}
//                   inputProps={{
//                     id: `reply-checkbox-${index}`,
//                     'aria-label': `Select ${reply.text}`,
//                   }}
//                 />
//                 <Box sx={{ ml: 1 }}>
//                   <Typography sx={{ fontWeight: 'bold' }}>{reply.text}</Typography>
//                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     {reply.helpText}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))}
//             {filteredReplies.length === 0 && (
//               <Box sx={{ textAlign: 'center', borderRadius: 1.5, ...sx }} {...other}>
//                 <Box sx={{ mb: 1, typography: 'h6' }}>Not found</Box>

//                 <Typography variant="body2">
//                   No results found for &nbsp;
//                   <strong>{`"${query}"`}</strong>
//                   .
//                   <br /> Try checking for typos or using complete words.
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           {/* <Button onClick={onClose} variant="outlined" color="inherit">
//             Cancel
//           </Button> */}
//           <Button onClick={handleAdd} color="primary" variant="contained">
//             Share
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         Z-index={100}
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
//           Share Successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Alert,
  Dialog,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  Checkbox,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function QuickShareDialog({ title, content, action, open, onClose, query, sx, ...other }) {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedReplies, setSelectedReplies] = useState({});

  const handleAdd = () => {
    setSnackbarOpen(true);
    onClose(); // Close the dialog when Share is clicked
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSelectReply = (replyText) => {
    setSelectedReplies((prev) => ({
      ...prev,
      [replyText]: !prev[replyText],
    }));
  };

  // Sample data for quick replies
  const QuickReplies = [
    { text: 'anand.nayak@pabbly.com', helpText: 'Workflow Shared: 55' },
    { text: 'ayush.bisen@pabbly.com', helpText: 'Workflow Shared: 10' },
    { text: 'hardik.pradhan@pabbly.com', helpText: 'Workflow Shared: 15' },
    { text: 'rajpal.tomar@magnetbrains.com', helpText: 'Workflow Shared: 20' },
    { text: 'nikhil.patel@pabbly.com', helpText: 'Workflow Shared: 12' },
    { text: 'rajendra.jatav@pabbly.com', helpText: 'Workflow Shared: 12' },
  ];

  const filteredReplies = QuickReplies.filter((reply) =>
    reply.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        {...other}
        PaperProps={
          isWeb
            ? { style: { minWidth: '600px', backgroundColor: theme.palette.background.paper } }
            : { style: { minWidth: '330px', backgroundColor: theme.palette.background.paper } }
        }
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Quick Share With Team Members{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <DialogContent
          sx={{ height: '400px', overflowY: 'auto', flexDirection: 'column', gap: '8px' }}
        >
          <Box
            sx={{
              p: '24px 0px 24px 0px',
              position: 'sticky',
              top: 0,
              zIndex: 999,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Tooltip title="Search team members here." arrow placement="top">
              <TextField
                fullWidth
                size="large"
                placeholder="Search Team Members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" width={24} height={24} />
                    </InputAdornment>
                  ),
                }}
              />
            </Tooltip>
          </Box>

          <Box sx={{ mb: 1 }}>
            {filteredReplies.map((reply, index) => (
              <Box key={index} sx={{ px: 0, pb: 2, pt: 1, display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={!!selectedReplies[reply.text]}
                  onChange={() => handleSelectReply(reply.text)}
                  inputProps={{
                    id: `reply-checkbox-${index}`,
                    'aria-label': `Select ${reply.text}`,
                  }}
                />
                <Box sx={{ ml: 1 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>{reply.text}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {reply.helpText}
                  </Typography>
                </Box>
              </Box>
            ))}
            {filteredReplies.length === 0 && (
              <Box sx={{ textAlign: 'center', borderRadius: 1.5, ...sx }} {...other}>
                <Box sx={{ mb: 1, typography: 'h6' }}>Not found</Box>

                <Typography variant="body2">
                  No results found for &nbsp;
                  <strong>{`"${query}"`}</strong>
                  .<br /> Try checking for typos or using complete words.
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} color="primary" variant="contained">
            Share
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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
          Share Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
