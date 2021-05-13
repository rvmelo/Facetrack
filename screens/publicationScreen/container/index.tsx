import React, { memo } from 'react';
import { Video } from 'expo-av';

//  navigation
import { useRoute } from '@react-navigation/native';

//  redux
import { useSelector } from 'react-redux';
import {
  IUser,
  MEDIA_TYPES,
  media_types,
} from '../../../store/modules/user/types';

import {
  PublicationContainer,
  Header,
  HeaderTextContainer,
  UserAvatar,
  StyledName,
  Instagram,
  UserPhoto,
  Description,
  StyledDate,
} from './styles';

//   hooks
import usePublication from '../usePublication';
import { SCREEN_WIDTH } from '../../../constants/dimensions';
import { IState } from '../../../store';

interface RouteParams {
  caption: string;
  media_url: string;
  media_type: media_types;
  date: string;
}

const PublicationScreen: React.FC = () => {
  const { params } = useRoute();

  const { caption, media_url, media_type, date } = params as RouteParams;

  const { imgHeight, formatDate } = usePublication({ media_type, media_url });

  const user = useSelector<IState, IUser>(state => state.user);

  return (
    <PublicationContainer>
      <Header>
        <UserAvatar
          source={{
            uri:
              'https://img.ibxk.com.br//2020/05/28/28135510637179.jpg?w=1200&h=675&mode=crop&scale=both',
          }}
        />
        <HeaderTextContainer>
          <StyledName>{user?.name}</StyledName>
          <Instagram>@{user?.instagram?.userName}</Instagram>
        </HeaderTextContainer>
      </Header>

      {media_type === MEDIA_TYPES.video ? (
        <Video
          style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
          source={{
            uri: media_url,
          }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      ) : (
        <UserPhoto source={{ uri: media_url }} height={imgHeight} />
      )}
      <StyledDate>{formatDate(date)}</StyledDate>
      <Description>{caption}</Description>
    </PublicationContainer>
  );
};

export default memo(PublicationScreen);
