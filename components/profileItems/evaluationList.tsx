/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  components
import { EvaluationItem } from './evaluationItem';
import { ListFooterComponent } from '../listFooterComponent';

//  hooks
import { useNotifications, EvaluationData } from './hooks/useEvaluation';

interface EvaluationListProps {
  userProviderId: string;
}

export const EvaluationList: React.FC<EvaluationListProps> = ({
  userProviderId,
}) => {
  const {
    evaluations,
    isRefreshing,
    onRefresh,
    onListEnd,
    isLoading,
    setOnMomentumScrollBegin,
  } = useNotifications({ userProviderId });

  const ITEM_HEIGHT = 130;

  const renderItem: ListRenderItem<EvaluationData> = useCallback(({ item }) => {
    const { avatar, name, instagram } = item?.fromUserId || {};
    const { value, _id } = item || {};

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
        isNotificationRead={item.isRead}
        itemHeight={ITEM_HEIGHT}
      />
    );
  }, []);
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
