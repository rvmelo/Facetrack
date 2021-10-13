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
  height: number;
}

export const ItemContainer = styled.View<ItemContainerProps>`
  width: 100%;
  height: ${props => props.height}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  padding-right: 10px;
  overflow: hidden;
  background-color: ${props =>
    props.isRead ? 'transparent' : 'rgba(242, 241, 239, 0.3)'};
  border-bottom-width: 0.5px;
  border-color: ${Colors.disabled};
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

export const StyledDate = styled.Text`
  color: ${Colors.disabled};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.sm}px;
`;

export const ItemText = styled.Text`
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
  color: ${Colors.accent};
`;
