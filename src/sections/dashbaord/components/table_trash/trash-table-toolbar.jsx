import { toast } from 'sonner';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Popover,
  Tooltip,
  Divider,
  MenuItem,
  MenuList,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { MoveToFolderPopover } from '../options-components/move-to-folder-dailog';

export function OrderTableToolbar({
  filters,
  onResetPage,
  emptyTrash,
  numSelected,
}) {
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
  const confirmDelete = useBoolean(); // For ConfirmDialog
  const moveFolderPopover = useBoolean(); // For MoveToFolderPopover

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
  };

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
  };

  const handleDeleteRows = () => {
    confirmDelete.onFalse(); // Close the dialog after deleting
    toast.success('Workflow permanently deleted successfully!');

  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems="center"
        direction={isBelow600px ? 'column' : 'row'}
        sx={{ p: 2.5, width: '100%' }}
      >
        {/* Search by workflow name */}
        <Box sx={{ width: '100%' }}>
          <TextField
            disabled={emptyTrash} // Disabled When No Workflow Created!
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName} // Handle changes for search input
            placeholder="Search by workflow name..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Select Action Button */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'row',
            width: isBelow600px ? '100%' : 'auto',
            justifyContent: 'flex-end', // Aligns buttons to the right
          }}
        >
          {numSelected > 0 && (
            <Tooltip title="Click here to move and delete workflows." arrow placement="top">
              <Button
                endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                onClick={handlePopoverOpen}
                color="primary"
                sx={{
                  ...buttonStyle,
                  width: isBelow600px ? '155px' : '155px', // Fixed width for "Select Action"
                }}
              >
                Select Action
              </Button>
            </Tooltip>
          )}
        </Box>
      </Stack>

{/* Select Action Button MenuList */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuList>
          {/* Move To Folder */}
          <Tooltip title="Move the workflow to an existing folder." arrow placement="left">
            <MenuItem
              onClick={() => {
                moveFolderPopover.onTrue();
                handlePopoverClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="fluent:folder-move-16-filled" sx={{ mr: 2 }} />
              Move To Folder
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />

          {/* Delete Workflow */}
          <Tooltip title="Delete the workflow permanently." arrow placement="left">
            <MenuItem
              onClick={() => {
                confirmDelete.onTrue();
                handlePopoverClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
              Delete Permanently
            </MenuItem>
          </Tooltip>
        </MenuList>
      </Popover>

      <MoveToFolderPopover open={moveFolderPopover.value} onClose={moveFolderPopover.onFalse} />

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Do you really want to delete the selected workflows?"
        content="Workflow(s) once deleted cannot be restored in any case."
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRows}>
            Delete Permanently
          </Button>
        }
      />
    </>
  );
}
