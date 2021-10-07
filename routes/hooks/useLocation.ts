import { useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

//  hooks
import useAuth from '../../hooks/useAuth';

interface LocationCoordsArray {
  locations: Location.LocationObject[];
}

export function useLocation(): void {
  const { signOut } = useAuth();

  const backgroundTask = 'TRACK-USER';

  const onPermissionsCheck = useCallback(async () => {
    const { status: foregroundStatus } =
      await Location.getForegroundPermissionsAsync();

    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();

    if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
      Alert.alert(
        'Error',
        'You should grant permissions for this app to track your position all the time',
        [{ text: 'Ok', onPress: () => signOut() }],
      );
    }
  }, [signOut]);

  const onBackgroundUpdate = useCallback(async () => {
    try {
      TaskManager.defineTask(backgroundTask, ({ data, error }) => {
        if (error) {
          // check `error.message` for more details.
          return;
        }

        const { locations } = data as LocationCoordsArray;

        // eslint-disable-next-line no-console
        console.log('Received new locations', locations);
      });

      await Location.startLocationUpdatesAsync(backgroundTask, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 60 * 1000,
      });
    } catch (err) {
      Alert.alert('Error', 'Background position update failed to start');
    }
  }, []);

  useEffect(() => {
    onPermissionsCheck();
  }, [onPermissionsCheck]);

  useEffect(() => {
    onBackgroundUpdate();
  }, [onBackgroundUpdate]);
}
