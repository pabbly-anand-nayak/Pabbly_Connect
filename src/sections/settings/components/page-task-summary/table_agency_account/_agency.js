import dayjs from 'dayjs';

export const AGENCY_STATUS_OPTIONS = [
  { value: 'revocable', label: 'Revocable' },
  { value: 'non-revocable', label: 'Non-Revocable' },
];

export const _agency = [...Array(5)].map((_, index) => {
  const status = index % 2 === 0 ? 'revocable' : 'non-revocable';

  const assignedEmails = [
    'admin@pabbly.com',
    'hardik.pradhan@pabbly.com',
    'anand.nayak@pabbly.com',
    'nikhil.patel@pabbly.com',
    'rajendra.jatav@pabbly.com',
  ];

  const assignedEmail = assignedEmails[index % assignedEmails.length];

  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  return {
    id: `agencyAccount-${index}`,
    status,
    assignedEmail,
    totalQuantity: (index + 1) * 5,
    createdAt,
  };
});
