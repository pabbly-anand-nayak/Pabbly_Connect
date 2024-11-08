// import React, { useRef, useState, useEffect } from 'react';

// import {
//   Box,
//   Alert,
//   Avatar,
//   Tooltip,
//   Typography,
//   IconButton,
//   AlertTitle,
//   Collapse,
// } from '@mui/material';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { usePopover } from 'src/components/custom-popover';

// // ----------------------------------------------------------------------

// export default function InitialTriggerNode(sx, ...other) {
//   const popover = usePopover();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isTruncated, setIsTruncated] = useState(false);
//   const textRef = useRef(null);

//   const appName = 'Trigger : When this happens';
//   const stepName = '1. Choose First Application';

//   useEffect(() => {
//     if (textRef.current) {
//       setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
//     }
//   }, [stepName]);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
//       <Box
//         onClick={toggleExpand}
//         sx={{
//           cursor: 'pointer', // Add this line to ensure the click cursor shows
//           boxShadow: '0px 12px 124px -4px rgba(132, 136, 151, 0.24)',
//           width: '100%',
//           p: 3,
//           gap: '16px',
//           borderRadius: 2,
//           border: '2px solid #D4E2FF',
//           display: 'flex',
//           justifyContent: 'center',
//           overflow: 'hidden',
//           position: 'relative',
//           alignItems: 'flex-start',
//           color: 'primary.text',
//           bgcolor: 'common.white',
//           '&:hover': {
//             border: '2px solid #078DEE',
//           },
//           transition: 'all 0.3s ease',
//           ...sx,
//         }}
//         {...other}
//       >
//         <Box width="100%" display="flex" alignItems="start" flexDirection="column" gap="6px">
//           <Box
//             display="flex"
//             alignItems="center"
//             gap="24px"
//             width="100%"
//             justifyContent="space-between"
//           >
//             <Box display="flex" gap="24px">
//               <Tooltip title={appName} arrow placement="top" disableInteractive>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     position: 'relative',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Avatar
//                     variant="rounded"
//                     src="/assets/icons/app logo/pabbly_icon.png"
//                     sx={{
//                       p: 1,
//                       width: 48,
//                       height: 48,
//                       bgcolor: 'background.neutral',
//                       border: '1px solid #D4E2FF',
//                     }}
//                   />
//                 </Box>
//               </Tooltip>

//               <Tooltip title={appName} arrow placement="top" disableInteractive>
//                 <Typography
//                   fontSize={14}
//                   fontWeight={600}
//                   sx={{
//                     maxWidth: '200px',
//                     display: '-webkit-box',
//                     WebkitBoxOrient: 'vertical',
//                     WebkitLineClamp: 1,
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     wordBreak: 'break-word',
//                   }}
//                 >
//                   {appName}
//                 </Typography>

//                 <Tooltip title={stepName} arrow placement="bottom" disableInteractive>
//                   <Typography
//                     ref={textRef}
//                     fontSize={14}
//                     fontWeight={600}
//                     sx={{
//                       maxWidth: '200px',
//                       whiteSpace: isExpanded ? 'normal' : 'nowrap',
//                       overflow: isExpanded ? 'visible' : 'hidden',
//                       textOverflow: isExpanded ? 'clip' : 'ellipsis',
//                     }}
//                   >
//                     {stepName}
//                   </Typography>
//                 </Tooltip>
//               </Tooltip>
//             </Box>

//             <Box gap={1} display="flex" alignItems="center" alignContent="end">
//               <Tooltip title="Free task" arrow placement="top" disableInteractive>
//                 <Label color="success" variant="soft" sx={{ height: '18px', borderRadius: '4px' }}>
//                   Free
//                 </Label>
//               </Tooltip>

//               <Tooltip title="Success" arrow placement="top" disableInteractive>
//                 <Iconify
//                   sx={{ color: 'success.main', cursor: 'pointer' }}
//                   icon="icon-park-solid:check-one"
//                 />
//               </Tooltip>
//               <Tooltip
//                 title="Failed Task. Click here to view failed reason"
//                 arrow
//                 placement="top"
//                 disableInteractive
//               >
//                 <Iconify
//                   sx={{ color: 'error.main', cursor: 'pointer' }}
//                   icon="icon-park-solid:close-one"
//                 />
//               </Tooltip>

//               {/* Collapse/Expand button */}
//               <IconButton onClick={toggleExpand} sx={{ ml: 1 }}>
//                 <Iconify icon={isExpanded ? 'mingcute:up-fill' : 'mingcute:down-fill'} />
//               </IconButton>
//             </Box>
//           </Box>

//           {/* Conditionally render Alert on expand */}

//           {isExpanded && (
//             <Box m="24px 0px 0px 0px" borderTop="1px dashed #D4E2FF" width="100%">
//               <Alert sx={{ mt: 3, mb: 0, width: '100%' }}>
//                 <AlertTitle sx={{ textTransform: 'capitalize' }}>fdfbdfbdfb</AlertTitle>
//                 This is an check it out!
//               </Alert>
//             </Box>
//           )}
//         </Box>
//       </Box>

//       <Box display="flex" flexDirection="column" alignItems="center">
//         <Iconify icon="vaadin:line-v" sx={{ color: '#84889780' }} />
//         <Tooltip title="Add Step" arrow placement="right">
//           <IconButton
//             size="small"
//             color="primary"
//             sx={{
//               boxShadow: '0px 8px 16px 0px rgba(132, 136, 151, 0.24)',
//               backgroundColor: 'common.white',
//               '&:hover': {
//                 color: 'common.white',
//                 backgroundColor: '#078DEE',
//               },
//             }}
//           >
//             <Iconify icon="ph:plus-bold" />
//           </IconButton>
//         </Tooltip>
//         <Iconify icon="vaadin:line-v" sx={{ color: '#84889780' }} />
//         <Iconify icon="bxs:down-arrow" sx={{ mt: '-4px', color: '#84889780' }} />
//       </Box>
//     </Box>
//   );
// }

import React, { useRef, useState, useEffect } from 'react';

import { Box } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function DividerFlow(sx, ...other) {
  const popover = usePopover();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  const appName = 'Trigger : When this happens';
  const stepName = '1. Choose First Application';

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [stepName]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* <Iconify icon="vaadin:line-v" sx={{ color: '#84889780' }} /> */}
      {/* <Tooltip title="Add Step" arrow placement="right">
        <IconButton
          size="small"
          color="primary"
          sx={{
            boxShadow: '0px 8px 16px 0px rgba(132, 136, 151, 0.24)',
            backgroundColor: 'common.white',
            '&:hover': {
              color: 'common.white',
              backgroundColor: '#078DEE',
            },
          }}
        >
          <Iconify icon="ph:plus-bold" />
        </IconButton>
      </Tooltip> */}
      <Iconify
        icon="vaadin:line-v"
        sx={{
          // color: '#84889780',
          '[data-mui-color-scheme="light"] &': {
            color: '#84889780',
          },
          '[data-mui-color-scheme="dark"] &': {
            color: 'var(--palette-text-secondary)',
          },
        }}
      />
      <Iconify
        icon="bxs:down-arrow"
        sx={{
          mt: '-4px', // color: '#84889780',
          '[data-mui-color-scheme="light"] &': {
            color: '#84889780',
          },
          '[data-mui-color-scheme="dark"] &': {
            color: 'var(--palette-text-secondary)',
          },
        }}
      />
    </Box>
  );
}
