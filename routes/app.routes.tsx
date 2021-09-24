/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

//  navigation
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//  routes
import ProfileRoutes from './profile.routes';
import EvaluationRoutes from './evaluation.routes';

//  route types
import { TabParamList } from './types';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';

//  components
import { NotificationScreen } from '../screens/notificationScreen/container';
import { SearchScreen } from '../screens/searchScreen/container';

// i18n
import { translate } from '../i18n/src/locales';
import { HeaderButton } from './styles';
import { useAppRoutes } from './useAppRoutes';

const Tab = createBottomTabNavigator<TabParamList>();

const AppTabRoutes: React.FC = () => {
  const { profileNavigator } = useAppRoutes();

  return (
    <Tab.Navigator
      initialRouteName="Evaluation"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.accent,
        tabBarShowLabel: false,
        headerTitleStyle: { color: Colors.accent, fontFamily: fonts.family },
      }}
    >
      <Tab.Screen
        name="Evaluation"
        component={EvaluationRoutes}
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
          headerShown: true,
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
                onPress={() => profileNavigator.navigate('Settings')}
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
