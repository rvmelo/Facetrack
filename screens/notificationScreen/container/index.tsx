/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  components
import { NotificationItem } from './notificationItem';
import { ListFooterComponent } from './listFooterComponent';

//  hooks
import { useNotifications, NotificationData } from '../useNotifications';
import { ItemSeparator } from './styles';

export const NotificationScreen: React.FC = () => {
  const {
    notifications,
    isRefreshing,
    onRefresh,
    onListEnd,
    isLoading,
    setOnMomentumScrollBegin,
  } = useNotifications();

  //  the sum of item separator and item size heights
  const ITEM_HEIGHT = 130;
  const ITEM_SEPARATOR_HEIGHT = 10;

  const TOTAL_HEIGHT = ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT;

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
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      renderItem={renderItem}
      onEndReached={() => onListEnd()}
      onEndReachedThreshold={0.1}
      onMomentumScrollBegin={() => setOnMomentumScrollBegin(true)}
      ItemSeparatorComponent={() => (
        <ItemSeparator height={ITEM_SEPARATOR_HEIGHT} />
      )}
      ListFooterComponent={() => <ListFooterComponent isLoading={isLoading} />}
      keyExtractor={item => item._id}
      getItemLayout={(data, index) => ({
        length: TOTAL_HEIGHT,
        offset: TOTAL_HEIGHT * index,
        index,
      })}
    />
  );
};
