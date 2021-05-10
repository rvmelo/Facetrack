import { useState, useEffect } from 'react';
import { Image } from 'react-native';

import { useSelector } from 'react-redux';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/dimensions';
import { IState } from '../../store';
import { IUser, UserMedia } from '../../store/modules/user/types';

interface PhotoDimensions {
  width: number;
  height: number;
}

interface FormattedPublication extends UserMedia {
  index: number;
  dimensions: PhotoDimensions;
}

interface ReturnValue {
  userInstagram: string | undefined;
  formattedPublications: FormattedPublication[];
}

function usePublications(): ReturnValue {
  const user = useSelector<IState, IUser>(state => state.user);

  const publications = user?.instagram?.userMedia;

  const [formattedPublications, setFormattedPublications] = useState<
    FormattedPublication[]
  >([]);

  useEffect(() => {
    publications?.forEach(publication => {
      Image.getSize(
        publication.media_url,
        (imageWidth, imageHeight) => {
          // success callback
          const ratio = Math.min(
            SCREEN_WIDTH / imageWidth,
            SCREEN_HEIGHT / imageHeight,
          );

          setFormattedPublications(prev => [
            ...prev,
            {
              ...publication,
              index: publications.indexOf(publication),
              dimensions: {
                width: imageWidth * ratio,
                height: imageHeight * ratio,
              },
            },
          ]);
        },
        () => {
          //  failure callback
          setFormattedPublications(prev => [
            ...prev,
            {
              ...publication,
              index: publications.indexOf(publication),
              dimensions: {
                width: SCREEN_WIDTH,
                height: 300,
              },
            },
          ]);
        },
      );
    });
  }, [publications]);

  return {
    formattedPublications,
    userInstagram: user?.instagram?.userName,
  };
}

export default usePublications;
