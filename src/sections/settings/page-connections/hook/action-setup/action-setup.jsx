// import { Link } from 'react-router-dom';
// import React, { useRef, useState, Fragment, useEffect } from 'react';

// import { styled } from '@mui/material/styles';
// import {
//   Tab,
//   Box,
//   Card,
//   Tabs,
//   Avatar,
//   Button,
//   Tooltip,
//   Collapse,
//   TextField,
//   Typography,
//   IconButton,
//   CardContent,
//   InputAdornment,
// } from '@mui/material';

// import { useTabs } from 'src/hooks/use-tabs';
// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// const FixedSizeGrid = styled(Box)(({ theme }) => ({
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, 120px)', // Fixed width for each column
//   gap: theme.spacing(2),
//   paddingTop: theme.spacing(2),
//   paddingBottom: theme.spacing(2),
//   paddingLeft: theme.spacing('1px'),
//   paddingRight: theme.spacing('1px'),
// }));

// const AppCard = styled(Card)(({ theme }) => ({
//   width: 120, // Fixed width
//   height: 120, // Fixed height
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   cursor: 'pointer',
//   '&:hover': { outline: '1px solid #078DEE' },
// }));

// export default function ActionSetup({ onEnableConnectionTab }) {
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [showItemDropdown, setShowItemDropdown] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [text, setText] = useState('Choose Next Application');
//   const textFieldRef = useRef(null);
//   const [isTabsOpen, setIsTabsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const basicTabs = useTabs('one');
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [inputValue, setInputValue] = useState('');
//   const [showButton, setShowButton] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const autoOptions = [
//     { label: 'Magnet Brains Software Technology Pvt. Ltd.', value: 'auto1' },
//     { label: 'Pabbly List', value: 'auto2' },
//   ];
//   const [autoValue, setAutoValue] = useState(autoOptions[0]);

//   useEffect(() => {
//     if (isEditing) {
//       textFieldRef.current.focus();
//     }
//   }, [isEditing]);

//   const handleTextChange = (event) => {
//     setText(event.target.value);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleBlur = () => {
//     setIsEditing(false);
//   };

//   const formValidationDialog = useBoolean();

//   const formvalidationClick = () => formValidationDialog.onTrue();

//   const external_apps = [
//     {
//       name: 'Annature',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1611236137587_1626158489-annature.png',
//     },
//     {
//       name: 'ChargeOver',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717494873-ChargeOver.png',
//     },
//     {
//       name: '123Formbuilder',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1591774916-123FormBuilder.png',
//     },
//     {
//       name: '360 Dialog (Cloud)',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
//     },
//     {
//       name: '360 Dialog (On-Premise)',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
//     },
//     {
//       name: 'Adyen',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1603100395158_1605873194-adyen.png',
//     },
//     {
//       name: 'ActiveTrail',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1597145299-ActiveTrail.png',
//     },
//     {
//       name: 'AnnounceKit',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572942-AnnounceKit.png',
//     },
//     {
//       name: 'Campaign Monitor',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1598084818603_1599215654-Campaign-Monitor.png',
//     },
//     {
//       name: '8x8',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572958-8x8.png',
//     },
//     {
//       name: 'Alchemer',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717567705-Alchemer.png',
//     },
//     {
//       name: 'BigCommerce',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592046278-bigcommerce-64.png',
//     },
//     {
//       name: 'Albacross',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717502343-Albacross.png',
//     },
//     {
//       name: 'Brilliant Directory',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1667028056-brilliant-directories.png',
//     },
//     {
//       name: 'Heights Platform',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
//     },
//   ];
//   const core_apps = [
//     {
//       name: 'Email Parser (Pabbly)',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1719902117-Pabbly-Email-Parser.png',
//     },
//     {
//       name: 'Schedule (Pabbly)',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1590489835035_1590663807-pabbly.png',
//     },
//     {
//       name: 'Filter (Pabbly)',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717070968-Filter--Pabbly-.png',
//     },
//     {
//       name: 'Router (Pabbly)',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717503844-Router--Pabbly-.png',
//     },
//     {
//       name: 'Iterator (Pabbly)',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717057453-Iterator--Pabbly-.png',
//     },
//     {
//       name: 'Delay (Pabbly)',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717070803-Delay--Pabbly-.png',
//     },
//     {
//       name: 'API (Pabbly)',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717652425-API--Pabbly-.png',
//     },
//     {
//       name: 'Pabbly Email Marketing',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1590489835035_1590663807-pabbly.png',
//     },
//   ];

//   const private_apps = [
//     {
//       name: 'Annaturedfdfd',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1611236137587_1626158489-annature.png',
//     },
//     {
//       name: 'ChargeOver',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717494873-ChargeOver.png',
//     },
//     {
//       name: '123Formbuilder',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1591774916-123FormBuilder.png',
//     },
//     {
//       name: '360 Dialog (Cloud)',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
//     },
//     {
//       name: '360 Dialog (On-Premise)',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
//     },
//     {
//       name: 'Adyen',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1603100395158_1605873194-adyen.png',
//     },
//     {
//       name: 'ActiveTrail',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1597145299-ActiveTrail.png',
//     },
//     {
//       name: 'AnnounceKit',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572942-AnnounceKit.png',
//     },
//     {
//       name: 'Campaign Monitor',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1598084818603_1599215654-Campaign-Monitor.png',
//     },
//     {
//       name: '8x8',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572958-8x8.png',
//     },
//     {
//       name: 'Alchemer',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717567705-Alchemer.png',
//     },
//     {
//       name: 'BigCommerce',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592046278-bigcommerce-64.png',
//     },
//     {
//       name: 'Albacross',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717502343-Albacross.png',
//     },
//     {
//       name: 'Brilliant Directory',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1667028056-brilliant-directories.png',
//     },
//     {
//       name: 'Heights Platform',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
//     },
//     {
//       name: 'Heights Platform',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
//     },
//     {
//       name: 'Heights Platform',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
//     },
//     {
//       name: 'Heights Platform',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
//     },
//     {
//       name: 'Heights Platform',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
//     },
//     {
//       name: 'Heights Platform',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
//     },
//     {
//       name: 'Heights Platform',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
//     },
//   ];

//   const allApps = [...external_apps, ...core_apps, ...private_apps];

//   const handleAppSelect = (app) => {
//     if (app !== selectedApp) {
//       setSelectedApp(app);
//       setShowItemDropdown(true);
//     }
//     setIsTabsOpen(false);
//     setSearchTerm('');
//   };

//   const toggleAppDropdown = () => {
//     setIsTabsOpen(!isTabsOpen);
//     if (!isTabsOpen) {
//       setShowItemDropdown(false);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredApps = allApps.filter((app) =>
//     app.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const items = [
//     { label: 'Add New Row', secondaryLabel: 'Add New Row' },
//     {
//       label: 'Add New Row (Shared Drive)',
//       secondaryLabel: 'Adds a new row to a Google Sheets document stored in a shared drive.',
//     },
//     {
//       label: 'Add New Row (Shared Drive)',
//       secondaryLabel: 'Adds a new row to a Google Sheets document stored in a shared drive.',
//     },
//     {
//       label: 'Add Multiple Rows',
//       secondaryLabel: 'Add multiple rows.',
//     },
//     {
//       label: 'Append Values',
//       secondaryLabel: 'Append Values',
//     },
//     {
//       label: 'Create a Sheet',
//       secondaryLabel: 'Create a Sheet',
//     },
//     {
//       label: 'Create a Spreadsheet',
//       secondaryLabel: 'Create a Spreadsheet',
//     },
//     // Add more items as needed
//   ];

//   const handleItemChangee = (event, newValue) => {
//     setSelectedItem(newValue);
//     setShowButton(newValue !== null);

//     if (newValue) {
//       setText(newValue.label);
//     }
//   };

//   const renderAppGrid = (apps) => (
//     <FixedSizeGrid>
//       {apps.map((app, index) => (
//         <AppCard key={index} onClick={() => handleAppSelect(app)}>
//           <CardContent
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: '8px',
//               // padding: '8px !important',
//             }}
//           >
//             <Avatar variant="rounded" src={app.icon} sx={{ width: 40, height: 40 }} />
//             <Typography
//               textAlign="center"
//               variant="caption"
//               component="div"
//               sx={{
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 display: '-webkit-box',
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: 'vertical',
//                 lineHeight: '1.2em',
//                 height: '2.4em',
//               }}
//             >
//               {app.name}
//             </Typography>
//           </CardContent>
//         </AppCard>
//       ))}
//     </FixedSizeGrid>
//   );

//   const TABS = [
//     {
//       value: 'one',
//       icon: <Iconify icon="gridicons:external" width={20} />,
//       label: 'External Apps',
//       form: (
//         <Box
//           sx={{
//             height: 420,
//             overflowY: 'auto',
//             overflowX: 'hidden',
//           }}
//         >
//           {renderAppGrid(
//             external_apps.filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
//           )}
//         </Box>
//       ),
//     },
//     {
//       value: 'two',
//       icon: <Iconify icon="mdi:star-four-points-circle-outline" width={20} />,
//       label: 'Core Apps',
//       form: (
//         <Box
//           sx={{
//             height: 420,
//             overflowY: 'auto',
//             overflowX: 'hidden',
//           }}
//         >
//           {renderAppGrid(
//             core_apps.filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
//           )}
//         </Box>
//       ),
//     },
//     {
//       value: 'three',
//       icon: <Iconify icon="material-symbols-light:private-connectivity-outline" width={30} />,
//       label: 'Private Apps',
//       form: (
//         <Box
//           sx={{
//             height: 420,
//             overflowY: 'auto',
//             overflowX: 'hidden',
//           }}
//         >
//           {renderAppGrid(
//             private_apps.filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
//           )}
//         </Box>
//       ),
//     },
//   ];

//   const handleConnect = () => {
//     setIsConnected(true);
//     // onEnableConnectionTab();
//   };

//   const handleRefreshFields = () => {
//     // Implement the refresh fields logic here
//     console.log('Refreshing fields...');
//   };

//   // sssdsd

//   const [anchorEl, setAnchorEl] = useState(null);

//   const open = Boolean(anchorEl);

//   // sdsdd
//   const [showField, setShowField] = useState(false);

//   const handleButtonClick = () => {
//     setShowField(true);
//   };

//   const handleItemChange = (event, newValue) => {
//     setSelectedItem(newValue);
//     // Additional logic for handling item selection
//   };

//   return (
//     <Box
//       mt="24px"
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '100vh', // Ensures the container takes full viewport height
//       }}
//     >
//       <Box sx={{ flexGrow: 1 }}>
//         <Typography fontSize={14} fontWeight={600} mt="24px" mb="8px" ml="13px">
//           Choose App
//         </Typography>

//         {/* App selection and dropdown toggle */}
//         <Box
//           onClick={toggleAppDropdown}
//           sx={{
//             border: '1px solid #e0e0e0',
//             borderRadius: '8px',
//             padding: '10px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             cursor: 'pointer',
//             '&:hover': {
//               border: '1px solid #1C252E',
//             },
//           }}
//         >
//           {/* Search or selected app display */}
//           {isTabsOpen ? (
//             <TextField
//               fullWidth
//               variant="standard"
//               placeholder="Search apps..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               InputProps={{
//                 disableUnderline: true,
//                 startAdornment: (
//                   <Iconify icon="mingcute:search-line" sx={{ color: 'text.secondary', mr: 1 }} />
//                 ),
//               }}
//               onClick={(e) => e.stopPropagation()}
//             />
//           ) : selectedApp ? (
//             <Box display="flex" alignItems="center">
//               <Avatar
//                 variant="rounded"
//                 src={selectedApp.icon}
//                 sx={{ mr: 1, width: 24, height: 24 }}
//               />
//               <Typography>{selectedApp.name}</Typography>
//             </Box>
//           ) : (
//             <Typography color="text.secondary">Choose App</Typography>
//           )}
//           <IconButton size="small" onClick={(e) => e.stopPropagation()}>
//             <Iconify icon={isTabsOpen ? 'jam:chevron-up' : 'jam:chevron-down'} />
//           </IconButton>
//         </Box>
//         {/* Tabs and search functionality */}
//         <Collapse in={isTabsOpen}>
//           <Box mt={2}>
//             <Tabs value={basicTabs.value} onChange={basicTabs.onChange}>
//               {TABS.map((tab) => (
//                 <Tab key={tab.value} icon={tab.icon} label={tab.label} value={tab.value} />
//               ))}
//             </Tabs>
//             {TABS.map((tab) =>
//               tab.value === basicTabs.value ? <Fragment key={tab.value}>{tab.form}</Fragment> : null
//             )}
//           </Box>
//         </Collapse>
//         {/* Connection name and Connect button */}
//         {selectedApp && (
//           <Box mt={2}>
//             <Box width="100%" sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
//               <Box>
//                 <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
//                   New Connection Name
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   value={selectedApp.name}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </Box>

//               <Box>
//                 <Typography
//                   sx={{
//                     ml: '13px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     width: '100%',
//                   }}
//                 >
//                   Id
//                 </Typography>
//                 <TextField
//                   sx={{ mt: '8px' }}
//                   fullWidth
//                   type="text"
//                   margin="dense"
//                   variant="outlined"
//                   placeholder="Enter Id here"
//                   helperText={
//                     <>
//                       Enter your Id. You can create Id from{' '}
//                       <Link
//                         href="https://mailchimp.com/developer/marketing/guides/quick-start/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         here
//                       </Link>
//                       .
//                     </>
//                   }
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Tooltip
//                           title="Enter your ID"
//                           arrow
//                           placement="top"
//                           sx={{
//                             fontSize: '16px',
//                           }}
//                         >
//                           <Iconify
//                             icon="material-symbols:info-outline"
//                             style={{ width: 20, height: 20 }}
//                           />
//                         </Tooltip>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>

//               <Box>
//                 <Typography
//                   sx={{
//                     ml: '13px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     width: '100%',
//                   }}
//                 >
//                   Key
//                 </Typography>
//                 <TextField
//                   sx={{ mt: '8px' }}
//                   fullWidth
//                   type="text"
//                   margin="dense"
//                   variant="outlined"
//                   placeholder="Enter Key here"
//                   helperText={
//                     <>
//                       Enter your Key. You can create Key from{' '}
//                       <Link
//                         href="https://mailchimp.com/developer/marketing/guides/quick-start/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         here
//                       </Link>
//                       .
//                     </>
//                   }
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Tooltip
//                           title="Enter your Key"
//                           arrow
//                           placement="top"
//                           sx={{
//                             fontSize: '16px',
//                           }}
//                         >
//                           <Iconify
//                             icon="material-symbols:info-outline"
//                             style={{ width: 20, height: 20 }}
//                           />
//                         </Tooltip>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//             </Box>

//             <Box mt={3}>
//               <Button
//                 size="medium"
//                 variant="contained"
//                 color="primary"
//                 onClick={handleConnect}
//                 startIcon={<Iconify icon="fa6-solid:plug" />}
//               >
//                 Connect
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </Box>
//       {/* Button box anchored at the bottom */}
//       {/* <Box
//         display="flex"
//         gap={2}
//         p={2}
//         sx={{
//           flexGrow: 1,
//           position: 'fixed',
//           bottom: 0,
//           left: 0,
//           width: '100%',
//           // backgroundColor: 'white',
//           borderTop: '1px solid #e0e0e0',
//           zIndex: 1, // Ensures it stays on top of other content
//         }}
//       >
//         <Button onClick={formvalidationClick} variant="outlined" color="primary">
//           Cancel
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleButtonClick}>
//           Save
//         </Button>
//       </Box> */}
//     </Box>
//   );
// }

import { Link } from 'react-router-dom';
import React, { useState, Fragment } from 'react';

import { styled } from '@mui/material/styles';
import {
  Tab,
  Box,
  Card,
  Tabs,
  Avatar,
  Button,
  Tooltip,
  Collapse,
  TextField,
  Typography,
  IconButton,
  CardContent,
  InputAdornment,
} from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { Iconify } from 'src/components/iconify';

const FixedSizeGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 120px)',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing('1px'),
  paddingRight: theme.spacing('1px'),
}));

const AppCard = styled(Card)(({ theme }) => ({
  width: 120,
  height: 120,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': { outline: '1px solid #078DEE' },
}));

export default function ActionSetup({ onEnableConnectionTab, onSelectApp }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [isTabsOpen, setIsTabsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const basicTabs = useTabs('one');

  const external_apps = [
    {
      name: 'Annature',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1611236137587_1626158489-annature.png',
    },
    {
      name: 'ChargeOver',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717494873-ChargeOver.png',
    },
    {
      name: '123Formbuilder',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1591774916-123FormBuilder.png',
    },
    {
      name: '360 Dialog (Cloud)',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
    },
    {
      name: '360 Dialog (On-Premise)',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
    },
    {
      name: 'Adyen',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1603100395158_1605873194-adyen.png',
    },
    {
      name: 'ActiveTrail',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1597145299-ActiveTrail.png',
    },
    {
      name: 'AnnounceKit',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572942-AnnounceKit.png',
    },
    {
      name: 'Campaign Monitor',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1598084818603_1599215654-Campaign-Monitor.png',
    },
    {
      name: '8x8',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572958-8x8.png',
    },
    {
      name: 'Alchemer',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717567705-Alchemer.png',
    },
    {
      name: 'BigCommerce',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592046278-bigcommerce-64.png',
    },
    {
      name: 'Albacross',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717502343-Albacross.png',
    },
    {
      name: 'Brilliant Directory',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1667028056-brilliant-directories.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
  ];
  const core_apps = [
    {
      name: 'Email Parser (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1719902117-Pabbly-Email-Parser.png',
    },
    {
      name: 'Schedule (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1590489835035_1590663807-pabbly.png',
    },
    {
      name: 'Filter (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717070968-Filter--Pabbly-.png',
    },
    {
      name: 'Router (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717503844-Router--Pabbly-.png',
    },
    {
      name: 'Iterator (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717057453-Iterator--Pabbly-.png',
    },
    {
      name: 'Delay (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717070803-Delay--Pabbly-.png',
    },
    {
      name: 'API (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717652425-API--Pabbly-.png',
    },
    {
      name: 'Pabbly Email Marketing',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1590489835035_1590663807-pabbly.png',
    },
  ];

  const private_apps = [
    {
      name: 'Annaturedfdfd',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1611236137587_1626158489-annature.png',
    },
    {
      name: 'ChargeOver',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717494873-ChargeOver.png',
    },
    {
      name: '123Formbuilder',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1591774916-123FormBuilder.png',
    },
    {
      name: '360 Dialog (Cloud)',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
    },
    {
      name: '360 Dialog (On-Premise)',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
    },
    {
      name: 'Adyen',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1603100395158_1605873194-adyen.png',
    },
    {
      name: 'ActiveTrail',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1597145299-ActiveTrail.png',
    },
    {
      name: 'AnnounceKit',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572942-AnnounceKit.png',
    },
    {
      name: 'Campaign Monitor',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1598084818603_1599215654-Campaign-Monitor.png',
    },
    {
      name: '8x8',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572958-8x8.png',
    },
    {
      name: 'Alchemer',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717567705-Alchemer.png',
    },
    {
      name: 'BigCommerce',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592046278-bigcommerce-64.png',
    },
    {
      name: 'Albacross',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717502343-Albacross.png',
    },
    {
      name: 'Brilliant Directory',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1667028056-brilliant-directories.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
  ];

  const allApps = [...external_apps, ...core_apps, ...private_apps];

  const handleAppSelect = (app) => {
    setSelectedApp(app);
    setIsTabsOpen(false);
    setSearchTerm('');
    onSelectApp(app); // Notify ConfigurationDrawer of the selected app
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleAppDropdown = () => {
    setIsTabsOpen(!isTabsOpen);
  };

  const renderAppGrid = (apps) => (
    <FixedSizeGrid>
      {apps.map((app, index) => (
        <AppCard key={index} onClick={() => handleAppSelect(app)}>
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <Avatar variant="rounded" src={app.icon} sx={{ width: 40, height: 40 }} />
            <Typography
              textAlign="center"
              variant="caption"
              component="div"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.2em',
                height: '2.4em',
              }}
            >
              {app.name}
            </Typography>
          </CardContent>
        </AppCard>
      ))}
    </FixedSizeGrid>
  );

  const TABS = [
    {
      value: 'one',
      icon: <Iconify icon="gridicons:external" width={20} />,
      label: 'External Apps',
      form: renderAppGrid(external_apps),
    },
    {
      value: 'two',
      icon: <Iconify icon="mdi:star-four-points-circle-outline" width={20} />,
      label: 'Core Apps',
      form: renderAppGrid(core_apps),
    },
    {
      value: 'three',
      icon: <Iconify icon="material-symbols-light:private-connectivity-outline" width={30} />,
      label: 'Private Apps',
      form: renderAppGrid(private_apps),
    },
  ];

  const handleConnect = () => {
    setSelectedApp(true);
  };

  return (
    <Box
      mt="24px"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontSize={14} fontWeight={600} mt="24px" mb="8px" ml="13px">
          Choose App
        </Typography>

        {/* App selection and dropdown toggle */}
        <Box
          onClick={toggleAppDropdown}
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            '&:hover': {
              border: '1px solid #1C252E',
            },
          }}
        >
          {/* Search or selected app display */}
          {isTabsOpen ? (
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search apps..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <Iconify icon="mingcute:search-line" sx={{ color: 'text.secondary', mr: 1 }} />
                ),
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : selectedApp ? (
            <Box display="flex" alignItems="center">
              <Avatar
                variant="rounded"
                src={selectedApp.icon}
                sx={{ mr: 1, width: 24, height: 24 }}
              />
              <Typography>{selectedApp.name}</Typography>
            </Box>
          ) : (
            <Typography color="text.secondary">Choose App</Typography>
          )}
          <IconButton size="small" onClick={(e) => e.stopPropagation()}>
            <Iconify icon={isTabsOpen ? 'jam:chevron-up' : 'jam:chevron-down'} />
          </IconButton>
        </Box>

        {/* Tabs and search functionality */}
        <Collapse in={isTabsOpen}>
          <Box mt={2}>
            <Tabs value={basicTabs.value} onChange={basicTabs.onChange}>
              {TABS.map((tab) => (
                <Tab key={tab.value} icon={tab.icon} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            {TABS.map((tab) =>
              tab.value === basicTabs.value ? <Fragment key={tab.value}>{tab.form}</Fragment> : null
            )}
          </Box>
        </Collapse>

        {/* Connection name and Connect button */}
        {selectedApp && (
          <Box mt={2}>
            <Box width="100%" sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
                  New Connection Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={selectedApp.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    ml: '13px',
                    fontSize: '14px',
                    fontWeight: '600',
                    width: '100%',
                  }}
                >
                  Id
                </Typography>
                <TextField
                  sx={{ mt: '8px' }}
                  fullWidth
                  type="text"
                  margin="dense"
                  variant="outlined"
                  placeholder="Enter Id here"
                  helperText={
                    <>
                      Enter your Id. You can create Id from{' '}
                      <Link
                        href="https://mailchimp.com/developer/marketing/guides/quick-start/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </Link>
                      .
                    </>
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Enter your ID"
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
              </Box>

              <Box>
                <Typography
                  sx={{
                    ml: '13px',
                    fontSize: '14px',
                    fontWeight: '600',
                    width: '100%',
                  }}
                >
                  Key
                </Typography>
                <TextField
                  sx={{ mt: '8px' }}
                  fullWidth
                  type="text"
                  margin="dense"
                  variant="outlined"
                  placeholder="Enter Key here"
                  helperText={
                    <>
                      Enter your Key. You can create Key from{' '}
                      <Link
                        href="https://mailchimp.com/developer/marketing/guides/quick-start/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </Link>
                      .
                    </>
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Enter your Key"
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
              </Box>
            </Box>

            <Box mt={3}>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                // onClick={handleConnect}
                startIcon={<Iconify icon="fa6-solid:plug" />}
              >
                Connect
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
