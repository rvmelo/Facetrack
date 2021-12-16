/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import * as Location from 'expo-location';

import { AxiosResponse } from 'axios';

import * as Linking from 'expo-linking';

// navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//  redux
import { IUser, UserMedia } from '../../../store/modules/user/types';

//  hooks
import useAuth from '../../../hooks/useAuth';

//  api
import api from '../../../services/api';

// i18n
import { translate } from '../../../i18n/src/locales';

import {
  instagramCodeKey,
  instagramRequestDateKey,
  instagramTokenKey,
  userLocationKey,
} from '../../../constants/storage';

interface InstagramResponse {
  userName: string;
  userMedia: UserMedia[];
  token: string;
}

interface ReturnValue {
  isLoading: boolean;
}

function useInstagramScreen(): ReturnValue {
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();

  const { params } = useRoute();

  const isMounted = useRef<boolean | null>(null);

  const user = params as IUser;

  const navigation = useNavigation();

  const handleLocation = useCallback(async () => {
    const foregroundRequest =
      await Location.requestForegroundPermissionsAsync();

    if (foregroundRequest.status !== 'granted') {
      throw new Error(translate('locationPermissionError'));
    }

    // const backgroundRequest =
    //   await Location.requestBackgroundPermissionsAsync();

    // if (backgroundRequest.status !== 'granted') {
    //   throw new Error(translate('locationPermissionError'));
    // }

    // const provider = await Location.getProviderStatusAsync();
    // console.log(`provider: ${JSON.stringify(provider)}`);
  }, []);

  const handleInstagram = useCallback(
    async ({ url }: { url: string }) => {
      try {
        const instagramCode = await AsyncStorage.getItem(instagramCodeKey);

        if (!navigation.isFocused() || !isMounted.current || instagramCode)
          return;

        const { code } = Linking.parse(url).queryParams || {};

        await AsyncStorage.setItem(instagramCodeKey, code);

        await handleLocation();

        const response: AxiosResponse<InstagramResponse> = await api.get(
          `/sessions/auth/instagram/profile?code=${code}`,
        );

        const { userName, userMedia, token } = response.data;

        await AsyncStorage.setItem(
          instagramTokenKey(user?.userProviderId),
          token,
        );

        await AsyncStorage.setItem(
          instagramRequestDateKey(user.userProviderId),
          new Date().toISOString(),
        );

        await AsyncStorage.removeItem(userLocationKey);

        isMounted.current &&
          signUp({
            user: {
              ...user,
              birthDate: user.birthDate,
              instagram: {
                userName,
                userMedia,
              },
            },
          });
      } catch (err) {
        isMounted.current && setIsLoading(false);
        Alert.alert('Error', `${translate('userCreationError')}:${err}`);
      }
    },
    [handleLocation, navigation, signUp, user],
  );

  const debounce = useCallback(
    (timeout = 1000) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let timer: any;
      return ({ url }: { url: string }) => {
        clearTimeout(timer);

        isMounted.current && setIsLoading(true);

        timer = setTimeout(() => handleInstagram({ url }), timeout);
      };
    },
    [handleInstagram],
  );

  const debounceHandleInstagram = debounce();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', debounceHandleInstagram);

    return () => {
      Linking.removeEventListener('url', debounceHandleInstagram);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
  };
}

export default useInstagramScreen;
