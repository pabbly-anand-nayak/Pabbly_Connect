export const WEBHOOK_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const _webhook = [...Array(20)].map((_, index) => {
  const status = index % 2 === 0 ? 'active' : 'inactive';

  const workflowNames = [
    'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    'Create Invoice in QuickBooks after Stripe Payment',
    'Update Customer in Hubspot on New Sale in Shopify',
    'Send Slack Notification on New Deal in Pipedrive',
    'Add Lead in Salesforce on New Google Form Submission',
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
