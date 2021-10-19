import React from 'react';

//  navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchStackParamList } from '../../../routes/types';

//  components
import Avatar from '../../../components/avatar/index';
import { IUser } from '../../../store/modules/user/types';

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

  const navigation = useNavigation<NavigationProps>();

  const instaName = instagram?.userName;

  return (
    <TouchableInterface
      onPress={() =>
        navigation.navigate('SearchedUserScreen', {
          user,
        })
      }
    >
      <ItemContainer height={height}>
        <Avatar avatar={avatar} />
        <TextContainer>
          <Instagram>{instaName}</Instagram>
          <UserName>{name}</UserName>
        </TextContainer>
      </ItemContainer>
    </TouchableInterface>
  );
};
