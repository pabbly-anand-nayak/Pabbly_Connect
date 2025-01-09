import dayjs from 'dayjs';

import { _mock } from 'src/_mock';

export const TASKHISTORY_STATUS_OPTIONS = [
  { value: 'live', label: 'Success' },
  { value: 'partialfailed', label: 'Partial Failed' },
  { value: 'failed', label: 'Failed' },
];

const variableNames = [
  'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMiI_3D_pc',
  'IyU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzMSI_3D_pc',
  'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzNiI_3D_pc',
  'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzNiI_3D_pc',
  'IjU3NjcwNTZiMDYzNDA0Mzc1MjY0NTUzNiI_3D_pc',
];

const workflowNames = [
  'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
  'Create Invoice in QuickBooks after Stripe Payment',
  'Update Customer in Hubspot on New Sale in Shopify',
  'Send Slack Notification on New Deal in Pipedrive',
  'Add Lead in Salesforce on New Google Form Submission',
];

const appNumbers = ['+4', '+1', '+10', '+5', '+3'];

const appIcons = [
  ['/assets/icons/app logo/Uteach app logo.png', '/assets/icons/app logo/convertkit_icon.png'],
  ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/quickbooks_icon.webp'],
  ['/assets/icons/app logo/pabbly-api.png', '/assets/icons/app logo/Hubspot icon.png'],
  ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/slack_icon.webp'],
  ['/assets/icons/app logo/salesforce_icon.webp', '/assets/icons/app logo/google_form_icon.png'],
];

export const _taskhistory = [...Array(10)].map((_, index) => {
  let status;
  if (index % 3 === 0) {
    status = 'live';
  } else if (index % 2 === 0) {
    status = 'partialfailed';
  } else {
    status = 'failed';
  }

  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');
  const variableName = variableNames[index % variableNames.length];
  const workflowName = workflowNames[index % workflowNames.length];
  const [icon1, icon2] = appIcons[index % appIcons.length];
  const currentAppNumbers = appNumbers[index % appNumbers.length];

  return {
    id: _mock.id(index),
    orderNumber: `#601${index}`,
    createdAt,
    appNumbers: currentAppNumbers,
    icon1,
    icon2,
    workflowName,
    variableName,
    status,
  };
});
