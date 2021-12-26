import React from 'react';

import { Container, ScreenText } from './styles';

export const EmptyComponent: React.FC = () => {
  return (
    <Container>
      <ScreenText>No users found</ScreenText>
    </Container>
  );
};
