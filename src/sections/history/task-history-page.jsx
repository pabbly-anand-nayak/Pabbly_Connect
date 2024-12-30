// import React, { useState } from 'react';
// import { useTheme } from '@emotion/react';

// import { Box, Tooltip, IconButton, useMediaQuery } from '@mui/material';

// import { Iconify } from 'src/components/iconify'; // Ensure this path is correct
// import DateTime from 'src/components/custom-table/DateTime';
// import StatsCards from 'src/components/stats-card/stats-card';
// import StatusLabel from 'src/components/custom-table/StatusLabel';
// import CustomTable from 'src/components/custom-table/custom-table';
// import AvatarCustom from 'src/components/custom-table/AvatarCustom';

// import HistoryBigCard from './components/historybigcard/big-card';
// import TaskHistoryTable from './table-task-history/history-table';

// export default function TaskHistoryPage() {
//   const [selectedListItem, setSelectedListItem] = useState(0);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   // Delete Action Component
//   const DeleteAction = ({ onDelete }) => (
//     <Tooltip title="Delete selected items" placement="bottom" arrow>
//       <IconButton color="primary" onClick={onDelete}>
//         <Iconify icon="solar:trash-bin-trash-bold" />
//       </IconButton>
//     </Tooltip>
//   );

//   const [filters, setFilters] = useState({
//     state: {
//       name: '',
//       status: 'all',
//     },
//     setState: (newState) =>
//       setFilters((prev) => ({ ...prev, state: { ...prev.state, ...newState } })),
//   });

//   const rows = [
//     {
//       id: 1,
//       status: 'Success',
//       date: 'Dec 18, 2024 10:35:35',
//       icons: [
//         '/assets/icons/app logo/Uteach app logo.png',
//         '/assets/icons/app logo/convertkit_icon.png',
//       ],
//       totalApps: '+4',
//       workflowName:
//         'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
//       folderName: 'Home',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '2 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//     {
//       id: 2,
//       status: 'Failed',
//       date: 'Dec 17, 2024 10:35:35',
//       icons: [
//         '/assets/icons/app logo/pabbly_icon.png',
//         '/assets/icons/app logo/quickbooks_icon.webp',
//       ],
//       totalApps: '+1',
//       workflowName: 'Create Invoice in QuickBooks after Stripe Payment',
//       folderName: 'Home',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '3 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//     {
//       id: 3,
//       status: 'Partial Failed',
//       date: 'Dec 08, 2024 10:35:35',
//       icons: [
//         '/assets/icons/app logo/Uteach app logo.png',
//         '/assets/icons/app logo/convertkit_icon.png',
//       ],
//       totalApps: '+4',
//       workflowName: 'Update Customer in Hubspot on New Sale in Shopify',
//       folderName: 'Home',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '4 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//     {
//       id: 4,
//       status: 'Failed',
//       date: 'Dec 07, 2024 10:35:35',
//       icons: [
//         '/assets/icons/app logo/pabbly_icon.png',
//         '/assets/icons/app logo/quickbooks_icon.webp',
//       ],
//       totalApps: '+1',
//       workflowName: 'Send Slack Notification on New Deal in Pipedrive',
//       folderName: 'Pabbly Hook',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '3 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//     {
//       id: 5,
//       status: 'Success',
//       date: 'Dec 06, 2024 10:35:35',
//       icons: ['/assets/icons/app logo/pabbly-api.png', '/assets/icons/app logo/Hubspot icon.png'],
//       totalApps: '+10',
//       workflowName: 'Add Lead in Salesforce on New Google Form Submission',
//       folderName: 'Pabbly Email Marketing',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '10 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//     {
//       id: 6,
//       status: 'Success',
//       date: 'Dec 06, 2024 10:35:35',
//       icons: ['/assets/icons/app logo/pabbly-api.png', '/assets/icons/app logo/Hubspot icon.png'],
//       totalApps: '+10',
//       workflowName: 'Add Lead in Salesforce on New Google Form Submission',
//       folderName: 'Pabbly Email Marketing',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '10 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//     {
//       id: 7,
//       status: 'Success',
//       date: 'Dec 18, 2024 10:35:35',
//       icons: [
//         '/assets/icons/app logo/Uteach app logo.png',
//         '/assets/icons/app logo/convertkit_icon.png',
//       ],
//       totalApps: '+4',
//       workflowName:
//         'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
//       folderName: 'Home',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '2 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//     {
//       id: 8,
//       status: 'Failed',
//       date: 'Dec 17, 2024 10:35:35',
//       icons: [
//         '/assets/icons/app logo/pabbly_icon.png',
//         '/assets/icons/app logo/quickbooks_icon.webp',
//       ],
//       totalApps: '+1',
//       workflowName: 'Create Invoice in QuickBooks after Stripe Payment',
//       folderName: 'Home',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '3 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//     {
//       id: 9,
//       status: 'Failed',
//       date: 'Dec 07, 2024 10:35:35',
//       icons: [
//         '/assets/icons/app logo/pabbly_icon.png',
//         '/assets/icons/app logo/quickbooks_icon.webp',
//       ],
//       totalApps: '+1',
//       workflowName: 'Send Slack Notification on New Deal in Pipedrive',
//       folderName: 'Pabbly Hook',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '3 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//     {
//       id: 10,
//       status: 'Partial Failed',
//       date: 'Dec 08, 2024 10:35:35',
//       icons: [
//         '/assets/icons/app logo/Uteach app logo.png',
//         '/assets/icons/app logo/convertkit_icon.png',
//       ],
//       totalApps: '+4',
//       workflowName: 'Update Customer in Hubspot on New Sale in Shopify',
//       folderName: 'Home',
//       stepsWorkflow: 'Steps Workflow',
//       freeTasksConsumed: '4 Free Tasks',
//       taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
//     },
//   ];

//   const tabs = {
//     options: [
//       {
//         value: 'all',
//         label: 'All',
//         count: rows.length,
//         tooltip: 'Show all task execution results.',
//       },
//       {
//         value: 'success',
//         label: 'Success',
//         count: rows.filter((row) => row.status === 'Success').length,
//         tooltip: 'Show task executions completed successfully.',
//       },
//       {
//         value: 'partial failed',
//         label: 'Partial Failed',
//         count: rows.filter((row) => row.status === 'Partial Failed').length,
//         tooltip: 'Show task executions with partial errors.',
//       },
//       {
//         value: 'failed',
//         label: 'Failed',
//         count: rows.filter((row) => row.status === 'Failed').length,
//         tooltip: 'Show task executions that failed due to errors.',
//       },
//     ],
//     value: filters.state.status,
//   };

//   return (
//     <Box
//       sx={{
//         gap: 3,
//         display: 'flex',
//         flexDirection: isMobile ? 'column' : 'row',
//         alignItems: isMobile ? 'flex-start' : 'flex-start',
//       }}
//     >
//       <Box sx={{ width: '100%' }}>
//         <Box
//           sx={{
//             mt: 0,
//             gap: 3,
//             display: 'grid',
//             gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
//           }}
//         >
//           <Tooltip title="Workflow Executed in the last 30 days." arrow placement="top">
//             <div>
//               <StatsCards
//                 cardtitle="Workflow Executed"
//                 cardstats="3,500"
//                 icon_name="task_alloted.png"
//                 icon_color="#FFA92E"
//                 bg_gradient="#FFA92E"
//               />
//             </div>
//           </Tooltip>
//           <Tooltip title="Tasks consumed in the last 30 days." arrow placement="top">
//             <div>
//               <StatsCards
//                 cardtitle="Tasks Consumed"
//                 cardstats="2,400"
//                 icon_name="task_consumed.png"
//                 icon_color="#1D88FA"
//                 bg_gradient="#1D88FA"
//               />
//             </div>
//           </Tooltip>
//           <Tooltip title="Free tasks consumed in the last 30 days." arrow placement="top">
//             <div>
//               <StatsCards
//                 cardtitle="Free Task Consumed"
//                 cardstats="1,100"
//                 icon_name="task_free.png"
//                 icon_color="#10CBF3"
//                 bg_gradient="#10CBF3"
//               />
//             </div>
//           </Tooltip>
//         </Box>

//         <CustomTable
//           title="Task History"
//           columns={[
//             /* Status Label & Date Time */
//             {
//               id: 'status/datetime',
//               label: (
//                 <Tooltip title="View task execution status, date, and time." arrow placement="top">
//                   <span>Task Status/Date</span>
//                 </Tooltip>
//               ),
//               render: (row) => {
//                 const normalizedStatus = row.status.toLowerCase();
//                 const statusConfigs = {
//                   success: {
//                     color: 'success',
//                     tooltip: 'Task execution was fully successful.',
//                     text: 'Success',
//                     icon: <Iconify icon="heroicons:check-circle-16-solid" />,
//                   },
//                   'partial failed': {
//                     color: 'warning',
//                     tooltip: 'Task execution failed due to partial failure.',
//                     text: 'Partial Failed',
//                     icon: <Iconify icon="ant-design:close-circle-filled" />,
//                   },
//                   failed: {
//                     color: 'error',
//                     tooltip: 'Task execution failed due to an error.',
//                     text: 'Failed',
//                     icon: <Iconify icon="ant-design:close-circle-filled" />,
//                   },
//                 };

//                 const config = statusConfigs[normalizedStatus] || {
//                   color: 'default',
//                   tooltip: 'Unknown status.',
//                   text: row.status,
//                   icon: null,
//                 };

//                 return (
//                   <Box>
//                     {/* Status Label */}
//                     <StatusLabel
//                       color={config.color}
//                       tooltip={config.tooltip}
//                       text={config.text}
//                       icon={config.icon}
//                     />

//                     {/* Execution Time Tooltip with Custom Text */}
//                     <DateTime
//                       createdAt={row.date}
//                       tooltipText={`Execution Time: ${row.date}, (UTC+05:30) Asia/Kolkata`}
//                     />
//                   </Box>
//                 );
//               },
//             },

//             /* Application Avatar Custom */
//             {
//               id: 'applications',
//               label: (
//                 <Tooltip title="Apps which are integrated in the workflow." arrow placement="top">
//                   <span>Application</span>
//                 </Tooltip>
//               ),
//               render: (row) => (
//                 <AvatarCustom
//                   icons={row.icons}
//                   totalApps={row.totalApps}
//                   title="Integrated applications" // AvatarCustom Tooltip title
//                 />
//               ),
//             },

//             /* Workflow Name & Folder Name */
//             {
//               id: 'workflowName',
//               label: (
//                 <Tooltip
//                   title="Name of workflow and folder where it is located."
//                   arrow
//                   placement="top"
//                 >
//                   <span>Workflow Name</span>
//                 </Tooltip>
//               ),
//               render: (row) => (
//                 <Box>
//                   {/* Workflow Name & Folder Name */}
//                   <Box
//                     sx={{
//                       color: '#078dee',
//                       typography: 'body2',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       flex: '1 1 auto',
//                       alignItems: 'flex-start',
//                       cursor: 'pointer',
//                       maxWidth: { xs: '200px', md: '300px' }, // Responsive max width
//                     }}
//                   >
//                     <Tooltip title={`Workflow Name: ${row.workflowName}`} arrow placement="top">
//                       {row.workflowName}
//                     </Tooltip>
//                   </Box>

//                   {/* Folder Name */}
//                   <Box
//                     sx={{
//                       color: 'text.disabled',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       maxWidth: 200,
//                     }}
//                   >
//                     <Tooltip title={`Folder Name: ${row.folderName}`} placement="bottom" arrow>
//                       {row.folderName}
//                     </Tooltip>
//                   </Box>
//                 </Box>
//               ),
//             },

//             /* Steps Workflow & Free Tasks Consumed */
//             {
//               id: 'stepsWorkflow',
//               label: (
//                 <Tooltip
//                   title="View how many task a workflow execution consumed."
//                   arrow
//                   placement="top"
//                 >
//                   <span>Tasks Consumed</span>
//                 </Tooltip>
//               ),
//               render: (row) => (
//                 <Box>
//                   {/* Steps Workflow & Free Tasks Consumed */}
//                   <Box>
//                     <Tooltip
//                       title="This indicates the total number of tasks consumed"
//                       arrow
//                       placement="top"
//                     >
//                       {row.stepsWorkflow}
//                     </Tooltip>
//                   </Box>

//                   {/* Free Tasks Consumed */}
//                   <Box
//                     sx={{
//                       color: 'text.disabled',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       maxWidth: 200,
//                     }}
//                   >
//                     <Tooltip
//                       title="This indicates the number of free tasks consumed."
//                       placement="bottom"
//                       arrow
//                     >
//                       {row.freeTasksConsumed}
//                     </Tooltip>
//                   </Box>
//                 </Box>
//               ),
//             },

//             /* Task History ID */
//             {
//               id: 'taskHistoryID',
//               label: (
//                 <Tooltip
//                   title="View how many task a workflow execution consumed."
//                   arrow
//                   placement="top"
//                 >
//                   <span>Task History ID</span>
//                 </Tooltip>
//               ),
//               render: (row) => (
//                 <Box>
//                   {/* Task History ID */}
//                   <Box
//                     sx={{
//                       color: '#078dee',
//                       typography: 'body2',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       flex: '1 1 auto',
//                       alignItems: 'flex-start',
//                       cursor: 'pointer',
//                       maxWidth: { xs: '200px', md: '300px' }, // Responsive max width
//                     }}
//                   >
//                     <Tooltip
//                       title="Click here to view task details in brief."
//                       arrow
//                       placement="top"
//                     >
//                       {row.taskHistoryID}
//                     </Tooltip>
//                   </Box>
//                 </Box>
//               ),
//             },
//           ]}
//           rows={rows}
//           filters={filters}
//           onTabChange={(event, newValue) => {
//             filters.setState({ ...filters.state, status: newValue });
//           }}
//           tabs={tabs}
//           deleteAction={DeleteAction} // Pass the DeleteAction component
//         />

//         <HistoryBigCard />
//         <TaskHistoryTable />
//       </Box>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Button,
  Tooltip,
  Divider,
  MenuList,
  MenuItem,
  IconButton,
  useMediaQuery,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import DateTime from 'src/components/custom-table/DateTime';
import StatsCards from 'src/components/stats-card/stats-card';
import StatusLabel from 'src/components/custom-table/StatusLabel';
import CustomTable from 'src/components/custom-table/custom-table';
import AvatarCustom from 'src/components/custom-table/AvatarCustom';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import HistoryBigCard from './components/historybigcard/big-card';
import { CustomSharedbyYouTable } from '../settings/components/page_team-members/components/costom-shared-by-you-table';

// Moved DeleteAction component outside of TaskHistoryPage
const DeleteAction = ({ onDelete }) => (
  <Tooltip title="Delete selected items" placement="bottom" arrow>
    <IconButton color="primary" onClick={onDelete}>
      <Iconify icon="solar:trash-bin-trash-bold" />
    </IconButton>
  </Tooltip>
);

// ReExecuteAction component for selected items
const ReExecuteAction = ({ numSelected, onReExecute }) => {
  const theme = useTheme();
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    // padding: '0 16px',
    padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
  };

  if (numSelected === 0) return null;

  return isBelow600px ? (
    <Tooltip title="Click here to re-execute the workflow(s)." arrow placement="top">
      <IconButton
        sx={{
          mb: '0px',
          p: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 48,
          minHeight: 48,
        }}
        onClick={onReExecute}
        color="primary"
      >
        <Iconify icon="eva:arrow-ios-downward-fill" />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Click here to re-execute the workflow(s)." arrow placement="top">
      <Button
        endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        onClick={onReExecute}
        color="primary"
        sx={{
          ...buttonStyle,
          p: '16px',
          width: '155px',
        }}
      >
        Re-execute
      </Button>
    </Tooltip>
  );
};

// Column definitions moved outside to prevent recreation on each render
const getTableColumns = () => [
  {
    id: 'status/datetime',
    label: (
      <Tooltip title="View task execution status, date, and time." arrow placement="top">
        <span>Task Status/Date</span>
      </Tooltip>
    ),
    render: (row) => {
      const normalizedStatus = row.status.toLowerCase();
      const statusConfigs = {
        success: {
          color: 'success',
          tooltip: 'Task execution was fully successful.',
          text: 'Success',
          icon: <Iconify icon="heroicons:check-circle-16-solid" />,
        },
        'partial failed': {
          color: 'warning',
          tooltip: 'Task execution failed due to partial failure.',
          text: 'Partial Failed',
          icon: <Iconify icon="ant-design:close-circle-filled" />,
        },
        failed: {
          color: 'error',
          tooltip: 'Task execution failed due to an error.',
          text: 'Failed',
          icon: <Iconify icon="ant-design:close-circle-filled" />,
        },
      };

      const config = statusConfigs[normalizedStatus] || {
        color: 'default',
        tooltip: 'Unknown status.',
        text: row.status,
        icon: null,
      };

      return (
        <Box>
          <StatusLabel
            color={config.color}
            tooltip={config.tooltip}
            text={config.text}
            icon={config.icon}
          />
          <DateTime
            createdAt={row.date}
            tooltipText={`Execution Time: ${row.date}, (UTC+05:30) Asia/Kolkata`}
          />
        </Box>
      );
    },
  },

  /* Application Avatar Custom */
  {
    id: 'applications',
    label: (
      <Tooltip title="Apps which are integrated in the workflow." arrow placement="top">
        <span>Application</span>
      </Tooltip>
    ),
    render: (row) => (
      <AvatarCustom icons={row.icons} totalApps={row.totalApps} title="Integrated applications" />
    ),
  },

  /* Workflow Name & Folder Name */
  {
    id: 'workflowName',
    label: (
      <Tooltip title="Name of workflow and folder where it is located." arrow placement="top">
        <span className="truncate max-w-[150px]"> Workflow Name</span>
      </Tooltip>
    ),
    render: (row) => (
      <Box>
        <Box
          sx={{
            color: '#078dee',
            typography: 'body2',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: '1 1 auto',
            alignItems: 'flex-start',
            cursor: 'pointer',
            maxWidth: { xs: '150px', md: '400px' },
          }}
        >
          <Tooltip title={`Workflow Name: ${row.workflowName}`} arrow placement="top">
            {row.workflowName}
          </Tooltip>
        </Box>
        <Box
          sx={{
            color: 'text.disabled',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 200,
          }}
        >
          <Tooltip title={`Folder Name: ${row.folderName}`} placement="bottom" arrow>
            {row.folderName}
          </Tooltip>
        </Box>
      </Box>
    ),
  },

  /* Steps Workflow & Free Tasks Consumed */
  {
    id: 'stepsWorkflow',
    label: (
      <Tooltip title="View how many task a workflow execution consumed." arrow placement="top">
        <span
          style={{
            maxWidth: '220px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Tasks Consumed
        </span>
      </Tooltip>
    ),
    render: (row) => (
      <Box>
        <Box>
          <Tooltip title="This indicates the total number of tasks consumed" arrow placement="top">
            {row.stepsWorkflow}
          </Tooltip>
        </Box>
        <Box
          sx={{
            color: 'text.disabled',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 200,
          }}
        >
          <Tooltip
            title="This indicates the number of free tasks consumed."
            placement="bottom"
            arrow
          >
            {row.freeTasksConsumed}
          </Tooltip>
        </Box>
      </Box>
    ),
  },

  /* Task History ID */
  {
    id: 'taskHistoryID',
    label: (
      <Tooltip title="View how many task a workflow execution consumed." arrow placement="top">
        <span className="truncate max-w-[120px]"> Task History ID</span>
      </Tooltip>
    ),
    render: (row) => (
      <Box>
        <Box
          sx={{
            color: '#078dee',
            typography: 'body2',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: '1 1 auto',
            alignItems: 'flex-start',
            cursor: 'pointer',
            maxWidth: { xs: '120px', md: '150px' },
          }}
        >
          <Tooltip title="Click here to view task details in brief." arrow placement="top">
            {row.taskHistoryID}
          </Tooltip>
        </Box>
      </Box>
    ),
  },
];

/* RowOptions component */
const RowOptions = ({ row, actions }) => {
  const popover = usePopover();

  return (
    <>
      <Tooltip title="Click to see options." arrow placement="top">
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Tooltip>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          {actions.map((action, index) =>
            action.type === 'divider' ? (
              <Divider key={`divider-${index}`} sx={{ borderStyle: 'dashed', my: 1 }} />
            ) : (
              <Tooltip key={action.label} title={action.tooltip} arrow placement="left">
                <MenuItem
                  onClick={() => {
                    action.onClick(row);
                    popover.onClose();
                  }}
                  sx={{ color: action.color || 'text.primary', gap: 1 }}
                >
                  <Iconify icon={action.icon} />
                  {action.label}
                </MenuItem>
              </Tooltip>
            )
          )}
        </MenuList>
      </CustomPopover>
    </>
  );
};

/* Filters Button & Refresh IconButton */
const CustomToolbarButtons = ({
  isFilterApplied,
  isMobile,
  handleFilterButtonClick,
  handleFilterIconClick,
  handleRefresh,
}) => (
  <>
    {/* Filters Button & Refresh IconButton */}
    <Tooltip
      title={
        isFilterApplied
          ? "Click the 'X' to clear all applied filters."
          : 'Apply filters to the workflow history to find specific tasks.'
      }
      arrow
      placement="top"
    >
      <Button
        sx={{
          fontSize: '15px',
          height: '48px',
          textTransform: 'none',
          padding: isMobile ? '0px 10px 0px 10px' : '16px',
          width: isFilterApplied ? '156px' : '104.34px',
          position: 'relative',
          '& .MuiButton-startIcon': {
            pointerEvents: 'auto',
            marginRight: '8px',
            display: 'flex',
          },
        }}
        variant={isFilterApplied ? 'contained' : ''}
        color="primary"
        startIcon={!isFilterApplied && <Iconify icon="mdi:filter" />}
        endIcon={
          isFilterApplied && (
            <Box
              component="span"
              onClick={handleFilterIconClick}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify
                icon="uil:times"
                style={{
                  width: 22,
                  height: 22,
                  cursor: 'pointer',
                }}
              />
            </Box>
          )
        }
        onClick={handleFilterButtonClick}
      >
        {isFilterApplied ? 'Filter Applied' : 'Filters'}
      </Button>
    </Tooltip>

    {/* Refresh IconButton */}
    <Tooltip title="Click here to refresh data." arrow placement="top">
      <IconButton onClick={handleRefresh}>
        <Iconify sx={{ width: '20px', height: '20px' }} icon="heroicons-outline:refresh" />
      </IconButton>
    </Tooltip>
  </>
);

export default function TaskHistoryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const tableColumns = getTableColumns();
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [filters, setFilters] = useState({
    state: {
      name: '',
      status: 'all',
    },
    setState: (newState) =>
      setFilters((prev) => ({ ...prev, state: { ...prev.state, ...newState } })),
  });

  const rows = [
    {
      id: 1,
      status: 'Success',
      date: 'Dec 18, 2024 10:35:35',
      icons: [
        '/assets/icons/app logo/Uteach app logo.png',
        '/assets/icons/app logo/convertkit_icon.png',
      ],
      totalApps: '+4',
      workflowName:
        'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
      folderName: 'Home',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '2 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
    {
      id: 2,
      status: 'Failed',
      date: 'Dec 17, 2024 10:35:35',
      icons: [
        '/assets/icons/app logo/pabbly_icon.png',
        '/assets/icons/app logo/quickbooks_icon.webp',
      ],
      totalApps: '+1',
      workflowName: 'Create Invoice in QuickBooks after Stripe Payment',
      folderName: 'Home',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '3 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
    {
      id: 3,
      status: 'Partial Failed',
      date: 'Dec 08, 2024 10:35:35',
      icons: [
        '/assets/icons/app logo/Uteach app logo.png',
        '/assets/icons/app logo/convertkit_icon.png',
      ],
      totalApps: '+4',
      workflowName: 'Update Customer in Hubspot on New Sale in Shopify',
      folderName: 'Home',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '4 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
    {
      id: 4,
      status: 'Failed',
      date: 'Dec 07, 2024 10:35:35',
      icons: [
        '/assets/icons/app logo/pabbly_icon.png',
        '/assets/icons/app logo/quickbooks_icon.webp',
      ],
      totalApps: '+1',
      workflowName: 'Send Slack Notification on New Deal in Pipedrive',
      folderName: 'Pabbly Hook',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '3 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
    {
      id: 5,
      status: 'Success',
      date: 'Dec 06, 2024 10:35:35',
      icons: ['/assets/icons/app logo/pabbly-api.png', '/assets/icons/app logo/Hubspot icon.png'],
      totalApps: '+10',
      workflowName: 'Add Lead in Salesforce on New Google Form Submission',
      folderName: 'Pabbly Email Marketing',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '10 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
    {
      id: 6,
      status: 'Success',
      date: 'Dec 06, 2024 10:35:35',
      icons: ['/assets/icons/app logo/pabbly-api.png', '/assets/icons/app logo/Hubspot icon.png'],
      totalApps: '+10',
      workflowName: 'Add Lead in Salesforce on New Google Form Submission',
      folderName: 'Pabbly Email Marketing',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '10 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
    {
      id: 7,
      status: 'Success',
      date: 'Dec 18, 2024 10:35:35',
      icons: [
        '/assets/icons/app logo/Uteach app logo.png',
        '/assets/icons/app logo/convertkit_icon.png',
      ],
      totalApps: '+4',
      workflowName:
        'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
      folderName: 'Home',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '2 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
    {
      id: 8,
      status: 'Failed',
      date: 'Dec 17, 2024 10:35:35',
      icons: [
        '/assets/icons/app logo/pabbly_icon.png',
        '/assets/icons/app logo/quickbooks_icon.webp',
      ],
      totalApps: '+1',
      workflowName: 'Create Invoice in QuickBooks after Stripe Payment',
      folderName: 'Home',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '3 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
    {
      id: 9,
      status: 'Failed',
      date: 'Dec 07, 2024 10:35:35',
      icons: [
        '/assets/icons/app logo/pabbly_icon.png',
        '/assets/icons/app logo/quickbooks_icon.webp',
      ],
      totalApps: '+1',
      workflowName: 'Send Slack Notification on New Deal in Pipedrive',
      folderName: 'Pabbly Hook',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '3 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
    {
      id: 10,
      status: 'Partial Failed',
      date: 'Dec 08, 2024 10:35:35',
      icons: [
        '/assets/icons/app logo/Uteach app logo.png',
        '/assets/icons/app logo/convertkit_icon.png',
      ],
      totalApps: '+4',
      workflowName: 'Update Customer in Hubspot on New Sale in Shopify',
      folderName: 'Home',
      stepsWorkflow: 'Steps Workflow',
      freeTasksConsumed: '4 Free Tasks',
      taskHistoryID: 'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
    },
  ];

  const tabs = {
    options: [
      {
        value: 'all',
        label: 'All',
        count: rows.length,
        tooltip: 'Show all task execution results.',
      },
      {
        value: 'success',
        label: 'Success',
        count: rows.filter((row) => row.status === 'Success').length,
        tooltip: 'Show task executions completed successfully.',
      },
      {
        value: 'partial failed',
        label: 'Partial Failed',
        count: rows.filter((row) => row.status === 'Partial Failed').length,
        tooltip: 'Show task executions with partial errors.',
      },
      {
        value: 'failed',
        label: 'Failed',
        count: rows.filter((row) => row.status === 'Failed').length,
        tooltip: 'Show task executions that failed due to errors.',
      },
    ],
    value: filters.state.status,
  };

  /* RowOptions actions */
  const actions = (row) => [
    {
      label: 'Update',
      icon: 'solar:pen-bold',
      onClick: (rowData) => console.log('Viewing details for:', rowData),
      tooltip: 'Update webhook URL and events.',
    },
    {
      label: 'Update',
      icon: 'solar:pen-bold',
      onClick: (rowData) => console.log('Viewing details for:', rowData),
      tooltip: 'Update webhook URL and events.',
    },
    {
      label: 'Update',
      icon: 'solar:pen-bold',
      onClick: (rowData) => console.log('Viewing details for:', rowData),
      tooltip: 'Update webhook URL and events.',
    },
    { type: 'divider' }, // Add a divider here
    {
      label: 'Delete',
      icon: 'solar:trash-bin-trash-bold',
      onClick: (rowData) => console.log('Deleting task:', rowData),
      tooltip: 'Delete this task',
      color: 'error.main',
    },
  ];

  const handleRefresh = () => {
    console.log('Refreshing data...');
    // Add your refresh logic here
  };

  const handleFilterButtonClick = () => {
    setIsFilterApplied(!isFilterApplied);
  };

  const handleFilterIconClick = (e) => {
    e.stopPropagation();
    setIsFilterApplied(false);
  };

  const handleReExecute = () => {
    console.log('Re-executing selected workflows');
  };

  return (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'flex-start',
      }}
    >
      <Box sx={{ width: '100%' }}>
        {/* Stats Cards section  */}
        <Box
          sx={{
            mt: 0,
            gap: 3,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          <Tooltip title="Workflow Executed in the last 30 days." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Workflow Executed"
                cardstats="3,500"
                icon_name="task_alloted.png"
                icon_color="#FFA92E"
                bg_gradient="#FFA92E"
              />
            </div>
          </Tooltip>
          <Tooltip title="Tasks consumed in the last 30 days." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Tasks Consumed"
                cardstats="2,400"
                icon_name="task_consumed.png"
                icon_color="#1D88FA"
                bg_gradient="#1D88FA"
              />
            </div>
          </Tooltip>
          <Tooltip title="Free tasks consumed in the last 30 days." arrow placement="top">
            <div>
              <StatsCards
                cardtitle="Free Task Consumed"
                cardstats="1,100"
                icon_name="task_free.png"
                icon_color="#10CBF3"
                bg_gradient="#10CBF3"
              />
            </div>
          </Tooltip>
        </Box>

        <CustomTable
          title="Task History"
          titleTooltip="You can view task executions for all workflows."
          secondaryTitle="(Dec 01, 2024 - Dec 15, 2024)" // Custom secondary text if needed
          secondaryTitleTooltip="You can view task executions for all workflows.)" // Custom secondary text Tooltip if needed
          columns={tableColumns}
          rows={rows}
          noDataProps={{
            title: 'No data added!',
            subTitle: 'Set up webhooks and receive notification for different events.',
            learnMoreText: 'Learn more',
            learnMoreLink: 'https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly',
          }}
          filters={filters}
          searchPlaceholder="Search for workflows or tasks..." // Custom placeholder
          onTabChange={(event, newValue) => {
            filters.setState({ ...filters.state, status: newValue });
          }}
          tabs={tabs} // Pass tabs here
          showTabs // Explicitly show tabs (default behavior)
          deleteAction={(onDelete) => <DeleteAction onDelete={onDelete} />}
          ReExecuteAction={ReExecuteAction}
          renderRowOptions={(row) => <RowOptions row={row} actions={actions(row)} />}
          // toolbarButtons={CustomToolbarButtons}
          toolbarButtons={
            <CustomToolbarButtons
              isFilterApplied={isFilterApplied}
              isMobile={isMobile}
              handleFilterButtonClick={handleFilterButtonClick}
              handleFilterIconClick={handleFilterIconClick}
              handleRefresh={handleRefresh}
            />
          }
        />
        <CustomSharedbyYouTable />

        <HistoryBigCard />
        {/* <TaskHistoryTable /> */}
      </Box>
    </Box>
  );
}
