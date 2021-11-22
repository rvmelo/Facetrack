import { TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/colors';

export const CloseButtonLayout = styled.View`
  border-radius: 25px;
  height: 50px;
  width: 50px;
  background: ${Colors.accent};
  border-color: ${Colors.disabled};
  border-width: 2px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const StyledModalButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;
