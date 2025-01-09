import dayjs from 'dayjs';

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

export const TASKUSAGE_STATUS_OPTIONS = [
  // { value: 'pending', label: 'Active' },
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

export const _taskusage = [...Array(20)].map((_, index) => {
  const status = index % 2 === 0 ? 'active' : 'inactive';

  const shipping = 10;

  const discount = 10;

  const taxes = 10;

  const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 4 && ITEMS.slice(1, 3)) || ITEMS;

  const totalQuantity = items.reduce((accumulator, item) => accumulator + item.quantity, 0);

  const subtotal = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

  const totalAmount = subtotal - shipping - discount + taxes;

  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  const tasksConsumed = 61789 + index * 10; // Increment by 10 for unique values

  const freeTasksConsumed = 69825 + index * 5; // Increment by 5 for unique values

  const customer = {
    id: _mock.id(index),
    name: _mock.fullName(index),
    email: _mock.email(index),
    avatarUrl: _mock.image.avatar(index),
    ipAddress: '192.158.1.38',
  };

  const delivery = { shipBy: 'DHL', speedy: 'Standard', trackingNumber: 'SPX037739199373' };

  const history = {
    orderTime: _mock.time(1),
    paymentTime: _mock.time(2),
    deliveryTime: _mock.time(3),
    completionTime: _mock.time(4),
    timeline: [
      { title: 'Delivery successful', time: _mock.time(1) },
      { title: 'Transporting to [2]', time: _mock.time(2) },
      { title: 'Transporting to [1]', time: _mock.time(3) },
      { title: 'The shipping unit has picked up the goods', time: _mock.time(4) },
      { title: 'Order has been created', time: _mock.time(5) },
    ],
  };

  const workflowNames = [
    'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    'Create Invoice in QuickBooks after Stripe Payment',
    'Update Customer in Hubspot on New Sale in Shopify',
    'Send Slack Notification on New Deal in Pipedrive',
    'Add Lead in Salesforce on New Google Form Submission',
  ];
  const workflowName = workflowNames[index % workflowNames.length];

  const appIcons = [
    ['/assets/icons/app logo/Uteach app logo.png', '/assets/icons/app logo/convertkit_icon.png'],
    ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/quickbooks_icon.webp'],
    ['/assets/icons/app logo/pabbly-api.png', '/assets/icons/app logo/Hubspot icon.png'],
    ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/slack_icon.webp'],
    ['/assets/icons/app logo/salesforce_icon.webp', '/assets/icons/app logo/google_form_icon.png'],
  ];

  const appNumbers = ['+4', '+1', '+10', '+5', '+3'];

  const [icon1, icon2] = appIcons[index % appIcons.length];
  const currentAppNumbers = appNumbers[index % appNumbers.length];
  return {
    id: _mock.id(index),
    orderNumber: `#601${index}`,
    createdAt: dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss'),
    icon1: appIcons[index % appIcons.length][0],
    icon2: appIcons[index % appIcons.length][1],
    workflowName: workflowNames[index % workflowNames.length],
    appNumbers: currentAppNumbers,

    status,
    tasksConsumed,
    freeTasksConsumed,
  };
});
