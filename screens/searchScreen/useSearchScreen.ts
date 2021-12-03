import { useCallback, useState, useRef, useEffect } from 'react';

import { AxiosError, AxiosResponse } from 'axios';

//  services
import api from '../../services/api';

//  i18n
import { translate } from '../../i18n/src/locales';

//  redux
import { IUser } from '../../store/modules/user/types';
import { showToast } from '../../services/toast';

interface ReturnType {
  users: IUser[];
  // eslint-disable-next-line no-unused-vars
  debounceSearchUsers: (text: string) => void;
  isLoading: boolean;
  isSearchStarted: boolean;
}

export function useSearchScreen(): ReturnType {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSearchStarted, setIsSearchStarted] = useState(false);

  const isMounted = useRef<boolean | null>(null);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const searchUsers = useCallback(async (text: string) => {
    try {
      if (!text) return;

      setIsLoading(true);

      setIsSearchStarted(true);

      const parsedText = text.replace(/\s/g, '+');

      const response: AxiosResponse<IUser[]> = await api.get(
        `users/search-user?query=${parsedText}`,
      );

      isMounted.current && setIsLoading(false);

      isMounted.current && setUsers(response.data);
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 401) {
        return;
      }

      showToast({
        message: translate('searchToastError'),
      });

      isMounted.current && setIsLoading(false);
    }
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
    isLoading,
    isSearchStarted,
  };
}
