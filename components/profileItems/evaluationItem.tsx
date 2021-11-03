import React, { memo } from 'react';

import { Ionicons } from '@expo/vector-icons';

//  i18n
import I18n from 'i18n-js';

//  components
import Avatar from '../avatar/index';

// services
import { formatDate, getHoursFromDate } from '../../services/date';

//  constants
import Colors from '../../constants/colors';

//  styles
import {
  HeaderText,
  InstagramText,
  ItemContainer,
  ItemText,
  TextContainer,
  TouchableItem,
  StyledDate,
  ItemWrapper,
} from './styles';

interface EvaluationItemProps {
  fromUser: {
    name: string;
    avatar: string;
    instaName: string;
  };
  updated_at: string;
  value: number;
  evaluationId: string;
  itemHeight: number;
  onPress: () => void;
  hasMessage: boolean;
  translationKey: string;
}

export const EvaluationItem: React.FC<EvaluationItemProps> = memo(
  ({
    fromUser,
    updated_at,
    value,
    itemHeight,
    hasMessage,
    translationKey,
    onPress,
  }) => {
    const { avatar, name, instaName } = fromUser;

    const ItemContent = (
      <ItemContainer height={itemHeight}>
        <ItemWrapper>
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
              {I18n.t(translationKey, {
                name: name?.split(' ')[0],
                value,
              })}
            </ItemText>
          </TextContainer>
          {hasMessage && (
            <Ionicons
              name="md-open"
              style={{ alignSelf: 'flex-start', marginRight: 5 }}
              size={30}
              color={Colors.accent}
            />
          )}
        </ItemWrapper>
      </ItemContainer>
    );

    return hasMessage ? (
      <TouchableItem onPress={onPress}>{ItemContent}</TouchableItem>
    ) : (
      <>{ItemContent}</>
    );
  },
);
