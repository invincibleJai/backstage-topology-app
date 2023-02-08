import { Alert } from "./monitoring-types";
import { HorizontalPodAutoscalerKind, K8sResourceKind } from "./types";

export type OverviewItem<T = K8sResourceKind> = {
  obj: T;
  hpas?: HorizontalPodAutoscalerKind[];
  isOperatorBackedService?: boolean;
  isMonitorable?: boolean;
  monitoringAlerts?: Alert[];
};
