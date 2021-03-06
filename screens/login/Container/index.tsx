import React, { memo } from 'react';
import LoginButton from './loginButton';
import useLoginButton from '../useLoginButton';

import {
  Container,
  StyledTitle,
  ButtonsContainer,
  TitleContainer,
  StyledSubTitle,
} from './styles';

const LoginScreen: React.FC = () => {
  const { handleAuthentication } = useLoginButton();

  return (
    <Container>
      <TitleContainer>
        <StyledTitle>Facetrack</StyledTitle>
        <StyledSubTitle>An app for tracking and rating people</StyledSubTitle>
      </TitleContainer>
      <ButtonsContainer>
        <LoginButton
          logoText="logo-facebook"
          buttonText="Continue with Facebook"
          iconColor="white"
          backgroundColor="#3B5998"
          onPress={handleAuthentication}
        />
        <LoginButton
          logoText="logo-google"
          buttonText="Continue with Google"
          buttonTextColor="#696969"
          iconColor="red"
          backgroundColor="white"
          onPress={handleAuthentication}
        />
      </ButtonsContainer>
    </Container>
  );
};

export default memo(LoginScreen);
