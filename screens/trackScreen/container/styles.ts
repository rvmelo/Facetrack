import { TouchableNativeFeedback } from 'react-native';

import styled from 'styled-components/native';

//  constants
import { fonts } from '../../../constants/fonts';
import Colors from '../../../constants/colors';
import { SCREEN_HEIGHT } from '../../../constants/dimensions';

interface ItemContainerProps {
  height: number;
}

export const ItemContainer = styled.View<ItemContainerProps>`
  align-items: center;
  margin: 0 10px;
  height: ${props => props.height}px;
`;

export const ItemText = styled.Text`
  margin-top: 5px;
  font-size: ${fonts.sizes.sm}px;
  font-family: ${fonts.family};
  color: ${Colors.primary};
`;

interface ItemSeparatorProps {
  height: number;
}

export const ItemSeparator = styled.View<ItemSeparatorProps>`
  height: ${props => props.height}px;
`;

export const TouchableInterface = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ListButtonContainer = styled.View`
  /* width: 100%; */
  border-radius: 5px;
  background: ${Colors.primary};
  align-items: center;
  justify-content: center;
  margin: 20px;
  overflow: hidden;
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

export const EmptyScreenText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

export const ScreenText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

//   index screen

export const Container = styled.View`
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
  margin-bottom: 20px;
`;

//  modal
export const ModalView = styled.View`
  flex: 1;
  z-index: 3;
  background: #404040;
  justify-content: space-around;
  margin-top: ${SCREEN_HEIGHT / 3.5}px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;
