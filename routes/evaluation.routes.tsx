import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as Location from 'expo-location';

//  navigation
import { useNavigation } from '@react-navigation/native';

//  screens
import RateScreen from '../screens/rateScreen';
import { RandomUserScreen } from '../screens/randomUserScreen/container';
import { TrackScreen } from '../screens/trackScreen/container';
import { TrackOptionScreen } from '../screens/trackOptionScreen/container';

import { DefaultUser as TrackedUserScreen } from '../components/defaultUser';

// i18n
// import { translate } from '../i18n/src/locales';

// hooks
import useInstagram from '../hooks/useInstagram';

//  constants
import Colors from '../constants/colors';
import { fonts } from '../constants/fonts';
import { EvaluationStackParamList } from './types';

const Evaluation = createStackNavigator<EvaluationStackParamList>();

const EvaluationRoutes: React.FC = () => {
  const navigation = useNavigation();

  const { handleInstagramRefresh, shouldRefreshInstagram } = useInstagram();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const { status: foregroundStatus } =
        await Location.getForegroundPermissionsAsync();

      if (foregroundStatus !== 'granted') return;

      const shouldRefresh = await shouldRefreshInstagram();
      if (shouldRefresh) handleInstagramRefresh();
    });

    return unsubscribe;
  }, [handleInstagramRefresh, shouldRefreshInstagram, navigation]);

  return (
    <Evaluation.Navigator
      initialRouteName="TrackOptionScreen"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTitleStyle: { color: Colors.accent, fontFamily: fonts.family },
        headerTintColor: Colors.accent,
      }}
    >
      <Evaluation.Screen
        name="TrackOptionScreen"
        component={TrackOptionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Evaluation.Screen
        name="RateScreen"
        component={RateScreen}
        options={{
          headerShown: false,
        }}
      />
      <Evaluation.Screen
        name="TrackScreen"
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
};

export default EvaluationRoutes;
