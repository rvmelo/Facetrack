import React, { memo, useCallback, useEffect } from 'react';
import { ListRenderItem, ActivityIndicator, Alert } from 'react-native';

// navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import {
  IUserState,
  MEDIA_TYPES,
  UserMedia,
} from '../../../store/modules/user/types';

// components
import { VideoItem, PhotoItem } from '../../../components/profileItems/items';
import { ProfileButton } from '../../../components/profileItems/profileButton';
import PhotoScroll from '../../../components/profileItems/photoScroll';
import { MediaModal } from '../../../components/profileItems/mediaModal';
import { Header } from '../../../components/profileItems/header';

// hooks
import useInstagram from '../../../hooks/useInstagram';
import { useMediaModal } from '../../../components/profileItems/hooks/useMediaModal';

// constants
import Colors from '../../../constants/colors';

import {
  Container,
  ProfileDataContainer,
  StyledText,
  EmptyContainer,
} from './styles';

// i18n
import { translate } from '../../../i18n/src/locales';

import { ProfileStackParamList } from '../../../routes/types';

type NavigationProps = StackNavigationProp<
  ProfileStackParamList,
  'ProfileScreen'
>;

const ProfileScreen: React.FC = () => {
  const { user, isAvatarLoading, isUserUpdateFailure, isUserLoading } =
    useSelector<IState, IUserState>(state => state.user);

  const { handleInstagramRefresh, shouldRefreshInstagram } = useInstagram();

  const { isVisible, setIsVisible, media, setMedia, imgHeight } =
    useMediaModal();

  const userMedia = user?.instagram?.userMedia;

  const navigation = useNavigation<NavigationProps>();

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

  const renderItem: ListRenderItem<UserMedia> = useCallback(
    ({ item }) => {
      return item.media_type === MEDIA_TYPES.video ? (
        <VideoItem
          media_url={item.media_url}
          onPress={() => {
            setIsVisible(true);
            setMedia(item);
          }}
        />
      ) : (
        <PhotoItem
          media_url={item.media_url}
          onPress={() => {
            setIsVisible(true);
            setMedia(item);
          }}
        />
      );
    },
    [setIsVisible, setMedia],
  );

  return isUserLoading ? (
    <EmptyContainer>
      <ActivityIndicator
        color={Colors.primary}
        size="large"
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
        }}
      />
    </EmptyContainer>
  ) : (
    <>
      <Container>
        <ProfileDataContainer>
          <Header
            isAvatarLoading={isAvatarLoading}
            avatar={user?.avatar}
            name={user?.name}
            rate={user?.rate?.toFixed(2)}
          />

          <StyledText>@{user?.instagram?.userName}</StyledText>
          <StyledText>{user?.sexualOrientation}</StyledText>
          <StyledText>{user?.relationshipStatus}</StyledText>
          {/* <StyledText>{user?.birthDate}</StyledText> */}

          <ProfileButton
            onPress={() => navigation.navigate('EditProfile')}
            text={translate('editProfile')}
          />
        </ProfileDataContainer>

        <PhotoScroll userMedia={userMedia} renderItem={renderItem} />
      </Container>
      <MediaModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        media={media}
        imgHeight={imgHeight}
        instagram={user?.instagram?.userName}
      />
    </>
  );
};

export default memo(ProfileScreen);
