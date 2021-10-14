/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';

import api from '../../services/api';
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Alert.alert('Error', `Error on loading users:  ${err.message}`);
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
