export const WEBHOOK_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const _webhook = [...Array(20)].map((_, index) => {
  const status = index % 2 === 0 ? 'active' : 'inactive';

  const webhook_names = [
    'Limit Reached Testing',
    'Pablly Webhook',
    'Webhook Email Marketing',
    'Webhook Form Builder',
    'Webhook Email Verification',
  ];

  const webhook_name = webhook_names[index % webhook_names.length];

  const webhook_events = [
    'Task Usage Limit Exhausted',
    'New Workflow Error',
    'New Workflow Error',
    'New Workflow Error',
    'New Workflow Error',
  ];

  const webhook_event = webhook_events[index % webhook_events.length];

  const webhook_urls = [
    'http://54.186.67.24/workflow/sendwebhookdata/IjU3NjMwNTY4MDYzNzA0MzM1MjZlNTUzNiI_3D_pc',
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzNTA0Mzc1MjZlNTUzNTUxMzci_pc',
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzNTA0Mzc1MjZlNTUzNTUxMzci_pc',
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzNTA0Mzc1MjZlNTUzNTUxMzci_pc',
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzNTA0Mzc1MjZlNTUzNTUxMzci_pc',
  ];

  const webhook_url = webhook_urls[index % webhook_urls.length];

  return {
    id: `workflow-${index}`,
    status,
    webhook_name,
    webhook_event,
    webhook_url,
  };
});
