import React, { memo } from 'react';
import { Modal, ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

//  redux
import { MEDIA_TYPES, UserMedia } from '../../store/modules/user/types';

//  components
import { CloseButton } from './closeButton';
import { PhotoMedia, VideoMedia } from './modalMedias';
import { formatDate } from '../../services/date';

//  styles
import { ModalBackground, ModalContent } from './styles';

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

    const bottomTabHeight = useBottomTabBarHeight();

    return (
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <ModalBackground bottomTabHeight={bottomTabHeight}>
          <ScrollView>
            <ModalContent>
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
              <CloseButton
                onPress={() => setIsVisible(false)}
                styles={{
                  marginVertical: 20,
                }}
              />
            </ModalContent>
          </ScrollView>
        </ModalBackground>
      </Modal>
    );
  },
);
