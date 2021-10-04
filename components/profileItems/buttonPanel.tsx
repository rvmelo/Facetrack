/* eslint-disable no-unused-vars */
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

//  components
import { ButtonPanelContainer, TouchableIcon } from './styles';

//  constants
import Colors from '../../constants/colors';

interface ButtonPanelProps {
  rate: number;
  setRate: (value: number) => void;
}

export const ButtonPanel: React.FC<ButtonPanelProps> = ({ rate, setRate }) => {
  return (
    <ButtonPanelContainer>
      <TouchableIcon onPress={() => setRate(1)}>
        <Ionicons
          name={rate > 0 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon onPress={() => setRate(2)}>
        <Ionicons
          name={rate > 1 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon onPress={() => setRate(3)}>
        <Ionicons
          name={rate > 2 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon onPress={() => setRate(4)}>
        <Ionicons
          name={rate > 3 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon onPress={() => setRate(5)}>
        <Ionicons
          name={rate > 4 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
    </ButtonPanelContainer>
  );
};
