import React from 'react';

//  components
import Avatar from '../../../components/avatar/index';

//  hooks
import { useListItem } from '../useListItem';

import { ItemContainer, ItemText, TouchableInterface } from './styles';

interface ListItemProps {
  height: number;
  avatar: string;
  instaName: string | undefined;
  userProviderId: string;
  // eslint-disable-next-line no-unused-vars
  setIsVisible: (isVisible: boolean) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  height,
  avatar,
  instaName,
  userProviderId,
  setIsVisible,
}) => {
  const { handleProfileView } = useListItem();

  return (
    <TouchableInterface
      onPress={() => {
        setIsVisible(false);
        handleProfileView(userProviderId);
      }}
    >
      <ItemContainer height={height}>
        <Avatar avatar={avatar} />
        {instaName && <ItemText>@{instaName}</ItemText>}
      </ItemContainer>
    </TouchableInterface>
  );
};
