import { EdgeModel, Model, NodeModel } from '@patternfly/react-topology';
import { TYPE_APPLICATION_GROUP, TYPE_TRAFFIC_CONNECTOR } from '../const';
import { Alerts } from "../types/monitoring-types";
import { KialiNode, TopologyDataModelDepicted, TopologyDataResources, TrafficData } from '../types/topology-types';
import { K8sResourceKind } from '../types/types';
import { createOverviewItemForType } from '../utils/resource-utils';
import { createTopologyNodeData, WORKLOAD_TYPES } from '../utils/topology-utils';
import { addToTopologyDataModel, getTopologyEdgeItems, getTopologyGroupItems, getTopologyNodeItem, mergeGroup, WorkloadModelProps } from '../utils/transform-utils';

const TYPE_WORKLOAD = "workload"

const getBaseTopologyDataModel = (
  resources: { [x: string]: Alerts } | TopologyDataResources,
): Model => {
  const baseDataModel: Model = {
    nodes: [],
    edges: [],
  };

  WORKLOAD_TYPES.forEach((key: string) => {
    if (resources?.[key]?.data?.length) {
      const typedDataModel: Model = {
        nodes: [],
        edges: [],
      };

      resources[key].data.forEach((resource) => {
        const item = createOverviewItemForType(key, resource as K8sResourceKind, resources);
        if (item) {
          const data = createTopologyNodeData(
            resource as K8sResourceKind,
            item,
            TYPE_WORKLOAD,
            'default image',
          );
          typedDataModel.nodes?.push(
            getTopologyNodeItem(resource as K8sResourceKind, TYPE_WORKLOAD, data, WorkloadModelProps),
          );
          mergeGroup(getTopologyGroupItems(resource as K8sResourceKind) as NodeModel, typedDataModel.nodes as NodeModel[]);
        }
      });
      addToTopologyDataModel(typedDataModel, baseDataModel);
    }
  });

  return baseDataModel;
};

const updateAppGroupChildren = (model: Model) => {
  model.nodes?.forEach((n) => {
    if (n.type === TYPE_APPLICATION_GROUP) {
      // Filter out any children removed by depicters
      n.children = n.children?.filter((id) => model.nodes?.find((child) => child.id === id));
      n.data.groupResources = n.children?.map((id) => model.nodes?.find((c) => id === c.id)) ?? [];
    }
  });

  // Remove any empty groups
  model.nodes = model.nodes?.filter(
    (n) => n.type !== TYPE_APPLICATION_GROUP || n.children?.length && n.children?.length > 0,
  );
};

export const getFilteredTrafficWorkload = (nodes: KialiNode[]): KialiNode[] =>
  nodes.filter(({ data }) => data.nodeType === TYPE_WORKLOAD);

export const getTrafficConnectors = (
  trafficData: TrafficData,
  resources: K8sResourceKind[],
): EdgeModel[] => {
  const filteredWorkload = getFilteredTrafficWorkload(trafficData.nodes);
  return trafficData.edges.reduce((acc, { data }) => {
    const { data: sourceTrafficNode } = filteredWorkload.find(
      (wrkld) => wrkld.data.id === data.source,
    ) as KialiNode;
    const { data: targetTrafficNode } = filteredWorkload.find(
      (wrkld) => wrkld.data.id === data.target,
    ) as KialiNode;
    const sourceResourceNode = resources.find((res) => {
      // TODO : check below
      // return res.metadata?.name === sourceTrafficNode[sourceTrafficNode.nodeType];
      return res.metadata?.name === sourceTrafficNode?.nodeType;
    });
    const targetResourceNode = resources.find(
      (res) => {
        // TODO : check below
        // res.metadata?.name === targetTrafficNode[targetTrafficNode.nodeType]
        return res.metadata?.name === targetTrafficNode?.nodeType;
      }
    );
    return sourceResourceNode && targetResourceNode
      ? [
          ...acc,
          {
            id: `${sourceResourceNode.metadata?.uid}_${targetResourceNode.metadata?.uid}`,
            type: TYPE_TRAFFIC_CONNECTOR,
            source: sourceResourceNode.metadata?.uid,
            target: targetResourceNode.metadata?.uid,
            data: data.traffic,
          },
        ]
      : acc;
  }, []);
};

const createVisualConnectors = (model: Model, workloadResources: K8sResourceKind[]) => {
  // Create all visual connectors
  workloadResources.forEach((dc) => {
    model.edges?.push(...getTopologyEdgeItems(dc, workloadResources));
  });
};

const createTrafficConnectors = (
  model: Model,
  workloadResources: K8sResourceKind[],
  trafficData?: TrafficData,
) => {
  // Create traffic connectors
  if (trafficData) {
    model.edges?.push(...getTrafficConnectors(trafficData, workloadResources));
  }
};

export const baseDataModelGetter = (
  model: Model,
  resources: TopologyDataResources,
  workloadResources: K8sResourceKind[],
  // dataModelDepicters?: TopologyDataModelDepicted[],
  trafficData?: TrafficData,
  monitoringAlerts?: Alerts,
): Model => {
  const res = { ...resources, ...(monitoringAlerts && {monitoringAlerts}) };
  const baseModel = getBaseTopologyDataModel(res);
  addToTopologyDataModel(baseModel, model);

  updateAppGroupChildren(model);
  createVisualConnectors(model, workloadResources);
  createTrafficConnectors(model, workloadResources, trafficData);

  return model;
};