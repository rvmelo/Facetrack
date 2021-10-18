import React from 'react';
import { fonts } from '../../../constants/fonts';

import { ListHeaderContainer, ListHeaderText } from './styles';

//  i18n
import { translate } from '../../../i18n/src/locales';

interface ListHeaderComponentProps {
  distance: number;
}

export const ListHeaderComponent: React.FC<ListHeaderComponentProps> = ({
  distance,
}) => {
  return (
    <ListHeaderContainer>
      <ListHeaderText size={fonts.sizes.md}>
        {translate('nearbyUsers')}
      </ListHeaderText>
      <ListHeaderText size={fonts.sizes.sm}>
        {translate('distance')}: {distance}m
      </ListHeaderText>
    </ListHeaderContainer>
  );
};
