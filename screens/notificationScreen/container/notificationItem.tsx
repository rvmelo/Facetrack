import React, { memo } from 'react';

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
}

export const NotificationItem: React.FC<NotificationItemProps> = memo(
  ({ fromUser, evaluationId, updated_at, value, isNotificationRead }) => {
    const { avatar, name, instaName, userProviderId } = fromUser;

    const { handleItemPress, isRead } = useNotificationItem({
      userProviderId,
      evaluationId,
      isNotificationRead,
    });

    return (
      <TouchableItem onPress={handleItemPress}>
        <ItemContainer isRead={isRead}>
          <Avatar avatar={avatar} />
          <TextContainer>
            <StyledDate>
              {formatDate(updated_at)}, {getHoursFromDate(updated_at)}
            </StyledDate>
            <ItemText numberOfLines={1}>
              <HeaderText>{name} </HeaderText>
              <InstagramText>@{instaName}</InstagramText>
            </ItemText>
            <ItemText numberOfLines={2}>
              {name.split(' ')[0]} has rated you with {value} stars
            </ItemText>
          </TextContainer>
        </ItemContainer>
      </TouchableItem>
    );
  },
);
