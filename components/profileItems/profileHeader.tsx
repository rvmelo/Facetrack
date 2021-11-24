import React, { memo } from 'react';
import { differenceInYears } from 'date-fns';

//  styles
import { StyledText } from './styles';

// components
import { Header } from './header';
import { ProfileButton } from './profileButton';

//  redux
import { IUser } from '../../store/modules/user/types';

//  i18n
import { translate } from '../../i18n/src/locales';
import { translateRelationshipStatus } from '../../services/translation';

interface ProfileHeaderProps {
  user: IUser;
  // eslint-disable-next-line no-unused-vars
  setModalVisible: (value: boolean) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = memo(
  ({ user, setModalVisible }) => {
    const years = user?.birthDate
      ? differenceInYears(new Date(), new Date(user?.birthDate))
      : -1;

    return (
      <>
        <Header
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
          onPress={() => setModalVisible(true)}
          text={translate('rate')}
        />
      </>
    );
  },
);
