import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { IUser } from '../../../store/modules/user/types';
import { EmptyComponent } from './emptyComponent';
import { ListItem } from './listItem';

interface UsersListProps {
  users: IUser[];
  isSearchStarted: boolean;
}

export const UsersList: React.FC<UsersListProps> = ({
  users,
  isSearchStarted,
}) => {
  const ITEM_HEIGHT = 70;

  const renderItem: ListRenderItem<IUser> = useCallback(({ item }) => {
    return <ListItem height={ITEM_HEIGHT} user={item} />;
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.userProviderId}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyComponent isSearchStarted={isSearchStarted} />
      )}
      contentContainerStyle={{
        flex: users.length === 0 ? 1 : 0,
        paddingTop: 20,
      }}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};
