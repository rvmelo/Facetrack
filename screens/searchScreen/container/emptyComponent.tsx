import React from 'react';

import { EmptyContainer, ScreenText, SmallScreenText } from './styles';

export const EmptyComponent: React.FC = () => {
  return (
    <EmptyContainer>
      <ScreenText>Search users</ScreenText>
      <SmallScreenText>Search users by name or by instagram</SmallScreenText>
    </EmptyContainer>
  );
};
