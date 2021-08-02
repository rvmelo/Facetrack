import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { AvatarImage } from './styles';

//  constants
import Colors from '../../../constants/colors';

interface AvatarContentProps {
  avatarUri: string;
}

const AvatarContent: React.FC<AvatarContentProps> = ({ avatarUri }) => {
  return (
    <>
      {avatarUri ? (
        <AvatarImage
          source={{
            uri: avatarUri,
          }}
        />
      ) : (
        <Ionicons name="md-add" size={40} color={Colors.primary} />
      )}
    </>
  );
};

export default memo(AvatarContent);
