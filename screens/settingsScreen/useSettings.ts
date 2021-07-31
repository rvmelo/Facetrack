import { useCallback, useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';

//  i18n
import { translate } from '../../i18n/src/locales';

//  hooks
import useAuth from '../../hooks/useAuth';

//  services
import api from '../../services/api';

interface ReturnType {
  handleUserDeletion(): Promise<void>;
  isLoading: boolean;
}

function useSettings(): ReturnType {
  const { signOut } = useAuth();

  const isMounted = useRef<boolean | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleUserDeletion = useCallback(async () => {
    try {
      setIsLoading(true);
      await api.delete('/users');
      isMounted.current && setIsLoading(false);

      // remove instagram last request date key from storage
      // remove instagram token key from storage

      signOut();
    } catch (err) {
      isMounted.current && setIsLoading(false);
      Alert.alert('Error', `${translate('userDeletionError')}: ${err.message}`);
    }
  }, [signOut]);

  return {
    handleUserDeletion,
    isLoading,
  };
}

export default useSettings;
