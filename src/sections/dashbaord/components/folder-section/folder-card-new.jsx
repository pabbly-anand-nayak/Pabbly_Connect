// import { toast } from 'sonner';
// import { memo, useState } from 'react';
// import { useNavigate } from 'react-router';

// import { styled } from '@mui/material/styles';
// import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
// import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
// import {
//   Box,
//   Card,
//   Button,
//   Divider,
//   Tooltip,
//   MenuList,
//   MenuItem,
//   IconButton,
//   Typography,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { varAlpha } from 'src/theme/styles';

// import { Iconify } from 'src/components/iconify';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { usePopover, CustomPopover } from 'src/components/custom-popover';
// import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

// import { CreateFolderDialog } from '../foldercard/folder-options-components/create-folder-dialog';
// import { RenameFolderDialog } from '../foldercard/folder-options-components/rename-folder-dialog';


// // Simplified folder items without nested structure
// const ITEMS = [
//   { id: '12', label: 'Home' },
//   {
//     id: '2',
//     label: 'Lead Salesforce, Email Verification, Email Marketing, Subscription',
//     children: [
//       {
//         id: '3',
//         label: 'Child Folder 1 Client',
//         children: [
//           { id: '4', label: 'Grand Child 1 Client' },
//           {
//             id: '5',
//             label: 'Grand Child 2 Client',
//             children: [
//               { id: '6', label: 'Folder 1' },
//               { id: '7', label: 'Folder 2' },
//             ],
//           },
//         ],
//       },
//     ],
//   },

//   { id: '18', label: 'Pabbly Connect' },
//   { id: '1', label: 'Client (A)' },
//   { id: '13', label: 'Pabbly Subscription Billing' },
//   { id: '14', label: 'Pabbly Email Marketing' },
//   { id: '17', label: 'Pabbly Form Builder' },
//   { id: '15', label: 'Pabbly Hook' },
// ];

// const TRASHFOLDER = [{ id: '16', label: 'Trash' }];

// const getDynamicWorkflowCount = (nodeId) => {
//   console.log('Node ID:', nodeId); // Debugging
//   const workflowCounts = {
//     '12': 0,      // Home
//     '2': 544454,  // Client A
//     '3': 5454,    // Child Folder 1
//     '4': 544554,  // Grand Child 1
//     '5': 54554,   // Grand Child 2
//     '6': 54554,   // Folder 1
//     '7': 5454,    // Folder 2
//     '18': 5454,   // Pabbly Connect
//     '1': 544,     // Main Folder
//     '13': 544,    // Pabbly Subscription
//   };

//   // Return the count for the nodeId or a consistent default value
//   return workflowCounts[nodeId] ?? 10 * 10; // Default is 1000 if not defined
// };


// const StyledTreeItem = styled((props) => {

//   const { label, onTrashClick, onHomeClick, ...rest } = props;
//   const confirm = useBoolean();
//   const popover = usePopover();
//   const [createFolderOpen, setCreateFolderOpen] = useState(false);
//   const [renameDialogOpen, setRenameDialogOpen] = useState(false);
//   const [createFolderDialogOpen, setcreateFolderDialogOpen] = useState(false);


//   const handleCreateFolderOpen = () => {
//     setCreateFolderOpen(true);
//     popover.onClose();
//   };

//   const handleRenameFolderClick = () => {
//     setRenameDialogOpen(true);
//     popover.onClose();
//   };

//   const handleCreateFolderClick = () => {
//     setRenameDialogOpen(true);
//     popover.onClose();
//   };

//   const handleCreateFolderClose = () => setCreateFolderOpen(false);
//   const handleRenameFolderClose = () => setRenameDialogOpen(false);


//   const navigate = useNavigate();
//   const handleNavigateToTeamMembers = () => {
//     navigate('settings/team-members');
//   };

//   const handleDelete = () => {
//     confirm.onFalse();
//     // Show Delete success Snackbar
//     toast.success('Folder deleted successfully.');
//   };

//   const truncateText = (text, limit = 26) => {
//     if (text.length <= limit) return text;
//     return `${text.slice(0, limit)}...`;
//   };

//   const handleItemClick = (event) => {
//     if (label.includes('Trash')) {
//       event.preventDefault();
//       onTrashClick?.();
//     } else if (label.includes('Home')) {
//       event.preventDefault();
//       onHomeClick?.();
//     }
//   };

//   const handleIconClick = (event) => {
//     // Stop the click event from bubbling up to parent elements
//     event.preventDefault();
//     event.stopPropagation();
//     popover.onOpen(event);
//   };

//   // Add a handler for the IconButton container
//   const handleIconContainerClick = (event) => {
//     // Prevent the click from reaching the TreeItem
//     event.preventDefault();
//     event.stopPropagation();
//   };

//   return (
//     <>
//       <TreeItem
//         {...rest}
//         onClick={handleItemClick}
//         label={
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               width: '100%',
//               pr: 1,
//               height: '24.78px'
//             }}
//           >
//             <Typography
//               component="div"
//               fontSize={14}
//               fontWeight={500}
//               sx={{
//                 flex: 1,
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap',
//                 display: 'flex',
//                 alignItems: 'center',
//               }}
//             >
//               <Tooltip title={`Folder Name: ${label}`} placement="top" arrow>
//                 <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                   {truncateText(label)}
//                 </span>
//               </Tooltip>

//               <Tooltip title="Number of workflows in this folder" disableInteractive arrow placement="top">
//                 <Typography
//                   component="span"
//                   sx={{
//                     fontSize: 14,
//                     color: 'text.secondary',
//                     flexShrink: 0,
//                     ml: 1,
//                   }}
//                 >
//                   ({getDynamicWorkflowCount(props.nodeId)})
//                 </Typography>
//               </Tooltip>
//             </Typography>

//             <Box
//               sx={{ ml: 1, display: 'flex', alignItems: 'center' }}
//               onClick={handleIconContainerClick} // Add click handler to the container
//             >
//               {!label.includes('Home') && !label.includes('Trash') && (
//                 <Tooltip title="Click to see options." disableInteractive arrow placement="top">
//                   <IconButton
//                     onClick={handleIconClick}
//                     size="small"
//                     sx={{
//                       padding: 0.5,
//                       flexShrink: 0,
//                       '&:hover': { backgroundColor: 'action.hover' },
//                     }}
//                   >
//                     <Iconify icon="eva:more-vertical-fill" width={16} height={16} />
//                   </IconButton>
//                 </Tooltip>
//               )}
//             </Box>
//           </Box>
//         }
//       />
//       <CustomPopover
//         open={popover.open}
//         onClose={popover.onClose}
//         anchorEl={popover.anchorEl}
//       >
//         <MenuList>
//           <Tooltip title="Create a new folder." arrow placement="left">
//             <MenuItem onClick={handleCreateFolderOpen}>
//               <Iconify icon="fa6-solid:square-plus" />
//               Create Folder
//             </MenuItem>
//           </Tooltip>

//           <Tooltip title="Change the folder's name." arrow placement="left">
//             <MenuItem onClick={handleRenameFolderClick}>
//               <Iconify icon="fluent:rename-16-filled" />
//               Rename
//             </MenuItem>
//           </Tooltip>

//           <Tooltip title="Share the folder with others." arrow placement="left">
//             <MenuItem
//               onClick={handleNavigateToTeamMembers}
//             >
//               <Iconify icon="jam:share-alt-f" />
//               Share Folder
//             </MenuItem>
//           </Tooltip>
//           <Divider style={{ borderStyle: 'dashed' }} />

//           <Tooltip
//             title="Delete the folder and move the workflow to the trash."
//             arrow
//             placement="left"
//           >
//             <MenuItem onClick={() => {
//               confirm.onTrue();
//               popover.onClose();
//             }} sx={{ color: 'error.main' }}>
//               <Iconify icon="solar:trash-bin-trash-bold" />
//               Delete
//             </MenuItem>
//           </Tooltip>
//         </MenuList>
//       </CustomPopover>

//       <CreateFolderDialog
//         open={createFolderOpen}
//         onClose={handleCreateFolderClose} />

//       <RenameFolderDialog
//         open={renameDialogOpen}
//         onClose={handleRenameFolderClose}
//         workflowName={ITEMS.label} // Add this prop

//       />

//       <ConfirmDialog
//         open={confirm.value}
//         onClose={confirm.onFalse}
//         title="Do you really want to delete the folder?"
//         content={
//           <>
//             Note that when a folder is deleted its email lists are moved to the home folder.{' '}
//             <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />

//           </>
//         }
//         action={
//           <Button onClick={handleDelete} variant="contained" color="error">
//             Delete
//           </Button>
//         }
//       />

//     </>
//   );

// })(({ theme }) => ({
//   color: theme.palette.grey[800],
//   [`& .${treeItemClasses.content}`]: {
//     borderRadius: theme.spacing(0.5),
//     padding: theme.spacing(0.8, 1),
//     margin: theme.spacing(0.2, 0),
//     [`& .${treeItemClasses.label}`]: {
//       fontSize: '14px',
//       fontWeight: 500,
//       width: '100%',
//       '& > svg': {
//         marginRight: theme.spacing(1),
//       },
//     },
//   },

//   [`& .${treeItemClasses.groupTransition}`]: {
//     marginLeft: 15,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${varAlpha(theme.vars.palette.text.primaryChannel, 0.4)}`,
//   },
// }));

// const CustomStyling = ({ onTrashClick, onHomeClick }) => (
//   <>
//     <RichTreeView
//       aria-label="customized"
//       items={ITEMS}
//       sx={{ overflowX: 'hidden', width: 1 }}
//       slots={{
//         item: (props) => (
//           <StyledTreeItem {...props} onTrashClick={onTrashClick} onHomeClick={onHomeClick} />
//         ),
//       }}
//     />

//     <Divider sx={{ borderStyle: 'dashed', my: 1, mt: 2 }} />

//     <RichTreeView
//       aria-label="customized"
//       items={TRASHFOLDER}
//       sx={{ overflowX: 'hidden', width: 1 }}
//       slots={{
//         item: (props) => (
//           <StyledTreeItem {...props} onTrashClick={onTrashClick} onHomeClick={onHomeClick} />
//         ),
//       }}
//     />
//   </>
// );

// const FolderSection = memo(({ onTrashClick, onHomeClick }) => {
//   const createFolder = useBoolean();

//   return (
//     <Card sx={{ pl: 3, pr: 3, pt: 3, pb: 3 }}>
//       <Typography variant="h6">
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Tooltip
//             disableInteractive
//             title={
//               <div style={{ textAlign: 'center' }}>
//                 You can create folders and manage connections within them.
//               </div>
//             }
//             arrow
//             placement="top"
//           >
//             <span>Folders</span>
//           </Tooltip>

//           <Tooltip title="Create a new folder." disableInteractive arrow placement="top">
//             <Button
//               sx={{
//                 mr: 1,
//                 mb: 1,
//                 p: 1,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 minWidth: 0,
//               }}
//               onClick={createFolder.onTrue}
//               color="primary"
//               variant="contained"
//             >
//               <Iconify icon="fa6-solid:plus" />
//             </Button>
//           </Tooltip>
//         </Box>
//       </Typography>

//       <Divider sx={{ borderStyle: 'dashed', mb: 2, mt: 1 }} />

//       <CustomStyling onTrashClick={onTrashClick} onHomeClick={onHomeClick} />

//       <CreateFolderDialog open={createFolder.value} onClose={createFolder.onFalse} />

//     </Card>
//   );
// });

// FolderSection.displayName = 'FolderSection';

// export { FolderSection };
// ---------------------




import { toast } from 'sonner';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router';

import { styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import {
  Box,
  Card,
  Button,
  Divider,
  Tooltip,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

import { AddRenameFolderDialog } from './hook/add-rename-folder-dialog';


// Simplified folder items without nested structure
const ITEMS = [
  { id: '12', label: 'Home' },
  {
    id: '2',
    label: 'Lead Salesforce, Email Verification, Email Marketing, Subscription',
    children: [
      {
        id: '3',
        label: 'Child Folder 1 Client',
        children: [
          { id: '4', label: 'Grand Child 1 Client' },
          {
            id: '5',
            label: 'Grand Child 2 Client',
            children: [
              { id: '6', label: 'Folder 1' },
              { id: '7', label: 'Folder 2' },
            ],
          },
        ],
      },
    ],
  },

  { id: '18', label: 'Pabbly Connect' },
  { id: '1', label: 'Client (A)' },
  { id: '13', label: 'Pabbly Subscription Billing' },
  { id: '14', label: 'Pabbly Email Marketing' },
  { id: '17', label: 'Pabbly Form Builder' },
  { id: '15', label: 'Pabbly Hook' },
];

const TRASHFOLDER = [{ id: '16', label: 'Trash' }];

const getDynamicWorkflowCount = (nodeId) => {
  console.log('Node ID:', nodeId); // Debugging
  const workflowCounts = {
    '12': 0,      // Home
    '2': 544454,  // Client A
    '3': 5454,    // Child Folder 1
    '4': 544554,  // Grand Child 1
    '5': 54554,   // Grand Child 2
    '6': 54554,   // Folder 1
    '7': 5454,    // Folder 2
    '18': 5454,   // Pabbly Connect
    '1': 544,     // Main Folder
    '13': 544,    // Pabbly Subscription
  };

  // Return the count for the nodeId or a consistent default value
  return workflowCounts[nodeId] ?? 10 * 10; // Default is 1000 if not defined
};


const StyledTreeItem = styled((props) => {

  const { label, onTrashClick, onHomeClick, ...rest } = props;
  const confirm = useBoolean();
  const popover = usePopover();

  // ----------------------------

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('create'); // 'create' or 'rename'
  const [dialogTitle, setDialogTitle] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [folderOptions] = useState([
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
  ]); // Example folder options

  const handleDialogClose = () => setDialogOpen(false);

  const handleCreateFolderClick = () => {
    setDialogMode('create');
    setDialogTitle('Create Folder');
    setSelectedFolder('');
    setDialogOpen(true);
    popover.onClose();
  };

  const handleRenameFolderClick = () => {
    setDialogMode('rename');
    setDialogTitle('Rename Folder');
    setSelectedFolder(label); // Set the current folder name for renaming
    setDialogOpen(true);
    popover.onClose();
  };

  const handleDialogAction = (data) => {

  };
  // ---------------------------------


  const navigate = useNavigate();
  const handleNavigateToTeamMembers = () => {
    navigate('settings/team-members');
  };

  const handleDelete = () => {
    confirm.onFalse();
    // Show Delete success Snackbar 
    toast.success('Folder deleted successfully.');
  };

  const truncateText = (text, limit = 26) => {
    if (text.length <= limit) return text;
    return `${text.slice(0, limit)}...`;
  };

  const handleItemClick = (event) => {
    if (label.includes('Trash')) {
      event.preventDefault();
      onTrashClick?.();
    } else if (label.includes('Home')) {
      event.preventDefault();
      onHomeClick?.();
    }
  };

  const handleIconClick = (event) => {
    // Stop the click event from bubbling up to parent elements
    event.preventDefault();
    event.stopPropagation();
    popover.onOpen(event);
  };

  // Add a handler for the IconButton container
  const handleIconContainerClick = (event) => {
    // Prevent the click from reaching the TreeItem
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <TreeItem
        {...rest}
        onClick={handleItemClick}
        label={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              pr: 1,
              height: '24.78px'
            }}
          >
            <Typography
              component="div"
              fontSize={14}
              fontWeight={500}
              sx={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Tooltip title={`Folder Name: ${label}`} placement="top" arrow>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {truncateText(label)}
                </span>
              </Tooltip>

              <Tooltip title="Number of workflows in this folder" disableInteractive arrow placement="top">
                <Typography
                  component="span"
                  sx={{
                    fontSize: 14,
                    color: 'text.secondary',
                    flexShrink: 0,
                    ml: 1,
                  }}
                >
                  ({getDynamicWorkflowCount(props.nodeId)})
                </Typography>
              </Tooltip>
            </Typography>

            <Box
              sx={{ ml: 1, display: 'flex', alignItems: 'center' }}
              onClick={handleIconContainerClick} // Add click handler to the container
            >
              {!label.includes('Home') && !label.includes('Trash') && (
                <Tooltip title="Click to see options." disableInteractive arrow placement="top">
                  <IconButton
                    onClick={handleIconClick}
                    size="small"
                    sx={{
                      padding: 0.5,
                      flexShrink: 0,
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <Iconify icon="eva:more-vertical-fill" width={16} height={16} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        }
      />
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        anchorEl={popover.anchorEl}
      >
        <MenuList>
          <Tooltip title="Create a new folder." arrow placement="left">
            <MenuItem onClick={handleCreateFolderClick}>
              <Iconify icon="fa6-solid:square-plus" />
              Create Folder
            </MenuItem>
          </Tooltip>

          <Tooltip title="Change the folder's name." arrow placement="left">
            <MenuItem onClick={handleRenameFolderClick}>
              <Iconify icon="fluent:rename-16-filled" />
              Rename
            </MenuItem>
          </Tooltip>

          <Tooltip title="Share the folder with others." arrow placement="left">
            <MenuItem
              onClick={handleNavigateToTeamMembers}
            >
              <Iconify icon="jam:share-alt-f" />
              Share Folder
            </MenuItem>
          </Tooltip>
          <Divider style={{ borderStyle: 'dashed' }} />

          <Tooltip
            title="Delete the folder and move the workflow to the trash."
            arrow
            placement="left"
          >
            <MenuItem onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      {/* AddRenameFolderDialog */}
      <AddRenameFolderDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        title={dialogTitle}
        actionLabel={dialogMode === 'create' ? 'Create' : 'Update'}
        mode={dialogMode}
        initialFolderName={dialogMode === 'rename' ? selectedFolder : ''}
        folderOptions={folderOptions}
        onAction={handleDialogAction}
      />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Do you really want to delete the folder?"
        content={
          <>
            Note that when a folder is deleted its email lists are moved to the home folder.{' '}
            <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />

          </>
        }
        action={
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        }
      />

    </>
  );

})(({ theme }) => ({
  color: theme.palette.grey[800],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.8, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '14px',
      fontWeight: 500,
      width: '100%',
      '& > svg': {
        marginRight: theme.spacing(1),
      },
    },
  },

  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${varAlpha(theme.vars.palette.text.primaryChannel, 0.4)}`,
  },
}));

const CustomStyling = ({ onTrashClick, onHomeClick }) => (
  <>
    <RichTreeView
      aria-label="customized"
      items={ITEMS}
      sx={{ overflowX: 'hidden', width: 1 }}
      slots={{
        item: (props) => (
          <StyledTreeItem {...props} onTrashClick={onTrashClick} onHomeClick={onHomeClick} />
        ),
      }}
    />

    <Divider sx={{ borderStyle: 'dashed', my: 1, mt: 2 }} />

    <RichTreeView
      aria-label="customized"
      items={TRASHFOLDER}
      sx={{ overflowX: 'hidden', width: 1 }}
      slots={{
        item: (props) => (
          <StyledTreeItem {...props} onTrashClick={onTrashClick} onHomeClick={onHomeClick} />
        ),
      }}
    />
  </>
);

const FolderSection = memo(({ onTrashClick, onHomeClick, }) => {
  const createFolder = useBoolean();
  const [folderOptions] = useState([
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
  ]); // Example folder options


  const handleDialogAction = (data) => {

  };

  return (
    <Card sx={{ pl: 3, pr: 3, pt: 3, pb: 3 }}>
      <Typography variant="h6">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tooltip
            disableInteractive
            title={
              <div style={{ textAlign: 'center' }}>
                You can create folders and manage connections within them.
              </div>
            }
            arrow
            placement="top"
          >
            <span>Folders</span>
          </Tooltip>

          <Tooltip title="Create a new folder." disableInteractive arrow placement="top">
            <Button
              sx={{
                mr: 1,
                mb: 1,
                p: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 0,
              }}
              onClick={createFolder.onTrue}
              color="primary"
              variant="contained"
            >
              <Iconify icon="fa6-solid:plus" />
            </Button>
          </Tooltip>
        </Box>
      </Typography>

      <Divider sx={{ borderStyle: 'dashed', mb: 2, mt: 1 }} />

      <CustomStyling onTrashClick={onTrashClick} onHomeClick={onHomeClick} />

      {/* <CreateFolderDialog open={createFolder.value} onClose={createFolder.onFalse} /> */}

      <AddRenameFolderDialog
        open={createFolder.value}
        onClose={createFolder.onFalse}
        title="Create Folder"
        actionLabel="Create"
        mode="create"
        initialFolderName=""
        folderOptions={folderOptions}
        onAction={handleDialogAction}
      />

    </Card>
  );
});

FolderSection.displayName = 'FolderSection';

export { FolderSection };
