/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from 'react';
import { isValid, differenceInYears, endOfDay, getYear } from 'date-fns';
import { Alert } from 'react-native';

//  navigation
import { useNavigation } from '@react-navigation/native';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/modules/user/actions';
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

// i18n
import { translate, location } from '../../../i18n/src/locales';

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

  useEffect(() => {
    navigation.addListener('beforeRemove', e => e.preventDefault());
  }, [navigation]);

  const handleContinue = useCallback(() => {
    const currentDate = endOfDay(new Date());

    let formattedDate;

    formattedDate = birthDate.split('/').reverse().join('-');

    if (location === 'en-US') {
      const dateArray = birthDate.split('/');

      const month = dateArray[0];
      const day = dateArray[1];
      const year = dateArray[2];

      formattedDate = [year, month, day].join('-');
    }

    if (!isValid(new Date(formattedDate)) || formattedDate.length < 10) {
      Alert.alert('Error', translate('invalidDateError'));
      return;
    }

    if (getYear(new Date(formattedDate)) > getYear(currentDate)) {
      Alert.alert('Error', translate('timeTravelerError'));
      return;
    }

    if (differenceInYears(currentDate, new Date(formattedDate)) < 18) {
      Alert.alert('Error', translate('underAgeError'));
      return;
    }

    dispatch(updateUser({ ...user, birthDate: new Date(formattedDate) }));

    navigation.navigate('GenderScreen');
  }, [birthDate, navigation, dispatch, user]);

  return {
    birthDate,
    setBirthDate,
    handleContinue,
  };
}

export default useBirthDateScreen;
