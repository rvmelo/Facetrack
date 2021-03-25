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
import api from '../../services/api';

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
        Alert.alert('Error', 'Login/Register error: ', err);
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
