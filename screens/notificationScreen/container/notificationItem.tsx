import React, { memo } from 'react';

//  components
import Avatar from '../../../components/avatar/index';

//  styles
import {
  HeaderText,
  InstagramText,
  ItemContainer,
  ItemText,
  TextContainer,
  TouchableItem,
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
  isRead: boolean | undefined;
  evaluationId: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = memo(
  ({ fromUser, evaluationId, isRead, updated_at, value }) => {
    const { avatar, name, instaName, userProviderId } = fromUser;

    const { handleItemPress } = useNotificationItem({
      userProviderId,
      evaluationId,
      isRead,
    });

    return (
      <TouchableItem onPress={handleItemPress}>
        <ItemContainer isRead={isRead}>
          <Avatar avatar={avatar} />
          <TextContainer>
            <InstagramText>{updated_at} </InstagramText>
            <ItemText>
              <HeaderText>{name} </HeaderText>
              <InstagramText>@{instaName}</InstagramText>
            </ItemText>
            <ItemText>
              {name} has rated you with {value} stars
            </ItemText>
          </TextContainer>
        </ItemContainer>
      </TouchableItem>
    );
  },
);
