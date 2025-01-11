// import { toast } from 'sonner';
// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
// import { useState, useCallback, useEffect } from 'react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import {
//   Divider,
//   Tooltip,
//   TextField,
//   IconButton,
//   Autocomplete,
//   useMediaQuery,
//   DialogContent,
//   CircularProgress,
// } from '@mui/material';

// import { Iconify } from 'src/components/iconify';

// export function MoveToFolderPopover({ folderName, title, content, action, open, onClose, ...other }) {
//   const [newWorkflowName, setNewFolderName] = useState(folderName); // Store the editable workflow name
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const [categoryList, setCategoryList] = useState(''); // Initialize empty for validation
//   const [categoryError, setCategoryError] = useState(false); // State to manage error message

//   useEffect(() => {
//     setNewFolderName(folderName); // Update the state when the dialog opens with the initial name
//   }, [folderName]);

//   const handleChangeCategoryList = useCallback((event, value) => {
//     setCategoryList(value);
//     if (value) {
//       setCategoryError(false); // Reset error when valid selection is made
//     }
//   }, []);

//   const folder = [
//     'Home',
//     'Pabbly Connect',
//     'Main Folder',
//     '- Child Folder 1 - Subscription Billing',
//     '- Child Folder 2',
//     '-- Grand child 1',
//     '-- Grand child 2',
//     '--- Folder 1',
//     '--- Folder 2',
//     '--- Folder 3',
//     '-- Grand child 3',
//     '- Child Folder 3',
//     '- Child Folder 4',
//     'Pabbly Subscription Billing',
//     'Pabbly Email Marketing',
//     'Pabbly Form Builder',
//     'Pabbly Email Verification',
//     'Pabbly Hook',
//     'Client (A)',
//     '- Child Folder 1 - Subscription Billing',
//     '- Child Folder 2',
//     '-- Grand child 1',
//     '-- Grand child 2',
//     '--- Folder 1',
//     '--- Folder 2',
//     '--- Folder 3',
//     '-- Grand child 3',
//     '- Child Folder 3',
//     '- Child Folder 4',
//   ];

//   const handleMoveToFolder = () => {
//     if (!categoryList) {
//       setCategoryError(true); // Show error if no folder is selected
//       return;
//     }

//     // Show success toast
//     toast.success('The workflow(s) moved successfully.');

//     setTimeout(() => {
//       onClose();
//     }, 0);
//   };

//   const handleDialogClose = () => {
//     setCategoryList(''); // Reset category list on close
//     setCategoryError(false); // Reset error state on close
//     onClose();
//   };

//   // LoadingButton
//   const [isLoading, setIsLoading] = useState(false);


//   return (
//     <Dialog
//       open={open}
//       // onClose={handleDialogClose}
//       {...other}
//       PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//     >
//       <DialogTitle
//         sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//         onClick={() => {}}
//       >
//         Move To Folder{' '}

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
//           value={categoryList} // Set the value of Autocomplete

//           onChange={handleChangeCategoryList}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label={
//                 <Tooltip
//                   title="Select folder to which the workflow needs to be moved."
//                   arrow
//                   placement="top"
//                 >
//                   <span>Select Folder</span>
//                 </Tooltip>
//               }
//               helperText={
//                 <span>
//                   {categoryError ? (
//                     'Please select a required folder.'
//                   ) : (
//                     <>
//                       Select the folder or subfolder where you want to move the workflow(s).{' '}
//                       <Link
//                         href="https://forum.pabbly.com/threads/folders.20987/"
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
//           onClick={handleMoveToFolder}
//           variant="contained"
//           color="primary"
//           disabled={isLoading}
//         >
//           {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Move'}
//         </Button>

//       </DialogActions>

//     </Dialog>
//   );
// }



import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';

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
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// export function MoveToFolderPopover({ folderName, title, content, action, open, onClose, ...other }) {
//   const [newWorkflowName, setNewFolderName] = useState(folderName); // Store the editable workflow name
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const [categoryList, setCategoryList] = useState(''); // Initialize empty for validation
//   const [categoryError, setCategoryError] = useState(false); // State to manage error message

export function MoveToFolderPopover({ folderName, open, onClose, ...other }) {
  const [categoryList, setCategoryList] = useState(folderName || ''); // Initialize with passed folderName
  const [categoryError, setCategoryError] = useState(false);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  // Update useEffect to set initial value when dialog opens
  useEffect(() => {
    if (open && folderName) {
      setCategoryList(folderName);
    }
  }, [open, folderName]);

  const handleChangeCategoryList = useCallback((event, value) => {
    setCategoryList(value);
    if (value) {
      setCategoryError(false);
    }
  }, []);

  const handleMoveToFolder = () => {
    if (!categoryList) {
      setCategoryError(true);
      return;
    }
    toast.success('The workflow(s) moved successfully.');
    onClose();
  };

  const handleDialogClose = () => {
    setCategoryList(folderName || ''); // Reset to initial folder name
    setCategoryError(false);
    onClose();
  };


  const folder = [
    'Home',
    'Pabbly Connect',
    'Main Folder',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
  ];


  return (
    <Dialog
      open={open}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      {...other}
    >
      <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
        Move To Folder
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
          value={categoryList}
          onChange={handleChangeCategoryList}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <Tooltip
                  title="Select folder to which the workflow needs to be moved."
                  arrow
                  placement="top"
                >
                  <span>Select Folder</span>
                </Tooltip>
              }
              helperText={
                <span>
                  {categoryError ? (
                    'Please select a required folder.'
                  ) : (
                    <>
                      Select the folder or subfolder where you want to move the workflow(s).{' '}
                      <Link
                        href="https://forum.pabbly.com/threads/folders.20987/"
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
        <Button
          onClick={handleMoveToFolder}
          variant="contained"
          color="primary"
          disabled={false}
        >
          Move
        </Button>
      </DialogActions>
    </Dialog>
  );
}