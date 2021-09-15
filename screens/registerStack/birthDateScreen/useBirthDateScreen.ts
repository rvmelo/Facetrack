/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from 'react';
import { isValid, differenceInYears, endOfDay, getYear } from 'date-fns';
import { Alert } from 'react-native';

//  navigation
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegisterStackParamList } from '../../../routes/types';

// redux
import { IUser } from '../../../store/modules/user/types';

// i18n
import { translate, location } from '../../../i18n/src/locales';

interface ReturnValue {
  birthDate: string;
  setBirthDate(date: string): void;
  handleContinue(): void;
}

type NavigationProps = StackNavigationProp<
  RegisterStackParamList,
  'BirthDateScreen'
>;

function useBirthDateScreen(): ReturnValue {
  const [birthDate, setBirthDate] = useState('');

  const navigation = useNavigation<NavigationProps>();

  const { params } = useRoute();

  const user = params as IUser;

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

    navigation.navigate('GenderScreen', {
      ...user,
      birthDate: formattedDate,
    });
  }, [birthDate, navigation, user]);

  return {
    birthDate,
    setBirthDate,
    handleContinue,
  };
}

export default useBirthDateScreen;
