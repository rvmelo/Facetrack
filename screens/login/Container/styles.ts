import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';
import Colors from '../../../constants/colors';
import { SCREEN_WIDTH } from '../../../constants/dimensions';

interface ButtonContainerProps {
  backgroundColor: string;
}

interface ButtonTextProps {
  buttonTextColor: string;
}

// Login Screen

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled.ImageBackground`
  width: ${SCREEN_WIDTH / 2}px;
  height: ${SCREEN_WIDTH / 2}px;
  margin: 30px 0;
`;

export const StyledSpinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: Colors.primary,
})``;

export const TitleContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ButtonsContainer = styled.View`
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
  text-align: center;
  margin-top: 5px;
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
  margin-bottom: 10px;
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
