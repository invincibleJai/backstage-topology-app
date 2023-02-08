import * as _ from 'lodash';
import { DeploymentModel, PodModel } from '../models';
import { Alert, Alerts } from '../types/monitoring-types';
import { OverviewItem } from "../types/resource";
import { K8sModel, K8sResourceKind } from "../types/types";
import { doesHpaMatch } from './hpa-utils';
import { WORKLOAD_TYPES } from "./topology-utils";

export const MONITORABLE_KINDS = ['Deployment', 'DeploymentConfig', 'StatefulSet', 'DaemonSet'];

export const alertMessageResources: { [labelName: string]: K8sModel } = {
  deployment: DeploymentModel,
  pod: PodModel,
};

type ResourceItem = {
  [key: string]: K8sResourceKind[];
};

export type ResourceUtil = (obj: K8sResourceKind, props: any) => ResourceItem | undefined;

export const validPod = (pod: K8sResourceKind) => {
  const owners = pod?.metadata?.ownerReferences;
  const phase = pod?.status?.phase;
  return _.isEmpty(owners) && phase !== 'Succeeded' && phase !== 'Failed';
};

export const getWorkloadMonitoringAlerts = (
  resource: K8sResourceKind,
  monitoringAlerts: Alerts,
): Alert[] => {
  const alerts = _.reduce(
    monitoringAlerts?.data,
    (acc:  Alert[], alert) => {
      const labelValues = _.map(alertMessageResources, (model, label) => alert?.labels?.[label]);
      if (_.find(labelValues, (val) => val === resource?.metadata?.name)) {
        acc.push(alert);
      }
      return acc;
    },
    [],
  );
  return alerts;
};

export const getOverviewItemForResource = (
  obj: K8sResourceKind,
  resources: any,
  utils?: ResourceUtil[],
): OverviewItem => {
  const isMonitorable = MONITORABLE_KINDS.includes(obj.kind as string);
  const monitoringAlerts = isMonitorable
    ? getWorkloadMonitoringAlerts(obj, resources?.monitoringAlerts)
    : undefined;
  const hpas = resources?.hpas?.data?.filter(doesHpaMatch(obj));

  const overviewItems: OverviewItem = {
    obj,
    hpas,
    isMonitorable,
    monitoringAlerts,
  };

  if (utils) {
    return utils.reduce((acc, util) => {
      return { ...acc, ...util(obj, resources) };
    }, overviewItems);
  }
  return overviewItems;
};

const isStandaloneJob = (job: K8sResourceKind) =>
  !_.find(job.metadata?.ownerReferences, (owner) => owner.kind === 'CronJob');

export const createOverviewItemForType = (
  type: string,
  resource: K8sResourceKind,
  resources: any,
  utils?: ResourceUtil[],
): OverviewItem | undefined => {
  if (!WORKLOAD_TYPES.includes(type)) {
    return undefined;
  }
  switch (type) {
    case 'jobs':
      return isStandaloneJob(resource)
        ? getOverviewItemForResource(resource, resources, utils)
        : undefined;
    case 'pods':
      return validPod(resource)
        ? getOverviewItemForResource(resource, resources, utils)
        : undefined;
    default:
      return getOverviewItemForResource(resource, resources, utils);
  }
};