import React from 'react';

import { ActivityIndicator } from 'react-native';

//  hooks
import { useList } from '../useList';

//   constants
import Colors from '../../../constants/colors';
import { ActivityIndicatorContainer } from './styles';
import UsersList from './usersList';

const RateScreen: React.FC = () => {
  const { listItems, setPage, isLoading, handleUsersRequest } = useList();

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
    <UsersList
      setPage={setPage}
      listItems={listItems}
      handleUsersRequest={handleUsersRequest}
    />
  );
};

export default RateScreen;
