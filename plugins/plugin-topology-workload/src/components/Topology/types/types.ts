import { NodeCondition } from "./node";

export type K8sModel = {
  abbr: string;
  kind: string;
  label: string;
  labelKey?: string;
  labelPlural: string;
  labelPluralKey?: string;
  plural: string;
  propagationPolicy?: 'Foreground' | 'Background';

  id?: string;
  crd?: boolean;
  apiVersion: string;
  apiGroup?: string;
  namespaced?: boolean;
  selector?: Selector;
  labels?: { [key: string]: string };
  annotations?: { [key: string]: string };
  verbs?: any[];
  shortNames?: string[];
  badge?: any;
  color?: string;

  // Legacy option for supporing plural names in URL paths when `crd: true`.
  // This should not be set for new models, but is needed to avoid breaking
  // existing links as we transition to using the API group in URL paths.
  legacyPluralURL?: boolean;
};

export type OwnerReference = {
  name: string;
  kind: string;
  uid: string;
  apiVersion: string;
  controller?: boolean;
  blockOwnerDeletion?: boolean;
};

export type ObjectMetadata = {
  annotations?: { [key: string]: string };
  clusterName?: string;
  creationTimestamp?: string;
  deletionGracePeriodSeconds?: number;
  deletionTimestamp?: string;
  finalizers?: string[];
  generateName?: string;
  generation?: number;
  labels?: { [key: string]: string };
  managedFields?: any[];
  name?: string;
  namespace?: string;
  ownerReferences?: OwnerReference[];
  resourceVersion?: string;
  uid?: string;
};

// Properties common to (almost) all Kubernetes resources.
export type K8sResourceCommon = {
  apiVersion?: string;
  kind?: string;
  metadata?: ObjectMetadata;
};

// Generic, unknown kind. Avoid when possible since it allows any key in spec
// or status, weakening type checking.
export type K8sResourceKind = K8sResourceCommon & {
  spec?: {
    [key: string]: any;
  };
  status?: { [key: string]: any };
  data?: { [key: string]: any };
};

export type WatchedResourceType = {
  [key: string]: {
    isList: boolean;
    kind: string;
    namespace: string;
    optional?: boolean;
  }
}

export type ResourcesObject = { [key: string]: K8sResourceCommon | K8sResourceCommon[] };

export type WatchK8sResultsObject<R extends K8sResourceCommon | K8sResourceCommon[]> = {
  data: R;
  loaded: boolean;
  loadError: any;
};

export type WatchK8sResults<R extends ResourcesObject> = {
  [k in keyof R]: WatchK8sResultsObject<R[k]>;
};

export enum Operator {
  Exists = 'Exists',
  DoesNotExist = 'DoesNotExist',
  In = 'In',
  NotIn = 'NotIn',
  Equals = 'Equals',
  NotEqual = 'NotEqual',
  GreaterThan = 'GreaterThan',
  LessThan = 'LessThan',
  NotEquals = 'NotEquals',
}

export type MatchExpression = {
  key: string;
  operator: Operator | string;
  values?: string[];
};

export type MatchLabels = {
  [key: string]: string;
};

export type Selector = {
  matchLabels?: MatchLabels;
  matchExpressions?: MatchExpression[];
};

type CurrentObject = {
  averageUtilization?: number;
  averageValue?: string;
  value?: string;
};

type MetricObject = {
  name: string;
  selector?: Selector;
};

type TargetObjcet = {
  averageUtilization?: number;
  type: string;
  averageValue?: string;
  value?: string;
};

type DescribedObject = {
  apiVersion?: string;
  kind: string;
  name: string;
};
export type HPAMetric = {
  type: 'Object' | 'Pods' | 'Resource' | 'External';
  resource?: {
    name: string;
    target: TargetObjcet;
  };
  external?: {
    metric: MetricObject;
    target: TargetObjcet;
  };
  object?: {
    describedObjec: DescribedObject;
    metric: MetricObject;
    target: TargetObjcet;
  };
  pods?: {
    metric: MetricObject;
    target: TargetObjcet;
  };
};

type HPAScalingPolicy = {
  hpaScalingPolicyType: 'Pods' | 'Percent';
  value: number;
  periodSeconds: number;
};

type HPAScalingRules = {
  stabilizationWindowSeconds?: number;
  selectPolicy?: 'Max' | 'Min' | 'Disabled';
  policies?: HPAScalingPolicy[];
};

type HPACurrentMetrics = {
  type: 'Object' | 'Pods' | 'Resource' | 'External';
  external?: {
    current: CurrentObject;
    metric: MetricObject;
  };
  object?: {
    current: CurrentObject;
    describedObject: DescribedObject;
    metric: MetricObject;
  };
  pods?: {
    current: CurrentObject;
    metric: MetricObject;
  };
  resource?: {
    name: string;
    current: CurrentObject;
  };
};

export type HorizontalPodAutoscalerKind = K8sResourceCommon & {
  spec: {
    scaleTargetRef: {
      apiVersion: string;
      kind: string;
      name: string;
    };
    minReplicas?: number;
    maxReplicas: number;
    metrics?: HPAMetric[];
    behavior?: {
      scaleUp?: HPAScalingRules;
      scaleDown?: HPAScalingRules;
    };
  };
  status?: {
    currentReplicas: number;
    desiredReplicas: number;
    currentMetrics?: HPACurrentMetrics[];
    conditions: NodeCondition[];
    lastScaleTime?: string;
  };
};
