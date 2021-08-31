/* eslint-disable react-hooks/rules-of-hooks */
import { ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { DATA } from '../../constants/data';

export interface ItemInfo {
  cardStyle: ViewStyle;
  cardOpacity: Animated.SharedValue<number>;
  data: {
    id: string;
    text: string;
    uri: string;
  };
}

export interface ListData {
  id: string;
  text: string;
  uri: string;
}

interface ReturnType {
  listItems: ItemInfo[];
}

export function useList(): ReturnType {
  const listItems = DATA.map((data: ListData) => {
    const cardOpacity = useSharedValue(1);

    const cardStyle = useAnimatedStyle(() => {
      return {
        opacity: cardOpacity.value,
      };
    });

    return {
      data,
      cardStyle,
      cardOpacity,
    };
  });

  return {
    listItems,
  };
}
