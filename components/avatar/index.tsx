import React, { memo } from 'react';

import { UserAvatarContainer, UserAvatar } from './styles';

//  constants
import { base_url } from '../../constants/backend';

interface AvatarProps {
  avatar: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatar }) => {
  return (
    <UserAvatarContainer avatar={avatar}>
      <UserAvatar
        resizeMode={avatar ? 'cover' : 'center'}
        source={
          avatar
            ? {
                uri: `${base_url}/files/${avatar}`,
              }
            : require('../../assets/avatar.png')
        }
      />
    </UserAvatarContainer>
  );
};

export default memo(Avatar);
