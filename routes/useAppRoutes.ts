import { useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AxiosResponse } from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

//  notifications
import * as Notifications from 'expo-notifications';

// redux
import { useSelector } from 'react-redux';

// navigation
import { useNavigation } from '@react-navigation/native';
import { EvaluationStackParamList, ProfileStackParamList } from './types';

// redux
import { IState } from '../store';
import { IUser, IUserState } from '../store/modules/user/types';

// constants
import { notificationTokenKey } from '../constants/storage';

//  services
import { registerForPushNotificationsAsync } from '../services/notification';
import api from '../services/api';

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

interface ReturnValue {
  profileNavigator: ProfileNavigatorProps;
}

export function useAppRoutes(): ReturnValue {
  const profileNavigator = useNavigation<ProfileNavigatorProps>();
  const evaluationNavigator = useNavigation<EvaluationNavigatorProps>();

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

  // const notificationListener = useRef<Subscription>({} as Subscription);
  const responseListener = useRef<Subscription>({} as Subscription);

  useEffect(() => {
    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener(notification => {
    //     console.log('notification received: ', notification);
    //   });

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
      // Notifications.removeNotificationSubscription(
      //   notificationListener.current,
      // );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [evaluationNavigator]);

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
        Alert.alert('Error', 'No permission to receive notifications');
      }
    })();
  }, [user.userProviderId]);

  return {
    profileNavigator,
  };
}
