import dayjs from 'dayjs';

export const TASKSUMMARY_STATUS_OPTIONS = [
  { value: 'revocable', label: 'Revocable' },
  { value: 'non-revocable', label: 'Non-Revocable' },
];

export const _tasksummary2 = [...Array(20)].map((_, index) => {
  const status = index % 2 === 0 ? 'revocable' : 'non-revocable';

  const emails = [
    'admin@pabbly.com',
    'hardik.pradhan@pabbly.com',
    'anand.nayak@pabbly.com',
    'nikhil.patel@pabbly.com',
    'rajendra.jatav@pabbly.com',
  ];

  const email = emails[index % emails.length];

  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  return {
    id: `workflow-${index}`,
    status,
    email,
    totalQuantity: (index + 1) * 5,
    createdAt,
  };
});
