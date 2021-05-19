import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { AvatarImage } from './styles';

//  constants
import { base_url } from '../../../constants/backend';
import Colors from '../../../constants/colors';

interface AvatarContentProps {
  avatar: string;
}

const AvatarContent: React.FC<AvatarContentProps> = ({ avatar }) => {
  return (
    <>
      {avatar ? (
        <AvatarImage
          source={{
            uri: `${base_url}/files/${avatar}`,
          }}
        />
      ) : (
        <Ionicons name="md-add" size={40} color={Colors.primary} />
      )}
    </>
  );
};

export default memo(AvatarContent);
