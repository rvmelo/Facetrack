/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/dimensions';

// i18n
import { location } from '../../i18n/src/locales';

//  redux
import { MEDIA_TYPES, media_types } from '../../store/modules/user/types';

interface PublicationProps {
  media_type: media_types;
  media_url: string;
}

interface ReturnValue {
  imgHeight: number;
  formatDate: (date: string) => string;
}

function usePublication({
  media_type,
  media_url,
}: PublicationProps): ReturnValue {
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    if (media_type === MEDIA_TYPES.video) return;

    Image.getSize(media_url, (imageWidth, imageHeight) => {
      // success callback
      const ratio = Math.min(
        SCREEN_WIDTH / imageWidth,
        SCREEN_HEIGHT / imageHeight,
      );

      setImgHeight(imageHeight * ratio);
    });
  }, [media_url, media_type]);

  const formatDate = (date: string): string => {
    const auxDate = date.slice(0, 10);

    let formattedDate = auxDate.split('-').reverse().join('/');

    if (location === 'en-US') {
      const dateArray = auxDate.split('-');

      const year = dateArray[0];
      const month = dateArray[1];
      const day = dateArray[2];

      formattedDate = [month, day, year].join('/');
    }

    return formattedDate;
  };

  return {
    imgHeight,
    formatDate,
  };
}

export default usePublication;
