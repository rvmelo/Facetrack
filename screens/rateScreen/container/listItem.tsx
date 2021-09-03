/* eslint-disable no-unused-vars */
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

//  hooks
import { useHeaderHeight } from '@react-navigation/elements';

//   styles
import {
  BackButton,
  CardContainer,
  ItemText,
  ItemTextContainer,
  ListItemContainer,
  StyledImage,
} from './styles';

// components
import ButtonPanel from './buttonPanel';
import { ListAnimationProps, ScrollBackProps } from '../useListActions';

//  constants
import Colors from '../../../constants/colors';

//  hooks
import { useListItem } from '../useListItem';

interface ListItemProps {
  cardData: {
    uri: string | undefined;
    cardIndex: number;
    isLastItem: boolean;
  };
  handleListAnimation(value: ListAnimationProps): void;
  handleListScrollBack({ index }: ScrollBackProps): void;
}

export const ListItem: React.FC<ListItemProps> = ({
  cardData,
  handleListAnimation,
  handleListScrollBack,
}) => {
  const headerHeight = useHeaderHeight();

  const { rate, handleUserEvaluation, cardStyle, cardOpacity, textStyle } =
    useListItem();

  return (
    <ListItemContainer headerHeight={headerHeight}>
      <CardContainer style={[cardStyle]}>
        <StyledImage source={{ uri: cardData.uri }} />
      </CardContainer>

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
          rate={rate}
        />
      )}
      {cardData.cardIndex > 0 && (
        <BackButton
          onPress={() =>
            handleListScrollBack({
              index: cardData.cardIndex,
            })
          }
        >
          <FontAwesome5
            name="undo"
            size={40}
            color={Colors.primary}
            style={{ marginBottom: 10 }}
          />
        </BackButton>
      )}
    </ListItemContainer>
  );
};
