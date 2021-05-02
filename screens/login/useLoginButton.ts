import { Alert } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

// navigation
import { useNavigation } from '@react-navigation/native';

//  redux
import { useDispatch } from 'react-redux';

//  constants
import { base_url } from '../../constants/backend';

//  services
import api from '../../services/api';

//  hooks
import useAuth from '../../hooks/useAuth';

// i18n
import { translate } from '../../i18n/src/locales';

interface ReturnValue {
  handleFacebookLogin(): void;
  handleGoogleLogin(): void;
  isLoading: boolean;
}

function useLoginButton(): ReturnValue {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const handleFacebookLogin = useCallback(() => {
    WebBrowser.openBrowserAsync(`${base_url}/sessions/auth/facebook`);
  }, []);

  const handleGoogleLogin = useCallback(() => {
    WebBrowser.openBrowserAsync(`${base_url}/sessions/auth/google`);
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', async () => {
      try {
        if (!navigation.isFocused()) return;

        setIsLoading(true);

        //  response from google or facebook signIn
        const response = await api.get('sessions/auth/success');

        if (!response.data) return;

        const { notRegisteredUser, registeredUser, token } = response.data;

        if (notRegisteredUser && token) {
          api.defaults.headers.authorization = `Bearer ${token}`;
          navigation.navigate('BirthDateScreen', { ...notRegisteredUser });
          setIsLoading(false);

          return;
        }

        //  signIn from my app
        signIn({ token, user: registeredUser });
      } catch (err) {
        setIsLoading(false);
        Alert.alert('Error', translate('loginRegisterError'));
      }
    });
  }, [dispatch, navigation, signIn]);

  return {
    handleFacebookLogin,
    handleGoogleLogin,
    isLoading,
  };
}

export default useLoginButton;
