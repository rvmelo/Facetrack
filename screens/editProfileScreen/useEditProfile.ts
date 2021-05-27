/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useCallback, useState, useEffect, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

// navigation
import { useNavigation } from '@react-navigation/native';

//  redux
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { updateAvatar, updateUser } from '../../store/modules/user/actions';
import { IState } from '../../store';
import { IUser } from '../../store/modules/user/types';

//  services
import api from '../../services/api';
import { translate } from '../../i18n/src/locales';

export interface UserInfoType {
  relationshipStatus: 'single' | 'serious relationship' | 'married' | undefined;
  sexualOrientation:
    | 'heterosexual'
    | 'homosexual'
    | 'bisexual'
    | 'asexual'
    | undefined;
}

interface ReturnValue {
  handleAvatarUpdate(): void;
  userInfo: UserInfoType;
  setUserInfo(userInfo: UserInfoType): void;
  setShouldUpdate(shouldUpdate: boolean): void;
  isLoading: boolean;
}

function useEditProfile(): ReturnValue {
  const user = useSelector<IState, IUser>(state => state.user);

  const navigation = useNavigation();

  const isMounted = useRef<boolean | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfoType>({
    relationshipStatus: user?.relationshipStatus,
    sexualOrientation: user?.sexualOrientation,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleUserUpdate = useCallback(async () => {
    try {
      const response: AxiosResponse<IUser> = await api.patch('/users', {
        ...user,
        ...userInfo,
      });

      dispatch(
        updateUser({
          user: {
            ...response.data,
          },
        }),
      );

      isMounted.current && setShouldUpdate(false);
    } catch (err) {
      Alert.alert('Error', `${translate('userUpdateError')}: ${err.message}`);
    }
  }, [dispatch, user, userInfo]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (shouldUpdate) {
        handleUserUpdate();
      }
    });
    return unsubscribe;
  }, [handleUserUpdate, navigation, shouldUpdate]);

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
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.cancelled) return;

      isMounted.current && setIsLoading(true);

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

      const response: AxiosResponse<IUser> = await api.patch(
        '/users/avatar',
        data,
      );

      dispatch(updateAvatar(response.data.avatar));
      isMounted.current && setIsLoading(false);
    } catch (err) {
      isMounted.current && setIsLoading(false);
      Alert.alert('Error', `${translate('avatarUpdateError')}: ${err.message}`);
    }
  }, [dispatch]);

  return {
    handleAvatarUpdate,
    userInfo,
    setUserInfo,
    setShouldUpdate,
    isLoading,
  };
}

export default useEditProfile;
