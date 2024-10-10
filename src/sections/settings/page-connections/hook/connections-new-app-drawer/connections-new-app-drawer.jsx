// import React, { Fragment, useState } from 'react';

// import { styled } from '@mui/material/styles';
// import {
//   Box,
//   Tab,
//   Link,
//   Card,
//   Tabs,
//   Drawer,
//   Avatar,
//   Button,
//   Tooltip,
//   TextField,
//   Typography,
//   IconButton,
//   CardContent,
//   InputAdornment,
//   Backdrop as MuiBackdrop,
// } from '@mui/material';

// import { useTabs } from 'src/hooks/use-tabs';

// import { varAlpha } from 'src/theme/styles';

// import { Iconify } from 'src/components/iconify';

// const CustomBackdrop = (props) => (
//   <MuiBackdrop {...props} sx={{ backgroundColor: 'transparent' }} />
// );

// const FixedSizeGrid = styled(Box)(({ theme }) => ({
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, 120px)',
//   gap: theme.spacing(2),
//   paddingTop: theme.spacing(3),
//   paddingBottom: theme.spacing(2),
//   paddingLeft: theme.spacing('1px'),
//   paddingRight: theme.spacing('1px'),
// }));

// const AppCard = styled(Card)(({ theme }) => ({
//   width: 120,
//   height: 120,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   cursor: 'pointer',
//   '&:hover': { outline: '1px solid #078DEE' },
// }));

// const NewAppDrawer = ({ open, onClose }) => {
//   const handleBackdropClick = (event) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   const [selectedApp, setSelectedApp] = useState(null); // State to store selected app details
//   const [isSearchVisible, setIsSearchVisible] = useState(true); // Initialize isSearchVisible state
//   const [searchTerm, setSearchTerm] = useState('');

//   const external_apps = [
//     {
//       name: 'Annature',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1611236137587_1626158489-annature.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'ChargeOver',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717494873-ChargeOver.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: '123Formbuilder',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1591774916-123FormBuilder.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: '360 Dialog (Cloud)',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: '360 Dialog (On-Premise)',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'Adyen',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1603100395158_1605873194-adyen.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'ActiveTrail',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1597145299-ActiveTrail.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'AnnounceKit',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572942-AnnounceKit.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'Campaign Monitor',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1598084818603_1599215654-Campaign-Monitor.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: '8x8',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572958-8x8.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'Alchemer',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717567705-Alchemer.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'BigCommerce',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592046278-bigcommerce-64.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'Albacross',
//       icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717502343-Albacross.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'Brilliant Directory',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1667028056-brilliant-directories.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
//     },
//     {
//       name: 'Heights Platform',
//       icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
//       helpText: (
//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#637381',
//           }}
//         >
//           All connections are fully encrypted and secure. Pabbly is{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             SOC2 Type 2
//           </Link>{' '}
//           and{' '}
//           <Link
//             href="https://www.pabbly.com/security/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             ISO 27001:2022
//           </Link>{' '}
//           Certified.{' '}
//           <Link
//             href="https://www.pabbly.com/privacy-policy/"
//             target="_blank"
//             sx={{ color: 'primary.main' }}
//           >
//             View privacy policy
//           </Link>
//           .
//         </Typography>
//       ),
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
//     setSelectedApp(app);
//     setIsSearchVisible(false); // Hide app selection section
//     setSearchTerm('');
//   };

//   const handleDrawerClose = () => {
//     setSelectedApp(null); // Reset selectedApp when drawer closes
//     setIsSearchVisible(true); // Show search section again
//     onClose();
//   };

//   const basicTabs = useTabs('one');

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const toggleAppDropdown = () => {
//     if (!isSearchVisible) {
//       // Reset if "Search App" clicked again
//       setSelectedApp(null);
//       setSearchTerm('');
//     }
//     setIsSearchVisible(!isSearchVisible);
//   };

//   const renderAppGrid = (apps) => (
//     <FixedSizeGrid>
//       {apps
//         .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
//         .map((app, index) => (
//           <AppCard key={index} onClick={() => handleAppSelect(app)}>
//             <CardContent
//               sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
//             >
//               <Avatar variant="rounded" src={app.icon} sx={{ width: 40, height: 40 }} />
//               <Typography
//                 textAlign="center"
//                 variant="caption"
//                 component="div"
//                 sx={{
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                   display: '-webkit-box',
//                   WebkitLineClamp: 2,
//                   WebkitBoxOrient: 'vertical',
//                   lineHeight: '1.2em',
//                   height: '2.4em',
//                 }}
//               >
//                 {app.name}
//               </Typography>
//             </CardContent>
//           </AppCard>
//         ))}
//     </FixedSizeGrid>
//   );

//   const TABS = [
//     {
//       value: 'one',
//       icon: <Iconify icon="gridicons:external" width={20} />,
//       label: 'External Apps',
//       form: renderAppGrid(external_apps),
//     },
//     {
//       value: 'two',
//       icon: <Iconify icon="mdi:star-four-points-circle-outline" width={20} />,
//       label: 'Core Apps',
//       form: renderAppGrid(core_apps),
//     },
//     {
//       value: 'three',
//       icon: <Iconify icon="material-symbols-light:private-connectivity-outline" width={30} />,
//       label: 'Private Apps',
//       form: renderAppGrid(private_apps),
//     },
//   ];

//   return (
//     <>
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={handleDrawerClose}
//         PaperProps={{
//           sx: {
//             p: 0,
//             display: 'flex',
//             flexDirection: 'column',
//             width: { xs: '100%', md: '966.44px' },
//           },
//         }}
//         ModalProps={{
//           BackdropComponent: CustomBackdrop,
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             py: 2,
//             pr: 1,
//             pl: 2.5,
//             display: 'flex',
//             flexDirection: 'column',
//             borderBottom: '1px dashed #919eab33',
//             p: 3,
//             position: 'sticky',
//             top: 0,
//             zIndex: 1,
//           }}
//         >
//           <Box sx={{ display: 'flex', width: '100%' }}>
//             <Box display="flex" gap="16px" width="100%">
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'flex-start', // Aligns Avatar to the top
//                   justifyContent: 'center',
//                 }}
//               >
//                 <Avatar
//                   variant="rounded"
//                   src={selectedApp?.icon || '/assets/icons/app logo/pabbly_icon.png'}
//                   sx={{
//                     p: 1,
//                     width: 56,
//                     height: 56,
//                     bgcolor: 'background.neutral',
//                     border: '1px solid #D4E2FF',
//                   }}
//                 />
//               </Box>

//               <Box display="flex" flexDirection="column" gap="4px" width="100%">
//                 <Box sx={{ display: 'auto', width: '100%', mr: 3 }}>
//                   <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
//                     <Typography variant="h6" sx={{ fontWeight: '600' }}>
//                       {selectedApp?.name || 'Add New Connection'}
//                     </Typography>
//                   </Box>

//                   <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
//                     {selectedApp?.helpText ? (
//                       selectedApp.helpText // Dynamically display helpText from the selected app
//                     ) : (
//                       <Typography
//                         sx={{
//                           fontSize: '14px',
//                           color: '#637381',
//                         }}
//                       >
//                         You can authorize new connection from here.{' '}
//                         <Link
//                           href="https://www.pabbly.com/privacy-policy/#data-policy"
//                           target="_blank"
//                           sx={{
//                             fontSize: '14px',
//                             color: 'primary.main',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           Learn more
//                         </Link>
//                       </Typography>
//                     )}
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//             <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//               <IconButton onClick={handleDrawerClose} sx={{ p: 1 }}>
//                 <Iconify icon="mingcute:close-line" />
//               </IconButton>
//             </Box>
//           </Box>
//         </Box>

//         {/* App Selection Section */}
//         <Box sx={{ flexGrow: 1, p: 3 }}>
//           <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
//             Choose App
//           </Typography>

//           {/* App selection with Search Field visible by default */}
//           <Box
//             onClick={toggleAppDropdown}
//             sx={{
//               border: '1px solid #e0e0e0',
//               borderRadius: '8px',
//               padding: '10px',
//               display: 'flex',
//               alignItems: 'center',
//               '&:hover': {
//                 border: '1px solid #1C252E',
//               },
//               cursor: 'pointer',
//             }}
//           >
//             {selectedApp && !isSearchVisible ? (
//               <Box display="flex" alignItems="center">
//                 <Avatar
//                   variant="rounded"
//                   src={selectedApp.icon}
//                   sx={{ mr: 1, width: 24, height: 24 }}
//                 />
//                 <Typography>{selectedApp.name}</Typography>
//               </Box>
//             ) : (
//               <TextField
//                 fullWidth
//                 variant="standard"
//                 placeholder="Search apps..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 InputProps={{
//                   disableUnderline: true,
//                   startAdornment: (
//                     <Iconify icon="mingcute:search-line" sx={{ color: 'text.secondary', mr: 1 }} />
//                   ),
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//               />
//             )}
//           </Box>

//           {/* Tabs and search functionality */}
//           {isSearchVisible && (
//             <Box mt={2}>
//               <Tabs
//                 value={basicTabs.value}
//                 onChange={basicTabs.onChange}
//                 sx={{
//                   mt: '0px',
//                   boxShadow: (theme1) =>
//                     `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
//                 }}
//               >
//                 {TABS.map((tab) => (
//                   <Tab key={tab.value} icon={tab.icon} label={tab.label} value={tab.value} />
//                 ))}
//               </Tabs>
//               {TABS.map((tab) =>
//                 tab.value === basicTabs.value ? (
//                   <Fragment key={tab.value}>{tab.form}</Fragment>
//                 ) : null
//               )}
//             </Box>
//           )}

//           {/* Connection name and Connect button */}
//           {!isSearchVisible && selectedApp && (
//             <Box mt={2}>
//               <Box width="100%" sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
//                 <Box>
//                   <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
//                     New Connection Name
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     value={selectedApp.name}
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   />
//                 </Box>

//                 <Box>
//                   <Typography
//                     sx={{
//                       ml: '13px',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       width: '100%',
//                     }}
//                   >
//                     Id
//                   </Typography>
//                   <TextField
//                     sx={{ mt: '8px' }}
//                     fullWidth
//                     type="text"
//                     margin="dense"
//                     variant="outlined"
//                     placeholder="Enter Id here"
//                     helperText={
//                       <>
//                         Enter your Id. You can create Id from{' '}
//                         <Link
//                           href="https://mailchimp.com/developer/marketing/guides/quick-start/"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           here
//                         </Link>
//                         .
//                       </>
//                     }
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <Tooltip
//                             title="Enter your ID"
//                             arrow
//                             placement="top"
//                             sx={{
//                               fontSize: '16px',
//                             }}
//                           >
//                             <Iconify
//                               icon="material-symbols:info-outline"
//                               style={{ width: 20, height: 20 }}
//                             />
//                           </Tooltip>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Box>

//                 <Box>
//                   <Typography
//                     sx={{
//                       ml: '13px',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       width: '100%',
//                     }}
//                   >
//                     Key
//                   </Typography>
//                   <TextField
//                     sx={{ mt: '8px' }}
//                     fullWidth
//                     type="text"
//                     margin="dense"
//                     variant="outlined"
//                     placeholder="Enter Key here"
//                     helperText={
//                       <>
//                         Enter your Key. You can create Key from{' '}
//                         <Link
//                           href="https://mailchimp.com/developer/marketing/guides/quick-start/"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           here
//                         </Link>
//                         .
//                       </>
//                     }
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <Tooltip
//                             title="Enter your Key"
//                             arrow
//                             placement="top"
//                             sx={{
//                               fontSize: '16px',
//                             }}
//                           >
//                             <Iconify
//                               icon="material-symbols:info-outline"
//                               style={{ width: 20, height: 20 }}
//                             />
//                           </Tooltip>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Box>
//               </Box>

//               <Box mt={3}>
//                 <Button
//                   size="medium"
//                   variant="contained"
//                   color="primary"
//                   startIcon={<Iconify icon="fa6-solid:plug" />}
//                 >
//                   Connect
//                 </Button>
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </Drawer>
//       {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
//     </>
//   );
// };

// export { NewAppDrawer };

// import React, { Fragment, useState } from 'react';

// import {
//   Box,
//   Link,
//   Drawer,
//   Avatar,
//   Button,
//   Typography,
//   IconButton,
//   Backdrop as MuiBackdrop,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// import ChooseApp from './ChooseApp';

// const CustomBackdrop = (props) => (
//   <MuiBackdrop {...props} sx={{ backgroundColor: 'transparent' }} />
// );

// const NewAppDrawer = ({ open, onClose }) => {
//   const formValidationDialog = useBoolean();

//   const formvalidationClick = () => formValidationDialog.onTrue();
//   const [selectedApp, setSelectedApp] = useState(null); // State to store selected app details

//   const handleSelectApp = (app) => {
//     setSelectedApp(app); // This will hold the app's name, icon, and helpText
//   };

//   const handleDrawerClose = () => {
//     setSelectedApp(null); // Reset selectedApp when drawer closes
//     onClose();
//   };

//   return (
//     <>
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={handleDrawerClose}
//         PaperProps={{
//           sx: {
//             p: 0,
//             display: 'flex',
//             flexDirection: 'column',
//             width: {
//               xs: '100%',
//               md: '966.44px',
//             },
//           },
//         }}
//         ModalProps={{
//           BackdropComponent: CustomBackdrop,
//         }}
//       >
//         <Box
//           display="flex"
//           sx={{
//             py: 2,
//             pr: 1,
//             pl: 2.5,
//             flexGrow: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             borderBottom: '1px dashed #919eab33',
//             borderBottomRightRadius: '0px',
//             borderBottomLeftRadius: '0px',
//             p: 3,
//             position: 'sticky',
//             top: 0,
//             zIndex: 1,
//           }}
//         >
//           <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
//             <Box sx={{ width: '100%' }}>
//               <Box display="flex" gap="16px" width="100%">
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Avatar
//                     variant="rounded"
//                     src={selectedApp?.icon || '/assets/icons/app logo/pabbly_icon.png'}
//                     sx={{
//                       p: 1,
//                       width: 56,
//                       height: 56,
//                       bgcolor: 'background.neutral',
//                       border: '1px solid #D4E2FF',
//                     }}
//                   />
//                 </Box>

//                 <Box display="flex" flexDirection="column" gap="4px" width="100%">
//                   <Box sx={{ display: 'auto', width: '100%', mr: 3 }}>
//                     <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
//                       <Typography variant="h6" sx={{ fontWeight: '600' }}>
//                         {selectedApp?.name || 'Add New Connection'}
//                       </Typography>
//                     </Box>

//                     <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
//                       {selectedApp?.helpText ? (
//                         selectedApp.helpText // Dynamically display helpText from the selected app
//                       ) : (
//                         <Typography
//                           sx={{
//                             fontSize: '14px',
//                             color: '#637381',
//                           }}
//                         >
//                           You can authorize new connection from here.{' '}
//                           <Link
//                             href="https://www.pabbly.com/privacy-policy/#data-policy"
//                             target="_blank"
//                             sx={{
//                               fontSize: '14px',
//                               color: 'primary.main',
//                               cursor: 'pointer',
//                             }}
//                           >
//                             Learn more
//                           </Link>
//                         </Typography>
//                       )}
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//             <Box>
//               <IconButton onClick={handleDrawerClose} sx={{ p: 1 }}>
//                 <Iconify icon="mingcute:close-line" />
//               </IconButton>
//             </Box>
//           </Box>
//         </Box>

//         <Box
//           justifyContent="space-between"
//           sx={{
//             display: 'block',
//             height: '100%',
//             p: '0px 24px 24px 24px',
//             overflow: 'auto',
//             maxHeight: 'auto',
//           }}
//         >
//           <ChooseApp onSelectApp={handleSelectApp} />
//         </Box>

//         <Box
//           display="flex"
//           sx={{
//             gap: 2,
//             py: 2,
//             pr: 1,
//             pl: 2.5,
//             flexGrow: 1,
//             display: 'flex',
//             borderTop: '1px dashed #919eab33',
//             borderBottomRightRadius: '0px',
//             borderBottomLeftRadius: '0px',
//             p: 3,
//             position: 'sticky',
//             top: 0,
//             zIndex: 1,
//           }}
//         >
//           <Button onClick={formvalidationClick} variant="outlined" color="primary">
//             Cancel
//           </Button>
//           <Button variant="contained" color="primary">
//             Save
//           </Button>
//         </Box>
//       </Drawer>
//       {open && <CustomBackdrop open={open} />}
//     </>
//   );
// };

// export { NewAppDrawer };

import React, { useState } from 'react';

import {
  Box,
  Link,
  Drawer,
  Avatar,
  Typography,
  IconButton,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import ChooseApp from './ChooseApp';

const CustomBackdrop = (props) => (
  <MuiBackdrop {...props} sx={{ backgroundColor: 'transparent' }} />
);

const NewAppDrawer = ({ open, onClose }) => {
  const formValidationDialog = useBoolean();
  const formvalidationClick = () => formValidationDialog.onTrue();
  const [selectedApp, setSelectedApp] = useState(null);

  const handleSelectApp = (app) => {
    setSelectedApp(app);
  };

  const handleDrawerClose = () => {
    setSelectedApp(null);
    onClose();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: '966.44px',
            },
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop,
        }}
      >
        <Box
          display="flex"
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px dashed #919eab33',
            p: 3,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Box display="flex" gap="16px" width="100%">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={selectedApp?.icon || '/assets/icons/app logo/pabbly_icon.png'}
                    sx={{
                      p: 1,
                      width: 56,
                      height: 56,
                      bgcolor: 'background.neutral',
                      border: '1px solid #D4E2FF',
                    }}
                  />
                </Box>

                <Box display="flex" flexDirection="column" gap="4px" width="100%">
                  <Box sx={{ display: 'auto', width: '100%', mr: 3 }}>
                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      <Typography variant="h6" sx={{ fontWeight: '600' }}>
                        {selectedApp?.name || 'Add New Connection'}
                      </Typography>
                    </Box>

                    <Box sx={{ gap: 1, alignItems: 'center', display: 'flex', width: 'auto' }}>
                      {selectedApp?.helpText ? (
                        selectedApp.helpText
                      ) : (
                        <Typography
                          sx={{
                            fontSize: '14px',
                            color: '#637381',
                          }}
                        >
                          You can authorize new connection from here.{' '}
                          <Link
                            href="https://www.pabbly.com/privacy-policy/#data-policy"
                            target="_blank"
                            sx={{
                              fontSize: '14px',
                              color: 'primary.main',
                              cursor: 'pointer',
                            }}
                          >
                            Learn more
                          </Link>
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={handleDrawerClose} sx={{ p: 1 }}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          justifyContent="space-between"
          sx={{
            display: 'block',
            height: '100%',
            p: 3,
            overflow: 'auto',
            maxHeight: 'auto',
          }}
        >
          <ChooseApp onSelectApp={handleSelectApp} onClose={handleDrawerClose} />
        </Box>

        {/* <Box
          display="flex"
          sx={{
            gap: 2,
            py: 2,
            pr: 1,
            pl: 2.5,
            flexGrow: 1,
            display: 'flex',
            borderTop: '1px dashed #919eab33',
            p: 3,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Button onClick={formvalidationClick} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </Box> */}
      </Drawer>
      {open && <CustomBackdrop open={open} />}
    </>
  );
};

export { NewAppDrawer };
