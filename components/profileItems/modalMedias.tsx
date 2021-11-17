import React from 'react';
import { Video } from 'expo-av';

//   constants
import { SCREEN_WIDTH } from '../../constants/dimensions';

import {
  ModalTextContainer,
  ModalPhoto,
  ModalText,
  ModalDate,
  ModalDateContainer,
  Instagram,
  MediaContainer,
} from './styles';

interface PhotoData {
  media_url: string;
  imgHeight: number;
  instagram: string | undefined;
  caption: string;
  date: string;
}

interface VideoData {
  media_url: string;
  instagram: string | undefined;
  caption: string;
  date: string;
}

export const PhotoMedia: React.FC<PhotoData> = ({
  media_url,
  imgHeight,
  instagram,
  caption,
  date,
}) => {
  return (
    <MediaContainer>
      <ModalPhoto source={{ uri: media_url }} imgHeight={imgHeight} />
      {!caption && (
        <ModalDateContainer>
          <ModalDate>{date}</ModalDate>
        </ModalDateContainer>
      )}
      {caption && (
        <ModalTextContainer>
          <ModalText>
            <Instagram>{instagram} </Instagram>
            {caption}
          </ModalText>
          <ModalDate>{date}</ModalDate>
        </ModalTextContainer>
      )}
    </MediaContainer>
  );
};

export const VideoMedia: React.FC<VideoData> = ({
  media_url,
  instagram,
  caption,
  date,
}) => {
  return (
    <MediaContainer>
      <Video
        style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
        source={{
          uri: media_url,
        }}
        useNativeControls
        resizeMode="cover"
        isLooping
      />
      {!caption && (
        <ModalDateContainer>
          <ModalDate>{date}</ModalDate>
        </ModalDateContainer>
      )}
      {caption && (
        <ModalTextContainer>
          <ModalText>
            <Instagram>{instagram} </Instagram>
            {caption}
          </ModalText>
          <ModalDate>{date}</ModalDate>
        </ModalTextContainer>
      )}
    </MediaContainer>
  );
};
