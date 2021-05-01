import React from 'react';
import { useSelector } from 'react-redux';

// styles
import { Container, StyledSpinner } from './styles';

//  hooks
import useAuth from '../hooks/useAuth';

//  redux
import { IState } from '../store';
import { IUser } from '../store/modules/user/types';

//  navigation routes
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { isLoading } = useAuth();

  const user = useSelector<IState, IUser>(state => state.user);

  if (isLoading) {
    return (
      <Container>
        <StyledSpinner />
      </Container>
    );
  }

  return user.userProviderId ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
