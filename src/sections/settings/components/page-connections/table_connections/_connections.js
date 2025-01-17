import dayjs from 'dayjs';

export const CONNECTIONS_STATUS_OPTIONS = [
  { value: 'revocable', label: 'In Use' },
  { value: 'non-revocable', label: 'Idle' },
];

const appIcons = [
  '/assets/icons/app logo/mailerlite.png',
  '/assets/icons/app logo/Webhook.site.png',
  '/assets/icons/app logo/airtable.png',
  '/assets/icons/app logo/airtable.png',
  '/assets/icons/app logo/google-sheets.png',
];

const connectionNames = [
  'MailerLite #1',
  'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',

  'Webhook.site #1',
  'Airtable #1',
  'Airtable #2',
  'Google Sheets #1',
];

const connectionNumbers = ['4', '0', '1', '0', '1'];
const appnames = ['MailerLite', 'Webhook.site', 'Airtable', 'Airtable', 'Google Sheets'];

export const _connections = [...Array(4)].map((_, index) => {
  const status = index % 2 === 0 ? 'revocable' : 'non-revocable';
  const icon1 = appIcons[index % appIcons.length];
  const connectionName = connectionNames[index % connectionNames.length];
  const appname = appnames[index % appnames.length];
  const connectionNumber = connectionNumbers[index % connectionNumbers.length];

  const createdOn = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');


  return {
    id: `workflow-${index + 1}`,
    status,
    connectionName,
    totalQuantity: (index + 1) * 5,
    createdOn,
    icon1,
    applications: [
      {
        name: `App ${index + 1}`,
        icon: icon1,
      },
      // You can add more applications here if needed
    ],
    // folder: 'Home', // Add a folder property
    appname,
    connectionNumber,
  };
});
