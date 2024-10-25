// import { useState, useCallback } from 'react';
// import parse from 'autosuggest-highlight/parse';
// import match from 'autosuggest-highlight/match';

// import Box from '@mui/material/Box';
// import { Tooltip } from '@mui/material';
// import SvgIcon from '@mui/material/SvgIcon';
// import InputBase from '@mui/material/InputBase';
// import { useTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import Dialog, { dialogClasses } from '@mui/material/Dialog';

// import { useRouter } from 'src/routes/hooks';
// import { isExternalLink } from 'src/routes/utils';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { useEventListener } from 'src/hooks/use-event-listener';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';
// import { SearchNotFound } from 'src/components/search-not-found';

// import { ResultItem } from './result-item';
// import { groupItems, applyFilter, getAllItems } from './utils';

// // ----------------------------------------------------------------------

// export function Searchbar({ data: navItems = [], sx, ...other }) {
//   const theme = useTheme();

//   const router = useRouter();

//   const search = useBoolean();

//   const [searchQuery, setSearchQuery] = useState('');

//   const handleClose = useCallback(() => {
//     search.onFalse();
//     setSearchQuery('');
//   }, [search]);

//   const handleKeyDown = (event) => {
//     if (event.key === 'k' && event.metaKey) {
//       search.onToggle();
//       setSearchQuery('');
//     }
//   };

//   useEventListener('keydown', handleKeyDown);

//   const handleClick = useCallback(
//     (path) => {
//       if (isExternalLink(path)) {
//         window.open(path);
//       } else {
//         router.push(path);
//       }
//       handleClose();
//     },
//     [handleClose, router]
//   );

//   const handleSearch = useCallback((event) => {
//     setSearchQuery(event.target.value);
//   }, []);

//   const dataFiltered = applyFilter({
//     inputData: getAllItems({ data: navItems }),
//     query: searchQuery,
//   });

//   const notFound = searchQuery && !dataFiltered.length;

//   const renderItems = () => {
//     const dataGroups = groupItems(dataFiltered);

//     return Object.keys(dataGroups)
//       .sort((a, b) => -b.localeCompare(a))
//       .map((group, index) => (
//         <Box component="ul" key={`${group}-${index}`}>
//           {dataGroups[group].map((item) => {
//             const title =
//               'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment';
//             const path = 'Home';
//             const isActive = Math.random() < 0.5;

//             // Modify title and path with custom text
//             const modifiedTitle = `${title}`;
//             const modifiedPath = `${path}`;

//             // Highlight parts of the modified title and path based on search query
//             const partsTitle = parse(modifiedTitle, match(modifiedTitle, searchQuery));
//             const partsPath = parse(modifiedPath, match(modifiedPath, searchQuery));

//             return (
//               <Box component="li" key={`${modifiedTitle}${modifiedPath}`} sx={{ display: 'flex' }}>
//                 <ResultItem
//                   path={partsPath}
//                   title={partsTitle}
//                   groupLabel={searchQuery && group}
//                   // onClickItem={() => handleClick(path)}
//                 />
//               </Box>
//             );
//           })}

//           {dataGroups[group].map((item) => {
//             const title =
//               'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment';
//             const path = 'Folder 1';
//             const isActive = Math.random() < 0.5;

//             // Modify title and path with custom text
//             const modifiedTitle = `${title}`;
//             const modifiedPath = `${path}`;

//             // Highlight parts of the modified title and path based on search query
//             const partsTitle = parse(modifiedTitle, match(modifiedTitle, searchQuery));
//             const partsPath = parse(modifiedPath, match(modifiedPath, searchQuery));

//             return (
//               <Box component="li" key={`${modifiedTitle}${modifiedPath}`} sx={{ display: 'flex' }}>
//                 <ResultItem
//                   path={partsPath}
//                   title={partsTitle}
//                   groupLabel={searchQuery && group}
//                   // onClickItem={() => handleClick(path)}
//                 />
//               </Box>
//             );
//           })}
//         </Box>
//       ));
//   };

//   const renderButton = (
//     <Tooltip title="You can search workflow from here." arrow placement="bottom">
//       <Box
//         display="flex"
//         alignItems="center"
//         onClick={search.onTrue}
//         sx={{
//           fontSize: 14,
//           fontWeight: 500,
//           color: 'grey.600',
//           pr: { sm: 1 },
//           borderRadius: { sm: 1.5 },
//           cursor: { sm: 'pointer' },
//           bgcolor: { sm: varAlpha(theme.vars.palette.grey['500Channel'], 0.08) },
//           ...sx,
//         }}
//         {...other}
//       >
//         <IconButton disableRipple>
//           {/* https://icon-sets.iconify.design/eva/search-fill/ */}
//           <SvgIcon sx={{ width: 20, height: 20 }}>
//             <path
//               fill="currentColor"
//               d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
//             />
//           </SvgIcon>
//         </IconButton>
//         {/* Account */}
//         <Label
//           sx={{
//             ml: 1,
//             fontSize: 12,
//             color: 'grey.800',
//             bgcolor: 'common.white',
//             boxShadow: theme.customShadows.z1,
//             display: { xs: 'none', md: 'inline-flex' },
//           }}
//         >
//           Search Workflow by Name or Webhook URL
//         </Label>
//       </Box>
//     </Tooltip>
//   );

//   return (
//     <>
//       {renderButton}

//       <Dialog
//         fullWidth
//         disableRestoreFocus
//         maxWidth="sm"
//         open={search.value}
//         onClose={handleClose}
//         transitionDuration={{
//           enter: theme.transitions.duration.shortest,
//           exit: 0,
//         }}
//         PaperProps={{ sx: { mt: 15, overflow: 'unset' } }}
//         sx={{ [`& .${dialogClasses.container}`]: { alignItems: 'flex-start' } }}
//       >
//         <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.vars.palette.divider}` }}>
//           <InputBase
//             fullWidth
//             autoFocus
//             placeholder="Search Workflow by Name or Webhook URL"
//             value={searchQuery}
//             onChange={handleSearch}
//             startAdornment={
//               <InputAdornment position="start">
//                 <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
//               </InputAdornment>
//             }
//             endAdornment={
//               <Label
//                 sx={{ letterSpacing: 1, color: 'text.secondary', cursor: 'pointer' }}
//                 onClick={handleClose}
//               >
//                 esc
//               </Label>
//             }
//             inputProps={{ sx: { typography: 'h7' } }}
//           />
//         </Box>

//         {notFound ? (
//           <SearchNotFound query={searchQuery} sx={{ py: 15 }} />
//         ) : (
//           <Scrollbar sx={{ px: 3, pb: 3, pt: 2, height: 400 }}>{renderItems()}</Scrollbar>
//         )}
//       </Dialog>
//     </>
//   );
// }

// ------------------------------------------------------------------

// import { useState, useCallback } from 'react';
// import parse from 'autosuggest-highlight/parse';
// import match from 'autosuggest-highlight/match';

// import Box from '@mui/material/Box';
// import { Tooltip } from '@mui/material';
// import SvgIcon from '@mui/material/SvgIcon';
// import InputBase from '@mui/material/InputBase';
// import { useTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import Dialog, { dialogClasses } from '@mui/material/Dialog';

// import { useRouter } from 'src/routes/hooks';
// import { isExternalLink } from 'src/routes/utils';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { useEventListener } from 'src/hooks/use-event-listener';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';
// import { SearchNotFound } from 'src/components/search-not-found';

// // ----------------------------------------------------------------------

// const ResultItem = ({ title, path, groupLabel, isActive, onClickItem }) => (
//   <Box
//     onClick={onClickItem}
//     sx={{
//       p: 2,
//       width: 1,
//       borderRadius: 1,
//       cursor: 'pointer',
//       typography: 'body2',
//       color: 'text.primary',
//       bgcolor: 'transparent',
//       transition: 'all 0.2s ease-in-out',
//       border: '1px solid transparent', // Initial transparent border
//       '&:hover': {
//         bgcolor: 'rgba(0, 114, 229, 0.06)', // Light blue background
//         border: '1px dashed rgb(0, 114, 229)', // Blue dashed border
//         borderRadius: '8px',
//       },
//     }}
//   >
//     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//       <div>
//         {title && (
//           <Tooltip title={`Workflow Name: ${title}`} placement="top" arrow>
//             <div>
//               {typeof title === 'string' ? (
//                 <strong>{title}</strong>
//               ) : (
//                 <strong>
//                   {title.map((part, index) => (
//                     <span
//                       key={index}
//                       style={{
//                         color: part.highlight ? 'primary.main' : 'text.primary',
//                       }}
//                     >
//                       {part.text}
//                     </span>
//                   ))}
//                 </strong>
//               )}
//             </div>
//           </Tooltip>
//         )}

//         {path && (
//           <Box
//             component="div"
//             sx={{
//               color: 'text.secondary',
//               mt: 0.5,
//             }}
//           >
//             {typeof path === 'string' ? (
//               path
//             ) : (
//               <>
//                 {path.map((part, index) => (
//                   <span
//                     key={index}
//                     style={{
//                       color: part.highlight ? 'primary.main' : 'text.secondary',
//                     }}
//                   >
//                     {part.text}
//                   </span>
//                 ))}
//               </>
//             )}
//           </Box>
//         )}
//       </div>

//       <Label
//         variant="soft"
//         color={isActive ? 'success' : 'error'}
//         sx={{
//           textTransform: 'capitalize',
//         }}
//       >
//         {isActive ? 'Active' : 'Inactive'}
//       </Label>
//     </div>
//   </Box>
// );

// const WORKFLOW_DATA = [
//   {
//     title: 'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
//     path: 'Home',
//     isActive: true,
//   },
//   {
//     title: 'Create Invoice in QuickBooks after Stripe Payment',
//     path: 'Home',
//     isActive: false,
//   },
//   {
//     title: 'Update Customer in Hubspot on New Sale in Shopify',
//     path: 'Integration',
//     isActive: true,
//   },
//   {
//     title: 'Send Slack Notification on New Deal in Pipedrive',
//     path: 'Automation',
//     isActive: true,
//   },
//   {
//     title: 'Add Lead in Salesforce on New Google Form Submission',
//     path: 'Forms',
//     isActive: false,
//   },
// ];

// export function Searchbar({ data: navItems = [], sx, ...other }) {
//   const theme = useTheme();
//   const router = useRouter();
//   const search = useBoolean();
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleClose = useCallback(() => {
//     search.onFalse();
//     setSearchQuery('');
//   }, [search]);

//   const handleKeyDown = (event) => {
//     if (event.key === 'k' && event.metaKey) {
//       search.onToggle();
//       setSearchQuery('');
//     }
//   };

//   useEventListener('keydown', handleKeyDown);

//   const handleClick = useCallback(
//     (path) => {
//       if (isExternalLink(path)) {
//         window.open(path);
//       } else {
//         router.push(path);
//       }
//       handleClose();
//     },
//     [handleClose, router]
//   );

//   const handleSearch = useCallback((event) => {
//     setSearchQuery(event.target.value);
//   }, []);

//   const dataFiltered = WORKFLOW_DATA.filter(
//     (item) =>
//       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.path.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const notFound = searchQuery && !dataFiltered.length;

//   const renderItems = () => (
//     <Box component="ul">
//       {dataFiltered.map((item, index) => {
//         const { title, path, isActive } = item;

//         // Highlight parts of the title and path based on search query
//         const partsTitle = parse(title, match(title, searchQuery));
//         const partsPath = parse(path, match(path, searchQuery));

//         return (
//           <Box
//             component="li"
//             key={`${title}-${index}`}
//             sx={{
//               display: 'flex',
//               '&:not(:last-of-type)': {
//                 borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
//                 // Add hover effect to remove the border
//                 '&:hover': {
//                   borderBottomColor: '#ffffff',
//                 },
//               },
//             }}
//           >
//             <ResultItem
//               path={partsPath}
//               title={partsTitle}
//               groupLabel={searchQuery && path}
//               isActive={isActive}
//               onClickItem={() => handleClick(path)}
//             />
//           </Box>
//         );
//       })}
//     </Box>
//   );

//   const renderButton = (
//     <Tooltip title="You can search workflow from here." arrow placement="bottom">
//       <Box
//         display="flex"
//         alignItems="center"
//         onClick={search.onTrue}
//         sx={{
//           fontSize: 14,
//           fontWeight: 500,
//           color: 'grey.600',
//           pr: { sm: 1 },
//           borderRadius: { sm: 1.5 },
//           cursor: { sm: 'pointer' },
//           bgcolor: { sm: varAlpha(theme.vars.palette.grey['500Channel'], 0.08) },
//           ...sx,
//         }}
//         {...other}
//       >
//         <IconButton disableRipple>
//           <SvgIcon sx={{ width: 20, height: 20 }}>
//             <path
//               fill="currentColor"
//               d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
//             />
//           </SvgIcon>
//         </IconButton>
//         <Label
//           sx={{
//             ml: 1,
//             fontSize: 12,
//             color: 'grey.800',
//             bgcolor: 'common.white',
//             boxShadow: theme.customShadows.z1,
//             display: { xs: 'none', md: 'inline-flex' },
//           }}
//         >
//           Search Workflow by Name or Webhook URL
//         </Label>
//       </Box>
//     </Tooltip>
//   );

//   return (
//     <>
//       {renderButton}

//       <Dialog
//         fullWidth
//         disableRestoreFocus
//         maxWidth="sm"
//         open={search.value}
//         onClose={handleClose}
//         transitionDuration={{
//           enter: theme.transitions.duration.shortest,
//           exit: 0,
//         }}
//         PaperProps={{ sx: { mt: 15, overflow: 'unset' } }}
//         sx={{ [`& .${dialogClasses.container}`]: { alignItems: 'flex-start' } }}
//       >
//         <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.vars.palette.divider}` }}>
//           <InputBase
//             fullWidth
//             autoFocus
//             placeholder="Search Workflow by Name or Webhook URL"
//             value={searchQuery}
//             onChange={handleSearch}
//             startAdornment={
//               <InputAdornment position="start">
//                 <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
//               </InputAdornment>
//             }
//             endAdornment={
//               <Label
//                 sx={{ letterSpacing: 1, color: 'text.secondary', cursor: 'pointer' }}
//                 onClick={handleClose}
//               >
//                 esc
//               </Label>
//             }
//             inputProps={{ sx: { typography: 'h7' } }}
//           />
//         </Box>

//         {notFound ? (
//           <SearchNotFound query={searchQuery} sx={{ py: 15 }} />
//         ) : (
//           <Scrollbar sx={{ px: 3, pb: 3, pt: 2, height: 400 }}>{renderItems()}</Scrollbar>
//         )}
//       </Dialog>
//     </>
//   );
// }

import { useState, useCallback } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';

import { useRouter } from 'src/routes/hooks';
import { isExternalLink } from 'src/routes/utils';

import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

const ResultItem = ({ title, path, groupLabel, isActive, onClickItem }) => {
  // Convert title array to a string if it's an array for tooltip
  const titleText = typeof title === 'string' ? title : title.map((part) => part.text).join('');

  return (
    <Box
      onClick={onClickItem}
      sx={{
        p: 2,
        width: 1,
        borderRadius: 1,
        cursor: 'pointer',
        typography: 'body2',
        color: 'text.primary',
        bgcolor: 'transparent',
        transition: 'all 0.2s ease-in-out',
        border: '1px solid transparent',
        '&:hover': {
          bgcolor: 'rgba(0, 114, 229, 0.06)',
          border: '1px dashed rgb(0, 114, 229)',
          borderRadius: '8px',
        },
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <div>
          {title && (
            <Tooltip title={`Workflow Name: ${titleText}`} placement="top" arrow>
              <div>
                {typeof title === 'string' ? (
                  <strong>{title}</strong>
                ) : (
                  <strong>
                    {title.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          color: part.highlight ? 'primary.main' : 'text.primary',
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </strong>
                )}
              </div>
            </Tooltip>
          )}

          {path && (
            <Box
              component="div"
              sx={{
                color: 'text.secondary',
                mt: 0.5,
              }}
            >
              {typeof path === 'string' ? (
                path
              ) : (
                <>
                  {path.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        color: part.highlight ? 'primary.main' : 'text.secondary',
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </>
              )}
            </Box>
          )}
        </div> */}

        <div>
          {title && (
            <Tooltip title={`Workflow Name: ${titleText}`} placement="top" arrow>
              <div
                style={{
                  width: 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {typeof title === 'string' ? (
                  <strong>{title}</strong>
                ) : (
                  <strong>
                    {title.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          color: part.highlight ? 'primary.main' : 'text.primary',
                          whiteSpace: 'nowrap', // Ensure each part of title remains inline
                          overflow: 'hidden', // Hide overflow
                          textOverflow: 'ellipsis', // Apply ellipsis
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </strong>
                )}
              </div>
            </Tooltip>
          )}

          {path && (
            <Box
              component="div"
              sx={{
                display: 'auto',
                color: 'text.secondary',
                mt: 0.5,
              }}
            >
              {typeof path === 'string' ? (
                path
              ) : (
                <>
                  {path.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        color: part.highlight ? 'primary.main' : 'text.secondary',
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </>
              )}
            </Box>
          )}
        </div>

        <div>
          <Label
            variant="soft"
            color={isActive ? 'success' : 'error'}
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {isActive ? 'Active' : 'Inactive'}
          </Label>
        </div>
      </div>
    </Box>
  );
};

const WORKFLOW_DATA = [
  {
    title: 'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    path: 'Home',
    isActive: true,
  },
  {
    title: 'Create Invoice in QuickBooks after Stripe Payment',
    path: 'Home',
    isActive: false,
  },
  {
    title: 'Update Customer in Hubspot on New Sale in Shopify',
    path: 'Integration',
    isActive: true,
  },
  {
    title: 'Send Slack Notification on New Deal in Pipedrive',
    path: 'Automation',
    isActive: true,
  },
  {
    title: 'Add Lead in Salesforce on New Google Form Submission',
    path: 'Forms',
    isActive: false,
  },
];

export function Searchbar({ data: navItems = [], sx, ...other }) {
  const theme = useTheme();
  const router = useRouter();
  const search = useBoolean();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = useCallback(() => {
    search.onFalse();
    setSearchQuery('');
  }, [search]);

  const handleKeyDown = (event) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  useEventListener('keydown', handleKeyDown);

  const handleClick = useCallback(
    (path) => {
      if (isExternalLink(path)) {
        window.open(path);
      } else {
        router.push(path);
      }
      handleClose();
    },
    [handleClose, router]
  );

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const dataFiltered = WORKFLOW_DATA.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const notFound = searchQuery && !dataFiltered.length;

  const renderItems = () => (
    <Box component="ul">
      {dataFiltered.map((item, index) => {
        const { title, path, isActive } = item;

        const partsTitle = parse(title, match(title, searchQuery));
        const partsPath = parse(path, match(path, searchQuery));

        return (
          <Box
            component="li"
            key={`${title}-${index}`}
            sx={{
              display: 'flex',
              '&:not(:last-of-type)': {
                borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
                '&:hover': {
                  borderBottomColor: '#ffffff',
                },
              },
            }}
          >
            <ResultItem
              path={partsPath}
              title={partsTitle}
              groupLabel={searchQuery && path}
              isActive={isActive}
              onClickItem={() => handleClick(path)}
            />
          </Box>
        );
      })}
    </Box>
  );

  const renderButton = (
    <Tooltip title="You can search workflow from here." arrow placement="bottom">
      <Box
        display="flex"
        alignItems="center"
        onClick={search.onTrue}
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: 'grey.600',
          pr: { sm: 1 },
          borderRadius: { sm: 1.5 },
          cursor: { sm: 'pointer' },
          bgcolor: { sm: varAlpha(theme.vars.palette.grey['500Channel'], 0.08) },
          ...sx,
        }}
        {...other}
      >
        <IconButton disableRipple>
          <SvgIcon sx={{ width: 20, height: 20 }}>
            <path
              fill="currentColor"
              d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
            />
          </SvgIcon>
        </IconButton>
        <Label
          sx={{
            ml: 1,
            fontSize: 12,
            color: 'grey.800',
            bgcolor: 'common.white',
            boxShadow: theme.customShadows.z1,
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          Search Workflow by Name or Webhook URL
        </Label>
      </Box>
    </Tooltip>
  );

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        disableRestoreFocus
        maxWidth="sm"
        open={search.value}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{ sx: { mt: 15, overflow: 'unset' } }}
        sx={{ [`& .${dialogClasses.container}`]: { alignItems: 'flex-start' } }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.vars.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search Workflow by Name or Webhook URL"
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={
              <Label
                sx={{ letterSpacing: 1, color: 'text.secondary', cursor: 'pointer' }}
                onClick={handleClose}
              >
                esc
              </Label>
            }
            inputProps={{ sx: { typography: 'h7' } }}
          />
        </Box>

        {notFound ? (
          <SearchNotFound query={searchQuery} sx={{ py: 15 }} />
        ) : (
          <Scrollbar sx={{ px: 3, pb: 3, pt: 2, height: 400 }}>{renderItems()}</Scrollbar>
        )}
      </Dialog>
    </>
  );
}
