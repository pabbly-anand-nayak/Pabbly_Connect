// import { toast } from 'sonner';
// import { useTheme } from '@emotion/react';
// import { useState, useEffect } from 'react';

// import {
//     Box,
//     Dialog,
//     Button,
//     Divider,
//     TextField,
//     IconButton,
//     DialogTitle,
//     Autocomplete,
//     DialogContent,
//     DialogActions,
//     useMediaQuery,
//     CircularProgress,
// } from '@mui/material';

// import { Iconify } from 'src/components/iconify';

// export function CreateRenameMoveToFolderReExecutionExWorkflowDialog({
//     open,
//     onClose,
//     title,
//     actionLabel,
//     mode, // 'create-workflow', 'rename-workflow', 'move-to-folder', 'auto-reexecution'
//     initialValues = {}, // Initial values for fields like workflowName, folderName, etc.
//     folderOptions = [], // Folder options for dropdowns
//     onAction,
// }) {
//     const theme = useTheme();
//     const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

//     const [workflowName, setWorkflowName] = useState(initialValues.workflowName || '');
//     const [folderName, setFolderName] = useState(initialValues.folderName || '');
//     const [autoReExecOption, setAutoReExecOption] = useState(initialValues.autoReExecOption || '');
//     const [workflowError, setWorkflowError] = useState(false);
//     const [folderError, setFolderError] = useState(false);
//     const [autoReExecError, setAutoReExecError] = useState(false);

//     useEffect(() => {
//         if (open) {
//             setWorkflowName(initialValues.workflowName || '');
//             setFolderName(initialValues.folderName || '');
//             setAutoReExecOption(initialValues.autoReExecOption || '');
//             setWorkflowError(false);
//             setFolderError(false);
//             setAutoReExecError(false);
//         }
//     }, [open, initialValues]);

//     const handleAction = () => {
//         let hasError = false;

//         if (mode === 'create-workflow' || mode === 'rename-workflow') {
//             if (!workflowName.trim()) {
//                 setWorkflowError(true);
//                 hasError = true;
//             }
//         }

//         if (mode === 'move-to-folder') {
//             if (!folderName) {
//                 setFolderError(true);
//                 hasError = true;
//             }
//         }

//         if (mode === 'auto-reexecution') {
//             if (!autoReExecOption) {
//                 setAutoReExecError(true);
//                 hasError = true;
//             }
//         }

//         if (hasError) return;

//         // Execute action
//         onAction({
//             workflowName,
//             folderName,
//             autoReExecOption,
//         });

//         toast.success(`${title} successful!`);
//         onClose();
//     };

//     // LoadingButton
//     const [isLoading, setIsLoading] = useState(false);


//     return (
//         <Dialog
//             fullWidth
//             open={open}
//             PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
//         >
//             <DialogTitle
//                 sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
//             >
//                 {title}
//                 <IconButton
//                     onClick={onClose}
//                     style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
//                 >
//                     <Iconify icon="uil:times" />
//                 </IconButton>
//             </DialogTitle>
//             <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

//             <DialogContent>
//                 <Box display="flex" flexDirection="column" gap={2}>
//                     {/* Workflow Name (Create or Rename Workflow) */}
//                     {(mode === 'create-workflow' || mode === 'rename-workflow') && (
//                         <TextField
//                             autoFocus
//                             fullWidth
//                             type="text"
//                             margin="dense"
//                             variant="outlined"
//                             label="Workflow Name"
//                             placeholder="Enter workflow name"
//                             value={workflowName}
//                             onChange={(e) => setWorkflowName(e.target.value)}
//                             error={workflowError}
//                             helperText={
//                                 workflowError
//                                     ? 'Please enter a valid workflow name.'
//                                     : 'Enter the name of the workflow.'
//                             }
//                         />
//                     )}

//                     {/* Move to Folder */}
//                     {mode === 'move-to-folder' && (
//                         <Autocomplete
//                             options={folderOptions}
//                             value={folderName}
//                             onChange={(event, value) => setFolderName(value)}
//                             renderInput={(params) => (
//                                 <TextField
//                                     {...params}
//                                     label="Select Folder"
//                                     placeholder="Select folder"
//                                     error={folderError}
//                                     helperText={
//                                         folderError
//                                             ? 'Please select a folder.'
//                                             : 'Select the folder to move the workflow(s) to.'
//                                     }
//                                 />
//                             )}
//                         />
//                     )}

//                     {/* Auto Re-Execution Settings */}
//                     {mode === 'auto-reexecution' && (
//                         <Autocomplete
//                             options={[
//                                 '0 (disable auto re-execution)',
//                                 '1 attempt(s)',
//                                 '2 attempt(s)',
//                                 '3 attempt(s)',
//                                 '4 attempt(s)',
//                                 '5 attempt(s)',
//                             ]}
//                             value={autoReExecOption}
//                             onChange={(event, value) => setAutoReExecOption(value)}
//                             renderInput={(params) => (
//                                 <TextField
//                                     {...params}
//                                     label="Select Auto Re-Execution Attempts"
//                                     placeholder="Select attempts"
//                                     error={autoReExecError}
//                                     helperText={
//                                         autoReExecError
//                                             ? 'Please select a valid option.'
//                                             : 'Set the number of attempts for auto re-execution.'
//                                     }
//                                 />
//                             )}
//                         />
//                     )}
//                 </Box>
//             </DialogContent>

//             <DialogActions>
//                 <Button
//                     onClick={handleAction}
//                     variant="contained"
//                     color="primary"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? <CircularProgress size={24} color="inherit" /> : { actionLabel }}
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// }create-rename-move-reexecution-workflow-dialog




import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

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

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

const DIALOG_TYPES = {
    CREATE: 'create',
    RENAME: 'rename',
    MOVE: 'move',
    AUTO_REEXECUTION: 'autoReExecution'
};

export function DashboardDialogs({
    type = DIALOG_TYPES.CREATE,
    open,
    onClose,
    initialName = '',
    initialFolder = 'Home',
    ...other
}) {
    const theme = useTheme();
    const navigate = useNavigate();
    const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
    const dialog = useBoolean();

    // State
    const [workflowName, setWorkflowName] = useState(initialName);
    const [categoryList, setCategoryList] = useState(initialFolder);
    const [error, setError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Reset states when dialog opens
    useEffect(() => {
        if (open) {
            setWorkflowName(initialName);
            setCategoryList(type === DIALOG_TYPES.AUTO_REEXECUTION ? '' : initialFolder);
            setError(false);
            setCategoryError(false);
        }
    }, [open, initialName, initialFolder, type]);

    const handleChangeCategoryList = useCallback((event, value) => {
        setCategoryList(value);
        if (value) {
            setCategoryError(false);
        }
    }, []);

    const getDialogConfig = () => {
        const configs = {
            [DIALOG_TYPES.CREATE]: {
                title: 'Create Workflow',
                titleTooltip: 'Create a workflow with a name and folder location.',
                buttonText: 'Create',
                successMessage: 'ok testing Workflow created successfully!',
            },
            [DIALOG_TYPES.RENAME]: {
                title: 'Rename Workflow',
                titleTooltip: 'You can rename the workflow here.',
                buttonText: 'Update',
                successMessage: 'ok testing Updated successfully!',
            },
            [DIALOG_TYPES.MOVE]: {
                title: 'Move To Folder',
                titleTooltip: 'Select folder to which the workflow needs to be moved.',
                buttonText: 'Move',
                successMessage: 'ok testing The workflow(s) moved successfully.',
            },
            [DIALOG_TYPES.AUTO_REEXECUTION]: {
                title: 'Auto Re-Execution Settings',
                titleTooltip: 'Set the number of times the system should automatically re-execute failed or skipped steps in the workflow.',
                buttonText: 'Save',
                successMessage: 'ok testing You have successfully enabled auto re-execution.',
            },
        };
        return configs[type];
    };

    const getFolderOptions = () => {
        if (type === DIALOG_TYPES.AUTO_REEXECUTION) {
            return [
                '0 (disable auto re-execution)',
                '1 attempt(s)',
                '2 attempt(s)',
                '3 attempt(s)',
                '4 attempt(s)',
                '5 attempt(s)',
            ];
        }

        return [
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
            'Client (A)',
            'Pabbly Subscription Billing',
            'Pabbly Email Marketing',
            'Pabbly Form Builder',
            'Pabbly Email Verification',
            'Pabbly Hook',
        ];
    };

    const handleSubmit = () => {
        let hasError = false;

        if ((type === DIALOG_TYPES.CREATE || type === DIALOG_TYPES.RENAME) && !workflowName.trim()) {
            setError(true);
            hasError = true;
        }

        if ((type === DIALOG_TYPES.CREATE || type === DIALOG_TYPES.MOVE || type === DIALOG_TYPES.AUTO_REEXECUTION) && !categoryList) {
            setCategoryError(true);
            hasError = true;
        }

        if (!hasError) {
            const { successMessage } = getDialogConfig();
            toast.success(successMessage);

            if (type === DIALOG_TYPES.CREATE) {
                setTimeout(() => navigate(paths.dashboard.workflow), 1200);
            }

            handleClose();
        }
    };

    const handleClose = () => {
        setWorkflowName('');
        setCategoryList(type === DIALOG_TYPES.AUTO_REEXECUTION ? '' : 'Home');
        setError(false);
        setCategoryError(false);
        onClose();
    };

    const { title, titleTooltip, buttonText } = getDialogConfig();

    return (
        <Dialog
            fullWidth
            open={open}
            {...other}
            PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
        >
            <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
                <Tooltip title={titleTooltip} arrow placement="top">
                    {title}
                </Tooltip>
                <IconButton
                    onClick={handleClose}
                    style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
                >
                    <Iconify icon="uil:times" />
                </IconButton>
            </DialogTitle>

            <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    {(type === DIALOG_TYPES.CREATE || type === DIALOG_TYPES.RENAME) && (
                        <TextField
                            autoFocus
                            fullWidth
                            type="text"
                            margin="dense"
                            variant="outlined"
                            label="Workflow Name"
                            placeholder="Name of the workflow"
                            value={workflowName}
                            onChange={(e) => {
                                setWorkflowName(e.target.value);
                                if (e.target.value) setError(false);
                            }}
                            error={error}
                            helperText={
                                error ? (
                                    'Please enter workflow name.'
                                ) : (
                                    <span>
                                        Enter the name of the workflow.{' '}
                                        <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />
                                    </span>
                                )
                            }
                        />
                    )}

                    {(type === DIALOG_TYPES.CREATE || type === DIALOG_TYPES.MOVE || type === DIALOG_TYPES.AUTO_REEXECUTION) && (
                        <Autocomplete
                            sx={{
                                '& .MuiInputBase-input': { fontSize: '14px' },
                                '& .MuiInputLabel-root': { fontSize: '14px' },
                                ...(type === DIALOG_TYPES.MOVE && { mt: 1.2 }),
                            }}
                            options={getFolderOptions()}
                            value={categoryList}
                            onChange={handleChangeCategoryList}
                            defaultValue={type === DIALOG_TYPES.AUTO_REEXECUTION ? null : "Home"}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={
                                        <Tooltip
                                            title={type === DIALOG_TYPES.AUTO_REEXECUTION ? "" : "Select folder to which the workflow needs to be moved."}
                                            arrow
                                            placement="top"
                                        >
                                            <span>
                                                {type === DIALOG_TYPES.AUTO_REEXECUTION ? "Select Auto Re-Execution Attempts" : "Select Folder"}
                                            </span>
                                        </Tooltip>
                                    }
                                    placeholder={type === DIALOG_TYPES.AUTO_REEXECUTION ? "Select attempt(s)" : "Select folder"}
                                    helperText={
                                        <span>
                                            {categoryError ? (
                                                type === DIALOG_TYPES.AUTO_REEXECUTION
                                                    ? 'Please select auto re-execution attempts.'
                                                    : 'Please select a folder.'
                                            ) : (
                                                <>
                                                    {type === DIALOG_TYPES.AUTO_REEXECUTION
                                                        ? <>Select how many times a task should retry automatically if it fails.{' '}
                                                            <Link
                                                                href="https://forum.pabbly.com/threads/how-to-enable-auto-re-execution-for-workflows.15088/#post-71171"
                                                                style={{ color: '#078DEE' }}
                                                                underline="always"
                                                            >
                                                                Learn more
                                                            </Link>
                                                        </>
                                                        : <>
                                                            Select the folder or subfolder where you want to {type === DIALOG_TYPES.CREATE ? 'create' : 'move'} the workflow
                                                            {type === DIALOG_TYPES.MOVE ? '(s)' : ''}.{' '}
                                                            <LearnMoreLink link="https://forum.pabbly.com/threads/folders.20987/" />
                                                        </>
                                                    }
                                                </>
                                            )}
                                        </span>
                                    }
                                    error={categoryError}
                                />
                            )}
                        />
                    )}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}