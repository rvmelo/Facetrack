import React, { memo } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

//  i18n
import { translate } from '../../../i18n/src/locales';

//  constants
import Colors from '../../../constants/colors';

import {
  Container,
  DeleteButtonLayout,
  TouchableButton,
  ButtonText,
  ItemContainer,
  ItemText,
  SettingsWrapper,
  ItemsContainer,
  LogoutContainer,
} from './styles';

//  hooks
import useSettings from '../useSettings';
import useAuth from '../../../hooks/useAuth';

const SettingsScreen: React.FC = () => {
  const {
    handleUserDeletion,
    isLoading,
    notificationSettings,
    toggleNotification,
    toggleNotificationSound,
  } = useSettings();
  const { signOut } = useAuth();

  return (
    <Container>
      <SettingsWrapper>
        <ItemsContainer>
          <ItemContainer>
            <ItemText>Toggle Notification: </ItemText>
            <Switch
              trackColor={{
                false: Colors.disabled,
                true: 'rgb(3, 160, 98, 0.9)',
              }}
              thumbColor={
                notificationSettings?.shouldShowAlert
                  ? Colors.primary
                  : Colors.accent
              }
              onValueChange={toggleNotification}
              value={notificationSettings?.shouldShowAlert}
            />
          </ItemContainer>
          <ItemContainer>
            <ItemText>Toggle Notification Sound: </ItemText>
            <Switch
              trackColor={{
                false: Colors.disabled,
                true: 'rgb(3, 160, 98, 0.9)',
              }}
              disabled={!notificationSettings?.shouldShowAlert}
              thumbColor={
                notificationSettings?.shouldPlaySound &&
                notificationSettings?.shouldShowAlert
                  ? Colors.primary
                  : Colors.accent
              }
              onValueChange={toggleNotificationSound}
              value={
                notificationSettings?.shouldPlaySound &&
                notificationSettings?.shouldShowAlert
              }
            />
          </ItemContainer>
        </ItemsContainer>
        <TouchableWithoutFeedback onPress={signOut}>
          <LogoutContainer>
            <Ionicons
              name="md-log-out-outline"
              size={20}
              color={Colors.accent}
            />
            <ItemText>{translate('Logout')}</ItemText>
          </LogoutContainer>
        </TouchableWithoutFeedback>
      </SettingsWrapper>

      <TouchableButton
        onPress={() =>
          Alert.alert('Error', translate('deleteAccountQuestion'), [
            { text: translate('yes'), onPress: () => handleUserDeletion() },
            { text: translate('no'), onPress: () => undefined },
          ])
        }
      >
        {isLoading ? (
          <DeleteButtonLayout>
            <ActivityIndicator color={Colors.primary} size="large" />
          </DeleteButtonLayout>
        ) : (
          <DeleteButtonLayout primaryColor={Colors.alert}>
            <ButtonText>{translate('deleteAccount')}</ButtonText>
          </DeleteButtonLayout>
        )}
      </TouchableButton>
    </Container>
  );
};

export default memo(SettingsScreen);
