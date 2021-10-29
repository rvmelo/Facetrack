import React, { memo } from 'react';

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

interface ListHeaderProps {
  user: IUser;
  isAvatarLoading: boolean;
}

type NavigationProps = StackNavigationProp<
  ProfileStackParamList,
  'ProfileScreen'
>;

export const ListHeaderComponent: React.FC<ListHeaderProps> = memo(
  ({ user, isAvatarLoading }) => {
    const navigation = useNavigation<NavigationProps>();

    return (
      <ProfileDataContainer>
        <Header
          isAvatarLoading={isAvatarLoading}
          avatar={user?.avatar}
          name={user?.name}
          rate={user?.rate?.toFixed(2)}
        />

        <StyledText>@{user?.instagram?.userName}</StyledText>
        <StyledText>{user?.sexualOrientation}</StyledText>
        <StyledText>{user?.relationshipStatus}</StyledText>
        {/* <StyledText>{user?.birthDate}</StyledText> */}

        <ProfileButton
          onPress={() => navigation.navigate('EditProfile')}
          text={translate('editProfile')}
        />
      </ProfileDataContainer>
    );
  },
);
