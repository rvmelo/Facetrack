import React, { memo, useCallback } from 'react';
import { ListRenderItem } from 'react-native';

import { MEDIA_TYPES, UserMedia } from '../../store/modules/user/types';

// components
import Avatar from '../avatar/index';
import { VideoItem, PhotoItem } from '../profileItems/items';
import PhotoScroll from '../profileItems/photoScroll';
import { ProfileButton } from '../profileItems/profileButton';

import {
  Container,
  ProfileDataContainer,
  StyledName,
  StyledText,
} from './styles';
import { ModalComponent } from '../profileItems/modalComponent';
import { useDefaultUser } from './useDefaultUser';

export const DefaultUser: React.FC = memo(() => {
  const {
    modalVisible,
    setModalVisible,
    rate,
    setRate,
    handleEvaluation,
    userMedia,
    user,
  } = useDefaultUser();

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
    </>
  );
});
