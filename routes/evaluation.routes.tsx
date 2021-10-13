import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//  screens
// import RateScreen from '../screens/rateScreen';
import { RandomUserScreen } from '../screens/randomUserScreen/container';
import { TrackScreen } from '../screens/trackScreen/container';

import { DefaultUser as TrackedUserScreen } from '../components/defaultUser';

// i18n
// import { translate } from '../i18n/src/locales';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';
import { EvaluationStackParamList } from './types';

const Evaluation = createStackNavigator<EvaluationStackParamList>();

const EvaluationRoutes: React.FC = () => (
  <Evaluation.Navigator
    initialRouteName="RateScreen"
    screenOptions={{
      headerStyle: { backgroundColor: Colors.background },
      headerTitleStyle: { color: Colors.accent, fontFamily: fonts.family },
      headerTintColor: Colors.accent,
    }}
  >
    <Evaluation.Screen
      name="RateScreen"
      component={TrackScreen}
      options={{
        headerShown: false,
      }}
    />
    <Evaluation.Screen
      name="RandomUserScreen"
      component={RandomUserScreen}
      options={{
        headerShown: false,
      }}
    />
    <Evaluation.Screen
      name="TrackedUserScreen"
      component={TrackedUserScreen}
      options={{
        headerShown: false,
      }}
    />
  </Evaluation.Navigator>
);

export default EvaluationRoutes;
