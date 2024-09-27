import React, { useState } from 'react';
// import { ConfirmDialog } from 'src/components/custom-dialog';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import {
  Box,
  Card,
  Button,
  Tooltip,
  Divider,
  MenuItem,
  MenuList,
  IconButton,
  Typography,
  CardContent,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha, stylesMode } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

import { CreateFolderDialog } from '../../hooks/create_folder-dailog';
import { RenameFolderDialog } from '../../hooks/rename_folder-dailog';
import { QuickShareDialog } from '../../hooks/sharefolder_hooks/quick-share-dailog';

const countChildren = (item) =>
  item.children?.length ||
  0 + (item.children?.reduce((acc, child) => acc + countChildren(child), 0) || 0);

const truncateLabel = (label, maxLength = 25) =>
  label.length > maxLength ? `${label.slice(0, maxLength)}...` : label;

const processItems = (items) =>
  items.map((item) => ({
    ...item,
    label: `${truncateLabel(item.label)} (${countChildren(item)})`,
    children: item.children ? processItems(item.children) : [],
  }));

const HOMEITEMS = processItems([{ id: '25', label: 'Home', children: [] }]);

const ITEMS = processItems([
  { id: '0', label: 'Pabbly Connect', children: [] },
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

const ITEMS2 = processItems([{ id: '24', label: 'Trash', children: [] }]);

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.vars.palette.grey[800],
  [stylesMode.dark]: { color: theme.vars.palette.grey[200] },
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.8, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '14px',
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

const CustomTreeItem = React.forwardRef((props, ref) => {
  const { label, expanded, onToggle, id, onHomeClick, hideEllipsis, ...other } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [quickShareDialogOpen, setQuickShareDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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
    setConfirmDeleteOpen(true);
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

  const handleItemClick = (event) => {
    if (id === '0') {
      onHomeClick();
    } else {
      onToggle?.(event);
    }
  };

  return (
    <>
      <StyledTreeItem
        ref={ref}
        label={
          <>
            <Box sx={{ mr: 'auto', cursor: 'pointer', width: '100%' }} onClick={handleItemClick}>
              <span>{label}</span>
            </Box>
            {!hideEllipsis && id !== '0' && (
              <IconButton onClick={handleIconClick} size="small">
                <Iconify icon="eva:more-vertical-fill" width={16} height={16} sx={{ ml: 'auto' }} />
              </IconButton>
            )}

            <CustomPopover
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
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
                    <Iconify icon="fluent:rename-16-filled" />
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
        {...other}
      />

      <CreateFolderDialog open={folderDialogOpen} onClose={handleFolderDialogClose} />
      <RenameFolderDialog open={renameDialogOpen} onClose={handleRenameFolderClose} />
      <QuickShareDialog open={quickShareDialogOpen} onClose={handleQuickShareDialogClose} />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmDeleteOpen}
        onClose={handleConfirmDeleteClose}
        title="Do you really want to delete this folder ?"
        content={
          <>
            Note that upon deleting a folder, its subfolders are also deleted, and workflows are
            moved to the home folder.{' '}
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

export default function FolderCard({
  sx,
  icon,
  title,
  total,
  color = 'warning',
  onTrashClick,
  onHomeClick,
  ...other
}) {
  const theme = useTheme();
  const folderDialog = useBoolean();

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        height: '100%',
        backgroundColor: 'common.white',
        width: { xs: '100%', md: '354.2px' },
        borderRadius: '16px',
        p: 0,
        ...sx,
      }}
      {...other}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2.6,
          }}
        >
          <Box
            sx={{
              minHeight: '100%',
              width: '100%',
              borderBottom: '1px dashed',
              borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2.6,
              }}
            >
              <Typography variant="h6" component="div">
                Folders
              </Typography>

              <Tooltip title="Create a new folder." arrow placement="top">
                <Button
                  sx={{
                    mb: '0px',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: 0,
                  }}
                  onClick={folderDialog.onTrue}
                  maxWidth
                  color="inherit"
                  variant="contained"
                >
                  <Iconify icon="fa6-solid:plus" />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box sx={{ minHeight: '100%', width: '100%' }}>
          <RichTreeView
            defaultExpandedItems={['25']}
            sx={{ overflowX: 'hidden', minHeight: 'auto' }}
            slots={{
              item: (props) => <CustomTreeItem {...props} onHomeClick={onHomeClick} />,
            }}
            items={HOMEITEMS}
          />
          <RichTreeView
            defaultExpandedItems={['0']}
            sx={{ overflowX: 'hidden', minHeight: 'auto' }}
            slots={{
              item: (props) => <CustomTreeItem {...props} onHomeClick={onHomeClick} />,
            }}
            items={ITEMS}
          />
        </Box>

        <Box
          sx={{
            minHeight: '100%',
            width: '100%',
            pt: '21px',
            mt: '21px',
            borderTop: '1px dashed',
            borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
          }}
        >
          <RichTreeView
            onClick={onTrashClick}
            defaultExpandedItems={['24']}
            sx={{
              overflowX: 'hidden',
              minHeight: 'auto',
              width: '100%',

              // justifyContent: 'space-between',
            }}
            slots={{
              item: (props) => (
                <CustomTreeItem
                  {...props}
                  hideEllipsis
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          flexGrow: 1,
                          mr: 'auto',
                        }}
                      >
                        {props.label}
                      </Typography>

                      <Iconify
                        mr="3.1px"
                        icon="solar:trash-bin-trash-bold"
                        style={{
                          height: '18px',
                          color: '#6c757d',
                        }}
                      />
                    </Box>
                  }
                  onHomeClick={onHomeClick}
                />
              ),
            }}
            items={ITEMS2}
          />
        </Box>
      </CardContent>
      <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
    </Card>
  );
}
