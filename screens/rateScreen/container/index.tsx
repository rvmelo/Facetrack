import React from 'react';

import { ActivityIndicator } from 'react-native';

// i18n
import { translate } from '../../../i18n/src/locales';

//  hooks
import { useList } from '../useList';

//   constants
import Colors from '../../../constants/colors';
import { ActivityIndicatorContainer } from './styles';
import UsersList from './usersList';

//  components
import { IntroModal } from '../../../components/introModal';

const RateScreen: React.FC = () => {
  const { listItems, isLoading, handleUsersRequest } = useList();

  return isLoading ? (
    <ActivityIndicatorContainer>
      <ActivityIndicator
        color={Colors.primary}
        size="large"
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
        }}
      />
    </ActivityIndicatorContainer>
  ) : (
    <>
      <IntroModal iconName="md-person" text={translate('rateUserIntro')} />
      <UsersList
        listItems={listItems}
        handleUsersRequest={handleUsersRequest}
      />
    </>
  );
};

export default RateScreen;
