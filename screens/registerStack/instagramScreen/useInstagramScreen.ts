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
  instagramRequestDateKey,
  instagramTokenKey,
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
      throw new Error(
        'You should grant permissions for this app to track you position all the time',
      );
    }

    const backgroundRequest =
      await Location.requestBackgroundPermissionsAsync();

    if (backgroundRequest.status !== 'granted') {
      throw new Error(
        'You should grant permissions for this app to track you position all the time',
      );
    }

    // const provider = await Location.getProviderStatusAsync();
    // console.log(`provider: ${JSON.stringify(provider)}`);
  }, []);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', async ({ url }) => {
      try {
        if (!navigation.isFocused() || !isMounted.current) return;

        setIsLoading(true);

        await handleLocation();

        const { code } = Linking.parse(url).queryParams || {};

        const response: AxiosResponse<InstagramResponse> = await api.get(
          `/sessions/auth/instagram/profile?code=${code}`,
        );

        const { userName, userMedia, token } = response.data;

        await AsyncStorage.setItem(
          instagramTokenKey(user.userProviderId),
          token,
        );

        await AsyncStorage.setItem(
          instagramRequestDateKey(user.userProviderId),
          new Date().toISOString(),
        );

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
    });
  }, [user, navigation, signUp, handleLocation]);

  return {
    isLoading,
  };
}

export default useInstagramScreen;
