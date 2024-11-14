// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';

// import {
//   Box,
//   Chip,
//   Alert,
//   Button,
//   Dialog,
//   Divider,
//   Snackbar,
//   Checkbox,
//   Collapse,
//   TextField,
//   DialogTitle,
//   Autocomplete,
//   useMediaQuery,
//   DialogActions,
//   DialogContent,
//   ListSubheader,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function TeamMemberDialog({ open, onClose, ...other }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [expandedFolders, setExpandedFolders] = useState({});
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [autocompleteError, setAutocompleteError] = useState(false);

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   const handleClose = () => {
//     // Reset fields when dialog closes
//     setEmail('');
//     setSelectedItems([]);
//     setEmailError(false);
//     setAutocompleteError(false);
//     onClose();
//   };

//   const folders = [
//     {
//       name: 'SELECT FOLDERS',
//       items: [
//         'Pabbly Connect',
//         'Main Folder',
//         '- Child Folder 1 - Subscription Billing',
//         '- Child Folder 2',
//         '-- Grand child 1',
//         '-- Grand child 2',
//         '--- Folder 1',
//         '--- Folder 2',
//         '--- Folder 3',
//         '-- Grand child 3',
//         '- Child Folder 3',
//         '- Child Folder 4',
//         'Pabbly Subscription Billing',
//         'Pabbly Email Marketing',
//         'Pabbly Form Builder',
//         'Pabbly Email Verification',
//         'Pabbly Hook',
//         'Client (A)',
//         '- Child Folder 1 - Subscription Billing',
//         '- Child Folder 2',
//         '-- Grand child 1',
//         '-- Grand child 2',
//         '--- Folder 1',
//         '--- Folder 2',
//         '--- Folder 3',
//         '-- Grand child 3',
//         '- Child Folder 3',
//         '- Child Folder 4',
//       ],
//     },
//     {
//       name: 'SELECT WORKFLOWS',
//       items: [
//         'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
//         'Create Invoice in QuickBooks after Stripe Payment',
//         'Update Customer in Hubspot on New Sale in Shopify',
//         'Send Slack Notification on New Deal in Pipedrive',
//         'Add Lead in Salesforce on New Google Form Submission',
//         'Add Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
//         'Add Salesforce on Google Form Submission',
//       ],
//     },
//   ];

//   const options = folders.flatMap((folder) => [
//     { type: 'folder', name: folder.name },
//     ...folder.items.map((item) => ({ type: 'item', name: item, folder: folder.name })),
//   ]);

//   const handleAutocompleteChange = (event, newValue, reason) => {
//     setAutocompleteError(false);
//     if (reason === 'selectOption' || reason === 'removeOption') {
//       if (newValue.length > 0) {
//         const clickedOption = newValue[newValue.length - 1];
//         setSelectedItems((prevItems) => {
//           const isItemSelected = prevItems.some((item) => item.name === clickedOption.name);
//           if (isItemSelected) {
//             return prevItems.filter((item) => item.name !== clickedOption.name);
//           }
//           return [...prevItems, clickedOption];
//         });
//       } else if (newValue.length === 0) {
//         setSelectedItems([]);
//       }
//     } else if (reason === 'clear') {
//       setSelectedItems([]);
//     }
//   };

//   const toggleFolder = (folderName) => {
//     setExpandedFolders((prev) => ({
//       ...prev,
//       [folderName]: !prev[folderName],
//     }));
//   };

//   const [errors, setErrors] = useState({ email: false, tasks: false });
//   const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
//   const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

//   const ALLOWED_EMAILS = ['hardik@pabbly.com', 'kamal.kumar@pabbly.com', 'anand.nayak@pabbly.com'];

//   const isEmailValid = (email1) => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const handleErrorSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setErrorSnackbarOpen(false);
//   };

//   const handleChangeEmail = (event) => {
//     const { value } = event.target;
//     setEmail(value);
//     setErrors((prev) => ({
//       ...prev,
//       email: value ? !isEmailValid(value) : true,
//     }));
//   };

//   const handleAdd = () => {
//     const newErrors = {
//       email: !email,
//     };
//     setErrors(newErrors);

//     if (newErrors.email || newErrors.tasks) return;

//     if (!isEmailValid(email)) {
//       setErrorSnackbarOpen(true);
//       return;
//     }

//     if (!ALLOWED_EMAILS.includes(email)) {
//       setErrorSnackbarOpen(true);
//       return;
//     }

//     setSuccessSnackbarOpen(true);

//     setTimeout(() => {
//       handleClose();
//     }, 100);
//   };

//   const handleSuccessSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSuccessSnackbarOpen(false);
//   };

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         {...other}
//         PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//       >
//         <DialogTitle
//           sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//           onClick={dialog.onFalse}
//         >
//           Add Team Member
//           <Iconify
//             onClick={handleClose}
//             icon="uil:times"
//             style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//           />
//         </DialogTitle>
//         <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

//         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//           <Box display="flex" flexDirection="column" gap={2}>
//             <TextField
//               autoFocus
//               fullWidth
//               type="email"
//               margin="dense"
//               variant="outlined"
//               label="Email Address"
//               placeholder="sample@example.com"
//               value={email}
//               onChange={handleChangeEmail}
//               error={errors.email}
//               helperText={
//                 errors.email ? (
//                   email ? (
//                     'Please enter a valid email address.'
//                   ) : (
//                     'Email address is required.'
//                   )
//                 ) : (
//                   <span>
//                     Ensure that the email address is already registered with Pabbly.{' '}
//                     <Link href="#" style={{ color: '#078DEE' }} underline="always">
//                       Learn more
//                     </Link>
//                   </span>
//                 )
//               }
//             />

//             {/* Snackbar: Enter a valid email address. */}
//             <Snackbar
//               open={errorSnackbarOpen}
//               autoHideDuration={2500}
//               onClose={handleErrorSnackbarClose}
//               anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//               sx={{
//                 boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//                 mt: 13,
//                 zIndex: theme.zIndex.modal + 9999,
//               }}
//             >
//               <Alert
//                 onClose={handleErrorSnackbarClose}
//                 severity="error"
//                 sx={{
//                   width: '100%',
//                   fontSize: '14px',
//                   fontWeight: 'bold',
//                   backgroundColor: theme.palette.background.paper,
//                   color: theme.palette.text.primary,
//                 }}
//               >
//                 Enter a valid email address.
//               </Alert>
//             </Snackbar>

//             {/* Select Workflow/Folder */}
//             <Autocomplete
//               multiple
//               disableCloseOnSelect
//               options={options}
//               groupBy={(option) => (option.type === 'item' ? option.folder : '')}
//               getOptionLabel={(option) => option.name}
//               renderGroup={(params) => (
//                 <li key={params.key}>
//                   <ListSubheader
//                     component="div"
//                     style={{
//                       fontWeight: 'bold',
//                       display: 'flex',
//                       alignItems: 'center',
//                       cursor: 'pointer',
//                     }}
//                     onClick={() => toggleFolder(params.group)}
//                   >
//                     {params.group === 'SELECT FOLDERS' || params.group === 'SELECT WORKFLOWS' ? (
//                       <Iconify
//                         icon={
//                           expandedFolders[params.group] ? 'mdi:chevron-down' : 'mdi:chevron-right'
//                         }
//                         style={{ marginRight: 8 }}
//                       />
//                     ) : null}
//                     {params.group}
//                   </ListSubheader>
//                   <Collapse in={expandedFolders[params.group] !== false}>
//                     <ul>{params.children}</ul>
//                   </Collapse>
//                 </li>
//               )}
//               renderOption={(props, option, { selected }) => {
//                 if (option.type === 'folder') return null;
//                 return (
//                   <li {...props}>
//                     <Checkbox
//                       checked={selectedItems.some((item) => item.name === option.name)}
//                       size="small"
//                       disableRipple
//                     />
//                     {option.name}
//                   </li>
//                 );
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Workflow/Folder"
//                   placeholder="Select"
//                   error={autocompleteError}
//                   helperText={
//                     autocompleteError ? (
//                       'Please select at least one workflow or folder.'
//                     ) : (
//                       <span>
//                         Select workflows or folders to be shared.{' '}
//                         <Link
//                           href="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220/"
//                           style={{ color: '#078DEE' }}
//                           underline="always"
//                         >
//                           Learn more
//                         </Link>
//                       </span>
//                     )
//                   }
//                 />
//               )}
//               renderTags={(selected, getTagProps) =>
//                 selected.map((option, index) => (
//                   <Chip
//                     {...getTagProps({ index })}
//                     key={option.name}
//                     label={option.name}
//                     size="small"
//                     variant="soft"
//                   />
//                 ))
//               }
//               value={selectedItems}
//               onChange={handleAutocompleteChange}
//             />
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleAdd} variant="contained" color="primary">
//             Add
//           </Button>
//           <Button onClick={handleClose} variant="outlined" color="inherit">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={successSnackbarOpen}
//         autoHideDuration={2500}
//         onClose={handleSuccessSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{
//           boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//           mt: 13,
//           zIndex: theme.zIndex.modal + 9999,
//         }}
//       >
//         <Alert
//           onClose={handleSuccessSnackbarClose}
//           severity="success"
//           sx={{
//             width: '100%',
//             fontSize: '14px',
//             fontWeight: 'bold',
//             backgroundColor: theme.palette.background.paper,
//             color: theme.palette.text.primary,
//           }}
//         >
//           Team Member Added Successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import {
  Box,
  Chip,
  Alert,
  Button,
  Dialog,
  Divider,
  Snackbar,
  Checkbox,
  Collapse,
  TextField,
  DialogTitle,
  Autocomplete,
  useMediaQuery,
  DialogActions,
  DialogContent,
  ListSubheader,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function TeamMemberDialog({ open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [autocompleteError, setAutocompleteError] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClose = () => {
    setEmail('');
    setSelectedItems([]);
    setEmailError(false);
    setAutocompleteError(false);
    onClose();
  };

  const folders = [
    {
      name: 'SELECT FOLDERS',
      items: [
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
      ],
    },
    {
      name: 'SELECT WORKFLOWS',
      items: [
        'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
        'Create Invoice in QuickBooks after Stripe Payment',
        'Update Customer in Hubspot on New Sale in Shopify',
        'Send Slack Notification on New Deal in Pipedrive',
        'Add Lead in Salesforce on New Google Form Submission',
        'Add Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
        'Add Salesforce on Google Form Submission',
      ],
    },
  ];

  const options = folders.flatMap((folder) => [
    { type: 'folder', name: folder.name },
    ...folder.items.map((item) => ({ type: 'item', name: item, folder: folder.name })),
  ]);

  const handleAutocompleteChange = (event, newValue, reason) => {
    setAutocompleteError(false);
    if (reason === 'selectOption' || reason === 'removeOption') {
      if (newValue.length > 0) {
        const clickedOption = newValue[newValue.length - 1];
        setSelectedItems((prevItems) => {
          const isItemSelected = prevItems.some((item) => item.name === clickedOption.name);
          if (isItemSelected) {
            return prevItems.filter((item) => item.name !== clickedOption.name);
          }
          return [...prevItems, clickedOption];
        });
      } else if (newValue.length === 0) {
        setSelectedItems([]);
      }
    } else if (reason === 'clear') {
      setSelectedItems([]);
    }
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const [errors, setErrors] = useState({ email: false });
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const ALLOWED_EMAILS = ['hardik@pabbly.com', 'kamal.kumar@pabbly.com', 'anand.nayak@pabbly.com'];

  const isEmailValid = (email1) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleErrorSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setErrorSnackbarOpen(false);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: value ? !isEmailValid(value) : true,
    }));
  };

  const handleAdd = () => {
    const newErrors = {
      email: !email,
    };
    setErrors(newErrors);

    if (newErrors.email) return;

    if (selectedItems.length === 0) {
      setAutocompleteError(true);
      return;
    }

    if (!isEmailValid(email)) {
      setErrorSnackbarOpen(true);
      return;
    }

    if (!ALLOWED_EMAILS.includes(email)) {
      setErrorSnackbarOpen(true);
      return;
    }

    setSuccessSnackbarOpen(true);

    setTimeout(() => {
      handleClose();
    }, 100);
  };

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Add Team Member
          <Iconify
            onClick={handleClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              fullWidth
              type="email"
              margin="dense"
              variant="outlined"
              label="Email Address"
              placeholder="sample@example.com"
              value={email}
              onChange={handleChangeEmail}
              error={errors.email}
              helperText={
                errors.email ? (
                  email ? (
                    'Please enter a valid email address.'
                  ) : (
                    'Email address is required.'
                  )
                ) : (
                  <span>
                    Ensure that the email address is already registered with Pabbly.{' '}
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                  </span>
                )
              }
            />

            <Snackbar
              open={errorSnackbarOpen}
              autoHideDuration={2500}
              onClose={handleErrorSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{
                boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
                mt: 13,
                zIndex: theme.zIndex.modal + 9999,
              }}
            >
              <Alert
                onClose={handleErrorSnackbarClose}
                severity="error"
                sx={{
                  width: '100%',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
              >
                Enter a valid email address.
              </Alert>
            </Snackbar>

            <Autocomplete
              multiple
              disableCloseOnSelect
              options={options}
              groupBy={(option) => (option.type === 'item' ? option.folder : '')}
              getOptionLabel={(option) => option.name}
              renderGroup={(params) => (
                <li key={params.key}>
                  <ListSubheader
                    component="div"
                    style={{
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleFolder(params.group)}
                  >
                    {params.group === 'SELECT FOLDERS' || params.group === 'SELECT WORKFLOWS' ? (
                      <Iconify
                        icon={
                          expandedFolders[params.group] ? 'mdi:chevron-down' : 'mdi:chevron-right'
                        }
                        style={{ marginRight: 8 }}
                      />
                    ) : null}
                    {params.group}
                  </ListSubheader>
                  <Collapse in={expandedFolders[params.group] !== false}>
                    <ul>{params.children}</ul>
                  </Collapse>
                </li>
              )}
              renderOption={(props, option, { selected }) => {
                if (option.type === 'folder') return null;
                return (
                  <li {...props}>
                    <Checkbox
                      checked={selectedItems.some((item) => item.name === option.name)}
                      size="small"
                      disableRipple
                    />
                    {option.name}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Workflow/Folder"
                  placeholder="Select"
                  required
                  error={autocompleteError}
                  helperText={
                    autocompleteError ? (
                      'Please select at least one workflow or folder.'
                    ) : (
                      <span>
                        Select workflows or folders to be shared.{' '}
                        <Link
                          href="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220/"
                          style={{ color: '#078DEE' }}
                          underline="always"
                        >
                          Learn more
                        </Link>
                      </span>
                    )
                  }
                />
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.name}
                    label={option.name}
                    size="small"
                    variant="soft"
                  />
                ))
              }
              value={selectedItems}
              onChange={handleAutocompleteChange}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add
          </Button>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={2500}
        onClose={handleSuccessSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 13,
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleSuccessSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Team Member Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
