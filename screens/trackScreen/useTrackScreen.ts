import { useState, useCallback, useRef, useEffect } from 'react';

import { AxiosError, AxiosResponse } from 'axios';

import api from '../../services/api';
import { IUser } from '../../store/modules/user/types';
import { showToast } from '../../services/toast';

interface ReturnType {
  users: IUser[];
  // eslint-disable-next-line no-unused-vars
  setUsers: (users: IUser[]) => void;
  isVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsVisible: (isVisible: boolean) => void;
  distance: number;
  // eslint-disable-next-line no-unused-vars
  setDistance: (distance: number) => void;
  isLoading: boolean;
  isRefreshing: boolean;
  // eslint-disable-next-line no-unused-vars
  setOnMomentumScrollBegin: (onMomentumScrollBegin: boolean) => void;
  onRefresh: () => Promise<void>;
  onListEnd: () => Promise<void>;
}

export function useTrackScreen(): ReturnType {
  const [users, setUsers] = useState<IUser[]>([]);

  const [distance, setDistance] = useState(100);

  const [isVisible, setIsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [onMomentumScrollBegin, setOnMomentumScrollBegin] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const isMounted = useRef<boolean | null>(null);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);

      if (!isVisible) return;

      const response: AxiosResponse<IUser[]> = await api.get(
        `users/track-user?distance=${distance}&page=1`,
      );

      isMounted.current && setPage(1);

      isMounted.current && setUsers([...response.data]);

      setIsRefreshing(false);
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 401) {
        return;
      }

      isMounted.current && setIsRefreshing(false);
      showToast({ message: 'Failed on tracking users' });
    }
  }, [distance, isVisible]);

  const onListEnd = useCallback(async () => {
    try {
      if (isLoading || !onMomentumScrollBegin) return;

      setIsLoading(true);

      const response: AxiosResponse<IUser[]> = await api.get(
        `users/track-user?distance=${distance}&page=${page + 1}`,
      );

      isMounted.current && setIsLoading(false);

      isMounted.current && setPage(prev => prev + 1);

      isMounted.current && setUsers(prev => [...prev, ...response?.data]);

      isMounted.current && setOnMomentumScrollBegin(false);
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 401) {
        return;
      }

      isMounted.current && setIsLoading(false);
      isMounted.current && setOnMomentumScrollBegin(false);
      showToast({ message: 'Failed on tracking users' });
    }
  }, [page, isLoading, onMomentumScrollBegin, distance]);

  return {
    users,
    setUsers,
    isVisible,
    setIsVisible,
    distance,
    setDistance,
    isLoading,
    isRefreshing,
    setOnMomentumScrollBegin,
    onRefresh,
    onListEnd,
  };
}
