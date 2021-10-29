import React, { memo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  redux
import { IUser, UserMedia } from '../../../store/modules/user/types';

//  components
import { ListHeaderComponent } from './listHeaderComponent';
import { ListEmptyComponent } from './listEmptyComponent';

interface PhotoScrollProps {
  user: IUser;
  isAvatarLoading: boolean;
  renderItem: ListRenderItem<UserMedia>;
  isRefreshing: boolean;
  onUserLoading: () => Promise<void>;
}

export const ProfileScroll: React.FC<PhotoScrollProps> = memo(
  ({ user, isAvatarLoading, isRefreshing, onUserLoading, renderItem }) => {
    const userMedia = user?.instagram?.userMedia;

    return (
      <FlatList
        data={Array.isArray(userMedia) ? userMedia : []}
        refreshing={isRefreshing}
        onRefresh={onUserLoading}
        ListHeaderComponent={() => (
          <ListHeaderComponent user={user} isAvatarLoading={isAvatarLoading} />
        )}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
        keyExtractor={photo => photo.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    );
  },
);
