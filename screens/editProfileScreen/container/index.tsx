/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react';

import { Ionicons } from '@expo/vector-icons';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

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
    localAvatarUri,
  } = useEditProfile();

  const user = useSelector<IState, IUser>(state => state.user);

  return (
    <Container>
      <TouchableInterface onPress={handleAvatarUpdate}>
        <AvatarContainer>
          <AvatarContent
            avatarUri={
              localAvatarUri ||
              (user?.avatar ? `${base_url}/files/${user?.avatar}` : '')
            }
          />
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
