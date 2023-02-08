import { TopologyResourcesObject } from '../components/Topology/types/topology-types';
import { WatchedResourceType, WatchK8sResults } from '../components/Topology/types/types';
import { mockDeploymentData, mockPodData, mockReplicasetData } from './mock-deployment';

export const mockResources: WatchK8sResults<TopologyResourcesObject> = {
  deployments: {
    data: [mockDeploymentData],
    loaded: true,
    loadError: '',
  },
  pods: {
    data: [mockPodData],
    loaded: true,
    loadError: '',
  },
  replicaSets: {
    loaded: true,
    loadError: '',
    data: [mockReplicasetData]
  }
};

export const mockWatchedRes = (): WatchedResourceType => {
  const namespace = 'sample-app'
  return {
    deployments: {
      isList: true,
      kind: 'Deployment',
      namespace,
      optional: true,
    },
    pods: {
      isList: true,
      kind: 'Pod',
      namespace,
      optional: true,
    },
    services: {
      isList: true,
      kind: 'Service',
      namespace,
      optional: true,
    },
  };
};
