import React from 'react';
import { Ionicons } from '@expo/vector-icons';

//  constants
import Colors from '../../constants/colors';

//  styles
import { CloseButtonLayout, StyledModalButton } from './styles';

interface CloseButtonProps {
  onPress: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => {
  return (
    <StyledModalButton onPress={onPress}>
      <CloseButtonLayout>
        <Ionicons name="md-close" size={40} color={Colors.disabled} />
      </CloseButtonLayout>
    </StyledModalButton>
  );
};
