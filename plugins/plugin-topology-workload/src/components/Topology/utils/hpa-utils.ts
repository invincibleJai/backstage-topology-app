import { HorizontalPodAutoscalerKind, K8sResourceCommon } from "../types/types";


export const doesHpaMatch = (workload: K8sResourceCommon) => (
  thisHPA: HorizontalPodAutoscalerKind,
) => {
  const {
    apiVersion,
    kind,
    metadata,
  } = workload;
  const ref = thisHPA?.spec?.scaleTargetRef;
  return ref && ref.apiVersion === apiVersion && ref.kind === kind && ref.name === metadata?.name;
};
