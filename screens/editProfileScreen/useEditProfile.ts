/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useCallback, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

// navigation
import { useNavigation } from '@react-navigation/native';

//  redux
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import {
  updateAvatarRequest,
  updateUserRequest,
} from '../../store/modules/user/actions';
import { IState } from '../../store';
import { IUserState } from '../../store/modules/user/types';

//  services
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
}

function useEditProfile(): ReturnValue {
  const { user, isAvatarUpdateFailure } = useSelector<IState, IUserState>(
    state => state.user,
  );

  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState<UserInfoType>({
    relationshipStatus: user?.relationshipStatus,
    sexualOrientation: user?.sexualOrientation,
  });

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    isAvatarUpdateFailure &&
      Alert.alert('Error', translate('avatarUpdateError'));
  }, [isAvatarUpdateFailure]);

  const handleUserUpdate = useCallback(async () => {
    dispatch(
      updateUserRequest({
        ...user,
        ...userInfo,
      }),
    );
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
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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

      const imageUri = result.uri;

      dispatch(updateAvatarRequest(imageUri));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err as AxiosError;

      if (error?.response?.status === 401) {
        return;
      }

      Alert.alert('Error', `${translate('avatarUpdateError')}: ${err.message}`);
    }
  }, [dispatch]);

  return {
    handleAvatarUpdate,
    userInfo,
    setUserInfo,
    setShouldUpdate,
  };
}

export default useEditProfile;
