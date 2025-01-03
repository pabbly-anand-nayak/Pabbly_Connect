import React, { useMemo, useState, useContext, useCallback, createContext } from 'react';

import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  // Wrap openSnackbar in useCallback to prevent re-creation
  const openSnackbar = useCallback(({ message, severity = 'info' }) => {
    setSnackbarState({ open: true, message, severity });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(() => ({ openSnackbar }), [openSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <CustomSnackbar
        open={snackbarState.open}
        onClose={closeSnackbar}
        message={snackbarState.message}
        severity={snackbarState.severity}
      />
    </SnackbarContext.Provider>
  );
};

export const useRootSnackbar = () => useContext(SnackbarContext);

// ----------------------------------

// import React, { useMemo, useState, useContext, useCallback, createContext } from 'react';

// import { Alert, Portal, Snackbar, useTheme } from '@mui/material';

// const SnackbarContext = createContext();

// export const SnackbarProvider = ({ children, sx }) => {
//   const theme = useTheme();

//   const [snackbarState, setSnackbarState] = useState({
//     open: false,
//     message: '',
//     severity: 'info',
//   });

//   // Wrap openSnackbar in useCallback to prevent re-creation
//   const openSnackbar = useCallback(({ message, severity = 'info' }) => {
//     setSnackbarState({ open: true, message, severity });
//   }, []);

//   const closeSnackbar = useCallback(() => {
//     setSnackbarState((prev) => ({ ...prev, open: false }));
//   }, []);

//   // Memoize the value to prevent unnecessary re-renders
//   const value = useMemo(() => ({ openSnackbar }), [openSnackbar]);

//   return (
//     <SnackbarContext.Provider value={value}>
//       {children}
//       {/* <CustomSnackbar
//         open={snackbarState.open}
//         onClose={closeSnackbar}
//         message={snackbarState.message}
//         severity={snackbarState.severity}
//       /> */}
//       <Portal>
//         <Snackbar
//           open={snackbarState.open}
//           autoHideDuration={6000}
//           onClose={closeSnackbar}
//           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//           sx={{
//             boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
//             // mt: 13,
//             zIndex: theme.zIndex.modal + 999, // Ensure it is on top
//             ...sx,
//           }}
//         >
//           <Alert
//             onClose={closeSnackbar}
//             severity={snackbarState.severity}
//             sx={{
//               width: '100%',
//               fontSize: '14px',
//               fontWeight: 'bold',
//               backgroundColor: theme.palette.background.paper,
//               color: theme.palette.text.primary,
//             }}
//           >
//             {snackbarState.message}
//           </Alert>
//         </Snackbar>
//       </Portal>
//     </SnackbarContext.Provider>
//   );
// };

// export const useSnackbar = () => useContext(SnackbarContext);
