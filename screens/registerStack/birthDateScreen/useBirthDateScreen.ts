/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';
import { isValid, differenceInYears, endOfDay } from 'date-fns';
import { Alert } from 'react-native';

//  navigation
import { useNavigation } from '@react-navigation/native';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/modules/user/actions';
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

interface ReturnValue {
  birthDate: string;
  setBirthDate(date: string): void;
  handleContinue(): void;
}

function useBirthDateScreen(): ReturnValue {
  const [birthDate, setBirthDate] = useState('');

  const dispatch = useDispatch();

  const user = useSelector<IState, IUser>(state => state.user);

  const navigation = useNavigation();

  const handleContinue = useCallback(() => {
    const currentDate = endOfDay(new Date());

    const formattedDate = birthDate.split('/').reverse().join('-');

    if (!isValid(new Date(formattedDate)) || formattedDate.length < 10) {
      Alert.alert('Error', 'Invalid Date');
      return;
    }

    if (differenceInYears(currentDate, new Date(formattedDate)) < 18) {
      Alert.alert('Error', 'You are under age');
      return;
    }

    dispatch(updateUser({ ...user, birthDate }));

    navigation.navigate('GenderScreen');
  }, [birthDate, navigation, dispatch, user]);

  return {
    birthDate,
    setBirthDate,
    handleContinue,
  };
}

export default useBirthDateScreen;
