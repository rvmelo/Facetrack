/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

// navigation
import { useRoute } from '@react-navigation/native';

//  hooks
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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

interface RouteParams {
  value: number;
  userProviderId: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  cardData,
  handleListAnimation,
  handleListScrollBack,
  handleListScroll,
}) => {
  const bottomTabHeight = useBottomTabBarHeight();

  const route = useRoute();

  const { rate, handleUserEvaluation, cardStyle, cardOpacity, textStyle } =
    useListItem();

  useEffect(() => {
    if (!route?.params) return;

    const { value, userProviderId } = route.params as RouteParams;

    if (cardData.cardUserId !== userProviderId) return;

    handleListAnimation({
      index: cardData.cardIndex,
      isLastItem: cardData.isLastItem,
      opacity: cardOpacity,
    });
    handleUserEvaluation({ cardUserId: cardData.cardUserId, value });
  }, [
    cardData,
    handleUserEvaluation,
    handleListAnimation,
    cardOpacity,
    route.params,
  ]);

  return (
    <ListItemContainer bottomTabHeight={bottomTabHeight}>
      <UserCard
        cardData={cardData}
        handleListScrollBack={handleListScrollBack}
        handleListScroll={handleListScroll}
        cardStyle={cardStyle}
      />

      <ItemTextContainer bottomTabHeight={bottomTabHeight} style={[textStyle]}>
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
