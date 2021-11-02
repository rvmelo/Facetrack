import React from 'react';

import { EmptyContainer, ScreenText, SmallScreenText } from './styles';

interface EmptyComponentProps {
  title: string;
  message: string;
}

export const EmptyList: React.FC<EmptyComponentProps> = ({
  title,
  message,
}) => {
  return (
    <EmptyContainer>
      <ScreenText>{title}</ScreenText>
      <SmallScreenText>{message}</SmallScreenText>
    </EmptyContainer>
  );
};
