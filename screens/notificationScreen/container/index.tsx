/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  components
import { NotificationItem } from './notificationItem';
import { ListFooterComponent } from '../../../components/listFooterComponent';
import { EmptyComponent } from './emptyComponent';

//  hooks
import { useNotifications, NotificationData } from '../useNotifications';

export const NotificationScreen: React.FC = () => {
  const {
    notifications,
    isRefreshing,
    onRefresh,
    onListEnd,
    isLoading,
    setOnMomentumScrollBegin,
  } = useNotifications();

  const ITEM_HEIGHT = 130;

  const renderItem: ListRenderItem<NotificationData> = useCallback(
    ({ item }) => {
      const { avatar, name, instagram, userProviderId } =
        item?.fromUserId || {};
      const { value, _id } = item || {};

      return (
        <NotificationItem
          fromUser={{
            avatar,
            userProviderId,
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
    },
    [],
  );
  return (
    <FlatList
      data={notifications}
      ListEmptyComponent={EmptyComponent}
      contentContainerStyle={{ flex: notifications.length === 0 ? 1 : 0 }}
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
