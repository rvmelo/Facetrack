import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

//  components
import Avatar from '../avatar/index';

// constants
import Colors from '../../constants/colors';

import {
  HeaderContainer,
  HeaderInfoContainer,
  HeaderText,
  StyledText,
} from './styles';

interface HeaderProps {
  isAvatarLoading?: boolean;
  avatar: string;
  name: string;
  rate: number | string;
}

export const Header: React.FC<HeaderProps> = memo(
  ({ isAvatarLoading = false, avatar, name, rate }) => (
    <HeaderContainer>
      {isAvatarLoading ? (
        <ActivityIndicator
          color={Colors.primary}
          size="large"
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        />
      ) : (
        <Avatar avatar={avatar} />
      )}
      <HeaderInfoContainer>
        <HeaderText numberOfLines={1}>{name}</HeaderText>
        {rate ? <StyledText>{rate}</StyledText> : <StyledText>0.00</StyledText>}
      </HeaderInfoContainer>
    </HeaderContainer>
  ),
);
