import React, { memo } from 'react';

import * as WebBrowser from 'expo-web-browser';

//  constants
import { Platform } from 'react-native';
import { base_url, instagram_client_id } from '../../../../constants/backend';

//  styles
import { Container, StyledSpinner } from './styles';

//  components
import InstagramButton from './instagramButton';

//  hooks
import useInstagramScreen from '../useInstagramScreen';

const InstagramScreen: React.FC = () => {
  const { isLoading } = useInstagramScreen();

  return (
    <Container>
      {isLoading ? (
        <StyledSpinner />
      ) : (
        <InstagramButton
          onPress={async () => {
            let browserPackage: string | undefined;

            if (Platform.OS === 'android') {
              const tabsSupportingBrowsers =
                await WebBrowser.getCustomTabsSupportingBrowsersAsync();
              browserPackage = tabsSupportingBrowsers?.defaultBrowserPackage;
            }

            WebBrowser.openBrowserAsync(
              `https://api.instagram.com/oauth/authorize?client_id=${instagram_client_id}&redirect_uri=${`${base_url}/sessions/auth/instagram/callback`}&scope=user_profile,user_media&response_type=code`,
              { browserPackage },
            );
          }}
        />
      )}
    </Container>
  );
};

export default memo(InstagramScreen);
