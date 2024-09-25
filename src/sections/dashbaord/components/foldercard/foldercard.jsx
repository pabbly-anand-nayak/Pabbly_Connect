// import React from 'react';

// import Box from '@mui/material/Box';
// import { useTheme } from '@mui/material/styles';
// import { Card, Button, Tooltip, MenuItem, MenuList, Typography, CardContent } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { varAlpha } from 'src/theme/styles';

// import { Iconify } from 'src/components/iconify';
// import { FolderTreeView } from 'src/components/tree-view/folder-treeView';

// import { CreateFolderDialog } from '../../hooks/create_folder-dailog';

// export default function FolderCard({ sx, icon, title, total, color = 'warning', ...other }) {
//   const theme = useTheme();
//   const folderDialog = useBoolean();

//   return (
//     <Card
//       sx={{
//         boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
//         height: '100%',
//         backgroundColor: 'common.white',
//         width: { xs: '100%', md: '354.2px' },
//         borderRadius: '16px',
//         p: 0,
//       }}
//     >
//       <CardContent>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 2.6,
//           }}
//         >
//           <Box
//             sx={{
//               minHeight: '100%',
//               width: '100%',
//               borderBottom: '1px dashed',
//               borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
//             }}
//           >
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mb: 2.6,
//               }}
//             >
//               <Typography variant="h6" component="div">
//                 Folders
//               </Typography>

//               <Tooltip title="Create a new folder." arrow placement="top">
//                 <Button
//                   sx={{
//                     mb: '0px',
//                     p: 1,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     minWidth: 0,
//                   }}
//                   onClick={folderDialog.onTrue}
//                   maxWidth
//                   color="inherit"
//                   variant="contained"
//                 >
//                   <Iconify icon="fa6-solid:plus" />
//                 </Button>
//               </Tooltip>
//             </Box>
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 2.6,
//           }}
//         >
//           <Box sx={{ minHeight: '100%', width: '100%' }}>
//             <FolderTreeView />
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 0,
//           }}
//         >
//           <Box
//             sx={{
//               minHeight: '100%',
//               width: '100%',
//               pt: 1,
//               borderTop: '1px dashed',
//               borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
//             }}
//           >
//             <MenuList>
//               <MenuItem
//                 onClick={() => {}}
//                 sx={{
//                   color: '#1C252E',
//                   paddingRight: 1.5,
//                   paddingLeft: 2,
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Typography sx={{ fontSize: '0.875rem', fontWeight: '400' }}>Trash (10)</Typography>
//                 <span style={{ color: '#6c757d' }}>
//                   <Iconify icon="solar:trash-bin-trash-bold" />
//                 </span>
//               </MenuItem>
//             </MenuList>
//           </Box>
//         </Box>
//       </CardContent>
//       <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
//     </Card>
//   );
// }

import React from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Card, Button, Tooltip, MenuItem, MenuList, Typography, CardContent } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { FolderTreeView } from 'src/components/tree-view/folder-treeView';

import { CreateFolderDialog } from '../../hooks/create_folder-dailog';

export default function FolderCard({
  sx,
  icon,
  title,
  total,
  color = 'warning',
  onTrashClick,
  ...other
}) {
  const theme = useTheme();
  const folderDialog = useBoolean();

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        height: '100%',
        backgroundColor: 'common.white',
        width: { xs: '100%', md: '354.2px' },
        borderRadius: '16px',
        p: 0,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2.6,
          }}
        >
          <Box
            sx={{
              minHeight: '100%',
              width: '100%',
              borderBottom: '1px dashed',
              borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2.6,
              }}
            >
              <Typography variant="h6" component="div">
                Folders
              </Typography>

              <Tooltip title="Create a new folder." arrow placement="top">
                <Button
                  sx={{
                    mb: '0px',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: 0,
                  }}
                  onClick={folderDialog.onTrue}
                  maxWidth
                  color="inherit"
                  variant="contained"
                >
                  <Iconify icon="fa6-solid:plus" />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2.6,
          }}
        >
          <Box sx={{ minHeight: '100%', width: '100%' }}>
            <FolderTreeView />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 0,
          }}
        >
          <Box
            sx={{
              minHeight: '100%',
              width: '100%',
              pt: 1,
              borderTop: '1px dashed',
              borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
            }}
          >
            <MenuList>
              <MenuItem
                onClick={onTrashClick}
                sx={{
                  color: '#1C252E',
                  paddingRight: 1.5,
                  paddingLeft: 2,
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontSize: '0.875rem', fontWeight: '400' }}>Trash (10)</Typography>
                <span style={{ color: '#6c757d' }}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </span>
              </MenuItem>
            </MenuList>
          </Box>
        </Box>
      </CardContent>
      <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
    </Card>
  );
}
