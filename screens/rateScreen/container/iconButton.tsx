import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableNativeFeedback, GestureResponderEvent } from 'react-native';

//  styles
import { StyledIconButton } from './styles';

//  constants
import Colors from '../../../constants/colors';

interface IconButtonProps {
  // eslint-disable-next-line no-unused-vars
  onPress: (event: GestureResponderEvent) => void;
  iconName: 'md-arrow-up' | 'md-arrow-down';
}

export const IconButton: React.FC<IconButtonProps> = memo(
  ({ onPress, iconName }) => {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#ccc', true)}
        useForeground
      >
        <StyledIconButton>
          <Ionicons name={iconName} size={20} color={Colors.accent} />
        </StyledIconButton>
      </TouchableNativeFeedback>
    );
  },
);
