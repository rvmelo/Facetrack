import React, { memo, useCallback } from 'react';
import { ListRenderItem, ScrollView } from 'react-native';

import { MEDIA_TYPES, UserMedia } from '../../store/modules/user/types';

// components
import { VideoItem, PhotoItem } from '../profileItems/items';
import PhotoScroll from '../profileItems/photoScroll';
import { ProfileButton } from '../profileItems/profileButton';
import { MediaModal } from '../profileItems/mediaModal';
import { Header } from '../profileItems/header';
import { SelectionBar } from '../profileItems/selectionBar';
import { EvaluationList } from '../profileItems/evaluationList';

//   hooks
import { useMediaModal } from '../profileItems/hooks/useMediaModal';

import { Container, ProfileDataContainer, StyledText } from './styles';
import { RateModal } from '../profileItems/rateModal';
import { useDefaultUser } from './useDefaultUser';

export const DefaultUser: React.FC = memo(() => {
  const {
    modalVisible,
    setModalVisible,
    handleEvaluation,
    userMedia,
    user,
    scroll,
  } = useDefaultUser();

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
          <SelectionBar scroll={scroll} />
        </ProfileDataContainer>
        <ScrollView ref={scroll} scrollEnabled={false} horizontal>
          <PhotoScroll userMedia={userMedia} renderItem={renderItem} />
          <EvaluationList />
        </ScrollView>
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
