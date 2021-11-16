import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';

//  constants
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { SCREEN_WIDTH } from '../../../constants/dimensions';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  align-items: center;
  justify-content: flex-start;
`;

export const ScreenText = styled.Text`
  font-size: ${fonts.sizes.lg}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
  text-align: center;
`;

export const InputContainer = styled.View`
  background-color: #404040;
  margin: 20px 10px 0;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
`;

export const StyledInput = styled.TextInput.attrs({
  selectionColor: Colors.primary,
})`
  height: 40px;
  flex: 1;
  color: ${Colors.accent};
`;

//  list item

export const TouchableInterface = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

interface ItemContainerProps {
  height: number;
}

export const ItemContainer = styled.View<ItemContainerProps>`
  height: ${props => props.height}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: ${SCREEN_WIDTH}px;
  padding-left: 20px;
  overflow: hidden;
`;

export const TextContainer = styled.View`
  margin-left: 20px;
`;

export const Instagram = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
  margin-bottom: 3px;
`;

export const UserName = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.disabled};
`;

//  Empty component

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SmallScreenText = styled.Text`
  font-size: ${fonts.sizes.sm}px;
  font-family: ${fonts.family};
  color: ${Colors.disabled};
  text-align: center;
`;
