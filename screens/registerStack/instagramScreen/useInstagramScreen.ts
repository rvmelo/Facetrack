/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';

import * as Linking from 'expo-linking';

// navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//  redux
import { useDispatch } from 'react-redux';
import { IUser } from '../../../store/modules/user/types';

//  hooks
import useAuth from '../../../hooks/useAuth';

//  apis
import api from '../../../services/api';

// i18n
import { translate } from '../../../i18n/src/locales';

interface ReturnValue {
  isLoading: boolean;
}

function useInstagramScreen(): ReturnValue {
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();

  const { params } = useRoute();

  const isMounted = useRef<boolean | null>(null);

  const user = params as IUser;

  const dispatch = useDispatch();

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

        const response = await api.get(
          `/sessions/auth/instagram/profile?code=${code}`,
        );

        const { userName, userMedia } = response.data;

        isMounted.current &&
          signUp({
            user: {
              ...user,
              birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
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
  }, [dispatch, user, navigation, signUp]);

  return {
    isLoading,
  };
}

export default useInstagramScreen;
