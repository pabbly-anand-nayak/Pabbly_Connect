import { useState, useCallback } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import { Divider, Tooltip, TextField, DialogTitle, CircularProgress } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { isExternalLink } from 'src/routes/utils';

import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { SearchNotFound } from 'src/components/search-not-found';

const ResultItem = ({ title, path, groupLabel, isActive, onClickItem }) => {
  const titleText = typeof title === 'string' ? title : title.map((part) => part.text).join('');

  return (
    // ResultItem list
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          minWidth: 0,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <Tooltip title={`Workflow Name: ${titleText}`} placement="top" arrow>
              <div
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {typeof title === 'string' ? (
                  <strong
                    style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {title}
                  </strong>
                ) : (
                  <strong
                    style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
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
            <Tooltip
              title={`Folder Name: ${typeof path === 'string' ? path : path.map((part) => part.text).join('')}`}
              placement="top"
              arrow
            >
              <Box
                component="div"
                sx={{
                  color: 'text.secondary',
                  mt: 0.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
              >
                {typeof path === 'string' ? (
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{path}</span>
                ) : (
                  <>
                    {path.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          color: part.highlight ? 'primary.main' : 'text.secondary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </>
                )}
              </Box>
            </Tooltip>
          )}
        </div>

        <div style={{ marginLeft: '8px', flexShrink: 0 }}>
          <Tooltip
            title={isActive ? 'Workflow is Active.' : 'Workflow is Inactive.'}
            placement="top"
            arrow
          >
            <Label
              variant="soft"
              color={isActive ? 'success' : 'error'}
              sx={{
                textTransform: 'capitalize',
                whiteSpace: 'nowrap',
              }}
            >
              {isActive ? 'Active' : 'Inactive'}
            </Label>
          </Tooltip>
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
    path: 'Main Folder',
    isActive: false,
  },
  {
    title: 'Update Customer in Hubspot on New Sale in Shopify',
    path: 'Pabbly Subscription Billing',
    isActive: true,
  },
  {
    title: 'Send Slack Notification on New Deal in Pipedrive',
    path: 'Pabbly Email Marketing',
    isActive: true,
  },
  {
    title: 'Add Lead in Salesforce on New Google Form Submission',
    path: 'Pabbly Email Verification',
    isActive: false,
  },
  {
    title: 'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    path: 'Home',
    isActive: true,
  },
  {
    title: 'Create Invoice in QuickBooks after Stripe Payment',
    path: 'Main Folder',
    isActive: false,
  },
  {
    title: 'Update Customer in Hubspot on New Sale in Shopify',
    path: 'Pabbly Subscription Billing',
    isActive: true,
  },
  {
    title: 'Send Slack Notification on New Deal in Pipedrive',
    path: 'Pabbly Email Marketing',
    isActive: true,
  },
  {
    title: 'Add Lead in Salesforce on New Google Form Submission',
    path: 'Pabbly Email Verification',
    isActive: false,
  },
];

export function Searchbar({ data: navItems = [], query, sx, ...other }) {
  const theme = useTheme();
  const router = useRouter();
  const search = useBoolean();
  const [searchQuery, setSearchQuery] = useState('');
  const dialog = useBoolean();

  const NoWorkflow = WORKFLOW_DATA.length === 0; // Or some other condition to determine if no workflows exist
  const DataStatus = 'loading'; // You'll likely replace this with an actual state from your data fetching logic

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
      const href = paths.dashboard.workflow;
      if (isExternalLink(href)) {
        window.open(href);
      } else {
        router.push(href);
      }
      handleClose();
    },
    [handleClose, router]
  );

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
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
              width: 'auto',
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
              onClickItem={handleClick}
            />
          </Box>
        );
      })}
    </Box>
  );

  // Search bar
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
            color: 'text.disabled',
            bgcolor: 'common.white',
            boxShadow: theme.customShadows.z1,
            display: { xs: 'none', md: 'inline-flex' },
            cursor: 'pointer',
          }}
        >
          Search Workflow
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
        {/* DialogTitle */}
        <Box>
          <DialogTitle
            sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
            onClick={dialog.onFalse}
          >
            Search Workflow
            <Iconify
              onClick={handleClose}
              icon="uil:times"
              style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
            />
          </DialogTitle>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </Box>

        {/* Search Workflow by Name or Webhook */}
        <Box sx={{ p: '24px 24px 24px 24px' }}>
          <Tooltip
            title="Enter the workflow name or webhook URL to find specific automations."
            arrow
            placement="top"
          >
            <TextField
              fullWidth
              size="large"
              placeholder="Search Workflow by Name or Webhook URL..."
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" width={24} height={24} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <Iconify
                      icon="ic:round-clear"
                      style={{
                        cursor: 'pointer',
                        color: '#637381',
                      }}
                      onClick={handleClearSearch}
                    />
                  </InputAdornment>
                ) : null,
              }}
            />
          </Tooltip>
        </Box>

        {/* loading CircularProgress */}
        {DataStatus === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {/* SearchNotFound */}
        {NoWorkflow ? (
          <SearchNotFound
            title="No workflows found!"
            subTitle="There might not be any workflows created."
            notFound
          />
        ) : notFound ? (
          <SearchNotFound
            title="Search Not Found!"
            subTitle={`No results found for "${searchQuery}"`}
            query={searchQuery}
            sx={{ py: 0 }}
          />
        ) : (
          <Scrollbar sx={{ px: 3, pb: 3, pt: 1, height: 400 }}>{renderItems()}</Scrollbar>
        )}
      </Dialog>
    </>
  );
}
