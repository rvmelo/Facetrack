/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

//  navigation
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//  navigators
import ProfileRoutes from './profile.routes';

//  hooks
import useAuth from '../hooks/useAuth';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';

//  components
import DrawerHeader from '../components/drawerHeader';

// i18n
import { translate } from '../i18n/src/locales';

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

const AppDrawerRoutes: React.FC = () => (
  <AppDrawer.Navigator
    initialRouteName="Profile"
    drawerContent={(props: DrawerContentComponentProps) => (
      <CustomDrawerContent {...props} />
    )}
    drawerContentOptions={{
      activeTintColor: Colors.primary,
      labelStyle: {
        color: Colors.accent,
        fontSize: fonts.sizes.md,
        fontFamily: fonts.family,
      },
      style: {
        backgroundColor: Colors.background,
        paddingTop: 20,
      },
    }}
    screenOptions={() => ({
      headerShown: true,
      headerStyle: { backgroundColor: Colors.background },
      headerTitleStyle: { color: Colors.accent, fontFamily: fonts.family },
      headerTintColor: Colors.accent,
    })}
  >
    <AppDrawer.Screen
      name=" Profile"
      component={ProfileRoutes}
      options={({ route }) => ({
        drawerIcon: () => (
          <Ionicons name="md-person-outline" size={25} color={Colors.accent} />
        ),
        headerShown:
          getFocusedRouteNameFromRoute(route) !== 'Publication' &&
          getFocusedRouteNameFromRoute(route) !== 'EditProfile',
        headerTitle: translate('myProfile'),
        drawerLabel: translate('myProfile'),
      })}
    />
  </AppDrawer.Navigator>
);

export default AppDrawerRoutes;
