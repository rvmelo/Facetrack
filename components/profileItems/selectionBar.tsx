import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//  constants
import Colors from '../../constants/colors';

//  styles
import { BarContainer, BarItem, TouchableInterface } from './styles';

interface SelectionBarProps {
  scroll: React.RefObject<ScrollView>;
}

export const SelectionBar: React.FC<SelectionBarProps> = ({ scroll }) => {
  const [selectedValue, setSelectedValue] = useState('instagram');

  return (
    <BarContainer>
      <TouchableInterface
        onPress={() => {
          setSelectedValue('instagram');
          scroll.current?.scrollTo({ x: 0, animated: true });
        }}
      >
        <BarItem isSelected={selectedValue === 'instagram'}>
          <Ionicons
            name="md-logo-instagram"
            color={
              selectedValue === 'instagram' ? Colors.primary : Colors.disabled
            }
            size={23}
          />
        </BarItem>
      </TouchableInterface>
      <TouchableInterface
        onPress={() => {
          setSelectedValue('evaluations');
          scroll.current?.scrollToEnd({ animated: true });
        }}
      >
        <BarItem isSelected={selectedValue !== 'instagram'}>
          <Ionicons
            name="md-star-outline"
            color={
              selectedValue !== 'instagram' ? Colors.primary : Colors.disabled
            }
            size={23}
          />
        </BarItem>
      </TouchableInterface>
    </BarContainer>
  );
};
