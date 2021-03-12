import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import * as Linking from 'expo-linking';

import { base_url } from '../../constants/backend';

import { authenticateUser } from '../../store/modules/user/actions';

interface ReturnValue {
  handleAuthentication(): void;
  handleFacebookLogin(): void;
  handleGoogleLogin(): void;
}

function useLoginButton(): ReturnValue {
  const dispatch = useDispatch();

  const navigation = useNavigation();

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
      const { userData } = Linking.parse(url).queryParams || {};

      if (userData) {
        const { notRegisteredUser, token } = JSON.parse(userData);

        if (notRegisteredUser && token) {
          navigation.navigate('RegisterStack', {
            user: notRegisteredUser,
            token,
          });
        }
      }
    });
  }, [navigation]);

  return {
    handleAuthentication,
    handleFacebookLogin,
    handleGoogleLogin,
  };
}

export default useLoginButton;
