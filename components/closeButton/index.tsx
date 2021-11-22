/* eslint-disable react/require-default-props */
import React from 'react';
import { ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//  constants
import Colors from '../../constants/colors';

//  styles
import { CloseButtonLayout, StyledModalButton } from './styles';

interface CloseButtonProps {
  onPress: () => void;
  styles?: ViewStyle;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onPress,
  styles = {},
}) => {
  return (
    <StyledModalButton onPress={onPress}>
      <CloseButtonLayout style={styles}>
        <Ionicons name="md-close" size={40} color={Colors.disabled} />
      </CloseButtonLayout>
    </StyledModalButton>
  );
};
