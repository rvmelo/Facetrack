/* eslint-disable global-require */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';

import { Provider } from 'react-redux';

import * as SplashScreen from 'expo-splash-screen';
import { loadAsync } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import store from './store';

import Routes from './routes';

//  constants
import Colors from './constants/colors';

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadAsync({
          matrix: require('./assets/fonts/Matrix.ttf'),
          tegomin: require('./assets/fonts/NewTegomin-Regular.ttf'),
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          ...Colors,
          card: Colors.background,
          notification: Colors.accent,
          border: Colors.background,
        },
        dark: true,
      }}
    >
      <Provider store={store}>
        <StatusBar
          animated
          backgroundColor={Colors.background}
          barStyle="light-content"
        />
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <Routes />
        </View>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
