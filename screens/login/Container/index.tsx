import React, { memo } from 'react';
import LoginButton from './loginButton';
import useLoginButton from '../useLoginButton';

// i18n
import { translate } from '../../../i18n/src/locales';

import {
  Container,
  StyledTitle,
  ButtonsContainer,
  TitleContainer,
  StyledSubTitle,
  StyledSpinner,
  StyledImage,
} from './styles';

const LoginScreen: React.FC = () => {
  const { handleFacebookLogin, handleGoogleLogin, isLoading } =
    useLoginButton();

  return (
    <Container>
      {isLoading ? (
        <StyledSpinner />
      ) : (
        <>
          <TitleContainer>
            <StyledTitle>Facetrack</StyledTitle>
            <StyledSubTitle>
              An app for tracking and rating social profiles
            </StyledSubTitle>
          </TitleContainer>
          <StyledImage
            source={require('../../../assets/images/adaptive-icon.png')}
          />
          <ButtonsContainer>
            <LoginButton
              logoText="logo-facebook"
              buttonText={translate('facebookLogin')}
              iconColor="white"
              backgroundColor="#3B5998"
              onPress={handleFacebookLogin}
            />
            <LoginButton
              logoText="logo-google"
              buttonText={translate('googleLogin')}
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
