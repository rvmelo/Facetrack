/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';

//  components
import { ButtonPanelContainer, TouchableIcon } from './styles';

//  constants
import Colors from '../../../constants/colors';

interface ButtonPanelProps {
  rate: number;
  onListAnimation(): void;
  onUserEvaluation(value: number): void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({
  rate,
  onListAnimation,
  onUserEvaluation,
}) => {
  const onButtonPress = useCallback(
    (value: number) => {
      onListAnimation();
      onUserEvaluation(value);
    },
    [onListAnimation, onUserEvaluation],
  );

  return (
    <ButtonPanelContainer>
      <TouchableIcon onPress={() => onButtonPress(1)}>
        <Ionicons
          name={rate > 0 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon onPress={() => onButtonPress(2)}>
        <Ionicons
          name={rate > 1 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon onPress={() => onButtonPress(3)}>
        <Ionicons
          name={rate > 2 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon onPress={() => onButtonPress(4)}>
        <Ionicons
          name={rate > 3 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon onPress={() => onButtonPress(5)}>
        <Ionicons
          name={rate > 4 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
    </ButtonPanelContainer>
  );
};

export default ButtonPanel;
