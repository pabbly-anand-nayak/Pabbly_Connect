export const SYSTEMVARIABLES_STATUS_OPTIONS = [
  { value: 'revocable', label: 'Revocable' },
  { value: 'non-revocable', label: 'Non-Revocable' },
];

export const _systemvariables = [...Array(20)].map((_, index) => {
  const status = index % 2 === 0 ? 'revocable' : 'non-revocable';

  const variableNames = [
    'gc_curr_date_time',
    'gc_curr_date_time_plus_3m',
    'pc_unix_timestamp',
    'pc_utc_timestamp_now',
    'pc_local_timestamp_now',
    'pc_local_human_now',
    'pc_utc_date_now',
    'pc_local_date_now',
    'pc_yesterday_curr_date_time',
    'pc_last_month_curr_date_time',
    'workflow_step_id',
    'hex_enc_bytes',
    '##boolean:true##',
    '##boolean:false##',
    'blank',
    'space',
    'skip',
    'pc_skip_field_with_parent',
    'pc_skip_field',
    '{{pc_skip_field}}',
  ];

  const descriptions = [
    'Prints the current date and time in the UTC time zone.',
    'Prints the date and time after adding a specified number of minutes to the current time. For example, to add 3 minutes to the current time, use gc_curr_date_time_plus_3m. You can add or subtract any number of minutes, e.g., gc_curr_date_time_plus_-25m.',
    'Prints the current time in UNIX timestamp format.',
    'Prints the current time as a UTC timestamp.',
    'Prints the current time in the local time zone. The local time zone needs to be set in your Account Settings.',
    'Prints the current date and time in the UTC time zone.',
    'Prints the current date and time in your local time zone. The local time zone needs to be set in your Account Settings.',
    'Prints the current date in the UTC time zone.',
    'Prints the current date in your local time zone. The local time zone needs to be set in your Account Settings.',
    "Prints yesterday's date in the UTC time zone.",
    "Prints last month's date in the UTC time zone.",
    'Prints the action step ID in the workflow.',
    'Prints a random hex-encoded value.',
    'Prints the boolean value as "true".',
    'Prints the boolean value as "false".',
    'Prints a blank value if the parameter value is empty.',
    'Prints a single space as the value.',
    'Prints null as the default value if the parameter value is empty. Used in the app developers platform of Pabbly Connect.',
    'Removes an object from the Raw JSON if its child fields are blank. Used in the app developers platform of Pabbly Connect.',
    'Removes a key-value pair from the Raw JSON if the field is blank. Used in the app developers platform of Pabbly Connect.',
  ];

  const variableDatas = [
    '2024-10-17T08:08:36+00:00',
    '2024-10-17T08:11:36+00:00',
    '1729152516',
    '1729152516',
    '1729152516',
    '10/17/2024 08:08AM',
    '10/17/2024 08:08AM',
    '2024-10-17',
    '2024-10-17',
    '2024-10-16T08:08:36+00:00',
    '2024-09-17T08:08:36Z',
    '{{workflow_step_id}}',
    '4458424b514e4341',
    '##boolean:false##',
    'true',
    'false',
    '-',
    '-',
    'null',
    '{{pc_skip_field}}',
    '{{pc_skip_field}}',
  ];

  const variableName = variableNames[index % variableNames.length];
  const description = descriptions[index % descriptions.length];

  const variableData = variableDatas[index % variableDatas.length];

  return {
    id: `workflow-${index}`,
    variableName,
    variableData,
    description,
  };
});
