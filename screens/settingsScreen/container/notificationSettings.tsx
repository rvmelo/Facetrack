import React, { memo } from 'react';
import { Switch } from 'react-native';

//  i18n
import { translate } from '../../../i18n/src/locales';

import { NotificationData } from '../useSettings';

//  constants
import Colors from '../../../constants/colors';

import { ItemContainer, ItemText } from './styles';

interface NotificationSettingsProps {
  notificationSettings: NotificationData;
  toggleNotification: () => void;
  toggleNotificationSound: () => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = memo(
  ({ notificationSettings, toggleNotification, toggleNotificationSound }) => {
    return (
      <>
        <ItemContainer>
          <ItemText>{translate('enableNotification')}: </ItemText>
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
          <ItemText>{translate('enableNotificationSound')}: </ItemText>
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
      </>
    );
  },
);
