import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import FolderCard from 'src/sections/dashbaord/components/foldercard/foldercard';
import { CreateWorkflowDialog } from 'src/sections/dashbaord/create_workflow-dailog';
import TrashTableNew from 'src/sections/dashbaord/components/table_trash/trash-table';
// import DashboardBigCard from 'src/sections/dashbaord/components/bigcard/dashboard-big-card';
import DashboardTable from 'src/sections/dashbaord/components/table_dashbaord/dashbaord-table';
import { CreateFolderDialog } from 'src/sections/dashbaord/components/foldercard/folder-options-components/create_folder-dailog';

import { AuthContext } from 'src/auth/context/auth-context';

const metadata = { title: `Dashboard | ${CONFIG.site.name}` };


export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const workflowDialog = useBoolean();
  const folderDialog = useBoolean();
  const [activeTable, setActiveTable] = useState('dashboard');
  const [selectedFolder, setSelectedFolder] = useState('Home'); // Add state to track selected folder
  // Custom handler to open dialog
  const [isWebhookDialogOpen, setWebhookDialogOpen] = useState(false);

  const handleConfigureWebhook = () => {
    setWebhookDialogOpen(true);
  };

  const navigate = useNavigate();

  // Stats Cards loading 
  const [loading, setLoading] = useState(true); // Initial loading state
  const { authenticated } = useContext(AuthContext);

  // Simulate API or Authentication Check
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 500);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/login');
    }
  }, [authenticated, loading, navigate]);

  // ------------------------------------

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


  // ------------

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" sx={{ mb: 16 }} >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            mb: 0,
          }}
        >
          {/* PageHeader */}
          <PageHeader
            title="Dashboard"
            Subheading="Create & manage all of your automation workflows in one place with Pabbly Connect Dashboard."
            link_added="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
            target="_blank"
            rel="noopener noreferrer"
          />

          {/* Create Workflow Button */}
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

        {/* StatsCards */}
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
                loading={loading} // Pass loading state
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
                loading={loading} // Pass loading state
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
                loading={loading} // Pass loading state
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
                loading={loading} // Pass loading state
              />
            </div>
          </Tooltip>
        </Box>

        {/* FolderCard */}
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
            <BigCard
              title="No workflows found!"
              secondarytitle="There may be no workflows in the folder or for the applied filter conditions. You can create a workflow by following the steps below-"
              steps={[
                'Step 1: Click on the "Create Workflow" button available in the top right section.',
                'Step 2: Now select apps you want to integrate into the trigger and action step.',
                <>Step 3: Once the workflow is completed, save and enable it. </>,
              ]}
              learnMoreLink="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
              videoThumbnail="pabbly_overview_card.png"
              videoId="https://www.youtube.com/embed/CoIfgN0tfhE"
              buttonText="Create Workflow"
              buttonTooltip="Start building a new automation workflow."
              onButtonClick={handleConfigureWebhook}
            />

            {/* Separate Webhook Dialog */}
            <CreateWorkflowDialog
              open={isWebhookDialogOpen}
              onClose={() => setWebhookDialogOpen(false)}
            />

            {/* <DashboardBigCard1 /> */}
            {activeTable === 'trash' ? (
              <TrashTableNew />
            ) : (
              <DashboardTable selectedFolder={selectedFolder} /> // Pass selected folder to DashboardTable2
            )}
          </Box>
        </Box>
        <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
        <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
      </DashboardContent>
    </>
  );
}


// ---------------------------------------


// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Skeleton, Tooltip } from '@mui/material';
// import { DashboardContent } from 'src/layouts/dashboard';
// import StatsCards from 'src/components/stats-card/stats-card';
// import { AuthContext } from 'src/auth/context/auth-context';

// export default function Page({ sx, color = 'warning', ...other }) {
//   const [loading, setLoading] = useState(true); // Initial loading state
//   const navigate = useNavigate();
//   const { authenticated } = useContext(AuthContext);

//   // Simulate API or Authentication Check
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false); // Set loading to false after 3 seconds
//     }, 500);

//     return () => clearTimeout(timer); // Cleanup timeout
//   }, []);

//   // Redirect if not authenticated
//   useEffect(() => {
//     if (!loading && !authenticated) {
//       navigate('/login');
//     }
//   }, [authenticated, loading, navigate]);

//   return (
//     <DashboardContent maxWidth="xl">
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
//               bg_gradient="#FFA92E"
//               loading={loading} // Pass loading state
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
//               loading={loading} // Pass loading state
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
//               loading={loading} // Pass loading state
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
//               loading={loading} // Pass loading state
//             />
//           </div>
//         </Tooltip>
//       </Box>
//     </DashboardContent>
//   );
// }
