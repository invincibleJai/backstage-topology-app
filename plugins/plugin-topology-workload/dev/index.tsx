import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { pluginTopologyWorkloadPlugin, PluginTopologyWorkloadPage } from '../src/plugin';

createDevApp()
  .registerPlugin(pluginTopologyWorkloadPlugin)
  .addPage({
    element: <PluginTopologyWorkloadPage />,
    title: 'Root Page',
    path: '/plugin-topology-workload'
  })
  .render();
