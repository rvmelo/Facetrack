import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login';
import UserForm from '../screens/registerStack/userForm';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      // cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="RegisterStack" component={UserForm} />
  </Auth.Navigator>
);

export default AuthRoutes;
