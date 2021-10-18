import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { IUser } from '../../../store/modules/user/types';
import { ListItem } from './listItem';

interface UsersListProps {
  users: IUser[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const ITEM_HEIGHT = 70;

  const renderItem: ListRenderItem<IUser> = useCallback(({ item }) => {
    return (
      <ListItem
        name={item.name}
        height={ITEM_HEIGHT}
        avatar={item.avatar}
        instaName={item?.instagram?.userName}
      />
    );
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.userProviderId}
      showsVerticalScrollIndicator={false}
      // ListEmptyComponent={EmptyComponent}
      // getItemLayout={(data, index) => ({
      //   length: TOTAL_HEIGHT,
      //   offset: TOTAL_HEIGHT * index,
      //   index,
      // })}
    />
  );
};
