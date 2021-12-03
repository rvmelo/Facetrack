import React, { memo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

import { differenceInYears } from 'date-fns';

// navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../routes/types';

import { IUser } from '../../../store/modules/user/types';

//  styles
import { ProfileDataContainer, StyledText } from './styles';

// components
import { ProfileButton } from '../../../components/profileItems/profileButton';
import { Header } from '../../../components/profileItems/header';

// i18n
import { translate } from '../../../i18n/src/locales';
import { translateRelationshipStatus } from '../../../services/translation';

interface ListHeaderProps {
  user: IUser;
  isAvatarLoading: boolean;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
}

type NavigationProps = StackNavigationProp<
  ProfileStackParamList,
  'ProfileScreen'
>;

export const ListHeaderComponent: React.FC<ListHeaderProps> = memo(
  ({ user, isAvatarLoading, refreshing, onRefresh }) => {
    const navigation = useNavigation<NavigationProps>();

    const years = user?.birthDate
      ? differenceInYears(new Date(), new Date(user?.birthDate))
      : -1;

    return (
      <ProfileDataContainer>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Header
            isAvatarLoading={isAvatarLoading}
            avatar={user?.avatar}
            name={user?.name}
            rate={user?.rate?.toFixed(2)}
          />

          <StyledText>@{user?.instagram?.userName}</StyledText>
          {years >= 0 && (
            <StyledText>
              {years} {translate('years')}
            </StyledText>
          )}
          <StyledText>
            {translate(
              user?.sexualOrientation || 'undefined',
            ).toLocaleLowerCase()}
          </StyledText>
          <StyledText>
            {translateRelationshipStatus({
              status: user?.relationshipStatus,
              sex: user?.sex,
            })}
          </StyledText>

          <ProfileButton
            onPress={() => navigation.navigate('EditProfile')}
            text={translate('editProfile')}
          />
        </ScrollView>
      </ProfileDataContainer>
    );
  },
);
