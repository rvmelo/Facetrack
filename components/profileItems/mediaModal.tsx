import React, { memo } from 'react';
import { Modal, ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { getDate } from '../../services/date';

//  redux
import { MEDIA_TYPES, UserMedia } from '../../store/modules/user/types';

//  components
// import { CloseButton } from '../closeButton';
import { PhotoMedia, VideoMedia } from './modalMedias';

//  styles
import { MediaModalBackground, ModalContent } from './styles';

//  constants
import { SCREEN_HEIGHT } from '../../constants/dimensions';

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
        <MediaModalBackground bottomTabHeight={bottomTabHeight}>
          <ScrollView
            contentContainerStyle={{
              minHeight: SCREEN_HEIGHT - bottomTabHeight,
            }}
          >
            <ModalContent>
              {media_type === MEDIA_TYPES.video ? (
                <VideoMedia
                  media_url={media_url}
                  instagram={instagram}
                  caption={caption}
                  date={timestamp ? getDate(timestamp.slice(0, 16)) : ''}
                />
              ) : (
                <PhotoMedia
                  media_url={media_url}
                  instagram={instagram}
                  caption={caption}
                  imgHeight={imgHeight}
                  date={timestamp ? getDate(timestamp.slice(0, 16)) : ''}
                />
              )}
              {/* <CloseButton
                onPress={() => setIsVisible(false)}
                styles={{
                  marginVertical: 20,
                }}
              /> */}
            </ModalContent>
          </ScrollView>
        </MediaModalBackground>
      </Modal>
    );
  },
);
