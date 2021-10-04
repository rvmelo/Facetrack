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
  ItemContainer,
  ItemText,
  ItemsContainer,
} from './styles';

//  hooks
import useSettings from '../useSettings';
import useAuth from '../../../hooks/useAuth';

const SettingsScreen: React.FC = () => {
  const { handleUserDeletion, isLoading } = useSettings();
  const { signOut } = useAuth();

  return (
    <Container>
      <ItemsContainer>
        <TouchableWithoutFeedback onPress={signOut}>
          <ItemContainer>
            <Ionicons
              name="md-log-out-outline"
              size={20}
              color={Colors.accent}
            />
            <ItemText>{translate('Logout')}</ItemText>
          </ItemContainer>
        </TouchableWithoutFeedback>
      </ItemsContainer>

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
