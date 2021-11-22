import { TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  background: rgba(0, 0, 0, 0.9);
`;

export const IntroText = styled.Text`
  color: ${Colors.background};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.sm}px;
  text-align: center;
`;

export const ButtonText = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
`;

export const ModalButtonLayout = styled.View`
  background: ${Colors.primary};
  margin: 20px 0;
  border-radius: 5px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 150px;
`;

export const StyledModalButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;
