import dayjs from 'dayjs';



export const _changelogs = [...Array(5)].map((_, index) => {

  const variablesData = [
    'E-Mail',
    'Mobile_Number',
    'Address',
    'Time',
    'Current_Time_(Account_Time zone)_Current_Time_(Account_Time_zone)_Current_Time_(Account_Time_zone)_Current_Time_(Account_Time zone)_Current_Time_(Account_Time_zone)_Current_Time_(Account_Time_zone) ',
  ];

  const Changed_By_Workflows = [
    'Add Lead in Salesforce on New Google Form Submission',
    'Send Slack Notification on New Deal in Pipedrive',
    'Changed by Workflow',
  ];

  const Changed_By = [
    'admin@gmail.com',
    'admin@gmail.com',
    'admin@gmail.com',
    'admin@gmail.com',
    'admin@gmail.com',

    // 'admin@gmail.com_Current_Time_(Account_Time zone)_Current_Time_(Account_Time_zone)_Current_Time_(Account_Time_zone)_Current_Time_(Account_Time zone)_Current_Time_(Account_Time_zone)_Current_Time_(Account_Time_zone)',
  ];

  const updatedAt = dayjs().subtract(index, 'day').add(2, 'hours').format('MMM DD, YYYY HH:mm:ss'); // Updated time for demonstration
  const variableData = variablesData[index % variablesData.length];

  const changedBy = Changed_By[index % Changed_By.length];
  const changed_By_Workflow = Changed_By_Workflows[index % Changed_By_Workflows.length];

  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  return {
    id: `workflow-${index}`,
    variableData,
    changedBy,
    changed_By_Workflow,
    updatedAt,
  };
});
