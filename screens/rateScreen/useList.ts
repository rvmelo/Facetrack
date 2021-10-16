/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse, AxiosError } from 'axios';
import { useCallback, useEffect, useState, useRef } from 'react';

import api from '../../services/api';
import { showToast } from '../../services/toast';
import { IUser } from '../../store/modules/user/types';

export interface ItemData {
  data: IUser;
}

interface ReturnType {
  listItems: ItemData[];
  isLoading: boolean;
  handleUsersRequest(): Promise<void>;
}

export function useList(): ReturnType {
  const [listItems, setListItem] = useState<ItemData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMounted = useRef<boolean | null>(null);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleUsersRequest = useCallback(async () => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<IUser[]> = await api.get(`/users`);

      const auxList = response.data.map((data: IUser) => {
        return {
          data,
        };
      });

      isMounted.current && setListItem(auxList);
      isMounted.current && setIsLoading(false);
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 401) {
        return;
      }

      showToast({ message: 'Error on loading users' });
      isMounted.current && setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleUsersRequest();
  }, [handleUsersRequest]);

  return {
    listItems,
    isLoading,
    handleUsersRequest,
  };
}
