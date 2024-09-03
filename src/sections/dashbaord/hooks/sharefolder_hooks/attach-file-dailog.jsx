import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  Alert,
  Divider,
  Tooltip,
  MenuItem,
  Snackbar, 
  TextField,
  Typography,
  useMediaQuery,
  FormControlLabel
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

// ----------------------------------------------------------------------

export function AttachFileDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const [contactlist, setContatList] = useState('text');

  const handleChangeContactList = useCallback((event) => {
    setContatList(event.target.value);
  }, []);

  const CONTACTLISTS = [
    { value: 'text', label: 'Text File' },
    { value: 'image', label: 'Image File' },
    { value: 'Video', label: 'Video File' },
    { value: 'Doc', label: 'Document File(pdf, word, doc)' },
  ];
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const handleFileUpload = (file) => {
    if (file) {
      setIsFileUploaded(true);
    }
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
          Attach File{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Tooltip title="Select file type from here." arrow placement="top">
          <TextField
            sx={{ width: '100%'  ,mt:1}}
            variant="outlined"
            select
            fullWidth
            label="Select File Type (Required)"
            value={contactlist}
            onChange={handleChangeContactList}
            helperText="Choose file type."
            InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
            inputProps={{ id: `outlined-select-currency-label` }}
          >
            {CONTACTLISTS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </Tooltip>
          
          <TextField
            sx={{ width: '100%' }}
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Enter url or choose file."
            helperText={
              <span>
                Choose file or enter the file URL..{' '}
                <Link href="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </Link>
              </span>
            }
          />
           <Typography
              sx={{ fontWeight: '600', width: '100%', mr: 0, ml: 0,mb: 3,mt: 3 }}
            >
              OR
            </Typography>
            <Tooltip title="Click here to upload file." arrow placement="top">
            <FormControlLabel
              control={
                <FileUpload onFileUpload={handleFileUpload} />
                // <Upload/>
              }
              sx={{ width: '100%', mr: 0, ml: 0 }}
            />

            {isFileUploaded && (
              <FormControlLabel
                control={
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ width: '100%' }}>
                      <FormControlLabel
                        control={
                          <Divider
                            sx={{
                              borderStyle: 'dashed',
                              fontWeight: '600',
                              width: '100%',

                              mr: 2,
                              ml: 0,
                            }}
                          />
                        }
                        sx={{ width: '100%', mr: 0, ml: 0 }}
                      />
                      
                      
                      
                      
                    </Box>
                   
                  </Box>
                }
                sx={{ width: '100%', mr: 0, ml: 0 }}
              />
            )}
            </Tooltip>
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
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
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
          File Uploaded Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
