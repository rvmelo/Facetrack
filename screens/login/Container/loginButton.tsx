import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  ButtonContainer,
  ButtonText,
  ButtonTextContainer,
  LogoContainer,
  StyledButton,
} from './styles';

interface ButtonProps {
  buttonText: string;
  buttonTextColor?: string;
  logoText: 'logo-google' | 'logo-facebook';
  iconColor: string;
  backgroundColor: string;
}

const LoginButton: React.FC<ButtonProps> = ({
  buttonText,
  buttonTextColor = 'white',
  logoText,
  iconColor,
  backgroundColor,
}) => {
  return (
    <StyledButton>
      <ButtonContainer backgroundColor={backgroundColor}>
        <LogoContainer>
          <Ionicons name={logoText} size={25} color={iconColor} />
        </LogoContainer>
        <ButtonTextContainer>
          <ButtonText buttonTextColor={buttonTextColor}>
            {buttonText}
          </ButtonText>
        </ButtonTextContainer>
      </ButtonContainer>
    </StyledButton>
  );
};

export default memo(LoginButton);
