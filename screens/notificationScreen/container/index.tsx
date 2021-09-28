/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  components
import { Item } from './item';

import { EvaluationData, useNotificationScreen } from './useNotificationScreen';

export const NotificationScreen: React.FC = () => {
  const { notifications, isRefreshing, onRefresh } = useNotificationScreen();

  const renderItem: ListRenderItem<EvaluationData> = useCallback(({ item }) => {
    const { avatar, name, instagram, userProviderId } = item.fromUserId;
    const { value } = item;

    return (
      <Item
        avatar={avatar}
        updated_at={item?.updated_at}
        name={name}
        instaName={instagram?.userName}
        value={value}
        userProviderId={userProviderId}
      />
    );
  }, []);
  return (
    <FlatList
      data={notifications}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );
};
