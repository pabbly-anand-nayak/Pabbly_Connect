// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
// import { useState, useCallback } from 'react';

// import {
//   Box,
//   Alert,
//   Dialog,
//   Button,
//   Divider,
//   Tooltip,
//   Snackbar,
//   TextField,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function VariablesDialog({ title, content, action, open, onClose, ...other }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [contactList, setContactList] = useState('Pabbly_Connect_list');
//   const [variableName, setVariableName] = useState('');
//   const [variableData, setVariableData] = useState('');
//   const [variableNameError, setVariableNameError] = useState(false);
//   const [variableDataError, setVariableDataError] = useState(false);

//   const handleAdd = () => {
//     const isVariableNameEmpty = !variableName.trim();
//     const isVariableDataEmpty = !variableData.trim();

//     setVariableNameError(isVariableNameEmpty);
//     setVariableDataError(isVariableDataEmpty);

//     if (!isVariableNameEmpty && !isVariableDataEmpty) {
//       setSnackbarOpen(true);
//       onClose(); // Close the dialog when Share is clicked
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleChangeContactList = useCallback((event) => {
//     setContactList(event.target.value);
//   }, []);

//   // Sample data
//   const CONTACTLISTS = [
//     { value: 'Home', label: 'Home' },
//     { value: 'Main Folder', label: 'Main Folder' },
//     { value: 'Folder 2', label: 'Folder 2' },
//   ];

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={onClose}
//         {...other}
//         PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//       >
//         <DialogTitle
//           sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//           onClick={dialog.onFalse}
//         >
//           Add Custom Variable{' '}
//           <Iconify
//             onClick={onClose}
//             icon="uil:times"
//             style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//           />
//         </DialogTitle>
//         <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

//         <DialogContent>
//           <Box display="flex" flexDirection="column" gap={2}>
//             {/* <TextField
//               autoFocus
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Variable Name"
//               value={variableName}
//               onChange={(e) => setVariableName(e.target.value)}
//               error={variableNameError}
//               helperText={
//                 variableNameError ? (
//                   'Variable Name is required'
//                 ) : (
//                   <span>
//                     Variable names should start with alphabets and cannot contain special
//                     characters. E.g. customV1.{' '}
//                     <Link href="#" style={{ color: '#078DEE' }} underline="always">
//                       Learn more
//                     </Link>
//                   </span>
//                 )
//               }
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Tooltip
//                       title="Enter the name of the workflow."
//                       arrow
//                       placement="top"
//                       sx={{
//                         fontSize: '16px', // Adjust the font size as needed
//                       }}
//                     >
//                       <Iconify
//                         icon="material-symbols:info-outline"
//                         style={{ width: 20, height: 20 }}
//                       />
//                     </Tooltip>
//                   </InputAdornment>
//                 ),
//               }}
//             /> */}

//             <TextField
//               autoFocus
//               fullWidth
//               type="text"
//               margin="dense"
//               variant="outlined"
//               label="Variable Name"
//               value={variableName}
//               onChange={(e) => {
//                 const newValue = e.target.value.replace(/\s/g, ''); // Remove spaces
//                 setVariableName(newValue);
//               }}
//               error={variableNameError}
//               helperText={
//                 variableNameError ? (
//                   'Variable Name is required'
//                 ) : (
//                   <span>
//                     Variable names should start with alphabets and cannot contain spaces or special
//                     characters. E.g., customV1.{' '}
//                     <Link href="#" style={{ color: '#078DEE' }} underline="always">
//                       Learn more
//                     </Link>
//                   </span>
//                 )
//               }
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Tooltip
//                       title="No spaces allowed. Please enter a continuous string of characters."
//                       arrow
//                       placement="top"
//                       sx={{
//                         fontSize: '16px', // Adjust the font size as needed
//                       }}
//                     >
//                       <Iconify
//                         icon="material-symbols:info-outline"
//                         style={{ width: 20, height: 20 }}
//                       />
//                     </Tooltip>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <TextField
//               helperText={
//                 variableDataError ? (
//                   'Variable Data is required'
//                 ) : (
//                   <span>
//                     Ensure that the variable data is entered correctly.{' '}
//                     <Link href="#" style={{ color: '#078DEE' }} underline="always">
//                       Learn more
//                     </Link>
//                   </span>
//                 )
//               }
//               id="outlined-multiline-static"
//               label="Variable Data"
//               multiline
//               rows={4}
//               value={variableData}
//               onChange={(e) => setVariableData(e.target.value)}
//               error={variableDataError}
//               onFocus={(e) => {
//                 if (e.target.value === 'Enter variable data here') {
//                   e.target.value = '';
//                 }
//               }}
//             />
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAdd} variant="contained" color="primary">
//             Add
//           </Button>
//           <Button onClick={onClose} variant="outlined" color="inherit">
//             Cancel
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
//           Updated!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import {
  Box,
  Alert,
  Dialog,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function VariablesDialog({ title, content, action, open, onClose, ...other }) {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [contactList, setContactList] = useState('Pabbly_Connect_list');
  const [variableName, setVariableName] = useState('');
  const [variableData, setVariableData] = useState('');
  const [variableNameError, setVariableNameError] = useState(false);
  const [variableNameErrorMessage, setVariableNameErrorMessage] = useState('');
  const [variableDataError, setVariableDataError] = useState(false);

  const resetForm = () => {
    setVariableName('');
    setVariableData('');
    setVariableNameError(false);
    setVariableNameErrorMessage('');
    setVariableDataError(false);
  };

  const handleAdd = () => {
    const isVariableNameEmpty = !variableName.trim();
    const isVariableDataEmpty = !variableData.trim();

    setVariableNameError(isVariableNameEmpty);
    setVariableDataError(isVariableDataEmpty);

    if (isVariableNameEmpty) {
      setVariableNameErrorMessage('Variable Name is required.');
    } else {
      setVariableNameErrorMessage('');
    }

    if (!isVariableNameEmpty && !isVariableDataEmpty) {
      setSnackbarOpen(true);
      onClose();
      resetForm();
    }
  };

  const handleDialogClose = () => {
    resetForm();
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangeContactList = useCallback((event) => {
    setContactList(event.target.value);
  }, []);

  const handleVariableNameChange = (e) => {
    const newValue = e.target.value;

    if (/\s/.test(newValue)) {
      setVariableNameError(true);
      setVariableNameErrorMessage(
        'No spaces allowed. Please enter a continuous string of characters.'
      );
    } else if (!newValue.trim()) {
      setVariableNameError(true);
      setVariableNameErrorMessage('Variable Name is required.');
    } else {
      setVariableNameError(false);
      setVariableNameErrorMessage('');
    }

    setVariableName(newValue.replace(/\s/g, ''));
  };

  const CONTACTLISTS = [
    { value: 'Home', label: 'Home' },
    { value: 'Main Folder', label: 'Main Folder' },
    { value: 'Folder 2', label: 'Folder 2' },
  ];

  return (
    <>
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
          Add Custom Variable{' '}
          <Iconify
            onClick={handleDialogClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Variable Name"
              value={variableName}
              onChange={handleVariableNameChange}
              error={variableNameError}
              helperText={
                variableNameError ? (
                  variableNameErrorMessage
                ) : (
                  <span>
                    Variable names should start with alphabets and cannot contain spaces or special
                    characters. E.g., customV1.{' '}
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                  </span>
                )
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="No spaces allowed. Please enter a continuous string of characters."
                      arrow
                      placement="top"
                      sx={{
                        fontSize: '16px',
                      }}
                    >
                      <Iconify
                        icon="material-symbols:info-outline"
                        style={{ width: 20, height: 20 }}
                      />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              helperText={
                variableDataError ? (
                  'Variable Data is required'
                ) : (
                  <span>
                    Ensure that the variable data is entered correctly.{' '}
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                  </span>
                )
              }
              id="outlined-multiline-static"
              label="Variable Data"
              multiline
              rows={4}
              value={variableData}
              onChange={(e) => {
                setVariableData(e.target.value);
                if (e.target.value.trim()) {
                  setVariableDataError(false); // Clear the error when user starts typing
                }
              }}
              error={variableDataError}
              onFocus={(e) => {
                if (e.target.value === 'Enter variable data here') {
                  e.target.value = '';
                }
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add
          </Button>
          <Button onClick={handleDialogClose} variant="outlined" color="inherit">
            Cancel
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
          Custom variable added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}