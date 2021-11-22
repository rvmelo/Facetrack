import React from 'react';

import { ActivityIndicator } from 'react-native';

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
      <IntroModal
        iconName="md-person"
        text="On this screen, you can rate random users from 1 to 5 stars. It is also possible to view the user's Instagram profile. On the user's profile, you can leave a rating with an optional message."
      />
      <UsersList
        listItems={listItems}
        handleUsersRequest={handleUsersRequest}
      />
    </>
  );
};

export default RateScreen;
