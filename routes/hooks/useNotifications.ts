import { useRef, useEffect, useState, useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { AxiosError, AxiosResponse } from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

//  notifications
import * as Notifications from 'expo-notifications';

// redux
import { useSelector } from 'react-redux';

// navigation
import { useNavigation } from '@react-navigation/native';
import { EvaluationStackParamList, ProfileStackParamList } from '../types';

// redux
import { IState } from '../../store';
import { IUser, IUserState } from '../../store/modules/user/types';

// constants
import {
  instagramTokenKey,
  notificationSettingsKey,
} from '../../constants/storage';

//  services
import { registerForPushNotificationsAsync } from '../../services/notification';
import api from '../../services/api';
import { showToast } from '../../services/toast';

//  i18n
import { translate } from '../../i18n/src/locales';

type ProfileNavigatorProps = StackNavigationProp<
  ProfileStackParamList,
  'ProfileScreen'
>;

type EvaluationNavigatorProps = StackNavigationProp<
  EvaluationStackParamList,
  'RateScreen'
>;

interface Subscription {
  remove: () => void;
}

interface UserData {
  avatar: string;
  name: string;
  userProviderId: string;
  instagram: {
    userName: string;
  };
}

export interface NotificationData {
  _id: string;
  updated_at: string;
  fromUserId: UserData;
  value: number;
  isRead?: boolean;
}

interface NotificationResponse {
  foundEvaluations: NotificationData[];
}

interface ReturnValue {
  profileNavigator: ProfileNavigatorProps;
  unreadNotificationsAmount: number;
  // eslint-disable-next-line no-unused-vars
  setUnreadNotificationsAmount: (value: number) => void;
}

export function useNotifications(): ReturnValue {
  const profileNavigator = useNavigation<ProfileNavigatorProps>();
  const evaluationNavigator = useNavigation<EvaluationNavigatorProps>();

  const { user } = useSelector<IState, IUserState>(state => state.user);

  const isMounted = useRef<boolean | null>(null);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async notification => {
      const isAlert =
        user.userProviderId ===
        notification?.request?.content?.data?.toUserProviderId;

      const notificationData = await AsyncStorage.getItem(
        notificationSettingsKey,
      );

      const parsedNotification = JSON.parse(notificationData || '{}');

      const { shouldShowAlert, shouldPlaySound } = parsedNotification || {};

      const showAlert = shouldShowAlert === undefined ? true : shouldShowAlert;
      const playSound = shouldPlaySound === undefined ? true : shouldPlaySound;

      return {
        shouldShowAlert: isAlert && showAlert,
        shouldPlaySound: isAlert && playSound,
        shouldSetBadge: isAlert,
      };
    },
  });

  const notificationListener = useRef<Subscription>({} as Subscription);
  const responseListener = useRef<Subscription>({} as Subscription);

  const [unreadNotificationsAmount, setUnreadNotificationsAmount] = useState(0);

  const onRefresh = useCallback(async () => {
    try {
      const notificationResponse: AxiosResponse<NotificationResponse> =
        await api.get(`/evaluation/received/${user.userProviderId}?page=1`);

      const auxNotifications = notificationResponse?.data?.foundEvaluations;

      const unreadNotifications = auxNotifications.reduce(
        (total, notificationItem) => {
          if (!notificationItem.isRead) {
            return total + 1;
          }
          return total;
        },
        0,
      );

      isMounted.current && setUnreadNotificationsAmount(unreadNotifications);
    } catch (err) {
      const error = err as AxiosError;

      if (error?.response?.status === 401) {
        return;
      }

      showToast({ message: translate('loadNotificationError') });
    }
  }, [user.userProviderId]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener(() => {
        onRefresh();
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(async response => {
        const { fromUserProviderId } =
          response?.notification?.request?.content?.data;

        const userData: AxiosResponse<IUser> = await api.get(
          `users/${fromUserProviderId}`,
        );

        evaluationNavigator.navigate('RandomUserScreen', {
          user: { ...userData.data },
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [evaluationNavigator, onRefresh]);

  useEffect(() => {
    (async () => {
      try {
        const notificationToken = await registerForPushNotificationsAsync();

        const instagramToken = await AsyncStorage.getItem(
          instagramTokenKey(user.userProviderId),
        );

        await api.post('/permissions', {
          notificationToken,
          userProviderId: user?.userProviderId,
          instagramToken,
        });
      } catch (err) {
        const error = err as AxiosError;

        if (error?.response?.status === 401) {
          return;
        }
        showToast({ message: translate('enableNotificationError') });
      }
    })();
  }, [user.userProviderId]);

  return {
    profileNavigator,
    unreadNotificationsAmount,
    setUnreadNotificationsAmount,
  };
}
