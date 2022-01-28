import React, { useCallback, useEffect, memo } from 'react';
import { FlatList, ListRenderItem, Modal } from 'react-native';

//  components
import { ListFooterComponent } from '../../../../components/listFooterComponent';
import { IUser } from '../../../../store/modules/user/types';
import { EmptyComponent } from './emptyComponent';
import { ListButton } from './ListButton';
import { ListHeaderComponent } from './listHeaderComponent';
import { ListItem } from './listItem';

//  styles
import { ItemSeparator, ModalView } from '../styles';
import { metric_types } from '../../useTrackScreen';

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
  metric: metric_types;
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
    metric,
  }) => {
    const ITEM_HEIGHT = 100;
    const ITEM_SEPARATOR_HEIGHT = 20;

    const TOTAL_HEIGHT = ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT;

    useEffect(() => {
      onRefresh();
    }, [onRefresh]);

    const renderItem: ListRenderItem<IUser> = useCallback(
      ({ item }) => {
        return (
          <ListItem
            user={item}
            height={ITEM_HEIGHT}
            setIsVisible={setIsVisible}
          />
        );
      },
      [setIsVisible],
    );

    return (
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <ModalView>
          <ListHeaderComponent distance={distance} metric={metric} />
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
            numColumns={3}
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
