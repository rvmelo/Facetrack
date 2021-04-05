/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import * as Linking from 'expo-linking';

// navigation
import { useNavigation } from '@react-navigation/native';

//  apis
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../services/api';

// i18n
import { translate } from '../../../i18n/src/locales';

//  redux
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

interface ReturnValue {
  isLoading: boolean;
}

function useInstagramScreen(): ReturnValue {
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector<IState, IUser>(state => state.user);
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

        await api.post('/users', {
          ...user,
          instagram: {
            userName,
            userMedia,
          },
        });
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
