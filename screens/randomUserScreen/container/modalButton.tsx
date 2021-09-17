import React from 'react';

//  styles
import { ButtonText, ModalButtonLayout, StyledModalButton } from './styles';

interface ProfileButtonProps {
  // eslint-disable-next-line no-unused-vars
  onPress: () => void;
}

export const ModalButton: React.FC<ProfileButtonProps> = ({ onPress }) => {
  return (
    <StyledModalButton onPress={onPress}>
      <ModalButtonLayout>
        <ButtonText>Confirm</ButtonText>
      </ModalButtonLayout>
    </StyledModalButton>
  );
};
