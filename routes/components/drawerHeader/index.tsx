import React from 'react';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

import { Container, StyledName, Instagram, UserAvatar } from './styles';

const DrawerHeader: React.FC = () => {
  const user = useSelector<IState, IUser>(state => state.user);

  return (
    <Container>
      <UserAvatar
        source={{
          uri:
            'https://img.ibxk.com.br//2020/05/28/28135510637179.jpg?w=1200&h=675&mode=crop&scale=both',
        }}
      />
      <StyledName>{user?.name}</StyledName>
      <Instagram>@{user?.instagram?.userName}</Instagram>
    </Container>
  );
};

export default DrawerHeader;
