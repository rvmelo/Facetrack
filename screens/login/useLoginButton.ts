import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../store/modules/user/actions';

interface ReturnValue {
  handleAuthentication(): void;
}

function useLoginButton(): ReturnValue {
  const dispatch = useDispatch();

  const handleAuthentication = useCallback(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  return {
    handleAuthentication,
  };
}

export default useLoginButton;
