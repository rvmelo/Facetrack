import React from 'react';

import { ListButtonContainer, ScreenText, TouchableInterface } from '../styles';

//  i18n
import { translate } from '../../../../i18n/src/locales';

interface ListButtonProps {
  onPress: () => void;
}

export const ListButton: React.FC<ListButtonProps> = ({ onPress }) => {
  return (
    <TouchableInterface onPress={onPress}>
      <ListButtonContainer>
        <ScreenText>{translate('close')}</ScreenText>
      </ListButtonContainer>
    </TouchableInterface>
  );
};
