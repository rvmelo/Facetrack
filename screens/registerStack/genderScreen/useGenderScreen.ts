/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/modules/user/actions';
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

interface ReturnValue {
  userSex: 'male' | 'female' | undefined;
  handleUserSex: (sex: 'male' | 'female') => void;
  handleContinue: () => void;
}

function useGenderScreen(): ReturnValue {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const user = useSelector<IState, IUser>(state => state.user);

  const [userSex, setUserSex] = useState<'male' | 'female' | undefined>();

  const handleUserSex = useCallback(
    (sex: 'male' | 'female') => setUserSex(sex),
    [],
  );

  const handleContinue = useCallback(() => {
    dispatch(updateUser({ ...user, sex: userSex }));
    navigation.navigate('SexualOrientationScreen');
  }, [navigation, dispatch, user, userSex]);

  return {
    userSex,
    handleUserSex,
    handleContinue,
  };
}

export default useGenderScreen;
