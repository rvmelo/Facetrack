import React from 'react';

import { Video } from 'expo-av';

//  navigation
import { useNavigation } from '@react-navigation/native';

//  redux
import { UserMedia } from '../../../store/modules/user/types';

import { TouchableInterface, UserPhoto, VideoContainer } from './styles';

interface ItemProps {
  userMedia: UserMedia[] | undefined;
  media_url: string;
}

export const PhotoItem: React.FC<ItemProps> = ({ userMedia, media_url }) => {
  const navigation = useNavigation();

  return (
    <TouchableInterface
      onPress={() =>
        navigation.navigate('UserPublications', { publications: userMedia })
      }
    >
      <UserPhoto source={{ uri: media_url }} />
    </TouchableInterface>
  );
};

export const VideoItem: React.FC<ItemProps> = ({ userMedia, media_url }) => {
  const navigation = useNavigation();

  const videoRef = React.createRef<Video>();

  return (
    <TouchableInterface
      onPress={() =>
        navigation.navigate('UserPublications', { publications: userMedia })
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
