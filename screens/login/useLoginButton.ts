import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Linking from 'expo-linking';
import { authenticateUser } from '../../store/modules/user/actions';
import { base_url } from '../../constants/backend';

interface ReturnValue {
  handleAuthentication(): void;
  handleFacebookLogin(): void;
  handleGoogleLogin(): void;
}

function useLoginButton(): ReturnValue {
  const dispatch = useDispatch();

  const handleAuthentication = useCallback(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  const handleFacebookLogin = useCallback(() => {
    Linking.openURL(`${base_url}/users/auth/facebook`);
  }, []);

  const handleGoogleLogin = useCallback(() => {
    Linking.openURL(`${base_url}/users/auth/google`);
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      const { queryParams } = Linking.parse(url);
      console.log('query params: ', queryParams);
    });
  }, []);

  return {
    handleAuthentication,
    handleFacebookLogin,
    handleGoogleLogin,
  };
}

export default useLoginButton;
