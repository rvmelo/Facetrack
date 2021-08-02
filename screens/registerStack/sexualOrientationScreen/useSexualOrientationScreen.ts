/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

// redux
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

  const { params } = useRoute();

  const user = params as IUser;

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
    navigation.navigate('RelationshipStatusScreen', {
      ...user,
      sexualOrientation: userSexualOrientation?.option,
    });
  }, [navigation, user, userSexualOrientation]);

  return {
    userSexualOrientation,
    handleUserSexualOrientation,
    handleContinue,
  };
}

export default useSexualOrientationScreen;
