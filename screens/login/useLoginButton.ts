import { Alert, Platform } from 'react-native';
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

  const handleFacebookLogin = useCallback(async () => {
    let browserPackage: string | undefined;

    if (Platform.OS === 'android') {
      const tabsSupportingBrowsers =
        await WebBrowser.getCustomTabsSupportingBrowsersAsync();
      browserPackage = tabsSupportingBrowsers?.defaultBrowserPackage;
    }

    WebBrowser.openBrowserAsync(`${base_url}/sessions/auth/facebook`, {
      browserPackage,
    });
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    let browserPackage: string | undefined;

    if (Platform.OS === 'android') {
      const tabsSupportingBrowsers =
        await WebBrowser.getCustomTabsSupportingBrowsersAsync();
      browserPackage = tabsSupportingBrowsers?.defaultBrowserPackage;
    }
    WebBrowser.openBrowserAsync(`${base_url}/sessions/auth/google`, {
      browserPackage,
    });
  }, []);

  const handleUserLogin = useCallback(
    async ({ url }: { url: string }) => {
      try {
        if (!navigation.isFocused() || !isMounted.current || isLoading) return;

        const { notRegisteredUser, token } = Linking.parse(url).queryParams;

        await AsyncStorage.removeItem(instagramCodeKey);

        isMounted.current && setIsLoading(true);

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        if (notRegisteredUser !== 'undefined' && token) {
          const parsedUser = JSON.parse(notRegisteredUser);
          navigation.navigate('BirthDateScreen', { ...parsedUser });
          isMounted.current && setIsLoading(false);

          return;
        }

        // find registered user
        const response: AxiosResponse<IUser> = await api.get('users/me');

        if (!response?.data) return;

        const registeredUser = response?.data;

        // signIn from my app
        isMounted.current && signIn({ token, user: registeredUser });
      } catch (err) {
        isMounted.current && setIsLoading(false);
        Alert.alert('Error', translate('loginRegisterError'));
      }
    },
    [navigation, signIn, isLoading],
  );

  const debounce = useCallback(
    (timeout = 1000) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let timer: any;
      return ({ url }: { url: string }) => {
        clearTimeout(timer);

        isMounted.current && setIsLoading(true);

        timer = setTimeout(() => handleUserLogin({ url }), timeout);
      };
    },
    [handleUserLogin],
  );

  const debounceHandleUserLogin = debounce();

  useEffect(() => {
    const unsubscribe = Linking.addEventListener(
      'url',
      debounceHandleUserLogin,
    );

    return () => unsubscribe.remove();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleFacebookLogin,
    handleGoogleLogin,
    isLoading,
  };
}

export default useLoginButton;
