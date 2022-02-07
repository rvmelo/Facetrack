import React, { useState } from 'react';
import { Image } from 'react-native';
import { Video } from 'expo-av';

import { TouchableInterface, UserPhoto, VideoContainer } from './styles';

type ItemProps = {
  media_url: string;
  onPress: () => void;
};

export const PhotoItem: React.FC<ItemProps> = ({ media_url, onPress }) => {
  const [isUrlExpired, setIsUrlExpired] = useState(false);

  Image.getSize(
    media_url,
    () => setIsUrlExpired(false),
    () => setIsUrlExpired(true),
  );

  return (
    <TouchableInterface onPress={!isUrlExpired ? onPress : () => undefined}>
      <UserPhoto
        source={
          !isUrlExpired
            ? { uri: media_url }
            : require('../../assets/instagram.png')
        }
      />
    </TouchableInterface>
  );
};

export const VideoItem: React.FC<ItemProps> = ({ media_url, onPress }) => {
  const videoRef = React.createRef<Video>();

  const [isUrlExpired, setIsUrlExpired] = useState(false);

  return !isUrlExpired ? (
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
          onError={() => setIsUrlExpired(true)}
          isLooping
        />
      </VideoContainer>
    </TouchableInterface>
  ) : (
    <TouchableInterface onPress={() => undefined}>
      <UserPhoto source={require('../../assets/instagram.png')} />
    </TouchableInterface>
  );
};
