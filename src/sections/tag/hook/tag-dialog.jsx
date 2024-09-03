import { React, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Link as RouterLink } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Box,
  Alert,
  Switch,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function TagDialog({ open, onClose }) {
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  const [customerJourney, setCustomerJourney] = useState(false);
  const [firstMessage, setFirstMessage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {}, 500);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={onClose}
        >
          Tag Contact{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Tag Name"
            helperText={
              <span>
                Pick a tag that.{' '}
                <RouterLink to="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </RouterLink>
              </span>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter webhook name here."
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px', // Adjust the font size as needed
                    }}
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
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
              Customer Journey
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <FormControlLabel
                sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                control={
                  <Switch
                    checked={customerJourney}
                    onChange={(e) => setCustomerJourney(e.target.checked)}
                    color="primary"
                  />
                }
                label={<Box component="span" sx={{ fontSize: '12px', color: '#637381', ml: 3 }}>
                Enable to track this tag in your customers&apos; journey
              </Box>
              }
              />
            </Box>
          </Box>
          <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
              First Message
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <FormControlLabel
                sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                control={
                  <Switch
                    checked={firstMessage}
                    onChange={(e) => setFirstMessage(e.target.checked)}
                    color="primary"
                  />
                }
                label={<Box component="span" sx={{ fontSize: '12px', color: '#637381', ml: 3 }}>
                Allows auto tagging if users&apos; first message matches
              </Box>
              }
              />
            </Box>
          </Box>
         <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={tags}
            onChange={(event, newValue) => setTags(newValue)}
            inputValue={tagInput}
            onInputChange={(event, newInputValue) => {
              setTagInput(newInputValue);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && tagInput.trim()) {
                setTags([...tags, tagInput.trim()]);
                setTagInput('');
                event.preventDefault();
              }
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="soft"
                  color="info"
                  size="small"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                onClick={handleAddTag}
                {...params}
                variant="outlined"
                size="large"
                helperText="Enter opt-out keywords"
                placeholder="+ Enter Keywords"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <InputAdornment position="Start" />,
                }}
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    minHeight: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                  },
                }}
              />
            )}
          />
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
          Tag Contact Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
