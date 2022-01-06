import React from 'react';

//  navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EvaluationStackParamList } from '../../../routes/types';

//  components
import Avatar from '../../../components/avatar/index';
import { IUser } from '../../../store/modules/user/types';

import { ItemContainer, ItemText, TouchableInterface } from './styles';

type NavigationProps = StackNavigationProp<
  EvaluationStackParamList,
  'TrackScreen'
>;

interface ListItemProps {
  user: IUser;
  height: number;
  // eslint-disable-next-line no-unused-vars
  setIsVisible: (isVisible: boolean) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  user,
  height,
  setIsVisible,
}) => {
  const navigation = useNavigation<NavigationProps>();

  const instagram = user?.instagram?.userName ? user?.instagram?.userName : '';

  return (
    <TouchableInterface
      onPress={() => {
        setIsVisible(false);
        navigation.navigate('TrackedUserScreen', {
          user,
        });
      }}
    >
      <ItemContainer height={height}>
        <Avatar avatar={user?.avatar} />
        {instagram && <ItemText numberOfLines={1}>@{instagram}</ItemText>}
      </ItemContainer>
    </TouchableInterface>
  );
};
