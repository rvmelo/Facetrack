import { useCallback, useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';

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

      signOut();
    } catch (err) {
      isMounted.current && setIsLoading(false);
      Alert.alert('Error', `Error on user deletion: ${err.message}`);
    }
  }, [signOut]);

  return {
    handleUserDeletion,
    isLoading,
  };
}

export default useSettings;
