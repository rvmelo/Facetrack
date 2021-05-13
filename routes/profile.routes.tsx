import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/profileScreen';
import PublicationScreen from '../screens/publicationScreen';

// i18n
import { translate } from '../i18n/src/locales';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';

const Profile = createStackNavigator();

const ProfileRoutes: React.FC = () => (
  <Profile.Navigator
    initialRouteName="ProfileScreen"
    screenOptions={{
      headerStyle: { backgroundColor: Colors.background },
      headerTitleStyle: { color: Colors.accent, fontFamily: fonts.family },
      headerTintColor: Colors.accent,
    }}
  >
    <Profile.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Profile.Screen
      name="Publication"
      component={PublicationScreen}
      options={{
        headerShown: true,
        headerTitle: translate('userPublication'),
      }}
    />
  </Profile.Navigator>
);

export default ProfileRoutes;
