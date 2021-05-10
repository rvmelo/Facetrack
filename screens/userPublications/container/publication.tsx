import React, { memo } from 'react';
import { Video } from 'expo-av';

import {
  PublicationContainer,
  Header,
  UserAvatar,
  Instagram,
  UserPhoto,
  Description,
} from './styles';

interface PhotoDimensions {
  width: number;
  height: number;
}

interface PublicationProps {
  caption: string;
  media_url: string;
  dimensions: PhotoDimensions;
  userInstagram: string;
}

const Publication: React.FC<PublicationProps> = ({
  caption,
  dimensions,
  media_url,
  userInstagram,
}) => {
  return (
    <PublicationContainer>
      <Header>
        <UserAvatar
          source={{
            uri:
              'https://img.ibxk.com.br//2020/05/28/28135510637179.jpg?w=1200&h=675&mode=crop&scale=both',
          }}
        />
        <Instagram>@{userInstagram}</Instagram>
      </Header>
      {media_url.includes('video.cdninstagram.com') ? (
        <Video
          style={{ width: '100%', height: 300 }}
          source={{
            uri: media_url,
          }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      ) : (
        <UserPhoto source={{ uri: media_url }} height={dimensions.height} />
      )}
      <Description>{caption}</Description>
    </PublicationContainer>
  );
};

export default memo(Publication);
