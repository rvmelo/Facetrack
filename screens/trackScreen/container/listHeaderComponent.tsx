import React from 'react';
import { fonts } from '../../../constants/fonts';

import { ListHeaderContainer, ListHeaderText } from './styles';

interface ListHeaderComponentProps {
  distance: number;
}

export const ListHeaderComponent: React.FC<ListHeaderComponentProps> = ({
  distance,
}) => {
  return (
    <ListHeaderContainer>
      <ListHeaderText size={fonts.sizes.md}>Nearby users</ListHeaderText>
      <ListHeaderText size={fonts.sizes.sm}>
        Distance: {distance}m
      </ListHeaderText>
    </ListHeaderContainer>
  );
};
