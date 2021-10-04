import { useCallback, useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { IUserState } from '../../store/modules/user/types';

//  i18n
import { translate } from '../../i18n/src/locales';

//  hooks
import useAuth from '../../hooks/useAuth';

//  services
import api from '../../services/api';
import {
  instagramRequestDateKey,
  instagramTokenKey,
  notificationTokenKey,
} from '../../constants/storage';

interface ReturnType {
  handleUserDeletion(): Promise<void>;
  isLoading: boolean;
}

function useSettings(): ReturnType {
  const { signOut } = useAuth();

  const isMounted = useRef<boolean | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector<IState, IUserState>(state => state.user);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleUserDeletion = useCallback(async () => {
    try {
      setIsLoading(true);
      await api.delete('/users');
      isMounted.current && setIsLoading(false);

      // remove instagram last request date key from storage
      // remove instagram token key from storage
      //  remove user notification token key from storage

      await AsyncStorage.multiRemove([
        instagramTokenKey(user.userProviderId),
        instagramRequestDateKey(user.userProviderId),
        notificationTokenKey,
      ]);

      signOut();
    } catch (err) {
      isMounted.current && setIsLoading(false);
      Alert.alert('Error', `${translate('userDeletionError')}: ${err.message}`);
    }
  }, [signOut, user.userProviderId]);

  return {
    handleUserDeletion,
    isLoading,
  };
}

export default useSettings;
