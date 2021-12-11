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
  notificationSettings as notificationStorage,
} from '../../constants/storage';

export interface NotificationData {
  shouldShowAlert: boolean;
  shouldPlaySound: boolean;
}

interface ReturnType {
  handleUserDeletion(): Promise<void>;
  isLoading: boolean;
  notificationSettings: NotificationData;
  toggleNotification: () => void;
  toggleNotificationSound: () => void;
}

function useSettings(): ReturnType {
  const { signOut } = useAuth();

  const isMounted = useRef<boolean | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationData>(() => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
    }));

  const { user } = useSelector<IState, IUserState>(state => state.user);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(notificationStorage);

      const parsedData = JSON.parse(data || '') as NotificationData;
      setNotificationSettings(parsedData);
    })();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      notificationStorage,
      JSON.stringify(notificationSettings),
    );
  }, [notificationSettings]);

  const toggleNotification = useCallback(() => {
    setNotificationSettings(prev => ({
      ...prev,
      shouldShowAlert: !prev?.shouldShowAlert,
    }));
  }, []);

  const toggleNotificationSound = useCallback(() => {
    setNotificationSettings(prev => ({
      ...prev,
      shouldPlaySound: !prev?.shouldPlaySound,
    }));
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
      ]);

      signOut();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      isMounted.current && setIsLoading(false);
      Alert.alert('Error', `${translate('userDeletionError')}: ${err.message}`);
    }
  }, [signOut, user.userProviderId]);

  return {
    handleUserDeletion,
    isLoading,
    notificationSettings,
    toggleNotification,
    toggleNotificationSound,
  };
}

export default useSettings;
