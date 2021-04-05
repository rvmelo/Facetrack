import { Alert } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

// navigation
import { useNavigation } from '@react-navigation/native';

//  redux
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/modules/user/actions';

//  constants
import { base_url } from '../../constants/backend';

//  services
import api from '../../services/api';

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

        const response = await api.get('sessions/auth/success');

        if (!response.data) return;

        const { notRegisteredUser, token } = response.data;

        api.defaults.headers.authorization = `Bearer ${token}`;

        if (notRegisteredUser && token) {
          navigation.navigate('BirthDateScreen');
          setIsLoading(false);

          dispatch(
            updateUser({
              ...notRegisteredUser,
            }),
          );
        }
      } catch (err) {
        Alert.alert('Error', `${translate('loginRegisterError')}: `, err);
      }
    });
  }, [dispatch, navigation]);

  return {
    handleFacebookLogin,
    handleGoogleLogin,
    isLoading,
  };
}

export default useLoginButton;
