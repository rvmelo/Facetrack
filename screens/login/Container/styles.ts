import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';
import Colors from '../../../constants/colors';

interface ButtonContainerProps {
  backgroundColor: string;
}

interface ButtonTextProps {
  buttonTextColor: string;
}

// Login Screen

export const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
`;

export const TitleContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledTitle = styled.Text`
  font-size: 48px;
  font-family: matrix;
  color: ${Colors.primary};
`;

export const StyledSubTitle = styled.Text`
  font-size: 18px;
  font-family: matrix;
  color: ${Colors.primary};
`;

// LoginButton

export const StyledButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ButtonContainer = styled.View<ButtonContainerProps>`
  background: ${props => props.backgroundColor};
  flex-direction: row;
  width: 85%;
  padding: 15px 0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
`;

export const LogoContainer = styled.View`
  padding-left: 5%;
`;

export const ButtonTextContainer = styled.View`
  flex: 3.5;
  margin-left: 5%;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${props => props.buttonTextColor};
  font-size: 18px;
`;
