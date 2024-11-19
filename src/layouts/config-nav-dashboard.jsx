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
      /**
       * Dashboard page  */
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },

      /**
       * Workflow page  */
      { title: 'Workflow', path: paths.dashboard.workflow, icon: ICONS.flows },

      /**
       * History page  */
      {
        title: 'History',
        path: paths.dashboard.history.root, // Direct path to "Task History"
        icon: ICONS.history,
      },

      /**
       * Settings page  */
      {
        title: 'Settings',
        path: paths.dashboard.setting.agencyTasks, // Direct path to "Task History"
        icon: ICONS.settings,
      },
    ],
  },

  // {
  //   items: [
  //     {
  //       title: 'Settings',
  //       path: paths.dashboard.group.root,
  //       icon: ICONS.settings,
  //       children: [
  //         // { title: 'Task Summary', path: paths.dashboard.group.root },
  //         // { title: 'Connections', path: paths.dashboard.group.connections },
  //         // { title: 'Variables', path: paths.dashboard.group.variables },

  //         // { title: 'Team Members', path: paths.dashboard.group.teammembers },
  //         // { title: 'API & Webhooks', path: paths.dashboard.group.apiwebhooks },
  //         { title: 'Time Zone', path: paths.dashboard.group.timezone },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   items: [
  //     {
  //       title: 'Settings',
  //       path: paths.dashboard.group.root,
  //       icon: ICONS.settings,
  //       children: [
  //         { title: 'Task Summary', path: paths.dashboard.group.root },
  //         { title: 'Connections', path: paths.dashboard.group.connections },
  //         { title: 'Variables', path: paths.dashboard.group.variables },

  //         { title: 'Team Members', path: paths.dashboard.group.teammembers },
  //         { title: 'API & Webhooks', path: paths.dashboard.group.apiwebhooks },
  //         { title: 'Time Zone', path: paths.dashboard.group.timezone },
  //       ],
  //     },
  //   ],
  // },

  /**
   * Get Help page  */
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
