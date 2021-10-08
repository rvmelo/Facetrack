import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  components
import Avatar from '../../../components/avatar/index';
import { TrackedUser, useTrackScreen } from '../useTrackScreen';
import { EmptyComponent } from './emptyComponent';
import { ListButton } from './ListButton';

//  styles
import { ItemContainer, ItemSeparator, ItemText, Container } from './styles';

export const TrackScreen: React.FC = () => {
  const { users, setUsers, formatData } = useTrackScreen();

  const renderItem: ListRenderItem<TrackedUser> = useCallback(({ item }) => {
    return (
      <ItemContainer>
        <Avatar avatar={item.url} />
        <ItemText>@rvtheone</ItemText>
      </ItemContainer>
    );
  }, []);

  return (
    <Container>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: users.length === 0 ? 1 : 0,
          alignItems: 'center',
          marginTop: 20,
        }}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={() => <EmptyComponent onPress={formatData} />}
      />
      {users.length > 0 && <ListButton onPress={() => setUsers([])} />}
    </Container>
  );
};
