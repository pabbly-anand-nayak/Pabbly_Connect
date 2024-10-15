import dayjs from 'dayjs';

export const AGENCY_STATUS_OPTIONS = [
  { value: 'revocable', label: 'Revocable' },
  { value: 'non-revocable', label: 'Non-Revocable' },
];

export const _agency2 = [...Array(20)].map((_, index) => {
  const status = index % 2 === 0 ? 'revocable' : 'non-revocable';

  const workflowNames = [
    'admin@pabbly.com',
    'hardik.pradhan@pabbly.com',
    'anand.nayak@pabbly.com',
    'nikhil.patel@pabbly.com',
    'rajendra.jatav@pabbly.com',
  ];

  const workflowName = workflowNames[index % workflowNames.length];

  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  return {
    id: `workflow-${index}`,
    status,
    workflowName,
    totalQuantity: (index + 1) * 5,
    createdAt,
  };
});
