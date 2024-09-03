import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { Box, Link, Button, Tooltip, Divider, MenuItem, MenuList, IconButton } from '@mui/material';

import { varAlpha, stylesMode } from 'src/theme/styles';

import { ConfirmDialog } from 'src/components/custom-dialog';

import { CreateFolder } from 'src/sections/dashbaord/hooks/create_folder';
import { RenameFolder } from 'src/sections/dashbaord/hooks/rename_folder';
import { QuickShareDialog } from 'src/sections/dashbaord/hooks/sharefolder_hooks/quick-share-dailog'; // Import ConfirmDialog

import { Iconify } from '../iconify';
import { CustomPopover } from '../custom-popover';

// Function to count children recursively
const countChildren = (item) =>
  item.children?.length ||
  0 + (item.children?.reduce((acc, child) => acc + countChildren(child), 0) || 0);

// Function to truncate label
const truncateLabel = (label, maxLength = 25) =>
  label.length > maxLength ? `${label.slice(0, maxLength)}...` : label;

// Process items by adding count and truncating labels
const processItems = (items) =>
  items.map((item) => ({
    ...item,
    label: `${truncateLabel(item.label)} (${countChildren(item)})`,
    children: item.children ? processItems(item.children) : [],
  }));

// Data
const ITEMS = processItems([
  { id: '0', label: 'Home', children: [] },
  {
    id: '1',
    label: 'Main Folder',
    children: [
      { id: '2', label: 'Child Folder 1 - Subscription Billing' },
      {
        id: '3',
        label: 'Child Folder 2',
        children: [
          { id: '6', label: 'Grand child 1' },
          {
            id: '7',
            label: 'Grand child 2',
            children: [
              { id: '9', label: 'Folder 1' },
              { id: '10', label: 'Folder 2' },
              { id: '11', label: 'Folder 3' },
            ],
          },
          { id: '8', label: 'Grand child 3' },
        ],
      },
      { id: '4', label: 'Child Folder 3' },
      { id: '5', label: 'Child Folder 4' },
    ],
  },
  { id: '12', label: 'Pabbly Subscription Billing', children: [] },
  { id: '13', label: 'Pabbly Email Marketing', children: [] },
  { id: '14', label: 'Pabbly Form Builder', children: [] },
  { id: '15', label: 'Pabbly Email Verification', children: [] },
  { id: '16', label: 'Pabbly Hook', children: [] },
  {
    id: '17',
    label: 'Client (A)',
    children: [
      {
        id: '19',
        label: 'Child Folder 1 - Subscription Billing',
        children: [
          { id: '20', label: 'Grand child 1' },
          {
            id: '21',
            label: 'Grand child 2',
            children: [
              { id: '22', label: 'Folder 1' },
              { id: '23', label: 'Folder 2' },
            ],
          },
        ],
      },
    ],
  },
]);

// Styled TreeItem component
const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.vars.palette.grey[800],
  [stylesMode.dark]: { color: theme.vars.palette.grey[200] },
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.8, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '0.8rem',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      '& > svg': {
        marginRight: theme.spacing(1),
      },
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: '50%',
    backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.25),
    [stylesMode.dark]: {
      color: theme.vars.palette.primary.contrastText,
      backgroundColor: theme.vars.palette.primary.dark,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${varAlpha(theme.vars.palette.text.primaryChannel, 0.4)}`,
  },
}));

// Custom TreeItem component with Iconify icons and menu
const CustomTreeItem = React.forwardRef((props, ref) => {
  const { label, expanded, onToggle, id, ...other } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [QuickShareDialogOpen, setQuickShareDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State for delete confirmation

  const handleIconClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleCreateFolderClick = (event) => {
    setFolderDialogOpen(true);
    handleMenuClose(event);
  };

  const handleRenameFolderClick = (event) => {
    setRenameDialogOpen(true);
    handleMenuClose(event);
  };

  const handleQuickShareDialogClick = (event) => {
    setQuickShareDialogOpen(true);
    handleMenuClose(event);
  };

  const handleDeleteClick = (event) => {
    setConfirmDeleteOpen(true); // Open the confirm dialog
    handleMenuClose(event);
  };

  const handleFolderDialogClose = () => {
    setFolderDialogOpen(false);
  };

  const handleRenameFolderClose = () => {
    setRenameDialogOpen(false);
  };

  const handleQuickShareDialogClose = () => {
    setQuickShareDialogOpen(false);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <StyledTreeItem
        ref={ref}
        label={
          <>
            <Box sx={{ mr: 'auto' }}>
              <span>{label}</span>
            </Box>
            {id !== '0' && (
              <IconButton onClick={handleIconClick} size="small">
                <Iconify
                  icon="eva:more-vertical-fill"
                  width={16}
                  height={16}
                  sx={{ ml: 'auto' }}
                />
              </IconButton>
            )}
            <CustomPopover
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PopperProps={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 8],
                    },
                  },
                ],
              }}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 1,
                  boxShadow: 3,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    borderWidth: '6px',
                    borderStyle: 'solid',
                    borderColor: 'transparent transparent white transparent',
                    transform: 'translateY(-100%) translateX(100%)',
                    transformOrigin: 'bottom left',
                  },
                },
              }}
            >
              <MenuList>
                <Tooltip title="Click here to create a new folder." arrow placement="right">
                  <MenuItem onClick={handleCreateFolderClick}>
                    <Iconify icon="fa6-solid:square-plus" />
                    Create Folder
                  </MenuItem>
                </Tooltip>
                <Tooltip title="Click here to rename the folder." arrow placement="right">
                  <MenuItem onClick={handleRenameFolderClick}>
                    <Iconify icon="solar:pen-bold" />
                    Rename
                  </MenuItem>
                </Tooltip>
                <Tooltip title="Click here to share the folder." arrow placement="right">
                  <MenuItem onClick={handleQuickShareDialogClick}>
                    <Iconify icon="jam:share-alt-f" />
                    Share
                  </MenuItem>
                </Tooltip>
                <Divider style={{ borderStyle: 'dashed' }} />
                <Tooltip title="Click here to delete this folder." arrow placement="right">
                  <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                  </MenuItem>
                </Tooltip>
              </MenuList>
            </CustomPopover>
          </>
        }
        onToggle={(event) => {
          if (!anchorEl) {
            onToggle?.(event);
          }
        }}
        expanded={expanded}
        {...other}
      />
      <CreateFolder open={folderDialogOpen} onClose={handleFolderDialogClose} />
      <RenameFolder open={renameDialogOpen} onClose={handleRenameFolderClose} />
      <QuickShareDialog open={QuickShareDialogOpen} onClose={handleQuickShareDialogClose} />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmDeleteOpen}
        onClose={handleConfirmDeleteClose}
        title="Do you really want to delete this folder ?"
        content={
          <>
            Note that upon deleting a folder, its subfolders are also deleted, and workflows are moved to the home folder.{' '}
            <Link href="/learn-more" target="_blank" rel="noopener noreferrer">
              Learn more
            </Link>
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={handleConfirmDeleteClose}>
            Delete
          </Button>
        }
      />
    </>
  );
});

export function CustomStyling() {
  return (
    <RichTreeView
      defaultExpandedItems={['0']}
      sx={{ overflowX: 'hidden', minHeight: 'auto' }}
      slots={{ item: CustomTreeItem }}
      items={ITEMS}
    />
  );
}
