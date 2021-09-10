/* eslint-disable no-unused-vars */
import React from 'react';

//  hooks
import { useHeaderHeight } from '@react-navigation/elements';

//   styles
import { ItemText, ItemTextContainer, ListItemContainer } from './styles';

// components
import ButtonPanel from './buttonPanel';
import { ListAnimationProps, ScrollProps } from '../useListActions';

//  hooks
import { useListItem } from '../useListItem';
import { UserCard } from './userCard';

interface ListItemProps {
  cardData: {
    uri: string | undefined;
    cardUserId: string;
    cardIndex: number;
    isLastItem: boolean;
    instaNick: string | undefined;
    name: string | undefined;
  };
  handleListAnimation(value: ListAnimationProps): void;
  handleListScrollBack({ index }: ScrollProps): void;
  handleListScroll({ index }: ScrollProps): void;
}

export const ListItem: React.FC<ListItemProps> = ({
  cardData,
  handleListAnimation,
  handleListScrollBack,
  handleListScroll,
}) => {
  const headerHeight = useHeaderHeight();

  const { rate, handleUserEvaluation, cardStyle, cardOpacity, textStyle } =
    useListItem();

  return (
    <ListItemContainer headerHeight={headerHeight}>
      <UserCard
        cardData={cardData}
        handleListScrollBack={handleListScrollBack}
        handleListScroll={handleListScroll}
        cardStyle={cardStyle}
      />

      <ItemTextContainer style={[textStyle]}>
        <ItemText>Rated</ItemText>
        <ItemText>User ${rate} stars</ItemText>
      </ItemTextContainer>

      {cardOpacity && (
        <ButtonPanel
          onListAnimation={() =>
            handleListAnimation({
              index: cardData.cardIndex,
              isLastItem: cardData.isLastItem,
              opacity: cardOpacity,
            })
          }
          onUserEvaluation={handleUserEvaluation}
          userId={cardData.cardUserId}
          rate={rate}
        />
      )}
    </ListItemContainer>
  );
};
