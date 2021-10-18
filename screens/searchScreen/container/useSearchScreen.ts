import { useCallback, useState } from 'react';

import { AxiosResponse } from 'axios';

//  services
import api from '../../../services/api';

//  redux
import { IUser } from '../../../store/modules/user/types';

interface ReturnType {
  users: IUser[];
  // eslint-disable-next-line no-unused-vars
  searchUsers: (text: string) => void;
}

export function useSearchScreen(): ReturnType {
  const [users, setUsers] = useState<IUser[]>([]);

  const searchUsers = useCallback(async (text: string) => {
    const parsedText = text.replace(/\s/g, '+');

    const response: AxiosResponse<IUser[]> = await api.get(
      `users/search-user?query=${parsedText}`,
    );

    setUsers(response.data);

    // const parsedData = response.data.map(user => ({
    //   ...user,
    //   instagram: '',
    // }));

    // console.log(parsedData);
  }, []);

  return {
    users,
    searchUsers,
  };
}
