import { Model, NodeModel } from '@patternfly/react-topology';
import { ExtPodKind } from './pods';
import { OverviewItem } from './resource';
import { K8sResourceKind, WatchK8sResults } from './types';

export type TrafficData = {
  nodes: KialiNode[];
  edges: KialiEdge[];
};

export type KialiNode = {
  data: {
    id: string;
    nodeType: string;
    namespace: string;
    workload: string;
    app: string;
    version?: string;
    destServices?: { [key: string]: any }[];
    traffic?: { [key: string]: any }[];
  };
};

export type KialiEdge = {
  data: {
    id: string;
    source: string;
    target: string;
    traffic: { [key: string]: any };
  };
};

export interface KindsMap {
  [key: string]: string;
}

export type TopologyResourcesObject = { [key: string]: K8sResourceKind[] };

export type TopologyDataResources = WatchK8sResults<TopologyResourcesObject>;

export type TopologyDataModelDepicted = (
  resource: K8sResourceKind,
  model: Model,
) => boolean;


export interface OdcNodeModel extends NodeModel {
  resource?: K8sResourceKind;
  resourceKind?: string;
}

export interface TopologyDataObject<D = {}> {
  id: string;
  name: string;
  type: string;
  resources: OverviewItem;
  pods?: ExtPodKind[];
  data: D;
  resource: K8sResourceKind | null;
  groupResources?: OdcNodeModel[];
}