/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import * as Linking from 'expo-linking';

// navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//  redux
import { useDispatch } from 'react-redux';
import { IUser } from '../../../store/modules/user/types';
import { createUser } from '../../../store/modules/user/actions';

//  apis
import api from '../../../services/api';

// i18n
import { translate } from '../../../i18n/src/locales';

interface ReturnValue {
  isLoading: boolean;
}

function useInstagramScreen(): ReturnValue {
  const [isLoading, setIsLoading] = useState(false);

  const { params } = useRoute();

  const user = params as IUser;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    Linking.addEventListener('url', async ({ url }) => {
      try {
        if (!navigation.isFocused()) return;

        setIsLoading(true);

        const { code } = Linking.parse(url).queryParams || {};

        const response = await api.get(
          `/sessions/auth/instagram/profile?code=${code}`,
        );

        const { userName, userMedia } = response.data;

        dispatch(
          createUser({
            ...user,
            birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
            instagram: {
              userName,
              userMedia,
            },
          }),
        );
      } catch (err) {
        setIsLoading(false);
        Alert.alert('Error', translate('userCreationError'));
      }
    });
  }, [dispatch, user, navigation]);

  return {
    isLoading,
  };
}

export default useInstagramScreen;
