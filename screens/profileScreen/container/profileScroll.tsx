/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { FlatList, ListRenderItem, ScrollView } from 'react-native';

//  redux
import { IUser, UserMedia } from '../../../store/modules/user/types';

//  components
import { ListHeaderComponent } from './listHeaderComponent';
import { ListEmptyComponent } from './listEmptyComponent';
import { SelectionBar } from '../../../components/profileItems/selectionBar';
import { EvaluationList } from './evaluationList';

//  hooks
import { useProfileScreen } from '../useProfileScreen';
import {
  ModalEvaluation,
  ModalUser,
} from '../../../components/profileItems/hooks/useEvaluationModal';

interface PhotoScrollProps {
  user: IUser;
  isAvatarLoading: boolean;
  renderItem: ListRenderItem<UserMedia>;
  isRefreshing: boolean;
  onUserLoading: () => Promise<void>;
  setEvaluation: (evaluation: ModalEvaluation) => void;
  setEvaluationModalVisible: (value: boolean) => void;
  setModalUser: (modalUser: ModalUser) => void;
}

export const ProfileScroll: React.FC<PhotoScrollProps> = memo(
  ({
    user,
    isAvatarLoading,
    isRefreshing,
    onUserLoading,
    renderItem,
    setEvaluation,
    setModalUser,
    setEvaluationModalVisible,
  }) => {
    const userMedia = user?.instagram?.userMedia;

    const { scroll } = useProfileScreen();

    return (
      <>
        <ListHeaderComponent
          user={user}
          isAvatarLoading={isAvatarLoading}
          refreshing={isRefreshing}
          onRefresh={onUserLoading}
        />

        <SelectionBar scroll={scroll} />
        <ScrollView ref={scroll} scrollEnabled={false} horizontal>
          <FlatList
            data={Array.isArray(userMedia) ? userMedia : []}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={renderItem}
            keyExtractor={photo => photo.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
          <EvaluationList
            setModalUser={setModalUser}
            setEvaluation={setEvaluation}
            userProviderId={user.userProviderId}
            setModalVisible={setEvaluationModalVisible}
            listTranslations={{
              emptyListTranslationKey: 'noEvaluations',
              evaluationItemTranslationKey: 'userEvaluation',
            }}
          />
        </ScrollView>
      </>
    );
  },
);
