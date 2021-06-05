import React, { memo, useCallback, useEffect } from 'react';
import { ListRenderItem, ActivityIndicator, Alert } from 'react-native';

// navigation
import { useNavigation } from '@react-navigation/native';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import {
  IUserState,
  MEDIA_TYPES,
  UserMedia,
} from '../../../store/modules/user/types';

// components
import { VideoItem, PhotoItem } from './items';
import Avatar from '../../../components/avatar/index';
import PhotoScroll from './photoScroll';

// hooks
import useInstagram from '../../../hooks/useInstagram';

// constants
import Colors from '../../../constants/colors';

import {
  Container,
  ProfileDataContainer,
  StyledName,
  StyledText,
  StyledEditButton,
  EditButtonLayout,
  ButtonText,
  EmptyPhotoContainer,
} from './styles';

// i18n
import { translate } from '../../../i18n/src/locales';

const ProfileScreen: React.FC = () => {
  const {
    user,
    isAvatarLoading,
    isUserUpdateFailure,
    isUserMediaLoading,
  } = useSelector<IState, IUserState>(state => state.user);

  const { handleInstagramRefresh, shouldRefreshInstagram } = useInstagram();

  const userMedia = user?.instagram?.userMedia;

  const navigation = useNavigation();

  useEffect(() => {
    isUserUpdateFailure && Alert.alert('Error', translate('userUpdateError'));
  }, [isUserUpdateFailure]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const shouldRefresh = await shouldRefreshInstagram();
      if (shouldRefresh) handleInstagramRefresh();
    });

    return unsubscribe;
  }, [handleInstagramRefresh, shouldRefreshInstagram, navigation]);

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
        {isAvatarLoading ? (
          <ActivityIndicator
            color={Colors.primary}
            size="large"
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
            }}
          />
        ) : (
          <Avatar avatar={user?.avatar} />
        )}
        <StyledName>{user?.name}</StyledName>
        <StyledText>@{user?.instagram?.userName}</StyledText>
        <StyledText>{user?.sexualOrientation}</StyledText>
        <StyledText>{user?.relationshipStatus}</StyledText>
        {/* <StyledText>{user?.birthDate}</StyledText> */}

        <StyledEditButton onPress={() => navigation.navigate('EditProfile')}>
          <EditButtonLayout>
            <ButtonText>{translate('editProfile')}</ButtonText>
          </EditButtonLayout>
        </StyledEditButton>
      </ProfileDataContainer>

      {isUserMediaLoading ? (
        <EmptyPhotoContainer>
          <ActivityIndicator
            color={Colors.primary}
            size="large"
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
            }}
          />
        </EmptyPhotoContainer>
      ) : (
        <PhotoScroll userMedia={userMedia} renderItem={renderItem} />
      )}
    </Container>
  );
};

export default memo(ProfileScreen);
