import React, { memo } from 'react';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { IUser } from '../../store/modules/user/types';

//  styles
import { Container, StyledName, Instagram } from './styles';

//  components
import Avatar from '../avatar';

const DrawerHeader: React.FC = () => {
  const user = useSelector<IState, IUser>(state => state.user);

  return (
    <Container>
      <Avatar avatar={user?.avatar} />
      <StyledName>{user?.name}</StyledName>
      <Instagram>@{user?.instagram?.userName}</Instagram>
    </Container>
  );
};

export default memo(DrawerHeader);
