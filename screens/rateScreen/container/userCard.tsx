import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ViewStyle } from 'react-native';

//   styles
import {
  CardContainer,
  StyledImage,
  InfoRow,
  ImageText,
  CardBottom,
  CardBottomText,
  TouchableCard,
  InfoContainer,
  RowDataContainer,
  IconButtonContainer,
} from './styles';

//  components
import { IconButton } from './iconButton';

//  constants
import Colors from '../../../constants/colors';
import { ScrollProps } from '../useListActions';

interface UserCardProps {
  cardData: {
    uri: string | undefined;
    cardUserId: string;
    cardIndex: number;
    isLastItem: boolean;
    instaNick: string | undefined;
    name: string | undefined;
  };
  cardStyle: ViewStyle;
  // eslint-disable-next-line no-unused-vars
  handleListScrollBack: ({ index }: ScrollProps) => void;
  // eslint-disable-next-line no-unused-vars
  handleListScroll: ({ index }: ScrollProps) => void;
}

export const UserCard: React.FC<UserCardProps> = memo(
  ({ cardData, cardStyle, handleListScrollBack, handleListScroll }) => {
    return (
      <TouchableCard onPress={() => console.log('pressing')}>
        <CardContainer style={[cardStyle]}>
          <StyledImage source={{ uri: cardData.uri }}>
            <InfoContainer>
              <RowDataContainer>
                <InfoRow>
                  <Ionicons name="md-person" color={Colors.accent} />
                  <ImageText>{cardData.name}</ImageText>
                </InfoRow>
                <InfoRow>
                  <Ionicons name="md-logo-instagram" color={Colors.accent} />
                  <ImageText>{cardData.instaNick}</ImageText>
                </InfoRow>
              </RowDataContainer>
              <IconButtonContainer>
                {cardData.cardIndex > 0 && (
                  <IconButton
                    onPress={() =>
                      handleListScrollBack({
                        index: cardData.cardIndex,
                      })
                    }
                    iconName="md-arrow-up"
                  />
                )}

                <IconButton
                  onPress={() =>
                    handleListScroll({
                      index: cardData.cardIndex,
                      isLastItem: cardData.isLastItem,
                    })
                  }
                  iconName="md-arrow-down"
                />
              </IconButtonContainer>
            </InfoContainer>
          </StyledImage>
          <CardBottom>
            <CardBottomText>View Instagram</CardBottomText>
          </CardBottom>
        </CardContainer>
      </TouchableCard>
    );
  },
);
