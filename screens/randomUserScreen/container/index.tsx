import React, { memo, useCallback } from 'react';
import { ListRenderItem } from 'react-native';

// navigation
import { useRoute } from '@react-navigation/native';

import {
  IUser,
  MEDIA_TYPES,
  UserMedia,
} from '../../../store/modules/user/types';

// components
import Avatar from '../../../components/avatar/index';
import { VideoItem, PhotoItem } from '../../../components/profileItems/items';
import PhotoScroll from '../../../components/profileItems/photoScroll';

import {
  Container,
  ProfileDataContainer,
  StyledName,
  StyledText,
} from './styles';
import { ProfileButton } from '../../../components/profileItems/profileButton';

interface RouteParams {
  user: IUser;
}

export const RandomUserScreen: React.FC = memo(() => {
  const { params } = useRoute();

  const { user } = params as RouteParams;

  const userMedia = user?.instagram?.userMedia;

  const renderItem: ListRenderItem<UserMedia> = useCallback(({ item }) => {
    return item.media_type === MEDIA_TYPES.video ? (
      <VideoItem
        media_url={item.media_url}
        caption={item.caption}
        date={item.timestamp}
      />
    ) : (
      <PhotoItem
        media_url={item.media_url}
        caption={item.caption}
        date={item.timestamp}
      />
    );
  }, []);

  return (
    <Container>
      <ProfileDataContainer>
        <Avatar avatar={user?.avatar} />
        <StyledName>{user?.name}</StyledName>
        <StyledText>@{user?.instagram?.userName}</StyledText>
        <StyledText>{user?.sexualOrientation}</StyledText>
        <StyledText>{user?.relationshipStatus}</StyledText>
        {/* <StyledText>{user?.birthDate}</StyledText> */}
        <ProfileButton onPress={() => undefined} text="Rate" />
      </ProfileDataContainer>

      <PhotoScroll userMedia={userMedia} renderItem={renderItem} />
    </Container>
  );
});
