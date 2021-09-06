/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { UserEvaluationProps } from '../useListItem';

//  components
import { ButtonPanelContainer, TouchableIcon } from './styles';

//  constants
import Colors from '../../../constants/colors';

interface ButtonPanelProps {
  rate: number;
  userId: string;
  onListAnimation(): void;
  onUserEvaluation(value: UserEvaluationProps): void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({
  rate,
  userId,
  onListAnimation,
  onUserEvaluation,
}) => {
  const onButtonPress = useCallback(
    ({ value, cardUserId }: UserEvaluationProps) => {
      onListAnimation();
      onUserEvaluation({ value, cardUserId });
    },
    [onListAnimation, onUserEvaluation],
  );

  return (
    <ButtonPanelContainer>
      <TouchableIcon
        onPress={() => onButtonPress({ value: 1, cardUserId: userId })}
      >
        <Ionicons
          name={rate > 0 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon
        onPress={() => onButtonPress({ value: 2, cardUserId: userId })}
      >
        <Ionicons
          name={rate > 1 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon
        onPress={() => onButtonPress({ value: 3, cardUserId: userId })}
      >
        <Ionicons
          name={rate > 2 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon
        onPress={() => onButtonPress({ value: 4, cardUserId: userId })}
      >
        <Ionicons
          name={rate > 3 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon
        onPress={() => onButtonPress({ value: 5, cardUserId: userId })}
      >
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
