import { TouchableNativeFeedback } from 'react-native';

import styled from 'styled-components/native';

//  constants
import { fonts } from '../../../constants/fonts';
import Colors from '../../../constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/dimensions';

interface ItemContainerProps {
  height: number;
}

export const ItemContainer = styled.View<ItemContainerProps>`
  align-items: center;
  margin: 0 10px;
  height: ${props => props.height}px;
  width: ${SCREEN_WIDTH * 0.28}px;
  overflow: hidden;
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

export const InfoContainer = styled.View`
  padding: 5px;
  align-items: center;
  margin-bottom: 15px;
`;

export const InfoText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  text-align: center;
  color: ${Colors.accent};
`;

export const SmallInfoText = styled.Text`
  font-size: ${fonts.sizes.sm}px;
  font-family: ${fonts.family};
  color: ${Colors.disabled};
  text-align: center;
  margin: 5px;
`;

interface UIWrapperProps {
  bottomTabHeight: number;
}

export const UIWrapper = styled.View<UIWrapperProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.bottomTabHeight}px;
`;

export const ScreenText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

//   index screen

export const Container = styled.View`
  height: 100%;
`;

export const TrackButtonContainer = styled.View`
  background: ${Colors.primary};
  flex-direction: row;
  padding: 0 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  height: 40px;
  overflow: hidden;
`;

export const TrackButtonText = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
  margin-left: 5px;
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
  overflow: hidden;
`;

export const ListHeaderContainer = styled.View`
  width: ${SCREEN_WIDTH}px;
  padding: 20px;
  align-items: center;
`;

interface ListHeaderTextProps {
  size: number;
}

export const ListHeaderText = styled.Text<ListHeaderTextProps>`
  font-size: ${props => props.size}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
  margin-top: 3px;
`;

export const MetricButtonInterface = styled.TouchableWithoutFeedback``;

interface MetricButtonProps {
  isActive?: boolean;
}

export const MetricButtonContainer = styled.View`
  margin: 20px 0;
  flex-direction: row;
`;

export const MetricButtonWrapper = styled.View<MetricButtonProps>`
  width: 100px;
  border-width: 1px;
  border-color: ${props => (props.isActive ? Colors.primary : Colors.disabled)};
  border-radius: 5px;
  padding: 5px;
  margin: 0 5px;
`;

export const MetricButtonText = styled.Text<MetricButtonProps>`
  font-size: ${fonts.sizes.sm}px;
  font-family: ${fonts.family};
  color: ${props => (props.isActive ? Colors.accent : Colors.disabled)};
  text-align: center;
`;
