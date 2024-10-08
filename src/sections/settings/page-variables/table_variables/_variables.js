import dayjs from 'dayjs';

export const TASKSUMMARY_STATUS_OPTIONS = [
  { value: 'revocable', label: 'Revocable' },
  { value: 'non-revocable', label: 'Non-Revocable' },
];

export const _tasksummary = [...Array(20)].map((_, index) => {
  const status = index % 2 === 0 ? 'revocable' : 'non-revocable';

  const workflowNames = [
    '1853925345',
    'appTpjCGM6kPWlhwg',
    'app1XZEsa9Dy0xY2H',
    '1O3OrXyhLCgFyqzI_iM0R5Wbk4 ',
    'Test 123',
  ];

  const createdOn = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  const workflowName = workflowNames[index % workflowNames.length];

  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  return {
    id: `workflow-${index}`,
    workflowName,
    createdOn,
    totalQuantity: (index + 1) * 5,
    createdAt,
  };
});
