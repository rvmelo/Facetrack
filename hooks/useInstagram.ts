import { useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { differenceInDays } from 'date-fns';
import { AxiosResponse } from 'axios';
import * as WebBrowser from 'expo-web-browser';

import * as Linking from 'expo-linking';

// navigation
import { useNavigation } from '@react-navigation/native';

//  redux
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { IUserState, UserMedia } from '../store/modules/user/types';
import {
  loadUser,
  updateUserMediaLoadState,
} from '../store/modules/user/actions';
import { IState } from '../store';

//  i18n
import { translate } from '../i18n/src/locales';

//  api
import api from '../services/api';
import { base_url, instagram_client_id } from '../constants/backend';

interface InstagramResponse {
  userMedia: UserMedia[];
  userName: string;
  token: string;
}

interface ReturnType {
  handleInstagramRefresh(): void;
  shouldRefreshInstagram(): Promise<boolean>;
}

function useInstagram(): ReturnType {
  const dispatch = useDispatch();

  const isRequestSent = useRef<boolean | null>(null);

  const { user, isUserMediaLoading } = useSelector<IState, IUserState>(
    state => state.user,
  );

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = Linking.addEventListener('url', async ({ url }) => {
      try {
        if (!navigation.isFocused() || isRequestSent.current) return;

        dispatch(updateUserMediaLoadState(true));

        const { code } = Linking.parse(url).queryParams || {};

        isRequestSent.current = true;

        const response: AxiosResponse<InstagramResponse> = await api.get(
          `/sessions/auth/instagram/profile?code=${code}`,
        );

        const { userName, userMedia, token } = response.data;

        await AsyncStorage.setItem(
          `@Facetrack:${user.userProviderId}-instagramToken`,
          token,
        );

        await AsyncStorage.setItem(
          `@Facetrack:${user.userProviderId}-lastInstagramRequestDate`,
          new Date().toISOString(),
        );

        dispatch(
          loadUser({
            ...user,
            instagram: { userName, userMedia },
          }),
        );

        dispatch(updateUserMediaLoadState(false));
        isRequestSent.current = false;
      } catch (err) {
        isRequestSent.current = false;
        dispatch(updateUserMediaLoadState(false));
        Alert.alert(
          'Error',
          `${translate('instagramRequestFailed')}: ${err.message}`,
        );
      }
    });

    return unsubscribe;
  }, [dispatch, navigation, user]);

  const shouldRefreshInstagram = useCallback(async () => {
    const date = await AsyncStorage.getItem(
      `@Facetrack:${user.userProviderId}-lastInstagramRequestDate`,
    );

    const previousDate = new Date(typeof date === 'string' ? date : '');

    return (
      !!date &&
      differenceInDays(new Date(), previousDate) > 1 &&
      !isUserMediaLoading
    );
  }, [user.userProviderId, isUserMediaLoading]);

  const handleInstagramRefresh = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem(
        `@Facetrack:${user.userProviderId}-instagramToken`,
      );

      dispatch(updateUserMediaLoadState(true));

      const response: AxiosResponse<InstagramResponse> = await api.get(
        `users/instagram?token=${token}`,
      );

      const { userMedia } = response.data;

      const userName = user?.instagram?.userName
        ? user?.instagram?.userName
        : '';

      dispatch(
        loadUser({
          ...user,
          instagram: { userName, userMedia },
        }),
      );

      AsyncStorage.setItem(
        `@Facetrack:${user.userProviderId}-lastInstagramRequestDate`,
        new Date().toISOString(),
      );
      dispatch(updateUserMediaLoadState(false));
    } catch (err) {
      dispatch(updateUserMediaLoadState(false));
      Alert.alert('Error', `${translate('instagramRefreshFailed')}`, [
        {
          text: translate('yes'),
          onPress: () =>
            WebBrowser.openBrowserAsync(
              `https://api.instagram.com/oauth/authorize?client_id=${instagram_client_id}&redirect_uri=${`${base_url}/sessions/auth/instagram/callback`}&scope=user_profile,user_media&response_type=code`,
            ),
        },
        {
          text: translate('no'),
          onPress: () =>
            AsyncStorage.setItem(
              `@Facetrack:${user.userProviderId}-lastInstagramRequestDate`,
              new Date().toISOString(),
            ),
        },
      ]);
    }
  }, [user, dispatch]);

  return {
    handleInstagramRefresh,
    shouldRefreshInstagram,
  };
}

export default useInstagram;
