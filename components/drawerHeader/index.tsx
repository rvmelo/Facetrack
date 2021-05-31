import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { IUserState } from '../../store/modules/user/types';

//  constants
import Colors from '../../constants/colors';

//  styles
import { Container, StyledName, Instagram } from './styles';

//  components
import Avatar from '../avatar';

const DrawerHeader: React.FC = () => {
  const { user, isAvatarLoading } = useSelector<IState, IUserState>(
    state => state.user,
  );

  return (
    <Container>
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
        <Avatar avatar={user?.avatar} />
      )}
      <StyledName>{user?.name}</StyledName>
      <Instagram>@{user?.instagram?.userName}</Instagram>
    </Container>
  );
};

export default memo(DrawerHeader);
