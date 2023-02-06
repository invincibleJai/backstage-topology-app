import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const pluginTopologyWorkloadPlugin = createPlugin({
  id: 'plugin-topology-workload',
  routes: {
    root: rootRouteRef,
  },
});

export const PluginTopologyWorkloadPage = pluginTopologyWorkloadPlugin.provide(
  createRoutableExtension({
    name: 'PluginTopologyWorkloadPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
