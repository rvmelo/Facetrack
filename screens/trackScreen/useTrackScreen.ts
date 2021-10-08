import { useState, useCallback } from 'react';

export interface TrackedUser {
  id: number;
  url: string;
}

interface ReturnType {
  users: TrackedUser[];
  // eslint-disable-next-line no-unused-vars
  setUsers: (users: TrackedUser[]) => void;
  formatData: () => void;
}

export const sampleData = [
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
  {
    avatarUrl: 'resized-9e0cd04a7bab1ad940ce-photo.jpg',
  },
];

export function useTrackScreen(): ReturnType {
  const [users, setUsers] = useState<TrackedUser[]>(() => {
    let idCount = 0;

    return sampleData.map(data => {
      idCount += 1;
      return {
        id: idCount,
        url: data.avatarUrl,
      };
    });
  });

  const formatData = useCallback(() => {
    let idCount = 0;

    const auxData = sampleData.map(data => {
      idCount += 1;
      return {
        id: idCount,
        url: data.avatarUrl,
      };
    });

    setUsers([...auxData]);
  }, []);

  return {
    users,
    setUsers,
    formatData,
  };
}
