import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  redux

import { UserMedia } from '../../../store/modules/user/types';

//  components
import Publication from './publication';

//  hooks
import usePublications from '../usePublications';

import { Container } from './styles';

interface PhotoDimensions {
  width: number;
  height: number;
}

interface FormattedPublication extends UserMedia {
  index: number;
  dimensions: PhotoDimensions;
}

const UserPublications: React.FC = () => {
  const { formattedPublications, userInstagram } = usePublications();

  const renderItem: ListRenderItem<FormattedPublication> = useCallback(
    ({ item }) => (
      <Publication
        caption={item.caption}
        media_url={item.media_url}
        dimensions={item.dimensions}
        userInstagram={userInstagram ?? 'undefined'}
      />
    ),
    [userInstagram],
  );

  return (
    <Container>
      <FlatList
        data={formattedPublications.sort((a, b) =>
          a.index > b.index ? 1 : -1,
        )}
        renderItem={renderItem}
        keyExtractor={publication => publication.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default memo(UserPublications);
