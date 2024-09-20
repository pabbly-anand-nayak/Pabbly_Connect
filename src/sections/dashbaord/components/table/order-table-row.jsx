import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Button, Tooltip, Divider, Checkbox, AvatarGroup } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const confirmDelete = useBoolean(); // Declare confirmDelete for delete confirmation
  const collapse = useBoolean();
  const popover = usePopover();

  const [showToken, setShowToken] = useState(false);

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Tooltip title="Select this contact" arrow placement="top">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip>
      </TableCell>

      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title={`Workflow is ${row.status}`} placement="top" arrow>
              <Label
                variant="soft"
                color={
                  (row.status === 'active' && 'success') ||
                  (row.status === 'inactive' && 'error') ||
                  'success'
                }
              >
                {row.status}
              </Label>
            </Tooltip>
            <Tooltip
              title="Workflow Created: Aug 13, 2024 14:40:03, (UTC+00:00) America/Danmarkshavn"
              placement="bottom"
              arrow
            >
              <Box component="span" sx={{ color: 'text.disabled' }}>
                Aug 13, 2024 14:40:03
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={137}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Integrated applications" placement="top" arrow>
              <AvatarGroup total={2}>
                <Avatar
                  sx={{ padding: '6px', width: '26px', height: '26px', bgcolor: '#EDEFF2' }}
                  alt="app1"
                  src="public/assets/icons/app logo/pabbly_icon.png"
                />
                <Avatar
                  sx={{ padding: '6px', width: '26px', height: '26px', bgcolor: '#EDEFF2' }}
                  alt="app2"
                  src="public/assets/icons/app logo/goto-webinar.png"
                />
              </AvatarGroup>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={500}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title="Workflow Name: Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment"
              placement="top"
              arrow
            >
              <Box
                component="span"
                sx={{
                  width: 400, // adjust width as needed
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment
              </Box>
            </Tooltip>

            <Tooltip title="Folder Name: Home" placement="bottom" arrow>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                Home
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={450} align="right">
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title="This indicates the total number of tasks consumed."
              placement="top"
              arrow
            >
              <Box component="span" sx={{ alignSelf: 'end' }}>
                500 Tasks Consumed
              </Box>
            </Tooltip>
            <Tooltip
              title="This indicates the number of free tasks consumed."
              placement="bottom"
              arrow
            >
              <Box component="span" sx={{ color: 'text.disabled', alignSelf: 'end' }}>
                100 Free Tasks Consumed
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <ListItemText
                primary={`Verification Token: ${showToken ? '4545656565' : '●●●●●●●●●'}`}
                primaryTypographyProps={{ typography: 'body2' }}
              />
              <IconButton onClick={handleToggleToken}>
                <Iconify icon={showToken ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <ListItemText
                primary="Privacy Policy URL: https://www.pabbly.com/privacy-policy/"
                primaryTypographyProps={{ typography: 'body2' }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <ListItemText
                primary="Terms of Service URL: https://www.pabbly.com/terms-conditions/"
                primaryTypographyProps={{ typography: 'body2' }}
              />
            </Stack>
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="uis:toggle-on" />
            Enable Workflow
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="uis:toggle-off" />
            Disable Workflow
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit Workflow
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="fluent:rename-16-filled" />
            Rename
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="heroicons-solid:duplicate" />
            Clone
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="jam:share-alt-f" />
            Share
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="fluent:people-team-add-24-filled" />
            Add Team Members
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="fluent:folder-move-16-filled" />
            Move To Folder
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="mdi:clipboard-text-history" />
            Workflow History
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="material-symbols:data-info-alert-rounded" />
            Edit Log
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="mdi:timer" />
            Auto Re-Execution Settings
          </MenuItem>
          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="This will delete the workflow." arrow placement="left">
            <MenuItem
              onClick={() => {
                confirmDelete.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Do you really want to delete it?"
        content="Workflow once deleted will be moved to trash folder."
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
