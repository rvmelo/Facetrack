/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useCallback, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

// navigation
import { useNavigation } from '@react-navigation/native';

//  redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/modules/user/actions';
import { IState } from '../../store';

import { IUser } from '../../store/modules/user/types';

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
  localAvatarUri: string;
}

function useEditProfile(): ReturnValue {
  const user = useSelector<IState, IUser>(state => state.user);

  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState<UserInfoType>({
    relationshipStatus: user?.relationshipStatus,
    sexualOrientation: user?.sexualOrientation,
  });

  const [localAvatarUri, setLocalAvatarUri] = useState('');

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('@Facetrack:user', JSON.stringify(user));
    })();
  }, [user]);

  const onDispatch = useCallback(async () => {
    dispatch(updateUser({ localAvatarUri, user: { ...user, ...userInfo } }));

    setShouldUpdate(false);
    setLocalAvatarUri('');
  }, [dispatch, localAvatarUri, user, userInfo]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (shouldUpdate) {
        onDispatch();
      }
    });
    return unsubscribe;
  }, [onDispatch, navigation, shouldUpdate]);

  const handleAvatarUpdate = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

    setLocalAvatarUri(imageUri);

    setShouldUpdate(true);
  }, []);

  return {
    handleAvatarUpdate,
    userInfo,
    setUserInfo,
    setShouldUpdate,
    localAvatarUri,
  };
}

export default useEditProfile;
