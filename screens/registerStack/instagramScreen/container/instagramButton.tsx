import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ButtonContainer, ButtonText, StyledButton } from './styles';

interface ButtonProps {
  onPress(): void;
}

const InstagramButton: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <StyledButton onPress={onPress}>
      <ButtonContainer>
        <Ionicons name="md-logo-instagram" size={25} color="white" />
        <ButtonText>Connect Instagram</ButtonText>
      </ButtonContainer>
    </StyledButton>
  );
};

export default memo(InstagramButton);
