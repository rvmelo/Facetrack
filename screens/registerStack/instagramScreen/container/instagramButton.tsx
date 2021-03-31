import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ButtonContainer, ButtonText, StyledButton } from './styles';

// i18n
import { translate } from '../../../../i18n/src/locales';

interface ButtonProps {
  onPress(): void;
}

const InstagramButton: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <StyledButton onPress={onPress}>
      <ButtonContainer>
        <Ionicons name="md-logo-instagram" size={25} color="white" />
        <ButtonText>{translate('connectInstagram')}</ButtonText>
      </ButtonContainer>
    </StyledButton>
  );
};

export default memo(InstagramButton);
