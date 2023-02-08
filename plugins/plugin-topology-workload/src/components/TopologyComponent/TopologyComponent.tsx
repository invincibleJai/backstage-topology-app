import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { TopologyWorkloadPackage } from '../Topology/TopologyWorkloadPackage';

import './TopologyComponent.css';

export const TopologyComponent = () => (
  <div className="pf-ri__topology">
    <TopologyWorkloadPackage />
  </div>
);
