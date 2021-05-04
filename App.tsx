/* eslint-disable global-require */
import React from 'react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import store from './store';

import Routes from './routes';

//  constants
import Colors from './constants/colors';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    matrix: require('./assets/fonts/Matrix.ttf'),
    tegomin: require('./assets/fonts/NewTegomin-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar
          animated
          backgroundColor={Colors.background}
          barStyle="light-content"
        />
        <Routes />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
