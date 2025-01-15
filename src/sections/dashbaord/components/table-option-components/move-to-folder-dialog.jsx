import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import {
  Divider,
  Tooltip,
  TextField,
  IconButton,
  Autocomplete,
  useMediaQuery,
  DialogContent,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function MoveToFolderDialog({ folderName, open, onClose, ...other }) {
  const [categoryList, setCategoryList] = useState(folderName || ''); // Initialize with passed folderName
  const [categoryError, setCategoryError] = useState(false);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  // Update useEffect to set initial value when dialog opens
  useEffect(() => {
    if (open && folderName) {
      setCategoryList(folderName);
    }
  }, [open, folderName]);

  const handleChangeCategoryList = useCallback((event, value) => {
    setCategoryList(value);
    if (value) {
      setCategoryError(false);
    }
  }, []);

  const handleMoveToFolder = () => {
    if (!categoryList) {
      setCategoryError(true);
      return;
    }
    toast.success('The workflow(s) moved successfully.');
    onClose();
  };

  const handleDialogClose = () => {
    setCategoryList(folderName || ''); // Reset to initial folder name
    setCategoryError(false);
    onClose();
  };


  const folder = [
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
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
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
  ];


  return (
    <Dialog
      open={open}
      fullWidth
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      {...other}
    >
      <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
        Move To Folder
        <IconButton
          onClick={handleDialogClose}
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        >
          <Iconify icon="uil:times" />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

      <DialogContent>
        <Autocomplete
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '14px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '14px',
            },
            mt: 1.2,
          }}
          options={folder}
          value={categoryList}
          onChange={handleChangeCategoryList}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <Tooltip
                  title="Select folder to which the workflow needs to be moved."
                  arrow
                  placement="top"
                >
                  <span>Select Folder</span>
                </Tooltip>
              }
              placeholder="Select folder"
              helperText={
                <span>
                  {categoryError ? (
                    'Please select a required folder.'
                  ) : (
                    <>
                      Select the folder or subfolder where you want to move the workflow(s).{' '}
                      <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />
                    </>
                  )}
                </span>
              }
              error={categoryError}
            />
          )}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleMoveToFolder}
          variant="contained"
          color="primary"
          disabled={false}
        >
          Move
        </Button>
      </DialogActions>
    </Dialog>
  );
}