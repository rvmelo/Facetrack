import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

//  styles
import { Container, AvatarContainer, TouchableInterface } from './styles';

// constants
import Colors from '../../../constants/colors';

//  hooks
import useEditProfile from '../useEditProfile';

//  components
import AvatarContent from './avatarContent';

const EditProfileScreen: React.FC = () => {
  const { handleAvatarUpdate, isLoading } = useEditProfile();

  const user = useSelector<IState, IUser>(state => state.user);

  return (
    <Container>
      <TouchableInterface onPress={handleAvatarUpdate}>
        <AvatarContainer>
          {isLoading ? (
            <ActivityIndicator color={Colors.primary} size="large" />
          ) : (
            <AvatarContent avatar={user?.avatar} />
          )}
        </AvatarContainer>
      </TouchableInterface>
    </Container>
  );
};

export default memo(EditProfileScreen);
