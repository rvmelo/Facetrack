import React from 'react';

import { Video } from 'expo-av';

//  navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { TouchableInterface, UserPhoto, VideoContainer } from './styles';
import { media_types, MEDIA_TYPES } from '../../../store/modules/user/types';
import { ProfileStackParamList } from '../../../routes/types';

type ItemProps = {
  media_url: string;
  caption: string;
  date: string;
};

type NavigationProps = StackNavigationProp<
  ProfileStackParamList,
  'ProfileScreen'
>;

export const PhotoItem: React.FC<ItemProps> = ({
  media_url,
  caption,
  date,
}) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableInterface
      onPress={() =>
        navigation.navigate('Publication', {
          media_url,
          media_type: MEDIA_TYPES.image as media_types,
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
  const navigation = useNavigation<NavigationProps>();

  const videoRef = React.createRef<Video>();

  return (
    <TouchableInterface
      onPress={() =>
        navigation.navigate('Publication', {
          media_url,
          media_type: MEDIA_TYPES.video as media_types,
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
