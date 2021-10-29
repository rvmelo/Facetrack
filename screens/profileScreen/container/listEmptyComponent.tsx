import React from 'react';

import { Ionicons } from '@expo/vector-icons';

//  constants
import Colors from '../../../constants/colors';

//  styles
import { EmptyPhotoContainer, PhotoContainerText } from './styles';

//  i18n
import { translate } from '../../../i18n/src/locales/index';

export const ListEmptyComponent: React.FC = () => {
  return (
    <EmptyPhotoContainer>
      <Ionicons name="md-camera" size={40} color={Colors.accent} />
      <PhotoContainerText>
        {translate('photoDisplayMessage')}
      </PhotoContainerText>
    </EmptyPhotoContainer>
  );
};
