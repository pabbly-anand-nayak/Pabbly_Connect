import React, { Fragment, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Avatar,
  Tooltip,
  Accordion,
  Typography,
  useMediaQuery,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// Importing components
import DataIn from './data_in'; 
import DataOut from './data_out'; 
import DataInApp2 from './data_in-app2';
import DataOutApp3 from './data_out-app3'; 
import DataOutApp2 from './data_out-app2'; 

export default function TriggerActionFlow({ sx, ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:700px)');
  const [expandedPanel, setExpandedPanel] = useState(false);

  // Descriptions for the actions
  const TriggerTooltip =
    'Once the selected trigger event occurs in the application, the Pabbly Connect workflow will be executed.';
  const TriggerStepName = 'Scheduler';
  const ActionTooltip =
    'This is an action step that you want to perform when your workflow is triggered. Pabbly will execute this step every time your workflow executes.';
  const ActionStepName = 'API by Pabbly';
  const ActionStepName2 = 'Delay (Pabbly)';

  // Managing the tabs
  const basicTabs = useTabs('two');

  // For ActionStepName2, set the default tab to 'three'
  const fullTabs = useTabs('one');
  const fullTabsForActionStep2 = useTabs('three'); // Setting 'three' as the default tab

  // Full tabs array containing all the steps, with hidden tabs filtered out
  const FULL_TABS = [
    {
      value: 'one',
      icon: <Iconify icon="bi:database-fill-down" width={24} />,
      label: 'Data In',
      form: <DataIn />,
      tooltip:
        'This data request is sent from Pabbly Connect to the application you have integrated in this step.',
    },
    {
      value: 'two',
      icon: <Iconify icon="bi:database-fill-up" width={24} />,
      label: 'Data Out',
      form: <DataOut />,
      tooltip:
        'This data response is returned back to the Pabbly Connect from the application you have integrated in this step.',
    },
    {
      value: 'three',
      icon: <Iconify icon="bi:database-fill-down" width={24} />,
      label: 'Data In',
      form: <DataInApp2 />,
      tooltip:
        'This data request is sent from Pabbly Connect to the application you have integrated in this step.',
    },
    {
      value: 'four',
      icon: <Iconify icon="bi:database-fill-up" width={24} />,
      label: 'Data Out',
      form: <DataOutApp2 />,
      tooltip:
        'This data response is returned back to the Pabbly Connect from the application you have integrated in this step.',
    },
    {
      value: 'five',
      icon: <Iconify icon="bi:database-fill-up" width={24} />,
      label: 'Data Out',
      form: <DataOutApp3 />,
      tooltip:
        'This data response is returned back to the Pabbly Connect from the application you have integrated in this step.',
    },
  ];

  // Filtering out hidden tabs for ActionStepName
  const filteredFullTabsForActionStep = FULL_TABS.filter(
    (tab) => tab.value !== 'two' && tab.value !== 'three' && tab.value !== 'five'
  );

  // Filtering out hidden tabs for ActionStepName2
  const filteredFullTabsForActionStep2 = FULL_TABS.filter(
    (tab) => tab.value !== 'one' && tab.value !== 'two' && tab.value !== 'four'
  );

  // The Data Out tab
  const DATA_OUT_TAB = [FULL_TABS[1]];

  // Handle accordion expansion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const getTaskTypeTooltip = (taskType) => {
    if (taskType === 'Free Task') {
      return "Pabbly Connect does not charge tasks for triggers and internal application steps. You're saving 50% on task usage by using Pabbly Connect.";
    }
    if (taskType === '5') {
      return 'This step has failed 5 time(s), including the initial execution and subsequent re-executions.';
    }
    return `This step has failed ${taskType?.toLowerCase() || ''} time(s), including the initial execution and subsequent re-executions.`;
  };

  // Function to render the accordion layout
  const renderAccordion = (
    index,
    tabs,
    tabState,
    stepName,
    actionName,
    taskType,
    isSuccess = true
  ) => (
    <Accordion
      expanded={expandedPanel === `panel${index}`}
      onChange={handleAccordionChange(`panel${index}`)}
      sx={{
        boxShadow: '0px 2px 20px -4px rgba(132, 136, 151, 0.24)',
        width: '100%',
        gap: '16px',
        border: '2px solid',
        borderColor: (theme1) =>
          theme.palette.mode === 'light' ? '#ffff' : 'var(--palette-text-secondary)',
        borderRadius: 2,
        color: 'primary.text',
        // bgcolor: 'common.white',
        // backgroundColor:
        //   theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,

        margin: 0,
        '&:hover': {
          border: '2px solid #078DEE',
        },
        '&.Mui-expanded': {
          margin: 0,
          borderRadius: 2,
        },
        '&.MuiAccordion-root': {
          '&:before': {
            display: 'none',
          },
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <Iconify
            icon="mingcute:up-fill"
            // color="#637381"
            sx={{
              '[data-mui-color-scheme="light"] &': {
                color: '#637381',
              },
              '[data-mui-color-scheme="dark"] &': {
                color: 'var(--palette-text-secondary)',
              },
            }}
          />
        }
        sx={{
          p: 3,
          m: 0,
          '&.Mui-expanded': { m: 0 },
          '& .MuiAccordionSummary-content': { m: 0 },
          '& .MuiAccordionSummary-content.Mui-expanded': { m: 0 },
          '& .MuiAccordionSummary-expandIconWrapper': {
            alignSelf: 'flex-start',
            marginTop: '18px',
            transition: 'transform 0.3s',
            '&.Mui-expanded': {
              transform: 'rotate(180deg)',
            },
          },
        }}
      >
        <Box display="flex" flexDirection="column" width="100%">
          <Box display="flex" gap="16px" justifyContent="space-between" width="100%">
            <Box display="flex" gap="16px">
              <Tooltip
                title={index === 0 ? 'Scheduler' : index === 1 ? 'API by Pabbly' : 'Delay (Pabbly)'}
                arrow
                placement="top"
                disableInteractive
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={`/assets/icons/app logo/pabbly${index === 0 ? '_icon' : index === 1 ? '-api' : '-delay'}.png`}
                    sx={{
                      p: 1,
                      width: 56,
                      height: 56,
                      bgcolor: 'background.neutral',
                      border: '1px solid #D4E2FF',
                    }}
                  />
                </Box>
              </Tooltip>

              <Box display="flex" flexDirection="column" gap="4px">
                <Tooltip
                  title={
                    index === 0
                      ? 'Once the selected trigger event occurs in the application, the Pabbly Connect workflow will be executed.'
                      : 'This is an action step that you want to perform when your workflow is triggered. Pabbly will execute this step every time your workflow executes.'
                  }
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <Typography
                    fontSize={14}
                    fontWeight={500}
                    sx={{
                      color: 'text.disabled',
                      maxWidth: '200px',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {index === 0 ? 'Trigger : When this happens …' : 'Action : Do this …'}
                  </Typography>
                </Tooltip>

                <Tooltip title={stepName} arrow placement="bottom" disableInteractive>
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    sx={{
                      maxWidth: '400px',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {stepName} :{' '}
                    <Box
                      component="span"
                      sx={{
                        '[data-mui-color-scheme="light"] &': {
                          color: '#637381',
                        },
                        '[data-mui-color-scheme="dark"] &': {
                          color: 'var(--palette-text-secondary)',
                        },
                      }}
                    >
                      {actionName}
                    </Box>
                  </Typography>
                </Tooltip>
              </Box>
            </Box>

            <Box gap={1} display="flex" alignItems="center">
              {!isMobile && taskType && (
                <Box gap={1} display="flex" alignItems="center" ml="auto">
                  <Tooltip
                    title={getTaskTypeTooltip(taskType)}
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <Label
                      color={index === 1 ? 'info' : 'success'}
                      variant="soft"
                      sx={{ height: '20px', borderRadius: '4px' }}
                    >
                      {taskType}
                    </Label>
                  </Tooltip>
                </Box>
              )}
              <Box gap={1} mr={1} display="flex" alignItems="center">
                {isSuccess ? (
                  <Tooltip title="Success" arrow placement="top" disableInteractive>
                    <Iconify
                      sx={{ color: 'success.main', cursor: 'pointer' }}
                      icon="icon-park-solid:check-one"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Failed Task. Click here to view failed reason"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <Iconify
                      sx={{ color: 'error.main', cursor: 'pointer' }}
                      icon="icon-park-solid:close-one"
                    />
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>

          {isMobile && taskType && (
            <Box mt={0.5} ml="72px">
              <Tooltip
                title={getTaskTypeTooltip(taskType)}
                arrow
                placement="top"
                disableInteractive
              >
                <Label color="info" variant="soft" sx={{ height: '20px', borderRadius: '4px' }}>
                  {taskType}
                </Label>
              </Tooltip>
            </Box>
          )}
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{ mt: 0, mb: 0, p: '0px 24px 24px 24px', borderTop: '1px dashed #D4E2FF' }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: isMobile ? 'stretch' : 'center',
            justifyContent: 'space-between',
            boxShadow: (theme1) =>
              `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          <Tabs
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
            }}
            value={tabState.value}
            onChange={tabState.onChange}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                icon={
                  <Tooltip title={tab.tooltip} arrow placement="top">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {tab.icon}
                      <Typography sx={{ ml: 1 }}>{tab.label}</Typography>
                    </Box>
                  </Tooltip>
                }
                value={tab.value}
              />
            ))}
          </Tabs>

          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'flex-end',
              padding: '8px 0',
              mt: isMobile ? 2 : 0,
            }}
          >
            {/* Additional UI elements can be added here if needed */}
          </Box>
        </Box>

        {tabs.map((tab) =>
          tab.value === tabState.value ? <Fragment key={tab.value}>{tab.form}</Fragment> : null
        )}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <>
      {/* Trigger : When this happens */}
      {renderAccordion(
        0,
        DATA_OUT_TAB,
        basicTabs,
        TriggerStepName,
        'Schedule workflow',
        'Free Task',
        true
      )}
      <Box display="flex" flexDirection="column" alignItems="center">
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
            mt: '-4px',
            mb: '-3px',
            color: '#84889780',
            '[data-mui-color-scheme="light"] &': {
              color: '#84889780',
            },
            '[data-mui-color-scheme="dark"] &': {
              color: 'var(--palette-text-secondary)',
            },
          }}
        />
      </Box>

      {/* no. of re-executions (Action : Do this …) */}
      {renderAccordion(
        1,
        filteredFullTabsForActionStep,
        fullTabs,
        ActionStepName,
        'Execute API Request',
        '5',
        false
      )}
      <Box display="flex" flexDirection="column" alignItems="center">
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
            mt: '-4px',
            // color: '#84889780',
            '[data-mui-color-scheme="light"] &': {
              color: '#84889780',
            },
            '[data-mui-color-scheme="dark"] &': {
              color: 'var(--palette-text-secondary)',
            },
          }}
        />
      </Box>
      {renderAccordion(
        2,
        filteredFullTabsForActionStep2,
        fullTabsForActionStep2,
        ActionStepName2,
        'For 1 Minutes',
        null,
        true
      )}
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        mt={4}
        gap={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-end', sm: 'center' },
          textAlign: { xs: 'right', sm: 'left' },
        }}
      >
        <Tooltip title="Total Number of Free Tasks Consumed." placement="top" arrow>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              sx={{
                '[data-mui-color-scheme="light"] &': {
                  color: '#637381',
                },
                '[data-mui-color-scheme="dark"] &': {
                  color: 'var(--palette-text-secondary)',
                },
              }}
            >
              Free Tasks Consumed
            </Typography>
            <Label variant="soft" color="success" component="span" sx={{ height: '20px' }}>
              2
            </Label>
          </Box>
        </Tooltip>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <Typography
            sx={{
              '[data-mui-color-scheme="light"] &': {
                color: '#637381',
              },
              '[data-mui-color-scheme="dark"] &': {
                color: 'var(--palette-text-secondary)',
              },
            }}
          >
            |
          </Typography>
        </Box>

        <Tooltip title="Total Number of Paid Tasks Consumed." placement="top" arrow>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              sx={{
                '[data-mui-color-scheme="light"] &': {
                  color: '#637381',
                },
                '[data-mui-color-scheme="dark"] &': {
                  color: 'var(--palette-text-secondary)',
                },
              }}
            >
              Paid Tasks Consumed
            </Typography>
            <Label variant="soft" color="info" component="span" sx={{ height: '20px' }}>
              1
            </Label>
          </Box>
        </Tooltip>
      </Box>
    </>
  );
}
