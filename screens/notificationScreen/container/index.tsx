import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { AxiosResponse } from 'axios';
import api from '../../../services/api';

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

interface UserData {
  avatar: string;
  name: string;
  userProviderId: string;
  instagram: {
    userName: string;
  };
}

interface EvaluationData {
  fromUserId: UserData;
  value: number;
}

interface NotificationData {
  foundEvaluations: EvaluationData[];
}

export const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<EvaluationData[]>([]);

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<NotificationData> = await api.get(
        '/evaluation?page=1',
      );
      setNotifications(response?.data?.foundEvaluations);
    })();
  }, []);

  const renderItem: ListRenderItem<EvaluationData> = useCallback(({ item }) => {
    const { avatar, name, instagram } = item.fromUserId;
    const { value } = item;

    return (
      <ItemContainer>
        <Avatar avatar={avatar} />
        <TextContainer>
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
      renderItem={renderItem}
      keyExtractor={item => item.fromUserId.userProviderId}
    />
  );
};
