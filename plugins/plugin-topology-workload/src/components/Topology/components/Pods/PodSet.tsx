import * as React from 'react';
import PodStatus from './PodStatus';
import { calculateRadius, getPodData, podDataInProgress } from '../../utils/workloadNodeUtils';
import { usePodRingLabel } from '../../utils/podRingUtils';

interface PodSetProps {
  size: number;
  data: any;
  showPodCount?: boolean;
  x?: number;
  y?: number;
}

interface InnerPodStatusRadius {
  innerPodStatusOuterRadius: number;
  innerPodStatusInnerRadius: number;
}

const calculateInnerPodStatusRadius = (
  outerPodStatusInnerRadius: number,
  outerPodStatusWidth: number,
): InnerPodStatusRadius => {
  const innerPodStatusWidth = outerPodStatusWidth * 0.6;
  const spaceBwOuterAndInnerPodStatus = 3;
  const innerPodStatusOuterRadius = outerPodStatusInnerRadius - spaceBwOuterAndInnerPodStatus;
  const innerPodStatusInnerRadius = innerPodStatusOuterRadius - innerPodStatusWidth;

  return { innerPodStatusOuterRadius, innerPodStatusInnerRadius };
};

export const podSetInnerRadius = (size: number, data?: any) => {
  const { podStatusInnerRadius, podStatusStrokeWidth } = calculateRadius(size);
  let radius = podStatusInnerRadius;

  if (data && podDataInProgress(data.obj, data.current, data.isRollingOut)) {
    const { innerPodStatusInnerRadius } = calculateInnerPodStatusRadius(
      radius,
      podStatusStrokeWidth,
    );
    radius = innerPodStatusInnerRadius;
  }

  const { podStatusStrokeWidth: innerStrokeWidth, podStatusInset } = calculateRadius(radius * 2);

  return radius - innerStrokeWidth - podStatusInset;
};

const PodSet: React.FC<PodSetProps> = React.memo(function PodSet({
  size,
  data,
  x = 0,
  y = 0,
  showPodCount,
}) {
  // const { t } = useTranslation();
  const { podStatusOuterRadius, podStatusInnerRadius, podStatusStrokeWidth } = calculateRadius(
    size,
  );
  const { innerPodStatusOuterRadius, innerPodStatusInnerRadius } = calculateInnerPodStatusRadius(
    podStatusInnerRadius,
    podStatusStrokeWidth,
  );
  const { inProgressDeploymentData, completedDeploymentData } = getPodData(data);

  // const [hpa] = useRelatedHPA(
  //   data.obj?.apiVersion,
  //   data.obj?.kind,
  //   data.obj?.metadata?.name,
  //   data.obj?.metadata?.namespace,
  // );
  // const hpaControlledScaling = !!hpa;

  const obj = data.current?.obj || data.obj;
  const ownerKind =  obj?.kind;
  const { title, subTitle, titleComponent } = usePodRingLabel(
    obj,
    ownerKind,
    data?.pods
  );
  return (
    <>
      <PodStatus
        key={inProgressDeploymentData ? 'deploy' : 'notDeploy'}
        x={x - size / 2}
        y={y - size / 2}
        innerRadius={podStatusInnerRadius}
        outerRadius={podStatusOuterRadius}
        data={completedDeploymentData}
        size={size}
        subTitle={showPodCount ? subTitle : undefined}
        title={showPodCount ? title : undefined}
        titleComponent={showPodCount ? titleComponent : undefined}
      />
      {inProgressDeploymentData && (
        <PodStatus
          x={x - size / 2}
          y={y - size / 2}
          innerRadius={innerPodStatusInnerRadius}
          outerRadius={innerPodStatusOuterRadius}
          data={inProgressDeploymentData}
          size={size}
        />
      )}
    </>
  );
});

export default PodSet;
