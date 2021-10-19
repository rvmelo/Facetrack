import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//  constants
import Colors from '../../../constants/colors';

//  styles
import { Container, InputContainer, StyledInput } from './styles';

//  hooks
import { useSearchScreen } from '../useSearchScreen';
import { UsersList } from './usersList';

export const SearchScreen: React.FC = () => {
  const { users, debounceSearchUsers, isLoading } = useSearchScreen();

  return (
    <Container>
      <InputContainer>
        <Ionicons
          name="md-search"
          size={25}
          style={{ marginLeft: 5, marginRight: 10 }}
          color={Colors.accent}
        />
        <StyledInput
          placeholder="Search"
          placeholderTextColor={Colors.disabled}
          onChangeText={text => debounceSearchUsers(text)}
        />
      </InputContainer>
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          color={Colors.primary}
          size="large"
        />
      ) : (
        <UsersList users={users} />
      )}
    </Container>
  );
};
