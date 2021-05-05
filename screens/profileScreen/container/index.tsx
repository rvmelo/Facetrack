import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';

//  redux
import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import { IUser, UserMedia } from '../../../store/modules/user/types';

import {
  Container,
  ProfileDataContainer,
  StyledName,
  Instagram,
  StyledEditButton,
  EditButtonLayout,
  ButtonText,
  UserAvatar,
  UserPhoto,
} from './styles';

const ProfileScreen: React.FC = () => {
  const user = useSelector<IState, IUser>(state => state.user);

  const photos = user?.instagram?.userMedia;

  const renderItem: ListRenderItem<UserMedia> = ({ item }) => (
    <UserPhoto source={{ uri: item.media_url }} />
  );

  return (
    <Container>
      <ProfileDataContainer>
        <UserAvatar
          source={{
            uri:
              'https://img.ibxk.com.br//2020/05/28/28135510637179.jpg?w=1200&h=675&mode=crop&scale=both',
          }}
        />
        <StyledName>{user?.name}</StyledName>
        <Instagram>@{user?.instagram?.userName}</Instagram>
        <StyledEditButton onPress={() => console.log('pressed')}>
          <EditButtonLayout>
            <ButtonText>Edit Profile</ButtonText>
          </EditButtonLayout>
        </StyledEditButton>
      </ProfileDataContainer>

      <FlatList
        data={Array.isArray(photos) ? photos : []}
        renderItem={renderItem}
        keyExtractor={photo => photo.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default ProfileScreen;
