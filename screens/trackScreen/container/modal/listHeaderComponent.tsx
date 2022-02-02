import React from 'react';
import { fonts } from '../../../../constants/fonts';

import { ListHeaderContainer, ListHeaderText } from '../styles';

//  i18n
import { translate } from '../../../../i18n/src/locales';
import { metric_types } from '../../useTrackScreen';

interface ListHeaderComponentProps {
  distance: number;
  metric: metric_types;
}

export const ListHeaderComponent: React.FC<ListHeaderComponentProps> = ({
  distance,
  metric,
}) => {
  return (
    <ListHeaderContainer>
      <ListHeaderText size={fonts.sizes.md}>
        {translate('nearbyUsers')}
      </ListHeaderText>
      <ListHeaderText size={fonts.sizes.sm}>
        {translate('distance')}: {distance}
        {metric === 'm' ? 'm' : 'km'}
      </ListHeaderText>
    </ListHeaderContainer>
  );
};
