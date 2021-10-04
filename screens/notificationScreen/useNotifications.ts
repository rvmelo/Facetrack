import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';

import { AxiosResponse } from 'axios';

//  services
import api from '../../services/api';

interface UserData {
  avatar: string;
  name: string;
  userProviderId: string;
  instagram: {
    userName: string;
  };
}

export interface NotificationData {
  _id: string;
  updated_at: string;
  fromUserId: UserData;
  value: number;
  isRead?: boolean;
}

interface NotificationResponse {
  foundEvaluations: NotificationData[];
}

interface ReturnType {
  notifications: NotificationData[];
  isRefreshing: boolean;
  onRefresh: () => Promise<void>;
  onListEnd: () => Promise<void>;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setOnMomentumScrollBegin: (value: boolean) => void;
}

export function useNotifications(): ReturnType {
  const [onMomentumScrollBegin, setOnMomentumScrollBegin] = useState(false);

  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);

      const response: AxiosResponse<NotificationResponse> = await api.get(
        `/evaluation?page=1`,
      );

      setPage(1);

      setNotifications(response?.data?.foundEvaluations);

      setIsRefreshing(false);
    } catch (err) {
      setIsRefreshing(false);
      Alert.alert('Failed on updating notifications');
    }
  }, []);

  const onListEnd = useCallback(async () => {
    try {
      if (isLoading || !onMomentumScrollBegin) return;

      setIsLoading(true);

      const response: AxiosResponse<NotificationResponse> = await api.get(
        `/evaluation?page=${page + 1}`,
      );

      setIsLoading(false);

      setPage(prev => prev + 1);

      setNotifications(prev => [...prev, ...response?.data?.foundEvaluations]);

      setOnMomentumScrollBegin(false);
    } catch (err) {
      setIsLoading(false);
      setOnMomentumScrollBegin(false);
      Alert.alert('Failed on updating notifications');
    }
  }, [page, isLoading, onMomentumScrollBegin]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return {
    isRefreshing,
    notifications,
    onRefresh,
    onListEnd,
    isLoading,
    setOnMomentumScrollBegin,
  };
}
