import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import {
  Box,
  Chip,
  Alert,
  Button,
  Dialog,
  Divider,
  Tooltip,
  Snackbar,
  Checkbox,
  Collapse,
  TextField,
  DialogTitle,
  Autocomplete,
  useMediaQuery,
  DialogActions,
  DialogContent,
  ListSubheader,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function TeamMemberDialog({ open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});

  const handleAdd = () => {
    setSnackbarOpen(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const folders = [
    {
      name: 'SELECT FOLDERS',
      items: ['Folder 1', 'Folder 2', 'Folder 3', 'Folder 4', 'Folder 5', 'Folder 6'],
    },
    {
      name: 'SELECT WORKFLOWS',
      items: [
        'Workflow 1',
        'Workflow 2',
        'Workflow 3',
        'Workflow 4',
        'Workflow 5',
        'Workflow 6',
        'Workflow 7',
        'Workflow 8',
      ],
    },
  ];

  const options = folders.flatMap((folder) => [
    { type: 'folder', name: folder.name },
    ...folder.items.map((item) => ({ type: 'item', name: item, folder: folder.name })),
  ]);

  const handleAutocompleteChange = (event, newValue, reason) => {
    if (reason === 'selectOption' || reason === 'removeOption') {
      if (newValue.length > 0) {
        const clickedOption = newValue[newValue.length - 1];
        setSelectedItems((prevItems) => {
          const isItemSelected = prevItems.some((item) => item.name === clickedOption.name);
          if (isItemSelected) {
            return prevItems.filter((item) => item.name !== clickedOption.name);
          }
          return [...prevItems, clickedOption];
        });
      } else if (newValue.length === 0) {
        setSelectedItems([]);
      }
    } else if (reason === 'clear') {
      setSelectedItems([]);
    }
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Add Team Member
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Pabbly Account Email Address"
              helperText={
                <span>
                  Ensure that the email address you are entering has already a Pabbly account.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
                </span>
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Enter the Pabbly account email address of the team to which workflow(s) or folder(s) will be shared."
                      arrow
                      placement="top"
                      sx={{ fontSize: '16px' }}
                    >
                      <Iconify
                        icon="material-symbols:info-outline"
                        style={{ width: 20, height: 20 }}
                      />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            {/* <Autocomplete
              multiple
              disableCloseOnSelect
              options={options}
              groupBy={(option) => (option.type === 'item' ? option.folder : '')}
              getOptionLabel={(option) => option.name}
              renderGroup={(params) => (
                <li key={params.key}>
                  <ListSubheader
                    component="div"
                    style={{
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleFolder(params.group)}
                  >
                    {params.group === 'SELECT FOLDERS' || params.group === 'SELECT WORKFLOWS' ? (
                      <Iconify
                        icon={
                          expandedFolders[params.group] ? 'mdi:chevron-down' : 'mdi:chevron-right'
                        }
                        style={{ marginRight: 8 }}
                      />
                    ) : null}
                    {params.group}
                  </ListSubheader>
                  <Collapse in={expandedFolders[params.group] !== false}>
                    <ul>{params.children}</ul>
                  </Collapse>
                </li>
              )}
              renderOption={(props, option, { selected }) => {
                if (option.type === 'folder') return null;
                return (
                  <li {...props}>
                    <Checkbox
                      checked={selectedItems.some((item) => item.name === option.name)}
                      size="small"
                      disableRipple
                    />
                    {option.name}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Workflow/Folder" placeholder="Select" />
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.name}
                    label={option.name}
                    size="small"
                    variant="soft"
                  />
                ))
              }
              value={selectedItems}
              onChange={handleAutocompleteChange}
            /> */}

            <Autocomplete
              multiple
              disableCloseOnSelect
              options={options}
              groupBy={(option) => (option.type === 'item' ? option.folder : '')}
              getOptionLabel={(option) => option.name}
              renderGroup={(params) => (
                <li key={params.key}>
                  <ListSubheader
                    component="div"
                    style={{
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleFolder(params.group)}
                  >
                    {params.group === 'SELECT FOLDERS' || params.group === 'SELECT WORKFLOWS' ? (
                      <Iconify
                        icon={
                          expandedFolders[params.group] ? 'mdi:chevron-down' : 'mdi:chevron-right'
                        }
                        style={{ marginRight: 8 }}
                      />
                    ) : null}
                    {params.group}
                  </ListSubheader>
                  <Collapse in={expandedFolders[params.group] !== false}>
                    <ul>{params.children}</ul>
                  </Collapse>
                </li>
              )}
              renderOption={(props, option, { selected }) => {
                if (option.type === 'folder') return null;
                return (
                  <li {...props}>
                    <Checkbox
                      checked={selectedItems.some((item) => item.name === option.name)}
                      size="small"
                      disableRipple
                    />
                    {option.name}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Workflow/Folder"
                  placeholder="Select"
                  helperText={
                    <span>
                      Select workflows or folders to be shared.{' '}
                      <Link href="#" style={{ color: '#078DEE' }} underline="always">
                        Learn more
                      </Link>
                    </span>
                  }
                />
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.name}
                    label={option.name}
                    size="small"
                    variant="soft"
                  />
                ))
              }
              value={selectedItems}
              onChange={handleAutocompleteChange}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Team Member Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
