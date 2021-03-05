/* eslint-disable global-require */
import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import Login from './screens/login';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    matrix: require('./assets/fonts/Matrix.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <Login />;
};

export default App;
