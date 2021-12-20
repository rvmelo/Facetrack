import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';
import Colors from '../../../../constants/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.background};
`;

export const StyledSpinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: Colors.primary,
})``;

// instagram button

export const StyledButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ButtonContainer = styled.View`
  background: #c13584;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 250px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;
