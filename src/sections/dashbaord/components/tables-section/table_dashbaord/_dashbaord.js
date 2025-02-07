import dayjs from 'dayjs';

export const DASHBOARD_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const _dashboard = [...Array(10)].map((_, index) => {
  const status = index % 2 === 0 ? 'active' : 'inactive';

  const workflowNames = [
    'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    'Create Invoice in QuickBooks after Stripe Payment',
    'Update Customer in Hubspot on New Sale in Shopify',
    'Send Slack Notification on New Deal in Pipedrive',
    'Add Lead in Salesforce on New Google Form Submission',
    'Subscriber in Convertkit on Thrivecart Payment',
    'Google Form Submission',
  ];

  const workflowName = workflowNames[index % workflowNames.length];

  const folderNames = [
    'Lead Salesforce, Email Verification, Email Marketing, Subscription',
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
  ];
  const folderName = folderNames[index % folderNames.length];

  const appNumbers = ['+4', '+1', '+10', '+4', '+3'][index % 5]; // Directly assign the app number



  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  const appIcons = [
    ['/assets/icons/app logo/Uteach app logo.png', '/assets/icons/app logo/convertkit_icon.png'],
    ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/quickbooks_icon.webp'],
    ['/assets/icons/app logo/pabbly-api.png', '/assets/icons/app logo/Hubspot icon.png'],
    ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/slack_icon.webp'],
    ['/assets/icons/app logo/salesforce_icon.webp', '/assets/icons/app logo/google_form_icon.png'],
  ];

  const [icon1, icon2] = appIcons[index % appIcons.length];

  return {
    id: `workflow-${index}`,
    status,
    workflowName,
    folderName,
    appNumbers,
    totalQuantity: (index + 1) * 75,
    freeTasksConsumed: (index + 1) * 205,
    createdAt,
    icon1,
    icon2,
  };
});
