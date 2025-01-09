import dayjs from 'dayjs';

export const SUBACCOUNTS_STATUS_OPTIONS = [
  { value: 'revocable', label: 'Revocable' },
  { value: 'non-revocable', label: 'Non-Revocable' },
];

export const _subaccounts = [...Array(10)].map((_, index) => {
  const status = index % 2 === 0 ? 'revocable' : 'non-revocable';

  const assignedEmails = [
    'neeraj.agarwal@pabbly.com',
    'hardik.pradhan@pabbly.com',
    'anand.nayak@pabbly.com',
    'nikhil.patel@pabbly.com',
    'rajendra.jatav@pabbly.com',
  ];

  const assignedEmail = assignedEmails[index % assignedEmails.length];

  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  return {
    id: `assignedOn-${index}`,
    status,
    assignedEmail,
    totalQuantity: (index + 1) * 5,
    createdAt,
  };
});
