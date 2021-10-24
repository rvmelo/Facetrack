import React from 'react';
import { Video } from 'expo-av';

//   constants
import { SCREEN_WIDTH } from '../../constants/dimensions';

import {
  ModalTextContainer,
  ModalPhoto,
  ModalText,
  ModalDate,
  Instagram,
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
    <>
      <ModalPhoto source={{ uri: media_url }} imgHeight={imgHeight} />
      <ModalDate>{date}</ModalDate>
      <ModalTextContainer>
        <ModalText>
          <Instagram>{instagram} </Instagram>
          {caption}
        </ModalText>
      </ModalTextContainer>
    </>
  );
};

export const VideoMedia: React.FC<VideoData> = ({
  media_url,
  instagram,
  caption,
  date,
}) => {
  return (
    <>
      <Video
        style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
        source={{
          uri: media_url,
        }}
        useNativeControls
        resizeMode="cover"
        isLooping
      />
      <ModalDate>{date}</ModalDate>
      <ModalTextContainer>
        <ModalText>
          <Instagram>{instagram} </Instagram>
          {caption}
        </ModalText>
      </ModalTextContainer>
    </>
  );
};
