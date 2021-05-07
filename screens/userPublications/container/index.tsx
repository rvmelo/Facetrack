import React, { memo, useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, Image } from 'react-native';

//  navigation
import { useRoute } from '@react-navigation/native';

//  redux
import { UserMedia } from '../../../store/modules/user/types';

// constants
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/dimensions';

import {
  Container,
  PublicationContainer,
  Header,
  Instagram,
  UserAvatar,
  Description,
  UserPhoto,
} from './styles';

interface RouteParams {
  publications: UserMedia[];
}

interface PhotoDimensions {
  width: number;
  height: number;
}

interface FormattedPublication extends UserMedia {
  dimensions: PhotoDimensions;
}

const UserPublications: React.FC = () => {
  const { params } = useRoute();

  const { publications } = params as RouteParams;

  const [formattedPublications, setFormattedPublications] = useState<
    FormattedPublication[]
  >([]);

  useEffect(() => {
    const filteredPublications = publications.filter(
      publication => !publication.media_url.includes('video.cdninstagram.com'),
    );

    filteredPublications.forEach(publication => {
      Image.getSize(publication.media_url, (imageWidth, imageHeight) => {
        const ratio = Math.min(
          SCREEN_WIDTH / imageWidth,
          SCREEN_HEIGHT / imageHeight,
        );

        setFormattedPublications(prev => [
          ...prev,
          {
            ...publication,
            dimensions: {
              width: imageWidth * ratio,
              height: imageHeight * ratio,
            },
          },
        ]);
      });
    });
  }, [publications]);

  const renderItem: ListRenderItem<FormattedPublication> = useCallback(
    ({ item }) => (
      <PublicationContainer>
        <Header>
          <UserAvatar
            source={{
              uri:
                'https://img.ibxk.com.br//2020/05/28/28135510637179.jpg?w=1200&h=675&mode=crop&scale=both',
            }}
          />
          <Instagram>@rvtheone</Instagram>
        </Header>
        <UserPhoto
          source={{ uri: item.media_url }}
          height={item.dimensions.height}
        />
        <Description>{item.caption}</Description>
      </PublicationContainer>
    ),
    [],
  );

  return (
    <Container>
      <FlatList
        data={formattedPublications}
        renderItem={renderItem}
        keyExtractor={publication => publication.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default memo(UserPublications);
