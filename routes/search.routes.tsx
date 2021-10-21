import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//  screens
import { DefaultUser as SearchedUserScreen } from '../components/defaultUser';
import { SearchScreen } from '../screens/searchScreen/container';

//  routes
import ProfileRoutes from './profile.routes';

//  constants
import { SearchStackParamList } from './types';

const Search = createStackNavigator<SearchStackParamList>();

const SearchRoutes: React.FC = () => (
  <Search.Navigator initialRouteName="SearchScreen">
    <Search.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
    <Search.Screen
      name="SearchedUserScreen"
      component={SearchedUserScreen}
      options={{
        headerShown: false,
      }}
    />
    <Search.Screen
      name="MyProfileRoutes"
      component={ProfileRoutes}
      options={{
        headerShown: false,
      }}
    />
  </Search.Navigator>
);

export default SearchRoutes;
