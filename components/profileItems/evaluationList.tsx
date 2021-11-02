/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  components
import { EvaluationItem } from './evaluationItem';
import { ListFooterComponent } from '../listFooterComponent';

//  hooks
import { useEvaluations, EvaluationData } from './hooks/useEvaluations';
import { ModalEvaluation, ModalUser } from './hooks/useEvaluationModal';

interface EvaluationListProps {
  userProviderId: string;
  setModalUser: (modalUser: ModalUser) => void;
  setEvaluation: (evaluation: ModalEvaluation) => void;
  setModalVisible: (value: boolean) => void;
}

export const EvaluationList: React.FC<EvaluationListProps> = ({
  userProviderId,
  setModalUser,
  setEvaluation,
  setModalVisible,
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
        />
      );
    },
    [setModalUser, setEvaluation, setModalVisible],
  );
  return (
    <FlatList
      data={evaluations}
      // ListEmptyComponent={EmptyComponent}
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
