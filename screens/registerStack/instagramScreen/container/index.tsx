import React, { useEffect, memo } from 'react';
import { Alert } from 'react-native';

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

//  redux
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../../../store';
import { IUser } from '../../../../store/modules/user/types';

//  constants
import { base_url, instagram_client_id } from '../../../../constants/backend';

//  styles
import { Container } from './styles';

//  components
import InstagramButton from './instagramButton';

//  apis
import api from '../../../../services/api';

const InstagramScreen: React.FC = () => {
  const user = useSelector<IState, IUser>(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    Linking.addEventListener('url', async ({ url }) => {
      try {
        const { code } = Linking.parse(url).queryParams || {};

        const response = await api.get(
          `/sessions/auth/instagram/profile?code=${code}`,
        );

        const { userName, userMedia } = response.data;

        await api.post('/users', {
          ...user,
          instagram: {
            userName,
            userMedia,
          },
        });
      } catch (err) {
        Alert.alert('Error', 'Failed to create user');
      }
    });
  }, [dispatch, user]);

  return (
    <Container>
      <InstagramButton
        onPress={() => {
          WebBrowser.openBrowserAsync(
            `https://api.instagram.com/oauth/authorize?client_id=${instagram_client_id}&redirect_uri=${`${base_url}/sessions/auth/instagram/callback`}&scope=user_profile,user_media&response_type=code`,
          );
        }}
      />
    </Container>
  );
};

export default memo(InstagramScreen);
