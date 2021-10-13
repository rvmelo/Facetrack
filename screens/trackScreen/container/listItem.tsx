import React from 'react';

//  components
import Avatar from '../../../components/avatar/index';

import { ItemContainer, ItemText } from './styles';

interface ListItemProps {
  height: number;
  avatar: string;
  instaName: string | undefined;
}

export const ListItem: React.FC<ListItemProps> = ({
  height,
  avatar,
  instaName,
}) => {
  return (
    <ItemContainer height={height}>
      <Avatar avatar={avatar} />
      {instaName && <ItemText>@{instaName}</ItemText>}
    </ItemContainer>
  );
};
