import { TouchableNativeFeedback } from 'react-native';

import styled from 'styled-components/native';

//  constants
import { fonts } from '../../../constants/fonts';
import Colors from '../../../constants/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
`;

export const ItemContainer = styled.View`
  align-items: center;
  margin: 0 10px;
`;

export const ItemText = styled.Text`
  margin-top: 5px;
  font-size: ${fonts.sizes.sm}px;
  font-family: ${fonts.family};
  color: ${Colors.primary};
`;

export const ItemSeparator = styled.View`
  height: 20px;
`;

export const TouchableInterface = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ListButtonContainer = styled.View`
  width: 100%;
  background: ${Colors.primary};
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  overflow: hidden;
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

//   empty screen

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const TrackButtonContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-color: ${Colors.accent};
  border-width: 1px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
