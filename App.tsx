/* eslint-disable global-require */
import React from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import store from './store';

// import Login from './screens/login';
import Routes from './routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    matrix: require('./assets/fonts/Matrix.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Routes />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
