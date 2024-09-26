// // // import 'react-modal-video/css/modal-video.min.css';

// // // External libraries
// // import Box from '@mui/material/Box';
// // import { useTheme } from '@mui/material/styles';
// // import {
// //   Card,
// //   Button,
// //   Tooltip,
// //   MenuItem,
// //   MenuList,
// //   Typography,
// //   CardContent,
// //   useMediaQuery,
// // } from '@mui/material';

// // // Hooks
// // import { useBoolean } from 'src/hooks/use-boolean';

// // // Layouts
// // import { varAlpha } from 'src/theme/styles';
// // import { DashboardContent } from 'src/layouts/dashboard';

// // // Components
// // import { Iconify } from 'src/components/iconify';
// // import StatsCards from 'src/components/stats-card/stats-card';
// // import PageHeader from 'src/components/page-header/page-header';
// // import { CustomStyling } from 'src/components/tree-view/custom-styling';

// // // Sections

// // import BigCard from 'src/sections/dashbaord/components/bigcard/big-card';
// // // import { CreateFolder } from 'src/sections/dashbaord/hooks/create_folder';
// // import DashboardTable from 'src/sections/dashbaord/components/table_dashbaord/table';
// // // import ContactsTable from 'src/sections/dashbaord/components/table_dashbaord 2/table';
// // import { CreateFolderDialog } from 'src/sections/dashbaord/hooks/create_folder-dailog';
// // import { CreateWorkflowDialog } from 'src/sections/dashbaord/hooks/create_workflow-dailog';

// // // ----------------------------------------------------------------------

// // export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
// //   const workflowDialog = useBoolean();
// //   const folderDialog = useBoolean();

// //   return (
// //     <DashboardContent maxWidth="xl">
// //       <Box
// //         sx={{
// //           display: 'flex',
// //           flexDirection: { xs: 'column', sm: 'row' },
// //           alignItems: { xs: 'flex-start', sm: 'center' },
// //           justifyContent: 'space-between',
// //           // gap: { xs: 2, sm: 0.5 },

// //           mb: 0,
// //         }}
// //       >
// //         <PageHeader
// //           title="Dashboard"
// //           Subheading="Create & manage all of your automation workflows in one place with Pabbly Connect Dashboard."
// //           link_added="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
// //         />
// //         <Tooltip title="Start building a new automation workflow." arrow placement="top">
// //           <Button
// //             onClick={workflowDialog.onTrue}
// //             sx={{
// //               mt: { xs: 2, sm: 0 }, // Margin-top responsive for mobile and larger screens
// //               width: { xs: '100%', sm: 'flax' }, // Full width on mobile, auto on larger screens
// //               maxWidth: '180px', // Set a maximum width if needed
// //             }}
// //             startIcon={
// //               <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
// //             }
// //             size="large"
// //             variant="contained"
// //             color="primary"
// //           >
// //             Create Workflow
// //           </Button>
// //         </Tooltip>

// //         <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
// //       </Box>

// //       {/* Cards Section */}
// //       <Box
// //         sx={{
// //           mt: 4,
// //           gap: 3,
// //           display: 'grid',
// //           gridTemplateColumns: {
// //             xs: 'repeat(1, 1fr)',
// //             sm: 'repeat(2, 1fr)',
// //             md: 'repeat(4, 1fr)',
// //           },
// //         }}
// //       >
// //         <Tooltip title="Number of tasks allotted to your account." arrow placement="top">
// //           <div>
// //             <StatsCards
// //               cardtitle="Tasks Allotted"
// //               cardstats="10,000"
// //               icon_name="2card.png"
// //               icon_color="#FFA92E"
// //               bg_gradient={theme.vars.palette[color].main}
// //             />
// //           </div>
// //         </Tooltip>
// //         <Tooltip title="Number of tasks consumed till now in your account." arrow placement="top">
// //           <div>
// //             <StatsCards
// //               cardtitle="Tasks Consumed"
// //               cardstats="2,000"
// //               icon_name="task_consumed.png"
// //               icon_color="#1D88FA"
// //               bg_gradient="#1D88FA"
// //             />
// //           </div>
// //         </Tooltip>
// //         <Tooltip title="Number of tasks remaining in your account." arrow placement="top">
// //           <div>
// //             <StatsCards
// //               cardtitle="Tasks Remaining"
// //               cardstats="8,000"
// //               icon_name="task_remaining.png"
// //               icon_color="#22C55E"
// //               bg_gradient="#22C55E"
// //             />
// //           </div>
// //         </Tooltip>
// //         <Tooltip title="Number of free tasks consumed in the last 30 days." arrow placement="top">
// //           <div>
// //             <StatsCards
// //               cardtitle="Free Tasks Consumed"
// //               cardstats="1,000"
// //               icon_name="task_free.png"
// //               icon_color="#10CBF3"
// //               bg_gradient="#10CBF3"
// //             />
// //           </div>
// //         </Tooltip>
// //       </Box>

// //       {/* Table Section */}
// //       <Box
// //         sx={{
// //           mt: 4,
// //           gap: 3,
// //           display: 'flex',
// //           flexDirection: { xs: 'column', md: 'row' },
// //           alignItems: 'stretch',
// //         }}
// //       >
// //         <Card
// //           sx={{
// //             boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
// //             height: '100%',
// //             backgroundColor: 'common.white',
// //             width: { xs: '100%', md: '354.2px' },
// //             borderRadius: '16px',
// //             p: 0,
// //           }}
// //         >
// //           <CardContent>
// //             <Box
// //               sx={{
// //                 display: 'flex',
// //                 justifyContent: 'space-between',
// //                 alignItems: 'center',
// //                 mb: 2.6,
// //               }}
// //             >
// //               <Box
// //                 sx={{
// //                   minHeight: '100%',
// //                   width: '100%',
// //                   borderBottom: '1px dashed',
// //                   borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
// //                 }}
// //               >
// //                 <Box
// //                   sx={{
// //                     display: 'flex',
// //                     justifyContent: 'space-between',
// //                     alignItems: 'center',
// //                     mb: 2.6,
// //                   }}
// //                 >
// //                   <Typography variant="h6" component="div">
// //                     Folders
// //                   </Typography>

// //                   <Tooltip title="Create a new folder." arrow placement="top">
// //                     <Button
// //                       sx={{
// //                         mb: '0px',
// //                         p: 1,
// //                         display: 'flex',
// //                         justifyContent: 'center', // Center-align the icon horizontally
// //                         alignItems: 'center', // Center-align the icon vertically
// //                         minWidth: 0, // Remove the default min-width
// //                       }}
// //                       onClick={folderDialog.onTrue}
// //                       maxWidth
// //                       color="inherit"
// //                       variant="contained"
// //                     >
// //                       <Iconify icon="fa6-solid:plus" />
// //                     </Button>
// //                   </Tooltip>
// //                   <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
// //                 </Box>
// //               </Box>
// //             </Box>
// //             <Box
// //               sx={{
// //                 display: 'flex',
// //                 justifyContent: 'space-between',
// //                 alignItems: 'center',
// //                 mb: 2.6,
// //               }}
// //             >
// //               <Box sx={{ minHeight: '100%', width: '100%' }}>
// //                 <CustomStyling />
// //               </Box>
// //             </Box>
// //             <Box
// //               sx={{
// //                 display: 'flex',
// //                 justifyContent: 'space-between',
// //                 alignItems: 'center',
// //                 mb: 0,
// //               }}
// //             >
// //               <Box
// //                 sx={{
// //                   minHeight: '100%',
// //                   width: '100%',
// //                   pt: 1,
// //                   borderTop: '1px dashed',
// //                   borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
// //                 }}
// //               >
// //                 <MenuList>
// //                   <MenuItem
// //                     onClick={() => {}}
// //                     sx={{
// //                       color: '#1C252E',
// //                       paddingRight: 1.5,
// //                       paddingLeft: 2,
// //                       justifyContent: 'space-between',
// //                     }}
// //                   >
// //                     <Typography sx={{ fontSize: '0.875rem', fontWeight: '400' }}>
// //                       Trash (10)
// //                     </Typography>
// //                     <span style={{ color: '#6c757d' }}>
// //                       <Iconify icon="solar:trash-bin-trash-bold" />
// //                     </span>
// //                   </MenuItem>
// //                 </MenuList>
// //               </Box>
// //             </Box>
// //           </CardContent>
// //         </Card>

// //         {/* BigCard Component */}
// //         <Box
// //           sx={{
// //             width: { xs: '100%', md: 'calc(100% - 346px)' },
// //             display: 'flex',
// //             flexDirection: 'column',
// //             gap: 4,
// //           }}
// //         >
// //           <BigCard />

// //           <DashboardTable />

// //           {/* <ContactsTable /> */}
// //         </Box>
// //       </Box>
// //     </DashboardContent>
// //   );
// // }
// import React from 'react';

// import Box from '@mui/material/Box';
// import { useTheme } from '@mui/material/styles';
// import { Button, Tooltip, useMediaQuery } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { DashboardContent } from 'src/layouts/dashboard';

// import { Iconify } from 'src/components/iconify';
// import StatsCards from 'src/components/stats-card/stats-card';
// import PageHeader from 'src/components/page-header/page-header';

// import BigCard from 'src/sections/dashbaord/components/bigcard/big-card';
// import FolderCard from 'src/sections/dashbaord/components/foldercard/foldercard';
// import DashboardTable from 'src/sections/dashbaord/components/table_dashbaord/table';
// import { CreateFolderDialog } from 'src/sections/dashbaord/hooks/create_folder-dailog';
// import { CreateWorkflowDialog } from 'src/sections/dashbaord/hooks/create_workflow-dailog';
// import TrashTable from 'src/sections/dashbaord/components/table_trash/trash-table';

// export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const workflowDialog = useBoolean();
//   const folderDialog = useBoolean();

//   return (
//     <DashboardContent maxWidth="xl">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           justifyContent: 'space-between',
//           mb: 0,
//         }}
//       >
//         <PageHeader
//           title="Dashboard"
//           Subheading="Create & manage all of your automation workflows in one place with Pabbly Connect Dashboard."
//           link_added="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
//         />
//         <Tooltip title="Start building a new automation workflow." arrow placement="top">
//           <Button
//             onClick={workflowDialog.onTrue}
//             sx={{
//               mt: { xs: 2, sm: 0 },
//               width: { xs: '100%', sm: 'flax' },
//               maxWidth: '180px',
//             }}
//             startIcon={
//               <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
//             }
//             size="large"
//             variant="contained"
//             color="primary"
//           >
//             Create Workflow
//           </Button>
//         </Tooltip>
//       </Box>

//       <Box
//         sx={{
//           mt: 4,
//           gap: 3,
//           display: 'grid',
//           gridTemplateColumns: {
//             xs: 'repeat(1, 1fr)',
//             sm: 'repeat(2, 1fr)',
//             md: 'repeat(4, 1fr)',
//           },
//         }}
//       >
//         <Tooltip title="Number of tasks allotted to your account." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Tasks Allotted"
//               cardstats="10,000"
//               icon_name="2card.png"
//               icon_color="#FFA92E"
//               bg_gradient={theme.vars.palette[color].main}
//             />
//           </div>
//         </Tooltip>
//         <Tooltip title="Number of tasks consumed till now in your account." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Tasks Consumed"
//               cardstats="2,000"
//               icon_name="task_consumed.png"
//               icon_color="#1D88FA"
//               bg_gradient="#1D88FA"
//             />
//           </div>
//         </Tooltip>
//         <Tooltip title="Number of tasks remaining in your account." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Tasks Remaining"
//               cardstats="8,000"
//               icon_name="task_remaining.png"
//               icon_color="#22C55E"
//               bg_gradient="#22C55E"
//             />
//           </div>
//         </Tooltip>
//         <Tooltip title="Number of free tasks consumed in the last 30 days." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Free Tasks Consumed"
//               cardstats="1,000"
//               icon_name="task_free.png"
//               icon_color="#10CBF3"
//               bg_gradient="#10CBF3"
//             />
//           </div>
//         </Tooltip>
//       </Box>
//       <Box
//         sx={{
//           mt: 4,
//           gap: 3,
//           display: 'flex',
//           flexDirection: { xs: 'column', md: 'row' },
//           alignItems: 'stretch',
//         }}
//       >
//         <FolderCard />

//         <Box
//           sx={{
//             width: { xs: '100%', md: 'calc(100% - 346px)' },
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 4,
//           }}
//         >
//           <BigCard />
//           <DashboardTable />
//           <TrashTable />
//         </Box>
//       </Box>

//       {/* Dialogs */}
//       <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
//       <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
//     </DashboardContent>
//   );
// }

// import React, { useState } from 'react';

// import Box from '@mui/material/Box';
// import { useTheme } from '@mui/material/styles';
// import { Button, Tooltip, useMediaQuery } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { DashboardContent } from 'src/layouts/dashboard';

// import { Iconify } from 'src/components/iconify';
// import StatsCards from 'src/components/stats-card/stats-card';
// import PageHeader from 'src/components/page-header/page-header';

// import BigCard from 'src/sections/dashbaord/components/bigcard/big-card';
// import FolderCard from 'src/sections/dashbaord/components/foldercard/foldercard';
// import TrashTable from 'src/sections/dashbaord/components/table_trash/trash-table';
// import DashboardTable from 'src/sections/dashbaord/components/table_dashbaord/table';
// import { CreateFolderDialog } from 'src/sections/dashbaord/hooks/create_folder-dailog';
// import { CreateWorkflowDialog } from 'src/sections/dashbaord/hooks/create_workflow-dailog';

// export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const workflowDialog = useBoolean();
//   const folderDialog = useBoolean();
//   const [showTrash, setShowTrash] = useState(false);

//   const handleTrashClick = () => {
//     setShowTrash(true);
//   };

//   return (
//     <DashboardContent maxWidth="xl">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           justifyContent: 'space-between',
//           mb: 0,
//         }}
//       >
//         <PageHeader
//           title="Dashboard"
//           Subheading="Create & manage all of your automation workflows in one place with Pabbly Connect Dashboard."
//           link_added="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
//         />
//         <Tooltip title="Start building a new automation workflow." arrow placement="top">
//           <Button
//             onClick={workflowDialog.onTrue}
//             sx={{
//               mt: { xs: 2, sm: 0 },
//               width: { xs: '100%', sm: 'flax' },
//               maxWidth: '180px',
//             }}
//             startIcon={
//               <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
//             }
//             size="large"
//             variant="contained"
//             color="primary"
//           >
//             Create Workflow
//           </Button>
//         </Tooltip>
//       </Box>

//       <Box
//         sx={{
//           mt: 4,
//           gap: 3,
//           display: 'grid',
//           gridTemplateColumns: {
//             xs: 'repeat(1, 1fr)',
//             sm: 'repeat(2, 1fr)',
//             md: 'repeat(4, 1fr)',
//           },
//         }}
//       >
//         <Tooltip title="Number of tasks allotted to your account." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Tasks Allotted"
//               cardstats="10,000"
//               icon_name="2card.png"
//               icon_color="#FFA92E"
//               bg_gradient={theme.vars.palette[color].main}
//             />
//           </div>
//         </Tooltip>
//         <Tooltip title="Number of tasks consumed till now in your account." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Tasks Consumed"
//               cardstats="2,000"
//               icon_name="task_consumed.png"
//               icon_color="#1D88FA"
//               bg_gradient="#1D88FA"
//             />
//           </div>
//         </Tooltip>
//         <Tooltip title="Number of tasks remaining in your account." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Tasks Remaining"
//               cardstats="8,000"
//               icon_name="task_remaining.png"
//               icon_color="#22C55E"
//               bg_gradient="#22C55E"
//             />
//           </div>
//         </Tooltip>
//         <Tooltip title="Number of free tasks consumed in the last 30 days." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Free Tasks Consumed"
//               cardstats="1,000"
//               icon_name="task_free.png"
//               icon_color="#10CBF3"
//               bg_gradient="#10CBF3"
//             />
//           </div>
//         </Tooltip>
//       </Box>
//       <Box
//         sx={{
//           mt: 4,
//           gap: 3,
//           display: 'flex',
//           flexDirection: { xs: 'column', md: 'row' },
//           alignItems: 'stretch',
//         }}
//       >
//         <FolderCard onTrashClick={handleTrashClick} />

//         <Box
//           sx={{
//             width: { xs: '100%', md: 'calc(100% - 346px)' },
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 4,
//           }}
//         >
//           <BigCard />
//           {showTrash ? <TrashTable /> : <DashboardTable />}
//         </Box>
//       </Box>

//       {/* Dialogs */}
//       <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
//       <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
//     </DashboardContent>
//   );
// }

// import React, { useState } from 'react';

// import Box from '@mui/material/Box';
// import { useTheme } from '@mui/material/styles';
// import { Button, Tooltip, useMediaQuery } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { DashboardContent } from 'src/layouts/dashboard';

// import { Iconify } from 'src/components/iconify';
// import StatsCards from 'src/components/stats-card/stats-card';
// import PageHeader from 'src/components/page-header/page-header';

// import BigCard from 'src/sections/dashbaord/components/bigcard/big-card';
// import FolderCard from 'src/sections/dashbaord/components/foldercard/foldercard';
// import TrashTable from 'src/sections/dashbaord/components/table_trash/trash-table';
// import DashboardTable from 'src/sections/dashbaord/components/table_dashbaord/table';
// import { CreateFolderDialog } from 'src/sections/dashbaord/hooks/create_folder-dailog';
// import { CreateWorkflowDialog } from 'src/sections/dashbaord/hooks/create_workflow-dailog';

// export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const workflowDialog = useBoolean();
//   const folderDialog = useBoolean();
//   const [showTrash, setShowTrash] = useState(false);

//   const handleTrashClick = () => {
//     setShowTrash(true);
//   };

//   const handleFolderClick = () => {
//     setShowTrash(false);
//   };

//   return (
//     <DashboardContent maxWidth="xl">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           justifyContent: 'space-between',
//           mb: 0,
//         }}
//       >
//         <PageHeader
//           title="Dashboard"
//           Subheading="Create & manage all of your automation workflows in one place with Pabbly Connect Dashboard."
//           link_added="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
//         />
//         <Tooltip title="Start building a new automation workflow." arrow placement="top">
//           <Button
//             onClick={workflowDialog.onTrue}
//             sx={{
//               mt: { xs: 2, sm: 0 },
//               width: { xs: '100%', sm: 'flax' },
//               maxWidth: '180px',
//             }}
//             startIcon={
//               <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
//             }
//             size="large"
//             variant="contained"
//             color="primary"
//           >
//             Create Workflow
//           </Button>
//         </Tooltip>
//       </Box>

//       <Box
//         sx={{
//           mt: 4,
//           gap: 3,
//           display: 'grid',
//           gridTemplateColumns: {
//             xs: 'repeat(1, 1fr)',
//             sm: 'repeat(2, 1fr)',
//             md: 'repeat(4, 1fr)',
//           },
//         }}
//       >
//         <Tooltip title="Number of tasks allotted to your account." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Tasks Allotted"
//               cardstats="10,000"
//               icon_name="2card.png"
//               icon_color="#FFA92E"
//               bg_gradient={theme.vars.palette[color].main}
//             />
//           </div>
//         </Tooltip>
//         <Tooltip title="Number of tasks consumed till now in your account." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Tasks Consumed"
//               cardstats="2,000"
//               icon_name="task_consumed.png"
//               icon_color="#1D88FA"
//               bg_gradient="#1D88FA"
//             />
//           </div>
//         </Tooltip>
//         <Tooltip title="Number of tasks remaining in your account." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Tasks Remaining"
//               cardstats="8,000"
//               icon_name="task_remaining.png"
//               icon_color="#22C55E"
//               bg_gradient="#22C55E"
//             />
//           </div>
//         </Tooltip>
//         <Tooltip title="Number of free tasks consumed in the last 30 days." arrow placement="top">
//           <div>
//             <StatsCards
//               cardtitle="Free Tasks Consumed"
//               cardstats="1,000"
//               icon_name="task_free.png"
//               icon_color="#10CBF3"
//               bg_gradient="#10CBF3"
//             />
//           </div>
//         </Tooltip>
//       </Box>
//       <Box
//         sx={{
//           mt: 4,
//           gap: 3,
//           display: 'flex',
//           flexDirection: { xs: 'column', md: 'row' },
//           alignItems: 'stretch',
//         }}
//       >
//         <FolderCard onTrashClick={handleTrashClick} onFolderClick={handleFolderClick} />

//         <Box
//           sx={{
//             width: { xs: '100%', md: 'calc(100% - 346px)' },
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 4,
//           }}
//         >
//           <BigCard />
//           {showTrash ? <TrashTable /> : <DashboardTable />}
//         </Box>
//       </Box>

//       {/* Dialogs */}
//       <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
//       <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
//     </DashboardContent>
//   );
// }

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import BigCard from 'src/sections/dashbaord/components/bigcard/big-card';
import FolderCard from 'src/sections/dashbaord/components/foldercard/foldercard';
import TrashTable from 'src/sections/dashbaord/components/table_trash/trash-table';
import DashboardTable from 'src/sections/dashbaord/components/table_dashbaord/table';
import { CreateFolderDialog } from 'src/sections/dashbaord/hooks/create_folder-dailog';
import { CreateWorkflowDialog } from 'src/sections/dashbaord/hooks/create_workflow-dailog';

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const workflowDialog = useBoolean();
  const folderDialog = useBoolean();
  const [activeTable, setActiveTable] = useState('dashboard');

  const handleTrashClick = () => {
    setActiveTable('trash');
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="Dashboard"
          Subheading="Create & manage all of your automation workflows in one place with Pabbly Connect Dashboard."
          link_added="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
        />
        <Tooltip title="Start building a new automation workflow." arrow placement="top">
          <Button
            onClick={workflowDialog.onTrue}
            sx={{
              mt: { xs: 2, sm: 0 },
              width: { xs: '100%', sm: 'flax' },
              maxWidth: '180px',
            }}
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
            size="large"
            variant="contained"
            color="primary"
          >
            Create Workflow
          </Button>
        </Tooltip>
      </Box>

      <Box
        sx={{
          mt: 4,
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        <Tooltip title="Number of tasks allotted to your account." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="Tasks Allotted"
              cardstats="10,000"
              icon_name="2card.png"
              icon_color="#FFA92E"
              bg_gradient={theme.vars.palette[color].main}
            />
          </div>
        </Tooltip>
        <Tooltip title="Number of tasks consumed till now in your account." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="Tasks Consumed"
              cardstats="2,000"
              icon_name="task_consumed.png"
              icon_color="#1D88FA"
              bg_gradient="#1D88FA"
            />
          </div>
        </Tooltip>
        <Tooltip title="Number of tasks remaining in your account." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="Tasks Remaining"
              cardstats="8,000"
              icon_name="task_remaining.png"
              icon_color="#22C55E"
              bg_gradient="#22C55E"
            />
          </div>
        </Tooltip>
        <Tooltip title="Number of free tasks consumed in the last 30 days." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="Free Tasks Consumed"
              cardstats="1,000"
              icon_name="task_free.png"
              icon_color="#10CBF3"
              bg_gradient="#10CBF3"
            />
          </div>
        </Tooltip>
      </Box>

      <Box
        sx={{
          mt: 4,
          gap: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        <FolderCard onTrashClick={handleTrashClick} />

        <Box
          sx={{
            width: { xs: '100%', md: 'calc(100% - 346px)' },
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <BigCard />
          {activeTable === 'trash' ? <TrashTable /> : <DashboardTable />}
        </Box>
      </Box>

      <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
      <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
    </DashboardContent>
  );
}
