import React from 'react';
import { ButtonText, EditButtonLayout, StyledEditButton } from './styles';

interface ProfileButtonProps {
  onPress: () => void;
  text: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  onPress,
  text,
}) => {
  return (
    <StyledEditButton onPress={onPress}>
      <EditButtonLayout>
        <ButtonText>{text}</ButtonText>
      </EditButtonLayout>
    </StyledEditButton>
  );
};
