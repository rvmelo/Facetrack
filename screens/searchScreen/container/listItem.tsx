import React from 'react';

//  redux
import { useSelector } from 'react-redux';

//  navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchStackParamList } from '../../../routes/types';

//  redux
import { IState } from '../../../store';
import { IUser, IUserState } from '../../../store/modules/user/types';

//  components
import Avatar from '../../../components/avatar/index';

import {
  Instagram,
  ItemContainer,
  TextContainer,
  UserName,
  TouchableInterface,
} from './styles';

type NavigationProps = StackNavigationProp<
  SearchStackParamList,
  'SearchScreen'
>;

interface ListItemProps {
  height: number;
  user: IUser;
}

export const ListItem: React.FC<ListItemProps> = ({ height, user }) => {
  const { avatar, name, instagram } = user;

  const { user: myProfile } = useSelector<IState, IUserState>(
    state => state.user,
  );

  const navigation = useNavigation<NavigationProps>();

  const instaName = instagram?.userName;

  return (
    <TouchableInterface
      onPress={() =>
        myProfile.userProviderId === user.userProviderId
          ? navigation.navigate('MyProfileRoutes')
          : navigation.navigate('SearchedUserScreen', {
              user,
            })
      }
    >
      <ItemContainer height={height}>
        <Avatar avatar={avatar} />
        <TextContainer>
          <Instagram numberOfLines={1}>{instaName}</Instagram>
          <UserName numberOfLines={1}>{name}</UserName>
        </TextContainer>
      </ItemContainer>
    </TouchableInterface>
  );
};
