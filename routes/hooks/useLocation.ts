import { useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

//  hooks
import useAuth from '../../hooks/useAuth';
import { userLocationKey } from '../../constants/storage';

//  services
import api from '../../services/api';

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
      TaskManager.defineTask(backgroundTask, async ({ data, error }) => {
        if (error) {
          // check `error.message` for more details.
          return;
        }

        const { locations } = data as LocationCoordsArray;

        const item = await AsyncStorage.getItem(userLocationKey);

        if (!item) {
          await AsyncStorage.setItem(
            userLocationKey,
            JSON.stringify({ coords: locations[0].coords }),
          );
          await api.patch('users/update-location', {
            coords: locations[0].coords,
          });
          return;
        }

        const storedLocation = JSON.parse(item);
        const { coords } = storedLocation;

        const { latitude, longitude } = locations[0].coords;

        if (coords.longitude === longitude && coords.latitude === latitude)
          return;

        await api.patch('users/update-location', {
          coords: { longitude, latitude },
        });
      });

      await Location.startLocationUpdatesAsync(backgroundTask, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 60 * 1000,
        distanceInterval: 100,
      });
    } catch (err) {
      Alert.alert(
        'Error',
        `Background position update failed to start: ${err}`,
      );
    }
  }, []);

  useEffect(() => {
    onPermissionsCheck();
  }, [onPermissionsCheck]);

  useEffect(() => {
    onBackgroundUpdate();
  }, [onBackgroundUpdate]);
}
