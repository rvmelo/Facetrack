import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';
import Colors from '../../../../constants/colors';
import { SCREEN_WIDTH } from '../../../../constants/dimensions';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.background};
`;

// instagram button

export const StyledButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ButtonContainer = styled.View`
  background: #c13584;
  flex-direction: row;
  justify-content: space-evenly;
  width: 60%;
  padding: 15px 0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: ${SCREEN_WIDTH * 0.043}px;
`;
