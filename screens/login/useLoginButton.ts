import { useCallback, useEffect } from 'react';

import * as Linking from 'expo-linking';

//  redux
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../../store/modules/user/actions';

//  constants
import { base_url } from '../../constants/backend';

interface ReturnValue {
  handleFacebookLogin(): void;
  handleGoogleLogin(): void;
}

function useLoginButton(): ReturnValue {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleFacebookLogin = useCallback(() => {
    Linking.openURL(`${base_url}/sessions/auth/facebook`);
  }, []);

  const handleGoogleLogin = useCallback(() => {
    Linking.openURL(`${base_url}/sessions/auth/google`);
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      const { authData } = Linking.parse(url).queryParams || {};

      if (authData) {
        const { notRegisteredUser, token } = JSON.parse(authData);

        if (notRegisteredUser && token) {
          navigation.navigate('BirthDateScreen');
          dispatch(
            updateUser({
              ...notRegisteredUser,
            }),
          );
        }
      }
    });
  }, [dispatch, navigation]);

  return {
    handleFacebookLogin,
    handleGoogleLogin,
  };
}

export default useLoginButton;
