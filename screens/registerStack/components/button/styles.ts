import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';
import Colors from '../../../../constants/colors';
import { fonts } from '../../../../constants/fonts';

interface ButtonLayoutProps {
  disabled: boolean;
}

export const StyledButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ButtonLayout = styled.View<ButtonLayoutProps>`
  background: ${props => (props.disabled ? Colors.disabled : Colors.primary)};
  width: 250px;
  height: 50px;
  margin: 10px 0;
  border-radius: 5px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-family: tegomin;
  font-size: ${fonts.sizes.md}px;
`;
