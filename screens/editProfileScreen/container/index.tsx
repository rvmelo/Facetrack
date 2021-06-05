/* eslint-disable @typescript-eslint/no-unused-vars */
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
  TouchableButton,
  ButtonLayout,
  InstagramButtonLayout,
  TouchableInterface,
  ButtonText,
} from './styles';

// constants
import { base_url } from '../../../constants/backend';
import Colors from '../../../constants/colors';

//  hooks
import useEditProfile from '../useEditProfile';
import useInstagram from '../../../hooks/useInstagram';

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

  const { handleInstagramRefresh } = useInstagram();

  const { user, isAvatarLoading, isUserMediaLoading } = useSelector<
    IState,
    IUserState
  >(state => state.user);

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
      <TouchableButton onPress={handleAvatarUpdate}>
        <ButtonLayout>
          <Ionicons name="md-camera-outline" size={25} color="white" />
          <ButtonText>Add Photo</ButtonText>
        </ButtonLayout>
      </TouchableButton>

      <PickerSection
        setUserInfo={setUserInfo}
        setShouldUpdate={setShouldUpdate}
        userInfo={userInfo}
      />

      {isUserMediaLoading ? (
        <InstagramButtonLayout>
          <ActivityIndicator color={Colors.primary} size="large" />
        </InstagramButtonLayout>
      ) : (
        <TouchableButton onPress={handleInstagramRefresh}>
          <InstagramButtonLayout primaryColor={Colors.primary}>
            <Ionicons name="md-logo-instagram" size={25} color="white" />
            <ButtonText>Refresh Instagram</ButtonText>
          </InstagramButtonLayout>
        </TouchableButton>
      )}
    </Container>
  );
};

export default memo(EditProfileScreen);
