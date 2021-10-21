import React from 'react';

import { EmptyContainer, ScreenText, SmallScreenText } from './styles';

//  i18n
import { translate } from '../../../i18n/src/locales';

export const EmptyComponent: React.FC = () => {
  return (
    <EmptyContainer>
      <ScreenText>{translate('notificationsNotFound')}</ScreenText>
      <SmallScreenText>{translate('notificationInfo')}</SmallScreenText>
    </EmptyContainer>
  );
};
