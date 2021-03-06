/* eslint-disable global-require */
import React from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import store from './store';

import Login from './screens/login';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    matrix: require('./assets/fonts/Matrix.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

export default App;
