import React from 'react';

//  constants
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';

import {
  TouchableInterface,
  EmptyContainer,
  TrackButtonContainer,
} from './styles';

interface EmptyComponentProps {
  onPress: () => void;
}

export const EmptyComponent: React.FC<EmptyComponentProps> = ({ onPress }) => {
  return (
    <EmptyContainer>
      <TouchableInterface onPress={onPress}>
        <TrackButtonContainer>
          <Ionicons name="md-location" size={30} color={Colors.accent} />
        </TrackButtonContainer>
      </TouchableInterface>
    </EmptyContainer>
  );
};
