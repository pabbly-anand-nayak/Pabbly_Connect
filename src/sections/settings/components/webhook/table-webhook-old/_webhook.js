export const WEBHOOK_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const _webhook = [...Array(20)].map((_, index) => {
  const status = index % 2 === 0 ? 'active' : 'inactive';

  const workflowNames = [
    'Limit Reached Testing',
    'Pablly Webhook',
    'Webhook Email Marketing',
    'Webhook Form Builder',
    'Webhook Email Verification',
  ];

  const workflowName = workflowNames[index % workflowNames.length];

  const webhookEvents = [
    'Task Usage Limit Exhausted',
    'New Workflow Error',
    'New Workflow Error',
    'New Workflow Error',
    'New Workflow Error',
  ];

  const webhookEvent = webhookEvents[index % webhookEvents.length];

  const webhookUrls = [
    'http://54.186.67.24/workflow/sendwebhookdata/IjU3NjMwNTY4MDYzNzA0MzM1MjZlNTUzNiI_3D_pc',
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzNTA0Mzc1MjZlNTUzNTUxMzci_pc',
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzNTA0Mzc1MjZlNTUzNTUxMzci_pc',
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzNTA0Mzc1MjZlNTUzNTUxMzci_pc',
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzNTA0Mzc1MjZlNTUzNTUxMzci_pc',
  ];

  const webhookUrl = webhookUrls[index % webhookUrls.length];

  return {
    id: `workflow-${index}`,
    status,
    workflowName,
    webhookEvent,
    webhookUrl,
  };
});
