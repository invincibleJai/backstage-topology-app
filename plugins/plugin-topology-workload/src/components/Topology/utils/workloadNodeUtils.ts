import * as _ from 'lodash';
import { AllPodStatus, DEPLOYMENT_PHASE, DEPLOYMENT_STRATEGY, podColor } from '../components/Pods/pod';

export const podStatus = Object.keys(podColor);

const isContainerFailedFilter = (containerStatus: any) => {
  return containerStatus.state.terminated && containerStatus.state.terminated.exitCode !== 0;
};

export const isContainerLoopingFilter = (containerStatus: any) => {
  return (
    containerStatus.state.waiting && containerStatus.state.waiting.reason === 'CrashLoopBackOff'
  );
};

const numContainersReadyFilter = (pod: any) => {
  const {
    status: { containerStatuses },
  } = pod;
  let numReady = 0;
  _.forEach(containerStatuses, (status) => {
    if (status.ready) {
      numReady++;
    }
  });
  return numReady;
};

const isReady = (pod: any) => {
  const {
    spec: { containers },
  } = pod;
  const numReady = numContainersReadyFilter(pod);
  const total = _.size(containers);

  return numReady === total;
};

const podWarnings = (pod: any) => {
  const {
    status: { phase, containerStatuses },
  } = pod;
  if (phase === AllPodStatus.Running && containerStatuses) {
    return _.map(containerStatuses, (containerStatus) => {
      if (!containerStatus.state) {
        return null;
      }

      if (isContainerFailedFilter(containerStatus)) {
        if (_.has(pod, ['metadata', 'deletionTimestamp'])) {
          return AllPodStatus.Failed;
        }
        return AllPodStatus.Warning;
      }
      if (isContainerLoopingFilter(containerStatus)) {
        return AllPodStatus.CrashLoopBackOff;
      }
      return null;
    }).filter((x) => x);
  }
  return null;
};

export const getPodStatus = (pod: any) => {
  if (_.has(pod, ['metadata', 'deletionTimestamp'])) {
    return AllPodStatus.Terminating;
  }
  const warnings = podWarnings(pod);
  if (warnings !== null && warnings.length) {
    if (warnings.includes(AllPodStatus.CrashLoopBackOff)) {
      return AllPodStatus.CrashLoopBackOff;
    }
    if (warnings.includes(AllPodStatus.Failed)) {
      return AllPodStatus.Failed;
    }
    return AllPodStatus.Warning;
  }
  const phase = _.get(pod, ['status', 'phase'], AllPodStatus.Unknown);
  if (phase === AllPodStatus.Running && !isReady(pod)) {
    return AllPodStatus.NotReady;
  }
  return phase;
};


export const calculateRadius = (size: number) => {
  const radius = size / 2;
  const podStatusStrokeWidth = (8 / 104) * size;
  const podStatusInset = (5 / 104) * size;
  const podStatusOuterRadius = radius - podStatusInset;
  const podStatusInnerRadius = podStatusOuterRadius - podStatusStrokeWidth;
  const decoratorRadius = radius * 0.25;

  return {
    radius,
    podStatusInnerRadius,
    podStatusOuterRadius,
    decoratorRadius,
    podStatusStrokeWidth,
    podStatusInset,
  };
};

const getScalingUp = (dc: any) => {
  return {
    ..._.pick(dc, 'metadata'),
    status: {
      phase: AllPodStatus.ScalingUp,
    },
  };
};

export const podDataInProgress = (
  dc: any,
  current: any,
  isRollingOut: boolean,
): boolean => {
  const strategy = dc?.spec?.strategy?.type;
  return (
    current?.phase !== DEPLOYMENT_PHASE.complete &&
    (strategy === DEPLOYMENT_STRATEGY.recreate || strategy === DEPLOYMENT_STRATEGY.rolling) &&
    isRollingOut
  );
};

export const getPodData = (
  podRCData: any,
): { inProgressDeploymentData: any[] | null; completedDeploymentData: any[] } => {
  const strategy = _.get(podRCData.obj, ['spec', 'strategy', 'type'], null);
  const currentDeploymentphase = podRCData.current && podRCData.current.phase;
  const currentPods = podRCData.current && podRCData.current.pods;
  const previousPods = podRCData.previous && podRCData.previous.pods;
  // DaemonSets and StatefulSets
  if (!strategy) return { inProgressDeploymentData: null, completedDeploymentData: podRCData.pods };

  // Scaling no. of pods
  if (currentDeploymentphase === DEPLOYMENT_PHASE.complete) {
    return { inProgressDeploymentData: null, completedDeploymentData: currentPods };
  }

  // Deploy - Rolling - Recreate
  if (
    (strategy === DEPLOYMENT_STRATEGY.recreate ||
      strategy === DEPLOYMENT_STRATEGY.rolling ||
      strategy === DEPLOYMENT_STRATEGY.rollingUpdate) &&
    podRCData.isRollingOut
  ) {
    return {
      inProgressDeploymentData: currentPods,
      completedDeploymentData: previousPods,
    };
  }
  // if build is not finished show `Scaling Up` on pod phase
  if (!podRCData.current && !podRCData.previous) {
    return {
      inProgressDeploymentData: null,
      completedDeploymentData: [getScalingUp(podRCData.obj)],
    };
  }
  return { inProgressDeploymentData: null, completedDeploymentData: podRCData.pods };
};
