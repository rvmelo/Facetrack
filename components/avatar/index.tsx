/* eslint-disable react/require-default-props */
import React, { memo } from 'react';
import { ViewStyle } from 'react-native';

import { UserAvatarContainer, UserAvatar } from './styles';

//  constants
import { storageUrl } from '../../constants/backend';

interface AvatarProps {
  avatar: string;
  styles?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, styles = {} }) => {
  return (
    <UserAvatarContainer avatar={avatar} style={styles}>
      <UserAvatar
        resizeMode={avatar ? 'cover' : 'center'}
        source={
          avatar
            ? {
                uri: `${storageUrl}/avatar/${avatar}`,
              }
            : require('../../assets/avatar.png')
        }
      />
    </UserAvatarContainer>
  );
};

export default memo(Avatar);
