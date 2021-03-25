import React, { memo } from 'react';
import LoginButton from './loginButton';
import useLoginButton from '../useLoginButton';

import {
  Container,
  StyledTitle,
  ButtonsContainer,
  TitleContainer,
  StyledSubTitle,
  StyledSpinner,
} from './styles';

const LoginScreen: React.FC = () => {
  const {
    handleFacebookLogin,
    handleGoogleLogin,
    isLoading,
  } = useLoginButton();

  return (
    <Container>
      {isLoading ? (
        <StyledSpinner />
      ) : (
        <>
          <TitleContainer>
            <StyledTitle>Facetrack</StyledTitle>
            <StyledSubTitle>
              An app for tracking and rating people
            </StyledSubTitle>
          </TitleContainer>
          <ButtonsContainer>
            <LoginButton
              logoText="logo-facebook"
              buttonText="Continue with Facebook"
              iconColor="white"
              backgroundColor="#3B5998"
              onPress={handleFacebookLogin}
            />
            <LoginButton
              logoText="logo-google"
              buttonText="Continue with Google"
              buttonTextColor="#696969"
              iconColor="red"
              backgroundColor="white"
              onPress={handleGoogleLogin}
            />
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
};

export default memo(LoginScreen);
