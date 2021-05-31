/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import { IUserState } from '../../../store/modules/user/types';

//  styles
import {
  Container,
  AvatarContainer,
  AddPhotoButton,
  ButtonLayout,
  TouchableInterface,
  ButtonText,
} from './styles';

// constants
import { base_url } from '../../../constants/backend';
import Colors from '../../../constants/colors';

//  hooks
import useEditProfile from '../useEditProfile';

//  components
import AvatarContent from './avatarContent';
import PickerSection from './pickerSection';

const EditProfileScreen: React.FC = () => {
  const {
    handleAvatarUpdate,
    userInfo,
    setUserInfo,
    setShouldUpdate,
  } = useEditProfile();

  const { user, isAvatarLoading } = useSelector<IState, IUserState>(
    state => state.user,
  );

  return (
    <Container>
      <TouchableInterface onPress={handleAvatarUpdate}>
        <AvatarContainer>
          {isAvatarLoading ? (
            <ActivityIndicator color={Colors.primary} size="large" />
          ) : (
            <AvatarContent
              avatarUri={
                user?.avatar ? `${base_url}/files/${user?.avatar}` : ''
              }
            />
          )}
        </AvatarContainer>
      </TouchableInterface>
      <AddPhotoButton onPress={handleAvatarUpdate}>
        <ButtonLayout>
          <Ionicons name="md-camera" size={25} color="white" />
          <ButtonText>Add Photo</ButtonText>
        </ButtonLayout>
      </AddPhotoButton>

      <PickerSection
        setUserInfo={setUserInfo}
        setShouldUpdate={setShouldUpdate}
        userInfo={userInfo}
      />
    </Container>
  );
};

export default memo(EditProfileScreen);
