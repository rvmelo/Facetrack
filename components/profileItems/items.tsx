import React from 'react';
import { Video } from 'expo-av';

import { TouchableInterface, UserPhoto, VideoContainer } from './styles';

type ItemProps = {
  media_url: string;
  onPress: () => void;
};

export const PhotoItem: React.FC<ItemProps> = ({ media_url, onPress }) => {
  return (
    <TouchableInterface onPress={onPress}>
      <UserPhoto source={{ uri: media_url }} />
    </TouchableInterface>
  );
};

export const VideoItem: React.FC<ItemProps> = ({ media_url, onPress }) => {
  const videoRef = React.createRef<Video>();

  return (
    <TouchableInterface onPress={onPress}>
      <VideoContainer>
        <Video
          ref={videoRef}
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: media_url,
          }}
          isMuted
          onLoad={() => videoRef?.current?.playAsync()}
          resizeMode="contain"
          isLooping
        />
      </VideoContainer>
    </TouchableInterface>
  );
};
