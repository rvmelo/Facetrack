import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//  screens
import ProfileScreen from '../screens/profileScreen';
import PublicationScreen from '../screens/publicationScreen';
import EditProfileScreen from '../screens/editProfileScreen';
import SettingsScreen from '../screens/settingsScreen';

// i18n
import { translate } from '../i18n/src/locales';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';
import { ProfileStackParamList } from './types';

const Profile = createStackNavigator<ProfileStackParamList>();

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
    <Profile.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerShown: true,
        headerTitle: translate('editProfile'),
      }}
    />
    <Profile.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerShown: true,
        headerTitle: translate('settings'),
      }}
    />
  </Profile.Navigator>
);

export default ProfileRoutes;
