import React from 'react';
import { metric_types } from '../useTrackScreen';
import { MetricButton } from './metricButton';

//  styles
import { ScreenText, MetricButtonContainer } from './styles';

//  constants
// import Colors from '../../../constants/colors';

//  i18n
import { translate } from '../../../i18n/src/locales';

interface MetricUIProps {
  metric: metric_types;
  // eslint-disable-next-line no-unused-vars
  setMetric: (metric: metric_types) => void;
  // eslint-disable-next-line no-unused-vars
  setDistance: (distance: number) => void;
}

export const MetricUI: React.FC<MetricUIProps> = ({
  metric,
  setMetric,
  setDistance,
}) => {
  return (
    <>
      <ScreenText>{translate('selectMetricUnit')}:</ScreenText>
      <MetricButtonContainer>
        <MetricButton
          setDistance={setDistance}
          setMetric={setMetric}
          metric={metric}
          metricUnit="m"
        />
        <MetricButton
          setDistance={setDistance}
          setMetric={setMetric}
          metric={metric}
          metricUnit="km"
        />
      </MetricButtonContainer>
    </>
  );
};
