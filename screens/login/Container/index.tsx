import React from 'react';
import LoginButton from './loginButton';

import {
  Container,
  StyledTitle,
  ButtonsContainer,
  TitleContainer,
  StyledSubTitle,
} from './styles';

const LoginScreen: React.FC = () => {
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
        />
        <LoginButton
          logoText="logo-google"
          buttonText="Continue with Google"
          buttonTextColor="#696969"
          iconColor="red"
          backgroundColor="white"
        />
      </ButtonsContainer>
    </Container>
  );
};

export default LoginScreen;
