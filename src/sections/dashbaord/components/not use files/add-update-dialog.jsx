import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';

import {
    Box,
    Dialog,
    Button,
    Divider,
    Tooltip,
    TextField,
    IconButton,
    DialogTitle,
    Autocomplete,
    DialogContent,
    DialogActions,
    useMediaQuery,
    CircularProgress,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function AddUpdateDialog({
    open,
    onClose,
    title,
    actionLabel,
    initialData = {},
    dropdownOptions = [],
    fieldLabel,
    fieldPlaceholder,
    fieldHelperText,
    dropdownLabel,
    dropdownPlaceholder,
    dropdownHelperText,
    mode, // Can be "create", "rename", "move", or "settings"
    onAction,
}) {
    const theme = useTheme();
    const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
    const [fieldValue, setFieldValue] = useState(initialData.name || '');
    const [dropdownValue, setDropdownValue] = useState(initialData.dropdown || '');
    const [fieldError, setFieldError] = useState(false);
    const [dropdownError, setDropdownError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setFieldValue(initialData.name || '');
            setDropdownValue(initialData.dropdown || '');
            setFieldError(false);
            setDropdownError(false);
        }
    }, [open, initialData]);

    const handleFieldChange = (event) => {
        setFieldValue(event.target.value);
        if (event.target.value.trim()) {
            setFieldError(false);
        }
    };

    const handleDropdownChange = (event, value) => {
        setDropdownValue(value);
        if (value) {
            setDropdownError(false);
        }
    };

    const handleAction = () => {
        if (mode !== 'settings' && !fieldValue.trim()) {
            setFieldError(true);
            return;
        }
        if (dropdownOptions.length > 0 && !dropdownValue) {
            setDropdownError(true);
            return;
        }

        setIsLoading(true);

        onAction({
            name: fieldValue,
            dropdown: dropdownValue,
        });

        setTimeout(() => {
            setIsLoading(false);
            toast.success(`${title} successful!`);
            onClose();
        }, 0);
    };

    return (
        <Dialog
            open={open}
            fullWidth
            PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
        >
            <DialogTitle
                sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
            >
                <Tooltip title={title} arrow placement="top">
                    {title}
                </Tooltip>
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
                    {(mode === 'create' || mode === 'rename') && (
                        <TextField
                            autoFocus
                            fullWidth
                            type="text"
                            margin="dense"
                            variant="outlined"
                            label={fieldLabel}
                            placeholder={fieldPlaceholder}
                            value={fieldValue}
                            onChange={handleFieldChange}
                            error={fieldError}
                            helperText={
                                fieldError ? (
                                    `Please enter ${fieldLabel.toLowerCase()}.`
                                ) : (
                                    <span>
                                        {fieldHelperText} <LearnMoreLink link="https://example.com" />
                                    </span>
                                )
                            }
                        />
                    )}

                    {(mode === 'create' || mode === 'move' || mode === 'settings') &&
                        dropdownOptions.length > 0 && (
                            <Autocomplete
                                options={dropdownOptions}
                                value={dropdownValue}
                                onChange={handleDropdownChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={dropdownLabel}
                                        placeholder={dropdownPlaceholder}
                                        error={dropdownError}
                                        helperText={
                                            dropdownError ? (
                                                dropdownHelperText
                                            ) : (
                                                <span>
                                                    {dropdownHelperText} <LearnMoreLink link="https://example.com" />
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
                <Button
                    onClick={handleAction}
                    color="primary"
                    variant="contained"
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : actionLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
