import { Model } from '@patternfly/react-topology';
// import { WatchK8sResults } from '@console/dynamic-plugin-sdk';
// import { Alerts } from '@console/internal/components/monitoring/types';
// import { TrafficData } from '../topology-types';
import { baseDataModelGetter } from './data-transformer';
// import { ExtensibleModel } from './ModelContext';
import {  WatchedResourceType, WatchK8sResults } from '../types/types';
import { Alerts } from '../types/monitoring-types';
import { TopologyResourcesObject, TrafficData } from '../types/topology-types';
import { getWorkloadResources } from '../utils/topology-utils';

export const updateTopologyDataModel = (
  resources: WatchK8sResults<TopologyResourcesObject>,
  watchedResources: WatchedResourceType,
  trafficData?: TrafficData,
  monitoringAlerts?: Alerts,
): Promise<{ loaded: boolean; loadError: string; model: Model | null}> => {
  // const { extensionsLoaded, watchedResources } = dataModelContext;
  // if (!extensionsLoaded || !resources) {
  //   return Promise.resolve({ loaded: false, loadError: '', model: null });
  // }
  if (!resources) {
    return Promise.resolve({ loaded: false, loadError: '', model: null });
  }

  const getLoadError = (key: string) => {
    if (resources[key].loadError) {
      return resources[key].loadError;
    }
    return '';
  };

  const isLoaded = (key: string) => {
    return resources[key].loaded;
  };

  const loadErrorKey = Object.keys(resources).find((key) => getLoadError(key));
  if (loadErrorKey) {
    return Promise.resolve({
      loaded: false,
      loadError: resources[loadErrorKey].loadError,
      model: null,
    });
  }

  if (!Object.keys(resources).every((key) => isLoaded(key))) {
    return Promise.resolve({ loaded: false, loadError: '', model: null });
  }

  // Get Workload objects from extensions
  // const workloadResources = dataModelContext.getWorkloadResources(resources);

  // Get model from each extension
  // const depicters = dataModelContext.dataModelDepicters;
  // return dataModelContext.getExtensionModels(resources).then((extensionsModel) => {
  //   const fullModel = baseDataModelGetter(
  //     extensionsModel,
  //     dataModelContext.namespace,
  //     resources,
  //     workloadResources,
  //     depicters,
  //     trafficData,
  //     monitoringAlerts,
  //   );
  //   dataModelContext.reconcileModel(fullModel, resources);
  //   return Promise.resolve({ loaded: true, loadError: '', model: fullModel });
  // });

  const workloadResources = getWorkloadResources(resources, watchedResources);
  const topologyModel: Model = {
    nodes: [],
    edges: [],
  };

  const fullModel = baseDataModelGetter(
    topologyModel,
    // dataModelContext.namespace,
    resources,
    workloadResources,
    // depicters,
    trafficData,
    monitoringAlerts,
  );

  return Promise.resolve({ loaded: true, loadError: '', model: fullModel });
};
