import React from 'react';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

//  constants
import { base_url } from '../../../constants/backend';

import { Container, StyledName, Instagram, UserAvatar } from './styles';

const DrawerHeader: React.FC = () => {
  const user = useSelector<IState, IUser>(state => state.user);

  return (
    <Container>
      <UserAvatar
        source={
          user?.avatar
            ? { uri: `${base_url}/files/${user.avatar}` }
            : require('../../../assets/adaptive-icon.png')
        }
      />
      <StyledName>{user?.name}</StyledName>
      <Instagram>@{user?.instagram?.userName}</Instagram>
    </Container>
  );
};

export default DrawerHeader;
