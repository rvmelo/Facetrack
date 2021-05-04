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

//  hooks
import useAuth from '../hooks/useAuth';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';

//  components
import DrawerHeader from './components/drawerHeader';

//  screens
import ProfileScreen from '../screens/profileScreen';

const AppDrawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { signOut } = useAuth();

  return (
    <>
      <DrawerHeader />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
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
    initialRouteName="My Profile"
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
      name="My Profile"
      component={ProfileScreen}
      options={{
        drawerIcon: () => (
          <Ionicons name="md-person-outline" size={25} color={Colors.accent} />
        ),
      }}
    />
  </AppDrawer.Navigator>
);

export default AppDrawerRoutes;
