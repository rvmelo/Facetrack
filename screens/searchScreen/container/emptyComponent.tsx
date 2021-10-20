import React from 'react';

import { EmptyContainer, ScreenText, SmallScreenText } from './styles';

//  i18n
import { translate } from '../../../i18n/src/locales';

interface EmptyComponentProps {
  isSearchStarted: boolean;
}

export const EmptyComponent: React.FC<EmptyComponentProps> = ({
  isSearchStarted,
}) => {
  return (
    <EmptyContainer>
      <ScreenText>
        {isSearchStarted ? translate('noUsersFound') : translate('searchUsers')}
      </ScreenText>
      <SmallScreenText>{translate('searchInfo')}</SmallScreenText>
    </EmptyContainer>
  );
};
