import React from 'react';

//  components
import Avatar from '../../../components/avatar/index';

import { Instagram, ItemContainer, TextContainer, UserName } from './styles';

interface ListItemProps {
  height: number;
  avatar: string;
  instaName: string | undefined;
  name: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  avatar,
  instaName,
  name,
  height,
}) => {
  return (
    <ItemContainer height={height}>
      <Avatar avatar={avatar} />
      <TextContainer>
        <Instagram>{instaName}</Instagram>
        <UserName>{name}</UserName>
      </TextContainer>
    </ItemContainer>
  );
};
