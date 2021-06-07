import React, { memo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

//  constants
import Colors from '../../../constants/colors';

import {
  Container,
  DeleteButtonLayout,
  TouchableButton,
  ButtonText,
} from './styles';

//  hooks
import useSettings from '../useSettings';

const SettingsScreen: React.FC = () => {
  const { handleUserDeletion, isLoading } = useSettings();

  return (
    <Container>
      <TouchableButton
        onPress={() =>
          Alert.alert(
            'Error',
            'Are you sure you want to delete your account?',
            [
              { text: 'Yes', onPress: () => handleUserDeletion() },
              { text: 'No', onPress: () => undefined },
            ],
          )
        }
      >
        {isLoading ? (
          <DeleteButtonLayout>
            <ActivityIndicator color={Colors.primary} size="large" />
          </DeleteButtonLayout>
        ) : (
          <DeleteButtonLayout primaryColor={Colors.alert}>
            <ButtonText>Delete Account</ButtonText>
          </DeleteButtonLayout>
        )}
      </TouchableButton>
    </Container>
  );
};

export default memo(SettingsScreen);
