import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';

import {
    Box,
    Dialog,
    Button,
    Divider,
    TextField,
    IconButton,
    DialogTitle,
    Autocomplete,
    DialogContent,
    DialogActions,
    useMediaQuery,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function AddRenameFolderDialog({
    open,
    onClose,
    title,
    actionLabel,
    mode, // 'create' or 'rename'
    folderOptions = [], // Used for parent folder selection in 'create' mode
    initialFolderName = '', // Used in 'rename' mode
    onAction,
}) {
    const theme = useTheme();
    const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

    const [folderName, setFolderName] = useState(initialFolderName);
    const [parentFolder, setParentFolder] = useState('Home'); // Default for 'create' mode
    const [nameError, setNameError] = useState(false);
    const [parentFolderError, setParentFolderError] = useState(false);

    useEffect(() => {
        if (open) {
            setFolderName(initialFolderName || '');
            setParentFolder('None');
            setNameError(false);
            setParentFolderError(false);
        }
    }, [open, initialFolderName]);

    const handleFolderNameChange = (event) => {
        setFolderName(event.target.value);
        setNameError(!event.target.value.trim());
    };

    const handleParentFolderChange = (event, value) => {
        setParentFolder(value);
        setParentFolderError(!value);
    };

    const handleAction = () => {
        if (!folderName.trim()) {
            setNameError(true);
            return;
        }

        if (mode === 'create' && !parentFolder) {
            setParentFolderError(true);
            return;
        }

        // Trigger the action callback
        onAction({
            name: folderName,
            parent: parentFolder,
        });

        toast.success(`${title} successful!`);
        onClose();
    };

    return (
        <Dialog
            fullWidth
            open={open}
            PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
        >
            <DialogTitle
                sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
            >
                {title}
                <IconButton
                    onClick={onClose}
                    style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
                >
                    <Iconify icon="uil:times" />
                </IconButton>
            </DialogTitle>
            <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    {/* Folder Name Input */}
                    <TextField
                        autoFocus
                        fullWidth
                        type="text"
                        margin="dense"
                        variant="outlined"
                        label="Folder Name"
                        placeholder="Enter folder name here"
                        value={folderName}
                        onChange={handleFolderNameChange}
                        error={nameError}
                        helperText={
                            nameError ? (
                                'Please enter a valid folder name.'
                            ) : (
                                <span>
                                    {mode === 'rename'
                                        ? 'You can rename the folder from here.'
                                        : 'Enter the name of the folder here.'}{' '}
                                    <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />
                                </span>
                            )
                        }
                    />

                    {/* Parent Folder Selector (only for 'create' mode) */}
                    {mode === 'create' && (
                        <Autocomplete
                            options={folderOptions}
                            value={parentFolder}
                            onChange={handleParentFolderChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Parent Folder"
                                    placeholder="Select folder"
                                    error={parentFolderError}
                                    helperText={
                                        parentFolderError ? (
                                            'Please select a valid parent folder.'
                                        ) : (
                                            <span>
                                                Select the parent folder where you want to create the folder.{' '}
                                                <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />
                                            </span>
                                        )
                                    }
                                />
                            )}
                        />
                    )}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleAction} variant="contained" color="primary">
                    {actionLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
