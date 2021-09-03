/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { useCallback, MutableRefObject } from 'react';
import { FlatList } from 'react-native';
import Animated, { runOnJS, withTiming } from 'react-native-reanimated';

//  hooks
import { useHeaderHeight } from '@react-navigation/elements';

//  constants
import { SCREEN_HEIGHT } from '../../constants/dimensions';
import { ItemData } from './useList';

export interface ListAnimationProps {
  opacity: Animated.SharedValue<number>;
  index: number;
  isLastItem: boolean;
}

export interface ScrollBackProps {
  index: number;
}

interface ListActionsProps {
  ref: MutableRefObject<FlatList<ItemData> | null>;
  setPage(value: number): void;
}

interface ReturnType {
  handleListAnimation(value: ListAnimationProps): void;
  handleListScrollBack({ index }: ScrollBackProps): void;
}

export function useListActions({ ref, setPage }: ListActionsProps): ReturnType {
  const headerHeight = useHeaderHeight();

  const handleListScrollBack = useCallback(
    ({ index }: ScrollBackProps) => {
      if (ref?.current && index - 1 >= 0) {
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

  const handleListAnimation = useCallback(
    ({ opacity, index, isLastItem }: ListAnimationProps) => {
      const wrapper = () => {
        if (isLastItem) {
          setPage((prev: number) => prev + 1);
          return;
        }

        handleListScroll(index);
        opacity.value = 1;
      };

      opacity.value = withTiming(0, { duration: 500 }, isFinished => {
        if (isFinished) {
          runOnJS(wrapper)();
        }
      });
    },
    [handleListScroll, setPage],
  );

  return {
    handleListAnimation,
    handleListScrollBack,
  };
}
