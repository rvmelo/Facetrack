/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

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
  }, [user, navigation, signUp]);

  return {
    isLoading,
  };
}

export default useInstagramScreen;
