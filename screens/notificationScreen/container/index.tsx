/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  components
import { NotificationItem } from './notificationItem';

import { NotificationData } from '../../../routes/hooks/useNotifications';

//  constants
import { ListFooterComponent } from './listFooterComponent';
import { useNotifications } from '../useNotifications';

export const NotificationScreen: React.FC = () => {
  const {
    notifications,
    isRefreshing,
    onRefresh,
    onListEnd,
    isLoading,
    setOnMomentumScrollBegin,
  } = useNotifications();

  const renderItem: ListRenderItem<NotificationData> = useCallback(
    ({ item }) => {
      const { avatar, name, instagram, userProviderId } = item.fromUserId;
      const { value, _id } = item;

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
          isRead={item.isRead}
          evaluationId={_id}
        />
      );
    },
    [],
  );
  return (
    <FlatList
      data={notifications}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      renderItem={renderItem}
      onEndReached={() => onListEnd()}
      onEndReachedThreshold={0.1}
      onMomentumScrollBegin={() => setOnMomentumScrollBegin(true)}
      ListFooterComponent={() => <ListFooterComponent isLoading={isLoading} />}
      keyExtractor={item => item._id}
    />
  );
};
