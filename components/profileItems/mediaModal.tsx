import React, { memo } from 'react';
import { Modal, ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { format } from 'date-fns';
import * as dateFNSLocales from 'date-fns/locale';
import { location } from '../../i18n/src/locales/index';

//  redux
import { MEDIA_TYPES, UserMedia } from '../../store/modules/user/types';

//  components
import { CloseButton } from './closeButton';
import { PhotoMedia, VideoMedia } from './modalMedias';

//  styles
import { ModalBackground, ModalContent } from './styles';

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
        <ModalBackground bottomTabHeight={bottomTabHeight}>
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
                  date={
                    timestamp
                      ? format(
                          new Date(timestamp.slice(0, 10)),
                          'dd MMMM YYY',
                          {
                            locale:
                              dateFNSLocales[
                                location.substring(0, 2) as 'pt' | 'es'
                              ] ?? dateFNSLocales.enUS,
                          },
                        )
                      : ''
                  }
                />
              ) : (
                <PhotoMedia
                  media_url={media_url}
                  instagram={instagram}
                  caption={caption}
                  imgHeight={imgHeight}
                  date={
                    timestamp
                      ? format(
                          new Date(timestamp.slice(0, 10)),
                          'dd MMMM YYY',
                          {
                            locale:
                              dateFNSLocales[
                                location.substring(0, 2) as 'pt' | 'es'
                              ] ?? dateFNSLocales.enUS,
                          },
                        )
                      : ''
                  }
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
