import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/homeScreen';

const AppDrawer = createDrawerNavigator();

const AppDrawerRoutes: React.FC = () => (
  <AppDrawer.Navigator initialRouteName="Home">
    <AppDrawer.Screen name="Home" component={HomeScreen} />
  </AppDrawer.Navigator>
);

export default AppDrawerRoutes;
