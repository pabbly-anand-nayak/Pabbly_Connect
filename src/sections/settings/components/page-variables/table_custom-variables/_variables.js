import dayjs from 'dayjs';

export const TASKSUMMARY_STATUS_OPTIONS = [
  { value: 'revocable', label: 'Revocable' },
  { value: 'non-revocable', label: 'Non-Revocable' },
];

export const _tasksummary = [...Array(10)].map((_, index) => {
  const status = index % 2 === 0 ? 'revocable' : 'non-revocable';

  const variableNames = [
    'E-Mail',
    'Mobile Number',
    'Address',
    'Time',
    'Current Time (Account Time zone) Current Time (Account Time zone) Current Time (Account Time zone) Current Time (Account Time zone) Current Time (Account Time zone)Current Time (Account Time zone)',
  ];

  const variableDatas = [
    'admin@gmail.com',
    '+91 9812345678',
    'Magnet Brains Software Technology Pvt. Ltd.E-3/49, 3rd Floor, Arera Colony, Bhopal, Madhya Pradesh, India 462016',
    '10:51:11',
    '1631091582',
  ];

  const createdOn = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');
  const updatedAt = dayjs().subtract(index, 'day').add(2, 'hours').format('MMM DD, YYYY HH:mm:ss'); // Updated time for demonstration
  const variableName = variableNames[index % variableNames.length];

  const variableData = variableDatas[index % variableDatas.length];
  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  return {
    id: `workflow-${index}`,
    status,
    variableName,
    variableData,
    createdOn,
    updatedAt,
    totalQuantity: (index + 1) * 5,
    createdAt,
  };
});
