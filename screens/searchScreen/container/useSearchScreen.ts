import { useCallback, useState } from 'react';

import { AxiosResponse } from 'axios';

//  services
import api from '../../../services/api';

//  redux
import { IUser } from '../../../store/modules/user/types';

interface ReturnType {
  users: IUser[];
  // eslint-disable-next-line no-unused-vars
  debounceSearchUsers: (text: string) => void;
}

export function useSearchScreen(): ReturnType {
  const [users, setUsers] = useState<IUser[]>([]);

  const searchUsers = useCallback(async (text: string) => {
    if (!text) return;

    const parsedText = text.replace(/\s/g, '+');

    const response: AxiosResponse<IUser[]> = await api.get(
      `users/search-user?query=${parsedText}`,
    );

    setUsers(response.data);
  }, []);

  const debounce = useCallback(
    (timeout = 500) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let timer: any;
      return (text: string) => {
        clearTimeout(timer);

        timer = setTimeout(() => searchUsers(text), timeout);
      };
    },
    [searchUsers],
  );

  const debounceSearchUsers = debounce();

  return {
    users,
    debounceSearchUsers,
  };
}
