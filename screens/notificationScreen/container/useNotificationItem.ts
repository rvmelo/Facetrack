import { useState, useCallback } from 'react';

import { AxiosResponse } from 'axios';

// navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { NotificationStackParamList } from '../../../routes/types';

import api from '../../../services/api';
import { IUser } from '../../../store/modules/user/types';

//   navigation

type NavigationProps = StackNavigationProp<
  NotificationStackParamList,
  'NotificationScreen'
>;

interface UseItemProps {
  userProviderId: string;
  evaluationId: string;
  isNotificationRead: boolean | undefined;
}

interface ReturnType {
  handleItemPress: () => Promise<void>;
  isRead: boolean | undefined;
}

export function useNotificationItem({
  userProviderId,
  evaluationId,
  isNotificationRead,
}: UseItemProps): ReturnType {
  const navigation = useNavigation<NavigationProps>();

  const [isRead, setIsRead] = useState<boolean | undefined>(isNotificationRead);

  const handleItemPress = useCallback(async () => {
    try {
      const userData: AxiosResponse<IUser> = await api.get(
        `users/${userProviderId}`,
      );

      navigation.navigate('NotificationUserScreen', {
        user: { ...userData.data },
      });

      if (isRead) return;

      setIsRead(true);

      await api.patch(`/evaluation/update/${evaluationId}`);
    } catch (err) {
      setIsRead(false);
    }
  }, [navigation, userProviderId, evaluationId, isRead]);

  return {
    handleItemPress,
    isRead,
  };
}
