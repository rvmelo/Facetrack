import { AxiosResponse } from 'axios';
import { useCallback } from 'react';

// navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { NotificationStackParamList } from '../../../routes/types';

import api from '../../../services/api';
import { IUser } from '../../../store/modules/user/types';

//   navigation

interface UseItemProps {
  userProviderId: string;
}

type NavigationProps = StackNavigationProp<
  NotificationStackParamList,
  'NotificationScreen'
>;

interface ReturnType {
  handleItemPress: () => Promise<void>;
}

export function useItem({ userProviderId }: UseItemProps): ReturnType {
  const navigation = useNavigation<NavigationProps>();

  const handleItemPress = useCallback(async () => {
    const userData: AxiosResponse<IUser> = await api.get(
      `users/${userProviderId}`,
    );

    navigation.navigate('NotificationUserScreen', {
      user: { ...userData.data },
    });
  }, [navigation, userProviderId]);

  return {
    handleItemPress,
  };
}
