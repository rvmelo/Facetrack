import React from 'react';

import { ListButtonContainer, ButtonText, TouchableInterface } from './styles';

interface ListButtonProps {
  onPress: () => void;
}

export const ListButton: React.FC<ListButtonProps> = ({ onPress }) => {
  return (
    <TouchableInterface onPress={onPress}>
      <ListButtonContainer>
        <ButtonText>Close</ButtonText>
      </ListButtonContainer>
    </TouchableInterface>
  );
};
