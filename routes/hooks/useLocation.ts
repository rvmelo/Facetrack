import { useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getPreciseDistance } from 'geolib';

// import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

//  services
import { AxiosError } from 'axios';
import api from '../../services/api';

//  hooks
import useAuth from '../../hooks/useAuth';
import { userLocationKey } from '../../constants/storage';

//  i18n
import { translate } from '../../i18n/src/locales';

// interface LocationCoordsArray {
//   locations: Location.LocationObject[];
// }

export function useLocation(): void {
  const { signOut } = useAuth();

  // const backgroundTask = 'TRACK-USER';

  const onPermissionsCheck = useCallback(async () => {
    const { status: foregroundStatus } =
      await Location.getForegroundPermissionsAsync();

    // const { status: backgroundStatus } =
    //   await Location.requestBackgroundPermissionsAsync();

    if (foregroundStatus !== 'granted') {
      Alert.alert('Error', translate('locationPermissionError'), [
        { text: 'Ok', onPress: () => signOut() },
      ]);
    }
  }, [signOut]);

  const onForegroundUpdate = useCallback(async () => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 60 * 1000,
        distanceInterval: 100,
      },
      async data => {
        try {
          const { coords } = data as Location.LocationObject;

          const item = await AsyncStorage.getItem(userLocationKey);

          if (!item) {
            await AsyncStorage.setItem(
              userLocationKey,
              JSON.stringify({ coords }),
            );
            await api.patch('users/update-location', {
              coords,
            });
            return;
          }

          const storedLocation = JSON.parse(item);
          const { coords: storedCoords } = storedLocation;

          const { latitude, longitude } = coords;

          if (
            getPreciseDistance(
              {
                latitude: storedCoords.latitude,
                longitude: storedCoords.longitude,
              },
              { latitude, longitude },
            ) < 100
          ) {
            return;
          }

          await api.patch('users/update-location', {
            coords: { longitude, latitude },
          });
          await AsyncStorage.setItem(
            userLocationKey,
            JSON.stringify({ longitude, latitude }),
          );
        } catch (err) {
          const error = err as AxiosError;

          if (error?.response?.status === 401) {
            return;
          }

          Alert.alert(
            'Error',
            `${translate('foregroundTrackingError')}: ${err}`,
          );
        }
      },
    );
  }, []);

  // const onBackgroundUpdate = useCallback(async () => {
  //   try {
  //     TaskManager.defineTask(backgroundTask, async ({ data, error }) => {
  //       if (error) {
  //         // check `error.message` for more details.
  //         return;
  //       }

  //       const { locations } = data as LocationCoordsArray;

  //       const item = await AsyncStorage.getItem(userLocationKey);

  //       if (!item) {
  //         await AsyncStorage.setItem(
  //           userLocationKey,
  //           JSON.stringify({ coords: locations[0].coords }),
  //         );
  //         await api.patch('users/update-location', {
  //           coords: locations[0].coords,
  //         });
  //         return;
  //       }

  //       const storedLocation = JSON.parse(item);
  //       const { coords } = storedLocation;

  //       const { latitude, longitude } = locations[0].coords;

  //       if (coords.longitude === longitude && coords.latitude === latitude)
  //         return;

  //       await api.patch('users/update-location', {
  //         coords: { longitude, latitude },
  //       });
  //     });

  //     await Location.startLocationUpdatesAsync(backgroundTask, {
  //       accuracy: Location.Accuracy.Balanced,
  //       timeInterval: 60 * 1000,
  //       distanceInterval: 100,
  //     });
  //   } catch (err) {
  //     Alert.alert('Error', `${translate('backgroundTrackingError')}: ${err}`);
  //   }
  // }, []);

  useEffect(() => {
    onPermissionsCheck();
  }, [onPermissionsCheck]);

  useEffect(() => {
    onForegroundUpdate();
  }, [onForegroundUpdate]);
}
