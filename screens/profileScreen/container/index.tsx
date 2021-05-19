import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// navigation
import { useNavigation } from '@react-navigation/native';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import {
  IUser,
  MEDIA_TYPES,
  UserMedia,
} from '../../../store/modules/user/types';

// components
import { VideoItem, PhotoItem } from './items';

// constants
import Colors from '../../../constants/colors';
import { base_url } from '../../../constants/backend';

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

  const navigation = useNavigation();

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
        <UserAvatar
          source={{
            uri: `${base_url}/files/${user?.avatar}`,
          }}
        />
        <StyledName>{user?.name}</StyledName>
        <Instagram>@{user?.instagram?.userName}</Instagram>
        <StyledEditButton onPress={() => navigation.navigate('EditProfile')}>
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
