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
// import { CreateFolderDialog } from 'src/sections/dashbaord/hooks/create_folder-dailog';
// import { CreateWorkflowDialog } from 'src/sections/dashbaord/hooks/create_workflow-dailog';
// import DashboardTable2 from 'src/sections/dashbaord/components/table_dashbaord 2/dashbaord-table';

// export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const workflowDialog = useBoolean();
//   const folderDialog = useBoolean();
//   const [activeTable, setActiveTable] = useState('dashboard');

//   const handleTrashClick = () => {
//     setActiveTable('trash');
//   };

//   const handleHomeClick = () => {
//     setActiveTable('home');
//   };

//   return (
//     <DashboardContent maxWidth="xl">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: { xs: 'flex-start', sm: 'center' }, // Align items to the left on small screens
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
//               alignSelf: { xs: 'flex-start', sm: 'center' }, // Align left for small screens, center for larger screens
//               ml: { xs: 0, sm: 1 },
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
//         <FolderCard onTrashClick={handleTrashClick} onHomeClick={handleHomeClick} />

//         <Box
//           sx={{
//             width: { xs: '100%', md: 'calc(100% - 346px)' },
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 4,
//           }}
//         >
//           <BigCard />
//           {activeTable === 'trash' ? <TrashTable /> : <DashboardTable2 />}
//           {/* <DashboardTable /> */}
//         </Box>
//       </Box>

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
// import PageHeader from 'src/components/page-header/page-header';

// import BigCard from 'src/sections/dashbaord/components/bigcard/big-card';
// import FolderCard from 'src/sections/dashbaord/components/foldercard/foldercard';
// import TrashTable from 'src/sections/dashbaord/components/table_trash/trash-table';
// import { CreateFolderDialog } from 'src/sections/dashbaord/hooks/create_folder-dailog';
// import { CreateWorkflowDialog } from 'src/sections/dashbaord/hooks/create_workflow-dailog';
// import DashboardTable2 from 'src/sections/dashbaord/components/table_dashbaord 2/dashbaord-table';

// export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const workflowDialog = useBoolean();
//   const folderDialog = useBoolean();

//   const [activeTable, setActiveTable] = useState('dashboard');
//   const [selectedFolder, setSelectedFolder] = useState('Home'); // Track selected folder

//   const handleTrashClick = () => {
//     setActiveTable('trash');
//   };

//   const handleHomeClick = () => {
//     setActiveTable('home');
//     setSelectedFolder('Home'); // Reset to Home
//   };

//   const handleFolderClick = (folderLabel) => {
//     setSelectedFolder(folderLabel); // Update selected folder label
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
//               alignSelf: { xs: 'flex-start', sm: 'center' },
//               ml: { xs: 0, sm: 1 },
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
//         {/* Your StatsCards and other components */}
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
//         <FolderCard
//           onTrashClick={handleTrashClick}
//           onHomeClick={handleHomeClick}
//           onFolderClick={handleFolderClick} // Pass folder click handler
//         />

//         <Box
//           sx={{
//             width: { xs: '100%', md: 'calc(100% - 346px)' },
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 4,
//           }}
//         >
//           <BigCard />
//           {activeTable === 'trash' ? (
//             <TrashTable />
//           ) : (
//             <DashboardTable2 selectedFolder={selectedFolder} /> // Pass selected folder
//           )}
//         </Box>
//       </Box>

//       <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
//       <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
//     </DashboardContent>
//   );
// }

// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Ensure this is installed in your project
// import Box from '@mui/material/Box';
// import { useTheme } from '@mui/material/styles';
// import { Button, Tooltip, useMediaQuery } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { AuthContext } from 'src/auth/context/auth-context';

// import { DashboardContent } from 'src/layouts/dashboard';

// import { Iconify } from 'src/components/iconify';
// import StatsCards from 'src/components/stats-card/stats-card';
// import PageHeader from 'src/components/page-header/page-header';

// import BigCard from 'src/sections/dashbaord/components/bigcard/big-card';
// import FolderCard from 'src/sections/dashbaord/components/foldercard/foldercard';
// import TrashTable from 'src/sections/dashbaord/components/table_trash/trash-table';
// import { CreateFolderDialog } from 'src/sections/dashbaord/hooks/create_folder-dailog';
// import { CreateWorkflowDialog } from 'src/sections/dashbaord/hooks/create_workflow-dailog';
// import DashboardTable2 from 'src/sections/dashbaord/components/table_dashbaord 2/dashbaord-table';

// export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const workflowDialog = useBoolean();
//   const folderDialog = useBoolean();
//   const [activeTable, setActiveTable] = useState('dashboard'); // State to track which table is displayed
//   const navigate = useNavigate();

//   const { authenticated, loading } = useContext(AuthContext); // Use AuthContext to check authentication

//   // Check if the user is authenticated. If not, redirect to the login page.
//   useEffect(() => {
//     if (!loading && !authenticated) {
//       navigate('/login'); // Redirect to the login page if not authenticated
//     }
//   }, [authenticated, loading, navigate]);

//   // Handle trash click to toggle between trash table and dashboard table
//   const handleTrashClick = () => {
//     setActiveTable('trash');
//   };

//   // Handle home click to go back to dashboard table
//   const handleHomeClick = () => {
//     setActiveTable('dashboard');
//   };

//   // Show a loading state while authentication is being checked
//   if (loading) {
//     return <div>Loading...</div>; // Replace this with a loader/spinner if needed
//   }

//   // Render the dashboard if authenticated
//   return (
//     <DashboardContent maxWidth="xl">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: { xs: 'flex-start', sm: 'center' }, // Align items to the left on small screens
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
//               width: { xs: '100%', sm: 'flex' },
//               maxWidth: '180px',
//               alignSelf: { xs: 'flex-start', sm: 'center' }, // Align left for small screens, center for larger screens
//               ml: { xs: 0, sm: 1 },
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
//         <FolderCard onTrashClick={handleTrashClick} onHomeClick={handleHomeClick} />

//         <Box
//           sx={{
//             width: { xs: '100%', md: 'calc(100% - 346px)' },
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 4,
//           }}
//         >
//           <BigCard />
//           {activeTable === 'trash' ? <TrashTable /> : <DashboardTable2 />}
//         </Box>
//       </Box>

//       <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
//       <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
//     </DashboardContent>
//   );
// }

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import FolderCard from 'src/sections/dashbaord/components/foldercard/foldercard';
import TrashTable from 'src/sections/dashbaord/components/table_trash/trash-table';
import { CreateFolderDialog } from 'src/sections/dashbaord/hooks/create_folder-dailog';
import { CreateWorkflowDialog } from 'src/sections/dashbaord/hooks/create_workflow-dailog';
import DashboardBigCard from 'src/sections/dashbaord/components/bigcard/dashboard-big-card';
import DashboardTable2 from 'src/sections/dashbaord/components/table_dashbaord 2/dashbaord-table';

import { AuthContext } from 'src/auth/context/auth-context';

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const workflowDialog = useBoolean();
  const folderDialog = useBoolean();
  const [activeTable, setActiveTable] = useState('dashboard');
  const [selectedFolder, setSelectedFolder] = useState('Home'); // Add state to track selected folder
  const navigate = useNavigate();

  const { authenticated, loading } = useContext(AuthContext); // Use AuthContext to check authentication

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/login');
    }
  }, [authenticated, loading, navigate]);

  // Handle trash click to toggle between trash table and dashboard table
  const handleTrashClick = () => {
    setActiveTable('trash');
  };

  // Handle home click to go back to dashboard table
  const handleHomeClick = () => {
    setActiveTable('dashboard');
    setSelectedFolder('Home'); // Reset to 'Home' when navigating back to dashboard
  };

  // Handle folder click to update selected folder name
  const handleFolderClick = (folderLabel) => {
    setSelectedFolder(folderLabel); // Set selected folder when clicked
  };

  if (loading) {
    return <div>Loading...</div>; // Replace this with a loader/spinner if needed
  }

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
              width: { xs: '100%', sm: 'flex' },
              maxWidth: '180px',
              alignSelf: { xs: 'flex-start', sm: 'center' },
              ml: { xs: 0, sm: 1 },
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
        {/* Pass the folder click handler to FolderCard */}
        <FolderCard
          onTrashClick={handleTrashClick}
          onHomeClick={handleHomeClick}
          onFolderClick={handleFolderClick}
        />

        <Box
          sx={{
            width: { xs: '100%', md: 'calc(100% - 346px)' },
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <DashboardBigCard />
          {activeTable === 'trash' ? (
            <TrashTable />
          ) : (
            <DashboardTable2 selectedFolder={selectedFolder} /> // Pass selected folder to DashboardTable2
          )}
        </Box>
      </Box>

      <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
      <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
    </DashboardContent>
  );
}
