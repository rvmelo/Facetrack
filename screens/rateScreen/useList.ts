/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
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

  const handleUsersRequest = useCallback(async () => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<IUser[]> = await api.get(`/users`);

      const auxList = response.data.map((data: IUser) => {
        return {
          data,
        };
      });

      setListItem(auxList);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Alert.alert('Error', `Error on loading users:  ${err.message}`);
      setIsLoading(false);
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
