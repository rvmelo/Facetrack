/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react';
import { ViewStyle } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import api from '../../services/api';

export interface UserEvaluationProps {
  value: number;
  cardUserId: string;
}

interface ReturnValue {
  handleUserEvaluation(value: UserEvaluationProps): void;
  rate: number;
  cardOpacity: Animated.SharedValue<number>;
  cardStyle: ViewStyle;
  textStyle: ViewStyle;
}

export function useListItem(): ReturnValue {
  const [rate, setRate] = useState(0);

  const cardOpacity = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        cardOpacity.value,
        [0, 1],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  const handleUserEvaluation = useCallback(
    async ({ value, cardUserId }: UserEvaluationProps) => {
      setRate(value);

      api.patch(`/evaluation?value=${value}&toUserId=${cardUserId}`);
    },
    [setRate],
  );

  return {
    handleUserEvaluation,
    rate,
    cardOpacity,
    cardStyle,
    textStyle,
  };
}
