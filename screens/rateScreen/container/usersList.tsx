/* eslint-disable no-unused-vars */
import React, { useRef, useCallback } from 'react';

import { FlatList, ListRenderItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//  hooks
import { ItemData } from '../useList';
import { useListActions } from '../useListActions';

//   components
import { ListItem } from './listItem';
import {
  ButtonLayout,
  ButtonText,
  RateScreenText,
  TouchableButton,
  UsersListContainer,
} from './styles';

interface UserListProps {
  listItems: ItemData[];
  setPage(value: number): void;
  handleUsersRequest(): Promise<void>;
}

const UsersList: React.FC<UserListProps> = ({
  listItems,
  setPage,
  handleUsersRequest,
}) => {
  const ref = useRef<FlatList<ItemData> | null>(null);

  const { handleListScrollBack, handleListAnimation } = useListActions({
    ref,
    setPage,
  });

  const renderItem: ListRenderItem<ItemData> = useCallback(
    ({ item }) => {
      const cardIndex = listItems.findIndex(
        listItem => listItem.data.userProviderId === item.data.userProviderId,
      );

      const cardData = {
        cardIndex,
        cardUserId: item.data.userProviderId,
        uri: item.data.instagram?.userMedia[0]?.media_url,
        isLastItem: listItems.length - 1 === cardIndex,
      };

      return (
        <ListItem
          cardData={cardData}
          handleListAnimation={handleListAnimation}
          handleListScrollBack={handleListScrollBack}
        />
      );
    },
    [handleListScrollBack, handleListAnimation, listItems],
  );

  return listItems.length === 0 ? (
    <UsersListContainer>
      <RateScreenText>No users found</RateScreenText>
      <TouchableButton onPress={handleUsersRequest}>
        <ButtonLayout>
          <Ionicons name="md-wifi" size={25} color="white" />
          <ButtonText>Retry</ButtonText>
        </ButtonLayout>
      </TouchableButton>
    </UsersListContainer>
  ) : (
    <FlatList
      ref={ref}
      data={listItems}
      renderItem={renderItem}
      scrollEnabled={false}
      keyExtractor={item => item.data.userProviderId}
    />
  );
};

export default UsersList;
