/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';

//  hooks
import { useHeaderHeight } from '@react-navigation/elements';

//   styles
import {
  BackButton,
  ItemText,
  ItemTextContainer,
  ListItemContainer,
  StyledImage,
} from './styles';

// components
import ButtonPanel from './buttonPanel';
import { EvaluationProps, ScrollBackProps } from '../useListActions';

//  constants
import Colors from '../../../constants/colors';

interface ListItemProps {
  uri: string;
  previousCardOpacity: Animated.SharedValue<number> | undefined;
  cardData: {
    cardOpacity: Animated.SharedValue<number> | undefined;
    cardStyle: ViewStyle | undefined;
    cardIndex: number;
  };
  // eslint-disable-next-line no-unused-vars
  handleUserEvaluation(value: EvaluationProps): void;
  // eslint-disable-next-line no-unused-vars
  handleListScrollBack({ index, opacity }: ScrollBackProps): void;
}

const cardOrigin = {
  x:
    Dimensions.get('window').width / 2 -
    (Dimensions.get('window').width * 0.9) / 2,
  y:
    Dimensions.get('window').height / 2 -
    (Dimensions.get('window').height * 0.8) / 2,
};

export const ListItem: React.FC<ListItemProps> = ({
  uri,
  cardData,
  previousCardOpacity,
  handleUserEvaluation,
  handleListScrollBack,
}) => {
  const headerHeight = useHeaderHeight();

  const [rate, setRate] = useState(0);

  return (
    <ListItemContainer headerHeight={headerHeight}>
      <Animated.View style={[styles.cardContainer, cardData.cardStyle]}>
        <StyledImage source={{ uri }} />
      </Animated.View>
      <ItemTextContainer>
        <ItemText>Rated</ItemText>
        <ItemText>User ${rate} stars</ItemText>
      </ItemTextContainer>
      {cardData.cardOpacity && (
        <ButtonPanel
          handleUserEvaluation={handleUserEvaluation}
          opacity={cardData.cardOpacity}
          index={cardData.cardIndex}
          rate={rate}
          setRate={setRate}
        />
      )}
      {cardData.cardIndex > 0 && previousCardOpacity && (
        <BackButton
          onPress={() =>
            handleListScrollBack({
              index: cardData.cardIndex,
              opacity: previousCardOpacity,
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

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: '60%',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'absolute',
    left: cardOrigin.x,
    top: cardOrigin.y,
    opacity: 1,
    zIndex: 2,
  },
});
