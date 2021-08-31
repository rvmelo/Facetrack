import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

//  components
import { ButtonPanelContainer, TouchableIcon } from './styles';

//  constants
import Colors from '../../../constants/colors';
import { EvaluationProps } from '../useListActions';

interface ButtonPanelProps {
  rate: number;
  opacity: Animated.SharedValue<number>;
  index: number;
  // eslint-disable-next-line no-unused-vars
  handleUserEvaluation(value: EvaluationProps): void;
  // eslint-disable-next-line no-unused-vars
  setRate(value: number): void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({
  rate,
  setRate,
  opacity,
  index,
  handleUserEvaluation,
}) => {
  return (
    <ButtonPanelContainer>
      <TouchableIcon
        onPress={() =>
          handleUserEvaluation({ rate: 1, setRate, opacity, index })
        }
      >
        <Ionicons
          name={rate > 0 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon
        onPress={() =>
          handleUserEvaluation({ rate: 2, setRate, opacity, index })
        }
      >
        <Ionicons
          name={rate > 1 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon
        onPress={() =>
          handleUserEvaluation({ rate: 3, setRate, opacity, index })
        }
      >
        <Ionicons
          name={rate > 2 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon
        onPress={() =>
          handleUserEvaluation({ rate: 4, setRate, opacity, index })
        }
      >
        <Ionicons
          name={rate > 3 ? 'md-star' : 'md-star-outline'}
          size={40}
          color={Colors.primary}
        />
      </TouchableIcon>
      <TouchableIcon
        onPress={() =>
          handleUserEvaluation({ rate: 5, setRate, opacity, index })
        }
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
