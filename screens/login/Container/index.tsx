import React, { memo } from 'react';
import LoginButton from './loginButton';
import useLoginButton from '../useLoginButton';

// constants
import { SCREEN_WIDTH } from '../../../constants/dimensions';

// i18n
import { translate } from '../../../i18n/src/locales';

import {
  Container,
  StyledTitle,
  ButtonsContainer,
  TitleContainer,
  StyledSubTitle,
  StyledSpinner,
  SVGContainer,
} from './styles';

//  SVG
import { FinderLogo } from '../../../components/svg/finder-logo';

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
            <StyledTitle>Finder</StyledTitle>
            <StyledSubTitle>
              An app for tracking and rating social profiles
            </StyledSubTitle>
          </TitleContainer>
          <SVGContainer>
            <FinderLogo width={SCREEN_WIDTH / 3} height={SCREEN_WIDTH / 3} />
          </SVGContainer>
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
