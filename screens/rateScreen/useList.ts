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
  // eslint-disable-next-line no-unused-vars
  setPage(page: number): void;
  isLoading: boolean;
  handleUsersRequest(): Promise<void>;
}

export function useList(): ReturnType {
  const [listItems, setListItem] = useState<ItemData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsersRequest = useCallback(async () => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<IUser[]> = await api.get(
        `/users?page=${page}`,
      );

      const auxList = response.data.map((data: IUser) => {
        return {
          data,
        };
      });
      setListItem(auxList);
      setIsLoading(false);
    } catch (err) {
      Alert.alert('Error', `Error on loading users: ${err.message}`);
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    handleUsersRequest();
  }, [handleUsersRequest]);

  return {
    listItems,
    setPage,
    isLoading,
    handleUsersRequest,
  };
}
