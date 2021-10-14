import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';

//  constants
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.background};
  justify-content: center;
`;

export const IconContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const IconText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

export const ButtonsContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

export const TouchableInterface = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ButtonContainer = styled.View`
  /* width: 100%; */
  border-radius: 5px;
  background: ${Colors.primary};
  align-items: center;
  justify-content: center;
  margin: 10px 20px;
  overflow: hidden;
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;
