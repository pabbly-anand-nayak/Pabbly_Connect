// import dayjs from 'dayjs';

// import { _mock } from 'src/_mock';

// // ----------------------------------------------------------------------

// export const TASKHISTORY_STATUS_OPTIONS = [
//   // { value: 'pending', label: 'Active' },
//   { value: 'live', label: 'Success' },
//   { value: 'partialfailed', label: 'Partial Failed' },
//   { value: 'failed', label: 'Failed' },
// ];

// const ITEMS = [...Array(3)].map((_, index) => ({
//   id: _mock.id(index),
//   sku: `16H9UR${index}`,
//   quantity: index + 1,
//   name: _mock.productName(index),
//   coverUrl: _mock.image.product(index),
//   price: _mock.number.price(index),
// }));

// export const _taskhistory = [...Array(20)].map((_, index) => {
//   let status;
//   if (index % 3 === 0) {
//     status = 'live';
//   } else if (index % 2 === 0) {
//     status = 'partialfailed';
//   } else {
//     status = 'failed';
//   }

//   const shipping = 10;

//   const discount = 10;

//   const taxes = 10;

//   const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 4 && ITEMS.slice(1, 3)) || ITEMS;

//   const totalQuantity = items.reduce((accumulator, item) => accumulator + item.quantity, 0);

//   const subtotal = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

//   const totalAmount = subtotal - shipping - discount + taxes;

//   const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

//   const variableName = variableNames[index % variableNames.length];

//   const customer = {
//     id: _mock.id(index),
//     name: _mock.fullName(index),
//     email: _mock.email(index),
//     avatarUrl: _mock.image.avatar(index),
//     ipAddress: '192.158.1.38',
//   };

//   const delivery = { shipBy: 'DHL', speedy: 'Standard', trackingNumber: 'SPX037739199373' };

//   const variableNames = [
//     'E-Mail',
//     'Mobile Number',
//     'Address',
//     'Time',
//     'Current Time (Account Time zone)',
//   ];

//   const workflowNames = [
//     'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
//     'Create Invoice in QuickBooks after Stripe Payment',
//     'Update Customer in Hubspot on New Sale in Shopify',
//     'Send Slack Notification on New Deal in Pipedrive',
//     'Add Lead in Salesforce on New Google Form Submission',
//   ];
//   const workflowName = workflowNames[index % workflowNames.length];

//   const appIcons = [
//     ['/assets/icons/app logo/Uteach app logo.png', '/assets/icons/app logo/convertkit_icon.png'],
//     ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/quickbooks_icon.webp'],
//     ['/assets/icons/app logo/pabbly-api.png', '/assets/icons/app logo/Hubspot icon.png'],
//     ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/slack_icon.webp'],
//     ['/assets/icons/app logo/salesforce_icon.webp', '/assets/icons/app logo/google_form_icon.png'],
//   ];

//   const [icon1, icon2] = appIcons[index % appIcons.length];

//   return {
//     id: _mock.id(index),
//     orderNumber: `#601${index}`,
//     createdAt: dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss'),
//     icon1,
//     icon2,
//     workflowName,
//     variableName,
//     status,
//   };
// });
// // import { _mock } from './_mock';

// // ----------------------------------------------------------------------

import dayjs from 'dayjs';

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

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

const appIcons = [
  ['/assets/icons/app logo/Uteach app logo.png', '/assets/icons/app logo/convertkit_icon.png'],
  ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/quickbooks_icon.webp'],
  ['/assets/icons/app logo/pabbly-api.png', '/assets/icons/app logo/Hubspot icon.png'],
  ['/assets/icons/app logo/pabbly_icon.png', '/assets/icons/app logo/slack_icon.webp'],
  ['/assets/icons/app logo/salesforce_icon.webp', '/assets/icons/app logo/google_form_icon.png'],
];

const ITEMS = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  sku: `16H9UR${index}`,
  quantity: index + 1,
  name: _mock.productName(index),
  coverUrl: _mock.image.product(index),
  price: _mock.number.price(index),
}));

export const _taskhistory = [...Array(20)].map((_, index) => {
  let status;
  if (index % 3 === 0) {
    status = 'live';
  } else if (index % 2 === 0) {
    status = 'partialfailed';
  } else {
    status = 'failed';
  }

  const shipping = 10;
  const discount = 10;
  const taxes = 10;

  const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 4 && ITEMS.slice(1, 3)) || ITEMS;
  const totalQuantity = items.reduce((accumulator, item) => accumulator + item.quantity, 0);
  const subtotal = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
  const totalAmount = subtotal - shipping - discount + taxes;

  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');
  const variableName = variableNames[index % variableNames.length];
  const workflowName = workflowNames[index % workflowNames.length];
  const [icon1, icon2] = appIcons[index % appIcons.length];

  const customer = {
    id: _mock.id(index),
    name: _mock.fullName(index),
    email: _mock.email(index),
    avatarUrl: _mock.image.avatar(index),
    ipAddress: '192.158.1.38',
  };

  const delivery = {
    shipBy: 'DHL',
    speedy: 'Standard',
    trackingNumber: 'SPX037739199373',
  };

  return {
    id: _mock.id(index),
    orderNumber: `#601${index}`,
    createdAt,
    icon1,
    icon2,
    workflowName,
    variableName,
    status,
    items,
    totalQuantity,
    subtotal,
    totalAmount,
    customer,
    delivery,
  };
});
