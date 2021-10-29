import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

//  constants
import Colors from '../../constants/colors';

//  styles
import { BarContainer, BarItem, TouchableInterface } from './styles';

export const SelectionBar: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('instagram');

  return (
    <BarContainer>
      <TouchableInterface onPress={() => setSelectedValue('instagram')}>
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
      <TouchableInterface onPress={() => setSelectedValue('evaluations')}>
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
