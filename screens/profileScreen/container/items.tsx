import React from 'react';

import { Video } from 'expo-av';

//  navigation
import { useNavigation } from '@react-navigation/native';

import { TouchableInterface, UserPhoto, VideoContainer } from './styles';

interface ItemProps {
  media_url: string;
}

export const PhotoItem: React.FC<ItemProps> = ({ media_url }) => {
  const navigation = useNavigation();

  return (
    <TouchableInterface onPress={() => navigation.navigate('UserPublications')}>
      <UserPhoto source={{ uri: media_url }} />
    </TouchableInterface>
  );
};

export const VideoItem: React.FC<ItemProps> = ({ media_url }) => {
  const navigation = useNavigation();

  const videoRef = React.createRef<Video>();

  return (
    <TouchableInterface onPress={() => navigation.navigate('UserPublications')}>
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
