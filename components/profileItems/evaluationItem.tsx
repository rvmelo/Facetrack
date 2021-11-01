import React, { memo } from 'react';

//  i18n
import I18n from 'i18n-js';

//  components
import Avatar from '../avatar/index';

// services
import { formatDate, getHoursFromDate } from '../../services/date';

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

interface EvaluationItemProps {
  fromUser: {
    name: string;
    avatar: string;
    instaName: string;
  };
  updated_at: string;
  value: number;
  isNotificationRead: boolean | undefined;
  evaluationId: string;
  itemHeight: number;
}

export const EvaluationItem: React.FC<EvaluationItemProps> = memo(
  ({ fromUser, updated_at, value, itemHeight }) => {
    const { avatar, name, instaName } = fromUser;

    return (
      <TouchableItem onPress={() => undefined}>
        <ItemContainer height={itemHeight}>
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
              {I18n.t('userEvaluation', {
                name: name?.split(' ')[0],
                value,
              })}
            </ItemText>
          </TextContainer>
        </ItemContainer>
      </TouchableItem>
    );
  },
);
