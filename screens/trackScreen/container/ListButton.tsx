import React from 'react';

import { ListButtonContainer, ButtonText, TouchableInterface } from './styles';

//  i18n
import { translate } from '../../../i18n/src/locales';

interface ListButtonProps {
  onPress: () => void;
}

export const ListButton: React.FC<ListButtonProps> = ({ onPress }) => {
  return (
    <TouchableInterface onPress={onPress}>
      <ListButtonContainer>
        <ButtonText>{translate('close')}</ButtonText>
      </ListButtonContainer>
    </TouchableInterface>
  );
};
