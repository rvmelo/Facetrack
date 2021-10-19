import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//  screens
import { DefaultUser as SearchedUserScreen } from '../components/defaultUser';
import { SearchScreen } from '../screens/searchScreen/container';

//  constants
import { SearchStackParamList } from './types';

const Evaluation = createStackNavigator<SearchStackParamList>();

const SearchRoutes: React.FC = () => (
  <Evaluation.Navigator initialRouteName="SearchScreen">
    <Evaluation.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
    <Evaluation.Screen
      name="SearchedUserScreen"
      component={SearchedUserScreen}
      options={{
        headerShown: false,
      }}
    />
  </Evaluation.Navigator>
);

export default SearchRoutes;
