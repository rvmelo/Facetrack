import { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/dimensions';

interface PublicationProps {
  media_url: string;
}

interface ReturnValue {
  imgHeight: number;
}

function usePublication({ media_url }: PublicationProps): ReturnValue {
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    if (media_url.includes('video.cdninstagram.com')) return;

    Image.getSize(media_url, (imageWidth, imageHeight) => {
      // success callback
      const ratio = Math.min(
        SCREEN_WIDTH / imageWidth,
        SCREEN_HEIGHT / imageHeight,
      );

      setImgHeight(imageHeight * ratio);
    });
  }, [media_url]);

  return {
    imgHeight,
  };
}

export default usePublication;
