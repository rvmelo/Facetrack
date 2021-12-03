import React from 'react';

//  styles
import { ButtonText, ModalButtonLayout, StyledModalButton } from './styles';

interface ProfileButtonProps {
  onPress: () => void;
}

export const ModalButton: React.FC<ProfileButtonProps> = ({ onPress }) => {
  return (
    <StyledModalButton onPress={onPress}>
      <ModalButtonLayout>
        <ButtonText>Ok</ButtonText>
      </ModalButtonLayout>
    </StyledModalButton>
  );
};
