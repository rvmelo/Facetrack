import React from 'react';

import { Video } from 'expo-av';

//  navigation
import { useNavigation } from '@react-navigation/native';

import { TouchableInterface, UserPhoto, VideoContainer } from './styles';
import { MEDIA_TYPES } from '../../../store/modules/user/types';

interface ItemProps {
  media_url: string;
  caption: string;
  date: string;
}

export const PhotoItem: React.FC<ItemProps> = ({
  media_url,
  caption,
  date,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableInterface
      onPress={() =>
        navigation.navigate('Publication', {
          media_url,
          media_type: MEDIA_TYPES.image,
          caption,
          date,
        })
      }
    >
      <UserPhoto source={{ uri: media_url }} />
    </TouchableInterface>
  );
};

export const VideoItem: React.FC<ItemProps> = ({
  media_url,
  caption,
  date,
}) => {
  const navigation = useNavigation();

  const videoRef = React.createRef<Video>();

  return (
    <TouchableInterface
      onPress={() =>
        navigation.navigate('Publication', {
          media_url,
          media_type: MEDIA_TYPES.video,
          caption,
          date,
        })
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
