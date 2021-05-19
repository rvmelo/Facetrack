/* eslint-disable no-undef */
import { useCallback, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

//  redux
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '../../store/modules/user/actions';
import { IState } from '../../store';

import api from '../../services/api';
import { IUser } from '../../store/modules/user/types';

interface ReturnValue {
  isLoading: boolean;
  handleAvatarUpdate(): void;
}

function useEditProfile(): ReturnValue {
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector<IState, IUser>(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('@Facetrack:user', JSON.stringify(user));
    })();
  }, [user]);

  const handleAvatarUpdate = useCallback(async () => {
    try {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'Sorry, we need camera roll permissions to make this work!',
          [{ text: 'ok' }],
        );
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.cancelled) return;

      setIsLoading(true);

      const imageUri = result.uri;

      const fileType = imageUri.substring(imageUri.lastIndexOf('.') + 1);

      const data = new FormData();

      data.append(
        'avatar',
        JSON.parse(
          JSON.stringify({
            uri: imageUri,
            type: `image/${fileType}`,
            name: `photo.${fileType}`,
          }),
        ),
      );

      const response = await api.patch<IUser>('/users/avatar', data);

      const avatarUri = response.data?.avatar;

      dispatch(updateAvatar(avatarUri));

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, [dispatch]);

  return {
    isLoading,
    handleAvatarUpdate,
  };
}

export default useEditProfile;
