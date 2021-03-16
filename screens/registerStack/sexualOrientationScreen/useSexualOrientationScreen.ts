/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/modules/user/actions';
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

interface SexualOrientationOptions {
  option: 'heterosexual' | 'homosexual' | 'bisexual' | 'asexual' | undefined;
}

interface ReturnValue {
  userSexualOrientation: SexualOrientationOptions;
  handleUserSexualOrientation: (
    sexualOrientation: SexualOrientationOptions,
  ) => void;
  handleContinue: () => void;
}

function useSexualOrientationScreen(): ReturnValue {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const user = useSelector<IState, IUser>(state => state.user);

  const [
    userSexualOrientation,
    setUserSexualOrientation,
  ] = useState<SexualOrientationOptions>({} as SexualOrientationOptions);

  const handleUserSexualOrientation = useCallback(
    (sexualOrientation: SexualOrientationOptions) => {
      setUserSexualOrientation({ ...sexualOrientation });
    },
    [],
  );

  const handleContinue = useCallback(() => {
    dispatch(
      updateUser({
        ...user,
        sexualOrientation: userSexualOrientation?.option,
      }),
    );
    navigation.navigate('RelationshipStatusScreen');
  }, [navigation, dispatch, user, userSexualOrientation]);

  return {
    userSexualOrientation,
    handleUserSexualOrientation,
    handleContinue,
  };
}

export default useSexualOrientationScreen;
