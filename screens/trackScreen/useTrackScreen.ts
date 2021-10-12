import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import { IUser } from '../../store/modules/user/types';

export interface TrackedUser {
  id: number;
  url: string;
}

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
  onUserTracking: () => void;
}

export function useTrackScreen(): ReturnType {
  const [users, setUsers] = useState<IUser[]>([]);

  const [distance, setDistance] = useState(100);

  const [isVisible, setIsVisible] = useState(false);

  const onUserTracking = useCallback(async () => {
    const response: AxiosResponse<IUser[]> = await api.get(
      `users/track-user?distance=${distance}`,
    );

    if (!response?.data) return;

    setUsers([...response.data]);

    setIsVisible(true);
  }, [distance]);

  return {
    users,
    setUsers,
    isVisible,
    setIsVisible,
    distance,
    setDistance,
    onUserTracking,
  };
}
