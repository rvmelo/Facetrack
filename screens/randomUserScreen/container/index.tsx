import React, { memo, useCallback } from 'react';
import { ListRenderItem } from 'react-native';

import { MEDIA_TYPES, UserMedia } from '../../../store/modules/user/types';

// components
import { VideoItem, PhotoItem } from '../../../components/profileItems/items';
import PhotoScroll from '../../../components/profileItems/photoScroll';
import { ProfileButton } from '../../../components/profileItems/profileButton';
import { RateModal } from '../../../components/profileItems/rateModal';
import { MediaModal } from '../../../components/profileItems/mediaModal';
import { Header } from '../../../components/profileItems/header';

// hooks
import { useMediaModal } from '../../../components/profileItems/hooks/useMediaModal';
import { useRandomUserScreen } from '../useRandomUserScreen';

import { Container, ProfileDataContainer, StyledText } from './styles';

export const RandomUserScreen: React.FC = memo(() => {
  const { modalVisible, setModalVisible, handleEvaluation, userMedia, user } =
    useRandomUserScreen();

  const { isVisible, setIsVisible, media, setMedia, imgHeight } =
    useMediaModal();

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

  return (
    <>
      <Container>
        <ProfileDataContainer>
          <Header
            avatar={user?.avatar}
            name={user?.name}
            rate={user?.rate?.toFixed(2)}
          />
          <StyledText>@{user?.instagram?.userName}</StyledText>
          <StyledText>{user?.sexualOrientation}</StyledText>
          <StyledText>{user?.relationshipStatus}</StyledText>
          {/* <StyledText>{user?.birthDate}</StyledText> */}
          <ProfileButton onPress={() => setModalVisible(true)} text="Rate" />
        </ProfileDataContainer>

        <PhotoScroll userMedia={userMedia} renderItem={renderItem} />
      </Container>
      <RateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        userData={{
          avatarUri: user?.avatar,
          instaName: user?.instagram?.userName,
        }}
        handleEvaluation={handleEvaluation}
      />
      <MediaModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        media={media}
        imgHeight={imgHeight}
        instagram={user?.instagram?.userName}
      />
    </>
  );
});
