/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  components
import { EvaluationItem } from '../../../components/profileItems/evaluationItem';
import { ListFooterComponent } from '../../../components/listFooterComponent';
import { EmptyList } from '../../../components/profileItems/emptyList';

//  hooks
import {
  useEvaluations,
  EvaluationData,
} from '../../../components/profileItems/hooks/useEvaluations';
import {
  ModalEvaluation,
  ModalUser,
} from '../../../components/profileItems/hooks/useEvaluationModal';

//  i18n
import { translate } from '../../../i18n/src/locales';

interface ListTranslations {
  emptyListTranslationKey: string;
  evaluationItemTranslationKey: string;
}

interface EvaluationListProps {
  userProviderId: string;
  setModalUser: (modalUser: ModalUser) => void;
  setEvaluation: (evaluation: ModalEvaluation) => void;
  setModalVisible: (value: boolean) => void;
  listTranslations: ListTranslations;
}

export const EvaluationList: React.FC<EvaluationListProps> = ({
  userProviderId,
  setModalUser,
  setEvaluation,
  setModalVisible,
  listTranslations,
}) => {
  const {
    evaluations,
    isRefreshing,
    onRefresh,
    onListEnd,
    isLoading,
    setOnMomentumScrollBegin,
  } = useEvaluations({ userProviderId });

  const ITEM_HEIGHT = 130;

  const { emptyListTranslationKey, evaluationItemTranslationKey } =
    listTranslations;

  const renderItem: ListRenderItem<EvaluationData> = useCallback(
    ({ item }) => {
      const { avatar, name, instagram } = item?.fromUserId || {};
      const { value, message, _id } = item || {};

      return (
        <EvaluationItem
          fromUser={{
            avatar,
            instaName: instagram?.userName,
            name,
          }}
          updated_at={item?.updated_at}
          value={value}
          evaluationId={_id}
          itemHeight={ITEM_HEIGHT}
          onPress={() => {
            setModalUser({ avatarUri: avatar, instaName: instagram?.userName });
            setEvaluation({ rate: value, message });
            setModalVisible(true);
          }}
          hasMessage={!!message}
          translationKey={evaluationItemTranslationKey}
        />
      );
    },
    [
      setModalUser,
      setEvaluation,
      setModalVisible,
      evaluationItemTranslationKey,
    ],
  );
  return (
    <FlatList
      data={evaluations}
      ListEmptyComponent={() => (
        <EmptyList
          title={translate('noEvaluationsFound')}
          message={translate(emptyListTranslationKey)}
        />
      )}
      contentContainerStyle={{ flex: evaluations.length === 0 ? 1 : 0 }}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      renderItem={renderItem}
      onEndReached={() => onListEnd()}
      onEndReachedThreshold={0.1}
      onMomentumScrollBegin={() => setOnMomentumScrollBegin(true)}
      ListFooterComponent={() => <ListFooterComponent isLoading={isLoading} />}
      keyExtractor={item => item._id}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};
