import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import { IUser, UserMedia } from '../../../store/modules/user/types';

// components
import { VideoItem, PhotoItem } from './items';

// constants
import Colors from '../../../constants/colors';

import {
  Container,
  ProfileDataContainer,
  StyledName,
  Instagram,
  StyledEditButton,
  EditButtonLayout,
  ButtonText,
  UserAvatar,
  PhotoContainerText,
  EmptyPhotoContainer,
} from './styles';

// i18n
import { translate } from '../../../i18n/src/locales';

const ProfileScreen: React.FC = () => {
  const user = useSelector<IState, IUser>(state => state.user);

  const userMedia = user?.instagram?.userMedia;

  const renderItem: ListRenderItem<UserMedia> = useCallback(
    ({ item }) => {
      return item.media_url.includes('video.cdninstagram.com') ? (
        <VideoItem
          media_url={item.media_url}
          caption={item.caption}
          instagram={user?.instagram?.userName || 'undefined'}
        />
      ) : (
        <PhotoItem
          media_url={item.media_url}
          caption={item.caption}
          instagram={user?.instagram?.userName || 'undefined'}
        />
      );
    },
    [user?.instagram?.userName],
  );

  return (
    <Container>
      <ProfileDataContainer>
        <UserAvatar
          source={{
            uri:
              'https://img.ibxk.com.br//2020/05/28/28135510637179.jpg?w=1200&h=675&mode=crop&scale=both',
          }}
        />
        <StyledName>{user?.name}</StyledName>
        <Instagram>@{user?.instagram?.userName}</Instagram>
        <StyledEditButton onPress={() => console.log('pressed')}>
          <EditButtonLayout>
            <ButtonText>{translate('editProfile')}</ButtonText>
          </EditButtonLayout>
        </StyledEditButton>
      </ProfileDataContainer>

      {Array.isArray(userMedia) && userMedia.length !== 0 ? (
        <FlatList
          data={Array.isArray(userMedia) ? userMedia : []}
          renderItem={renderItem}
          keyExtractor={photo => photo.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyPhotoContainer>
          <Ionicons name="md-camera" size={40} color={Colors.accent} />
          <PhotoContainerText>
            {translate('photoDisplayMessage')}
          </PhotoContainerText>
        </EmptyPhotoContainer>
      )}
    </Container>
  );
};

export default memo(ProfileScreen);
