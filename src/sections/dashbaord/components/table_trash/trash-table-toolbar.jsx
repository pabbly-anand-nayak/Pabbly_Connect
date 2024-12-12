import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Popover,
  Tooltip,
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
  onClose,
  dateError,
  publish,
  onChangePublish,
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
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems="center"
        direction={isBelow600px ? 'column' : 'row'}
        sx={{ p: 2.5, width: '100%' }}
      >
        <Box sx={{ width: '100%' }}>
          <TextField
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

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuList>
          {[
            { value: 'published', label: 'Move Workflow', icon: 'fluent:folder-move-16-filled' },
            { value: 'draft', label: 'Delete Permanently', icon: 'solar:trash-bin-trash-bold' },
          ].map((option) => (
            <Tooltip
              key={option.value}
              title={
                option.value === 'published'
                  ? 'Move the workflow to an existing folder.'
                  : option.value === 'draft'
                    ? 'Delete the workflow permanently.'
                    : ''
              }
              arrow
              placement="left"
            >
              <MenuItem
                selected={option.value === publish}
                onClick={() => {
                  handlePopoverClose();
                  if (option.value === 'draft') {
                    confirmDelete.onTrue(); // Open ConfirmDialog on 'Delete Permanently'
                  } else if (option.value === 'published') {
                    moveFolderPopover.onTrue(); // Open MoveToFolderPopover
                  } else {
                    onChangePublish(option.value);
                  }
                }}
              >
                {option.icon && (
                  <Iconify
                    icon={option.icon}
                    width={20}
                    height={20}
                    sx={{ mr: 2, color: 'inherit' }}
                  />
                )}
                {option.label}
              </MenuItem>
            </Tooltip>
          ))}
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
