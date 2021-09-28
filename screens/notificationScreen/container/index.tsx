/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  components
import Avatar from '../../../components/avatar/index';

//  styles
import {
  HeaderText,
  InstagramText,
  ItemContainer,
  ItemText,
  TextContainer,
} from './styles';
import { EvaluationData, useNotificationScreen } from './useNotificationScreen';

export const NotificationScreen: React.FC = () => {
  const { notifications, isRefreshing, onRefresh } = useNotificationScreen();

  const renderItem: ListRenderItem<EvaluationData> = useCallback(({ item }) => {
    const { avatar, name, instagram } = item.fromUserId;
    const { value } = item;

    return (
      <ItemContainer>
        <Avatar avatar={avatar} />
        <TextContainer>
          <InstagramText>{item.updated_at} </InstagramText>
          <ItemText>
            <HeaderText>{name} </HeaderText>
            <InstagramText>@{instagram?.userName}</InstagramText>
          </ItemText>
          <ItemText>
            {name} has rated you with {value} stars
          </ItemText>
        </TextContainer>
      </ItemContainer>
    );
  }, []);
  return (
    <FlatList
      data={notifications}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );
};
