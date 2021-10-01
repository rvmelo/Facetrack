/* eslint-disable react/no-children-prop */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//  screens
import { NotificationScreen } from '../screens/notificationScreen/container';
import { NotificationUserScreen } from '../screens/notificationUserScreen/container';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';
import { NotificationStackParamList } from './types';

const Notification = createStackNavigator<NotificationStackParamList>();

const NotificationRoutes: React.FC = () => (
  <Notification.Navigator
    initialRouteName="NotificationScreen"
    screenOptions={{
      headerStyle: { backgroundColor: Colors.background },
      headerTitleStyle: { color: Colors.accent, fontFamily: fonts.family },
      headerTintColor: Colors.accent,
    }}
  >
    <Notification.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{
        headerShown: true,
        headerTitle: 'Notifications',
      }}
    />
    <Notification.Screen
      name="NotificationUserScreen"
      component={NotificationUserScreen}
      options={{
        headerShown: false,
      }}
    />
  </Notification.Navigator>
);

export default NotificationRoutes;
