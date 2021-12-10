import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState, useRef } from 'react';

import { AxiosResponse } from 'axios';

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

// navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

//  redux
import { IUser } from '../../store/modules/user/types';

//  constants
import { base_url } from '../../constants/backend';
import { instagramCodeKey } from '../../constants/storage';

//  services
import api from '../../services/api';

//  hooks
import useAuth from '../../hooks/useAuth';

// i18n
import { translate } from '../../i18n/src/locales';

import { RegisterStackParamList } from '../../routes/types';

interface AuthResponse {
  notRegisteredUser: IUser | undefined;
  registeredUser: IUser;
  token: string;
}

type NavigationProps = StackNavigationProp<RegisterStackParamList, 'Login'>;

interface ReturnValue {
  handleFacebookLogin(): void;
  handleGoogleLogin(): void;
  isLoading: boolean;
}

function useLoginButton(): ReturnValue {
  const navigation = useNavigation<NavigationProps>();

  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const isMounted = useRef<boolean | null>(null);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleFacebookLogin = useCallback(() => {
    WebBrowser.openBrowserAsync(`${base_url}/sessions/auth/facebook`);
  }, []);

  const handleGoogleLogin = useCallback(() => {
    WebBrowser.openBrowserAsync(`${base_url}/sessions/auth/google`);
  }, []);

  const handleUserLogin = useCallback(async () => {
    try {
      if (!navigation.isFocused() || !isMounted.current) return;

      await AsyncStorage.removeItem(instagramCodeKey);

      isMounted.current && setIsLoading(true);

      //  response from google or facebook signIn
      const response: AxiosResponse<AuthResponse> = await api.get(
        'sessions/auth/success',
      );

      if (!response.data) return;

      const { notRegisteredUser, registeredUser, token } = response.data;

      if (notRegisteredUser && token) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        navigation.navigate('BirthDateScreen', { ...notRegisteredUser });
        isMounted.current && setIsLoading(false);

        return;
      }

      //  signIn from my app
      isMounted.current && signIn({ token, user: registeredUser });
    } catch (err) {
      isMounted.current && setIsLoading(false);
      Alert.alert('Error', translate('loginRegisterError'));
    }
  }, [navigation, signIn]);

  useEffect(() => {
    Linking.addEventListener('url', handleUserLogin);

    return () => {
      Linking.removeEventListener('url', handleUserLogin);
    };
  }, [handleUserLogin]);

  return {
    handleFacebookLogin,
    handleGoogleLogin,
    isLoading,
  };
}

export default useLoginButton;
