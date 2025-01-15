// import React, { useState } from 'react';
// import { useTheme } from '@emotion/react';

// import {
//   Box,
//   Chip,
//   Button,
//   Dialog,
//   Divider,
//   Collapse,
//   TextField,
//   DialogTitle,
//   Autocomplete,
//   useMediaQuery,
//   DialogActions,
//   DialogContent,
//   ListSubheader,
//   CircularProgress,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';
// import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
// import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

// export function TeamMemberDialog({ open, onClose, ...other }) {
//   const theme = useTheme();
//   const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
//   const dialog = useBoolean();
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//   // const [expandedFolders, setExpandedFolders] = useState({});
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [autocompleteError, setAutocompleteError] = useState(false);
//   const [sharedItemError, setSharedItemError] = useState(false);

//   const [sharedFolderError, setSharedFolderError] = useState(false);
//   const [sharedWorkflowError, setSharedWorkflowError] = useState(false);

//   // Mock data for already shared items (replace with actual data in production)

//   const sharedItems = {
//     folders: [
//       'Pabbly Connect',
//       '- Child Folder 2',
//       'Pabbly Form Builder',
//       'Pabbly Email Verification',
//     ],
//     workflows: [
//       'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
//       'Update Customer in Hubspot on New Sale in Shopify',
//       'Add Lead in Salesforce on New Google Form Submission',
//     ],
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   const handleClose = () => {
//     setEmail('');
//     setSelectedItems([]);
//     setEmailError(false);
//     setAutocompleteError(false);
//     setSharedFolderError(false);
//     setSharedWorkflowError(false);
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

//         // Check if the clicked item is already shared
//         if (
//           clickedOption.folder === 'SELECT FOLDERS' &&
//           sharedItems.folders.includes(clickedOption.name)
//         ) {
//           setSharedFolderError(true);
//           return;
//         }

//         if (
//           clickedOption.folder === 'SELECT WORKFLOWS' &&
//           sharedItems.workflows.includes(clickedOption.name)
//         ) {
//           setSharedWorkflowError(true);
//           return;
//         }

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

//   // const toggleFolder = (folderName) => {
//   //   setExpandedFolders((prev) => ({
//   //     ...prev,
//   //     [folderName]: !prev[folderName],
//   //   }));
//   // };

//   const [expandedFolders, setExpandedFolders] = useState(
//     Object.fromEntries(folders.map((folder) => [folder.name, false]))
//   );

//   const toggleFolder = (folderName) => {
//     setExpandedFolders((prev) => ({
//       ...prev,
//       [folderName]: !prev[folderName],
//     }));
//   };

//   const [errors, setErrors] = useState({ email: false });
//   const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
//   const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

//   const ALLOWED_EMAILS = [
//     'hardik@pabbly.com',
//     'kamal.kumar@pabbly.com',
//     'anand.nayak@pabbly.com',
//     'abhishek.nagar@pabbly.com',
//     'ankit.mandli@pabbly.com',
//     'arnav.chakraborty@pabbly.com',
//     'ayush.bisen@pabbly.com',
//     'chetali.parve@pabbly.com',
//     'hardik.pradhan@pabbly.com',
//     'jayant.raikwar@pabbly.com',
//     'kamal.kumar@pabbly.com',
//     'krishna.thapa@pabbly.com',
//     'luv.dubey@pabbly.com',
//     'mahesh.pawar@pabbly.com',
//     'manthan.deshmukh@pabbly.com',
//     'neeraj.agarwal@pabbly.com',
//     'nikhil.patel@pabbly.com',
//     'nimesh.sahu@pabbly.com',
//     'pankaj.agarwal@pabbly.com',
//     'punit.shinde@pabbly.com',
//     'rajendra.jatav@pabbly.com',
//     'rajpal.tomar@magnetbrains.com',
//     'satish.thapa@pabbly.com',
//     'sourabh.singh@pabbly.com',
//   ];

//   const isEmailValid = (email1) => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const handleErrorSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setErrorSnackbarOpen(false);
//     setSharedFolderError(false);
//     setSharedWorkflowError(false);
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

//     if (newErrors.email) return;

//     if (selectedItems.length === 0) {
//       setAutocompleteError(true);
//       return;
//     }

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
//       setIsLoading(false);
//     }, 1200);
//   };

//   // LoadingButton
//   const [isLoading, setIsLoading] = useState(false);

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
//         {/* ... Dialog content remains the same ... */}
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
//           {/* ... Rest of the dialog content ... */}
//           <Box display="flex" flexDirection="column" gap={2}>
//             {/* ... Email TextField ... */}
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
//                   <span>Ensure that the email address is already registered with Pabbly. </span>
//                 )
//               }
//             />

//             {/* Invalid Email Snackbar */}
//             <CustomSnackbar
//               open={errorSnackbarOpen}
//               onClose={handleErrorSnackbarClose}
//               message="Enter a valid email address."
//               severity="error"
//             />

//             {/* Folders Already Shared Snackbar */}
//             <CustomSnackbar
//               open={sharedFolderError}
//               onClose={handleErrorSnackbarClose}
//               message="Folders has already been shared."
//               severity="error"
//             />

//             {/* Workflows Already Shared Snackbar */}
//             <CustomSnackbar
//               open={sharedWorkflowError}
//               onClose={handleErrorSnackbarClose}
//               message="Workflows has already been shared."
//               severity="error"
//             />

//             {/* Autocomplete component - update renderOption to check both folders and workflows */}
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
//                     <ul style={{ marginLeft: 12 }}>{params.children}</ul>
//                   </Collapse>
//                 </li>
//               )}
//               renderOption={(props, option, { selected }) => {
//                 if (option.type === 'folder') return null;
//                 const isShared =
//                   option.folder === 'SELECT FOLDERS'
//                     ? sharedItems.folders.includes(option.name)
//                     : sharedItems.workflows.includes(option.name);
//                 return (
//                   <li {...props}>
//                     {/* <Checkbox
//                       checked={selectedItems.some((item) => item.name === option.name)}
//                       size="small"
//                       disableRipple
//                       disabled={isShared}
//                     /> */}
//                     {option.name}
//                   </li>
//                 );
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Workflow/Folder"
//                   placeholder="Select"
//                   required
//                   error={autocompleteError}
//                   helperText={
//                     autocompleteError ? (
//                       'Please select at least one workflow or folder.'
//                     ) : (
//                       <span>
//                         Select workflows or folders to be shared.{' '}
//                         <LearnMoreLink link="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220/" />
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
//           <Button onClick={handleAdd} disabled={isLoading} variant="contained" color="primary">
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
//           </Button>
//           <Button onClick={handleClose} variant="outlined" color="inherit">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Success Snackbar */}
//       <CustomSnackbar
//         open={successSnackbarOpen}
//         onClose={handleSuccessSnackbarClose}
//         message="Team Member Added Successfully!"
//         severity="success"
//       />
//     </>
//   );
// }

// ------------------------------------------

import { toast } from 'sonner';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Chip,
  Button,
  Dialog,
  Divider,
  Collapse,
  TextField,
  DialogTitle,
  Autocomplete,
  useMediaQuery,
  DialogActions,
  DialogContent,
  ListSubheader,
  CircularProgress,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function TeamMemberDialog({ open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const [selectedItems, setSelectedItems] = useState([]);
  const [email, setEmail] = useState('');
  const [autocompleteError, setAutocompleteError] = useState(false);
  const [errors, setErrors] = useState({ email: false });
  const [isLoading, setIsLoading] = useState(false);

  const ALLOWED_EMAILS = [
    'hardik@pabbly.com',
    'kamal.kumar@pabbly.com',
    'anand.nayak@pabbly.com',
    'abhishek.nagar@pabbly.com',
    'ankit.mandli@pabbly.com',
    'arnav.chakraborty@pabbly.com',
    'ayush.bisen@pabbly.com',
    'chetali.parve@pabbly.com',
    'hardik.pradhan@pabbly.com',
    'jayant.raikwar@pabbly.com',
    'kamal.kumar@pabbly.com',
    'krishna.thapa@pabbly.com',
    'luv.dubey@pabbly.com',
    'mahesh.pawar@pabbly.com',
    'manthan.deshmukh@pabbly.com',
    'neeraj.agarwal@pabbly.com',
    'nikhil.patel@pabbly.com',
    'nimesh.sahu@pabbly.com',
    'pankaj.agarwal@pabbly.com',
    'punit.shinde@pabbly.com',
    'rajendra.jatav@pabbly.com',
    'rajpal.tomar@magnetbrains.com',
    'satish.thapa@pabbly.com',
    'sourabh.singh@pabbly.com',
  ];

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

  const sharedItems = {
    folders: [
      'Pabbly Connect',
      '- Child Folder 2',
      'Pabbly Form Builder',
      'Pabbly Email Verification',
    ],
    workflows: [
      'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
      'Update Customer in Hubspot on New Sale in Shopify',
      'Add Lead in Salesforce on New Google Form Submission',
    ],
  };

  const options = folders.flatMap((folder) => [
    { type: 'folder', name: folder.name },
    ...folder.items.map((item) => ({ type: 'item', name: item, folder: folder.name })),
  ]);

  const isEmailValid = (email1) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: value ? !isEmailValid(value) : true,
    }));
  };

  const handleAutocompleteChange = (event, newValue, reason) => {
    setAutocompleteError(false);
    if (reason === 'selectOption' || reason === 'removeOption') {
      if (newValue.length > 0) {
        const clickedOption = newValue[newValue.length - 1];

        if (
          clickedOption.folder === 'SELECT FOLDERS' &&
          sharedItems.folders.includes(clickedOption.name)
        ) {
          // Show snackbar
          toast.error('Folder has already been shared.');
          return;
        }

        if (
          clickedOption.folder === 'SELECT WORKFLOWS' &&
          sharedItems.workflows.includes(clickedOption.name)
        ) {
          // Show snackbar
          toast.error('Workflow has already been shared.');
          return;
        }


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

  const handleAdd = async () => {
    const newErrors = { email: !email };
    setErrors(newErrors);

    if (newErrors.email) return;

    if (selectedItems.length === 0) {
      setAutocompleteError(true);
      // Show snackbar
      toast.error('Please select at least one workflow or folder.');

      return;
    }

    if (!isEmailValid(email)) {
      // Show snackbar
      toast.error('Enter a valid email address.');
      return;
    }

    if (!ALLOWED_EMAILS.includes(email)) {
      // Show snackbar
      toast.error('This email is not allowed.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Show snackbar
      toast.success('Team Member Added Successfully!');
      handleClose();
    } catch (error) {
      // Show snackbar
      toast.error('Failed to add team member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setSelectedItems([]);
    setErrors({ email: false });
    setAutocompleteError(false);
    setIsLoading(false);
    onClose();
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const [expandedFolders, setExpandedFolders] = useState(
    Object.fromEntries(folders.map((folder) => [folder.name, false]))
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth

      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={dialog.onFalse}
      >
        Add Team Member
        <Iconify
          onClick={(e) => {
            e.stopPropagation(); // Add this to prevent event bubbling
            handleClose();
          }}
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        />
      </DialogTitle>
      <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* ... dialog content ... */}
        <Box display="flex" flexDirection="column" gap={2}>
          {/* ... Email TextField ... */}
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
                <span>Ensure that the email address is already registered with Pabbly. </span>
              )
            }
          />

          {/* Autocomplete component - update renderOption to check both folders and workflows */}
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
                  <ul style={{ marginLeft: 12 }}>{params.children}</ul>
                </Collapse>
              </li>
            )}
            renderOption={(props, option, { selected }) => {
              if (option.type === 'folder') return null;
              const isShared =
                option.folder === 'SELECT FOLDERS'
                  ? sharedItems.folders.includes(option.name)
                  : sharedItems.workflows.includes(option.name);
              return (
                <li {...props}>
                  {/* <Checkbox
                      checked={selectedItems.some((item) => item.name === option.name)}
                      size="small"
                      disableRipple
                      disabled={isShared}
                    /> */}
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Workflow/Folder"
                placeholder="Select"
                error={autocompleteError}
                helperText={
                  autocompleteError ? (
                    'Please select at least one workflow or folder.'
                  ) : (
                    <span>
                      Select workflows or folders to be shared.{' '}
                      <LearnMoreLink link="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220/" />
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
        <Button onClick={handleAdd} disabled={isLoading} variant="contained" color="primary">
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
