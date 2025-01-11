import React from 'react';
import PropTypes from 'prop-types';

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
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

import { CreateFolderDialog } from 'src/sections/dashbaord/components/foldercard/folder-options-components/create_folder-dailog';


const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.vars.palette.grey[800],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.8, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '14px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${varAlpha(theme.vars.palette.text.primaryChannel, 0.4)}`,
  },
}));

const CustomTreeItem = React.forwardRef((props, ref) => {
  const {
    label,
    fullLabel,
    hideEllipsis,
    onCreateFolder,
    onRenameFolder,
    onDeleteFolder,
    onShareFolder,
    ...other
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleIconClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <StyledTreeItem
      ref={ref}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Tooltip title={`Folder Name: ${fullLabel || label}`} arrow>
            <Box sx={{ mr: 'auto', cursor: 'pointer' }}>{label}</Box>
          </Tooltip>
          {!hideEllipsis && (
            <IconButton size="small" onClick={handleIconClick}>
              <Tooltip title="Options" arrow>
                <Iconify icon="eva:more-vertical-fill" width={16} height={16} />
              </Tooltip>
            </IconButton>
          )}
          <CustomPopover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuList>
              <MenuItem onClick={onCreateFolder}>
                <Iconify icon="fa6-solid:square-plus" />
                Create Folder
              </MenuItem>
              <MenuItem onClick={onRenameFolder}>
                <Iconify icon="fluent:rename-16-filled" />
                Rename
              </MenuItem>
              <Divider />
              <MenuItem onClick={onShareFolder}>
                <Iconify icon="jam:share-alt-f" />
                Share Folder
              </MenuItem>
              <Divider />
              <MenuItem onClick={onDeleteFolder} sx={{ color: 'error.main' }}>
                <Iconify icon="solar:trash-bin-trash-bold" />
                Delete
              </MenuItem>
            </MenuList>
          </CustomPopover>
        </Box>
      }
      {...other}
    />
  );
});

CustomTreeItem.propTypes = {
  label: PropTypes.string.isRequired,
  fullLabel: PropTypes.string,
  hideEllipsis: PropTypes.bool,
  onCreateFolder: PropTypes.func,
  onRenameFolder: PropTypes.func,
  onDeleteFolder: PropTypes.func,
  onShareFolder: PropTypes.func,
};

export default function FoldersCard({
  items,
  trashItems,
  onTrashClick,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  onShareFolder,
  sx,
}) {
  const folderDialog = useBoolean();

  return (
    <Card sx={{ p: 0, ...sx }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Folders</Typography>
          <Button onClick={folderDialog.onTrue} variant="contained" color="primary">
            Create Folder
          </Button>
        </Box>

        <RichTreeView
          items={items}
          slots={{
            item: (props) => (
              <CustomTreeItem
                {...props}
                onCreateFolder={onCreateFolder}
                onRenameFolder={onRenameFolder}
                onDeleteFolder={onDeleteFolder}
                onShareFolder={onShareFolder}
              />
            ),
          }}
        />

        <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed', borderColor: 'grey.500' }}>
          <RichTreeView
            items={trashItems}
            onClick={onTrashClick}
            slots={{
              item: (props) => <CustomTreeItem {...props} hideEllipsis />,
            }}
          />
        </Box>
      </CardContent>
      <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
    </Card>
  );
}

FoldersCard.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  trashItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onTrashClick: PropTypes.func,
  onCreateFolder: PropTypes.func,
  onRenameFolder: PropTypes.func,
  onDeleteFolder: PropTypes.func,
  onShareFolder: PropTypes.func,
};
