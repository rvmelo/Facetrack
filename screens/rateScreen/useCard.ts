import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { EvaluationStackParamList } from '../../routes/types';
import api from '../../services/api';
import { showToast } from '../../services/toast';
import { IUser } from '../../store/modules/user/types';

//  i18n
import { translate } from '../../i18n/src/locales';

type NavigationProps = StackNavigationProp<
  EvaluationStackParamList,
  'RateScreen'
>;

interface ReturnValue {
  // eslint-disable-next-line no-unused-vars
  handleProfileView: (userProviderId: string) => void;
}

export function useCard(): ReturnValue {
  const navigation = useNavigation<NavigationProps>();

  const handleProfileView = useCallback(
    async (userProviderId: string) => {
      try {
        const userData: AxiosResponse<IUser> = await api.get(
          `users/${userProviderId}`,
        );

        navigation.navigate('RandomUserScreen', { user: { ...userData.data } });
      } catch (err) {
        showToast({
          message: translate('userLoadingProfileError'),
        });
      }
    },
    [navigation],
  );

  return {
    handleProfileView,
  };
}
