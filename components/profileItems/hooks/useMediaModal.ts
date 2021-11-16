import { useState, useEffect } from 'react';
import { Image } from 'react-native';

//   constants
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants/dimensions';

//  redux
import { MEDIA_TYPES, UserMedia } from '../../../store/modules/user/types';

interface ReturnType {
  isVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsVisible: (isVisible: boolean) => void;
  media: UserMedia;
  // eslint-disable-next-line no-unused-vars
  setMedia: (media: UserMedia) => void;
  imgHeight: number;
}

export function useMediaModal(): ReturnType {
  const [isVisible, setIsVisible] = useState(false);
  const [media, setMedia] = useState<UserMedia>({} as UserMedia);

  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    const { media_type, media_url } = media;

    if (!media_type || media_type === MEDIA_TYPES.video) return;

    Image.getSize(media_url, (imageWidth, imageHeight) => {
      // success callback
      const ratio = Math.min(
        SCREEN_WIDTH / imageWidth,
        SCREEN_HEIGHT / imageHeight,
      );

      setImgHeight(imageHeight * ratio);
    });
  }, [media]);

  return {
    isVisible,
    setIsVisible,
    media,
    setMedia,
    imgHeight,
  };
}
