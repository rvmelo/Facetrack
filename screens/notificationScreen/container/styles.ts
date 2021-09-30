import { TouchableNativeFeedback } from 'react-native';

import styled from 'styled-components/native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const TouchableItem = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

interface ItemContainerProps {
  isRead: boolean | undefined;
}

export const ItemContainer = styled.View<ItemContainerProps>`
  width: 100%;
  border-width: 0.5px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 10px;
  padding-top: 10px;
  overflow: hidden;
  background-color: ${props =>
    props.isRead ? 'transparent' : Colors.disabled};
`;

export const TextContainer = styled.View`
  width: 80%;
`;

export const HeaderText = styled.Text`
  font-weight: bold;
`;

export const InstagramText = styled.Text`
  color: ${Colors.disabled};
`;

export const ItemText = styled.Text`
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
  color: ${Colors.accent};
`;
