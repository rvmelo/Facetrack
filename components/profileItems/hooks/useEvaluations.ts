import { useEffect, useState, useCallback, useRef } from 'react';

import { AxiosResponse } from 'axios';

//  services
import api from '../../../services/api';
import { showToast } from '../../../services/toast';

//  i18n
import { translate } from '../../../i18n/src/locales';

interface IRequest {
  userProviderId: string;
}

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
  isRead?: boolean;
}

interface EvaluationResponse {
  foundEvaluations: EvaluationData[];
}

interface ReturnType {
  evaluations: EvaluationData[];
  isRefreshing: boolean;
  onRefresh: () => Promise<void>;
  onListEnd: () => Promise<void>;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setOnMomentumScrollBegin: (value: boolean) => void;
}

export function useEvaluations({ userProviderId }: IRequest): ReturnType {
  const [onMomentumScrollBegin, setOnMomentumScrollBegin] = useState(false);

  const [evaluations, setNotifications] = useState<EvaluationData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

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

      const response: AxiosResponse<EvaluationResponse> = await api.get(
        `/evaluation/received/${userProviderId}?page=1`,
      );

      isMounted.current && setPage(1);

      isMounted.current && setNotifications(response?.data?.foundEvaluations);

      setIsRefreshing(false);
    } catch (err) {
      isMounted.current && setIsRefreshing(false);
      showToast({ message: translate('loadNotificationError') });
    }
  }, [userProviderId]);

  const onListEnd = useCallback(async () => {
    try {
      if (isLoading || !onMomentumScrollBegin) return;

      setIsLoading(true);

      const response: AxiosResponse<EvaluationResponse> = await api.get(
        `/evaluation/received/${userProviderId}?page=${page + 1}`,
      );

      isMounted.current && setIsLoading(false);

      isMounted.current && setPage(prev => prev + 1);

      isMounted.current &&
        setNotifications(prev => [
          ...prev,
          ...response?.data?.foundEvaluations,
        ]);

      isMounted.current && setOnMomentumScrollBegin(false);
    } catch (err) {
      isMounted.current && setIsLoading(false);
      isMounted.current && setOnMomentumScrollBegin(false);
      showToast({ message: translate('loadNotificationError') });
    }
  }, [page, isLoading, onMomentumScrollBegin, userProviderId]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return {
    isRefreshing,
    evaluations,
    onRefresh,
    onListEnd,
    isLoading,
    setOnMomentumScrollBegin,
  };
}
