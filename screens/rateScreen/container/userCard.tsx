import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ViewStyle } from 'react-native';

//  navigation
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EvaluationStackParamList } from '../../../routes/types';

//  redux
import { IUser, MEDIA_TYPES } from '../../../store/modules/user/types';

//  i18n
import { translate } from '../../../i18n/src/locales';

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

type NavigationProps = StackNavigationProp<
  EvaluationStackParamList,
  'RateScreen'
>;

interface UserCardProps {
  user: IUser;
  cardData: {
    cardIndex: number;
    isLastItem: boolean;
  };
  cardStyle: ViewStyle;
  // eslint-disable-next-line no-unused-vars
  handleListScrollBack: ({ index }: ScrollProps) => void;
  // eslint-disable-next-line no-unused-vars
  handleListScroll: ({ index }: ScrollProps) => void;
}

export const UserCard: React.FC<UserCardProps> = memo(
  ({ user, cardData, cardStyle, handleListScrollBack, handleListScroll }) => {
    const bottomTabHeight = useBottomTabBarHeight();

    const navigation = useNavigation<NavigationProps>();

    const selectedUri = user?.instagram?.userMedia?.find(
      media => media.media_type !== MEDIA_TYPES.video,
    );

    const uri = selectedUri ? selectedUri?.media_url : undefined;

    const userName = user?.name ? user?.name : '';
    const instagram = user?.instagram?.userName
      ? user?.instagram?.userName
      : '';

    return (
      <TouchableCard
        onPress={() => navigation.navigate('RandomUserScreen', { user })}
      >
        <CardContainer bottomTabHeight={bottomTabHeight} style={[cardStyle]}>
          <StyledImage
            source={uri ? { uri } : require('../../../assets/instagram.png')}
          >
            <InfoContainer>
              <RowDataContainer>
                <InfoRow>
                  <Ionicons name="md-person" color={Colors.accent} />
                  <ImageText numberOfLines={1}>{userName}</ImageText>
                </InfoRow>
                <InfoRow>
                  <Ionicons name="md-logo-instagram" color={Colors.accent} />
                  <ImageText numberOfLines={1}>{instagram}</ImageText>
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
            <CardBottomText>{translate('viewInstagram')}</CardBottomText>
          </CardBottom>
        </CardContainer>
      </TouchableCard>
    );
  },
);
