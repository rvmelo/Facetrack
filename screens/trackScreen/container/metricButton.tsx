import React from 'react';
import { metric_types } from '../useTrackScreen';

//  i18n
import { translate } from '../../../i18n/src/locales';

//  styles
import {
  MetricButtonWrapper,
  MetricButtonText,
  MetricButtonInterface,
} from './styles';

interface MetricButtonProps {
  metric: metric_types;
  metricUnit: metric_types;
  // eslint-disable-next-line no-unused-vars
  setMetric: (metric: metric_types) => void;
  // eslint-disable-next-line no-unused-vars
  setDistance: (distance: number) => void;
}

export const MetricButton: React.FC<MetricButtonProps> = ({
  setMetric,
  setDistance,
  metric,
  metricUnit,
}) => {
  return (
    <MetricButtonInterface
      onPress={() => {
        setMetric(metricUnit);
        setDistance(metricUnit === 'm' ? 100 : 1);
      }}
    >
      <MetricButtonWrapper isActive={metric === metricUnit}>
        <MetricButtonText isActive={metric === metricUnit}>
          {metricUnit === 'm' ? translate('meters') : translate('kilometers')}
        </MetricButtonText>
      </MetricButtonWrapper>
    </MetricButtonInterface>
  );
};
