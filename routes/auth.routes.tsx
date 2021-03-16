import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login';
import GenderScreen from '../screens/registerStack/genderScreen';
import SexualOrientationScreen from '../screens/registerStack/sexualOrientationScreen';
import RelationshipStatusScreen from '../screens/registerStack/relationshipStatusScreen';
import InstagramScreen from '../screens/registerStack/instagramScreen';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="GenderScreen" component={GenderScreen} />
    <Auth.Screen
      name="SexualOrientationScreen"
      component={SexualOrientationScreen}
    />
    <Auth.Screen
      name="RelationshipStatusScreen"
      component={RelationshipStatusScreen}
    />
    <Auth.Screen name="InstagramScreen" component={InstagramScreen} />
  </Auth.Navigator>
);

export default AuthRoutes;
