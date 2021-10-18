import React from 'react';

import { Container, EmptyScreenText } from './styles';

export const EmptyComponent: React.FC = () => {
  return (
    <Container>
      <EmptyScreenText>No users found</EmptyScreenText>
    </Container>
  );
};
