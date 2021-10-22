import React, { memo } from 'react';
import { Modal, ScrollView } from 'react-native';

//  redux
import { MEDIA_TYPES, UserMedia } from '../../store/modules/user/types';

//  constants
import { SCREEN_HEIGHT } from '../../constants/dimensions';

import { CloseButton } from './closeButton';
import { PhotoMedia, VideoMedia } from './modalMedias';
import { formatDate } from '../../services/date';

interface MediaModalProps {
  isVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsVisible: (isVisible: boolean) => void;
  media: UserMedia;
  imgHeight: number;
  instagram: string | undefined;
}

export const MediaModal: React.FC<MediaModalProps> = memo(
  ({ isVisible, setIsVisible, media, imgHeight, instagram }) => {
    const { media_url, media_type, timestamp, caption } = media;

    return (
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <ScrollView>
          {media_type === MEDIA_TYPES.video ? (
            <VideoMedia
              media_url={media_url}
              instagram={instagram}
              caption={caption}
              date={timestamp ? formatDate(timestamp) : ''}
            />
          ) : (
            <PhotoMedia
              media_url={media_url}
              instagram={instagram}
              caption={caption}
              imgHeight={imgHeight}
              date={timestamp ? formatDate(timestamp) : ''}
            />
          )}
        </ScrollView>
        <CloseButton
          onPress={() => setIsVisible(false)}
          styles={{
            position: 'absolute',
            top: SCREEN_HEIGHT * 0.85,
            alignSelf: 'center',
          }}
        />
      </Modal>
    );
  },
);
