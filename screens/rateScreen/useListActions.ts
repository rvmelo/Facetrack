/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { useCallback, MutableRefObject } from 'react';
import { FlatList } from 'react-native';
import Animated, { runOnJS, withTiming } from 'react-native-reanimated';

//  hooks
import { useHeaderHeight } from '@react-navigation/elements';

//  constants
import { SCREEN_HEIGHT } from '../../constants/dimensions';
import { ListData } from './useList';

export interface EvaluationProps {
  opacity: Animated.SharedValue<number>;
  rate: number;
  // eslint-disable-next-line no-unused-vars
  setRate(number: number): void;
  index: number;
}

export interface ScrollBackProps {
  index: number;
  opacity: Animated.SharedValue<number>;
}

interface ReturnType {
  handleUserEvaluation(value: EvaluationProps): void;
  handleListScrollBack({ index, opacity }: ScrollBackProps): void;
  // rate: number;
}

export function useListActions(
  ref: MutableRefObject<FlatList<ListData> | null>,
): ReturnType {
  const headerHeight = useHeaderHeight();

  const handleListScrollBack = useCallback(
    ({ index, opacity }: ScrollBackProps) => {
      if (ref?.current && index - 1 >= 0) {
        opacity.value = 1;
        ref.current.scrollToOffset({
          offset: (index - 1) * (SCREEN_HEIGHT - headerHeight),
        });
      }
    },
    [ref, headerHeight],
  );

  const handleListScroll = useCallback(
    (index: number) => {
      if (ref?.current) {
        ref.current.scrollToOffset({
          offset: (index + 1) * (SCREEN_HEIGHT - headerHeight),
        });
      }
    },
    [ref, headerHeight],
  );

  const handleUserEvaluation = useCallback(
    ({ opacity, setRate, index, rate }: EvaluationProps) => {
      const wrapper = () => {
        handleListScroll(index);
      };

      setRate(rate);

      // send rate value to backend

      opacity.value = withTiming(0, { duration: 500 }, isFinished => {
        if (isFinished) {
          runOnJS(wrapper)();
        }
      });
    },
    [handleListScroll],
  );

  return {
    handleUserEvaluation,
    handleListScrollBack,
  };
}
