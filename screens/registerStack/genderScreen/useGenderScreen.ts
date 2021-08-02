/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

// redux
import { IUser } from '../../../store/modules/user/types';

interface ReturnValue {
  userSex: 'male' | 'female' | undefined;
  handleUserSex: (sex: 'male' | 'female') => void;
  handleContinue: () => void;
}

function useGenderScreen(): ReturnValue {
  const navigation = useNavigation();

  const { params } = useRoute();

  const user = params as IUser;

  const [userSex, setUserSex] = useState<'male' | 'female' | undefined>();

  const handleUserSex = useCallback(
    (sex: 'male' | 'female') => setUserSex(sex),
    [],
  );

  const handleContinue = useCallback(() => {
    navigation.navigate('SexualOrientationScreen', { ...user, sex: userSex });
  }, [navigation, user, userSex]);

  return {
    userSex,
    handleUserSex,
    handleContinue,
  };
}

export default useGenderScreen;
