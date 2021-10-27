import { useRef, useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AxiosResponse } from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

//  notifications
import * as Notifications from 'expo-notifications';

// redux
import { useSelector, useDispatch } from 'react-redux';

// navigation
import { useNavigation } from '@react-navigation/native';
import { EvaluationStackParamList, ProfileStackParamList } from '../types';

// redux
import { IState } from '../../store';
import { updateUserRate } from '../../store/modules/user/actions';
import { IUser, IUserState } from '../../store/modules/user/types';

// constants
import { notificationTokenKey } from '../../constants/storage';

//  services
import { registerForPushNotificationsAsync } from '../../services/notification';
import api from '../../services/api';

//  i18n
import { translate } from '../../i18n/src/locales';
import { showToast } from '../../services/toast';

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

  const dispatch = useDispatch();

  const { user } = useSelector<IState, IUserState>(state => state.user);

  Notifications.setNotificationHandler({
    handleNotification: async notification => {
      const isAlert =
        user.userProviderId ===
        notification?.request?.content?.data?.toUserProviderId;

      return {
        shouldShowAlert: isAlert,
        shouldPlaySound: isAlert,
        shouldSetBadge: isAlert,
      };
    },
  });

  const notificationListener = useRef<Subscription>({} as Subscription);
  const responseListener = useRef<Subscription>({} as Subscription);

  const [unreadNotificationsAmount, setUnreadNotificationsAmount] = useState(0);

  const onRefresh = useCallback(async () => {
    try {
      const rateResponse: AxiosResponse<{ rate: number }> = await api.get(
        'users/update-rate',
      );

      const { rate } = rateResponse?.data || {};

      const notificationResponse: AxiosResponse<NotificationResponse> =
        await api.get(`/evaluation?page=1`);

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

      setUnreadNotificationsAmount(unreadNotifications);
      dispatch(updateUserRate(rate));
    } catch (err) {
      showToast({ message: translate('loadNotificationError') });
    }
  }, [dispatch]);

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
        const storedNotificationToken = await AsyncStorage.getItem(
          notificationTokenKey,
        );
        if (storedNotificationToken) return;
        const notificationToken = await registerForPushNotificationsAsync();

        if (notificationToken) {
          AsyncStorage.setItem(notificationTokenKey, notificationToken);
        }

        await api.post('/permissions', {
          notificationToken,
          userProviderId: user.userProviderId,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('error: ', err);
        Alert.alert('Error', translate('enableNotificationError'));
      }
    })();
  }, [user.userProviderId]);

  return {
    profileNavigator,
    unreadNotificationsAmount,
    setUnreadNotificationsAmount,
  };
}
