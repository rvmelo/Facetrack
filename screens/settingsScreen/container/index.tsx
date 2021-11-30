import React, { memo } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
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
  LogoutText,
  SettingsWrapper,
  ItemsContainer,
  LogoutContainer,
} from './styles';

//  hooks
import useSettings from '../useSettings';
import useAuth from '../../../hooks/useAuth';
import { NotificationSettings } from './notificationSettings';

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
          <NotificationSettings
            notificationSettings={notificationSettings}
            toggleNotification={toggleNotification}
            toggleNotificationSound={toggleNotificationSound}
          />
        </ItemsContainer>
        <TouchableWithoutFeedback onPress={signOut}>
          <LogoutContainer>
            <Ionicons
              name="md-log-out-outline"
              size={20}
              color={Colors.accent}
            />
            <LogoutText>{translate('Logout')}</LogoutText>
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
