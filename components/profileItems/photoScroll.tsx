import React, { memo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

//  i18n
import { translate } from '../../i18n/src/locales/index';

//  redux
import { UserMedia } from '../../store/modules/user/types';

//  constants
import Colors from '../../constants/colors';

//  styles
import { EmptyPhotoContainer, PhotoContainerText } from './styles';

interface PhotoScrollProps {
  userMedia: UserMedia[] | undefined;
  renderItem: ListRenderItem<UserMedia>;
}

const PhotoScroll: React.FC<PhotoScrollProps> = ({ userMedia, renderItem }) => {
  return (
    <>
      {Array.isArray(userMedia) && userMedia.length !== 0 ? (
        <FlatList
          data={Array.isArray(userMedia) ? userMedia : []}
          renderItem={renderItem}
          keyExtractor={photo => photo.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyPhotoContainer>
          <Ionicons name="md-camera" size={40} color={Colors.accent} />
          <PhotoContainerText>
            {translate('photoDisplayMessage')}
          </PhotoContainerText>
        </EmptyPhotoContainer>
      )}
    </>
  );
};

export default memo(PhotoScroll);
