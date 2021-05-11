import React from 'react';

import { Video } from 'expo-av';

//  navigation
import { useNavigation } from '@react-navigation/native';

import { TouchableInterface, UserPhoto, VideoContainer } from './styles';

interface ItemProps {
  media_url: string;
  caption: string;
  instagram: string;
}

export const PhotoItem: React.FC<ItemProps> = ({
  media_url,
  caption,
  instagram,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableInterface
      onPress={() =>
        navigation.navigate('Publication', { media_url, caption, instagram })
      }
    >
      <UserPhoto source={{ uri: media_url }} />
    </TouchableInterface>
  );
};

export const VideoItem: React.FC<ItemProps> = ({
  media_url,
  caption,
  instagram,
}) => {
  const navigation = useNavigation();

  const videoRef = React.createRef<Video>();

  return (
    <TouchableInterface
      onPress={() =>
        navigation.navigate('Publication', { media_url, caption, instagram })
      }
    >
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
