import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { photoStorageBucketUrl } from '../../constants/backend';

interface UseCardProps {
  instagramPhoto: string;
  avatar: string;
}

interface ReturnType {
  selectedUri: string;
}

export function useCard({ instagramPhoto, avatar }: UseCardProps): ReturnType {
  const [selectedUri, setSelectedUri] = useState(instagramPhoto);

  useEffect(() => {
    Image.getSize(
      instagramPhoto,
      () => setSelectedUri(instagramPhoto),
      () => {
        setSelectedUri(avatar ? `${photoStorageBucketUrl}/${avatar}` : '');
      },
    );
  }, [instagramPhoto, avatar]);

  return {
    selectedUri,
  };
}
