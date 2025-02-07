import { toast } from 'sonner';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  MenuList,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';

import { showAccessBox } from 'src/redux/slices/accessSlice';

import { Iconify } from 'src/components/iconify';
import { AnimateLogo1 } from 'src/components/animate';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

export function OrderTableRow({
  row,
  sharedwithyouteammemberIndex,
  selected,
  onSelectRow,
  serialNumber,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teammembername = [
    'Ayush Bisen',
    'Ankit Mandli',
    'Nikhil Patel',
    'Rajendra Jatav',
    'Anand Nayak',
    'Hardik Pradhan',
    'Abhishek Nagr',
    // Add more flow names as needed
  ];

  const handleAccessNowClick = () => {
    setIsAnimating(true);
    const selectedTeammemberName =
      teammembername[sharedwithyouteammemberIndex % teammembername.length];

    setTimeout(() => {
      setIsAnimating(false);
      dispatch(showAccessBox); // Pass the team member name
      navigate('/app');
    }, 2000);
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmDelete = () => {
    setConfirmDelete(true);
    handleClosePopover();
  };

  // Custom tooltips for specific rows
  const getWorkflowTooltip = (rowData) => {
    if (rowData.id === 'workflow-0') {
      return `Folder Name: Client (A), Workflow Name: ${rowData.workflows_folders_you_shared}`;
    }
    if (rowData.id === 'workflow-4') {
      return `Folder Name: Main Folder', Workflow Name: ${rowData.workflows_folders_you_shared}`;
    }

    return `Workflow Name: ${rowData.workflows_folders_you_shared}`;
  };

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleDeleteRow = () => {
    setConfirmDelete(false);
    /* Delete Success Snackbar */
    toast.success('Access Removed Successfully!');
  };

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <>
      {isAnimating && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#f1f7fb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999999999, // High z-index to cover the entire page
          }}
        >
          <AnimateLogo1
            sx={{
              zIndex: 99999999999, // High z-index to cover the entire page
            }}
          />
        </Box>
      )}
      <TableRow
        hover
        selected={selected}
        sx={{
          '&:hover .copy-button': {
            opacity: 1,
          },
        }}
      >
        {/* checkbox */}
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Tooltip title="Select Row" arrow placement="top">
            <Checkbox
              checked={selected}
              onClick={onSelectRow}
              inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
            />
          </Tooltip>
        </TableCell>

        {/* Serial Number */}
        <TableCell width={88}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box component="span">
                <Typography
                  sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}
                >
                  <Tooltip title={`Serial Number: ${serialNumber}`} placement="top" arrow>
                    <span>{serialNumber}</span>
                  </Tooltip>
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        {/* Email & Workflows or Folders Shared By  */}
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                // color: '#078dee',
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Box
                component="span"
                sx={{
                  maxWidth: { xs: '530px', md: '800px' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Tooltip title={`Email: ${row.email}`} placement="top" arrow>
                  <span>{row.email}</span>
                </Tooltip>
              </Box>

              <Typography sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                <Tooltip title={getWorkflowTooltip(row)} placement="bottom" arrow>
                  <Box
                    component="span"
                    sx={{
                      color: 'text.disabled',
                      maxWidth: {
                        xs: '450px', // For extra small screens
                        sm: '650px', // For small screens
                        md: '700px', // For medium screens
                        lg: '750px', // For large screens
                        xl: '950px', // For extra large screens
                      },
                      display: 'inline-block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span> {row.workflows_folders_you_shared}</span>
                  </Box>
                </Tooltip>
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        {/* Shared On */}
        <TableCell width={240} align="right">
          <Stack width={200} spacing={1} direction="column" alignItems="flex-end">
            <Box
              // width={180}
              sx={{
                maxWidth: { xs: '110px', md: '110px', lg: '110px' },
              }}
            >
              <Tooltip
                title="Click here to access workflow(s) or folder(s) shared with you."
                arrow
                placement="top"
                disableInteractive
              >
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    // size="small"
                    onClick={handleAccessNowClick}
                    disabled={isAnimating} // Optionally disable button during animation
                  >
                    Access Now
                  </Button>
                </Box>
              </Tooltip>
            </Box>
          </Stack>
        </TableCell>

        {/* Options */}
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Click to see options." arrow placement="top">
            <IconButton color={anchorEl ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="Remove access to shared workflows or folders." arrow placement="left">
            <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Remove Access
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        disabled={isLoading}
        title="Do you wish to remove access?"
        content="You won't be able to revert this!"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRow(); // revoking tasks
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Remove Access'}
          </Button>
        }
      />
    </>
  );
}
