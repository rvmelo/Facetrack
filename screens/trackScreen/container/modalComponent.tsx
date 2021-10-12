import React, { useCallback, memo } from 'react';
import { FlatList, ListRenderItem, Modal } from 'react-native';

//  components
import Avatar from '../../../components/avatar/index';
import { IUser } from '../../../store/modules/user/types';
import { EmptyComponent } from './emptyComponent';
import { ListButton } from './ListButton';

//  styles
import { ItemContainer, ItemSeparator, ItemText, ModalView } from './styles';

interface ModalComponentProps {
  users: IUser[];
  isVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsVisible: (isVisible: boolean) => void;
}

export const ModalComponent: React.FC<ModalComponentProps> = memo(
  ({ users, isVisible, setIsVisible }) => {
    const ITEM_HEIGHT = 100;
    const ITEM_SEPARATOR_HEIGHT = 20;

    const TOTAL_HEIGHT = ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT;

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
          <FlatList
            data={users}
            renderItem={renderItem}
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
            ListFooterComponent={() => (
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
