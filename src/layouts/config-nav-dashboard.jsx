import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  workflow: icon('ic-inbox'),
  contacts: icon('ic-contacts'),
  agentqueues: icon('ic-agentqueues'),
  templates: icon('ic-template'),
  broadcast: icon('ic-broadcast'),
  flows: icon('ic-flows'),
  settings: icon('ic-settings'),
  gethelp: icon('ic-gethelp'),
  history: icon('history'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    // subheader: 'Overview 6.0.0',
    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Workflow', path: paths.dashboard.workflow, icon: ICONS.flows },
      {
        title: 'History',
        path: paths.dashboard.history.root,
        icon: ICONS.history,
        children: [
          { title: 'Task History', path: paths.dashboard.history.root },
          { title: 'Task Usage by Workflows', path: paths.dashboard.history.taskusage },
        ],
      },
      // { title: 'Settings', path: paths.dashboard.agentQueue, icon: ICONS.agentqueues },
      // {
      //   title: 'Get Help',
      //   path: paths.dashboard.template.root,
      //   icon: ICONS.templates,
      //   children: [
      //     { title: 'Templates List', path: paths.dashboard.template.root },
      //     { title: 'Add Template', path: paths.dashboard.template.addtemplate },
      //   ],
      // },
      // {
      //   title: 'Broadcast',
      //   path: paths.dashboard.broadcast.root,
      //   icon: ICONS.broadcast,
      //   children: [
      //     { title: 'Broadcast List', path: paths.dashboard.broadcast.root },
      //     { title: 'Add Broadcast', path: paths.dashboard.broadcast.addbroadcast },
      //   ],
      // },
      // {
      //   title: 'Flows',
      //   path: paths.dashboard.flows.root,
      //   icon: ICONS.flows,
      //   children: [
      //     { title: 'Flow List', path: paths.dashboard.flows.root },
      //     { title: 'Create Flow', path: paths.dashboard.flows.createflow },
      //   ],
      // },
    ],
  },
  /**
   * Settings
   */
  {
    items: [
      {
        title: 'Settings',
        path: paths.dashboard.group.root,
        icon: ICONS.settings,
        children: [
          { title: 'Task Summary', path: paths.dashboard.group.root },
          { title: 'Connections', path: paths.dashboard.group.connections },
          { title: 'Variables', path: paths.dashboard.group.variables },
          // { title: 'API & Webhooks', path: paths.dashboard.group.quickreplies },
          // { title: 'Tags', path: paths.dashboard.group.tags },
          // { title: 'Time Zone', path: paths.dashboard.group.chatassignmentrules },
          // { title: 'Configure SLAs', path: paths.dashboard.group.configureslas },
          // { title: 'WhatsApp Widget', path: paths.dashboard.group.whatsAppwidget },
          // { title: 'Activity Log', path: paths.dashboard.group.activitylogs },
          { title: 'Team Members', path: paths.dashboard.group.teammembers },
          { title: 'API & Webhooks', path: paths.dashboard.group.apiwebhooks },
          { title: 'Time Zone', path: paths.dashboard.group.timezone },
        ],
      },
    ],
  },
  {
    items: [
      {
        title: 'Get Help',
        path: paths.dashboard.gethelp,
        icon: ICONS.gethelp,
      },
    ],
  },
];
