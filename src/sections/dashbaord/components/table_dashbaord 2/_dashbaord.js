import dayjs from 'dayjs';

import { _mock } from '../../../../_mock/_mock';

export const DASHBOARD_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const ITEMS = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  sku: `16H9UR${index}`,
  quantity: index + 1,
  name: _mock.productName(index),
  coverUrl: _mock.image.product(index),
  price: _mock.number.price(index),
}));

export const _dashboard = [...Array(20)].map((_, index) => {
  const status = index % 2 === 0 ? 'active' : 'inactive';

  const workflowNames = [
    'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    'Create Invoice in QuickBooks after Stripe Payment',
    'Update Customer in Hubspot on New Sale in Shopify',
    'Send Slack Notification on New Deal in Pipedrive',
    'Add Lead in Salesforce on New Google Form Submission',
  ];

  const workflowName = workflowNames[index % workflowNames.length];

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
    totalQuantity: (index + 1) * 5,
    createdAt,
    icon1,
    icon2,
  };
});
