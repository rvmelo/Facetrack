/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';

import * as Notifications from 'expo-notifications';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  navigation
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../store';
import { IUserState } from '../store/modules/user/types';

//  services
import { registerForPushNotificationsAsync } from '../services/notification';

//  routes
import ProfileRoutes from './profile.routes';

//  route types
import { ProfileStackParamList, TabParamList } from './types';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';

//  components
import RateScreen from '../screens/rateScreen';
import { NotificationScreen } from '../screens/notificationScreen/container';
import { SearchScreen } from '../screens/searchScreen/container';

// i18n
import { translate } from '../i18n/src/locales';
import { notificationTokenKey } from '../constants/storage';
import api from '../services/api';
import { HeaderButton } from './styles';

// interface Subscription {
//   remove: () => void;
// }

type NavigationProps = StackNavigationProp<
  ProfileStackParamList,
  'ProfileScreen'
>;

const Tab = createBottomTabNavigator<TabParamList>();

const AppTabRoutes: React.FC = () => {
  const { user } = useSelector<IState, IUserState>(state => state.user);

  const navigation = useNavigation<NavigationProps>();

  Notifications.setNotificationHandler({
    handleNotification: async notification => {
      const isAlert =
        user.userProviderId ===
        notification?.request?.content?.data?.userProviderId;

      return {
        shouldShowAlert: isAlert,
        shouldPlaySound: isAlert,
        shouldSetBadge: isAlert,
      };
    },
  });

  // const notificationListener = useRef<Subscription>({} as Subscription);
  // const responseListener = useRef<Subscription>({} as Subscription);

  // useEffect(() => {
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener(notification => {
  //       console.log('notification received: ', notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener(response => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current,
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

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

  return (
    <Tab.Navigator
      initialRouteName="RateScreen"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.accent,
        tabBarShowLabel: false,
        headerTitleStyle: { color: Colors.accent, fontFamily: fonts.family },
      }}
    >
      <Tab.Screen
        name="RateScreen"
        component={RateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-location"
              size={25}
              color={focused ? Colors.primary : Colors.accent}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-search"
              size={25}
              color={focused ? Colors.primary : Colors.accent}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-notifications"
              size={25}
              color={focused ? Colors.primary : Colors.accent}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        options={({ route }) => ({
          tabBarLabel: translate('myProfile'),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-person"
              size={25}
              color={focused ? Colors.primary : Colors.accent}
            />
          ),
          headerShown:
            getFocusedRouteNameFromRoute(route) !== 'Publication' &&
            getFocusedRouteNameFromRoute(route) !== 'EditProfile' &&
            getFocusedRouteNameFromRoute(route) !== 'Settings',
          headerTitle: translate('myProfile'),
          headerRight: () => (
            <HeaderButton>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Settings')}
              >
                <Ionicons name="md-menu" size={30} color={Colors.accent} />
              </TouchableWithoutFeedback>
            </HeaderButton>
          ),
        })}
        component={ProfileRoutes}
      />
    </Tab.Navigator>
  );
};

export default AppTabRoutes;
