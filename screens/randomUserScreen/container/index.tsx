import React, { memo, useCallback } from 'react';
import { ListRenderItem } from 'react-native';

import { MEDIA_TYPES, UserMedia } from '../../../store/modules/user/types';

// components
import Avatar from '../../../components/avatar/index';
import { VideoItem, PhotoItem } from '../../../components/profileItems/items';
import PhotoScroll from '../../../components/profileItems/photoScroll';
import { ProfileButton } from '../../../components/profileItems/profileButton';
import { ModalComponent } from '../../../components/profileItems/modalComponent';
import { MediaModal } from '../../../components/profileItems/mediaModal';

// hooks
import { useMediaModal } from '../../../components/profileItems/hooks/useMediaModal';
import { useRandomUserScreen } from '../useRandomUserScreen';

import {
  Container,
  ProfileDataContainer,
  StyledName,
  StyledText,
} from './styles';

export const RandomUserScreen: React.FC = memo(() => {
  const {
    modalVisible,
    setModalVisible,
    rate,
    setRate,
    handleEvaluation,
    userMedia,
    user,
  } = useRandomUserScreen();

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
          <Avatar avatar={user?.avatar} />
          <StyledName>{user?.name}</StyledName>
          <StyledText>@{user?.instagram?.userName}</StyledText>
          <StyledText>{user?.sexualOrientation}</StyledText>
          <StyledText>{user?.relationshipStatus}</StyledText>
          {/* <StyledText>{user?.birthDate}</StyledText> */}
          <ProfileButton onPress={() => setModalVisible(true)} text="Rate" />
        </ProfileDataContainer>

        <PhotoScroll userMedia={userMedia} renderItem={renderItem} />
      </Container>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        userData={{
          avatarUri: user?.avatar,
          instaName: user?.instagram?.userName,
        }}
        handleEvaluation={handleEvaluation}
        rate={rate}
        setRate={setRate}
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
