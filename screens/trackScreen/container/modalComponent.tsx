import React, { useCallback, useEffect, memo } from 'react';
import { FlatList, ListRenderItem, Modal } from 'react-native';

//  components
import Avatar from '../../../components/avatar/index';
import { ListFooterComponent } from '../../../components/listFooterComponent';
import { IUser } from '../../../store/modules/user/types';
import { EmptyComponent } from './emptyComponent';
import { ListButton } from './ListButton';
import { ListHeaderComponent } from './listHeaderComponent';

//  styles
import { ItemContainer, ItemSeparator, ItemText, ModalView } from './styles';

interface ModalComponentProps {
  users: IUser[];
  isVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsVisible: (isVisible: boolean) => void;
  isLoading: boolean;
  isRefreshing: boolean;
  // eslint-disable-next-line no-unused-vars
  setOnMomentumScrollBegin: (onMomentumScrollBegin: boolean) => void;
  onRefresh: () => Promise<void>;
  onListEnd: () => Promise<void>;
  distance: number;
}

export const ModalComponent: React.FC<ModalComponentProps> = memo(
  ({
    users,
    isVisible,
    setIsVisible,
    isLoading,
    isRefreshing,
    onRefresh,
    onListEnd,
    setOnMomentumScrollBegin,
    distance,
  }) => {
    const ITEM_HEIGHT = 100;
    const ITEM_SEPARATOR_HEIGHT = 20;

    const TOTAL_HEIGHT = ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT;

    useEffect(() => {
      onRefresh();
    }, [onRefresh]);

    const renderItem: ListRenderItem<IUser> = useCallback(({ item }) => {
      return (
        <ItemContainer height={ITEM_HEIGHT}>
          <Avatar avatar={item.avatar} />
          <ItemText>@{item?.instagram?.userName}</ItemText>
        </ItemContainer>
      );
    }, []);

    return (
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <ModalView>
          <ListHeaderComponent distance={distance} />
          <FlatList
            data={users}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            renderItem={renderItem}
            onEndReached={onListEnd}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => setOnMomentumScrollBegin(true)}
            ListFooterComponent={() => (
              <ListFooterComponent isLoading={isLoading} />
            )}
            keyExtractor={item => item.userProviderId}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: users.length === 0 ? 1 : 0,
              alignItems: 'center',
              marginTop: 20,
            }}
            ItemSeparatorComponent={() => (
              <ItemSeparator height={ITEM_SEPARATOR_HEIGHT} />
            )}
            ListEmptyComponent={EmptyComponent}
            getItemLayout={(data, index) => ({
              length: TOTAL_HEIGHT,
              offset: TOTAL_HEIGHT * index,
              index,
            })}
          />

          <ListButton onPress={() => setIsVisible(false)} />
        </ModalView>
      </Modal>
    );
  },
);
