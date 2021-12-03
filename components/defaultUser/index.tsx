import React, { memo, useCallback } from 'react';
import { ListRenderItem, ScrollView } from 'react-native';

import { MEDIA_TYPES, UserMedia } from '../../store/modules/user/types';

// components
import { VideoItem, PhotoItem } from '../profileItems/items';
import PhotoScroll from '../profileItems/photoScroll';
import { MediaModal } from '../profileItems/mediaModal';
import { SelectionBar } from '../profileItems/selectionBar';
import { EvaluationList } from '../profileItems/evaluationList';
import { EvaluationModal } from '../profileItems/evaluationModal';

import { Container, ProfileDataContainer } from './styles';
import { RateModal } from '../profileItems/rateModal';

//  hooks
import { useMediaModal } from '../profileItems/hooks/useMediaModal';
import { useDefaultUser } from './useDefaultUser';
import { useEvaluationModal } from '../profileItems/hooks/useEvaluationModal';
import { ProfileHeader } from '../profileItems/profileHeader';

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

  const {
    modalUser,
    setModalUser,
    evaluation,
    setEvaluation,
    isVisible: evaluationModalVisible,
    setIsVisible: setEvaluationModalVisible,
  } = useEvaluationModal();

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
          <ProfileHeader user={user} setModalVisible={setModalVisible} />
          <SelectionBar scroll={scroll} />
        </ProfileDataContainer>
        <ScrollView ref={scroll} scrollEnabled={false} horizontal>
          <PhotoScroll userMedia={userMedia} renderItem={renderItem} />
          <EvaluationList
            setModalUser={setModalUser}
            setEvaluation={setEvaluation}
            userProviderId={user.userProviderId}
            setModalVisible={setEvaluationModalVisible}
            listTranslations={{
              emptyListTranslationKey: 'userHasNoEvaluations',
              evaluationItemTranslationKey: 'receivedEvaluation',
            }}
          />
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
      <EvaluationModal
        userData={modalUser}
        evaluation={evaluation}
        modalVisible={evaluationModalVisible}
        setModalVisible={setEvaluationModalVisible}
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
