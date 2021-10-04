import React, { memo } from 'react';

//  i18n
import I18n from 'i18n-js';

//  components
import Avatar from '../../../components/avatar/index';

// services
import { formatDate, getHoursFromDate } from '../../../services/date';

//  styles
import {
  HeaderText,
  InstagramText,
  ItemContainer,
  ItemText,
  TextContainer,
  TouchableItem,
  StyledDate,
} from './styles';

//  hooks
import { useNotificationItem } from './useNotificationItem';

interface NotificationItemProps {
  fromUser: {
    name: string;
    avatar: string;
    instaName: string;
    userProviderId: string;
  };
  updated_at: string;
  value: number;
  isNotificationRead: boolean | undefined;
  evaluationId: string;
  itemHeight: number;
}

export const NotificationItem: React.FC<NotificationItemProps> = memo(
  ({
    fromUser,
    evaluationId,
    updated_at,
    value,
    isNotificationRead,
    itemHeight,
  }) => {
    const { avatar, name, instaName, userProviderId } = fromUser;

    const { handleItemPress, isRead } = useNotificationItem({
      userProviderId,
      evaluationId,
      isNotificationRead,
    });

    return (
      <TouchableItem onPress={handleItemPress}>
        <ItemContainer isRead={isRead} height={itemHeight}>
          <Avatar avatar={avatar} />
          <TextContainer>
            <StyledDate>
              {formatDate(updated_at)}, {getHoursFromDate(updated_at)}
            </StyledDate>
            <ItemText numberOfLines={1}>
              <HeaderText>{name} </HeaderText>
              <InstagramText>@{instaName}</InstagramText>
            </ItemText>
            <ItemText numberOfLines={3}>
              {I18n.t('userEvaluation', { name: name.split(' ')[0], value })}
            </ItemText>
          </TextContainer>
        </ItemContainer>
      </TouchableItem>
    );
  },
);
