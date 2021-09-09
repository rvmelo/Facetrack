/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Alert } from 'react-native';

// import * as Notifications from 'expo-notifications';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../store';
import { IUserState } from '../store/modules/user/types';

//  navigation

//  navigators
import ProfileRoutes from './profile.routes';

//  hooks
import useAuth from '../hooks/useAuth';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';

//  components
import DrawerHeader from '../components/drawerHeader';
import SettingsScreen from '../screens/settingsScreen';
import RateScreen from '../screens/rateScreen';

// i18n
import { translate } from '../i18n/src/locales';
import { registerForPushNotificationsAsync } from '../services/notification';
import { notificationTokenKey } from '../constants/storage';
import api from '../services/api';

const AppDrawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { signOut } = useAuth();

  return (
    <>
      <DrawerHeader />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={translate('Logout')}
          onPress={signOut}
          labelStyle={{
            color: Colors.accent,
            fontSize: fonts.sizes.md,
            fontFamily: fonts.family,
          }}
          icon={() => (
            <Ionicons
              name="md-log-out-outline"
              size={25}
              color={Colors.accent}
            />
          )}
        />
      </DrawerContentScrollView>
    </>
  );
};

const AppDrawerRoutes: React.FC = () => {
  const { user } = useSelector<IState, IUserState>(state => state.user);

  // const notificationListener = useRef<any>();
  // const responseListener = useRef<any>();

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
    <AppDrawer.Navigator
      initialRouteName="Profile"
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
      // drawerContentOptions={{
      //   activeTintColor: Colors.primary,
      //   labelStyle: {
      //     color: Colors.accent,
      //     fontSize: fonts.sizes.md,
      //     fontFamily: fonts.family,
      //   },
      //   style: {
      //     backgroundColor: Colors.background,
      //     paddingTop: 20,
      //   },
      // }}
      screenOptions={() => ({
        headerShown: true,
        headerStyle: { backgroundColor: Colors.background },
        headerTitleStyle: { color: Colors.accent, fontFamily: fonts.family },
        headerTintColor: Colors.accent,

        // activeTintColor: Colors.primary,
        // labelStyle: {
        //   color: Colors.accent,
        //   fontSize: fonts.sizes.md,
        //   fontFamily: fonts.family,
        // },
        // style: {
        //   backgroundColor: Colors.background,
        //   paddingTop: 20,
        // },
      })}
    >
      <AppDrawer.Screen
        name=" Profile"
        component={ProfileRoutes}
        options={({ route }) => ({
          drawerIcon: () => (
            <Ionicons
              name="md-person-outline"
              size={25}
              color={Colors.accent}
            />
          ),
          headerShown:
            getFocusedRouteNameFromRoute(route) !== 'Publication' &&
            getFocusedRouteNameFromRoute(route) !== 'EditProfile',
          headerTitle: translate('myProfile'),
          drawerLabel: translate('myProfile'),
        })}
      />
      <AppDrawer.Screen
        name="Rate Screen"
        component={RateScreen}
        options={() => ({
          drawerIcon: () => (
            <Ionicons name="md-globe" size={25} color={Colors.accent} />
          ),
          headerTitle: 'Rate Screen',
          drawerLabel: 'Rate Screen',
        })}
      />
      <AppDrawer.Screen
        name=" Settings"
        component={SettingsScreen}
        options={() => ({
          drawerIcon: () => (
            <Ionicons
              name="md-settings-outline"
              size={25}
              color={Colors.accent}
            />
          ),
          headerTitle: translate('settings'),
          drawerLabel: translate('settings'),
        })}
      />
    </AppDrawer.Navigator>
  );
};

export default AppDrawerRoutes;
