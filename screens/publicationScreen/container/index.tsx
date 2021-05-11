import React, { memo } from 'react';
import { Video } from 'expo-av';

//  navigation
import { useRoute } from '@react-navigation/native';

import {
  PublicationContainer,
  Header,
  HeaderTextContainer,
  UserAvatar,
  StyledName,
  Instagram,
  UserPhoto,
  Description,
} from './styles';

//   hooks
import usePublication from '../usePublication';
import { SCREEN_WIDTH } from '../../../constants/dimensions';

interface RouteParams {
  caption: string;
  media_url: string;
  instagram: string;
}

const PublicationScreen: React.FC = () => {
  const { params } = useRoute();

  const { caption, media_url, instagram } = params as RouteParams;

  const { imgHeight } = usePublication({ media_url });

  return (
    <PublicationContainer>
      <Header>
        <UserAvatar
          source={{
            uri:
              'https://img.ibxk.com.br//2020/05/28/28135510637179.jpg?w=1200&h=675&mode=crop&scale=both',
          }}
        />
        <HeaderTextContainer>
          <StyledName>Roberto Melo</StyledName>
          <Instagram>@{instagram}</Instagram>
        </HeaderTextContainer>
      </Header>
      {media_url.includes('video.cdninstagram.com') ? (
        <Video
          style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
          source={{
            uri: media_url,
          }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      ) : (
        <UserPhoto source={{ uri: media_url }} height={imgHeight} />
      )}

      <Description>{caption}</Description>
    </PublicationContainer>
  );
};

export default memo(PublicationScreen);
