// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
// import { useState, useCallback } from 'react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import {
//   Alert,
//   Divider,
//   Tooltip,
//   Snackbar,
//   TextField,
//   IconButton,
//   Autocomplete,
//   useMediaQuery,
//   DialogContent,
//   CircularProgress,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function AutoReExecutionSettingsPopover({
//   title,
//   content,
//   action,
//   open,
//   onClose,
//   ...other
// }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

//   const dialog = useBoolean();
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [categorylist, setCategorytList] = useState(''); // Initialize empty for validation
//   const [categoryError, setCategoryError] = useState(false); // State to manage error message

//   const handleChangeCategoryList = useCallback((event, value) => {
//     setCategorytList(value);
//     if (value) {
//       setCategoryError(false); // Reset error when valid selection is made
//     }
//   }, []);

//   const folder = [
//     '0 (disable auto re-execution)',
//     '1 attempt(s)',
//     '2 attempt(s)',
//     '3 attempt(s)',
//     '4 attempt(s)',
//     '5 attempt(s)',
//   ];

//   const handleAdd = () => {
//     if (!categorylist) {
//       setCategoryError(true); // Show error if no folder is selected
//       return;
//     }
//     setSnackbarOpen(true);
//     setTimeout(() => {
//       onClose();
//     }, 0);
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   const handleDialogClose = () => {
//     setSnackbarOpen(false); // Reset the Snackbar state when the dialog is closed
//     onClose();
//   };

//   // LoadingButton
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <Dialog
//       open={open}
//       onClose={handleDialogClose}
//       {...other}
//       PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//     >
//       <DialogTitle
//         sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//         onClick={dialog.onFalse}
//       >
//         <Tooltip
//           title="Set the number of times the system should automatically re-execute failed or skipped steps in the workflow."
//           arrow
//           placement="top"
//         >
//           Auto Re-Execution Settings
//         </Tooltip>

//         <IconButton
//           onClick={handleDialogClose}
//           style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//         >
//           <Iconify icon="uil:times" />
//         </IconButton>

//       </DialogTitle>

//       <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

//       <DialogContent>
//         <Autocomplete
//           sx={{
//             '& .MuiInputBase-input': {
//               fontSize: '14px',
//             },
//             '& .MuiInputLabel-root': {
//               fontSize: '14px',
//             },
//             mt: 1.2,
//           }}
//           options={folder}
//           onChange={handleChangeCategoryList}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label={<span>Select Auto Re-Execution Attempts </span>}
//               placeholder="Select attempt(s)"
//               helperText={
//                 <span>
//                   {categoryError ? (
//                     'Please select auto re-execution attempts.'
//                   ) : (
//                     <>
//                       Select how many times a task should retry automatically if it fails.{' '}
//                       <Link
//                         href="https://forum.pabbly.com/threads/how-to-enable-auto-re-execution-for-workflows.15088/#post-71171"
//                         style={{ color: '#078DEE' }}
//                         underline="always"
//                       >
//                         Learn more
//                       </Link>
//                     </>
//                   )}
//                 </span>
//               }
//               error={categoryError}
//             />
//           )}
//         />
//       </DialogContent>

//       <DialogActions>
//         {action}
//         <Button
//           onClick={handleAdd}
//           variant="contained"
//           color="primary"
//           disabled={isLoading}
//         >
//           {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//         </Button>

//       </DialogActions>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
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
//             fontSize: '16px',
//             fontWeight: 'bold',
//             backgroundColor: theme.palette.background.paper,
//             color: theme.palette.text.primary,
//           }}
//         >
//           You have successfully enabled auto re-execution.
//         </Alert>
//       </Snackbar>
//     </Dialog>
//   );
// }




import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import {
  Divider,
  Tooltip,
  TextField,
  IconButton,
  Autocomplete,
  useMediaQuery,
  DialogContent,
  CircularProgress,
} from '@mui/material'; // Import toast from sonner

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function AutoReExecutionSettingsPopover({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  const dialog = useBoolean();
  const [categorylist, setCategorytList] = useState(''); // Initialize empty for validation
  const [categoryError, setCategoryError] = useState(false); // State to manage error message

  const handleChangeCategoryList = useCallback((event, value) => {
    setCategorytList(value);
    if (value) {
      setCategoryError(false); // Reset error when valid selection is made
    }
  }, []);

  const folder = [
    '0 (disable auto re-execution)',
    '1 attempt(s)',
    '2 attempt(s)',
    '3 attempt(s)',
    '4 attempt(s)',
    '5 attempt(s)',
  ];

  const handleAdd = () => {
    if (!categorylist) {
      setCategoryError(true); // Show error if no folder is selected
      return;
    }

    // Show success toast
    toast.success('You have successfully enabled auto re-execution.');

    setTimeout(() => {
      onClose();
    }, 0);
  };

  const handleDialogClose = () => {
    onClose();
  };

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={dialog.onFalse}
      >
        <Tooltip
          title="Set the number of times the system should automatically re-execute failed or skipped steps in the workflow."
          arrow
          placement="top"
        >
          Auto Re-Execution Settings
        </Tooltip>

        <IconButton
          onClick={handleDialogClose}
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        >
          <Iconify icon="uil:times" />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

      <DialogContent>
        <Autocomplete
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '14px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '14px',
            },
            mt: 1.2,
          }}
          options={folder}
          onChange={handleChangeCategoryList}
          renderInput={(params) => (
            <TextField
              {...params}
              label={<span>Select Auto Re-Execution Attempts </span>}
              placeholder="Select attempt(s)"
              helperText={
                <span>
                  {categoryError ? (
                    'Please select auto re-execution attempts.'
                  ) : (
                    <>
                      Select how many times a task should retry automatically if it fails.{' '}
                      <Link
                        href="https://forum.pabbly.com/threads/how-to-enable-auto-re-execution-for-workflows.15088/#post-71171"
                        style={{ color: '#078DEE' }}
                        underline="always"
                      >
                        Learn more
                      </Link>
                    </>
                  )}
                </span>
              }
              error={categoryError}
            />
          )}
        />
      </DialogContent>

      <DialogActions>
        {action}
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
