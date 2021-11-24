/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

//  i18n
import I18n from 'i18n-js';

// navigation
import {
  useRoute,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';

//  hooks
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

//  redux
import { IUser } from '../../../store/modules/user/types';

//   styles
import { ItemText, ItemTextContainer, ListItemContainer } from './styles';

// components
import ButtonPanel from './buttonPanel';
import { ListAnimationProps, ScrollProps } from '../useListActions';

//  hooks
import { useListItem } from '../useListItem';
import { UserCard } from './userCard';

interface ListItemProps {
  user: IUser;
  cardData: {
    cardIndex: number;
    isLastItem: boolean;
  };
  handleListAnimation(value: ListAnimationProps): void;
  handleListScrollBack({ index }: ScrollProps): void;
  handleListScroll({ index }: ScrollProps): void;
}

interface RouteParams {
  value: number;
  userProviderId: string;
  message?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  user,
  cardData,
  handleListAnimation,
  handleListScrollBack,
  handleListScroll,
}) => {
  const bottomTabHeight = useBottomTabBarHeight();

  const route = useRoute();

  const navigation = useNavigation();

  const { rate, handleUserEvaluation, cardStyle, cardOpacity, textStyle } =
    useListItem();

  useEffect(() => {
    if (!route?.params) return;

    const { value, userProviderId, message } = route.params as RouteParams;

    if (!value || !userProviderId) return;

    if (user?.userProviderId !== userProviderId) return;

    handleListAnimation({
      index: cardData.cardIndex,
      isLastItem: cardData.isLastItem,
      opacity: cardOpacity,
    });
    handleUserEvaluation({ cardUserId: user?.userProviderId, value, message });

    navigation.dispatch({
      ...CommonActions.setParams({
        value: undefined,
        userProviderId: undefined,
      }),
      source: route.key,
    });
  }, [
    route.key,
    navigation,
    cardData,
    handleUserEvaluation,
    handleListAnimation,
    cardOpacity,
    route.params,
    user?.userProviderId,
  ]);

  return (
    <ListItemContainer bottomTabHeight={bottomTabHeight}>
      <UserCard
        user={user}
        cardData={cardData}
        handleListScrollBack={handleListScrollBack}
        handleListScroll={handleListScroll}
        cardStyle={cardStyle}
      />

      <ItemTextContainer bottomTabHeight={bottomTabHeight} style={[textStyle]}>
        <ItemText>
          {I18n.t('ratedUser', {
            rate,
          })}
        </ItemText>
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
          userId={user?.userProviderId}
          rate={rate}
        />
      )}
    </ListItemContainer>
  );
};
