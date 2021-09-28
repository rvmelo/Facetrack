import React, { memo } from 'react';

//  components
import Avatar from '../../../components/avatar/index';

//  styles
import {
  HeaderText,
  InstagramText,
  ItemContainer,
  ItemText,
  TextContainer,
  TouchableItem,
} from './styles';
import { useItem } from './useItem';

interface ItemProps {
  avatar: string;
  updated_at: string;
  name: string;
  instaName: string;
  value: number;
  userProviderId: string;
}

export const Item: React.FC<ItemProps> = memo(
  ({ avatar, updated_at, name, instaName, value, userProviderId }) => {
    const { handleItemPress } = useItem({ userProviderId });

    return (
      <TouchableItem onPress={handleItemPress}>
        <ItemContainer>
          <Avatar avatar={avatar} />
          <TextContainer>
            <InstagramText>{updated_at} </InstagramText>
            <ItemText>
              <HeaderText>{name} </HeaderText>
              <InstagramText>@{instaName}</InstagramText>
            </ItemText>
            <ItemText>
              {name} has rated you with {value} stars
            </ItemText>
          </TextContainer>
        </ItemContainer>
      </TouchableItem>
    );
  },
);
