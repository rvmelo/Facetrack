import { useCallback } from 'react';

import { AxiosResponse } from 'axios';

//  navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EvaluationStackParamList } from '../../routes/types';

//  redux
import { IUser } from '../../store/modules/user/types';

//  services
import api from '../../services/api';

type NavigationProps = StackNavigationProp<
  EvaluationStackParamList,
  'RateScreen'
>;

interface ReturnType {
  // eslint-disable-next-line no-unused-vars
  handleProfileView: (userProviderId: string) => Promise<void>;
}

export function useListItem(): ReturnType {
  const navigation = useNavigation<NavigationProps>();

  const handleProfileView = useCallback(
    async (userProviderId: string) => {
      const userData: AxiosResponse<IUser> = await api.get(
        `users/${userProviderId}`,
      );

      navigation.navigate('TrackedUserScreen', { user: { ...userData.data } });
    },
    [navigation],
  );

  return {
    handleProfileView,
  };
}
