import React, { useEffect, memo } from 'react';

// redux
import { useSelector } from 'react-redux';
import { IState } from '../../../../store';
import { IUser } from '../../../../store/modules/user/types';

// styles
import { Container } from './styles';

import InstagramButton from './instagramButton';

const InstagramScreen: React.FC = () => {
  const user = useSelector<IState, IUser>(state => state.user);

  useEffect(() => {
    console.log('user: ', user);
  }, [user]);

  return (
    <Container>
      <InstagramButton
        onPress={() =>
          console.log('should call api and create user on database')
        }
      />
    </Container>
  );
};

export default memo(InstagramScreen);
