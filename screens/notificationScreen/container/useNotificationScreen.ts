import { useState, useCallback, useEffect } from 'react';
import { AxiosResponse } from 'axios';

//  services
import { Alert } from 'react-native';
import api from '../../../services/api';

interface UserData {
  avatar: string;
  name: string;
  userProviderId: string;
  instagram: {
    userName: string;
  };
}

export interface EvaluationData {
  _id: string;
  updated_at: string;
  fromUserId: UserData;
  value: number;
}

interface NotificationData {
  foundEvaluations: EvaluationData[];
}

interface ReturnValue {
  notifications: EvaluationData[];
  isRefreshing: boolean;
  onRefresh: () => Promise<void>;
}

export function useNotificationScreen(): ReturnValue {
  const [notifications, setNotifications] = useState<EvaluationData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);

      const response: AxiosResponse<NotificationData> = await api.get(
        `/evaluation`,
      );

      setNotifications(response?.data?.foundEvaluations);

      setIsRefreshing(false);
    } catch (err) {
      setIsRefreshing(false);
      Alert.alert('Failed on updating notifications');
    }
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return {
    notifications,
    isRefreshing,
    onRefresh,
  };
}
