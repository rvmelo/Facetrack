import React, { memo, useCallback, useEffect } from 'react';
import { ListRenderItem, ActivityIndicator, Alert } from 'react-native';

// navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

//  redux
import { MEDIA_TYPES, UserMedia } from '../../../store/modules/user/types';

// components
import { VideoItem, PhotoItem } from '../../../components/profileItems/items';
import { MediaModal } from '../../../components/profileItems/mediaModal';
import { EvaluationModal } from '../../../components/profileItems/evaluationModal';

// hooks
import useInstagram from '../../../hooks/useInstagram';
import { useMediaModal } from '../../../components/profileItems/hooks/useMediaModal';
import { useProfileScreen } from '../useProfileScreen';
import { useEvaluationModal } from '../../../components/profileItems/hooks/useEvaluationModal';

// constants
import Colors from '../../../constants/colors';

import { Container, EmptyContainer } from './styles';

// i18n
import { translate } from '../../../i18n/src/locales';

import { ProfileStackParamList } from '../../../routes/types';
import { ProfileScroll } from './profileScroll';
import { IntroModal } from '../../../components/introModal';

type NavigationProps = StackNavigationProp<
  ProfileStackParamList,
  'ProfileScreen'
>;

const ProfileScreen: React.FC = () => {
  const {
    user,
    isUserLoading,
    isUserUpdateFailure,
    isAvatarLoading,
    onUserLoading,
    isRefreshing,
  } = useProfileScreen();

  const { handleInstagramRefresh, shouldRefreshInstagram } = useInstagram();

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
        <ProfileScroll
          user={user}
          isAvatarLoading={isAvatarLoading}
          renderItem={renderItem}
          onUserLoading={onUserLoading}
          isRefreshing={isRefreshing}
          setEvaluation={setEvaluation}
          setModalUser={setModalUser}
          setEvaluationModalVisible={setEvaluationModalVisible}
        />
      </Container>
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
      <IntroModal
        iconName="md-star-outline"
        text="On this screen you can press the star icon to check evaluations received from other users."
      />
    </>
  );
};

export default memo(ProfileScreen);
