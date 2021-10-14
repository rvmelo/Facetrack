import React from 'react';

import { ButtonContainer, ButtonText, TouchableInterface } from './styles';

//  i18n
// import { translate } from '../../../i18n/src/locales';

interface OptionButtonProps {
  onPress: () => void;
  text: string;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  onPress,
  text,
}) => {
  return (
    <TouchableInterface onPress={onPress}>
      <ButtonContainer>
        <ButtonText>{text}</ButtonText>
      </ButtonContainer>
    </TouchableInterface>
  );
};
